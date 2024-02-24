const socketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('codeChange', (newCode) => {
            socket.broadcast.emit('codeChange', newCode);
        });

        socket.on('inputChange', (newInput) => {
            console.log('input change');
            socket.broadcast.emit('inputChange', newInput);
        });

        socket.on('outputChange', (newOutput) => {
            console.log('output change');
            socket.broadcast.emit('outputChange', newOutput);
        });

        socket.on('drawing', (data) => {
            socket.broadcast.emit('drawing', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = socketEvents;
