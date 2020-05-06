var router = require( "express" ).Router();
module.exports = router;

var fs = require( "fs" );
var path = require( "path" );

const wwwroot = path.join( __dirname, "../wwwroot" );

router.get( "/login", ( req, res ) => {
    if( req.user ) res.redirect( "/" );
    else res.render( "login" );
} )

router.get( "/", ( req, res, next ) => {
    if( req.user ) private( req, res );
    else public( req, res );
} )

function private( req, res ) {
    res.render( "index" );
}

function public( req, res ) {
    res.render( "index" );
}