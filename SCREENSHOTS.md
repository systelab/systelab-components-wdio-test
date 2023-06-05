# Screenshot utilities

This library provides several utilities to facilitate implementing screenshot-based testing techniques.

## Generate a screenshot

It is possible to generate a PNG screenshot and save it into disk of the whole browser with the following method:

```typescript
const fileapath = 'my-folder/my-screenshot.png'
await Browser.saveScreenshot(filepath);
```

It is also possible to get an in-memory base64 string with the taken screenshot as follows:

```typescript
const screenshotBase64: string = await Browser.takeScreenshot();
```

Similarly, an screenshot of the region occupied by a page or a widget can be taken using the analogous methods of `Widget` or `BasePage` classes. (See examples on section below)


## Screenshot comparison

In order to compare two images, the `ScreenshotUtility` allows to compare them by a pixel by pixel comparison:

```typescript
    const chart: ElementFinder = ...;
    await ScreenshotUtility.expectScreenshot(chart, 'image-filename', 'Chart');
```

```typescript
    const chartWidget: Widget = ...;
    await ScreenshotUtility.expectWidgetScreenshot(chartWidget, 'image-filename', 'Chart');
```

```typescript
    const chartPage: BasePage = ...;
    await ScreenshotUtility.expectPageScreenshot(chartPage, 'image-filename', 'Chart');
```

The utility exposes the `expectScreenshot()`, `expectWidgetScreenshot()` and `expectPageScreenshot()`  methods which require following parameters:
- Depending on the method used first parameter varies, in case of:
  - `expectScreenshot()` `element: ElementFinder`: ElementFinder of the DOM element that wants to be captured/compared
  - `expectWidgetScreenshot()` `widget: Widget`: Widget that wants to be captured/compared
  - `expectPageScreenshot()` `page: BasePage`: BasePage that wants to be captured/compared
- `fileName: string`: The desired name to be given to the PNG files used for this comparison. This name shouldn't contain the extension (as it is added by the library). The path of these images shall be relative to the configured base path for screenshots (see screenshot comparison configuration section)
- `elementDescriptiveName: string`: A descriptive name of the element, this is used for reporting purposes as part of ReportUtility description

The utility then compares pixel by pixel an expected image against an actual image and returns the pixel difference as well as creating a diff image showing difference in case of image mismatch.

> **Note:** an expected image file "<*fileName*>.expected.png" is expected and needed for the utility to compare with. If no "<*fileName*>.expected.png" file the utility will record a test failure. The utility generates always a "<*fileName*>.actual.png" file that can be reused to be the "<*fileName*>.expected.png" (visual verification needed). As part of execution the utility will always generate a "<*fileName*>.actual.png" file and a "<*fileName*>.diff.png" file; the diff file will only show differences in case of image mismatch.

### Screenshot comparison configuration

The utility exposes also a couple of configuration methods:
- `setBasePath(string): void`: Sets the base path where the screenshots are located.
- `setPixelTolerance(number): void`: A number to compare with (lower or equal) from the output of the pixel difference of the image comparison. Ideally to be set to 0.
- `setImageMatchingThreshold(number): void`: A number to set the matching threshold, ranges from 0 to 1. Smaller values make the comparison more sensitive. 0.1 by default.

Those methods can used and called at a project level from the `wdio.conf.ts` file within the `beforeSession()` lifecycle hook. Ex:

```typescript
import {ScreenshotUtility} from "./screenshot.util";

beforeSession: function (config, capabilities, specs) {
    ScreenshotUtility.setBasePath('./my-folder/screenshots');
    ScreenshotUtility.setPixelTolerance(5);
    ScreenshotUtility.setImageMatchingThreshold(0.2);
}
,
```

### 3rd party dependencies

Current implementation of the utility is based on following external libraries:
- [pixelmatch](https://github.com/mapbox/pixelmatch): For image comparison
- [pngjs](https://github.com/lukeapage/pngjs): For image read/write to disk


## Screenshot reporting

This utility allows generating screenshot based reporting. For now, it has been created for helping on tests troubleshooting, although it could be extended and used also for formalizing execution evidences. 

Screenshot reporting configuration:

- `setBasePath(string): void`: Sets the base path where the screenshots will be located.
- `beforeSuite(suite: any): void`: resets a spec (it) counter to zero. Intended to be called from beforeSuite hook.  
- `afterTest(test, context, status): Promise void`: takes a screenshot and saves it in a basic folder structure. Intended to be called from the afterTest hook.
  Structure example:
  ````
  - <"describe description string of 1st e2e-spec.ts file">/
    - 01-<1st "it" expectation string of e2e test">
    - 02-<2nd "it" expectation string of e2e test">
  
  - <"describe description string of 2nd e2e-spec.ts file">/
    - 01-<1st "it" expectation string of e2e test">
    - 02-<2nd "it" expectation string of e2e test">
  ````
### Usage: 

Set the base path for the output of screenshot reporting. To be called from wdio.conf.ts beforeSession hook:
```typescript
beforeSession: function(config, capabilities, specs) {
  ScreenshotReporter.setBasePath('../reports/screenshots/e2e');
},
```

Call `ScreenshotReporter.beforeSuite()` method. To be called from wdio.conf.ts beforeSuite hook:
```typescript
beforeSuite: function(suite) {
  ScreenshotReporter.beforeSuite(suite);
},
```

Call `ScreenshotReporter.afterTest()` method. To be called from wdio.conf.ts afterTest hook:
```typescript
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
  await ScreenshotReporter.afterTest(test, context, { error, result, duration, passed, retries });
},
```
