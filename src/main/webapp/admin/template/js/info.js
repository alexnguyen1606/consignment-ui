jQuery(function ($) {
    $(document).ready(function () {
        function getInfoInLocal() {

            var fullName = localStorage.getItem("fullName");
            $('.fullName3').text(fullName);
            $('#fullName').val(fullName);
            $('.avatar').attr("src", window.localStorage.getItem("avatar"));
            $('.phoneNumber').val( window.localStorage.getItem("phoneNumber"));
            $('#email').val(window.localStorage.getItem("email"));
        };
        getInfoInLocal();

    })
});