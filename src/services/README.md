# Platform Abstraction Layer

This directory contains the platform abstraction layer for Promptosaurus, enabling the application to run as both a Tauri desktop app and a Progressive Web App (PWA) with a unified codebase.

## Architecture

The platform abstraction layer follows a simple interface-based design pattern:

1. **PlatformService Interface**: Defines the contract for platform-specific operations
2. **Platform-specific Implementations**:
   - `TauriPlatformService`: Implementation for Tauri desktop app
   - `WebPlatformService`: Implementation for web/PWA
3. **Platform Context**: React context that provides the appropriate implementation

## Files

- `platformService.ts`: Interface defining platform-specific operations
- `tauriPlatformService.ts`: Tauri-specific implementation using Tauri's IPC
- `webPlatformService.ts`: Web/PWA implementation using browser APIs
- `platformContext.tsx`: React context provider that determines the platform and provides the appropriate service

## Usage

### Accessing the Platform Service

To use the platform service in a component:

```tsx
import { usePlatform } from '../services/platformContext';

const MyComponent: React.FC = () => {
  const platformService = usePlatform();
  
  const handleSave = async () => {
    await platformService.saveData('data to save');
  };
  
  const handleLoad = async () => {
    const data = await platformService.loadData();
    // Use the loaded data
  };
  
  return (
    // Component JSX
  );
};
```

### Adding New Platform-Specific Functionality

To add new platform-specific functionality:

1. Add the new method to the `PlatformService` interface in `platformService.ts`
2. Implement the method in both `TauriPlatformService` and `WebPlatformService`

Example:

```typescript
// In platformService.ts
export interface PlatformService {
  // Existing methods
  saveData(data: string): Promise<void>;
  loadData(): Promise<string>;
  
  // New method
  shareContent(content: string): Promise<void>;
}

// In tauriPlatformService.ts
async shareContent(content: string): Promise<void> {
  await invoke('share_content', { content });
}

// In webPlatformService.ts
async shareContent(content: string): Promise<void> {
  if (navigator.share) {
    await navigator.share({ text: content });
  } else {
    // Fallback for browsers that don't support the Web Share API
    console.warn('Web Share API not supported');
  }
}
```

## Platform Detection

The platform detection logic is in `platformContext.tsx`. It checks for the presence of Tauri-specific globals to determine if the app is running in Tauri.

You can also use the utility functions in `../utils/platformUtils.ts` for platform detection in other parts of the application.