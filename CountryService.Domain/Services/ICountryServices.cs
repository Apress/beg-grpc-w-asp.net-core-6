namespace CountryService.Domain.Services;

public interface ICountryServices
{
    Task<int> CreateAsync(CreateCountryModel countryToCreate);
    Task<bool> UpdateAsync(UpdateCountryModel countryToUpdate);
    Task<bool> DeleteAsync(int id);
    Task<CountryModel> GetAsync(int id);
    Task<IEnumerable<CountryModel>> GetAllAsync();
}