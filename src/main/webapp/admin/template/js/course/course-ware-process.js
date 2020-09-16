jQuery(function ($) {
    $(document).ready(function () {
        function findCourse() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                },
                success: function (response) {
                    console.log(response);
                    $('.courseName').text(response.data.name);

                },error:function (response) {
                    console.log(response);
                }
            })
        };
        function findCourseWare() {
            var courseWareId = $('#courseWareId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/courseWare/" + courseWareId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function ()  {

                },
                success: function (response) {
                    console.log('/ '+response.name);
                    $('.courseWareName').text('/ '+response.name);

                },error:function (response) {
                    console.log(response);
                }
            })
        };
        function findCoureWareProcess() {
            var courseWareId = $('#courseWareId').val();
            var courseId = $('#courseId').val();
            var chapterId = $('#chapterId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course-ware/process/" + courseId+"/"+courseWareId+'/'+chapterId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function ()  {

                },
                success: function (response) {
                    var row='';
                   $.each(response,function (i,v) {
                       var status = '';
                       if (v.status==0 || v.status==null){
                           status='<span class="badge badge-danger"><i class="fa fa-warning"></i>Chưa học</span>';
                       } else if (v.status==1){
                            status='<span class="badge badge-warning">Hoàn thành</span>';
                       }
                       row+='<tr>';
                       row+='<td>'+(i+1)+'</td>';
                       row+='<td>'+v.user.fullName+'<p>'+v.user.username+'</p></td>';
                       row+='<td>'+status+'</td>';
                       row+='<td>Số lần xem:'+v.totalView+'</td>';
                       row+='<td>Lần truy cập cuối:'+v.modifiedDate+'</td>';
                       row+='<tr>';

                   });
                    $('#courseWareProcess').empty();
                   $('#courseWareProcess').append(row);
                    $('.loader').css("display", "none");

                },error:function (response) {
                    console.log(response);
                }
            });
        }
        findCoureWareProcess();
        findCourseWare();
        findCourse();
    })
})