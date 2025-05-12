// src/utils/cache.js
const client = require('../config/redisClient');

const CACHE_TTL = 60 * 10; // 10 minutes

module.exports = {
    async get(key) {
      if (!client.isOpen) await client.connect(); // only if needed
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    },
    async set(key, value, ttl = CACHE_TTL) {
      if (!client.isOpen) await client.connect();
      await client.setEx(key, ttl, JSON.stringify(value));
    },
    async del(key) {
      if (!client.isOpen) await client.connect();
      await client.del(key);
    },
  };