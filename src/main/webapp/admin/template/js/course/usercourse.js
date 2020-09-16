var currentPages;

jQuery(function ($) {
    $(document).ready(function () {
        function paging(totalPage, currentPage) {
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last: 'Cuối cùng',
                next: 'Tiếp theo',
                first: 'Đầu tiên',
                prev: 'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPage != page) {
                        var url = "/api/admin/course-join/course";
                        url += "?page=" + page;
                        getCourseJoin(url);
                    }
                }
            });
        }

        function findCourse() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    $('#courseName').text(response.data.name);
                    $('.loader').css("display", "none");

                }, error: function (response) {
                    $('.loader').css("display", "none");
                }
            })
        }

        function getDataSearchCourseJoin() {
            var data = {};
            var formData = $('#search').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }

        $('#search').on('submit', function (e) {
            e.preventDefault();
            console.log("check")
            getCourseJoin("");
        });

        function getCourseJoin(url) {
            var courseId = $('#courseId').val();
            if (url == null || url == "") {
                url = "/api/admin/course-join/course";
            }
            var data = getDataSearchCourseJoin();
            data['courseId'] = courseId;
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(data),
                dataType: "json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {

                    if (response.totalPage != 0) {
                        paging(response.totalPage, response.currentPage);
                    }
                    currentPages = response.currentPage;
                    var row;
                    $.each(response.data, function (i, v) {
                        var process = '';
                        var poscodeName = v.user.poscodeName;
                        var jobTitle = 'Chưa cập nhật';
                        if (v.user.jobTitle != null) {
                            jobTitle = v.user.jobTitle.name;
                        }
                        if (v.user.jobTitle != null) {
                            jobTitle = v.user.jobTitle.name;
                        }
                        if (poscodeName == "" || poscodeName == null) {
                            poscodeName = "Tổng công ty";
                        }
                        if (v.join == 0 || v.join == null) {
                            process += '<span class="badge badge-danger"><i class="fa fa-warning"></i>Chưa vào học</span>';
                        } else {
                            process += '<span class="badge badge-warning">Đã vào học</span>';
                        }
                        var finished = '';
                        if (v.finished == 0 || v.finished == null) {
                            finished += '<span class="badge badge-warning">Chưa đạt</span>';
                        } else if (v.finished == 1) {
                            finished += '<span class="badge badge-success">Đạt</span>';
                        }
                        var progress = Math.round(v.progress);
                        row += '<tr>';
                        row += '<td>' + (i + 1) + '</td>';
                        row += '<td><input type="checkbox" id="checkbox_' + v.user.id + '" value="' + v.user.id + '"></td>';
                        row += '<td>' + v.user.fullName + '</td>';
                        row += '<td>' + v.user.username + '</td>';
                        row += '<td>' + jobTitle + '</td>';
                        row += '<td>' + poscodeName + '</td>';
                        row += '<td>' + process + '</td>';
                        row += '<td><div class="progress">';
                        row += '<div class="progress-bar progress-bar-striped bg-info" title="' + progress + '%" role="progressbar" style="width: ' + v.progress + '% " aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"><span style="color: black">' + v.progress + '%</span></div>'
                        row += '</div></td>';
                        row += '<td>' + finished + '</td>';
                        row += '</tr>';
                    });
                    $('#userList').empty();
                    $('#userList').append(row);
                    $('.loader').css("display", "none");

                },
                error: function (response) {
                    console.log("fail");
                    console.log(response);
                    $('#user').append('Không tìm thấy tài khoản')
                    $('.loader').css("display", "none");
                }
            });
        };
        findCourse();
        getCourseJoin("");

        function loadRequestCourse() {
            var courseId = $('#courseId').val();
            var data = {};
            data['idCourse'] = courseId;
            $.ajax({
                type: "POST",
                url: "/api/admin/course/request/all",
                data: JSON.stringify(data),
                dataType: "json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                }, success: function (response) {
                    var row = '';

                    $.each(response.data, function (i, v) {
                        var poscodeName = '';
                        if (v.poscodeName == '') {
                            poscodeName = 'Tổng công ty';
                        }
                        row += '<tr>';
                        row += '<td><input type="checkbox" id="checkbox_' + v.id + '" value="' + v.id + '"></td>';
                        row += '<td>' + v.user.fullName + '</td>';
                        row += '<td>' + v.createdBy + '</td>';
                        row += '<td>' + poscodeName + '</td>';
                        row += '</tr>';
                    });
                    $('#tableRequest').empty();
                    $('#tableRequest').append(row);
                    if (response.data.length > 0) {
                        $('#alert-data').css("display", "block");
                    }

                    $('.loader').css("display", "none");
                }, error: function () {
                    $('#alert-data').css("display", "block");
                    $('.loader').css("display", "none");
                }
            })
        }

        $('#checkRequest').on('click', function () {
            loadRequestCourse();
        });
        $('#formSearch').on('submit', function (e) {
            e.preventDefault();
            loadUserInSystem("");
        });
        $('#btnSearch').click(function () {
            loadUserInSystem("");
        });

        function paging_user(totalPage, currentPage) {
            $('#pagination-user-system').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                initiateStartPageClick: false,
                visiblePages: 10,
                onPageClick: function (event, page) {
                    var url = "/api/admin/user/course/find";
                    url += "?page=" + page;
                    console.log(page);
                    loadUserInSystem(url);
                }
            });
        }

        $('#addUserSystem').on('click', function () {
            loadUserInSystem("");
        });

        function loadUserInSystem(url) {
            if ((url == "" || url == null)) {
                url = "/api/admin/user/course/find";
            }
            var data = getData();
            $.ajax({
                type: "POST",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-user-system').empty();
                    $('#pagination-user-system').removeData("twbs-pagination");
                    $('#pagination-user-system').unbind("page");

                },
                success: function (response) {
                    if (response.totalPage > 0) {
                        paging_user(response.totalPage, response.currentPage);
                    }
                    var row = '';
                    if(response.data.length==0){
                        row+='<span class="text-center  alert-warning">Không tìm thấy thông tin người dùng</span>'
                    }
                    $.each(response.data, function (i, v) {
                        var poscodeName = v.poscodeName;
                        var jobTitle = "Chưa cập nhật";
                        if (v.jobTitle != null) {
                            jobTitle = v.jobTitle.name;
                        }
                        if (poscodeName == '' || poscodeName == null) {
                            poscodeName = "Tổng công ty"
                        }
                        row += '<tr>';
                        row += '<td>' + v.fullName + '</td>';
                        row += '<td>' + v.username + '</td>';
                        row += '<td>' + jobTitle + '</td>';
                        row += '<td>' + poscodeName + '</td>';
                        row += '<td>' + '<a class="btn btn-xs btn-danger addUser" data-id="' + v.id + '" ><i class="fa fa-plus" aria-hidden="true" style="color: white"></i></a>' + '</td>';
                        row += '</tr>';
                    });
                    $('#tableUser').empty();
                    $('#tableUser').append(row);
                    if (response.data.length > 0) {
                        $('#alert-data').css("display", "block");
                    }
                    $('.loader').css("display", "none");
                },
                error: function (response) {
                    console.log("fail");
                    console.log(response);
                    if (response.data.length > 0) {
                        $('#alert-data').css("display", "block");
                    }
                    $('.loader').css("display", "none");
                }
            });
        }

        $(document).on('click', '.addUser', function () {
            var idCourse = $('#courseId').val();
            var data = {};
            data['courseId'] = idCourse;
            data['userId'] = $(this).attr('data-id');
            $.ajax({
                type: "POST",
                url: "/api/admin/course-join",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    console.log(response);
                    //  alert("Thêm học viên thành công");
                    alert(response.message);
                    $('.loader').css("display", "none");
                    getCourseJoin("");
                    loadUserInSystem("")
                },
                error: function (response) {
                    console.log(response);
                    alert(response.responseJSON.message);
                    $('.loader').css("display", "none");
                }
            });
        });
        $('#acceptBtn').click(function () {
            var data = {};
            data['ids'] = getIdsRequest();
            if (data['ids'].length == 0) {
                alert("Chưa có học viên nào được chọn");
                throw "Not user chosen";
            }
            $.ajax({
                type: "POST",
                url: "/api/admin/course/request/accept",
                data: JSON.stringify(data),
                dataType: "json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                }, success: function (response) {
                    loadRequestCourse();
                    getCourseJoin("");
                    $('.loader').css("display", "none");
                    alert("Duyệt học viên thành công")
                }, error: function () {
                    alert("Duyệt học viên không thành công")
                    $('.loader').css("display", "none");
                }
            })
        });
        $('#declineBtn').click(function () {
            var data = {};
            data['ids'] = getIdsRequest();
            if (data['ids'].length == 0) {
                alert("Chưa có học viên nào được chọn");
                throw "Not user chosen";
            }
            $.ajax({
                type: "PUT",
                url: "/api/admin/course/request/decline",
                data: JSON.stringify(data),
                dataType: "json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                }, success: function (response) {
                    loadRequestCourse();
                    $('.loader').css("display", "none");
                    alert('Hủy thành công')
                }, error: function () {
                    $('.loader').css("display", "none");
                }
            })
        });


        function deleteUser() {
            var ids = [];
            ids = getIds();
            if (ids.length == 0) {
                alert("Chưa người dùng nào được chọn");
            } else {
                if (confirm("Xác nhận xóa")) {
                    var data = {};
                    data['ids'] = ids;
                    data['courseId'] = $('#courseId').val();
                    $.ajax({
                        type: "DELETE",
                        url: "/api/admin/course-join",
                        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            console.log(response);
                            getCourseJoin("");
                            alert("Xóa thành công")
                        },
                        error: function (response) {
                            console.log("fail");
                            getCourseJoin("");
                            alert("Xóa không thành công");
                        }
                    });
                }
            }
        }

        $('#btnDeleteUser').on('click', function () {
            deleteUser();
        });
        $('#checkAllRequest').click(function () {
            if ($(this).is(':checked')) {

                $('#tableRequest').find('input[type=checkbox]').prop("checked", true);
            } else {
                $('#tableRequest').find('input[type=checkbox]').prop("checked", false);
            }

        });
        function getIdsRequest() {
            var ids = [];
            $('#tableRequest').find('input[type=checkbox]:checked').each(function () {
                ids.push($(this).val())
            });
            return ids;
        }

        $('#checkAll').click(function () {
            if ($(this).is(':checked')) {

                $('#userList').find('input[type=checkbox]').prop("checked", true);
                console.log($('#orderList').find('input[type=checkbox]'));
            } else {
                $('#userList').find('input[type=checkbox]').prop("checked", false);
            }

        });
        function getIds() {
            var ids = [];
            $('#userList').find('input[type=checkbox]:checked').each(function () {
                ids.push($(this).val())
            });
            return ids;
        }

        function enable(courseId) {
            var ids = [];
            ids = getIds();
            if (ids.length == 0) {
                alert("Chưa người dùng nào được chọn");
            } else {
                var data = {};
                data['ids'] = ids;
                data['courseId'] = courseId;
                $.ajax({
                    type: "PUT",
                    url: "/api/admin/course-join/enable",
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function () {

                    },
                    success: function (response) {
                        console.log(response);

                        alert("Duyệt thành công")
                        window.location.reload(true);
                    },
                    error: function (response) {
                        console.log("fail");
                        alert("Duyệt không thành công");
                    }
                });
            }

        }

        function disable(courseId) {
            var ids = [];
            ids = getIds();
            if (ids.length == 0) {
                alert("Chưa người dùng nào được chọn");
            } else {
                var data = {};
                data['ids'] = ids;
                data['courseId'] = courseId;
                $.ajax({
                    type: "PUT",
                    url: "/api/admin/course-join/disable",
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function () {

                    },
                    success: function (response) {
                        console.log(response);

                        alert("Khóa thành công")
                        window.location.reload(true);
                    },
                    error: function (response) {
                        console.log("fail");
                        alert("Khóa không thành công");
                    }
                });
            }
        }
        function getData() {
            var data = {};
            var formData = $('#formSearch').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            })
            return data;
        }
        $(document).on('click', '.close', function () {
            $('#name').val("");
        })
    });//end jQuery


});
////////////////////







