var sha512 = require( "hash.js/lib/hash/sha/512" );
var crypto = require( "crypto" );

// PASSWORD HASHING
exports.hashPassword = ( password, salt ) => {
    return sha512().update( `${password}${salt}` ).digest( "hex" );
};

exports.checkPassword = ( password, pwhash, salt ) => {
    return exports.hashPassword( password, salt ) == pwhash;
};


// TEXT ENCRYPTION
const algorithm = "aes-256-ctr";
const iv = Buffer.allocUnsafe( 16 );

exports.encrypt = ( text, key ) => {
    key = key.substring( 0, 32 );
    iv.fill( key.split( "" ).reverse().join() )
    var cipher = crypto.createCipheriv( algorithm, key, iv )
    var crypted = cipher.update( text, 'utf8', 'hex' )
    crypted += cipher.final( 'hex' );
    return crypted;
};

exports.decrypt = ( text, key ) => {
    key = key.substring( 0, 32 );
    iv.fill( key.split( "" ).reverse().join() )
    var decipher = crypto.createDecipheriv( algorithm, key, iv )
    var dec = decipher.update( text, 'hex', 'utf8' )
    dec += decipher.final( 'utf8' );
    return dec;
};
