import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ToastProps {
    message?: string;
    type?: "success" | "error" | "warning" | "info";
    duration?: number;
    onClose?: () => void;
    isVisible?: boolean;
}

const RemoteToast: React.FC<ToastProps> = ({ message, type, onClose, duration = 5000 }) => {
    const [ToastComponent, setToastComponent] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadRemoteComponent = async () => {
            try {
                const loadPromise = import('remoteToast/Toast');
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout loading remote component')), 10000)
                );

                const remoteModule: any = await Promise.race([loadPromise, timeoutPromise]);
                const Component = remoteModule.default || remoteModule.Toast || remoteModule;

                if (isMounted && typeof Component === 'function') {
                    setToastComponent(() => Component);
                    setError(null);
                } else {
                    throw new Error(`Invalid component type: ${typeof Component}`);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Unknown error loading remote component');
                }
            }
        };

        loadRemoteComponent();
        return () => { isMounted = false; };
    }, []);

    if (error) {
        return createPortal(
            <div className="fixed top-4 right-4 z-50 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Toast Error</p>
                        <p className="text-sm">{message}</p>
                        <p className="text-xs mt-1 opacity-75">Error: {error}</p>
                    </div>
                    <button onClick={onClose} className="ml-2 text-xs bg-red-600 px-2 py-1 rounded">
                        ×
                    </button>
                </div>
            </div>,
            document.body
        );
    }

    if (!ToastComponent) {
        return createPortal(<div >{ }</div>, document.body);
    }

    return createPortal(
        <ToastComponent
            message={message}
            type={type}
            isVisible={true}
            duration={duration}
            onClose={onClose}
        />,
        document.body
    );
};

export default RemoteToast;
