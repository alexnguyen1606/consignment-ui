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
                    $('.loader').css("display", "none");
                    loadBorrow(response.data);
                    if (response.totalPage > 0) {
                        paging(response.totalPage, response.currentPage);

                    }


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
                var createdDate = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
                row += "<tr style='border-radius: 5px;'>";
                row += "<td>" + v.insuranceCode + "</td>";
                row += "<td>" + v.customer.numberIdentify + "</td>";
                row += "<td>" + v.customer.fullName + "</td>";
                row += "<td>" + createdDate + "</td>";
                row += "<td>" + v.lockers.cabinet.nameCabinet + "</td>";
                row += "<td>" + v.lockers.name  + "</td>";
                row += '<td><div class="btn-detail text-center" data-id="' + v.id + '" data-toggle="modal" data-target="#modalBorrow"><a >Chi tiết</a></div></td>';
                row += "</tr>";
            });
            $('#tableBorrow').empty();
            $('#tableBorrow').append(row);
            if (data.length == 0) {
                $('#no-content').css("display", "block")
            } else {
                $('#no-content').css("display", "none")

            }
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
                    $('#fullName2').val(data.fullName);
                    $('#phoneNumber').val(data.phoneNumber);
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
        function clear(){
            $('.insuranceCode').text("");
            $('.numberIdentify').text("");
            $('.fullName').text("");
            $('.createdDate').text("");
            $('.lockersName').text("");
            $('.userName').text("");
            $('.note').text("");
            $('.phoneNumber2').text("");
            $('#borrowLockersId').val("")
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
                    clear();


                    $('.insuranceCode').text(data.insuranceCode);
                    $('.numberIdentify').text(data.customer.numberIdentify);
                    $('.fullName').text(data.customer.fullName);
                    $('.phoneNumber2').text(data.phoneNumber);
                    var date = new Date(data.createdDate);
                    var createdDate = date.getHours() + ":" + date.getMinutes() + " " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
                    $('.createdDate').text(createdDate);
                    $('.lockersName').text(data.lockers.name );
                    $('.userName').text(data.user.fullName);
                    $('.username').text(data.user.username);
                    $('.note').text(data.note);
                    $('.cabinetName').text(data.lockers.cabinet.nameCabinet)
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
        });
        function getCabinet(){
            $.ajax({
                type: "GET",
                url: "/api/consignment/cabinet",
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    var row = "";
                   $.each(response.data,function (i,v) {
                       row+='<option value="'+v.id+'">'+v.nameCabinet+'</option>';
                   });
                   $('#cabinetId').empty();
                   $('#cabinetId').append(row)
                }, error: function (response) {


                }
            });
        }
        getCabinet();
        $('#cabinetId').on('change',function () {
            var cabinetId = $('#cabinetId').val();
            $.ajax({
                type: "GET",
                url: "/api/consignment/lockers/cabinet/"+cabinetId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    var row = "";
                    $.each(response.data,function (i,v) {
                        row+='<option value="'+v.id+'">'+v.name+'</option>';
                    });
                    $('#lockersId').empty();
                    $('#lockersId').append(row)
                }, error: function (response) {


                }
            });
        });
        $('#startTime').on('change',function () {
            var value = $(this).val();
            $('#endTime').attr("min",value)
        });
        $('#endTime').on('change',function () {
            var value = $(this).val();
            $('#startTime').attr("max",value)
        })
    });

});