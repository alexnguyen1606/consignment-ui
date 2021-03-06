<%@ page pageEncoding="utf-8" %>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>BV Hữu Nghị</title>
<!-- Tell the browser to be responsive to screen width -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Font Awesome -->
<%--<link rel="stylesheet"  type="text/css" href="/template/hill/css/bootstrap-3.1.1-dist/css/bootstrap.min.css">
<script type="text/javascript" src="template/js/bootstrap-3.1.1-dist/js/bootstrap.min.js"></script>--%>
<script src="/admin/template/hill/js/jquery-3.4.1.min.js"></script>

<%--  <link rel="SHORTCUT ICON" href="/public/image/logo_vnpost.png" type="image/x-icon">--%>
<link rel="stylesheet" href="/admin/template/plugins/fontawesome-free/css/all.min.css">
<link rel="stylesheet" href="/admin/template/css/common.css">
<!-- Ionicons -->
<%--<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">--%>
<!-- Tempusdominus Bbootstrap 4 -->
<link rel="stylesheet" href="/admin/template/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
<!-- iCheck -->
<link rel="stylesheet" href="/admin/template/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
<!-- JQVMap -->
<link rel="stylesheet" href="/admin/template/plugins/jqvmap/jqvmap.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="/admin/template/dist/css/adminlte.min.css">
<!-- overlayScrollbars -->
<link rel="stylesheet" href="/admin/template/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
<!-- Daterange picker -->
<link rel="stylesheet" href="/admin/template/plugins/daterangepicker/daterangepicker.css">
<!-- summernote -->
<link rel="stylesheet" href="/admin/template/plugins/summernote/summernote-bs4.css">
<!-- Google Font: Source Sans Pro -->
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
<%--  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">--%>
<link rel="stylesheet" href="/admin/template/plugins/font-awesome-4.7.0/css/font-awesome.css">
<link rel="stylesheet" href="/admin/css/admin/course/course.css">
<link rel="stylesheet" href="/admin/css/admin/spin.css">
<link rel="stylesheet" href="/admin/css/admin/course/courseware.css">
<link rel="stylesheet" href="/admin/css/admin/course/chapter.css">


<link href="/admin/template/hill/css/hill.css" rel="stylesheet">
<link rel="stylesheet" href="/admin/css/admin/course/category.css">
<link rel="stylesheet" href="/admin/template/plugins/select2/css/select2.min.css">
<link rel="stylesheet" href="/admin/template/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">





<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
<%-- <script src="/template/hill/js/jquery-3.4.1.min.js"></script>--%>
<link rel="apple-touch-icon" sizes="57x57" href="/admin/image/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/admin/image/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/admin/image/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/admin/image/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/admin/image/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/admin/image/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/admin/image/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/admin/image/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/admin/image/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/admin/image/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/admin/image/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/admin/image/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/admin/image/favicon-16x16.png">
<link rel="manifest" href="/admin/image/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
<style>
    .spinner-border {
        background: white;
        color: #00A5EF;
    }
</style>

<script>

    function  onConfigTest(){
        if($('.tag_action_job_menu').hasClass('show')) {$('.tag_action_job_menu').removeClass('show');}
        else {$('.tag_action_job_menu').addClass('show');}
    }

    function  onTagAction() {
        if($('#list_option_action_cadicate').hasClass('show')) {$('#list_option_action_cadicate').removeClass('show');}
        else {$('#list_option_action_cadicate').addClass('show');}
    }

    function downloadAction() {
        if($('#dropdownDownload').hasClass('show')) {$('#dropdownDownload').removeClass('show');}
        else {$('#dropdownDownload').addClass('show');}
    }

</script>