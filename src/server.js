var path = require( "path" );
var express = require( "express" );
var http = require( "http" );
var helmet = require( "helmet" );
var cookieParser = require( "cookie-parser" );

var cookies = require( "./util/cookies.js" );

const wwwroot = path.join( __dirname, "../wwwroot" );
const config = require( "../config.json" );

var app = express();
app.use( helmet() );
app.use( express.json( { limit: "1024mb" } ) );
app.use( express.urlencoded( { extended: true, limit: "1024mb" } ) )
app.use( cookieParser() );

app.set( "view engine", "pug" );
app.locals.basedir = wwwroot;
app.set( "views", wwwroot );

app.use( express.static( wwwroot ) );

app.use( cookies.parse_user );
app.use( require( "./view.js" ) );

http.createServer( app ).listen( config.port, () => {
    console.log( `server is online (port: ${config.port})` );
} );
