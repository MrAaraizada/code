import { act, renderHook } from "@testing-library/react-hooks";

export interface IntegrationTestConfig {
  timeout: number;
  retries: number;
  setupTimeout: number;
  teardownTimeout: number;
}

export class IntegrationTestUtils {
  private static defaultConfig: IntegrationTestConfig = {
    timeout: 10000,
    retries: 3,
    setupTimeout: 5000,
    teardownTimeout: 5000,
  };

  public static async runIntegrationTest<T>(
    testName: string,
    testFunction: () => Promise<T>,
    config: Partial<IntegrationTestConfig> = {}
  ): Promise<T> {
    const finalConfig = { ...this.defaultConfig, ...config };
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= finalConfig.retries; attempt++) {
      try {
        console.log(`Running integration test: ${testName} (attempt ${attempt})`);
        
        const result = await Promise.race([
          testFunction(),
          this.createTimeoutPromise(finalConfig.timeout),
        ]);

        console.log(`âœ… Integration test passed: ${testName}`);
        return result;
      } catch (error) {
        lastError = error as Error;
        console.log(`âŒ Integration test failed: ${testName} (attempt ${attempt})`);
        
        if (attempt < finalConfig.retries) {
          await this.delay(1000 * attempt); // Exponential backoff
        }
      }
    }

    throw new Error(`Integration test failed after ${finalConfig.retries} attempts: ${lastError?.message}`);
  }

  private static createTimeoutPromise<T>(timeout: number): Promise<T> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Test timed out after ${timeout}ms`));
      }, timeout);
    });
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public static async testHookIntegration<T>(
    hook: () => T,
    testFunction: (result: { current: T }) => Promise<void>
  ): Promise<void> {
    const { result, waitForNextUpdate } = renderHook(hook);

    await act(async () => {
      await testFunction(result);
    });

    // Wait for any pending updates
    try {
      await waitForNextUpdate({ timeout: 1000 });
    } catch {
      // No updates pending, which is fine
    }
  }

  public static createMockApiResponse<T>(
    data: T,
    delay: number = 100,
    shouldFail: boolean = false
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error("Mock API call failed"));
        } else {
          resolve(data);
        }
      }, delay);
    });
  }

  public static async waitForCondition(
    condition: () => boolean,
    timeout: number = 5000,
    interval: number = 100
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (condition()) {
        return;
      }
      await this.delay(interval);
    }

    throw new Error(`Condition not met within ${timeout}ms`);
  }
}
