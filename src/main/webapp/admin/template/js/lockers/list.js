jQuery(function ($) {
    $(document).ready(function () {
        function getListLockers(url) {
            var data = getDataSearch();
            if (url == "" || url == null) {
                url = '/api/consignment/lockers/all';
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
                    loadLocker(response.data);
                }, error: function (response) {
                    $('.loader').css("display", "none");

                }
            });
        }

        function loadLocker(data) {
            var row = "";
            $.each(data, function (i, v) {
                var active = "";
                if (v.isActive) {
                    active = "<img src='/admin/image/Ellipse%2033.png'>"
                } else {
                    active = "<img src='/admin/image/Ellipse%2035.png'>"
                }
                row += "<tr>";
                row += '<td>'+v.code+'</td>';
                row += '<td>'+v.name+'</td>';
                row += '<td class="text-center">'+active+'</td>';
                row += '<td class="text-center">'+v.totalBorrowed+'</td>';
                row += '<td class="text-center"><div class="d-flex text-center"><div class="edit text-center mr-3" data-id="' + v.id + '" data-toggle="modal" data-target="#modalEdit" title="Cập nhật"><img src="/admin/image/Frame.svg"></div>';
                row += "</tr>"
            });
            $('#tableLock').empty();
            $('#tableLock').append(row);
            if (data.length==0){
                $('#no-content').css("display","block")
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
        $('#formSearch').on('submit',function (e) {
            e.preventDefault();
            getListLockers("");
        })
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
                        var url = "/api/consignment/lockers/all";
                        url += "?page=" + page;
                        getListLockers(url);
                    }
                }
            });
        };
        $(document).on('click','.edit',function () {
           var id = $(this).attr("data-id");
           $('.modal-title').text("Cập nhật thông tin hộp lưu trữ");
            $.ajax({
                type: "GET",
                url: "/api/consignment/lockers/"+id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    var data = response.data;
                    $('#name').val(data.name);
                    $('#code').val(data.code);
                    $('#id').val(data.id);
                    if (data.isActive) {
                        $('#isActive').val(1)
                    } else {
                        $('#isActive').val(0);
                    }
                    $('.loader').css("display", "none");
                }, error: function (response) {
                    $('.loader').css("display", "none");

                }
            });
        });
        getListLockers("");
        $('#cancel').on('click', function () {
            cancel();
        });

        function cancel() {
            $('.modal-title').text("Thêm mới hộp lưu trữ")
            $('#id').val("");
            $('#name').val("");
            $('#code').val("");
        }
        $('#formEdit').on('submit',function (e) {
            e.preventDefault();
            var formData = $('#formEdit').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            if (data.isActive == 1) {
                data.isActive = "true";
            } else {
                data.isActive = "false";
            }
            if (data.id == "") {
                addLock(data);
            } else {
                editLock(data);
            }
        })
        function addLock(data) {
            $.ajax({
                type: "POST",
                url: "/api/consignment/lockers",
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
                    getListLockers("");
                    alert(response.message);
                    $('#cancel').trigger('click');
                    $('.loader').css("display", "none");
                }, error: function (response) {

                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }
        function editLock(data) {
            $.ajax({
                type: "PUT",
                url: "/api/consignment/lockers",
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
                    getListLockers("");
                    alert(response.message);
                    $('#cancel').trigger('click');
                    $('.loader').css("display", "none");
                }, error: function (response) {

                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }
    })
});