document.addEventListener("DOMContentLoaded", function() {
    var currentDate = new Date(); // Create a new Date object
    var formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
});
$('#Dashboard').css('display', 'block');
$('#Available_stock').css('display', 'none');
$('#Add_new_stock').css('display', 'none');
$('#Add_new_customer').css('display', 'none');
$('#Available_customer').css('display', 'none');

$('#accordion-menu>li').eq(0).on('click', () => {
    $('#Dashboard').css('display', 'block');
    $('#Available_stock').css('display', 'none');
    $('#Add_new_stock').css('display', 'none');
    $('#Add_new_customer').css('display', 'none');
    $('#Available_customer').css('display', 'none');


});
$('#accordion-menu>li:eq(1)>ul>li').eq(0).on('click', () => {
    $('#Available_stock').css('display', 'block');
    $('#Dashboard').css('display', 'none');
    $('#Add_new_stock').css('display', 'none');
    $('#Add_new_customer').css('display', 'none');
    $('#Available_customer').css('display', 'none');

});

$('#accordion-menu>li:eq(1)>ul>li').eq(1).on('click', () => {
    $('#Add_new_stock').css('display', 'block');
    $('#Dashboard').css('display', 'none');
    $('#Available_stock').css('display', 'none');
    $('#Add_new_customer').css('display', 'none');
    $('#Available_customer').css('display', 'none');

});
$('#accordion-menu>li:eq(2)>ul>li').eq(0).on('click', () => {
    $('#Dashboard').css('display', 'none');
    $('#Available_stock').css('display', 'none');
    $('#Add_new_stock').css('display', 'none');
    $('#Add_new_customer').css('display', 'none');
    $('#Available_customer').css('display', 'block');

});
$('#accordion-menu>li:eq(2)>ul>li').eq(1).on('click', () => {
    $('#Dashboard').css('display', 'none');
    $('#Available_stock').css('display', 'none');
    $('#Add_new_stock').css('display', 'none');
    $('#Add_new_customer').css('display', 'block');
    $('#Available_customer').css('display', 'none');

});