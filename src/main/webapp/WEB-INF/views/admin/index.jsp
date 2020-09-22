<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<link rel="stylesheet" href="/admin/template/css/borrow-lockers.css">
<%@ page pageEncoding="utf-8" %>
<script src="/admin/template/js/home.js"></script>
<div class="content-wrapper" style="background: white">

    <!-- /.content-header -->

    <!-- Main content -->
    <div class="w-100 pl-2 pr-2 pt-3">
        <div class="col-md-12">
            <div class="form-edit d-flex justify-content-center" style="min-height: 800px;justify-content: space-between;color: white">

                <div class="col-md-4 mt-5 pl-3 pt-3"
                     style="width: 350px;height:160px;background: #0C2556;border-radius: 10px;">
                    <span style="color: white;font-size: 16px;line-height: 24px">Số bảo hiểm đang gửi:</span>
                    <span id="totalInsurrance"></span>

                </div>
                <%--<div class="col-md-4 mt-5 ml-5 pt-3"--%>
                     <%--style="width: 350px;height:160px;background: #00D380;border-radius: 10px;">--%>
                    <%--<span style="color: white;font-size: 16px;line-height: 24px">Số nhân viên đang online:</span>--%>

                    <%--<span>1000</span>--%>
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
<script src="/admin/template/js/index.js"></script>


