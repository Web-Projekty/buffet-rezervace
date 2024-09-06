# Use PHP 8.3 as the base image
FROM mcr.microsoft.com/devcontainers/php:8.3

# Install Node.js (version 20)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs


# Set the working directory inside the container
WORKDIR /workspaces/buffet-rezervace

# Copy the entire repository into the container's /app directory
COPY --chown=vscode:vscode . /workspaces/buffet-rezervace

# Expose ports 80 for Apache and 3000 for React
EXPOSE 80
EXPOSE 3000

# Set the user to vscode as specified in devcontainer.json
USER vscode

# Run the post-create script

CMD ["bash", "-c", "sudo bash .devcontainer/start.sh && tail -f /dev/null"]
