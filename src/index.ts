// Central exports for the optimized RemoteToast system

// Components
export { default as RemoteToast } from './components/remote/RemoteToast';
export { ErrorToast } from './components/ErrorToast';
export { LoadingToast } from './components/LoadingToast';
export { PortalWrapper } from './components/PortalWrapper';

// Hooks
export { useRemoteComponent } from './hooks/useRemoteComponent';

// Types
export type {
  ToastBaseProps,
  RemoteComponentLoadConfig,
  RemoteComponentHookReturn,
  ToastContainerProps,
  ModuleFederationInstance,
  WindowWithFederation,
  RemoteModule,
  ComponentType
} from './types/components';

export type { RemoteToastProps } from './components/remote/RemoteToast';
export type { ErrorToastProps } from './components/ErrorToast';
export type { LoadingToastProps } from './components/LoadingToast';
export type { PortalWrapperProps } from './components/PortalWrapper';

// Constants
export { REMOTE_COMPONENT_CONFIG, PORTAL_TARGETS, TOAST_STYLES } from './constants/remoteComponent';

// Utils
export {
  createTimeoutPromise,
  extractComponentFromModule,
} from './utils/remoteComponent';
