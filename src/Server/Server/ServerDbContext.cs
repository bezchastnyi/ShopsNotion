﻿using Microsoft.EntityFrameworkCore;

namespace Server
{
    public class ServerDbContext : DbContext
    {
        public virtual DbSet<Product> Product { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=postgres");
        }
    }
}
