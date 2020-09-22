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
    <div class="w-100 pl-2 pr-2 pt-3">
        <div class="col-md-12">
            <div class="form-edit  ">
                <div class="pt-3 pl-4 pb-3">
                    <span class=" text-uppercase form-label">Thêm mới thẻ</span>
                </div>
                <%--<div class="col-md-12">--%>
                <form class="d-flex flex-wrap " id="formBorrow">
                    <input type="hidden" name="customerId" id="customerId">
                    <div class="col-md-3 col-sm-6 d-flex flex-column">
                        <div class=" col-md-12  form-group ">
                            <label class=" text-right col-md-4 form-label ">Mã bảo hiểm:<span
                                    class="required" style="color: #e02222;">*</span></label>
                            <input class="form-control input " value="" required name="insuranceCode"
                                   id="insuranceCode">
                        </div>


                        <div class=" col-md-12  form-group ">
                            <label class=" text-right col-md-4 form-label ">CMND:<span
                                    class="required" style="color: #e02222;">*</span></label>
                            <input class="form-control input " value="" required name="numberIdentify"
                                   id="numberIdentify">
                        </div>

                    </div>

                    <div class="col-md-3 col-sm-6 d-flex flex-column">
                        <div class=" col-md-12 form-group ">
                            <label class=" text-right col-md-4 form-label ">Tủ lưu trữ:</label>
                            <select class="form-control input " value="" name="cabinetId"
                                    id="cabinetId"></select>

                        </div>
                        <div class=" col-md-12 form-group ">
                            <label class=" text-right col-md-4 form-label ">Ô cất trữ:</label>
                            <select class="form-control input lockers" value="" name="lockersId"
                                    id="lockersId"></select>

                        </div>

                    </div>
                    <div class="col-md-3 col-sm-6 d-flex flex-column">
                        <div class=" col-md-12  form-group ">
                            <label class=" text-right col-md-4 form-label ">Họ và tên:</label>
                            <input class="form-control input " value="" name="fullName" id="fullName">
                        </div>


                        <div class=" col-md-12 form-group ">
                            <label class=" text-right col-md-4 form-label ">Số điện thoại:</label>
                            <input class="form-control input " value="" name="phoneNumber" id="phoneNumber">
                        </div>
                    </div>
                    <div class=" col-md-3 col-sm-6">
                        <div class="col-md-12">
                                <textarea class="input-textarea " placeholder="ghi chú" name="note" id="note" rows="4"
                                          cols="50"></textarea>
                        </div>
                        <%--<button type="submit" class="btn  mx-auto btn-edit mt-4" style="" id="">Thêm mới</button>--%>
                    </div>

                    <div class="col-md-3 col-sm-6" style="margin-top: -10px">
                        <button type="submit" class="btn   btn-edit mt-4 " style="" id="">Thêm mới</button>
                    </div>

                </form>
                <%--</div>--%>
                <div class="col-md-12 mt-4">
                    <form id="formSearch" class="col-md-12 ">
                        <div class=" col-md-12  form-group ">
                            <div class="col-md-2">
                                <label class=" text-left col-md-12    ">Nơi lưu trữ:</label>
                                <select class="form-control col-md-12 input-search lockers" value="" name="lockersId">
                                    <option value="">Nơi lưu trữ</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label class=" text-left   col-md-12 ">Từ ngày:</label>
                                <input type="date" class="form-control col-md-12 input-search " value=""
                                       placeholder="Thời gian bắt đầu" name="startTime" id="startTime"/>
                            </div>
                            <div class="col-md-2">
                                <label class=" text-left   col-md-12 ">Đến ngày:</label>
                                <input type="date" class="form-control col-md-12 input-search " value="" id="endTime" name="endTime"/>
                            </div>

                            <div class=" col-md-2  ">
                                <label class=" text-left pt-3 col-md-12 "></label>
                                <input class="form-control  input-search" placeholder="Tìm kiếm" value=""
                                       name="textSearch">
                                <button type="submit" class="btn fa fa-search location-search-button"
                                        id="search-icon" style="top: 30px"></button>
                            </div>
                        </div>
                    </form>
                </div>


                <div class="col-md-12 mt-5">
                    <table class="table table-striped borderless" style="border: none">
                        <thead>
                        <tr role="row">
                            <th width="" class="text-left">Mã bảo hiểm</th>
                            <th class="text-left">CMND</th>
                            <th class="text-left ">Họ và tên</th>
                            <th class="text-left ">Time-in</th>
                            <th class="text-left ">Nơi cất trữ</th>
                            <th class="text-left ">Thao tác</th>
                        </tr>
                        </thead>
                        <tbody id="tableBorrow">

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

    <div class="modal " id="modalBorrow" role="dialog">
        <div class="modal-dialog modal-lg" style="border-radius: 30px">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header color-theme-bg">

                    <h4 class="modal-title">Trả bảo hiểm</h4>
                    <button type="button" class="close position-relative  btnClose" style="z-index: 15"
                            data-dismiss="modal">&times;
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row mt-3 ml-3 mr-3">
                        <div class="row col-md-12">
                            <input type="hidden" name="id" id="borrowLockersId" value="">
                            <div class=" col-md-6  form-group ">
                                <label class=" text-left col-md-12 ">Mã bảo hiểm: <span
                                        class="insuranceCode"></span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12  ">CMND: <span
                                        class="numberIdentify"></span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12  ">Họ và tên: <span
                                        class="fullName"></span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12  ">Số điện thoại: <span
                                        class="phoneNumber2"></span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12  ">Time-in: <span
                                        class="createdDate"></span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12 ">Nơi cất trữ: <span
                                        class="lockersName"></span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="  text-left col-md-12 ">Người tiếp nhận bảo hiểm: <span
                                        class="userName"></span></label>
                            </div>
                            <div class=" col-md-6  form-group ">
                                <label class="text-left col-md-3 ">Ghi chú: </label>
                                <textarea class="col-md-9 note textarea" rows="4" cols="50" disabled></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default position-relative " id="returnBorrow"
                            data-dismiss="modal">Trả thẻ bảo hiểm
                    </button>
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


<script src="/admin/template/js/borrow-lockers/list.js"></script>
<script src="/admin/template/js/common.js"></script>


