// Zephyr configuration with environment-based remote URLs
// This allows different environments to use different remote deployments
require('dotenv').config();

// Ensure REMOTE_TOAST_URL is defined - app should not work without it
if (!process.env.REMOTE_TOAST_URL) {
  throw new Error('REMOTE_TOAST_URL environment variable is required but not defined');
}

export const zephyrConfig = {
  dependencies: {
    // Use REMOTE_TOAST_URL as base URL for Zephyr (no processing needed)
    // Each service adds what it needs: rspack adds '/remoteEntry.js', Zephyr uses base URL
    "rspack-remote": process.env.REMOTE_TOAST_URL
  }
};
