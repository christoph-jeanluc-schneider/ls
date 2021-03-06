var fs = require( "fs" );
var path = require( "path" );

const wwwroot = path.join( __dirname, "../wwwroot" );
const tmp = path.join( __dirname, "../tmp" );

if( !fs.existsSync( wwwroot ) )
    fs.mkdirSync( wwwroot );

if( !fs.existsSync( tmp ) )
    fs.mkdirSync( tmp );

require( "./modules/database.js" ).init();
require( "./modules/user.js" );
require( "./server.js" );
