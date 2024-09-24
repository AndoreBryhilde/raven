using Raven.Router;
using Raven.Helper;
// using System.Text;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.AspNetCore.Authorization;
// using System.Security.Claims;

// 網頁應用建造器
var builder = WebApplication.CreateBuilder(args);

// 設定資料庫依賴注入
// builder.Services.AddDbContext<DB>(
//     o => o.UseSqlServer(ConfigurationHelper.Decryptor(builder.Configuration.GetConnectionString("Default")!)),
//     ServiceLifetime.Scoped
// );

// 設定其他依賴注入
builder.Services.AddHttpContextAccessor();
builder.Services.AddHttpClient();
builder.Services.AddMemoryCache(); // 註冊快取
// builder.Services.AddSingleton<AuthorizationHelper>();
// builder.Services.AddSingleton<JWTHelper>();
// builder.Services.AddSingleton<MailHelper>();
builder.Services.AddSingleton<MemoryCacheHelper>();
// builder.Services.AddScoped<IAuthorizationHandler, AuthorizationHandlerHelper>();
// builder.Services.AddScoped<Authorization>();

// 取得設定資料
// ConfigurationHelper.ReadConfiguration(builder.Configuration);

// 設定驗證
// builder.Services
//     .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.IncludeErrorDetails = true; // 當驗證失敗時，回應失敗的詳細錯誤原因
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             NameClaimType = ClaimTypes.NameIdentifier,
//             ValidIssuer = ConfigurationHelper.JwtIssuer,
//             ValidateIssuer = true,
//             ValidateAudience = false,
//             ValidateLifetime = true,
//             ValidateIssuerSigningKey = true,
//             IssuerSigningKey = new SymmetricSecurityKey(
//                 Encoding.UTF8.GetBytes(
//                     ConfigurationHelper.JwtISignKey
//                 )
//             )
//         };
//     });
// builder.Services.AddAuthorization(
//     o => o.AddPolicy("ChekAuthorization", p => p.Requirements.Add(new AuthorizationHelper()))
// );

// SwaggerHelper.Add(builder.Services); // 加入 Web API 文件產生器服務

var app = builder.Build(); // 建立網頁應用

// 資料庫遷移
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<DB>();
//     db.Database.Migrate();
//     SeedData.Seed(db);
// }

// SwaggerHelper.Use(app); // 啟用 Web API 文件

Router.Map(app); // 映射路由
// app.UseDefaultFiles(); // 預設檔案服務
// app.UseStaticFiles(); // 靜態檔案服務

app.Run(); // 監聽網頁服務

public partial class Program { }
