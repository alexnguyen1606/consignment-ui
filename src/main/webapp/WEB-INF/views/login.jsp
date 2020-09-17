<%--
  Created by IntelliJ IDEA.
  User: HELLO
  Date: 15/04/2020
  Time: 9:38 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@include file="/WEB-INF/layouts/admin/layout/head.jsp" %>

<script src="/admin/template/hill/js/jquery-3.4.1.min.js"></script>
<link rel="stylesheet" href="/admin/template/css/login.css">
<script src="/admin/template/js/login.js"></script>
<style>
    .my-card {
        -webkit-box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.5);
        -moz-box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.5);
        box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.5);
    }


</style>
<html>
<head>
    <title>login</title>
</head>
<body>
<div class="w-100 d-flex justify-content-center align-items-center logo-bg" style="height: 100vh;padding: 100px 150px;">
    <div class="col-sm-4 text-center form-login float-right py-4 px-5  position-relative">
        <div class="text-center mt-5 ">
            <img class="logo-login" src="/admin/image/image%203.png">
        </div>
        <form action="/j_spring_security_consignment" id="formLogin" method="post" >

            <div class="form-group">
                <input type="text" class="form-control mt-4 ml-4 mr-4 form-input" id="userName" name="username" placeholder="Tên đăng nhập">
            </div>
            <div class="form-group">
                <input type="password" class="form-control form-input mt-2 ml-4 mr-4" pattern="[a-zA-Z0-9]+" title="Chỉ bao gồm chữ và số" id="password" name="password" placeholder="Mật khẩu">
            </div>
        </form>
        <button type="button" class="btn  mx-auto btn-login mt-4" style="" id="login">Đăng nhập</button>
        <div class="position-absolute position-cover spin display-none">
            <div class="position-absolute position-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
<script src="/admin/template/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/admin/template/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>

</html>
