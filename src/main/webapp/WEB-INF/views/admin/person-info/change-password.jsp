<%@ page pageEncoding="utf-8"%>
<div class="content-wrapper" style="background: white;">


    <!-- Main content -->
    <section class="content" style="background: white !important;">
        <h2 style=";margin-left: 400px;padding: 50px 150px;">Thông tin cá nhân</h2>
        <div class="container">
            <div class="row text-center">
                <img class="avatar img-circle text-center" style="height: 80px;margin-left: 460px" src="">

                <div class=" col-md-12 mt-3">
                    <div class="w-100 ">
                        <a href="/consignment/personal-infomation" class="" style="margin-right: 130px"><i class="fa fa-info-circle"></i> Thông tin </a>
                    </div>
                    <form id="formEdit">
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-4 text-right">Mật khẩu cũ:</label>
                            <input class="form-control col-md-4 fullName" type="password" required name="password"
                                   id="password">
                        </div>
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-4 text-right">Mật khẩu mới:</label>
                            <input class="form-control col-md-4 email" type="password" required name="passwordChange"
                                   id="passwordChange">
                        </div>
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-4 text-right">Nhập lại mật khẩu mới:</label>
                            <input class="form-control col-md-4 email" type="password" required name="passwordRepeated"
                                   id="passwordRepeated">
                        </div>


                        <div class="col-sm-12 mt-3 form-group text-center" style="height: 46px;margin-left: 70px">
                            <div class="col-md-6 text-right">
                                <button type="submit" class=" btn"
                                        style=" background: #00D380; color: #ffffff;width: 200px">Đổi mật khẩu
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </section>
    <!-- /.content -->
</div>
<script src="/admin/template/js/user/info.js"></script>