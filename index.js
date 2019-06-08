'use strict'

const https = require('https')
const gtagOpts = {
  protocol: 'https:',
  hostname: 'api.github.com',
  path: '/repos/golang/go/git/refs/tags',
  port: 443,
  headers: { 'User-Agent': 'doesdev/go-versions' }
}

if (process.env.GITHUB_OAUTH_TOKEN) {
  gtagOpts.headers['Authorization'] = `token ${process.env.GITHUB_OAUTH_TOKEN}`
}

module.exports = () => new Promise((resolve, reject) => {
  https.get(gtagOpts, (res) => {
    let json = ''

    res.on('error', reject)
    res.on('data', (data) => (json += data.toString()))
    res.on('end', () => {
      const tags = []

      try {
        json = JSON.parse(json)
      } catch (ex) {
        return reject(ex)
      }

      for (const entry of json) {
        let vStr = entry.ref

        if (vStr.indexOf('refs/tags/go') !== 0) continue

        vStr = vStr.substr(12)
        const svNums = vStr.split('.').map((n) => +n)

        if (svNums[0] !== undefined && Number.isNaN(svNums[0])) continue
        if (svNums[1] !== undefined && Number.isNaN(svNums[1])) continue
        if (svNums[2] !== undefined && Number.isNaN(svNums[2])) continue

        const major = svNums[0] || 0
        const minor = svNums[1] || 0
        const patch = svNums[2] || 0

        tags.push({ vStr, major, minor, patch })
      }

      const rels = tags.sort((a, b) => {
        const aScore = (a.major * 10000) + (a.minor * 1000) + a.patch
        const bScore = (b.major * 10000) + (b.minor * 1000) + b.patch

        return bScore - aScore
      }).map((tag) => tag.vStr)

      return resolve(rels)
    })
  }).on('error', reject)
})
