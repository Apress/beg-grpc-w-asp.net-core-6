namespace CountryService.DAL.Database;

public class CountryContext : DbContext
{
    public CountryContext(DbContextOptions<CountryContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder opBuilder)
    {
        opBuilder.UseSqlServer(@"Data Source=(LocalDB)\MSSQLLocalDB;Initial Catalog=CountryService;");
    }

    public DbSet<Country> Countries { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<CountryLanguage> CountryLanguages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CountryLanguage>()
                    .HasKey(t => new { t.CountryId, t.LanguageId });

        modelBuilder.Entity<CountryLanguage>()
                    .HasOne(cl => cl.Country)
                    .WithMany(c => c.CountryLanguages)
                    .HasForeignKey(cl => cl.CountryId);

        modelBuilder.Entity<CountryLanguage>()
                    .HasOne(cl => cl.Language)
                    .WithMany(c => c.CountryLanguages)
                    .HasForeignKey(cl => cl.LanguageId);

        modelBuilder.Entity<Language>()
       .HasData(
         new Language { Id = 1, Name = "English" },
         new Language { Id = 2, Name = "French" },
         new Language { Id = 3, Name = "Spanish" }
       );
    }
}