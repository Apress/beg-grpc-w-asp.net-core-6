namespace CountryWiki.Domain.Services;

public interface ICountryServices
{
    Task CreateAsync(IEnumerable<CreateCountryModel> countryToCreate);
    Task UpdateAsync(UpdateCountryModel countryToUpdate);
    Task DeleteAsync(int id);
    Task<CountryModel> GetAsync(int id);
    Task<IEnumerable<CountryModel>> GetAllAsync();
}