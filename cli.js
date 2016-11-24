#! /usr/bin/env node
'use strict'

require('./index')().then((vl) => console.log(vl.join('\n'))).catch(console.log)
