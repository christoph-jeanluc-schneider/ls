var router = require( "express" ).Router();
module.exports = router;

var fs = require( "fs" );
var path = require( "path" );
var formidable = require( "express-formidable" );
var mkdirp = require( "mkdirp" );

var user = require( "./modules/user.js" );
var escape = require( "./util/escape.js" );
var crypto = require( "./util/crypto.js" );

const config = require( "../config.json" );

router.get( "/logout", ( req, res ) => {
    res.clearCookie( "user" );
    res.redirect( "/" );
} );

router.post( "/login", ( req, res ) => {
    if( user.check( req.body.username, req.body.password ) ) {
        let _user = user.getByUsername( req.body.username );
        let cookie_content = crypto.encrypt( _user.id, config.key );
        res.cookie( "user", cookie_content,  {
            maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days in ms,
            httpOnly: true
        } );
        res.redirect( "/" );
    }
    else res.redirect( "/login/?error='username or password incorrect!'" );
} );

router.use( ( req, res, next ) => {
    if( req.user ) next();
    else res.sendStatus( 401 );
} );

router.post( "/upload", formidable( {
    encoding: "utf-8",
    uploadDir: path.join( __dirname, "../tmp" ),
    multiples: true,
    maxFileSize: 1024 * 1024 * 1024
} ), ( req, res ) => {
    for( let name in req.files ) {
        if( Array.isArray( req.files[ name ] ) )
            for( let i in req.files[ name ] )
                process_upload( req.files[ name ][ i ].path, req.files[ name ][ i ].name, req.directory );
        else
            process_upload( req.files[ name ].path, req.files[ name ].name, req.directory );
    }
    res.status( 200 ).send( "upload successful" );
} );

function process_upload( oldPath, name, directory ) {
    name = escape.strict( name );
    directory = escape.path( directory );

    if( !fs.existsSync( path.join( config.root_dir, directory ) ) )
        return;

    let newPath = path.join( config.root_dir, directory, name );
    fs.renameSync( oldPath, newPath );
}


router.post( "/folder", ( req, res ) => {
    if( !req.body.directory || req.body.directory.trim() == "" ) {
        req.status( 400 ).send( "no path specified" );
        return;
    }
        
    directory = escape.path( req.body.directory );
    let dir = path.join( config.root_dir, directory );
    mkdirp.sync( dir );
    res.sendStatus( 200 );
} );

router.delete( "*", ( req, res ) => {
    res.sendStatus( 200 );
} );
