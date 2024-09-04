#!/usr/bin/env fish

# might have to run seperately from package.json
# pnpm devall | tee output.log

if test -e output.log
    # Extract the URL from the output using grep and sed
    set url $(grep -o 'https[^ ]*' output.log | sed -n '1p')
    echo $url
    echo $url | fish_clipboard_copy
    rm output.log
else
    echo "output.log does not exist"
end

# Extract the URL from the output using grep and sed
# set url $(grep -o 'https[^ ]*' output.log | sed -n '1p')

# Copy the URL to the clipboard
# echo $url | fish_clipboard_copy

# if [[ "$OSTYPE" == "linux-gnu"* ]]; then
#     echo $url | xclip -selection clipboard
# elif [[ "$OSTYPE" == "darwin"* ]]; then
#     echo $url | pbcopy
# else
#     echo "Unsupported OS"
# fi

echo "shits done"
echo "URL copied to clipboard: $url"
