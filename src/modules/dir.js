var fs = require( "fs" );
var path = require( "path" );

const config = require( "../../config.json" );

exports.getInfo = ( dir ) => {
    if( dir && dir.trim() != "" )
        dir = path.join( config.root_dir, "/", dir.toString().replace( /\.\./g, "." ) ) + "/";
    else dir = config.root_dir + "/";

    dir = dir.replace( /\/\//g, "/" );

    let dir_prefix = dir.replace( config.root_dir, "/" ).replace( /\/\//g, "/" );

    let info = {
        files: [],
        directories: []
    };

    let dirlist = fs.readdirSync( dir );

    for( let i = 0; i < dirlist.length; i++ ) {
        let stats = fs.statSync( dir + dirlist[ i ] );
        let dir_path = dir_prefix + dirlist[ i ];
        dir_path = dir_path.replace( /\/\//g, "/" );

        if( stats.isDirectory() )
            info.directories.push( {
                path: dir_path,
                name: dirlist[ i ]
            } );
        else
            info.files.push( {
                path: dir_path,
                name: dirlist[ i ]
            } );
    }

    info.files.sort();
    info.directories.sort();

    if( dir_prefix != "/" && dir_prefix[ dir_prefix.length - 1 ] == "/" )
        dir_prefix = dir_prefix.substring( 0, dir_prefix.length - 1 );

    let dirparts = dir_prefix.split( "/" );
    let parent = dir_prefix.replace( dirparts[ dirparts.length - 1 ], "" );
    if( parent.trim() != "" && parent != dir_prefix )
        info.parent = parent;

    return info;
};
