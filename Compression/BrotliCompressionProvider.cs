namespace CountryService.gRPC.Compression;

public class BrotliCompressionProvider : ICompressionProvider
{
    private readonly CompressionLevel? _compressionLevel;

    public BrotliCompressionProvider(CompressionLevel compressionLevel)
    {
        _compressionLevel = compressionLevel;
    }

    public BrotliCompressionProvider()
    {
    }

    public string EncodingName => "br"; // Must match grpc-accept-encoding 

    public Stream CreateCompressionStream(Stream outputStream, CompressionLevel? compressionLevel)
    {
        if (_compressionLevel.HasValue)
            return new BrotliStream(outputStream, compressionLevel ?? _compressionLevel.Value, true);

        else if (!_compressionLevel.HasValue && compressionLevel.HasValue)
            return new BrotliStream(outputStream, compressionLevel.Value, true);

        return new BrotliStream(outputStream, CompressionLevel.Fastest, true);
    }

    public Stream CreateDecompressionStream(Stream stream)
    {
        return new BrotliStream(stream, CompressionMode.Decompress);
    }
}