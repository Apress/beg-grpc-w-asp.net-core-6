var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc(options => {
    options.EnableDetailedErrors = true;
    options.MaxReceiveMessageSize = 6291456; // 6 MB
    options.MaxSendMessageSize = 6291456; // 6 MB
    options.CompressionProviders = new List<ICompressionProvider>
    {
        new BrotliCompressionProvider() // br
    };
    options.ResponseCompressionAlgorithm = "br"; // grpc-accept-encoding
    options.ResponseCompressionLevel = CompressionLevel.Optimal; // compression level used if not set on the provider
    options.Interceptors.Add<ExceptionInterceptor>(); // Register custom ExceptionInterceptor interceptor
});
builder.Services.AddGrpcReflection();
builder.Services.AddScoped<ICountryRepository, CountryRepository>();
builder.Services.AddScoped<ICountryServices, CountryServices>();
builder.Services.AddSingleton<ProtoService>();
builder.Services.AddDbContext<CountryContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("CountryService")));
builder.Services.AddCors(o => o.AddPolicy("AllowAll", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()
           .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
}));
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseCors("AllowAll");
app.UseGrpcWeb(new GrpcWebOptions { DefaultEnabled = true });
app.MapGrpcReflectionService();
app.MapGrpcService<CountryGrpcService>();
app.MapGrpcService<CountryGrpcServiceBrowser>();

app.MapGet("/protos", (ProtoService protoService) =>
{
    return Results.Ok(protoService.GetAll());
});
app.MapGet("/protos/v{version:int}/{protoName}", (ProtoService protoService, int version, string protoName) =>
{
    var filePath = protoService.Get(version, protoName);

    if (filePath != null)
        return Results.File(filePath);

    return Results.NotFound();
});
app.MapGet("/protos/v{version:int}/{protoName}/view", async (ProtoService protoService, int version, string protoName) =>
{
    var text = await protoService.ViewAsync(version, protoName);

    if (!string.IsNullOrEmpty(text))
        return Results.Text(text);

    return Results.NotFound();
});

app.MapGet("/stream/countries", async (ICountryServices countryServices, IHttpContextAccessor accessor) =>
{
    async IAsyncEnumerable<CountryModel> StreamCountriesAsync()
    {
        var countries = await countryServices.GetAllAsync();
        foreach (var country in countries)
        {
            await Task.Delay(500);
            yield return country;
        }
    }
    return StreamCountriesAsync();
});

// Run the app
app.Run();