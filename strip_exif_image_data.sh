#!/bin/bash

if ! command -v mogrify &> /dev/null; then
    echo "Count not find 'mogrify' in PATH. Please install this tool and run again."
    exit 1
fi

FILES_TO_PRUNE=`find . -type f -not \( -path "*/node_modules/*" -o -path "*/openzeppelin-contracts/*" -o -path "*/build/*" \) \
                                    \( -iname \*.png -o -iname \*.jpg \)`
NUM_FILES=`echo "$FILES_TO_PRUNE" | wc -l`

file_counter=1
for f in $FILES_TO_PRUNE; do
    echo "Pruning [$file_counter/$NUM_FILES] $f"
    #mogrify -strip "$f"
    let "file_counter = file_counter + 1" 
done