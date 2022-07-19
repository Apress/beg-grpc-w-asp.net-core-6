
using System.Linq;

namespace CountryService.DAL.Repositories;

public class CountryRepository : ICountryRepository
{
    private CountryContext _countryContext { get;set; }

    public CountryRepository(CountryContext countryContext)
    {
        _countryContext = countryContext;
    }

    public async Task<int> CreateAsync(CreateCountryModel countryToCreate)
    {
        var country = new Country
        {
            Name = countryToCreate.Name,
            Description = countryToCreate.Description,
            CapitalCity = countryToCreate.CapitalCity,
            Anthem = countryToCreate.Anthem,
            FlagUri = countryToCreate.FlagUri,
            CreateDate = countryToCreate.CreatedDate,
            CountryLanguages = countryToCreate.Languages.Select(x => new CountryLanguage { LanguageId = x }).ToList()
        };

        await _countryContext.Countries.AddAsync(country);
        await _countryContext.SaveChangesAsync();

        return country.Id;
    }

    public async Task<int> UpdateAsync(UpdateCountryModel countryToUpdate)
    {
        var country = new Country
        {
            Id = countryToUpdate.Id,
            Description = countryToUpdate.Description,
            UpdateDate = countryToUpdate.UpdateDate
        };

        _countryContext.Entry(country).Property(p => p.Description).IsModified = true;
        _countryContext.Entry(country).Property(p => p.UpdateDate).IsModified = true;
        return await _countryContext.SaveChangesAsync();
    }

    public async Task<int> DeleteAsync(int id)
    {
        var country = new Country
        {
            Id = id
        };

        _countryContext.Entry(country).State = EntityState.Deleted;
        return await _countryContext.SaveChangesAsync();
    }

    public async Task<CountryModel> GetAsync(int id) =>
        await _countryContext.Countries
                                    .AsNoTracking()
                                    .ToDomain()
                                    .FirstOrDefaultAsync(x => x.Id == id);

    public async Task<IEnumerable<CountryModel>> GetAllAsync() =>
        await _countryContext.Countries
                                    .AsNoTracking()
                                    .ToDomain()
                                    .ToListAsync();
}