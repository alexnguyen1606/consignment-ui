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
    <div class=" w-100 mt-3 pl-2 pr-2">
        <div class="col-md-12 ">
            <div class="  ">
                <form id="formSearch" class=" col-md-12 ">
                    <div class=" col-md-12  form-group ">
                        <%--<label class=" text-right pt-1 form-label col-md-1 ">Nơi lưu trữ:</label>--%>
                        <div class="col-md-8 font-label ">
                            <button type="button" id="create" class="btn color-theme-bg" data-toggle="modal"
                                    data-target="#modalEdit" style="width: 250px;height: 46px;color: #ffffff "><i
                                    class="fa fa-plus-circle mr-1"></i>Thêm mới tủ lưu trữ
                            </button>
                        </div>
                        <%--<div class="col-md-2">--%>
                            <%--<select class="form-control  input-search lockers" value="" name="isActive">--%>
                                <%--<option value="">Trạng thái</option>--%>
                                <%--<option value="false">Khóa</option>--%>
                                <%--<option value="true">Mở</option>--%>
                            <%--</select>--%>
                        <%--</div>--%>
                        <%--<div class=" col-md-2  ">--%>
                            <%--<input class="form-control  input-search" placeholder="Tìm kiếm" value=""--%>
                                   <%--name="textSearch">--%>
                            <%--<button type="submit" class="btn fa fa-search location-search-button"--%>
                                    <%--id="search-icon"></button>--%>
                        <%--</div>--%>
                    </div>
                </form>


                <div class="col-md-12 mt-5 " >
                    <table class="table table-striped borderless" style="border: none">
                        <thead>
                        <tr role="row" class="font-label ">
                            <th class="text-left ">Tên tủ</th>
                            <th class="text-left ">Mã tủ</th>
                            <th class="text-center">Trạng thái</th>
                            <th class="text-left">Thao tác</th>
                        </tr>
                        </thead>
                        <tbody id="tableCabinet">

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
        <div class="modal-dialog modal-m" style="border-radius: 30px">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header color-theme-bg font-label ">

                    <h4 class="modal-title">Thêm mói tủ lưu trữ</h4>
                    <button type="button" class="close position-relative  btnClose" style="z-index: 15"
                            data-dismiss="modal">&times;
                    </button>
                </div>
                <div class="modal-body" style="min-height: 400px">
                    <div class="row mt-3 ml-3 mr-3">
                        <div class="row col-md-12">
                            <div class="panel-right col-md-12 font-label ">

                                <form id="formEdit">
                                    <input type="hidden" name="id" id="id">
                                    <div class="col-sm-12 mt-3 form-group">
                                        <label class="ward input-label col-md-6 text-right">Tên tủ lưu trữ:</label>
                                        <input class="form-control col-md-6" type="" required name="nameCabinet"
                                               id="nameCabinet">
                                    </div>
                                    <div class="col-sm-12 mt-3 form-group">
                                        <label class="ward input-label col-md-6 text-right">Mã tủ:</label>
                                        <input class="form-control col-md-6" type="" required name="cabinetCode"
                                               id="cabinetCode">
                                    </div>
                                    <div class="col-sm-12 mt-3 form-group">
                                        <label class="ward input-label col-md-6 text-right">Trạng thái:</label>
                                        <select class="form-control col-md-6" name="status" id="status">
                                            <option value="1" selected>Hoạt động</option>
                                            <option value="0">Khóa</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-12 mt-3 form-group">
                                        <label class="ward input-label col-md-6 text-right">Mô tả:</label>
                                        <textarea class="form-control col-md-6" name="description" id="description"></textarea>
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

<script src="/admin/template/js/lockers/cabinet.js"></script>



