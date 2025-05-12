#!/bin/bash

echo "Starting all services in new terminal windows (Mac)..."

SERVICES=(
  "auth-service"
  "article-service"
  "common-service"
  "queue-service"
  "gateway"
)

for SERVICE in "${SERVICES[@]}"
do
  echo ""
  echo "Starting $SERVICE..."
  osascript <<EOF
    tell application "Terminal"
      do script "cd $(pwd)/$SERVICE && npm run dev"
    end tell
EOF
done

echo ""
echo "✅ All services launched in new Terminal windows!"