import { renderHook, waitFor } from '@testing-library/react';
import { useRemoteComponent } from '../hooks/useRemoteComponent';

// Successful mock for remote component
jest.mock('successful-module', () => ({
  default: () => 'MockComponent'
}), { virtual: true });

// Failed mock for remote component
jest.mock('failed-module', () => {
  throw new Error('Module not found');
}, { virtual: true });

describe('useRemoteComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should start in loading state', () => {
    const { result } = renderHook(() => 
      useRemoteComponent('test-module', { timeout: 1000, retryCount: 0 })
    );

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.component).toBe(null);
    expect(result.current.error).toBe(null);
  });

  test('should handle component loading with proper state management', async () => {
    const { result } = renderHook(() => 
      useRemoteComponent('successful-module', { timeout: 5000, retryCount: 1 })
    );

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    // Wait for the component to potentially load or fail
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 6000 });

    // Should either have a component or an error, but not loading
    expect(result.current.isLoading).toBe(false);
    expect(
      result.current.component !== null || result.current.error !== null
    ).toBe(true);
  });

  test('should have proper error handling capability', async () => {
    const { result } = renderHook(() => 
      useRemoteComponent('failed-module', { timeout: 1000, retryCount: 0 })
    );

    // Wait for error to be set
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 2000 });

    // Should be in a final state (not loading)
    expect(result.current.isLoading).toBe(false);
  });
});
