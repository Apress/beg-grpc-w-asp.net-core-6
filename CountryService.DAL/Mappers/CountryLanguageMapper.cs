namespace CountryService.DAL.Mappers;

public static class CountryLanguageMapper
{
    public static IQueryable<CountryModel> ToDomain(this IQueryable<Country> countries) => 
        countries.Select(x => new CountryModel
        {
            Id = x.Id,
            Name = x.Name,
            Description = x.Description,
            CapitalCity = x.CapitalCity,
            Anthem = x.Anthem,
            FlagUri = x.FlagUri,
            Languages = x.CountryLanguages.Select(y => y.Language.Name)
        });
}