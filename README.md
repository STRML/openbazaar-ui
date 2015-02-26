# OpenBazaar-UI React

This is a ReactJS port of the @overra's original Angular OpenBazaar-UI.

The README below is mostly out of date as this is a WIP. It will be replaced with accurate data soon.

To run this project,

```bash
npm install
npm run dev
```

Open `http://localhost:8001` in your browser.

----

# OpenBazaar Client

This is still heavily under development, only a small portion ties into the OpenBazaar node. Create an issue with any bugs you find and feel free to contribute.

[Screenshot Timeline](https://cloudup.com/cR5s4zsdQZB) | [Video demo](http://codepen.io/overra/full/971d031b40fd8492854ff5f0ba71335a/)

![](https://cldup.com/tViN1lsGal-3000x3000.png)

## Requirements

- [nw.js](http://nwjs.io) v0.12.0
- [node.js](https://nodejs.org) & npm
- OB ws.py check_origin override

## Installation

### Setting the Websocket Port

When OpenBazaar opens, it will print a port. For example:

```
{'nat_type': 'Symmetric NAT', 'external_ip': '110.77.235.189', 
'external_port': 29865}
```

This UI needs to know which port to connect to. Take note of this port - it will
be used as the `WS_PORT` env var when building, as seen below.

### OB ws.py check_origin override

This bypasses the origin check in tornado's WebSocketHandler so that the nw app 
can communicate with OpenBazaar.

- Stop your OpenBazaar node
- Apply the changes to [ws.py](https://github.com/OpenBazaar/OpenBazaar/blob/develop/node/ws.py#L1160) below
- Start OpenBazaar node and make note of the web server port (i.e. 127.0.0.1:**56573**)

```diff
--- a/node/ws.py
+++ b/node/ws.py
@@ -1158,3 +1158,8 @@ class WebSocketHandler(tornado.websocket.WebSocketHandler):
						 self.loop.current().add_callback(send_response)
				 except Exception:
						 logging.error("Error adding callback", exc_info=True)
+
+    # overwrite tornado.websocket.WebSocketHandler's check_origin
+    # https://github.com/tornadoweb/tornado/blob/master/tornado/websocket.py#L311
+    def check_origin(self, origin):
+        return True
```

### openbazaar ui

```shell
git clone https://github.com/OpenBazaar/OpenBazaar-UI.git openbazaar-ui && cd $_
mkdir nw 

# Copy nw.js related files to `/path/to/openbazaar-ui/nw'

# Install gulp related modules and bower components
# If you're on linux and ./nw/nw points to your nw.js binary
# you should be able to `gulp watch` -- need osx support
# 
# WS_PORT=56573
./configure.sh ob_port

# change this to point to your nw.js
/path/to/openbazaar-ui/nw/nw .
```

### Running in Browser instead of nw.js

You might want to debug in a normal browser instead of running nw.js. 
To do this:

```shell
# Fill in WS_PORT from OpenBazaar. See above.
# `browser-dev` will compile files for the browser, and open your 
# default browser to the correct host and port.
WS_PORT=<websocket port> gulp browser-dev

```

## Project structure

```
- dist/ 						<- compiled output
- src/
	- fonts/ 					<- web fonts from brick.im
	- images/ 					<- logos, icons and svg loaders
	- js/
		- controllers/
			- App.js 			<- (as AppController in angular)
			- ...
		- directives/
		- services/
		- app.js 				<- main js file
	- scss/
		- app.scss 				<- main scss file
		- _(.*).scss 			<- attempt at breaking up styles
	- vendor/
		- js/ 					<- js libraries not on bower
		- ... 					<- components installed by bower
	- views/
		- includes/
		- templates/
		- index.jade
```

## Known Issues

- Random app freeze, not sure if specific to my OS / setup
- Lots of unfinishedness
- Stuff needs to be moved into directives and services/factories
- Inconsistent file naming patterns, coding style
	- Maybe a styleguide based on google/twitter guides?
- Left over code litter
- Little to no comments
- Perhaps to complex of structure?

## License
(ISC)

Copyright (c) 2015, Adam Snodgrass <overra@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
