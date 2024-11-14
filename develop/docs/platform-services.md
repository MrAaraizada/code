# Platform Services API Documentation

## PlatformBridge

The PlatformBridge class provides a unified interface for communicating with native platform modules.

### Usage

```typescript
import { PlatformBridge } from '@design-system/react-native';

const bridge = PlatformBridge.getInstance();

// Register a native module
bridge.registerNativeModule('MyModule', MyNativeModule);

// Call native methods
const result = await bridge.callNativeMethod('MyModule', 'getData', param1, param2);
```

### Methods

#### registerNativeModule(name: string, module: any): void
Registers a native module with the bridge.

#### getNativeModule(name: string): any
Retrieves a registered native module.

#### callNativeMethod(moduleName: string, methodName: string, ...args: any[]): Promise<any>
Calls a method on a registered native module.

#### isNativeModuleAvailable(name: string): boolean
Checks if a native module is available.

#### listAvailableModules(): string[]
Returns a list of all registered module names.

## NativeModuleManager

Manages native modules with lifecycle support.

### Usage

```typescript
import { NativeModuleManager } from '@design-system/react-native';

const manager = NativeModuleManager.getInstance();

// Register modules
manager.registerModule('DeviceInfo', deviceInfoModule);

// Initialize all modules
await manager.initializeAll();

// Get available modules
const available = manager.getAvailableModules();
```

## EventEmitter

Cross-platform event system for component communication.

### Usage

```typescript
import { EventEmitter } from '@design-system/react-native';

const emitter = EventEmitter.getInstance();

// Listen to events
const unsubscribe = emitter.on('userLogin', (userData) => {
  console.log('User logged in:', userData);
});

// Emit events
emitter.emit('userLogin', { id: 1, name: 'John' });

// Clean up
unsubscribe();
```

### Methods

#### on<T>(event: string, listener: EventListener<T>): () => void
Adds an event listener and returns an unsubscribe function.

#### once<T>(event: string, listener: EventListener<T>): () => void
Adds a one-time event listener.

#### emit<T>(event: string, data?: T): void
Emits an event with optional data.

#### off(event: string, listener?: EventListener): void
Removes event listeners.

#### removeAllListeners(event?: string): void
Removes all listeners for an event or all events.

## Common Native Modules

Pre-configured wrappers for common native modules:

- **DeviceInfo**: Device information and capabilities
- **NetworkInfo**: Network connectivity status
- **FileSystem**: File system operations
- **Permissions**: Runtime permissions management
- **Biometrics**: Biometric authentication
- **Camera**: Camera access and controls
- **Location**: GPS and location services

## Platform-Specific Considerations

### iOS
- Uses Objective-C/Swift native modules
- Automatic permission dialogs
- App Store compliance requirements

### Android
- Uses Java/Kotlin native modules
- Runtime permission system
- ProGuard/R8 considerations

### Web
- Limited native module support
- Browser API fallbacks
- CORS and security restrictions
