# Screenshot utilities

This library provides several methods to faciliate implementing screenshot-based testing techniques.

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

Similarly, an screenshot of the region occupied by a page or a widget can be taken using the analogous methods of `Widget` or `BasePage` classes.


## Screenshot comparison

In order to compare two images, the `ScreenshotUtility` allows to compare them by a pixel by pixel comparison:

```typescript
    const chart: ElementFinder = ...;
    await ScreenshotUtility.expectScreenshot(chart, 'image-filename', 'Chart');
```

The utility exposes the `expectScreenshot()` method which requires following parameters:
- `element: ElementFinder`: ElementFinder of the DOM element that wants to be captured/compared
- `fileName: string`: The desired name to be given to the PNG files used for this comparison. This name shouldn't contain the extension (as it is added by the library). The path of these images shall be relative to the configured base path for screenshots (see screenshot comparison configuration section)
- `elementDescriptiveName: string`: A descriptive name of the element, this is used for reporting purposes as part of ReportUtility description

The utility then compares pixel by pixel an expected image against an actual image and returns the pixel difference as well as creating a diff image showing difference in case of image mismatch.

### Screenshot comparison configuration

The utility exposes also a couple of configuration methods:
- `setBasePath(string): void`: Sets the base path where the screenshots are located.
- `setPixelTolerance(number): void`: A number to compare with (lower or equal) from the output of the pixel difference of the image comparison. Ideally to be set to 0.

Those methods can used and called at a project level from the `wdio.conf.ts` file within the `beforeSession()` lifecycle hook. Ex:

```typescript
beforeSession: function (config, capabilities, specs) {
    ScreenshotUtility.setBasePath('./my-folder/screenshots');
	ScreenshotUtility.pixelTolerance(5);
},
```

> **Note:** an expected image file "<filename>.expected.png" is expected and needed for the utility to compare with. If no "<filename>.expected.png" file the utility will record a test failure. The utility generates always a "<filename>.actual.png" file that can be reused to be the "<filename>.expected.png" (visual verification needed). As part of execution the utility will always generate a "<filename>.actual.png" file and a "<filename>.diff.png" file; the diff file will only show differences in case of image mismatch.


### 3rd party dependencies

Current implementation of the utility is based on following external libraries:
- [pixelmatch](https://github.com/mapbox/pixelmatch): For image comparison
- [pngjs](https://github.com/lukeapage/pngjs): For image read/write to disk


