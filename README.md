# OpenCORS

**OpenCORS** is a simple NodeJS based CORS Proxy

## Installation

```javascript
npm install opncors
```

## Example

### Server

```javascript
import {OpenCORS} from 'opencors'

const server = new OpenCORS({
	port:4000
})
```
```javascript
const {OpenCORS} = require('opencors')

const server = new OpenCORS({
	port:4000
})
```
Request examples:

* `http://localhost:4000/?url=https://www.google.com/` - Raw Google.com with CORS headers

### Client

```javascript
fetch('http://localhost:4000/?url=https://www.google.com/').then(function (response){
	return response.text()
}).then(function (html){
	console.log(html)
}).catch(function (err){
	console.warn('Something went wrong.',err)
})
```
