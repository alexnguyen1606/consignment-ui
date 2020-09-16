
jQuery(function ($) {
    $(document).ready(function () {
        $('#status').change(function () {
            getCourse("");
        });
        $('#categoryId').change(function () {
            getCourse("");
        });
        $('#search').on('submit',function (e) {
            e.preventDefault();
            getCourse("");
        });
        function getCourse(url) {
            var token = localStorage.getItem('token');
            var data=getDataSearch();
            if (url==""||url==null){
                url='/api/admin/course/corp';
            }
            $.ajax({
                type: "POST",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data : JSON.stringify(data),
                dataType:"json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    loadCourse(response.data);
                    if (response.totalPage>0){
                        paging(response.totalPage,response.currentPage);
                    }
                    $('.loader').css("display", "none");
                }, error: function (res) {
                    console.log("fail");
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            })
        }
        function paging(totalPage,currentPages){
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPages,
                visiblePages: 10,
                last:'Cuối cùng',
                next:'Tiếp theo',
                first:'Đầu tiên',
                prev:'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPages != page) {
                        var url = "/api/admin/course/corp";
                        url+="?page="+page;
                        getCourse(url);
                    }
                }
            });
        }
        function loadCourse(data) {
            var row= '';
            $.each(data,function (i,v) {
                var status = '';
                if (v.status ==0){
                    status='<i class="text-warning fa fa-circle icon"></i>';
                } else {
                    status='<i class="text-success fa fa-circle icon"></i>';
                }
                var starts = v.courseConfig.starts;
                var ends = v.courseConfig.ends;
                if(starts==null){
                    starts = "00:00"
                }
                if(ends==null){
                    ends = "24:00"
                }
                row+='<tr>';
                row+='<td>'+(i+1)+'</td>';
                row+='<td class="text-left">'+status;
                row+='<a href="/admin/course/corp/detail/'+v.id+'?statistic=active"><b>'+v.name+'</b></a>';
                // row+='<p><i class="fa fa-building-o icon"></i><small>'+v.poscodeName+'</small></p>';
                row+='</td>';
                row+='<td class="text-center">'+v.categoryName+'</td>';
                row+='<td class="text-info text-center">';
                row+='<p><i class="fa fa-calendar icon"></i><span>'+v.courseConfig.startLearning+' - '+v.courseConfig.endLearning+'</span></p>'
                row+='<p><i class="fa fa-clock-o icon"></i><span>'+starts+' - '+ends+'</span></p>';
                row+='</td>';
                row+='<td class="info-text">';
                row+='<p><i class="fa fa-folder-o "></i>Số chương mục :'+v.outline.chapters.length+'</p>';
                row+='</td>';
                row+='<td class="info-text">';
                row+='Ngày tạo: '+v.createdDate;
                row+='<br>Người tạo :'+v.createdBy;
                row+='</td>';
                row+='</tr>';
            });
            $('#tableCourse').empty();
            $('#tableCourse').append(row);
        }
        function getDataSearch(){
            var data = {};
            var formSearch = $('#search').serializeArray();
            $.each(formSearch,function (i,v) {
                data[v.name]=v.value;
            });
            return data;
        }
        function getCourseCategory(){
            $.ajax({
                type:"GET",
                url:"/api/admin/course-category/all",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                },
                success: function (response) {
                    var row = '';
                    $.each(response,function (i,v) {
                        row+='<option value="'+v.id+'">'+v.name+'</option>'
                    })
                    $('#categoryId').append(row);
                }, error: function (res) {

                }
            })
        }
        getCourse("");
        getCourseCategory();
        $('#btnSearch').click(function () {
            getCourse("")
        })
    });

});