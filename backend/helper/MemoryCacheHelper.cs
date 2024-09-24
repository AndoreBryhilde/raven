using Microsoft.Extensions.Caching.Memory;

namespace Raven.Helper;

// 快取
public class MemoryCacheHelper
{
    public IMemoryCache Cache; // 快取

    public MemoryCacheHelper(IMemoryCache memoryCache)
    {
        Cache = memoryCache;
    }
    
    // 設定快取
    public virtual void SetCache<T>(string key, T value, DateTime expireTime)
    {
        Cache.Set(key, value, new MemoryCacheEntryOptions
        {
            AbsoluteExpiration = expireTime // 設定絕對過期時間
        });
    }

    // 取得快取
    public virtual dynamic? GetCache<T>(string key)
    {
        // 若 有取得快取 則 回傳快取
        if (Cache.TryGetValue(key, out T? myValue))
        {
            return myValue;
        };

        // 否則 回傳空
        return null;
    }

    // 清除快取
    public virtual void RemoveCache(string key)
    {
        Cache.Remove(key);
    }
}