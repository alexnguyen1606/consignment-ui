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

                    localStorage.setItem("fullName",response.data.fullName);
                    localStorage.setItem("email",response.data.email);
                    localStorage.setItem("phoneNumber",response.data.phoneNumber);
                    if (response.data.avatar == "" || response.data.avatar == null) {
                        localStorage.setItem("avatar","/admin/image/IMG_1528%201.png");
                    } else {
                        localStorage.setItem("avatar",response.data.avatar);
                    }

                }, error: function (jqXHR) {

                }
            })
        };
        getInfo();

    })}
);