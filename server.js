const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const fs = require('fs');

var crypto = require("crypto");
const { env } = require('process');
var consumerSecretApp = '335911E84E7131CAA9D50BCF60CC0083040A99C11DDC677F0876AD4205AA371D';

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/dist/canvas-signed-request"));

app.get('/', (req, res) => {
    res.sendFile(process.cwd()+"/dist/canvas-signed-request/index.html");
});

app.get('/token', (req, res) => { 
    let rawData = fs.readFileSync('sr.json');
    let sr = JSON.parse(rawData);
    console.log(sr);
    res.send(sr);
});

app.post('/my-app', (req, res) => {
    var bodyArray = req.body.signed_request.split(".");
    var consumerSecret = bodyArray[0];
    var encoded_envelope = bodyArray[1];

    console.log('consumerSecret', consumerSecret); 
    
    var check = crypto.createHmac("sha256", consumerSecretApp).update(encoded_envelope).digest("base64");
    if (check === consumerSecret) {
        var envelope = JSON.parse(new Buffer(encoded_envelope, "base64").toString("ascii"));
        console.log('oauthToken', envelope.client.oauthToken);

        const sr = { 'oauthToken' : envelope.client.oauthToken };
        fs.writeFile('sr.json', JSON.stringify(sr), err => {
            // console.log(err);
            res.sendFile(process.cwd() + "/dist/canvas-signed-request/index.html");
        });
    } else {
        res.send("authentication failed");
    }

});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});