import { PerformanceTestUtils } from "./PerformanceTestUtils";
import { AccessibilityTestUtils } from "./AccessibilityTestUtils";
import { IntegrationTestUtils } from "./IntegrationTestUtils";
import { E2ETestUtils } from "./E2ETestUtils";
import { SnapshotTestUtils } from "./SnapshotTestUtils";

export interface TestSuite {
  name: string;
  type: "unit" | "integration" | "e2e" | "performance" | "accessibility" | "snapshot";
  tests: TestCase[];
  setup?: () => Promise<void>;
  teardown?: () => Promise<void>;
}

export interface TestCase {
  name: string;
  testFunction: () => Promise<any>;
  timeout?: number;
  skip?: boolean;
}

export interface TestResult {
  suiteName: string;
  testName: string;
  passed: boolean;
  duration: number;
  error?: string;
}

export class TestSuiteRunner {
  private static instance: TestSuiteRunner;
  private results: TestResult[] = [];
  private isRunning: boolean = false;

  public static getInstance(): TestSuiteRunner {
    if (!TestSuiteRunner.instance) {
      TestSuiteRunner.instance = new TestSuiteRunner();
    }
    return TestSuiteRunner.instance;
  }

  public async runSuite(suite: TestSuite): Promise<TestResult[]> {
    if (this.isRunning) {
      throw new Error("Test suite is already running");
    }

    this.isRunning = true;
    const suiteResults: TestResult[] = [];

    try {
      console.log(`ðŸš€ Starting test suite: ${suite.name} (${suite.type})`);

      // Setup
      if (suite.setup) {
        console.log("âš™ï¸ Running suite setup...");
        await suite.setup();
      }

      // Run tests
      for (const test of suite.tests) {
        if (test.skip) {
          console.log(`â­ï¸ Skipping test: ${test.name}`);
          continue;
        }

        const result = await this.runTest(suite, test);
        suiteResults.push(result);
        this.results.push(result);
      }

      // Teardown
      if (suite.teardown) {
        console.log("ðŸ§¹ Running suite teardown...");
        await suite.teardown();
      }

      const passed = suiteResults.filter(r => r.passed).length;
      const total = suiteResults.length;
      
      console.log(`âœ… Suite completed: ${suite.name} (${passed}/${total} passed)`);

    } catch (error) {
      console.error(`âŒ Suite failed: ${suite.name}`, error);
    } finally {
      this.isRunning = false;
    }

    return suiteResults;
  }

  private async runTest(suite: TestSuite, test: TestCase): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      console.log(`ðŸ§ª Running test: ${test.name}`);

      // Run test with timeout
      const timeout = test.timeout || 5000;
      await Promise.race([
        test.testFunction(),
        this.createTimeoutPromise(timeout),
      ]);

      const duration = Date.now() - startTime;
      console.log(`âœ… Test passed: ${test.name} (${duration}ms)`);

      return {
        suiteName: suite.name,
        testName: test.name,
        passed: true,
        duration,
      };

    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      console.log(`âŒ Test failed: ${test.name} (${duration}ms) - ${errorMessage}`);

      return {
        suiteName: suite.name,
        testName: test.name,
        passed: false,
        duration,
        error: errorMessage,
      };
    }
  }

  private createTimeoutPromise(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Test timed out after ${timeout}ms`));
      }, timeout);
    });
  }

  public async runAllSuites(suites: TestSuite[]): Promise<TestResult[]> {
    const allResults: TestResult[] = [];

    for (const suite of suites) {
      const results = await this.runSuite(suite);
      allResults.push(...results);
    }

    return allResults;
  }

  public getResults(): TestResult[] {
    return [...this.results];
  }

  public clearResults(): void {
    this.results = [];
  }

  public generateReport(): string {
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;

    let report = "Test Suite Report\n";
    report += "=================\n\n";
    report += `Total Tests: ${totalTests}\n`;
    report += `Passed: ${passedTests}\n`;
    report += `Failed: ${failedTests}\n`;
    report += `Success Rate: ${totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0}%\n\n`;

    // Group by suite
    const suiteGroups = this.groupResultsBySuite();
    
    Object.entries(suiteGroups).forEach(([suiteName, results]) => {
      const suitePassed = results.filter(r => r.passed).length;
      const suiteTotal = results.length;
      
      report += `ðŸ“‹ ${suiteName}: ${suitePassed}/${suiteTotal}\n`;
      
      results.forEach(result => {
        const status = result.passed ? "âœ…" : "âŒ";
        report += `  ${status} ${result.testName} (${result.duration}ms)\n`;
        
        if (!result.passed && result.error) {
          report += `     Error: ${result.error}\n`;
        }
      });
      
      report += "\n";
    });

    return report;
  }

  private groupResultsBySuite(): Record<string, TestResult[]> {
    return this.results.reduce((groups, result) => {
      if (!groups[result.suiteName]) {
        groups[result.suiteName] = [];
      }
      groups[result.suiteName].push(result);
      return groups;
    }, {} as Record<string, TestResult[]>);
  }
}

// Updated: 2026-01-20 23:51:10 - test(develop/testing): implement automated testing
