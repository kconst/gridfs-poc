const mongodb = require('mongodb');
const fs = require('fs');
const assert = require('assert');

const client = new mongodb.MongoClient();
// connect to our existing (and running) mongo server, use/create the testing db
client.connect('mongodb://localhost:27017/testing', function(error, db) {
    assert.ifError(error);

    // create/connect a mongodb gridfs bucket in the db
    var bucket = new mongodb.GridFSBucket(db);

    // open a file for reading and pipe the contents of the file into mongodb
    fs.createReadStream('./dog.jpg').
    pipe(bucket.openUploadStream('dog.jpg')).
    on('error', function(error) {
        assert.ifError(error);
    }).
    on('finish', function() {
        console.log('done!');
        process.exit(0);
    });
});
