// Centralized types for remote components and toast functionality
import { ComponentType } from 'react';

// Module Federation types
export interface ModuleFederationInstance {
  loadRemote: (modulePath: string) => Promise<RemoteModule>;
  [key: string]: unknown;
}

export interface WindowWithFederation extends Window {
  __FEDERATION__?: {
    __INSTANCES__?: ModuleFederationInstance[];
  };
}

export interface RemoteModule {
  default?: ComponentType<Record<string, unknown>>;
  Toast?: ComponentType<Record<string, unknown>>;
  Component?: ComponentType<Record<string, unknown>>;
  [key: string]: unknown;
}

export interface ToastBaseProps {
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  isVisible?: boolean;
  onClose?: () => void;
}

export interface RemoteComponentLoadConfig {
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
}

export interface RemoteComponentHookReturn<T = ComponentType<Record<string, unknown>>> {
  component: T | null;
  error: string | null;
  isLoading: boolean;
}

export interface ToastContainerProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

// Re-export common React types for convenience
export type { ReactNode, ComponentType } from 'react';
