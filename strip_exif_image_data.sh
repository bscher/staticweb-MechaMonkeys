#!/bin/bash

for f in `find . -type f -not \( -path "*/node_modules/*" -o -path "*/openzeppelin-contracts/*" -o -path "*/build/*" \) \
                              \( -iname \*.png -o -iname \*.jpg \)`; do
    echo "$f"
    mogrify -strip "$f"
done