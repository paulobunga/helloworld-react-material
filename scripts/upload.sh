#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

TARGET=$1

if [ -z "$TARGET" ] || [ ! -d "$TARGET" ] || [ -z "$FTP_USERNAME" ] || [ -z "$FTP_PASSWORD" ]; then
  exit 1
fi

cd $TARGET

for path in $(find -type f)
do
  curl --fail --ftp-create-dirs -u "${FTP_USERNAME}:${FTP_PASSWORD}" "ftp://${FTP_DOMAIN}${FTP_PATH}/${path}" -T $path
done
