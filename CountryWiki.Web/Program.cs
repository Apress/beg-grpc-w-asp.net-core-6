var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddScoped<ICountryRepository, CountryRepository>();
builder.Services.AddScoped<ICountryServices, CountryServices>();
builder.Services.AddScoped<ICountryFileUploadValidatorService, CountryFileUploadValidatorService>();
builder.Services.AddSingleton<ISyncCountriesChannel, SyncCountriesChannel>();
builder.Services.AddHostedService<SyncUploadedCountriesBackgroundService>();
builder.Services.AddSingleton(new GlobalOptions
{
    ProcessingUpload = false
});

var loggerFactory = LoggerFactory.Create(logging =>
{
    logging.AddConsole();
    logging.SetMinimumLevel(LogLevel.Trace);
});

builder.Services.AddGrpcClient<CountryServiceClient>(o =>
    {
        o.Address = new Uri(builder.Configuration.GetSection("CountryServiceUri").Value);
    })
    .ConfigurePrimaryHttpMessageHandler(() => new GrpcWebHandler(new HttpClientHandler()))
    .AddInterceptor(() => new TracerInterceptor(loggerFactory.CreateLogger<TracerInterceptor>()))
    .ConfigureChannel(o =>
    {
        o.CompressionProviders = new List<ICompressionProvider>
        {
            new BrotliCompressionProvider()
        };
        o.MaxReceiveMessageSize = 6291456; // 6 MB,
        o.MaxSendMessageSize = 6291456; // 6 MB

    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
