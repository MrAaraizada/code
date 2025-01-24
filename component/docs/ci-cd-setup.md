# Android CI/CD Setup

## GitHub Actions Configuration

`yaml
name: Android CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Cache Gradle packages
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
      - name: Run tests
        run: ./gradlew test
      - name: Build APK
        run: ./gradlew assembleDebug
`

## Performance Monitoring

- APK size tracking
- Build time optimization
- Test execution metrics
- Code coverage reporting
