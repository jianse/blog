#!/usr/bin/env bash

echo "HUGO_ENV:${HUGO_ENV}"

if [ -z ${HUGO_ENV+''}];
then hugo;
else 
    hugo -e $HUGO_ENV
fi
