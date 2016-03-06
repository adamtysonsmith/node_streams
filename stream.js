'use strict';

//////////////////////////////////////////
// Readable and Writable Streams
//////////////////////////////////////////

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const db = 'mongodb://localhost:27017/rtd';
const file_read  = __dirname + '/large-text.txt';

// Empty files to write to
const file_write = __dirname + '/copy.txt';
const file_stops =  __dirname + '/stops.txt';

const opts = {
  encoding: 'utf-8',
  highWaterMark: 1024 * 32 // Defines the buffer size in bytes (32 kb), 64 kb is default
}

let readable = fs.createReadStream(file_read)
  .on('data', handleData)
  .on('end', () => console.log('The data has been completely consumed.'))
  .on('close', () => console.log('The stream has closed.'))
  .on('error', err => console.log('There was an error!', err))
            
let writable = fs.createWriteStream(file_write);


function handleData(data) {
  // The stream is reading and refilling the buffer each time
  // data.length gives you the bytes in each chunk
  console.log('The streamed data chunk is %d bytes', data.length);
  console.log('The streamed data chunk is %d bits', data.length * 8);
  
  // Lets take this data we are reading, and write it to the copy.txt file
  writable.write(data);
}


//////////////////////////////////////////
// Piping Streams
//////////////////////////////////////////

// In the above example, we are reading from one stream, and writing to another stream
// This pattern is so common, that we have better ways to do this in node using pipes
// readable is the source, and writable is the destination
// The destination must be writable to pipe to it, or it can be duplex and pipe into another stream
// pipe() returns a readable stream which allows you to chain pipes
readable.pipe(writable);