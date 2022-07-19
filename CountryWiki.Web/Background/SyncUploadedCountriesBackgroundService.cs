namespace CountryWiki.Web.Background;

public class SyncUploadedCountriesBackgroundService : BackgroundService
{
    private readonly ILogger<SyncUploadedCountriesBackgroundService> _logger;
    private readonly ISyncCountriesChannel _syncCountriesChannel;
    private readonly IServiceProvider _serviceProvider;
    private readonly GlobalOptions _globalOptions;

    public SyncUploadedCountriesBackgroundService(ILogger<SyncUploadedCountriesBackgroundService> logger, 
                                                  ISyncCountriesChannel syncCountriesChannel, 
                                                  IServiceProvider serviceProvider,
                                                  GlobalOptions globalOptions)
    {
        _logger = logger;
        _syncCountriesChannel = syncCountriesChannel;
        _serviceProvider = serviceProvider;
        _globalOptions = globalOptions;
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        await foreach (var uploadedCountries in _syncCountriesChannel.ReadAllAsync(cancellationToken))
        {
            try
            {
                _logger.LogInformation("Received uploaded countries from the channel for sync");

                using var scope = _serviceProvider.CreateScope();

                var countryServices = scope.ServiceProvider.GetRequiredService<ICountryServices>();

                try
                {
                    // Processing sync
                    _logger.LogInformation("Start Syncing countries");
                    _globalOptions.ProcessingUpload = true;
                    await countryServices.CreateAsync(uploadedCountries);
                    _logger.LogInformation("End Syncing countries (success)");

                }
                catch (RpcException e)
                {
                    var correlationId = e.Trailers.GetValue("correlationId");
                    _logger.LogError(e, "End Syncing countries (fail). CorrelationId: {correlationId}", correlationId);
                }
                finally
                {
                    _globalOptions.ProcessingUpload = false;
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Unable to manage uploaded countries");
            }
            finally
            {
                _globalOptions.ProcessingUpload = false;
            }
        }
    }
}