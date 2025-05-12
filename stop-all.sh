#!/bin/bash

echo "🔴 Stopping all running Node services..."

# Find all node processes related to your project and kill them
ps aux | grep node | grep -v grep | grep -E "auth-service|article-service|common-service|queue-service|gateway" | awk '{print $2}' | while read PID
do
  echo "Killing PID $PID"
  kill -9 $PID
done

rm -f ./auth-service/logs/*.log
rm -f ./article-service/logs/*.log
# etc...

echo "✅ All services have been stopped."