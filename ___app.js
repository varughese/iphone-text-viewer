var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var MONGO_URL = 'mongodb://localhost:27017/test';

var msgs = fs.readFileSync('./msg.txt').toString();
var splitByLine = msgs.split('\n');

var msgArray = [];


for(var i=0; i<splitByLine.length; i++) {
    var l = splitByLine[i];
    if(l[0] === '[') {
        msgArray.push(l);
    } else {
        msgArray[msgArray.length-1] += l;
    }
}
console.log(msgArray.length);

for(var i=0; i<msgArray.length; i++) {
    var m = msgArray[i];
    var bracketIndex = m.indexOf(']');
    var colonIndex = m.indexOf(':', bracketIndex);
    var d = m.substring(2, bracketIndex-1);
    var sender = m.substring(bracketIndex+2,colonIndex);
    var mess = m.substring(colonIndex+4);
    msgArray[i] = new Message(d, sender, mess);
}

function Message(date, sender, mess) {
    this.date = new Date(date);
    this.sender = sender;
    this.message = mess;
}

//
// MongoClient.connect(MONGO_URL, function(err, db) {
//     var col = db.collection('sarah_msg');
//     col.insertMany(msgArray, function(err, r) {
//         db.close();
//     });
// });
