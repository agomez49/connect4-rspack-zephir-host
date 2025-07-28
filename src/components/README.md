# Local Components

This directory contains local components that are part of the main application bundle.

## Components

### ErrorToast

A fallback toast component shown when remote components fail to load.

**Features:**

- Error display with user-friendly messages
- Close functionality
- Portal-based rendering

### LoadingToast

A loading indicator component shown while remote components are being loaded.

**Features:**

- Simple loading spinner
- Configurable loading message
- Portal-based rendering

### PortalWrapper

A utility component that renders children in a React portal.

**Features:**

- Renders content in document.body
- Handles portal cleanup
- Reusable across components

### WinnerMessage

A game-specific component for displaying Connect4 winner information.

**Features:**

- Winner announcement
- Reset game functionality
- Lazy-loaded component

## Architecture

Local components:

1. Are bundled with the main application
2. Serve as fallbacks for remote components
3. Provide core UI functionality
4. Are imported directly without dynamic loading

## Usage

Local components are imported and used directly:

```tsx
import { ErrorToast, LoadingToast, PortalWrapper } from './components';
```
