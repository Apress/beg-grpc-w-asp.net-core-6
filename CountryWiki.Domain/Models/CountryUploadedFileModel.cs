namespace CountryWiki.Domain.Models;

public record class CountryUploadedFileModel
{
    public string FileName { get; init; }
    public string ContentType { get; init; }
}