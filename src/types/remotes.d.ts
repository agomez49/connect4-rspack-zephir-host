declare module 'remoteToast/Toast' {
  interface ToastProps {
    message?: string;
    type?: "success" | "error" | "warning" | "info";
    duration?: number;
    onClose?: () => void;
    isVisible?: boolean;
  }

  const Toast: React.ComponentType<ToastProps>;
  export = Toast;
  export { ToastProps };
}
