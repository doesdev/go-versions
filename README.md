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
const goVersions = require('go-versions')
goVersions().then(console.log).catch(console.error)
```

## cli usage

```sh
$ go-versions
# 1.7.3
# 1.7.2
# ...
```

## extra

The version list is pulled from github releases. For 90% of cases this needs no
special handling or thought. However, for things like CI which rely on this
module you may encounter problems due to rate limiting. To remedy that we will
pass your (github auth token)[https://github.com/settings/tokens] if you have
it set as an environment variable.

```sh
set GITHUB_OAUTH_TOKEN=mytoken
```

## License

MIT © [Andrew Carpenter](https://github.com/doesdev)
