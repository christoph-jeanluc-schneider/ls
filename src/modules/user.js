var database = require( "./database.js" ).db;
var random = require( "../util/random.js" );
var crypto = require( "../util/crypto.js" );

var queries = {
    getById: database.prepare( "SELECT * FROM users WHERE id = ?" ),
    getByUsername: database.prepare( "SELECT * FROM users WHERE username = ?" ),
    create: database.prepare( "INSERT INTO users (id, username, password, salt) VALUES (?, ?, ?, ?)" ),
    delete: database.prepare( "DELETE FROM users WHERE id = ?" )
};

exports.getById = ( id ) => {
    return queries.getUserWithId.get( id );
};

exports.getByUsername = ( username ) => {
    return queries.getUserWithUsername.get( username );
};

exports.create = ( username, password ) => {
    let user = queries.getUserWithUsername.get( username );
    if( user && user.id ) return null;

    let id = random.guid();
    let salt = random.string( 8 );
    let hash = crypto.hashPassword( password, salt );
    queries.create.run( id, username, hash, salt );

    return id;
};

exports.delete = ( id, ) => {
    queries.delete.run( id );
};

exports.check = ( username, password ) => {
    let user = queries.getUserWithUsername.get( username );
    if( user && user.id && crypto.checkPassword( password, user.password, user.salt ) )
        return user.id;
    else return null;
};
