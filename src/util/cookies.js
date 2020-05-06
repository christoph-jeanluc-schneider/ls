var _user = require( "../modules/user.js" );
var crypto = require( "./crypto.js" );

const config = require( "../../config.json" );

exports.parse_user = ( req, res, next ) => {
    if( req.cookies.user ) {
        let user_id = crypto.decrypt( req.cookies.user, config.key );
        let user = _user.getById( user_id );

        if( user && user.id )
            req.user = user;
    }

    next();
};

