# Promptosaurus Progressive Web App (PWA) Implementation

## Overview
This document describes the Progressive Web App (PWA) implementation for Promptosaurus, which allows the application to be installed and run as a standalone app on supported devices while maintaining compatibility with the Tauri desktop application.

## Features
- Installable on supported devices (desktop and mobile)
- Offline capability with cached assets
- Responsive design for various screen sizes
- Automatic updates when new versions are deployed

## Key Files
- `/public/manifest.json` - Defines the PWA properties and icons
- `/public/sw.js` - Service worker for caching and offline functionality
- `/src/registerSW.ts` - Handles service worker registration
- `/public/icons/` - Contains SVG icons for the PWA

## How It Works

### Service Worker
The service worker (`/public/sw.js`) caches key application assets for offline use. It intercepts network requests and serves cached content when the user is offline.

### Web Manifest
The web manifest (`/public/manifest.json`) provides metadata about the application, including its name, icons, colors, and display mode. This information is used when installing the PWA.

### Conditional Registration
The service worker is only registered when the application is running in a web browser, not when running as a Tauri desktop application. This is handled by the `isTauriApp()` function in `registerSW.ts`.

## Development

### SVG Icons
The PWA uses SVG icons for better scalability and quality across different devices. The icons are located in the `/public/icons/` directory.

### Testing PWA Features
To test PWA features:
1. Build the application with `npm run build`
2. Serve the built files with a static server (e.g., `npx serve dist`)
3. Open the application in a supported browser (Chrome, Edge, etc.)
4. Use the browser's developer tools to verify service worker registration and manifest loading

## Deployment

When deploying the application as a PWA:
1. Ensure all PWA assets are included in the build
2. Configure your server to serve the correct MIME types for SVG files
3. Consider implementing HTTPS, which is required for service workers

## Maintenance and Troubleshooting

### Updating the Service Worker
When making changes to the service worker:
1. Increment the cache version in `sw.js` (e.g., change `promptosaurus-cache-v1` to `promptosaurus-cache-v2`)
2. Update the list of cached URLs if necessary

### Common Issues
- **Service worker not registering**: Ensure the application is served over HTTPS or localhost
- **Icons not displaying**: Verify the paths in the manifest match the actual file locations
- **PWA not installable**: Check the manifest for errors using browser developer tools

## Future Improvements
- Add more sophisticated caching strategies for different types of assets
- Implement background sync for offline data submission
- Add push notifications for important updates