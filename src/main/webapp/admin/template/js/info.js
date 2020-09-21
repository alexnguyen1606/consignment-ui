jQuery(function ($) {
    $(document).ready(function () {
        function getInfo() {
            var fullName = window.localStorage.getItem("fullName");
            $('.fullName').text(fullName);
            $('#fullName').val(fullName);
            $('.avatar').attr("src", window.localStorage.getItem("avatar"));
            $('#email').val(window.localStorage.getItem("email"));
        };
        getInfo();

    })
});