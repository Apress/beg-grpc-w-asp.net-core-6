namespace CountryWiki.Web.Models;

public class UpdateCountry
{
    public int Id { get; set; }

    [Required, StringLength(200, MinimumLength = 10)]
    public string Description { get; set; }
}