jQuery(function ($) {
    $(document).ready(function () {
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
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    $('#courseName').val(response.data.name);

                }
            })
        }
        $('#btnAdd').click(function () {
            var data = {};
            var formData = $('#formEdit').serializeArray();
            $.each(formData,function (i,v) {
                data[v.name] = v.value;
            });
            $.ajax({
                type: "POST",
                url: "/api/admin/user/student-user/import",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    response = response.data;
                    $('.loader').css("display", "block");
                    if(response.totalSuccess!=0){
                        alert("Thêm thành công "+response.totalSuccess+" học viên vào khóa học")
                    }
                    window.location.href = "/admin/course/detail/"+data.courseId;
                },
                error: function (response) {

                    $('.loader').css("display", "none");
                    alert("Thêm không thành công")
                }
            });

        });
        findCourse();
    })
})
$('#thumb-input').on('change',function () {
    var formData = new FormData();
    formData.append('multipartFile',$('#thumb-input')[0].files[0]);
    $.ajax({
        url : '/api/admin/upload/excel',
        type : 'POST',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        enctype: 'multipart/form-data',
        data : formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        success : function(result) {
            // console.log(result);
            console.log(result);
            $('#src').val(result);

        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log( 'The following error occured: ' + textStatus, errorThrown );
        }
    });
});
