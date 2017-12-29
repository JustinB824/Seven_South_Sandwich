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

    $('#nav-icon2').click(function(){
        $('#nav_bkgd, #nav-icon2').toggleClass('open');
    });

    /*$('.nav').on('click', function() {
        var page = $(this).data('page');
        //console.log(page);
        $('main').load('views/' + page + '.html');
        page = (page == 'home' ? '' : page);
        window.history.pushState('', '', '/' + page);

        return false;
    });*/
});