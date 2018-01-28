'use strict'

// setup
const https = require('https')
const gtagOpts = {
  protocol: 'https:',
  hostname: 'api.github.com',
  path: '/repos/golang/go/git/refs/tags',
  port: 443,
  headers: {'User-Agent': 'doesdev/go-versions'}
}

// Exports
module.exports = goVersions

// Main
function goVersions () {
  return new Promise((resolve, reject) => {
    let relRgx = new RegExp(/^go(\d+\.\d+\.\d+)/)
    https.get(gtagOpts, (res) => {
      let json = ''
      let tags = {}
      res.on('error', reject)
      res.on('data', (data) => (json += data.toString()))
      res.on('end', () => {
        json = JSON.parse(json)
        let rels = json.map((r) => r.ref.replace('refs/tags/', ''))
        rels.forEach((r) => {
          tags[(((r || '').match(relRgx) || [])[1])] = true
        })
        rels = Object.keys(tags).filter((r) => r && r !== 'undefined')
        rels = rels.sort().reverse()
        return resolve(rels)
      })
    }).on('error', reject)
  })
}
