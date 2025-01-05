const fs = require('fs')
const path = require('path')

const packageJson = require('./package.json')
const { dependencies } = packageJson
const packageJsonOfDependencies = Object.keys(dependencies).map((dependency) => {
  try {
    const packageJsonPath = `./node_modules/${dependency}/package.json`
    const packageJson = require(packageJsonPath)
    const types = path.join(packageJsonPath, packageJson.types)
    return types
  } catch (error) {
    console.log(error)
    return null
  }
})
const typesPaths = packageJsonOfDependencies.filter((pkg) => pkg !== null)
fs.writeFileSync('typesPaths.json', JSON.stringify(typesPaths, null, 2))
