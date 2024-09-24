using Raven.Data;
using System.Text.Json;

namespace Raven.Api;

public class Token
{
    // 檢查 Token
    public static async Task<dynamic> CheckToken(LoginData loginData, HttpClient httpClient)
    {
        // 檢查 Token 是否為空
        if (string.IsNullOrEmpty(loginData.Token))
        {
            return Results.BadRequest();
        }

        // Google 的驗證端點
        string googleTokenInfoEndpoint = $"https://oauth2.googleapis.com/tokeninfo?id_token={loginData.Token}";

        // 向 Google 發送請求驗證 token
        var response = httpClient.GetAsync(googleTokenInfoEndpoint).Result;

         // 檢查 Google 的回應
        if (!response.IsSuccessStatusCode)
        {
            return Results.BadRequest();
        }

        // 取得 Google 的回應
        string responseContent = await response.Content.ReadAsStringAsync();

        // 反序列化 Google 的回應
        var googleData = JsonSerializer.Deserialize<GoogleData>(responseContent);

        return googleData!;
    }
}