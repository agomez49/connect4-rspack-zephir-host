# Connect 4 Game with Optimized Module Federation

A modern Connect 4 game built with [Rspack](https://rspack.dev/) 1.4.9, React 19, TypeScript, and Tailwind CSS, demonstrating **optimized Module Federation** integration with enterprise-grade remote component architecture, comprehensive testing setup, and 100% type-safe implementation.

## 🎮 Game Features

- **Interactive Connect 4 Gameplay**: Classic 7x6 grid with click-to-drop mechanics
- **Real-time Winner Detection**: Advanced algorithm checking horizontal, vertical, and diagonal wins
- **Optimized Module Federation Toast**: Remote success notifications with advanced error handling, retry logic, and fallback systems
- **Modern React 19 UI**: Clean design with Tailwind CSS and React.memo optimizations
- **100% Type-Safe**: Complete TypeScript implementation with zero `any` usage
- **Enterprise Architecture**: Modular component organization with clear separation between local and remote components
- **Comprehensive Testing**: Jest + React Testing Library setup with component mocks
- **Production Ready**: Environment-based configuration with Zephyr deployment integration

---

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/agomez49/rspack-project.git
   cd rspack-project
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your remote Toast component URL
   ```

4. **Start development server:**
   ```bash
   pnpm dev
   # Runs on http://localhost:8081
   ```

---

## 🛠️ Available Scripts

- **`pnpm dev`** — Start development server with HMR on port 8081
- **`pnpm build`** — Build optimized production bundle
- **`pnpm preview`** — Preview production build locally
- **`pnpm test`** — Run Jest test suite with React Testing Library
- **`pnpm test:watch`** — Run tests in watch mode for development
- **`pnpm test:coverage`** — Generate test coverage reports

---

## ⚡ Technology Stack

### Core Technologies

- **Rspack 1.4.9**: Fast build tool with Module Federation support
- **React 19.1.0**: Latest React with modern features and concurrent rendering
- **TypeScript 5.8.3**: Full type safety and modern JavaScript features
- **Tailwind CSS 3.4.17**: Utility-first styling with PostCSS integration

### Module Federation

- **Host Application**: Connect 4 game consuming remote components
- **Remote Component**: Toast notifications from Zephyr platform deployment
- **Shared Dependencies**: React/React-DOM with strict version matching and eager loading
- **Error Handling**: Comprehensive fallback system with loading and error states

### Development Tools

- **React Refresh**: Hot module replacement for instant development feedback
- **Jest 30.0.5**: Modern testing framework with ESM support
- **React Testing Library 16.3.0**: Component testing with user-centric approach
- **PostCSS + Autoprefixer**: CSS processing with modern browser support
- **Zephyr Integration**: Remote component deployment and versioning platform
- **Environment Variables**: Flexible configuration for different deployment environments
- **SWC Compiler**: Fast TypeScript/JSX compilation with modern browser targets

### Testing Infrastructure

- **Jest Configuration**: Full ESM support with React 19 compatibility
- **React Testing Library**: User-focused component testing
- **Component Mocks**: Mocked remote components for isolated testing
- **Setup Scripts**: Comprehensive test environment configuration
- **JSDOM Environment**: Browser-like testing environment

---

## 🏗️ Project Structure

```text
rspack-project/
├── src/
│   ├── App.tsx                           # Main Connect 4 game component
│   ├── main.tsx                          # React 19 application entry point
│   ├── index.css                         # Tailwind CSS imports and utilities
│   ├── index.ts                          # Central exports for the system
│   ├── react-env.d.ts                    # React type declarations
│   ├── setupTests.ts                     # Jest testing configuration
│   ├── assets/
│   │   └── react.svg                     # React logo asset
│   ├── components/                       # Local components
│   │   ├── README.md                     # Local components documentation
│   │   ├── ErrorToast.tsx                # Error fallback component
│   │   ├── LoadingToast.tsx              # Loading state component
│   │   ├── PortalWrapper.tsx             # Reusable portal wrapper
│   │   ├── WinnerMessage.tsx             # Game victory display (lazy loaded)
│   │   └── remote/                       # Remote components
│   │       ├── README.md                 # Remote components documentation
│   │       └── RemoteToast.tsx           # Module Federation wrapper (optimized)
│   ├── hooks/
│   │   └── useRemoteComponent.ts         # Advanced remote loading hook
│   ├── utils/
│   │   └── remoteComponent.ts            # Component extraction utilities
│   ├── constants/
│   │   └── remoteComponent.ts            # Configuration constants
│   ├── types/
│   │   ├── components.ts                 # Component type definitions
│   │   └── remotes.d.ts                  # Remote module type declarations
│   └── __tests__/
│       └── useRemoteComponent.test.ts    # Hook unit tests
├── jest.config.json                      # Jest testing configuration
├── index.html                            # HTML template with React 19 root
├── rspack.config.js                      # Rspack and Module Federation config
├── tailwind.config.js                    # Tailwind CSS configuration
├── postcss.config.js                     # PostCSS configuration
├── tsconfig.json                         # TypeScript configuration
├── zephyr.config.js                      # Zephyr platform integration
├── package.json                          # Dependencies and scripts
├── .env.example                          # Environment variables template
└── README.md                             # This comprehensive documentation
```
├── .env.example                  # Environment variables template
└── README.md                     # This documentation
```

---

## 🎯 Game Rules

1. **Objective**: Connect 4 pieces of your color in a row (horizontal, vertical, or diagonal)
2. **Players**: Red (R) and Yellow (Y) take turns dropping pieces
3. **Gameplay**: Click on any column to drop your piece in the lowest available slot
4. **Victory Condition**: First player to connect 4 pieces wins and triggers a Module Federation remote Toast notification
5. **Game Reset**: Refresh the page to start a new game

---

## 🔗 Module Federation Architecture

This project implements an **enterprise-grade Module Federation system** with comprehensive optimizations:

### Core Features
- **Runtime Loading**: Advanced `useRemoteComponent` hook with retry mechanisms and Module Federation API integration
- **Type Safety**: 100% TypeScript coverage with zero `any` usage across all remote interactions
- **Error Handling**: Comprehensive fallback and error boundary strategies with graceful degradation
- **Performance**: Optimized loading with React.memo, Suspense integration, and lazy component loading
- **Testing**: Full Jest/RTL coverage for all Module Federation scenarios with mock implementations

### Architecture Components

#### Advanced Remote Loading Hook
```typescript
// useRemoteComponent.ts - Enterprise-grade remote loading
const remoteComponent = useRemoteComponent({
  remoteName: 'toastLibrary',
  moduleName: './toastComponent', 
  componentName: 'ToastComponent'
});
```

#### Type System
- **Component Interfaces**: Complete Module Federation type definitions in `types/components.ts`
- **Runtime Types**: Webpack runtime and remote module types in `types/remotes.d.ts`
- **Zero Any Usage**: All remote interactions are fully typed with strict TypeScript

#### Component Organization
- **Local Components**: `src/components/` - Application-specific UI components
- **Remote Components**: `src/components/remote/` - Module Federation wrapper components
- **Clear Separation**: Explicit architectural boundaries for maintainability and testing

### Configuration Details

```javascript
// rspack.config.js - Optimized Module Federation setup
remotes: {
  remoteToast: `remoteToast@${process.env.REMOTE_TOAST_URL}/remoteEntry.js`
},
shared: {
  react: { 
    eager: true, 
    singleton: true,
    requiredVersion: '^19.1.0',
    strictVersion: true
  },
  'react-dom': { 
    eager: true, 
    singleton: true,
    requiredVersion: '^19.1.0', 
    strictVersion: true
  },
  'react-dom/client': {
    eager: true,
    singleton: true,
    requiredVersion: '^19.1.0',
    strictVersion: true
  }
}
```

---

## 🔧 Environment Configuration

### Environment Variables Setup

1. **Copy the template:**

   ```bash
   cp .env.example .env
   ```

2. **Configure your remote URL:**

   ```dotenv
   # .env
   REMOTE_TOAST_URL=https://your-remote-deployment.zephyrcloud.app
   ```

### Available Environment Options

```dotenv
# Base URL for remote component (without /remoteEntry.js)
# Module Federation will add /remoteEntry.js automatically
# Zephyr will use the base URL as-is

# Development
REMOTE_TOAST_URL=http://localhost:3001

# Staging  
REMOTE_TOAST_URL=https://staging-remote.zephyrcloud.app

# Production
REMOTE_TOAST_URL=https://prod-remote.zephyrcloud.app
```

### Configuration Architecture

The project uses a **"each service adds what it needs"** approach:

#### **Module Federation (rspack.config.js):**

```javascript
remotes: {
  remoteToast: `remoteToast@${process.env.REMOTE_TOAST_URL}/remoteEntry.js`
}
```

#### **Zephyr (zephyr.config.js):**

```javascript
export const zephyrConfig = {
  dependencies: {
    "rspack-remote": process.env.REMOTE_TOAST_URL
  }
}
```

### Benefits

- ✅ **No hardcoded URLs** in source code
- ✅ **Environment-specific** remote URLs (dev/staging/production)
- ✅ **Repository security** - safe for public repositories
- ✅ **Team collaboration** - easy local development setup
- ✅ **Zephyr integration** - automatic remote component versioning

---

## 🚀 Current Deployment

The project integrates with a **Zephyr-hosted remote Toast component**. The remote URL is configured via environment variables for security and flexibility.

**Configuration Example:**

```dotenv
# .env
REMOTE_TOAST_URL=https://your-deployment.zephyrcloud.app
```

This base URL is automatically extended by each service:

- **Module Federation**: `{base_url}/remoteEntry.js`
- **Zephyr**: `{base_url}` (used as-is)

The remote component provides styled Toast notifications that appear when a player wins the Connect 4 game.

### Security Benefits

- ✅ **No hardcoded URLs** in public repositories
- ✅ **Environment-specific** configuration
- ✅ **Private deployment URLs** not exposed
- ✅ **Team flexibility** - each developer can use their own remote

---

## ⚡ Type Safety Achievements

This project demonstrates **100% TypeScript coverage** with zero `any` usage:

### Type System Highlights
- **Complete Interface Coverage**: All Module Federation interactions are fully typed
- **Utility Functions**: Comprehensive typing for `extractRemoteComponent` and helper utilities  
- **Hook Implementation**: `useRemoteComponent` with full generic type support
- **Component Props**: Strict typing for all local and remote component interfaces
- **Error States**: Typed error handling and fallback mechanisms

### Before vs After Comparison
```typescript
// Before: Using 'any' (eliminated)
const RemoteComponent: any = await import('remoteModule');

// After: Fully typed implementation
const RemoteComponent = await extractRemoteComponent<ToastProps>({
  remoteName: 'toastLibrary',
  moduleName: './toastComponent', 
  componentName: 'ToastComponent'
});
```

### Type Safety Benefits
- **Runtime Safety**: Eliminates runtime type errors through comprehensive interfaces
- **Developer Experience**: Full IntelliSense support for all remote component interactions
- **Maintainability**: Clear contracts between local and remote components
- **Debugging**: Improved error messages and debugging capabilities

---

## 🏛️ Enterprise Architecture Benefits

This implementation showcases enterprise-grade patterns:

### Architectural Improvements
- **Separation of Concerns**: Clear distinction between local and remote components
- **Modular Organization**: Well-defined component hierarchy and responsibilities
- **Code Reusability**: Reusable utilities and hooks for remote component loading
- **Testing Strategy**: Comprehensive test coverage with proper mocking strategies

### Performance Optimizations
- **Code Splitting**: Lazy loading for both local and remote components
- **Memory Efficiency**: Proper cleanup and resource management
- **Bundle Optimization**: Strategic dependency sharing in Module Federation
- **Caching Strategy**: Efficient component caching and retry mechanisms

### Maintainability Features
- **Documentation**: Comprehensive README files for each component directory
- **Type Definitions**: Complete TypeScript coverage with clear interfaces
- **Error Handling**: Graceful degradation and comprehensive error boundaries
- **Code Standards**: Consistent coding patterns and English-only comments

---

## 📚 Documentation & Resources

- [Rspack Documentation](https://rspack.dev/) - Modern build tool
- [Module Federation Guide](https://module-federation.github.io/) - Micro-frontend architecture
- [React 19 Documentation](https://react.dev/) - Latest React features
- [Tailwind CSS Documentation](https://tailwindcss.com/) - Utility-first CSS
- [Zephyr Platform](https://zephyrcloud.app/) - Remote component deployment
- [TypeScript Documentation](https://www.typescriptlang.org/) - Type safety
