#!/bin/sh

if [ "$(stat -c '%u' /data)" -ne "33" ]
then
    chown -R 33:33 /data
fi
/usr/local/sbin/runsvdir-start