const crypto = require('crypto');
const fs = require('fs');

const password = 'your_password_here';
const encryptedFile = 'path/to/encrypted_file.xml';
const decryptedFile = 'path/to/decrypted_file.xml';

const decipher = crypto.createDecipher('aes-256-cbc', password);
const input = fs.createReadStream(encryptedFile);
const output = fs.createWriteStream(decryptedFile);

input.pipe(decipher).pipe(output);

output.on('finish', () => {
  	console.log('File decrypted successfully');
  	// Now that the file is decrypted, you can parse it using xml2js
});