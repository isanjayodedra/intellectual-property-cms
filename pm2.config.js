// pm2.config.js

module.exports = {
    apps: [
        {
            name: 'gateway',
            script: './src/index.js',
            cwd: './gateway',
            watch: false,
            xec_mode: 'fork', // ✅ enforce single instance
            // instances: 'max',
            // exec_mode: 'cluster',
            env: {
              NODE_ENV: 'development',
              PORT: 3000
            }
          },
        {
            name: 'auth-service',
            script: './src/index.js',
            cwd: './auth-service',
            watch: false,
            xec_mode: 'fork', // ✅ enforce single instance
            // instances: 'max',
            // exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
                PORT: 3001
            }
        },
        {
            name: 'common-service',
            script: './src/index.js',
            cwd: './common-service',
            watch: false,
            xec_mode: 'fork', // ✅ enforce single instance
            // instances: 'max',
            // exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
                PORT: 3002
            }
        },
        {
            name: 'queue-service',
            script: './src/app.js',
            cwd: './queue-service',
            watch: false,
            xec_mode: 'fork', // ✅ enforce single instance
            // instances: 'max',
            // exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
                PORT: 3003
            }
        },
        {
            name: 'article-service',
            script: './src/index.js',
            cwd: './article-service',
            watch: false,
            xec_mode: 'fork', // ✅ enforce single instance
            // instances: 'max',
            // exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
                PORT: 3004
            }
        }
    ]
  };