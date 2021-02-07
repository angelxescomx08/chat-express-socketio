const app = require('express')()
const http = require('http').createServer(app)
const puerto = process.env.PORT || 3000
const io = require('socket.io')(http)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connection',(socket)=>{
    console.log('Se ha conectado un usuario'+socket.handshake.address)
    socket.on('mensaje del chat',(msg)=>{
        io.emit('mensaje del chat',socket.handshake.address+' '+msg)
    })
    socket.on('disconnect',()=>{
        console.log('Se ha desconectado un usuario')
    })
})

http.listen(puerto,()=>{
    console.log('Escuchando peticiones')
})