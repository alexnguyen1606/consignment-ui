<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<link rel="stylesheet" href="/admin/template/css/borrow-lockers.css">
<%@ page pageEncoding="utf-8" %>
<div class="content-wrapper" style="background: white">

    <!-- /.content-header -->

    <!-- Main content -->
    <div class="w-100 pr-2 pl-2 ">
        <div class="col-md-12">
            <div class="">

                <div class="col-md-12 mt-3 ro">

                    <form id="formSearch" class=" col-md-12 ">
                        <div class=" col-md-12  form-group ">
                            <%--<label class=" text-right pt-1 form-label col-md-1 ">Nơi lưu trữ:</label>--%>
                            <div class="col-md-8">
                                <button type="button" id="create" class="btn color-theme-bg" data-toggle="modal"
                                        data-target="#modalEdit" style="width: 250px;height: 46px;color: #ffffff "><i
                                        class="fa fa-plus-circle mr-1"></i>Thêm mới tài khoản
                                </button>
                            </div>

                            <div class=" col-md-2  ">
                                <input class="form-control  input-search" placeholder="Tìm kiếm" value=""
                                       name="textSearch">
                                <button type="submit" class="btn fa fa-search location-search-button"
                                        id="search-icon"></button>
                            </div>
                        </div>
                    </form>

                </div>


                <div class="col-md-12 mt-5" >
                    <table class="table table-striped borderless" style="border: none">
                        <thead>
                        <tr role="row">
                            <th class="text-left ">Họ và tên</th>
                            <th class="text-left">Username</th>
                            <th class="text-left">Email</th>
                            <th class="text-center">Trạng thái</th>
                            <th class="text-center ">Thao tác</th>
                        </tr>
                        </thead>
                        <tbody id="tableUser">
                        </tbody>
                    </table>
                    <div class="col-sm-12 col-xs-12 mr-auto ml-auto">
                        <ul id="pagination-test" class="pagination "></ul>
                    </div>
                    <div class="form-edit text-center w-100 pt-5 " id="no-content" style="display: none"><h3>Không tìm thấy thông tin</h3></div>
                </div>

            </div>
        </div>
    </div>

    <div class="modal " id="modalEdit" role="dialog">
        <div class="modal-dialog modal-m" style="border-radius: 30px;border: none">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header color-theme-bg">

                    <h4 class="modal-title">Cập nhật tài khoản</h4>
                    <button type="button" class="close position-relative  btnClose" style="z-index: 15"
                            data-dismiss="modal">&times;
                    </button>
                </div>
                <div class="modal-body" style="min-height: 400px">
                    <div class="row mt-3 ml-3 mr-3">
                        <div class="row col-md-12">
                            <div class="panel-right col-md-12">

                                <form id="formEdit">
                                    <input type="hidden" name="id" id="id">
                                    <div class="col-sm-12 mt-3 form-group">
                                        <label class="ward input-label col-md-6 text-right">Họ và tên:</label>
                                        <input class="form-control col-md-6" type="" required name="fullName"
                                               id="fullName">
                                    </div>
                                    <div class="col-sm-12 mt-3 form-group">
                                        <label class="ward input-label col-md-6 text-right">Tên đăng nhập:</label>
                                        <input class="form-control col-md-6 " pattern="^[a-zA-Z0-9_]*$" required name="username" id="username">
                                    </div>
                                    <div class="col-sm-12 mt-3 form-group">
                                        <label class="ward input-label col-md-6 text-right">Email:</label>
                                        <input class="form-control col-md-6" type="email" required name="email"
                                               id="email">
                                    </div>
                                    <div class="col-sm-12 mt-3 form-group pass">
                                        <label class="ward input-label col-md-6 text-right">Mật khẩu:</label>
                                        <input class="form-control col-md-6" type="password" name="password"
                                               id="password">
                                    </div>
                                    <div class="col-sm-12 mt-3 form-group">
                                        <label class="ward input-label col-md-6 text-right">Trạng thái:</label>
                                        <select class="form-control col-md-6" name="isActive" id="isActive">
                                            <option value="1" selected>Hoạt động</option>
                                            <option value="0">Khóa</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-12 mt-3 form-group text-center" style="height: 46px">
                                        <div class="col-md-6 text-right">
                                            <button type="submit" class=" btn"
                                                    style=" background: #00D380; color: #ffffff;width: 130px">Lưu
                                            </button>
                                        </div>
                                        <div class="col-md-6 text-right">
                                            <button type="button" data-dismiss="modal" class=" btn" id="cancel"
                                                    style="border:1px solid black;width: 130px">Hủy
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>


                        </div>
                    </div>
                </div>
                <%--<div class="modal-footer">--%>

                <%--<button type="button" class="btn btn-default position-relative btnClose" style="z-index: 15"--%>
                <%--data-dismiss="modal">Đóng--%>
                <%--</button>--%>
                <%--</div>--%>


            </div>

        </div>

    </div>
    <div class="modal " id="modalRole" role="dialog">
        <div class="modal-dialog modal-m" style="border-radius: 30px;border: none">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header color-theme-bg">

                    <h4 class="modal-title">Cập nhật tài khoản</h4>
                    <button type="button" class="close position-relative  btnClose" style="z-index: 15"
                            data-dismiss="modal">&times;
                    </button>
                </div>
                <div class="modal-body" style="min-height: 400px">
                    <div class="row mt-3 ml-3 mr-3">
                        <div class="row col-md-12">
                            <div class="panel-right col-md-12">

                                <form id="formRole">
                                    <input type="hidden" name="id" class="id">
                                    <div id="role">
                                        <div class="col-sm-12 mt-3 form-group">
                                            <label class="ward input-label col-md-6 text-right">Quản lý tài khoản:</label>
                                            <input class=" col-md-6" type="checkbox" value="MANAGE_USER" name="roleCode">
                                        </div>
                                        <div class="col-sm-12 mt-3 form-group">
                                            <label class="ward input-label col-md-6 text-right">Quản lý lịch sử giao
                                                dịch:</label>
                                            <input class=" col-md-6" type="checkbox" value="MANAGE_LOG" name="roleCode">
                                        </div>
                                        <div class="col-sm-12 mt-3 form-group">
                                            <label class="ward input-label col-md-6 text-right">Quản lý bảo
                                                hiểm:</label>
                                            <input class=" col-md-6" type="checkbox" value="MANAGE_INSURANCE"
                                                   name="roleCode">
                                        </div>
                                        <div class="col-sm-12 mt-3 form-group">
                                            <label class="ward input-label col-md-6 text-right">Quản lý lưu trữ:</label>
                                            <input type="checkbox" class="  col-md-6" value="MANAGE_LOCKERS"
                                                   name="roleCode" id="">
                                        </div>
                                        <div class="col-sm-12 mt-3 form-group">
                                            <label class="ward input-label col-md-6 text-right">Quyền gốc:</label>
                                            <input class=" col-md-6" type="checkbox" value="ROOT" name="roleCode">
                                        </div>

                                    </div>


                                    <div class="col-sm-12 mt-3 form-group text-center" style="height: 46px">
                                        <div class="col-md-6 text-right">
                                            <button type="submit" class=" btn"
                                                    style=" background: #00D380; color: #ffffff;width: 130px">Lưu
                                            </button>
                                        </div>
                                        <div class="col-md-6 text-right">
                                            <button type="button" data-dismiss="modal" class=" btn cancel"
                                                    style="border:1px solid black;width: 130px">Hủy
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>


                        </div>
                    </div>
                </div>
                <%--<div class="modal-footer">--%>

                <%--<button type="button" class="btn btn-default position-relative btnClose" style="z-index: 15"--%>
                <%--data-dismiss="modal">Đóng--%>
                <%--</button>--%>
                <%--</div>--%>


            </div>

        </div>

    </div>
    <div class="position-absolute loader " style="">
        <div class="spinner-border position-absolute" style="width: 3rem; height: 3rem;top: 50%;left: 50%;"
             role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <!-- /.content -->
</div>
<script src="<c:url value='/admin/template/paging/jquery.twbsPagination.js'/>"></script>
<script src="/admin/template/paging/jquery.twbsPagination.min.js"></script>

<%--<script src="/admin/template/js/common.js"></script>--%>

<script src="/admin/template/js/user/list.js"></script>



