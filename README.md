inspectweb
==========
Allows you to inspect a JSON value on an UI in your browser. Uses
[jquery-jsonview](https://github.com/yesmeck/jquery-jsonview).

![demo](/node-inspectweb-demo.png)

## Install
```
$ npm i --save webinspect
```

## Usage
```javascript
var webinspect = require('webinspect');
webinspect({
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

## License
This code is published under the MIT license.
