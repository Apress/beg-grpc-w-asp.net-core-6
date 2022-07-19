namespace CountryWiki.Web.Pages;

public class EditModel : PageModel
{
    private readonly ICountryServices _countryServices;

    public string CountryName {  get; set; }

    [BindProperty]
    public UpdateCountry CountryToUpdate { get; set; }

    public EditModel(ICountryServices countryServices)
    {
        _countryServices = countryServices;
    }

    public async Task OnGetAsync(int id)
    {
        await RetrieveCountry(id);
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            await RetrieveCountry(CountryToUpdate.Id);

            return Page();
        }

        await _countryServices.UpdateAsync(new UpdateCountryModel { 
            Id = CountryToUpdate.Id,
            Description = CountryToUpdate.Description
        });

        return RedirectToPage("./Index");
    }

    private async Task RetrieveCountry(int id)
    {
        var country = await _countryServices.GetAsync(id);
        CountryName = country.Name;
        CountryToUpdate = new UpdateCountry
        {
            Id = country.Id,
            Description = country.Description
        };
    }
}
