function get_url
    if test -e output.log
        # Extract the URL from the output using grep and sed
        set url (grep -o 'https[^ ]*' output.log | sed -n '1p')
  
        for arg in $argv
            switch $arg
                case '--help' '-h'
                    echo "Usage: get_url"
                    echo ""
                    echo "This is to be used with adding tee output.log"
                    echo "to tmole in package.json"
                    echo ""
                    echo "Example: "
                    echo "  tmole 5173 | tee output.log"
                    echo ""
                    echo "  -h, --help    Show this help message"
                    return 0
                case '-c' '--colortest2'
                    echo "$url/colortest2"
                    echo "$url/colortest2" | fish_clipboard_copy
                    echo "URL copied to clipboard"
                    return 0
            end
        end

        echo $url 
        echo $url | fish_clipboard_copy
        echo "URL copied to clipboard"
        # rm output.log
    else
        echo "output.log does not exist"
    end
end
