import React from 'react';
import { createPortal } from 'react-dom';
import { PORTAL_TARGETS } from '../constants/remoteComponent';

export interface PortalWrapperProps {
  children: React.ReactNode;
  target?: Element | DocumentFragment;
}

/**
 * Reusable portal wrapper component
 */
export const PortalWrapper: React.FC<PortalWrapperProps> = React.memo(({ 
  children, 
  target = PORTAL_TARGETS.BODY 
}) => {
  return createPortal(children, target);
});

PortalWrapper.displayName = 'PortalWrapper';
