# Publishing react-persian-datepicker-element

This document contains instructions for preparing and publishing the React wrapper for the Persian Datepicker web component to npm.

## Preparation

1. Make sure all tests pass:

```bash
npm test
```

2. Ensure the build works:

```bash
npm run build
```

3. Update the version number in `package.json` following semantic versioning:
   - PATCH (1.0.x) - Bug fixes and minor changes
   - MINOR (1.x.0) - New features in a backward-compatible manner
   - MAJOR (x.0.0) - Breaking changes

4. Update the CHANGELOG.md file with the changes in the new version.

## Publishing to npm

1. Login to npm (if not already logged in):

```bash
npm login
```

2. Build the package:

```bash
npm run clean && npm run build
```

3. Test the package locally (optional but recommended):

```bash
npm pack
```

This will create a tarball that you can install in a test project:

```bash
npm install ../path/to/react-persian-datepicker-element-1.0.0.tgz
```

4. If everything looks good, publish to npm:

```bash
npm publish
```

## Publishing to GitHub Packages (Optional)

1. Create a `.npmrc` file with the following:

```
@OWNER:registry=https://npm.pkg.github.com
```

2. Login to GitHub Packages:

```bash
npm login --registry=https://npm.pkg.github.com
```

3. Update `package.json` to include the GitHub repository:

```json
{
  "name": "react-persian-datepicker-element",
  "repository": {
    "type": "git",
    "url": "https://github.com/OWNER/REPOSITORY.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

4. Publish to GitHub Packages:

```bash
npm publish
```

## After Publishing

1. Create a git tag for the release:

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

2. Create a release on GitHub with release notes.

3. Update documentation if needed.

## Notes about Dependencies

- This package includes `persian-datepicker-element` as a direct dependency, so it will be automatically installed when users install `react-persian-datepicker-element`.
- React and ReactDOM are peer dependencies so users need to have them installed in their projects. 