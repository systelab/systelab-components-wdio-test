# Changelog

All notable changes to this project will be documented in this file.
This project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [8.1.0-cjs.0] - 2025-10-02

### Changed

* Created a CommonJS-compatible build for projects that cannot yet consume ESM.
* Functionality is identical to v8.1.0; only the module format was changed.

## [8.1.0] - 2025-09-25

### Changed

* In `src/widgets/combobox.ts`, the method `getOptionSelector` now returns the **first element** matching the selector (`.get(0)`) instead of the second (`.get(1)`).

### BREAKING CHANGES

* E2E tests that expected the second element will need to be adapted, as `getOptionSelector` now returns the first element.
* This change was introduced to align the combobox behavior with the new version of `systelab-components` (v20).
* Ensure to update your tests accordingly if they relied on the previous behavior.
