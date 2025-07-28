import React from 'react';
import { createPortal } from 'react-dom';
import { TOAST_STYLES, PORTAL_TARGETS } from '../constants/remoteComponent';

export interface ErrorToastProps {
  message?: string;
  error: string;
  onClose?: () => void;
}

/**
 * Reusable error toast component for when remote components fail to load
 */
export const ErrorToast: React.FC<ErrorToastProps> = React.memo(({ message, error, onClose }) => {
  const handleClose = () => {
    onClose?.();
  };

  return createPortal(
    <div className={TOAST_STYLES.ERROR}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Toast Error</p>
          {message && <p className="text-sm">{message}</p>}
          <p className="text-xs mt-1 opacity-75">Error: {error}</p>
        </div>
        {onClose && (
          <button 
            onClick={handleClose} 
            className="ml-2 text-xs bg-red-600 px-2 py-1 rounded hover:bg-red-700 transition-colors"
            aria-label="Close error toast"
          >
            ×
          </button>
        )}
      </div>
    </div>,
    PORTAL_TARGETS.BODY
  );
});

ErrorToast.displayName = 'ErrorToast';
