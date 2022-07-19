namespace CountryWiki.Domain.Models;

public record class UpdateCountryModel
{
    public int Id { get; init; }
    public string Description { get; init; }
}