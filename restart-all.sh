#!/bin/bash

echo "🔄 Restarting all services..."

# Step 1: Stop all running services
./stop-all.sh

# Optional: Wait a second to clean up properly
sleep 1

# Step 2: Start all services
./start-all.sh

echo "✅ All services have been restarted successfully!"