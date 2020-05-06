const strict_whitelist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.";
const path_whitelist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-./";

exports.strict = ( string ) => {
    if( typeof string != "string" ) return "";

    string = exports.replaceUmlaut( string );
    string = exports.replaceSpaceWithDash( string );

    return exports.filter( string, strict_whitelist );
};

exports.path = ( string ) => {
    if( typeof string != "string" ) return "";

    string = string.replace( /../g, "." );
    string = exports.replaceUmlaut( string );
    string = exports.replaceSpaceWithDash( string );
    string = exports.filter( string, path_whitelist );;

    return string.toLowerCase();
};

exports.replaceUmlaut = ( string ) => {
    if( typeof string != "string" ) return "";
    return string.replace( /ä/g, "ae" ).replace( /ö/g, "oe" ).replace( /ü/g, "ue" );
};

exports.replaceSpaceWithDash = ( string ) => {
    if( typeof string != "string" ) return "";
    return string.replace( / /g, "-" );
};

exports.filter = ( string, whitelist ) => {
    if( typeof string != "string" ) return "";

    let save_string = "";
    let char_list = string.split( "" );
    for( let i = 0; i < char_list.length; i++ ) {
        if( whitelist.indexOf( char_list[ i ] ) >= 0 ) {
            save_string += char_list[ i ];
        }
    }

    return save_string;
};
