# Remote Components

This directory contains components that load microfrontend modules using Module Federation.

## Components

### RemoteToast

A wrapper component that dynamically loads and renders a remote Toast component from the `remoteToast` microfrontend.

**Features:**

- Dynamic loading with timeout and retry logic
- Error handling with fallback components
- Loading states with optional UI feedback
- React.memo optimization for performance

**Usage:**

```tsx
import RemoteToast from './components/remote/RemoteToast';

<RemoteToast
  message="Hello from remote!"
  type="success"
  duration={5000}
  onClose={() => console.log('closed')}
/>
```

## Architecture

Remote components in this folder:

1. Use the `useRemoteComponent` hook for dynamic loading
2. Handle loading, error, and success states
3. Provide fallback UI when remote components fail
4. Are isolated from local components for better organization

## Adding New Remote Components

When adding new remote components:

1. Create the component in this `remote/` directory
2. Use the `useRemoteComponent` hook
3. Implement proper error handling
4. Update the main exports in `src/index.ts`
