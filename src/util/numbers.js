exports.format = ( number, decimalPoints ) => {
    let parts = number.toString().split( "." );

    let a_arr = parts[ 0 ].split( "" );
    a_arr.reverse();
    let a_str = "";
    for( let i = 0; i < a_arr.length; i++ ) {
        a_str += a_arr[ i ].toString();
        if( i < a_arr.length - 1 && ( i + 1 ) % 3 == 0 ) a_str += "'";
    }
    a_str = a_str.split( "" );
    a_str.reverse();
    a_str = a_str.join( "" );

    let b_str = "";
    if( parts[ 1 ] ) {
        let b_arr = parts[ 1 ];
        if( decimalPoints ) b_arr = b_arr.substring( 0, decimalPoints );
        for( let i = 0; i < b_arr.length; i++ ) {
            b_str += b_arr[ i ].toString();
            if( i < b_arr.length - 1 && ( i + 1 ) % 3 == 0 ) b_str += "'";
        }
    }

    let number_str = a_str;
    if( parts[ 1 ] ) number_str += "." + b_str;
    return number_str;
};
