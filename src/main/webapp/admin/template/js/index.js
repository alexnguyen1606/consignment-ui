jQuery(function ($) {
    $(document).ready(function () {
        function getInfo() {
            $.ajax({
                type: "GET",
                url: "/api/consignment/dashboard-info",
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {
                },
                success: function (response) {
                    $('#totalInsurrance').text(response.data)
                }, error: function (response) {
                }
            });
        }
        getInfo();
    })
})