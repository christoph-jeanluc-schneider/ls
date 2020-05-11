var router = require( "express" ).Router();
module.exports = router;

var fs = require( "fs" );
var path = require( "path" );
var disk = require( "diskusage" );

var numbers = require( "./util/numbers.js" );
var dir = require( "./modules/dir.js" );

const config = require( "../config.json" );

router.get( "/login", ( req, res ) => {
    if( req.user ) res.redirect( "/" );
    else res.render( "login", {
        error: req.query.error,
        title: config.title
    } );
} );

router.get( "/", ( req, res, next ) => {
    if( !req.user ) {
        res.redirect( "/login" );
        return;
    }

    let options = {
        title: config.title,
        user: req.user,
        user_logged_in: true,
        dir_info: dir.getInfo( req.query.dir )
    };

    try {
        let info = disk.checkSync( "/" );
        let mb = numbers.format( ( info.available / 1000000 ), 3 );
        options.diskspace = `${numbers.format( info.available )} Bytes (${mb} MB)`;
    } catch( error ) {
        options.diskspace = `<span class="error">${error}`;
    }

    res.render( "index", options );
} );

router.get( "/inspect", ( req, res, next ) => {
    if( !req.user ) {
        // largest wikipedia article: 'List of named minor planets (numerical)'
        res.redirect( "https://en.wikipedia.org/w/index.php?oldid=752675586" );
        return;
    }

    let filepath;
    if( req.query.file )
        filepath = path.join( config.root_dir, req.query.file );
    
    if( filepath && fs.existsSync( filepath ) ) {
        res.sendFile( filepath );
    } else res.sendStatus( 404 );
} );
