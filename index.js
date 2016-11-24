'use strict'

// Setup
const https = require('https')
const parseXML = require('xml2js').parseString
const goRelUrl = 'https://storage.googleapis.com/golang'

// Exports
module.exports = goVersions

// Main
function goVersions () {
  return new Promise((resolve, reject) => {
    let relRgx = new RegExp(/^go(\d+\.\d+\.\d+)/)
    https.get(goRelUrl, (res) => {
      let xml = ''
      let tags = {}
      res.on('error', reject)
      res.on('data', (data) => (xml += data.toString()))
      res.on('end', () => {
        parseXML(xml, (err, result) => {
          if (err) return reject(err)
          let root = result.ListBucketResult.Contents
          let rels = root.map((r) => (r.Key || [])[0])
          rels.forEach((r) => {
            tags[(((r || '').match(relRgx) || [])[1])] = true
          })
          rels = Object.keys(tags).filter((r) => r && r !== 'undefined')
          rels = rels.sort().reverse()
          return resolve(rels)
        })
      })
    }).on('error', reject)
  })
}
