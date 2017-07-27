# go-versions [![NPM version](https://badge.fury.io/js/go-versions.svg)](https://npmjs.org/package/go-versions)   [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)   [![Dependency Status](https://dependencyci.com/github/doesdev/go-versions/badge)](https://dependencyci.com/github/doesdev/go-versions)

> Get list of GO version tags

## local install

```sh
$ npm install --save go-versions
```

## cli install

```sh
$ npm install --global go-versions
```

## programmatic usage

```js
var goVersions = require('go-versions')
goVersions().then(console.log).catch(console.error)
```

## cli usage

```sh
$ go-versions
# 1.7.3
# 1.7.2
# ...
```

## License

MIT © [Andrew Carpenter](https://github.com/doesdev)
