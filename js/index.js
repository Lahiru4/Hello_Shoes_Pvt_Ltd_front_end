document.addEventListener("DOMContentLoaded", function() {
    var currentDate = new Date(); // Create a new Date object
    var formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
});
$('#Dashboard').css('display', 'block');
$('#Available_stock').css('display', 'none');
$('#Add_new_stock').css('display', 'none');

$('#accordion-menu>li').eq(0).on('click', () => {
    $('#Dashboard').css('display', 'block');
    $('#Available_stock').css('display', 'none');
    $('#Add_new_stock').css('display', 'none');

});
$('#accordion-menu>li:eq(1)>ul>li').eq(0).on('click', () => {
    $('#Dashboard').css('display', 'none');
    $('#Available_stock').css('display', 'block');
    $('#Add_new_stock').css('display', 'none');

});

$('#accordion-menu>li:eq(1)>ul>li').eq(1).on('click', () => {
    $('#Dashboard').css('display', 'none');
    $('#Available_stock').css('display', 'none');
    $('#Add_new_stock').css('display', 'block');

});
/*sign_In*/
function sign_In(){
    $('#Login_form').css('display', 'none');
    $('#Main_container').css('display', 'block');
    $('#h_m').css('display', 'block');
    $('#r_s').css('display', 'block');
    $('#r_s_b').css('display', 'block');
}
/*sign_In*/