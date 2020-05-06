const { v4: uuidv4 } = require( "uuid" );

exports.string = ( length ) => {
    let key = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( let i = 0; i < length; i++ ) {
        key += possible.charAt( Math.floor( Math.random() * possible.length ) );
    }
    return key;
};

exports.guid = () => {
    return uuidv4();
};
