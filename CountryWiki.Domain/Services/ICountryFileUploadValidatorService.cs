namespace CountryWiki.Domain.Services;

public interface ICountryFileUploadValidatorService
{
    bool ValidateFile(CountryUploadedFileModel countryUploadedFile);
    Task<IEnumerable<CreateCountryModel>> ParseFile(Stream content);
}