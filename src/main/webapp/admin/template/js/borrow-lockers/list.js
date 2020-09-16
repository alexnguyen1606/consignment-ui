jQuery(function ($) {
    $(document).ready(function () {


        function getDataSearch() {
            var formData = $('#formSearch').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }

        $('#formSearch').on('submit', function (e) {
            console.log("check");
            e.preventDefault();
            getAllBorrow("");
        });

        function getAllBorrow(url) {
            var data = getDataSearch();
            if (url == "" || url == null) {
                url = '/api/consignment/borrowed-lockers/all';
            }
            $.ajax({
                type: "POST",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    loadBorrow(response.data);
                    if(response.totalPage>0){
                        paging(response.totalPage, response.currentPage);

                    }

                    $('.loader').css("display", "none");
                }, error: function (response) {
                    $('.loader').css("display", "none");

                }
            })
        };

        function paging(totalPage, currentPages) {
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPages,
                visiblePages: 10,
                last: '<i class="fa fa-angle-right"></i><i class="fa fa-angle-right"></i>',
                next: '<i class="fa fa-angle-right"></i>',
                first: '<i class="fa fa-angle-left"></i><i class="fa fa-angle-left"></i>',
                prev: '<i class="fa fa-angle-left"></i>',

                paginationClass: 'pagination',
                nextClass: 'page-item next',
                prevClass: 'page-item prev',
                lastClass: 'page-item last',
                firstClass: 'page-item first',
                pageClass: 'page-item',

                onPageClick: function (event, page) {
                    if (currentPages != page) {
                        var url = "/api/consignment/borrowed-lockers/all";
                        url += "?page=" + page;
                        getAllBorrow(url);
                    }
                }
            });
        }

        getAllBorrow("");

        function loadBorrow(data) {
            var row = "";
            $.each(data, function (i, v) {
                var date = new Date(v.createdDate);
                var createdDate = date.getHours() + ":" + date.getMinutes() + " " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
                row += "<tr style='border-radius: 5px;'>";
                row += "<td>" + v.insuranceCode + "</td>";
                row += "<td>" + v.customer.numberIdentify + "</td>";
                row += "<td>" + v.customer.fullName + "</td>";
                row += "<td>" + createdDate + "</td>";
                row += "<td>" + v.lockers.name + " --- " + v.lockers.code + "</td>";
                row += '<td><div class="btn-detail text-center" data-id="' + v.id + '" data-toggle="modal" data-target="#modalBorrow"><a >Chi tiết</a></div></td>';
                row += "</tr>";
            });
            $('#tableBorrow').empty();
            $('#tableBorrow').append(row);
        }

        $('#insuranceCode').on("change", function () {
            var code = $('#insuranceCode').val();
            $.ajax({
                type: "GET",
                url: "/api/consignment/customer/insurance?code=" + code,
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {
                },
                success: function (response) {
                    var data = response.data
                    $('#customerId').val(data.id);
                    $('#insuranceCode').val(data.insuranceCode);
                    $('#fullName').val(data.fullName);
                    $('#numberIdentify').val(data.numberIdentify);
                }, error: function (response) {
                    $('#customerId').val("");
                    // getCourse();
                }
            })
        });


        function getData() {
            var formData = $('#formBorrow').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }

        $('#formBorrow').on("submit", function (e) {
            e.preventDefault();
            var data = getData();
            if (data.customerId != null && data.customerId != "") {
                borrow();
            } else {
                saveCustomer(data);
            }
        });

        function saveCustomer(data) {
            $.ajax({
                type: "POST",
                url: "/api/consignment/customer",
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    console.log(response);
                    $('#customerId').val(response.data.id);
                    borrow();
                }, error: function (response) {
                    alert(response.responseJSON.message);
                    clearInputWhenError();
                }
            })
        }

        function borrow() {
            var data = getData();
            $.ajax({
                type: "POST",
                url: "/api/consignment/borrowed-lockers",
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    alert(response.message);
                    $('.loader').css("display", "none");
                    clearInput();
                    getAllBorrow("");
                }, error: function (response) {
                    alert(response.responseJSON.message);
                    $('.loader').css("display", "none");
                    clearInputWhenError();
                }
            });

        }

        function clearInput() {
            $('#insuranceCode').val("");
            $('#customerId').val("");
            $('#fullName').val("");
            $('#numberIdentify').val("");
            $('#note').val("");

        }

        function clearInputWhenError() {
            $('#insuranceCode').val("");
            $('#customerId').val("");
            $('#numberIdentify').val("");

        }

        $(document).on('click', '.btn-detail', function () {
            var id = $(this).attr("data-id");
            $.ajax({
                type: "GET",
                url: "/api/consignment/borrowed-lockers/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    $('.loader').css("display", "none");
                    var data = response.data;
                    $('.insuranceCode').text("");
                    $('.numberIdentify').text("");
                    $('.fullName').text("");
                    $('.createdDate').text("");
                    $('.lockersName').text("");
                    $('.userName').text("");
                    $('.note').text("");
                    $('#borrowLockersId').val("")


                    $('.insuranceCode').text(data.insuranceCode);
                    $('.numberIdentify').text(data.customer.numberIdentify);
                    $('.fullName').text(data.customer.fullName);
                    var date = new Date(data.createdDate);
                    var createdDate = date.getHours() + ":" + date.getMinutes() + " " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
                    $('.createdDate').text(createdDate);
                    $('.lockersName').text(data.lockers.name + " --- " + data.lockers.code);
                    $('.userName').text(data.user.fullName);
                    $('.note').text(data.note);
                    $('#borrowLockersId').val(data.id);
                }, error: function (response) {
                    alert(response.responseJSON.message);
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            })
        });
        $('#returnBorrow').on('click', function () {
            var id = $('#borrowLockersId').val();
            if (!confirm("Xác nhận trả thẻ bảo hiểm")) {
                throw "fail";
            }
            $.ajax({
                type: "PUT",
                url: "/api/consignment/borrowed-lockers/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    alert(response.message);
                    $('.loader').css("display", "none");
                    getAllBorrow("");
                }, error: function (response) {
                    alert(response.responseJSON.message);
                    $('.loader').css("display", "none");

                }
            });
        })
    });

});