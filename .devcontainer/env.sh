if [ -z "$DECRYPT_KEY" ]; then
    # Prompt for the key if DECRYPT_KEY is not set or is empty
    echo -e "\033[0;32mPlease enter your developer decrypt key:\033[39m"
    read -r key
else
    # Use DECRYPT_KEY if it is set
    key=$DECRYPT_KEY
fi

# Define the output file
output_file="$1/buffet-api/src/Database/.env"

# Write the input to the file
echo "DECRYPT_KEY=$key" > "$output_file"

# Notify the user
echo "Information has been written to $output_file"