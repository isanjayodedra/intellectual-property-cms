const rootSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('New connection in common-service');
        socket.on('join-room', (room) => {
            console.log('common-service join room for', room);
            socket.join(room);
        });
        socket.on('disconnect', () => {
            console.log('disconnected common-service');
            console.log(socket.rooms.size);
        });
    });
    return io;
};
module.exports = rootSocket;
