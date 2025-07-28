declare module 'remoteToast/Toast' {
  import { ComponentType } from 'react';
  
  interface ToastProps {
    message?: string;
    type?: "success" | "error" | "warning" | "info";
    duration?: number;
    onClose?: () => void;
    isVisible?: boolean;
  }

  const Toast: ComponentType<ToastProps>;
  export = Toast;
  export { ToastProps };
}

// Module Federation webpack runtime types
interface WebpackRequire {
  (id: string): unknown;
  e: (chunkId: string) => Promise<void>;
  t: (value: unknown, mode?: number) => unknown;
  cache: Record<string, unknown>;
  S: {
    default: unknown;
    [key: string]: unknown;
  };
}

declare const __webpack_require__: WebpackRequire;

declare global {
  interface Window {
    __webpack_require__: WebpackRequire;
  }
}
