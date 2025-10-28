[![Build Status](https://app.travis-ci.com/systelab/systelab-components-wdio-test.svg?branch=main)](https://app.travis-ci.com/systelab/systelab-components-wdio-test)
[![npm version](https://badge.fury.io/js/systelab-components-wdio-test.svg)](https://badge.fury.io/js/systelab-components-wdio-test)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/systelab-components-wdio-test/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/systelab-components-wdio-test?targetFile=package.json)

# systelab-components-wdio-test

Library with test tools for [systelab-components](https://github.com/systelab/systelab-components) based applications using [WebDriverIO](https://webdriver.io/) test framework.


## Installing the library

Starting from **v8.1.0**, the library is distributed as **ESM** by default:

```bash
npm install systelab-components-wdio-test --save
```

If your project does not yet support ESM in e2e tests, you can use the **CommonJS-compatible build**:

```bash
npm install systelab-components-wdio-test@8.1.0-cjs.0 --save
```

---

## Requirements

### WDIO 9

* It requires a Node.js version higher than 16. In WDIO v9 documentation it is stated and recommended to use Node.js v20 or higher. 

## Working with the repo

```bash
git clone https://github.com/systelab/systelab-components-wdio-test.git
cd systelab-components-wdio-test
npm install
```


## Improving and publishing the library

Once you get your improvements merged, you will need an authorised user in order to publish it.
Having the new version updated in the `package.json` file, you'll need to execute the following commands:

```bash
npm login 
# Here you will enter your credentials
npm publish
```


## Using the library

### Create your Page Object

For every page object create a new class by extending BasePage.
Call the super constructor with the tag name of the page component as a parameter.

```typescript
export class MainPage extends BasePage {
  constructor() {
    super('my-page-component-tag-name');
  }
}
```

In the Page Object, create methods to access the different widgets that can be directly found in the page.
Some available widgets are: **Button, ComboBox, ContextMenu, Datepicker, Grid, Icon, InputField, Label, MessagePopup, Popup, Dialog, Tab, Tabs**.

For example:

```typescript
public getAllergyGrid(): Grid {
  return new Grid(this.current.byId('AllergyTable'));
}
```
Use the appropriate locator (i.e byId, byTagName, byCSS, ...) in order to get the right ElementFinder.

Dialogs are considered widgets, not page objects.
Therefore, for each one you will have to create a class extending `Dialog` and implement methods to access the widgets inside.

For example:

```typescript
public getAllergyDetailDialog(): AllergyDetailDialog {
  return new AllergyDetailDialog(Browser.byTagName('allergy-dialog'));
}
```

And the class implementing the dialog will be something like:

```typescript
export class AllergyDetailDialog extends Dialog {
  public getEnableSwitch() {
    return this.byId('AllergyEnableSwitch').byTagName('input');
  }
}
```


### Create your Test spec

In your spec files, use the page objects and interact with widgets through the provided methods.

Example:

```typescript
it(`Should be able to do something`, async () => {
  const patientMaintenanceDialog = await mainPage.getPatientMaintenanceDialog();
  await patientMaintenanceDialog.getButtonAdd().click();
  const patientDialog = await patientMaintenanceDialog.getPatientDialog();
  await patientDialog.getTabs().selectTab(1);
});
```
---

## Library Branching Policy

The main branch always targets the latest WDIO version (currently WDIO 9).

When upgrading the library to a newer WDIO version, create a maintenance branch from main for the currently supported WDIO version before starting the migration.
This ensures that bug fixes and patches can still be applied to the previous WDIO version.

### Branching and Versioning Pattern

| WDIO Version   | (Maintenance) Branch   |
|----------------|------------------------|
| **9 (latest)** | `main`                 |
| **8**          | `8.1.x`, `8.0.x`       |
| **7**          | `1.10.x` *(exception)* |



## Releasing CommonJS builds

Starting from v8.1.0 the default distribution is **ESM**.

In exceptional cases, when a project is not yet compatible with ESM for e2e tests, a **temporary CommonJS build** can be released.

### Branch naming

CommonJS releases must be created from a dedicated release branch following this naming convention:

```
release/<version>-cjs
```

Example:

```
release/8.1.0-cjs
```

### Steps to create a CommonJS release

1. Create a release branch from the target tag (e.g. `v8.1.0`):

   ```bash
   git checkout v8.1.0
   git checkout -b release/8.1.0-cjs
   ```

2. Apply the following changes:
- Update `tsconfig.json` to compile with `module: commonjs`.
- Remove `"type": "module"` from `package.json`.
- Update `package.json` version to `<version>-cjs.0` (e.g. `8.1.0-cjs.0`).

3. Update `CHANGELOG.md` and `README.md` to include the new release notes.


⚠️ **Note**: Only generate and publish CJS builds when required by a project.  
This is a temporary solution until all projects migrate to ESM.

---

### Versioning

This project follows [Semantic Versioning](https://semver.org/).

For a complete list of changes, bug fixes, and breaking changes, see the [CHANGELOG](./CHANGELOG.md).

#### Latest Releases

* **v9.1.1** (2025-10-28):

    * Update right click to use Javascript implementation to be compatible with WebKitGTK on Jenkins

* **v9.1.0** (2025-10-22):

    * Added long press and right click actions to ElementFinder and ElementFinderRemote

* **v9.0.0** (2025-10-08):

    * Upgraded the library to WebdriverIO v9 and updated all related dependencies to their latest compatible versions.

* **v8.1.0-cjs.0** (2025-10-02):

    * Compatibility build distributed as **CommonJS** for projects that cannot yet consume ESM.
    * Functionality is identical to v8.1.0, only the module format is different.

* **v8.1.0** (2025-09-25):

    * The `getOptionSelector` method in `src/widgets/combobox.ts` now returns the **first element** instead of the second.
    * **BREAKING CHANGE**: E2E tests depending on the previous behavior need to be adapted.

---

### Allure Reporting

In order to document test cases we suggest to use Allure.

With Allure, test case actions are documented through the `it` strings as in the following example:

```typescript
it(`Write a valid username and password in the login form`, async () => {
  // Implement action here
});
```

If documentation for an expectation is needed, use the convenient static function `ReportUtility.addExpectedResult`,
that allows writing an expectation string that wraps a code snippet.

Example:

```typescript
await ReportUtility.addExpectedResult("Invalid username or password message is displayed", async () => {
  AssertionUtility.expectEqual(
          await loginPage.getMessagePopup().getTextMessage(),
          "Invalid username or password"
  );
});
```

#### Traceability

See [traceability](TRACEABILITY.md) page for details on how to add into Allure Reporting traceability of specs with test cases.

### Screenshots

See [screenshots](SCREENSHOTS.md) page for details on utilities for screenshot-based testing techniques.