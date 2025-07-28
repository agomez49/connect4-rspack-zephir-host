import { useState, useEffect, useCallback, ComponentType } from 'react';
import { createTimeoutPromise, extractComponentFromModule } from '../utils/remoteComponent';
import type { 
  RemoteComponentHookReturn, 
  RemoteComponentLoadConfig, 
  WindowWithFederation,
  RemoteModule 
} from '../types/components';

/**
 * Custom hook for loading remote microfrontend components with error handling and retries
 */
export const useRemoteComponent = <T = ComponentType<Record<string, unknown>>>(
  modulePath: string,
  options: RemoteComponentLoadConfig = {}
): RemoteComponentHookReturn<T> => {
  const { timeout = 10000, retryCount = 2, retryDelay = 1000 } = options;
  
  const [state, setState] = useState<RemoteComponentHookReturn<T>>({
    component: null,
    error: null,
    isLoading: true,
  });

  const loadComponent = useCallback(async (attempt = 0): Promise<void> => {
    try {
      console.log(`🔄 Loading remote component from: ${modulePath} (attempt ${attempt + 1})`);
      
      // Create timeout promise
      const timeoutPromise = createTimeoutPromise(
        timeout, 
        `Timeout loading remote component from ${modulePath} after ${timeout}ms`
      );

      // Load the remote module using Module Federation API
      let remoteModule: RemoteModule;

      // Access Module Federation instance directly for remote modules
      try {
        const federatedWindow = window as WindowWithFederation;
        const globalFederation = federatedWindow.__FEDERATION__?.__INSTANCES__?.[0];
        
        if (globalFederation) {
          console.log(`🌐 Using global Federation instance to load ${modulePath}`);
          // Use the Module Federation instance directly
          remoteModule = await Promise.race([
            globalFederation.loadRemote(modulePath),
            timeoutPromise
          ]);
          console.log('✅ Federation loadRemote succeeded');
        } else {
          throw new Error('No Federation instance found');
        }
      } catch (federationError) {
        console.warn('⚠️ Module Federation failed:', federationError);
        
        // For Module Federation remote modules, there's no valid fallback
        // Dynamic import only works for local modules, not remote federation modules
        throw new Error(`Module Federation failed and no fallback available for remote module: ${modulePath}`);
      }

      // Extract component from module (handle different export patterns)
      const Component = extractComponentFromModule(remoteModule);

      console.log('✅ Remote component loaded successfully');
      setState({
        component: Component as T,
        error: null,
        isLoading: false,
      });

    } catch (err) {
      console.error(`❌ Error loading remote component (attempt ${attempt + 1}):`, err);
      
      // Retry logic
      if (attempt < retryCount) {
        console.log(`🔄 Retrying in ${retryDelay}ms...`);
        setTimeout(() => loadComponent(attempt + 1), retryDelay);
        return;
      }

      // Final failure - use fallback if enabled
        setState({
          component: null,
          error: err instanceof Error ? err.message : 'Unknown error loading remote component',
          isLoading: false,
        });
    
    }
  }, [modulePath, timeout, retryCount, retryDelay]);

  useEffect(() => {
    loadComponent();
  }, [loadComponent]);

  return state;
};
