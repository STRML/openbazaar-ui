#!/bin/bash -e

# On exit, kill all pids and rm the fifo. Use exec to rm so we don't get an I/O error.
function finish {
  pkill -P $$ # kills all processes that have this pid - $$ - as the parent
}

CONTENT_PORT=8001 PORT=8002 ./node_modules/.bin/webpack-dev-server \
  --config webpack-hot-dev-server.config.js \
  --hot \
  --progress \
  --colors \
  --content-base http://localhost:8001 \
  --port 8002 &

NODE_ENV=local PORT=8001 WEBPACK_PORT=8002 OB_PORT=8003 node lib/devServer.js

# Clean up on exit.
trap finish EXIT

wait
