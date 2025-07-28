import React, { useMemo, ComponentType } from 'react';
import type { ToastProps } from 'remoteToast/Toast';
import { useRemoteComponent } from '../../hooks/useRemoteComponent';
import { ErrorToast } from '../ErrorToast';
import { LoadingToast } from '../LoadingToast';
import { PortalWrapper } from '../PortalWrapper';
import { REMOTE_COMPONENT_CONFIG } from '../../constants/remoteComponent';

// Props interface for the optimized RemoteToast component
export interface RemoteToastProps extends ToastProps {
  timeout?: number;
  retryCount?: number;
  showLoadingState?: boolean;
  loadingMessage?: string;
}

const RemoteToast: React.FC<RemoteToastProps> = React.memo(({
  message,
  type,
  onClose,
  duration = 5000,
  timeout = REMOTE_COMPONENT_CONFIG.TIMEOUT,
  retryCount = REMOTE_COMPONENT_CONFIG.RETRY_COUNT,
  showLoadingState = false,
  loadingMessage = 'Loading toast...'
}) => {
  console.log('🎯 RemoteToast component mounted with props:', { message, type, duration });

  // Use custom hook to handle remote component loading with retries and timeout
  const { component: ToastComponent, error, isLoading } = useRemoteComponent<ComponentType<ToastProps>>(
    REMOTE_COMPONENT_CONFIG.MODULE_PATHS.TOAST,
    {
      timeout,
      retryCount,
      retryDelay: REMOTE_COMPONENT_CONFIG.RETRY_DELAY,
    }
  );

  // Memoize the toast component props to prevent unnecessary re-renders
  const toastProps = useMemo(() => ({
    message,
    type,
    isVisible: true,
    duration,
    onClose,
  }), [message, type, duration, onClose]);

  // ERROR STATE: Show error toast if loading failed
  if (error) {
    return (
      <ErrorToast
        message={message}
        error={error}
        onClose={onClose}
      />
    );
  }

  // LOADING STATE: Show loading indicator if enabled and still loading
  if (isLoading && showLoadingState) {
    return (
      <LoadingToast message={loadingMessage} />
    );
  }

  // LOADING STATE (silent): Return null if still loading and silent mode
  if (isLoading) {
    return null;
  }

  // SUCCESS STATE: Remote component loaded successfully, render it
  if (ToastComponent) {
    console.log('🎨 Rendering ToastComponent...');
    
    return (
      <PortalWrapper>
        <ToastComponent {...toastProps} />
      </PortalWrapper>
    );
  }

  // Fallback: This should never happen but provides safety
  return null;
});

RemoteToast.displayName = 'RemoteToast';

export default RemoteToast;
