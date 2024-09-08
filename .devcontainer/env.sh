echo -e "\033[0;32mPlease enter your developer decrypt key:"
read key

# Define the output file
output_file="../buffet-api/src/Database/.env"

# Write the input to the file
echo "DECRYPT_KEY=$key" > "$output_file"

# Notify the user
echo "Information has been written to $output_file"