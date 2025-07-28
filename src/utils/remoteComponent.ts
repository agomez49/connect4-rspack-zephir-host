/**
 * Utility functions for remote component loading and toast management
 */
import { ComponentType } from 'react';
import type { RemoteModule } from '../types/components';

/**
 * Creates a timeout promise that rejects after the specified timeout
 */
export const createTimeoutPromise = (timeout: number, errorMessage?: string): Promise<never> => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(errorMessage || `Operation timed out after ${timeout}ms`)), timeout)
  );
};

/**
 * Extracts a component from a remote module, handling different export patterns
 */
export const extractComponentFromModule = (
  module: RemoteModule, 
  componentName?: string
): ComponentType<Record<string, unknown>> => {
  // Try different common export patterns
  const candidates = [
    module.default,
    componentName ? module[componentName] : null,
    module.Toast,
    module.Component,
    module
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (typeof candidate === 'function') {
      return candidate as ComponentType<Record<string, unknown>>;
    }
  }

  throw new Error(`No valid React component found in module. Expected a function, got: ${typeof module}`);
};


