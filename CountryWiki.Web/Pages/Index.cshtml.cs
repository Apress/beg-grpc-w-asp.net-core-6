namespace CountryWiki.Web.Pages;

public class IndexModel : PageModel
{
    private readonly ICountryServices _countryServices;
    private readonly ICountryFileUploadValidatorService _countryFileUploadValidatorService;
    private readonly ISyncCountriesChannel _syncCountriesChannel;

    public GlobalOptions GlobalOptions;
    public IEnumerable<CountryModel> Countries { get; set; } = new List<CountryModel>();
    public string UploadErrorMessage { get; set; } = string.Empty;

    [BindProperty]
    public IFormFile Upload { get; set; }


    public IndexModel(ICountryServices countryServices, 
                      ICountryFileUploadValidatorService countryFileUploadValidatorService,
                      ISyncCountriesChannel syncCountriesChannel,
                      GlobalOptions globalOptions)
    {
        _countryServices = countryServices;
        _countryFileUploadValidatorService = countryFileUploadValidatorService;
        _syncCountriesChannel = syncCountriesChannel;
        GlobalOptions = globalOptions;
    }

    public async Task OnGetAsync()
    {
        Countries = await _countryServices.GetAllAsync();
    }

    public async Task<IActionResult> OnPostUploadAsync(CancellationToken cancellationToken)
    {
        if (Upload == null)
        {
            return await HandleFileValidation("File is missing");
        }

        var uploadedFile = new CountryUploadedFileModel
        {
            FileName = Upload.FileName,
            ContentType = Upload.ContentType
        };

        if (!_countryFileUploadValidatorService.ValidateFile(uploadedFile))
        {
            return await HandleFileValidation("Only JSON files are allowed");
        }

        var parsedCountries = await _countryFileUploadValidatorService.ParseFile(Upload.OpenReadStream());

        if (parsedCountries == null || !parsedCountries.Any())
        {
            return await HandleFileValidation("Cannot parse the file or the file is empty");
        }

        await _syncCountriesChannel.SyncAsync(parsedCountries, cancellationToken);

        return RedirectToPage("./Index");
    }

    public async Task<IActionResult> OnPostDeleteAsync(int id)
    {
        await _countryServices.DeleteAsync(id);
        return RedirectToPage("./Index");
    }

    private async Task<PageResult> HandleFileValidation(string errorMessage)
    {
        UploadErrorMessage = errorMessage;
        Countries = await _countryServices.GetAllAsync();
        return Page();
    }
}
