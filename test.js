'use strict'

const { runTests, test } = require('mvt')
const goVersions = require('./index')
const { compare } = require('semver')

let makeSemver = (v) => {
  const [major = 0, minor = 0, patch = 0] = v.split('.')
  return `${major}.${minor}.${patch}`
}

runTests('test go-versions', () => {
  return goVersions().then((versions) => {
    const asSemver = versions.map(makeSemver)
    const svSorted = asSemver.sort(compare).reverse()
    const moduleResult = JSON.stringify(asSemver)
    const semverResult = JSON.stringify(svSorted)

    test(`should get array of go releases`, Array.isArray(versions))
    test(`releases should be sorted in semver order`, moduleResult, semverResult)

    return true
  })
})
