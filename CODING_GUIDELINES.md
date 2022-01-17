# Coding guidelines

If you plan on contributing to systelab-components-wdio-test, please start reading the code coventions at https://github.com/systelab/systelab-angular-doc.

We will check each of them during the review process, but knowing about them ahead of time will reduce the number of iterations.

## General guidelines

- Add only widgets that exist in [systelab-components](https://github.com/systelab/systelab-components) library.
- Direct usage of WDIO shall be made only under 'wdio' folder. Use entities under this folder to wrap any required access.
- Add new entities into the corresponding barrel (index.ts file), thus they can be imported directly (i.e without relative paths) when consuming the library.
