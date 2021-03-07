const net = require('net')
const readline = require('readline')

const client = new net.Socket()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
client.connect(5500, '127.0.0.1')
    console.log('conectou', () => {
        console.log('conectou')
        rl.addListener('line', line => {
            client.write(line)
        })
    })