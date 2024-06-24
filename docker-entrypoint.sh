#!/bin/sh

npx prisma migrate dev

exec "$@"