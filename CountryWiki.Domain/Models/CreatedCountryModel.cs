namespace CountryWiki.Domain.Models;

public record class CreatedCountryModel
{
    public int Id { get; init; }
    public string Name { get; init; }
}