const mongodb = require('mongodb');
const fs = require('fs');
const assert = require('assert');

const client = new mongodb.MongoClient();
client.connect('mongodb://localhost:27017/testing', function(error, db) {
    assert.ifError(error);

    var bucket = new mongodb.GridFSBucket(db);

    bucket.openDownloadStreamByName('dog.jpg').
    start(0).
    pipe(fs.createWriteStream('./output.jpg')).
    on('error', function(error) {
        assert.ifError(error);
    }).
    on('end', function() {
        console.log('done!');
        process.exit(0);
    });
});



