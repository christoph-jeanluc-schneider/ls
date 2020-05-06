var fs = require( "fs" );
var path = require( "path" );

const dbfile = path.join( __dirname, "../data/ls.db" );
if( !fs.existsSync( dbfile ) ) {
    console.error( "\n'ls.db' not found" );
    console.log( "run 'node cli/setup' to initialize database\n" );
    process.exit( 0 );
}

var connector = require( "../src/modules/database.js" );
connector.init();

var user = require( "../src/modules/user.js" );

const readline = require( "readline" ).createInterface( {
    input: process.stdin,
    output: process.stdout
} );

console.log();

readline.question( "username: ", username => {
    readline.question( "password: ", password => {
        readline.question( "is this ok? (y/n): ", yes_no => {
            if( yes_no.toLowerCase() == "y" ) {
                let id = user.create( username, password );

                if( id ) console.log( `successfully created user with id '${id}'\n` );
                else console.log( "\nERROR: something went wrong. maybe the username is allready in use?\n" );
            } else {
                console.log( "aborted\n" );
            }
            process.exit( 0 );
        } );
    } );
} );
