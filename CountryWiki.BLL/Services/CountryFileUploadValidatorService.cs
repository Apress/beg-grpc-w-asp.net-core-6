namespace CountryWiki.BLL.Services;

public class CountryFileUploadValidatorService : ICountryFileUploadValidatorService
{
    public CountryFileUploadValidatorService() { }

    public bool ValidateFile(CountryUploadedFileModel countryUploadedFile)
    {
        if (!countryUploadedFile.FileName.ToLower().EndsWith(".json") || countryUploadedFile.ContentType != "application/json")
            return false;
      
        return true;
    }

    public async Task<IEnumerable<CreateCountryModel>> ParseFile(Stream content)
    {
        try
        {
            var parsedCountries = await JsonSerializer.DeserializeAsync<IEnumerable<CreateCountryModel>>(content, new JsonSerializerOptions { 
                PropertyNameCaseInsensitive = true
            });

            return parsedCountries.Any(x => string.IsNullOrEmpty(x.Name) ||
                                 string.IsNullOrEmpty(x.Anthem) ||
                                 string.IsNullOrEmpty(x.Description) ||
                                 string.IsNullOrEmpty(x.FlagUri) ||
                                 string.IsNullOrEmpty(x.CapitalCity) ||
                                 x.Languages == null ||
                                 !x.Languages.Any()) ? null : parsedCountries;
        }
        catch
        {
            return null;
        }
    }
}