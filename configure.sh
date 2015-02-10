#!/bin/bash

die() { echo -e "$@" 1>&2 ; exit 1; }

USAGE="Usage: $0 ob_port\n\nExample: $0 44444"

[[ -n "$1" ]] || die "$USAGE"

WS_PORT=$1

npm install && bower install && gulp