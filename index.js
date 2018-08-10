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
if (process.env.GITHUB_OAUTH_TOKEN) {
  gtagOpts.headers['Authorization'] = `token ${process.env.GITHUB_OAUTH_TOKEN}`
}

// Exports
module.exports = goVersions

// Main
function goVersions () {
  return new Promise((resolve, reject) => {
    https.get(gtagOpts, (res) => {
      let json = ''
      res.on('error', reject)
      res.on('data', (data) => (json += data.toString()))
      res.on('end', () => {
        let tags = []
        try {
          json = JSON.parse(json)
        } catch (ex) {
          return reject(ex)
        }
        for (let entry of json) {
          let vStr = entry.ref
          if (vStr.indexOf('refs/tags/go') !== 0) continue
          vStr = vStr.substr(12)
          let svNums = vStr.split('.').map((n) => +n)
          if (svNums[0] !== undefined && Number.isNaN(svNums[0])) continue
          if (svNums[1] !== undefined && Number.isNaN(svNums[1])) continue
          if (svNums[2] !== undefined && Number.isNaN(svNums[2])) continue
          let major = svNums[0] || 0
          let minor = svNums[1] || 0
          let patch = svNums[2] || 0
          tags.push({vStr, major, minor, patch})
        }
        let rels = tags.sort((a, b) => {
          let aScore = (a.major * 10000) + (a.minor * 1000) + a.patch
          let bScore = (b.major * 10000) + (b.minor * 1000) + b.patch
          return bScore - aScore
        }).map((tag) => tag.vStr)
        return resolve(rels)
      })
    }).on('error', reject)
  })
}
