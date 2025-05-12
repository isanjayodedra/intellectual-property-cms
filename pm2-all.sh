#!/bin/bash

ACTION=$1

case $ACTION in
  start)
    echo "▶️ Starting all services using PM2..."
    pm2 start pm2.config.js
    ;;
  restart)
    echo "🔁 Restarting all services using PM2..."
    pm2 restart all
    ;;
  stop)
    echo "🛑 Stopping all services using PM2..."
    pm2 stop all
    ;;
  delete)
    echo "❌ Deleting all services from PM2..."
    pm2 delete all
    ;;
  status)
    echo "📊 PM2 Service Status:"
    pm2 list
    ;;
  logs)
    echo "📄 Showing PM2 logs (Ctrl+C to exit)..."
    pm2 logs
    ;;
  help|*)
    echo ""
    echo "Usage: ./pm2-all.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start     Start all services using pm2.config.js"
    echo "  restart   Restart all PM2 services"
    echo "  stop      Stop all PM2 services"
    echo "  delete    Remove all services from PM2"
    echo "  status    Show service status list"
    echo "  logs      Show combined logs"
    echo ""
    ;;
esac