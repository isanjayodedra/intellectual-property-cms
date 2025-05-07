const rootSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('New connection article service');
        socket.on('join-room', (room) => {
            console.log('article service join room for', room);
            socket.join(room);
        });
        socket.on('disconnect', () => {
            console.log('disconnected article service');
            console.log(socket.rooms.size);
        });
    });
    return io;
};
module.exports = rootSocket;
