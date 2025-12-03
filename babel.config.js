// babel.config.js
module.exports = function (api) {
  // Invalidate cache when ENVFILE changes
  api.cache.invalidate(() => process.env.ENVFILE || process.env.npm_lifecycle_event);

  // Detect which script was run
  const event = process.env.npm_lifecycle_event || "";
  let envFile = process.env.ENVFILE || 
                (process.env.NODE_ENV === "production" ? ".env.production" : ".env.development");
  let isProduction = envFile.includes("production");

  if (event.startsWith('android:prod') || event === 'start:prod') {
    envFile = '.env.production';
    isProduction = true;
  } else if (event.startsWith('android:dev') || event === 'start:dev') {
    envFile = '.env.development';
  }

  console.log("ENVFILE:", process.env.ENVFILE);
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("npm_lifecycle_event:", process.env.npm_lifecycle_event);
  console.log(`🔑 Babel using: ${envFile} (from ${event})`);

  return {
    presets: [
      [
        'module:@react-native/babel-preset',
        {
          unstable_transformProfile: isProduction ? 'hermes-stable' : 'default',
        },
      ],
    ],
  };
};
