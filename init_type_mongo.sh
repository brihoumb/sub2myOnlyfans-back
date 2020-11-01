#!/bin/bash

set="\ \ \ \ function set(config: Config): void;"

sed -i "38i$set" "./node_modules/@types/migrate-mongo/index.d.ts"
