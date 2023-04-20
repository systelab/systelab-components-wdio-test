# Traceability utility

This utility provides several methods to facilitate traceability of specs with test cases. 

## Trace of specifications

This utility has two working modes:
 - Add specs at either "it" (test) level
 - Add specs at "describe" (suite) level

### Tracing specs at "it" (test) level 
Setting specs at "it" level, the specs related to each "it" test are added with the `addCoveredSpecs()` method:
```typescript
TraceabilityUtility.addCoveredSpecs(['SwS6015', 'SwS6016']);
it('Perform a Log in', async () => {
    await LoginActionService.login(true, UserCredentialsList.getDefault());
    ...
});
```    
Then at suite level all specs added at "it" level can be dumped to the allure report at once with the `dumpCoveredSpecs()` method:
```typescript
describe('WDIO-TC-AT-SPECIFIC_TEST', () => {
    beforeEach(async () => {
        TestIdentification.setTmsLink('WDIO-TC-AT-SPECIFIC_TEST');
        ...
        TraceabilityUtility.dumpCoveredSpecs();
    });
});
```
### Tracing specs at "describe" (suite) level

With this approach, specs are directly set only at suite level, and they should be specified there with the `registerCoveredSpecs()` method:

```typescript
describe('WDIO-TC-AT-SPECIFIC_TEST', () => {
    beforeEach(async () => {
        TestIdentification.setTmsLink('WDIO-TC-AT-SPECIFIC_TEST');
        ...
        TraceabilityUtility.registerCoveredSpecs(['SwSxxx1', 'SwSxxx2', 'SwSxxx3', 'SwSxxx4']);
    });
});
```

