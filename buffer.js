'use strict';

// Buffers
// Stores a fixed amount of raw binary data
// Only used with primitive data types like integers and strings
// Buffers can store an array of primitive data
var buf = new Buffer('Hello', 'utf-8');
console.log('Here is the hexadecimal buffer:', buf)
console.log('Here is the string buffer:', buf.toString())
console.log('Here is the JSON buffer:', buf.toJSON())

// Buffer behaves similarly to an array
console.log('The third item in the buffer:', buf[2])

// You can write to the buffer, but remember that the buffer is a finite piece of data, and will not expand past 5 characters
// The expectation is that the buffer is a fixed size of data in memory
buf.write('World');
console.log('Here is the string buffer after writing:', buf.toString())

// The result is 'World' because we overwrote the 'Hello' with 'World'
// If i tried buf.write('Morethan5chars') is would only write the first 5 characters to the buffer


// ES6 Typed Arrays
// The array buffer is raw binary data
// This is 8 bytes, or 64 bits (binary digits)
var arrBuf = new ArrayBuffer(8);
console.log('The byte length of the array buffer', arrBuf.byteLength) // Read only property

// From MDN Docs
/* The ArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer.
You can not directly manipulate the contents of an ArrayBuffer; 
instead, you create one of the typed array objects or a DataView object which represents the buffer in a specific format, 
and use that to read and write the contents of the buffer.
*/

// Typed arrays allow you to work with binary data easier (array like objects)
// The typed array represents the binary data in whatever type we specify (int32 in this case)
// Strings will not be stored, only integers
var typedArr = new Int32Array(arrBuf); // We can store two 32 bit numbers (total buffer size is 64)
typedArr[0] = 300;
typedArr[1] = 500;

console.log('the view into the array buffer', typedArr)
console.log('Check if the typed array is a view into an array buffer (cannot call isView on instances):', ArrayBuffer.isView(typedArr));