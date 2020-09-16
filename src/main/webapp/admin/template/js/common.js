jQuery(function ($) {
    $(document).ready(function () {
        function getLockers() {
            $.ajax({
                type: "GET",
                url: "/api/consignment/lockers/all",
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    var row = "";
                    $.each(response.data, function (i, v) {
                        row += "<option value=" + v.id + ">" + v.name + " --- " + v.code + "</option>";
                    });
                    $('.lockers').append(row);
                }, error: function (jqXHR) {

                    // getCourse();
                }
            })
        };
        getLockers();

    })
})