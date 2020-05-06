var fs = require( "fs" );
var path = require( "path" );

var random = require( "./src/util/random.js" );

const wwwroot = path.join( __dirname, "./wwwroot" );
const tmp = path.join( __dirname, "./tmp" );
const configfile = path.join( __dirname, "./config.json" );

if( !fs.existsSync( wwwroot ) )
    fs.mkdirSync( wwwroot );

if( !fs.existsSync( tmp ) )
    fs.mkdirSync( tmp );

if( !fs.existsSync( configfile ) )
    fs.writeFileSync( configfile, JSON.stringify( {
        port: 4443,
        key: random.string( 32 )
    }, null, 4 ) );