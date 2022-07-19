namespace CountryService.Domain.Repositories;
public interface ICountryRepository
{
    Task<int> CreateAsync(CreateCountryModel countryToCreate);
    Task<int> UpdateAsync(UpdateCountryModel countryToUpdate);
    Task<int> DeleteAsync(int id);
    Task<CountryModel> GetAsync(int id);
    Task<IEnumerable<CountryModel>> GetAllAsync();
}