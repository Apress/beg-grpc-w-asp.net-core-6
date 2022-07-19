namespace CountryService.Domain.Models;

public record class UpdateCountryModel
{
    public int Id { get; init; }
    public string Description { get; init; }
    public DateTime UpdateDate { get; init; }
}