# Changelog

All notable changes to this project will be documented in this file.
This project follows [Semantic Versioning](https://semver.org/).

## [9.1.1] - 2025-10-28

### Changed

* Update right click to use Javascript implementation to be compatible with WebKitGTK on Jenkins

## [9.1.0] - 2025-10-10

### Changed

* Added long press and right click actions to ElementFinder and ElementFinderRemote
* Fixed html request endpoint remote rest API

## [9.0.0] - 2025-10-08

### Changed

* Upgraded the library to WebdriverIO v9
* Updated library related dependencies to their latest compatible versions

### BREAKING CHANGES

* The majority of the new features in v9 are enabled by the WebDriver Bidi capabilities now available in browsers. Upon upgrading to v9, all sessions will automatically use Bidi unless you explicitly disable it via the new wdio:enforceWebDriverClassic capability.
* Others: some tests may require minor selector adjustments in very specific circumstances.

## [Unreleased]

## [8.1.0-cjs.0] - 2025-10-02

### Changed

* Created a CommonJS-compatible build for projects that cannot yet consume ESM.
* Functionality is identical to v8.1.0; only the module format was changed.

### Notes

* Versions with the `-cjs` suffix are **temporary builds**. They will only be published when a project still depends on CommonJS and cannot yet migrate to ESM.
* For installation details, please refer to the [README](./README.md).

## [8.1.0] - 2025-09-25

### Changed

* In `src/widgets/combobox.ts`, the method `getOptionSelector` now returns the **first element** matching the selector (`.get(0)`) instead of the second (`.get(1)`).

### BREAKING CHANGES

* E2E tests that expected the second element will need to be adapted, as `getOptionSelector` now returns the first element.
* This change was introduced to align the combobox behavior with the new version of `systelab-components` (v20).
* Ensure to update your tests accordingly if they relied on the previous behavior.