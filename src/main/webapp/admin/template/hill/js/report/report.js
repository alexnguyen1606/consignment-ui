function showReportExam(id_competion) {
    $.ajax({
        url: '/api/admin/report/' + id_competion + '/detail',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            if (res.listUnitVnpostDTOs != null) {
            }
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}

$('#class_see_report_online').on('click', function (e) {
    e.preventDefault();
    if ($("#select_question_source").select2('val') != "0") {
        $.ajax({
            type: "POST",
            url: "/api/admin/report/competition/list/" + $("#select_question_source").select2('val'),
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            dataType: "json",
            success: function (res) {
                var row = ''
                $(res.candidateDTOList).each(function (index, items) {
                    var date = new Date(items.user.birthday);
                    var date_start = new Date(items.timestart);
                    var date_end = new Date(items.timeend);
                    var custom_date = moment(date).format('DD-MM-YYYY');
                    var custom_start = moment(date_start).format('DD-MM-YYYY HH:mm:ss');
                    var custom_end = moment(date_end).format('DD-MM-YYYY HH:mm:ss');
                    row += '<tr>'
                    row += '<td>'
                    row += (parseInt(index) + 1)
                    row += '</td>'
                    row += '<td>' + items.user.fullName + '</td>'
                    row += '<td>' + items.user.username + '</td>'
                    row += '<td>' + items.user.email + '</td>'
                    row += '<td>' + custom_date + '</td>'
                    if(items.user.poscodeVnpost!=null){
                        row += '<td>' + items.user.poscodeVnpost.name + '</td>'
                    }else{
                        row += '<td>Tổng công ty</td>'
                    }

                    row += '<td>' + items.nameParentPoscode + '</td>'
                    row += '<td>' + items.point + '</td>'
                    row += '<td>' + custom_start + '</td>'
                    row += '<td>' + custom_end + '</td>'
                    if (items.counttest == 0) {
                        row += '<td>chưa làm bài</td>'
                    } else {
                        row += '<td>' + items.counttest + '</td>'
                    }
                    if (items.status == 0) {
                        row += '<td>Đạt</td>'
                    } else {
                        row += '<td>Chưa đạt</td>'
                    }
                    row += '</tr>';
                });
                if (res.timestart != null) {
                    var date_from = new Date(res.timestart);
                    var custom_date_from = moment(date_from).format('DD-MM-YYYY');
                    var date_to = new Date(res.timeend);
                    var custom_date_to = moment(date_to).format('DD-MM-YYYY');
                    $('#date_form_to').text('Từ ngày: ' + custom_date_from + '  Đến ngày: ' + custom_date_to + '');
                } else {
                    $('#date_form_to').text('Không giới hạn thời gian');
                }
                $('#unit_exam').text("ĐƠN VỊ :" + res.name_unit);
                $('#competion_name').text("Cuộc thi: " + res.name_competition);
                $('#data_list_report_exam').html(row);
                $('.form_see_report').css('display', 'block');
                $('#download_report').attr("id_competion", res.idCompetition);
            }, error: function (response) {
                console.log("fail");
                console.log(response);
            }
        });
    } else {
        $('#select_competition_form').css('border', '1px solid red');
    }
});


$('#download_report').on('click', function (e) {
    var id = $('#download_report').attr("id_competion");
    if (id != '') {
        $.ajax({
            type: "POST",
            url: "/api/admin/report/exam/download/" + id,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            dataType: "json",
            success: function (res) {
                if (res == 0) {
                    alert("Tải thất bại")
                } else {
                    var name = res.responseText.replace(".", "vnpost");
                    window.location.assign('/admin/test/export/download/' + name);
                    //window.location.href= "/admin/media/"+res.responseText;
                    alert("Tải thành công");
                }
            },
            error: function (res) {
                if (res != 0) {
                    var name = res.responseText.replace(".", "vnpost");
                    window.location.assign('/admin/test/export/download/' + name);
                    //window.location.href= "/admin/media/"+res.responseText;
                    alert("Tải thành công");
                } else {
                    alert("Tải thất bại ");
                }
            }
        });
    } else {
        alert("Bạn hãy xem báo cáo trước");
    }
});

