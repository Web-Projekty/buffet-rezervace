echo -e "\033[0;32mPlease enter your developer decrypt key:\033[39m"
read key

# Define the output file
output_file="$1/buffet-api/src/Database/.env"

# Write the input to the file
echo "DECRYPT_KEY=$key" > "$output_file"

# Notify the user
echo "Information has been written to $output_file"