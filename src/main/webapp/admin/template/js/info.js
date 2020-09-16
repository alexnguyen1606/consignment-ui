jQuery(function ($) {
    $(document).ready(function () {
        function getInfo() {
            $.ajax({
                type: "GET",
                url: "/api/consignment/user/info",
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    $('.fullName').text(response.data.fullName);
                     $('.fullName').val(response.data.fullName);
                    $('#email').val(response.data.email);
                    if (response.data.avatar == "" || response.data.avatar == null) {
                        $('.avatar').attr("src", "/admin/image/IMG_1528%201.png");
                    } else {
                        $('.avatar').attr("src", response.data.avatar);
                    }

                }, error: function (jqXHR) {


                }
            })
        };
        getInfo();

    })
});