#!/bin/bash

echo "Starting all services..."

SERVICES=(
    "gateway"
    "auth-service"
    "common-service"
    "queue-service"
    "article-service"
)

PORTS=(3000 3001 3002 3003 3004)

i=0
for SERVICE in "${SERVICES[@]}"
do
  echo ""
  echo "Starting $SERVICE on port ${PORTS[$i]}..."
  cd $SERVICE
  npm start &
  cd ..
  ((i++))
done

wait
echo ""
echo "✅ All services started!"