# OpenCORS

**OpenCORS** is a simple NodeJS based CORS Proxy

[![NPM](https://nodei.co/npm/opencors.png?mini=true)](https://www.npmjs.com/package/opencors)
[![npm version](https://badge.fury.io/js/opencors.svg)](https://www.npmjs.com/package/opencors)

## Features

* ✅ 0 Dependencies
* ✅ Follow redirects
* ✅ Plain output
* ✅ SSL

## Demo

[https://codesandbox.io/p/devbox/opencors-lrwj6n](https://codesandbox.io/p/devbox/opencors-lrwj6n)

## Installation

```javascript
npm install opencors
```

## Example

### Server (NodeJS)

```javascript
import {OpenCORS} from 'opencors'

const server = new OpenCORS({
	//port:4000
})
```
```javascript
const {OpenCORS} = require('opencors')

const server = new OpenCORS({
	//port:4000
})
```
Request examples:

* `https://lrwj6n-4000.csb.app/?url=https://www.google.com/` - Raw Google.com with CORS headers

### Client (Browser)

```javascript
fetch('https://lrwj6n-4000.csb.app/?url=https://www.google.com/').then(function (response){
	return response.text()
}).then(function (html){
	console.log(html)
}).catch(function (err){
	console.warn('Something went wrong.',err)
})
```

### Test

```javascript
git clone https://github.com/nuzulul/opencors.git
npm install
npm start
```

## License

MIT