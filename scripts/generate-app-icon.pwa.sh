#!/usr/bin/env bash
set -eo pipefail

if [ $# -lt 1 ] ; then
	set +x

  cat <<EOL

    usage: $0 <input> [<size@1x>] [<output>]

      Generates native image assets.
        <input>    path for input file, could be:
                     - SVG file
                     - PNG file

        <size@1x>  optionnal target size
                     - <width> => <width>x<width>
                     - <width>x => <width>x<calculated_height>
                     - x<height> => <calculated_width>x<height>

        <output>   optional target name

EOL

  exit
fi

if [ ! -f $1 ] ; then
	echo "file doesn't exist"
	exit 1
fi

## include common processing

source $(dirname $0)/generate-assets.include.sh

## generate assets

target_dir="${PWD}/public/pwa"

mkdir -p $target_dir

function image_path () {
  echo "${target_dir}/${prefix}-${width}x${height}.png";
}

width=64 height=64 scale=1 prefix=app generate_image

width=192 height=192 scale=1 prefix=app generate_image

width=512 height=512 scale=1 prefix=app generate_image
