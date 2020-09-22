jQuery(function ($) {
    $(document).ready(function () {
        function getAllCabinet(url) {
            var data = getDataSearch();
            if (url == "" || url == null) {
                url = '/api/consignment/cabinet/all';
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
                    loadCabinet(response.data);
                }, error: function (response) {
                    $('.loader').css("display", "none");

                }
            });
        }

        function loadCabinet(data) {
            var row = "";
            $.each(data, function (i, v) {
                var active = "";
                if (v.status) {
                    active = "<img src='/admin/image/Ellipse%2033.png'>"
                } else {
                    active = "<img src='/admin/image/Ellipse%2035.png'>"
                }
                row += "<tr>";
                row += '<td>'+v.nameCabinet+'</td>';
                row += '<td>'+v.cabinetCode+'</td>';
                row += '<td class="text-center">'+active+'</td>';
                // row += '<td class="text-center">'+v.totalBorrowed+'</td>';
                row += '<td class="text-center"><div class="d-flex text-center"><div class="edit text-center mr-3" data-id="' + v.id + '" data-toggle="modal" data-target="#modalEdit" title="Cập nhật"><img src="/admin/image/Frame.svg"></div>';
                row += "</tr>"
            });
            $('#tableCabinet').empty();
            $('#tableCabinet').append(row);
            if (data.length==0){
                $('#no-content').css("display","block")
            } else {
                $('#no-content').css("display", "none")

            }
        }

        function getDataSearch() {
            // var formData = $('#formSearch').serializeArray();
            var data = {};
            // $.each(formData, function (i, v) {
            //     data[v.name] = v.value;
            // });
            return data;
        }

        getAllCabinet();
        $('#formEdit').on('submit', function (e) {
            e.preventDefault();
            var formData = $('#formEdit').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            if (data.id == '') {
                create(data);
            } else {
                update(data)
            }
        });

        function create(data) {
            $.ajax({
                type: "POST",
                url: "/api/consignment/cabinet",
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
                    getAllCabinet("");
                    alert(response.message);
                    $('#cancel').trigger('click');
                    $('.loader').css("display", "none");
                }, error: function (response) {

                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }

        function update(data) {
            $.ajax({
                type: "PUT",
                url: "/api/consignment/cabinet",
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
                    getAllCabinet("");
                    alert(response.message);
                    $('#cancel').trigger('click');
                    $('.loader').css("display", "none");
                }, error: function (response) {

                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }

        $('#cancel').on('click', function () {
            cancel();
        });

        function cancel() {
            $('.modal-title').text("Thêm mới tủ lưu trữ")
            $('#id').val("");
            $('#nameCabinet').val("");
            $('#cabinetCodet').val("");
            $('#description').val("");
        }

        $(document).on('click', '.edit', function () {
            var id = $(this).attr("data-id");
            $('.modal-title').text("Cập nhật thông tin hộp lưu trữ");
            $.ajax({
                type: "GET",
                url: "/api/consignment/cabinet/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    var data = response.data;
                    $('#nameCabinet').val(data.nameCabinet);
                    $('#description').val(data.description)
                    $('#id').val(data.id);
                    $('#status').val(data.status);
                    $('#cabinetCode').val(data.cabinetCode);
                    $('.loader').css("display", "none");
                }, error: function (response) {
                    $('.loader').css("display", "none");

                }
            });
        });

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
                        var url = "/api/consignment/cabinet/all";
                        url += "?page=" + page;
                        getAllCabinet(url);
                    }
                }
            });
        };
    })
})