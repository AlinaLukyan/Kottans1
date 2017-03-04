const express = require('express');
const data = require('./data.js');


const app = express();

app.use(express.static(__dirname));
app.listen(3000);


app.get('/', (request, response) => {
    response.sendFile((__dirname + '/index.html'));
});

app.get('/photos', (request, response) => {
    response.send(JSON.stringify(data.photos));
});


