$(document).ready(function () {
    $('#login').on('click',function() {
        login();
        // $('#formLogin').trigger('submit');

    });
    $('#formLogin').on('submit',function (e) {
        // e.preventDefault()
        // console.log("check")
        // login();
    });

    function login() {
        var formData = $('#formLogin').serializeArray();
        var data = {};
        $.each(formData,function(i,v) {
            data[v.name] = v.value;
        })
        console.log(formData);
        $.ajax({
            url: '/api/consignment/authentication',
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            beforeSend: function() {
                $('.spin').removeClass('display-none');
            },
            success: function (res) {

                localStorage.setItem("consignment_token", res.token);
                $('.spin').removeClass('display-none');
                $('#formLogin').submit();
            },
            error:function (res) {
                if (res.status == 406) {
                    alert("Tài khoản của bạn không có quyền truy cập");
                }
                else {
                    alert("Sai mật khẩu hoặc tên tài khoản")
                }
                // console.log(res);
                $('.spin').addClass('display-none');
            }

        });

    }
    function loginForm(data) {
        $.ajax({
            url: '/form/api/login',
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            beforeSend:function() {
                $('.loader').removeClass("display-none");
            },
            success: function (res) {
                //localStorage.setItem("eln_token", res.data.token);
                //console.log(res.token);
                // alert(res.token);
                // $('#formLogin2').submit();
            },
            error:function (res) {
                // Swal.fire({
                //     position: 'inherit',
                //     icon: 'error',
                //     title: "Sai mật khẩu hoặc tên tài khoản",
                //     showConfirmButton: true
                //
                // });
                // $('.loader').addClass("display-none");

                console.log(res);
            }

        });
    }
})