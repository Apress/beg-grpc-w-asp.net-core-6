namespace CountryService.gRPC.Services;

public class CountryGrpcServiceBrowser : CountryServiceBrowserBase
{ 
    private readonly ICountryServices _countryService;

    public CountryGrpcServiceBrowser(ICountryServices countryService)
    {
        _countryService = countryService;
    }

    public override async Task GetAll(Empty request, IServerStreamWriter<CountryReply> responseStream, ServerCallContext context)
    {
        var lst = await _countryService.GetAllAsync();

        foreach (var country in lst)
        {
            await Task.Delay(500);
            await responseStream.WriteAsync(country.ToReply());
        }
        await Task.CompletedTask;
    }

    public override async Task<CountryReply> Get(CountryIdRequest request, ServerCallContext context)
    {
        var country = await _countryService.GetAsync(request.Id);

        if (country == null)
            throw new RpcException(new Status(StatusCode.NotFound, $"Country with Id {request.Id} hasn't been found"));

        return (await _countryService.GetAsync(request.Id)).ToReply();
    }

    public override async Task<Empty> Update(CountryUpdateRequest request, ServerCallContext context)
    {
        var updateSucceed = await _countryService.UpdateAsync(new UpdateCountryModel
        {
            Id = request.Id,
            Description = request.Description,
            UpdateDate = DateTime.UtcNow
        });

        if (!updateSucceed)
            throw new RpcException(new Status(StatusCode.NotFound, $"Country with Id {request.Id} hasn't been updated, it have probably been deleted"));

        return new Empty();
    }

    public override async Task<Empty> Delete(CountryIdRequest request, ServerCallContext context)
    {
        var deleteSucceed = await _countryService.DeleteAsync(request.Id);

        if (!deleteSucceed)
            throw new RpcException(new Status(StatusCode.NotFound, $"Country with Id {request.Id} hasn't been updated, it have probable been deleted"));

        return new Empty();
    }

    public override async Task Create(CountriesCreationRequest request, IServerStreamWriter<CountryCreationReply> responseStream, ServerCallContext context)
    {
        foreach (var countryToCreate in request.Countries)
        {
            var createdCountryId = await _countryService.CreateAsync(new CreateCountryModel
            {
                Name = countryToCreate.Name,
                Description = countryToCreate.Description,
                Anthem = countryToCreate.Anthem,
                CapitalCity = countryToCreate.CapitalCity,
                FlagUri = countryToCreate.FlagUri,
                Languages = countryToCreate.Languages
            });

            await responseStream.WriteAsync(new CountryCreationReply
            {
                Id = createdCountryId,
                Name = countryToCreate.Name,
            });
        };

        await Task.CompletedTask;
    }
}