const mongodb = require('mongodb');
const fs = require('fs');
const assert = require('assert');

const client = new mongodb.MongoClient();
// connect to the testing db in our running mongodb server
client.connect('mongodb://localhost:27017/testing', function(error, db) {
    assert.ifError(error);

    // create/connect a mongodb gridfs bucket in the db
    var bucket = new mongodb.GridFSBucket(db);

    // open file for download stream
    bucket.openDownloadStreamByName('dog.jpg').
    // start downloading at the first byte
    start(0).
    // provide the filename to save as
    pipe(fs.createWriteStream('./output.jpg')).
    on('error', function(error) {
        assert.ifError(error);
    }).
    on('end', function() {
        console.log('done!');
        process.exit(0);
    });
});



