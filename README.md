[![Build Status](https://app.travis-ci.com/systelab/systelab-components-wdio-test.svg?branch=main)](https://app.travis-ci.com/systelab/systelab-components-wdio-test)
[![npm version](https://badge.fury.io/js/systelab-components-wdio-test.svg)](https://badge.fury.io/js/systelab-components-wdio-test)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/systelab-components-wdio-test/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/systelab-components-wdio-test?targetFile=package.json)

# systelab-components-wdio-test

Library with test tools for [systelab-components](https://github.com/systelab/systelab-components) based applications using [WebDriverIO](https://https://webdriver.io/) test framework.


## Installing the library

```bash
npm install systelab-components-wdio-test --save
```


## Working with the repo

```bash
git clone https://github.com/systelab/systelab-components-wdio-test.git
cd systelab-components-wdio-test
npm install
```


## Improving and publishing the library

Once you get your improvements merged, you will need an authorised user in order to publish it. Having the new version updated in the package.json file, you'll neeed to execute the following commands:
```bash 
npm login 
# Here you will enter your credentials
npm publish
```


## Using the library

### Create your Page Object

For every page object create a new class by extending BasePage. Call the super constructor with the tag name of the page component as a parameter.

```typescript
export class MainPage extends BasePage {

	constructor() {
		super('my-page-component-tag-name');
	}
```

In the Page Object, create methods to access the different widgets that can be directly found in the page. Some available widgets are:
Button, ComboBox, ContextMenu, Datepicker, Grid, Icon, InputField, Label, MesssagePopup, Popup, Dialog, Tab, Tabs

For example:

```typescript
	public getAllergyGrid(): Grid {
		return new Grid(this.current.byId('AllergyTable'));
	}
```
Use the appropriate locator (i.e byId, byTagName, byCSS, ...) in order to get the right ElementFinder.

Dialogs are considered widgets an not page objects, therefore, for each one, you will have to create a class extending Dialog and in that class create methods to access the different widgets that can be directly found in the dialog.

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
...
```


### Create your Test spec

In your spec files, use the needed page objects and access to the widgets through the methods defined. 
Interact with the widgets with the methods provided by the library. 

For example:

```typescript
it(`Should be able to do something`, async () => {
        const patientMaintenanceDialog = await mainPage.getPatientMaintenanceDialog();
		await patientMaintenanceDialog.getButtonAdd().click();
		const patientDialog = await patientMaintenanceDialog.getPatientDialog();
		await patientDialog.getTabs().selectTab(1);
	});
```

### Allure

In order to document test cases we suggest to use Allure.

With allure, test case actions are documented through the 'it' strings as in the following example:

```typescript
it(`Write a valid username and password in the login form`, async () => {
	// Implement action here
});
```

If documentation for an expectation is needed, use the convenient static function called *ReportUtility.addExpectedResult*, 
that allow to write an expectation string that wraps a code snippet. 

Using the function, the test case will look like the example below:

```typescript
await ReportUtility.addExpectedResult("Invalid username or password message is displayed", async () => {
	AssertionUtility.expectEqual(await loginPage.getMessagePopup().getTextMessage(), "Invalid username or password");
});
```

