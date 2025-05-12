#!/bin/bash

echo "Installing dependencies for all services in parallel..."

SERVICES=(
  "auth-service"
  "article-service"
  "common-service"
  "queue-service"
  "gateway"
)

for SERVICE in "${SERVICES[@]}"
do
  (cd $SERVICE && npm install) &
done

wait

echo ""
echo "✅ All services installed in parallel!"