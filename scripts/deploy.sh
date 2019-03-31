#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

TARGET=$1

if [ -z "$TARGET" ] || [ ! -d "$TARGET" ] ; then
  exit 1
fi

if [ -n "$DEPLOY_SSH_TARGET" ] && [ -n "$DEPLOY_SSH_PATH" ]; then
  rsync -azv -e 'ssh' "$TARGET" "${DEPLOY_SSH_TARGET}:${DEPLOY_SSH_PATH}"
elif [ -n "$DEPLOY_FTP_DOMAIN" ] && [ "$DEPLOY_FTP_PATH" ] && [ -n "$DEPLOY_FTP_USERNAME" ] && [ -n "$DEPLOY_FTP_PASSWORD" ]; then
  cd $TARGET
  ncftpput -mR -v -u "$DEPLOY_FTP_USERNAME" -p "$DEPLOY_FTP_PASSWORD" "$DEPLOY_FTP_DOMAIN" "$DEPLOY_FTP_PATH" ./
else
  exit 1
fi
