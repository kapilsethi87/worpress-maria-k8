( function( $ ) {

    var panel = $('html', window.parent.document);
    var body = $('body');
    var siteTitle = $('#site-title');
    var tagline = $( '.tagline' );
    var inlineStyles = $('#ct-shift-style-inline-css');

    // Site title
    wp.customize( 'blogname', function( value ) {
        value.bind( function( to ) {
            // if there is a logo, don't replace it
            if( siteTitle.find('img').length == 0 ) {
                siteTitle.children('a').text( to );
            }
        } );
    } );

    // Tagline
    wp.customize( 'blogdescription', function( value ) {
        value.bind( function( to ) {
            var tagline = $('.tagline');
            if( tagline.length == 0 ) {
                $('#title-container').append('<p class="tagline"></p>');
            }
            tagline.text( to );
        } );
    } );

    wp.customize( 'logo_size', function( value ) {
        value.bind( function( to ) {
            $('.logo').css('width', to);
        } );
    } );

    wp.customize( 'layout', function( value ) {
        value.bind( function( to ) {
            if ( to == 'left' ) {
                body.addClass('left-sidebar');
            } else {
                body.removeClass('left-sidebar');
            }
        } );
    } );

    // Custom CSS

    // get current Custom CSS
    var customCSS = panel.find('#customize-control-custom_css').find('textarea').val();

    // get the CSS in the inline element
    var currentCSS = inlineStyles.text();

    // remove the Custom CSS from the other CSS
    currentCSS = currentCSS.replace(customCSS, '');

    // update the CSS in the inline element w/o the custom css
    inlineStyles.text(currentCSS);

    // add custom CSS to its own style element
    body.append('<style id="style-inline-custom-css" type="text/css">' + customCSS + '</style>');

    var setting = 'custom_css';
    if ( panel.find('#sub-accordion-section-custom_css').length ) {
        setting = 'custom_css[shift]';
    }
    // Custom CSS
    wp.customize( setting, function( value ) {
        value.bind( function( to ) {
            $('#style-inline-custom-css').remove();
            if ( to != '' ) {
                to = '<style id="style-inline-custom-css" type="text/css">' + to + '</style>';
                body.append( to );
            }
        } );
    } );

    /* prevent logo's selective refresh from acting b/c has_custom_logo() will always be true,
     so the site title cannot return */
    $('.custom-logo-link').removeClass('custom-logo-link');

} )( jQuery );