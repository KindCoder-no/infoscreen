/*
MIT License

Copyright (c) 2022 KindCoder

https://github.com/KindCoder-no/infoscreen/blob/main/LICENSE
*/

// Include Packages
var express = require('express');
var router = express.Router();
var axios = require('axios');
const ChromecastAPI = require('chromecast-api')


router.get('/', async function (req, res) {
    const client = new ChromecastAPI()

    const media = {
        url : 'https://im-infoscreen.herokuapp.com'
        
      }

    client.on('device', function (device) {
        console.log(device)
        device.play(media, function (err) {
          if (!err) console.log('Playing in your chromecast')
        })
      })

    res.send(`<html>
    <head>
      <script type="text/javascript"
          src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js">
      </script>
    </head>
    <body>
      <cast-media-player><h1>Hello</h1></cast-media-player>
      <script>
        cast.framework.CastReceiverContext.getInstance().start();
      </script>
    </body>
    <script>
    const context = cast.framework.CastReceiverContext.getInstance();

...

// Update style using javascript
let playerElement = document.getElementsByTagName("cast-media-player")[0];
playerElement.style.setProperty('--splash-image', 'url("http://some/other/image.png")');

...

context.start();
</script>
    </html>`)
})

module.exports = router;