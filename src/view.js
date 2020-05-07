var router = require( "express" ).Router();
module.exports = router;

var fs = require( "fs" );
var path = require( "path" );

const config = require( "../config.json" );
const wwwroot = path.join( __dirname, "../wwwroot" );

router.get( "/login", ( req, res ) => {
    if( req.user ) res.redirect( "/" );
    else res.render( "login", {
        error: "cyka!",
        title: config.title
    } );
} )

router.get( "/", ( req, res, next ) => {
    if( req.user ) public( req, res );
    else private( req, res );
} )

function private( req, res ) {
    res.render( "index", {
        title: config.title
    } );
}

function public( req, res ) {
    res.render( "index", {
        title: config.title,
        user_logged_in: true
    } );
}