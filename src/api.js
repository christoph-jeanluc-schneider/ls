var router = require( "express" ).Router();
module.exports = router;

var fs = require( "fs" );
var path = require( "path" );
var formidable = require( "express-formidable" );
var mkdirp = require( "mkdirp" );

var file = require( "./modules/file.js" );
var escape = require( "./util/escape.js" );

const wwwroot = path.join( __dirname, "../wwwroot" );

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

    if( !fs.existsSync( path.join( wwwroot, directory ) ) )
        return;

    let newPath = path.join( wwwroot, directory, name );
    fs.renameSync( oldPath, newPath );
}


router.post( "/folder", ( req, res ) => {
    if( !req.body.directory || req.body.directory.trim() == "" ) {
        req.status( 400 ).send( "no path specified" );
        return;
    }
        
    directory = escape.path( req.body.directory );
    let dir = path.join( wwwroot, directory );
    mkdirp.sync( dir );
    res.sendStatus( 200 );
} );

router.delete( "*", ( req, res ) => {
    res.sendStatus( 200 );
} );