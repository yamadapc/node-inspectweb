inspectweb
==========
Allows you to inspect a JSON value on an UI in your browser. Uses
[jquery-jsonview](https://github.com/yesmeck/jquery-jsonview).

![demo](/node-inspectweb-demo.png)

## Install
```
$ npm i --save inspectweb
```

## Command-line Usage
```
npm install -g inspectweb
inspectweb package.json something.json
curl http://respondswithjson.com | inspectweb
```

## Usage
```javascript
var inspectweb = require('inspectweb');
inspectweb({
  lots: {
    of: [
      {
        interesting: 'stuff',
      },
    ],
  },
}, {
  open: true,
});
```

## Implementation
When first called, `inspectweb` will:

- Spawn an express server
- Hash the object provided and store it in a shared object

_(This will leak memory, but you probably don't care)_

On subsequent calls, it'll hash the object, check if it exists in memory and
store it.

If you tell `inspectweb` to open a browser, it'll open pages relative to the
objects you want to inspect.

## License
This code is published under the MIT license.

## Donations
Would you like to buy me a beer? Send bitcoin to 3JjxJydvoJjTrhLL86LGMc8cNB16pTAF3y
