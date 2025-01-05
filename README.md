# TypeScript Configuration Utilities

A collection of utility scripts for managing TypeScript configurations and type definitions across projects.

## Scripts

### 1. Copy TSConfig Files (`copyAllTsconfig.js`)

A utility script that finds and copies TypeScript configuration files across directory structures while preserving the folder hierarchy.

#### Usage

```bash
node copyAllTsconfig.js [sourceDir] [targetDir] [file1] [file2]
```

**Parameters:**
- `sourceDir` (optional): Source directory to search for files (default: current directory)
- `targetDir` (optional): Target directory to copy files to (default: 'VSCodeTSConfig')
- `file1, file2, ...` (optional): List of files to find and copy (default: ['tsconfig.json', 'tsconfig-base.json'])

**Features:**
- Recursively searches directories (excluding node_modules and .git)
- Preserves directory structure when copying
- Provides detailed logging of copied files
- Handles errors gracefully

### 2. Get Types Paths (`getAllTypes.js`)

A utility script that extracts TypeScript type definition paths from project dependencies.

#### Usage

```bash
node getAllTypes.js
```

**Features:**
- Reads project dependencies from package.json
- Extracts TypeScript type definition paths
- Generates a typesPaths.json file containing all found type paths


## Contributing

Feel free to submit issues and enhancement requests.

## License

[MIT License](LICENSE)