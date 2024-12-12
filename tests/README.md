# Test Suite

Tests will be continuously added for each new currency getter method. Workflow must be implemented as follows:

1. Create a file named `<context>.spec.ts`

2. Import the library with `import { <method-name>, type <type-name-if-exists> } from "@"`
(@ is the path alias of the project root dir)

3. Use `describe` test function to describe test suite file objective like *get the currency value of yen on different banks*

4. Define (at least) the following test cases:
- Avoid getting `NaN`
- get the value of the method and verify is a non zero value
- get the value of the method and verify the result is a `float`

5. Run the test with `yarn run test`