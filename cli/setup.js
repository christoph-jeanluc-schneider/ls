var fs = require( "fs" );
var path = require( "path" );
var connector = require( "better-sqlite3" );

var random = require( "../src/util/random.js" );

const wwwroot = path.join( __dirname, "../wwwroot" );
const root_dir = path.join( __dirname, "../tmp" );
const tmp = path.join( __dirname, "../tmp" );
const data = path.join( __dirname, "../data" );
const configfile = path.join( __dirname, "../config.json" );
const init_script_path = path.join( __dirname, "./init.sql" );
const dbfile = path.join( __dirname, "../data/ls.db" );


if( !fs.existsSync( wwwroot ) )
    fs.mkdirSync( wwwroot );

if( !fs.existsSync( tmp ) )
    fs.mkdirSync( tmp );

if( !fs.existsSync( data ) )
    fs.mkdirSync( data );

if( !fs.existsSync( configfile ) )
    fs.writeFileSync( configfile, JSON.stringify( {
        port: 4443,
        key: random.string( 32 ),
        title: "LS - abelade.ch",
        root_dir: root_dir
    }, null, 4 ) );

const script = fs.readFileSync( init_script_path ).toString();
let db = connector( dbfile );
db.exec( script );
