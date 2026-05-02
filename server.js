const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Folder 'public' buat simpan index.html, admin.html, dkk
app.use(express.static(path.join(__dirname, 'public')));

// Route khusus Panel Admin
app.get('/commander', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

io.on('connection', (socket) => {
    console.log('⚡ Zyro Connection Established');

    // Menangkap command dari admin.html dan menyebarkan ke index.html
    socket.on('chat message', (msg) => {
        console.log('📡 Relaying Command:', msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('❌ Connection Lost');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`
    ===========================================
    ZYRO COMMANDER SYSTEM ONLINE
    ===========================================
    Main Memoir : http://localhost:${PORT}
    Admin Panel : http://localhost:${PORT}/commander
    ===========================================
    `);
});
