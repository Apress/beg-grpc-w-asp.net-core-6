namespace CountryWiki.Web.Channels;

public interface ISyncCountriesChannel
{
    IAsyncEnumerable<IEnumerable<CreateCountryModel>> ReadAllAsync(CancellationToken cancellationToken);
    Task<bool> SyncAsync(IEnumerable<CreateCountryModel> countriesToCreate, CancellationToken cancellationToken);
}

public class SyncCountriesChannel : ISyncCountriesChannel
{
    private readonly Channel<IEnumerable<CreateCountryModel>> _channel;
    private readonly ILogger<SyncCountriesChannel> _logger;

    public SyncCountriesChannel(ILogger<SyncCountriesChannel> logger)
    {
        var options = new UnboundedChannelOptions
        {
            SingleWriter = false,
            SingleReader = true
        };

        _channel = Channel.CreateUnbounded<IEnumerable<CreateCountryModel>>(options);
        _logger = logger;
    }

    public async Task<bool> SyncAsync(IEnumerable<CreateCountryModel> countriesToCreate, CancellationToken cancellationToken)
    {
        while (await _channel.Writer.WaitToWriteAsync(cancellationToken) && !cancellationToken.IsCancellationRequested)
        {
            if (_channel.Writer.TryWrite(countriesToCreate))
            {
                _logger.LogDebug("Sending parsed coutries to the background task");

                return true;
            }
        }

        return false;
    }

    public IAsyncEnumerable<IEnumerable<CreateCountryModel>> ReadAllAsync(CancellationToken cancellationToken) => _channel.Reader.ReadAllAsync(cancellationToken);
}