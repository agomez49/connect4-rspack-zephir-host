export const REMOTE_COMPONENT_CONFIG = {
  TIMEOUT: 10000,
  RETRY_COUNT: 2,
  RETRY_DELAY: 1000,
  MODULE_PATHS: {
    TOAST: 'remoteToast/Toast',
  },
} as const;

export const PORTAL_TARGETS = {
  BODY: document.body,
} as const;

export const TOAST_STYLES = {
  ERROR: 'fixed top-4 right-4 z-50 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-sm',
  LOADING: 'fixed top-4 right-4 z-50 bg-gray-100 text-gray-800 p-2 rounded-lg shadow-md',
} as const;
