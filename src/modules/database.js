var path = require( "path" );
var connector = require( "better-sqlite3" );

const db_name = path.join( __dirname, "../../data/ls.db" );

exports.init = () => {
    module.exports.db = connector( db_name );
    console.log( "database is ready" );
};
