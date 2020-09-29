<%@ page pageEncoding="utf-8" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<script src="/admin/template/js/info.js"></script>
<aside class="main-sidebar sidebar-light-white " style="border: 1px solid #E0E0E0">
    <!-- Brand Logo -->
    <a href="/" class="brand-link">

        <div class="text-center mt-3 mb-3 ">
            <img class="logo"
                 src="/admin/image/image%203.png">
        </div>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar user panel (optional) -->

        <!-- Sidebar Menu -->
        <nav class="mt-2 font-label">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
                with font-awesome or any other icon font library -->
                <%--        <security:authorize access="hasAnyAuthority('ROLE_MOD','ROLE_SUPER_ADMIN')">--%>

                <%--<li class="nav-item ">--%>
                    <%--<a href="/consignment/home" class="nav-link menu-item  ${dashboard} ">--%>
                        <%--<i class="nav-icon fas fa-cog text-left"></i>--%>
                        <%--<p class="">Bảng điều khiển</p>--%>
                    <%--</a>--%>

                <%--</li>--%>
                <li class="nav-item text-center pt-2" style="">
                    <a href="/consignment/personal-infomation">
                        <img class="img-circle avatar" style="width:80px;height: 80px "  src="">

                        <p  class=" menu-item ">
                           <span class="fullName3" ></span>
                            <img src="/admin/image/FrameInfo.svg" class="ml-1">
                        </p>
                    </a>


                </li>
                <sec:authorize access="hasAnyAuthority('MANAGE_INSURANCE','ROOT')">
                    <li class="nav-item    ">
                        <a href="/consignment/borrow-lockers" class="nav-link menu-item   ${borrow} ">
                            <img class="icon_e" src="/admin/image/Group.svg">
                            <p class="">
                                Quản lý bảo hiểm

                            </p>
                        </a>

                    </li>
                </sec:authorize>
                <sec:authorize access="hasAnyAuthority('MANAGE_LOG','ROOT')">
                    <li class="nav-item   ">
                        <a href="/consignment/tracking-log" class="nav-link menu-item   ${tracking} ">
                            <img class="icon_e" src="/admin/image/Group%20(2).svg">
                            <p>
                                Tracking log

                            </p>
                        </a>

                    </li>
                </sec:authorize>
                <sec:authorize access="hasAnyAuthority('MANAGE_CABINET','ROOT')">
                    <li class="nav-item   ">
                        <a href="/consignment/cabinet/list" class="nav-link menu-item   ${cabinet} ">
                            <img class="icon_e" src="/admin/image/Group2.svg" style="filter: invert(0.3)">
                            <p>
                                Tủ lưu trữ

                            </p>
                        </a>

                    </li>
                </sec:authorize>
                <sec:authorize access="hasAnyAuthority('MANAGE_LOCKERS','ROOT')">
                    <li class="nav-item   ">
                        <a href="/consignment/locker/list" class="nav-link menu-item   ${locker} ">
                            <img class="icon_e" src="/admin/image/Group%20(1).svg">
                            <p>
                                Quản lý lưu trữ
                            </p>
                        </a>

                    </li>
                </sec:authorize>
                <sec:authorize access="hasAnyAuthority('MANAGE_USER','ROOT')">
                    <li class="nav-item   ">
                        <a href="/consignment/users/list" class="nav-link menu-item   ${user} ">
                            <img class="icon_e" src="/admin/image/Vector.svg" style="filter: invert(0.3)">
                            <p>
                                Quản lý tài khoản

                            </p>
                        </a>

                    </li>
                </sec:authorize>
                <sec:authorize access="hasAnyAuthority('MANAGE_USER','ROOT')">
                    <li class="nav-item   ">
                        <a href="/consignment/job-title/list" class="nav-link menu-item   ${jobTitle} ">
                            <img class="icon_e" src="/admin/image/Frame%20%203.svg" style="filter: invert(0.3)">
                            <p>
                                Chức vụ

                            </p>
                        </a>

                    </li>
                </sec:authorize>

                <li class="nav-item   ">
                    <a href="/consignment/logout" class="nav-link menu-item    ">
                        <img class="icon_e" src="/admin/image/Group%20349.png">
                        <p>
                            Đăng xuất

                        </p>
                    </a>

                </li>
            </ul>
            </li>

        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>

<script src="/admin/template/plugins/jquery/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="/admin/template/plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
    $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->
<script src="/admin/template/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- ChartJS -->
<script src="/admin/template/plugins/chart.js/Chart.min.js"></script>
<!-- Sparkline -->
<script src="/admin/template/plugins/sparklines/sparkline.js"></script>
<!-- JQVMap -->
<script src="/admin/template/plugins/jqvmap/jquery.vmap.min.js"></script>
<script src="/admin/template/plugins/jqvmap/maps/jquery.vmap.usa.js"></script>
<!-- jQuery Knob Chart -->
<script src="/admin/template/plugins/jquery-knob/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="/admin/template/plugins/moment/moment.min.js"></script>
<script src="/admin/template/plugins/daterangepicker/daterangepicker.js"></script>
<script src="/admin/template/plugins/select2/js/select2.full.min.js"></script>

<!-- Tempusdominus Bootstrap 4 -->
<script src="/admin/template/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
<!-- Summernote -->
<script src="/admin/template/plugins/summernote/summernote-bs4.min.js"></script>
<!-- overlayScrollbars -->
<script src="/admin/template/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<!-- AdminLTE App -->
<script src="/admin/template/dist/js/adminlte.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<%--   <script src="/template/dist/js/pages/dashboard.js"></script>--%>
<!-- AdminLTE for demo purposes -->
<script src="/admin/template/dist/js/demo.js"></script>
<%--<script src="/template/hill/js/jquery-3.4.1.min.js"></script>--%>

<%-- <script src="/template/hill/js/roundtest/roundTestJs.js"></script>
 <script src="/template/hill/js/checkAll.js"></script>
 <script src=/template/hil<script src="/template/hill/js/jquery-3.4.1.min.js"></script>l/js/commom.js></script>--%>

<script src="/admin/template/hill/js/common_unit.js"></script>
