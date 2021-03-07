const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


    app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
})

io.on('connection', (socket)=>{
    console.log('Nova conexão', socket.id)
    socket.on('msg', (msg)=>{
        console.log(msg)
        socket.broadcast.emit('msg', msg);
        socket.join('contador')
    })
})

let counter = 0
setInterval(()=> {
     io.to('contador').emit('msg', counter++)
     , 1000})
/*const handleConnection = socket => {
    console.log('Alguém se conectou')
    socket.on('end', () => {
        console.log('desconectou')
    })
}*/

http.listen(3000, function(){
    console.log('Ouvindo a porta 3000')
})
