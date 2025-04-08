#!/bin/bash

# Configuration
PROJECT_DIR="{PROJECT_DIR}"
BACKUP_DIR="{BACKUP_DIR}"
ENV_FILE="$PROJECT_DIR/conf/.env"
PROJECT_NAME=$(basename "$PROJECT_DIR")
TIMESTAMP=$(date +"%Y-%m-%d-%H-%M")
BACKUP_FILE="$BACKUP_DIR/buffetBackup-$TIMESTAMP.tar.gz"

VOLUME_DB1="${PROJECT_NAME}_db_data"
VOLUME_DB2="${PROJECT_NAME}_uptime_kuma"

# Initial commands
{INITIAL_COMMANDS}

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Function to backup a Docker volume
backup_volume() {
    VOLUME_NAME=$1
    OUTPUT_FILE="$BACKUP_DIR/${VOLUME_NAME}_backup.tar"

    echo "Backing up Docker volume: $VOLUME_NAME..."
    docker run --rm -v "${VOLUME_NAME}:/volume" -v "$BACKUP_DIR:/backup" alpine \
        sh -c "tar -cf /backup/${VOLUME_NAME}_backup.tar -C /volume ."
}

# Backup Docker volumes
backup_volume "$VOLUME_DB1"
backup_volume "$VOLUME_DB2"

# Create the final archive
echo "Creating backup archive: $BACKUP_FILE..."
tar -czf "$BACKUP_FILE" -C "$PROJECT_DIR/conf" .env -C "$BACKUP_DIR" "${VOLUME_DB1}_backup.tar" "${VOLUME_DB2}_backup.tar"

# Clean up temporary volume backup files
rm -f "$BACKUP_DIR/${VOLUME_DB1}_backup.tar" "$BACKUP_DIR/${VOLUME_DB2}_backup.tar"

echo "Backup completed successfully: $BACKUP_FILE"

# Concluding commands
{CONCLUDING_COMMANDS}
