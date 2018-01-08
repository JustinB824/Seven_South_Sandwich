/**
 * Created by jbogan on 10/2/17.
 */
//console.log('Log!');

var include_dir;
if (location.pathname.split("/")[1] != '') {
    include_dir = '../views/';
} else {
    include_dir = 'views/';
}

$('header').load(include_dir + 'header.html');
$('footer').load(include_dir + 'footer.html');

$(function() {

    $('#nav-icon2').on('click', function(e) {
        e.stopPropagation();
        $('#nav_bkgd, #nav-icon2').toggleClass('open');
        return false;
    });

});

function menu() {
    $('#nav_bkgd, #nav-icon2').toggleClass('open');
    return false;
}