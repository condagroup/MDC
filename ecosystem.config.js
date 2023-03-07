module.exports = {
  apps: [
    {
      exec_mode: 'cluster',
      instances: 1,
      script: './.output/server/index.mjs',
      name: 'dev:frontend',
      env: {
        NITRO_PORT: 3000,
        NODE_ENV: 'production',
      },
    },
    {
      exec_mode: 'cluster',
      instances: 1,
      script: './.output/server/index.mjs',
      name: 'staging:frontend',
      env: {
        NITRO_PORT: 3010,
        NODE_ENV: 'production',
      },
    },
    {
      exec_mode: 'cluster',
      instances: 2,
      script: './.output-dist/server/index.mjs',
      name: 'prod:frontend',
      env: {
        NITRO_PORT: 3020,
        NODE_ENV: 'production',
      },
    },
  ],
};
