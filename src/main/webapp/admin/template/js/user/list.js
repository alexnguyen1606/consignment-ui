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

        function getAllUser(url) {
            var data = getDataSearch();
            if (url == "" || url == null) {
                url = '/api/consignment/user/all';
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
                    loadUser(response.data);
                }, error: function (response) {
                    $('.loader').css("display", "none");

                }
            });
        }

        getAllUser("");

        function loadUser(data) {
            var row = "";
            $.each(data, function (i, v) {
                var active = "";
                if (v.isActive) {
                    active = "<img src='/admin/image/Ellipse%2033.png'>"
                } else {
                    active = "<img src='/admin/image/Ellipse%2035.png'>"
                }
                row += "<tr>";
                row += "<td>" + v.fullName + "</td>";
                row += "<td>" + v.username + "</td>";
                row += "<td>" + v.email + "</td>";
                row += "<td class='text-center'>" + active + "</td>";
                row += '<td class="text-center"><div class="d-flex justify-content-center text-center"><div class="edit text-center mr-3 mr-1" data-id="' + v.id + '" data-toggle="modal" data-target="#modalEdit" title="Cập nhật" style="cursor: pointer"><img src="/admin/image/Frame.svg"></div>';
                row += '<div class="editRole text-center mr-1" data-id="' + v.id + '" data-toggle="modal" data-target="#modalRole"><a >Phân quyền</a></div>';
                row += '<div class="resetPassword pl-2 text-center" data-id="' + v.id + '" ><a  >Reset mật khẩu</a></div>';
                row += '</div></td>';
                row += "</tr>"
            });
            $('#tableUser').empty();
            $('#tableUser').append(row);
            if (data.length==0){
                $('#no-content').css("display","block")
            } else {
                $('#no-content').css("display", "none")

            }


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
                        var url = "/api/consignment/user/all";
                        url += "?page=" + page;
                        getAllUser(url);
                    }
                }
            });
        };
        $('#cancel').on('click', function () {

            cancel();
        });

        function cancel() {
            $('#id').val("");
            $('#username').val("");
            $('#password').val("");
            $('#password').attr("disabled", false)
            $('#email').val("");
            $('#fullName').val("");
            $('#username').attr('readonly', false);
        }

        $(document).on('click', '.edit', function () {
            $('.modal-title').text("Cập nhật tài khoản");
            $('#username').attr('readonly', true);
            $('#password').attr("disabled", true)
            var id = $(this).attr("data-id");
            $.ajax({
                type: "GET",
                url: "/api/consignment/user/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {

                    var data = response.data;
                    console.log(data)
                    $('#id').val(data.id);
                    $('#username').val(data.username);
                    $('#password').val("");
                    $('#email').val(data.email);
                    $('#fullName').val(data.fullName);
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
        $('#formEdit').on('submit', function (e) {
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
                    addUser(data);
                } else {
                    editUser(data);
                }

            }
        );
        $('#create').on('click', function () {
            $('.modal-title').text("Thêm mới tài khoản");

            cancel();
        });

        function addUser(data) {
            $.ajax({
                type: "POST",
                url: "/api/consignment/user",
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
                    getAllUser("");
                    alert(response.message);
                    $('#cancel').trigger('click');
                    $('.loader').css("display", "none");
                }, error: function (response) {

                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }

        function editUser(data) {
            $.ajax({
                type: "PUT",
                url: "/api/consignment/user",
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    getAllUser("");
                    alert(response.message);
                    $('#cancel').trigger('click');
                    $('.loader').css("display", "none");
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }

        $('#formRole').on('submit', function (e) {
            e.preventDefault();
            var formData = $('#formRole').serializeArray();
            var data = {};
            var roleCode = [];
            $.each(formData, function (i, v) {
                if (v.name == 'roleCode') {
                    roleCode.push(v.value)
                } else {
                    data[v.name] = v.value;
                }
            });
            data['roles'] = roleCode;
            $.ajax({
                type: "PUT",
                url: "/api/consignment/user/roles",
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
                    $('.cancel').trigger('click');
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        });
        $(document).on('click', '.editRole', function () {
            var id = $(this).attr("data-id");
            $('.id').val(id);
            getRoleChecck(id);
        });

        function getRoleChecck(id) {
            $.ajax({
                type: "GET",
                url: "/api/consignment/role/user/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {
                },
                success: function (response) {
                    var row = "";
                    $.each(response.data, function (i, v) {
                        row += '<div class="col-sm-12 mt-3 form-group">';
                        row += '<label class="ward input-label col-md-6 text-right">' + v.name + ':</label>';
                        row += ' <input class=" col-md-6" type="checkbox" value="' + v.code + '" name="roleCode"  ' + v.checked + '>';
                        row += '</div>'
                    })
                    $('#role').empty();
                    $('#role').append(row);
                }, error: function (response) {

                }
            });
        };
        $(document).on('click','.resetPassword',function () {
            var id = $(this).attr("data-id");
            $.ajax({
                type: "PUT",
                url: "/api/consignment/user/reset/"+id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                contentType: "application/json",
                beforeSend: function () {


                },
                success: function (response) {
                    getAllUser("");
                    alert(response.message);

                }, error: function (response) {
                    alert(response.responseJSON.message);
                }
            });
        });
        $('#formSearch').on('submit',function (e) {
            e.preventDefault();
            getAllUser("")
        })
    })
})
