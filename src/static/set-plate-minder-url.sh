#!/bin/bash

if [ -z "$PLATE_MINDER_URL" ]; then
	PLATE_MINDER_URL='http://localhost:4000'
fi

echo $PLATE_MINDER_URL > `dirname $0`/plate-minder-url
