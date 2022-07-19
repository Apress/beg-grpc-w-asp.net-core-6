namespace CountryWiki.BLL.Services;

public class CountryServices : ICountryServices
{
    private readonly ICountryRepository _countryRepository;
    private readonly ILogger<CountryServices> _logger;

    public CountryServices(ICountryRepository countryRepository, ILogger<CountryServices> logger)
    {
        _countryRepository = countryRepository;
        _logger = logger;
    }

    public async Task CreateAsync(IEnumerable<CreateCountryModel> countriesToCreate)
    {
        await foreach (var createdCountry in _countryRepository.CreateAsync(countriesToCreate))
        {
            _logger.LogDebug($"Country {createdCountry.Name} has been created successfuly with Id {createdCountry.Id}");
        }
    }

    public async Task DeleteAsync(int id)
    {
        await _countryRepository.DeleteAsync(id);
        _logger.LogDebug($"Country with Id {id} has been successfully deleted");
    }

    public async Task<IEnumerable<CountryModel>> GetAllAsync()
    {
        var countries = new List<CountryModel>();
        await foreach (var country in _countryRepository.GetAllAsync())
        {
            countries.Add(country);
        }
        return countries;
    }

    public async Task<CountryModel> GetAsync(int id)
    {
        return await _countryRepository.GetAsync(id);
    }

    public async Task UpdateAsync(UpdateCountryModel countryToUpdate)
    {
        await _countryRepository.UpdateAsync(countryToUpdate);
        _logger.LogDebug($"Country with Id {countryToUpdate.Id} has been successfully updated");
    }
}