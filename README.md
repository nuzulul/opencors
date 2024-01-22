# OpenCORS

**OpenCORS** is a simple NodeJS based CORS Proxy

## Features

✅ 0 Dependencies
✅ Follow redirects
✅ Raw response type
✅ SSL

## Installation

```javascript
npm install opencors
```

## Example

### Server

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

### Client

```javascript
fetch('https://lrwj6n-4000.csb.app/?url=https://www.google.com/').then(function (response){
	return response.text()
}).then(function (html){
	console.log(html)
}).catch(function (err){
	console.warn('Something went wrong.',err)
})
```

## Demo

```javascript
git clone https://github.com/nuzulul/opencors.git
npm install
npm start
```

Live demo :

* [https://lrwj6n-4000.csb.app/](https://lrwj6n-4000.csb.app/)
* [https://codesandbox.io/p/devbox/opencors-lrwj6n](https://codesandbox.io/p/devbox/opencors-lrwj6n)