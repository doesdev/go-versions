'use strict'

import test from 'ava'
import goVersions from './index'

test.serial(`should get array of go releases`, async (assert) => {
  let versions = await goVersions()
  assert.true(Array.isArray(versions))
})
