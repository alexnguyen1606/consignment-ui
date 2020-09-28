jQuery(function ($) {
    $(document).ready(function () {
        function getLog(url) {
            var data = getDataSearch();
            if (url == "" || url == null) {
                url = '/api/consignment/tracking-log/all';
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
                    if (response.totalPage > 0) {
                        paging(response.totalPage, response.currentPage);
                    }
                    loadLoging(response.data);

                }, error: function (response) {
                    $('.loader').css("display", "none");

                }
            })
        };

        function loadLoging(data) {
            var row = "";
            $.each(data, function (i, v) {
                var type = "";
                if (v.type == "CHECK_IN") {
                    type = "Nhận bảo hiểm"
                } else if (v.type == "CHECK_OUT") {
                    type = "Trả bảo hiểm"
                }
                var date = new Date(v.createdDate);
                var createdDate = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
                row += "<tr style='border-radius: 5px;'>";
                row += "<td>" + v.customer.insuranceCode + "</td>";
                row += "<td>" + v.customer.numberIdentify + "</td>";
                row += "<td>" + v.customer.fullName + "</td>";
                row += "<td>" + type + "</td>";
                row += "<td>" + createdDate + "</td>";
                row += "<td>" + v.locker.name + " --- " + v.locker.code + "</td>";
                row += '<td><div class="btn-detail text-center" data-id="' + v.id + '" data-toggle="modal" data-target="#modalLogging"><a >Chi tiết</a></div></td>';
                row += "</tr>";
            });
            $('#tableLogging').empty();
            $('#tableLogging').append(row);
            if (data.length == 0) {
                $('#no-content').css("display", "block")
            } else {
                $('#no-content').css("display", "none")

            }
        }

        function getDataSearch() {
            var formData = $('#formSearch').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }

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
                        var url = "/api/consignment/tracking-log/all";
                        url += "?page=" + page;
                        getLog(url);
                    }
                }
            });
        }

        getLog("");
        $('#formSearch').on('submit', function (e) {
            e.preventDefault();
            getLog("");
        });
        $(document).on('click', '.btn-detail', function () {
            var id = $(this).attr("data-id");
            $.ajax({
                type: "GET",
                url: "/api/consignment/tracking-log/" + id,
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
                    $('.username').text("");


                    $('.insuranceCode').text(data.customer.insuranceCode);
                    $('.numberIdentify').text(data.customer.numberIdentify);
                    $('.fullName').text(data.customer.fullName);
                    var date = new Date(data.createdDate);
                    var createdDate = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
                    $('.createdDate').text(createdDate);
                    $('.lockersName').text(data.locker.name + " --- " + data.locker.code);
                    $('.cabinetName').text(data.locker.cabinet.nameCabinet);
                    $('.userName').text(data.user.fullName);
                    $('.username').text(data.createdBy);

                }, error: function (response) {
                    alert(response.responseJSON.message);
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            })
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