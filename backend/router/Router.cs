using Raven.Api;

namespace Raven.Router;

// 路由路徑
public class RouterPath
{
    public string AuthorizationName;
    public IEnumerable<string> HttpMethods;
    public string Pattern;
    public Delegate Handler;

    public RouterPath(
        string authorizationName, // 權限名稱
        string httpMethods, // HTTP 方法
        string pattern, // 路由模式
        Delegate handler // 路由處理函式
    )
    {
        AuthorizationName = authorizationName;
        HttpMethods = new string[] { httpMethods };
        Pattern = pattern;
        Handler = handler;
    }
}

// 路由
public class Router
{
    // 路由列表
    public static readonly List<RouterPath> RouterPaths =
        new()
        {
            // 無需授權
            new RouterPath("", "GET", "/authorization", ()=>{}), // 權限查詢列表
        };

    // 映射路由
    public static void Map(WebApplication app)
    {
        app.MapGet("/api/version", ()=>"Hello world！"); // 取得版號
        app.MapPost("/api/googleauth", Token.CheckToken); // 取得版號

        // 需檢查授權路由
        var myGroup = app.MapGroup("/api");
        RouterPaths.ForEach((o) => myGroup.MapMethods(o.Pattern, o.HttpMethods, o.Handler));
        myGroup.RequireAuthorization().RequireAuthorization("ChekAuthorization");

        // 未定義路由
        app.Map("/api/{*path}", () => Results.NotFound());
    }
}
