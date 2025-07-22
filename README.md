# Connect 4 Game with Module Federation Toast

A modern Connect 4 game built with [Rspack](https://rspack.dev/) 1.4.9, React 19, TypeScript, and Tailwind CSS, demonstrating **Module Federation** integration with a remote Toast component deployed on Zephyr platform.

## 🎮 Game Features

- **Interactive Connect 4 Gameplay**: Classic 7x6 grid with click-to-drop mechanics
- **Real-time Winner Detection**: Advanced algorithm checking horizontal, vertical, and diagonal wins
- **Module Federation Toast**: Remote success notifications with error handling and fallbacks
- **Modern React 19 UI**: Clean design with Tailwind CSS and smooth animations
- **Full TypeScript Support**: Complete type safety including remote component interfaces
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
- **PostCSS + Autoprefixer**: CSS processing with modern browser support
- **Zephyr Integration**: Remote component deployment and versioning platform
- **Environment Variables**: Flexible configuration for different deployment environments

---

## 🏗️ Project Structure

```text
rspack-project/
├── src/
│   ├── App.tsx                    # Main Connect 4 game component
│   ├── main.tsx                   # React 19 application entry point
│   ├── index.css                  # Tailwind CSS imports and utilities
│   ├── react-env.d.ts            # React and Module Federation type declarations
│   ├── assets/
│   │   └── react.svg              # React logo asset
│   ├── components/
│   │   ├── RemoteToast.tsx        # Module Federation remote wrapper with error handling
│   │   └── WinnerMessage.tsx      # Game victory display component (lazy loaded)
│   └── types/
│       └── remotes.d.ts          # TypeScript declarations for remote modules
├── index.html                     # HTML template with React 19 root
├── rspack.config.js              # Rspack and Module Federation configuration
├── tailwind.config.js            # Tailwind CSS with remote component safelist
├── postcss.config.js             # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
├── zephyr.config.js              # Zephyr platform integration
├── package.json                  # Dependencies and npm scripts
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

This project demonstrates advanced **Module Federation** patterns for micro-frontend architecture:

### Remote Component Integration

- **Dynamic Loading**: Asynchronously imports Toast component from external Zephyr deployment
- **Type Safety**: Full TypeScript interfaces for remote component props and contracts
- **Error Resilience**: Comprehensive error handling with graceful fallbacks
- **DOM Isolation**: Uses React `createPortal` to prevent CSS conflicts and ensure proper rendering
- **Shared Dependencies**: Strict React version matching with singleton and eager loading

### Configuration Details

```javascript
// rspack.config.js - Module Federation setup
remotes: {
  remoteToast: `remoteToast@${process.env.REMOTE_TOAST_URL}`
},
shared: {
  react: { 
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
   REMOTE_TOAST_URL=https://your-deployment.zephyrcloud.app/remoteEntry.js
   ```

### Available Environment Options

```dotenv
# Development
REMOTE_TOAST_DEV_URL=http://localhost:3001/remoteEntry.js

# Staging  
REMOTE_TOAST_STAGING_URL=https://staging-remote.zephyrcloud.app/remoteEntry.js

# Production
REMOTE_TOAST_PROD_URL=https://prod-remote.zephyrcloud.app/remoteEntry.js
```

### Benefits

- ✅ **No hardcoded URLs** in source code
- ✅ **Environment-specific** remote URLs (dev/staging/production)
- ✅ **Repository security** - safe for public repositories
- ✅ **Team collaboration** - easy local development setup

---

## 🚀 Current Deployment

The project integrates with a **Zephyr-hosted remote Toast component**:

**Current Remote URL:**

```text
https://alejandro-g-mez-431-rspack-remote-rspack-remote-a-078ae198c-ze.zephyrcloud.app/remoteEntry.js
```

This remote component provides styled Toast notifications that appear when a player wins the Connect 4 game.

---

## 📚 Documentation & Resources

- [Rspack Documentation](https://rspack.dev/) - Modern build tool
- [Module Federation Guide](https://module-federation.github.io/) - Micro-frontend architecture
- [React 19 Documentation](https://react.dev/) - Latest React features
- [Tailwind CSS Documentation](https://tailwindcss.com/) - Utility-first CSS
- [Zephyr Platform](https://zephyrcloud.app/) - Remote component deployment
- [TypeScript Documentation](https://www.typescriptlang.org/) - Type safety
