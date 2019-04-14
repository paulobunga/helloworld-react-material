#!/usr/bin/env bash
set -xeo pipefail

BUILD=$1
DESTINATION=$2

if [ -z "$BUILD" ] || [ ! -d "$BUILD" ] ; then
  exit 1
fi

if [ -n "$DESTINATION" ] && [ -d "$DESTINATION" ]; then
  rsync -avz "$BUILD" "$DESTINATION"
elif [ -n "$DEPLOY_SSH_TARGET" ] && [ -n "$DEPLOY_SSH_PATH" ]; then
  rsync -azv -e 'ssh' "$BUILD" "${DEPLOY_SSH_TARGET}:${DEPLOY_SSH_PATH}"
elif [ -n "$DEPLOY_FTP_DOMAIN" ] && [ "$DEPLOY_FTP_PATH" ] && [ -n "$DEPLOY_FTP_USERNAME" ] && [ -n "$DEPLOY_FTP_PASSWORD" ]; then
  cd $BUILD
  ncftpput -mR -v -u "$DEPLOY_FTP_USERNAME" -p "$DEPLOY_FTP_PASSWORD" "$DEPLOY_FTP_DOMAIN" "$DEPLOY_FTP_PATH" ./
else
  exit 1
fi
