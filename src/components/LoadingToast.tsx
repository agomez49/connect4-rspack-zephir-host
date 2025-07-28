import React from 'react';
import { createPortal } from 'react-dom';
import { TOAST_STYLES, PORTAL_TARGETS } from '../constants/remoteComponent';

export interface LoadingToastProps {
  message?: string;
}

/**
 * Reusable loading component for when remote components are being loaded
 */
export const LoadingToast: React.FC<LoadingToastProps> = React.memo(({ 
  message = 'Loading...' 
}) => {
  return createPortal(
    <div className={TOAST_STYLES.LOADING}>
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
        <span className="text-sm">{message}</span>
      </div>
    </div>,
    PORTAL_TARGETS.BODY
  );
});

LoadingToast.displayName = 'LoadingToast';
