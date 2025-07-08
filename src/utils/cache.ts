import cache from 'memory-cache';

// Cache instance with a default expiration of 60 minutes (in milliseconds)
export const jobCache = new cache.Cache();
