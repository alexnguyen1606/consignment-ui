<%@ page pageEncoding="utf-8"%>
<div class="content-wrapper" style="background: white;">


    <!-- Main content -->
    <section class="content" style="background: white !important;">

        <div class="container text-center">

            <div class="row d-flex flex-column text-center mt-5">
                <div class="col-md-12 ">
                    <h2 style="">Thông tin cá nhân</h2>
                </div>
               <div class="col-md-12 mt-3 ">
                   <img class="avatar img-circle text-center" style="height: 80px;" src="">
               </div>

                <div class=" col-md-12 mt-3">
                    <div class="col-md-12 ">
                        <label class="custom-file-upload">
                            <input type="file" id="avatarUpload" />
                            <i class="fa fa-upload primary" ></i> Đổi ảnh đại diện
                        </label>
                        <a href="/consignment/personal-infomation/change-password" class="" style=""><img src="/admin/image/Group%20(1).png" > Đổi mật khẩu</a>
                    </div>
                    <form id="formEdit" class="col-md-12">
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-4 text-right">Họ và tên:</label>
                            <input class="form-control col-md-4 fullName" type="" required name="fullName"
                                   id="fullName">
                        </div>
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-4 text-right">Email:</label>
                            <input class="form-control col-md-4 email" type="email" required name="email"
                                   id="email">
                        </div>
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-4 text-right">Số điện thoại:</label>
                            <input class="form-control col-md-4 phoneNumber"  required name="phoneNumber"
                                   id="phoneNumber">
                        </div>

                        <div class="col-sm-12 mt-3 form-group text-center" style="height: 46px;margin-left: 70px">
                            <div class="col-md-6 text-right">
                                <button type="submit" class=" btn"
                                        style=" background: #00D380; color: #ffffff;width: 200px">Cập nhật thông tin
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