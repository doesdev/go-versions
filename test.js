'use strict'

import test from 'ava'
import goVersions from './index'
import { compare } from 'semver'

test.serial(`should get array of go releases`, async (assert) => {
  let versions = await goVersions()
  assert.true(Array.isArray(versions))
})

test.serial(`releases should be sorted in semver order`, async (assert) => {
  let versions = await goVersions()
  let makeSemver = (v) => {
    let [major = 0, minor = 0, patch = 0] = v.split('.')
    return `${major}.${minor}.${patch}`
  }
  versions = versions.map(makeSemver)
  let svSorted = versions.map(makeSemver).sort(compare).reverse()
  assert.deepEqual(versions, svSorted)
})
