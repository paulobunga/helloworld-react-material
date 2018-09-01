#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

TARGET=$1

if [ -z "$TARGET" ] || [ ! -d "$TARGET" ] || [ -z "$FTP_USERNAME" ] || [ -z "$FTP_PASSWORD" ]; then
  exit 1
fi

cd $TARGET

ncftpput -R -v -u "$FTP_USERNAME" -p "$FTP_PASSWORD" "$FTP_DOMAIN" "$FTP_PATH" ./
