const requests = require('request');
const tone = require('tone')
const http = require("http");
const fs = require('fs').promises;
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const host = 'localhost';
const port = 8000;
const sport = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })
const parser = sport.pipe(new ReadlineParser({ delimiter: '\r\n' }))
data = "hi"
parser.on('data',(e)=> {
    data = e;


})
const requestListener = function (req, res) {
    res.writeHead(200);
    res.end(data);
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
