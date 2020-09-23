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
    <div class="w-100 pl-2 pr-2">
        <div class="col-md-12">
            <div class=" ">

                <div class="col-md-12 mt-3">
                    <form id="formSearch" class=" col-md-12 ">
                        <div class=" col-md-12  form-group ">
                            <div class="col-md-2">
                                <label class=" text-left pt-1 form-label col-md-12 ">Nơi lưu trữ:</label>
                                <select class="form-control col-md-12 input-search lockers" value="" name="lockerId">
                                    <option value="">Nơi lưu trữ</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label class=" text-left pt-1 form-label col-md-12 ">Trạng thái:</label>
                                <select class="form-control col-md-12 input-search " value="" name="type">
                                    <option value="">Loại</option>
                                    <option value="CHECK_OUT">Trả bảo hiểm</option>
                                    <option value="CHECK_IN">Nhận bảo hiểm</option>
                                </select>
                            </div>
                           <div class="col-md-2">
                               <label class=" text-left pt-1 form-label col-md-12 ">Từ ngày:</label>
                               <input type="date" class="form-control col-md-12 input-search " value="" placeholder="Thời gian bắt đầu" name="startTime" id="startTime"/>
                           </div>
                            <div class="col-md-2">
                                <label class=" text-left pt-1 form-label col-md-12 ">Đến ngày:</label>
                                <input type="date" class="form-control col-md-12 input-search " value="" name="endTime" id="endTime"/>
                            </div>

                            <div class=" col-md-2  ">
                                <label class=" text-left pt-1 form-label col-md-12 ">Trạng thái:</label>
                                <input class="form-control  input-search" placeholder="Tìm kiếm" value=""
                                       name="textSearch">
                                <button type="submit" class="btn fa fa-search location-search-button"
                                        id="search-icon" style="top:30px"></button>
                            </div>
                        </div>
                    </form>
                </div>


                <div class="col-md-12 mt-5">
                    <table class="table table-striped borderless" style="border: none">
                        <thead>
                        <tr role="row" class="font-label ">
                            <th class="text-left">Mã bảo hiểm</th>
                            <th class="text-left">CMND</th>
                            <th class="text-left">Họ và tên</th>
                            <th class="text-left ">Trạng thái</th>
                            <th class="text-left ">Thời gian thao tác</th>
                            <th class="text-left ">Nơi cất trữ</th>
                            <th class="text-left ">Thao tác</th>
                        </tr>
                        </thead>
                        <tbody id="tableLogging">

                        </tbody>
                    </table>
                    <div class="col-sm-12 col-xs-12 mr-auto ml-auto">
                        <ul id="pagination-test" class="pagination "></ul>
                    </div>
                    <div class="form-edit text-center w-100 pt-5 " id="no-content" style="display: none"><h3>Không tìm
                        thấy thông tin</h3></div>
                </div>

            </div>
        </div>
    </div>

    <div class="modal " id="modalLogging" role="dialog">
        <div class="modal-dialog modal-lg" style="border-radius: 30px">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header color-theme-bg">

                    <h4 class="modal-title">Chi tiết thao tác</h4>
                    <button type="button" class="close position-relative  btnClose" style="z-index: 15"
                            data-dismiss="modal">&times;
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row mt-3 ml-3 mr-3">
                        <div class="row col-md-12 font-label ">
                            <div class=" col-md-6  form-group ">
                                <label class=" text-left col-md-12 ">Mã bảo hiểm: <span
                                        class="insuranceCode">145732267</span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12  ">CMND: <span
                                        class="numberIdentify">145732267</span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12  ">Họ và tên: <span
                                        class="fullName">Nguyễn Anh Tuấn</span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12  ">Thời gian thao tác: <span
                                        class="createdDate"></span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12 ">Nơi cất trữ: <span
                                        class="lockersName"></span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12 ">Người thao tác: <span
                                        class="userName">Bùi Bình An</span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12 ">Tài khoản thao tác: <span class="username"></span></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-default position-relative btnClose" style="z-index: 15"
                            data-dismiss="modal">Đóng
                    </button>
                </div>


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

<script src="/admin/template/js/common.js"></script>

<script src="/admin/template/js/tracking/list.js"></script>