function loadData(data) {

    $('#user').empty();

    $.each(data, function (i, v) {
        var row = '';
        row += '<tr role="row" id="' + v.id + '">';
        row += '<td>' + v.fullName;
        row += '</td>';
        row += '<td>';
        row += v.username;
        row += '</td>';
        row += '<td>';
        row += '<a class="btn btn-xs btn-danger" onclick="addUser(' + v.id + ')"><i class="fa fa-plus" aria-hidden="true" style="color: white"></i></a>';
        row += '</td>';
        row += '</tr>';
        $('#user').append(row);

    });
}



function openModalGroup() {

    $('#modal').modal();
    getGroup();
}

function getGroup() {
    $.ajax({
        type: "GET",
        url: "/api/admin/group-user/type/" + "student",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            console.log(response);
            loadGroup(response);
            $('.loader').css("display", "none");
        },
        error: function (response) {
            console.log("fail");
            console.log(response);
            $('#user').append('Không tìm thấy tài khoản')
            $('.loader').css("display", "none");
        }
    });
}

function loadGroup(data) {

    $('#groups').empty();

    $.each(data, function (i, v) {
        var row = '';
        row += '<tr role="row" id="' + v.id + '">';
        row += '<td>' + v.name;
        row += '</td>';
        row += '<td>';
        row += v.description;
        row += '</td>';
        row += '<td>';
        row += '<a class="btn btn-xs btn-danger" onclick="addGroup(' + v.id + ')"><i class="fa fa-plus" aria-hidden="true" style="color: white"></i></a>';
        row += '</td>';
        row += '</tr>';
        $('#groups').append(row);

    });
}

function addGroup(groupId) {
    var courseId = $('#courseId').val();
    var data = {};
    data['groupId'] = groupId;
    data['courseId'] = courseId;
    $.ajax({
        type: "POST",
        url: "/api/admin/courseJoin/group",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {

        },
        success: function (response) {

            alert("Thêm thành công " + response + " học viên")
            getGroup();
        },
        error: function (response) {

            alert("Thêm không thành công");
        }
    });
}
