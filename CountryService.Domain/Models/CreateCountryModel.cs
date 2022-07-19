namespace CountryService.Domain.Models;

public record class CreateCountryModel
{
    public string Name { get; init; }
    public string Description { get; init; }
    public string FlagUri { get; init; }
    public string CapitalCity { get; init; }
    public string Anthem { get; init; }
    public DateTime CreatedDate { get; init; }
    public IEnumerable<int> Languages { get; init; }
}