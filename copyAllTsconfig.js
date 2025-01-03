const fs = require('fs')
const path = require('path')

const _ = require('lodash')

// Function to find specified files
function findFiles(dir, fileNames, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
      findFiles(filePath, fileNames, fileList)
    } else if (fileNames.includes(file)) {
      fileList.push(filePath)
    }
  })

  return fileList
}

// Function to create directory structure and copy files
function copyFiles(sourceFiles, sourceDir, targetBaseDir) {
  // Create base directory if it doesn't exist
  if (!fs.existsSync(targetBaseDir)) {
    fs.mkdirSync(targetBaseDir, { recursive: true })
  }

  sourceFiles.forEach((sourcePath) => {
    // Get relative path from source directory
    const relativePath = path.relative(sourceDir, sourcePath)
    // Create target path
    const targetPath = path.join(targetBaseDir, relativePath)
    // Create directory structure
    const targetDir = path.dirname(targetPath)

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // Copy the file
    fs.copyFileSync(sourcePath, targetPath)
    console.log(`Copied: ${relativePath} -> ${targetPath}`)
  })
}

function main(sourceDir, targetDir, fileNames) {
  try {
    // Resolve absolute paths
    const resolvedSourceDir = path.resolve(sourceDir)
    const resolvedTargetDir = path.resolve(targetDir)

    // Validate source directory
    if (!fs.existsSync(resolvedSourceDir)) {
      throw new Error(`Source directory "${sourceDir}" does not exist`)
    }

    // Validate file names array
    if (!Array.isArray(fileNames) || fileNames.length === 0) {
      throw new Error('fileNames must be a non-empty array')
    }

    // Find all specified files
    const foundFiles = findFiles(resolvedSourceDir, fileNames)

    if (_.isEmpty(foundFiles)) {
      console.log(`No files matching [${fileNames.join(', ')}] found in ${sourceDir}`)
      return
    }

    console.log('\nFound files:')
    foundFiles.forEach((file) => console.log(file))

    // Copy files preserving directory structure
    copyFiles(foundFiles, resolvedSourceDir, resolvedTargetDir)
    console.log('\nAll files have been copied successfully!')
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

// Example usage:
const sourceDirectory = process.argv[2] || '.'
const targetDirectory = process.argv[3] || 'VSCodeTSConfig'
const filesToFind = process.argv.slice(4).length > 0 ? process.argv.slice(4) : ['tsconfig.json', 'tsconfig-base.json']

main(sourceDirectory, targetDirectory, filesToFind)
