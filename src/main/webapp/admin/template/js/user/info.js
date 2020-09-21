jQuery(function ($) {
    $(document).ready(function () {
        $('#formEdit').on('submit', function (e) {
            e.preventDefault();
            var formData = $('#formEdit').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            editUser(data);
        });

        function editUser(data) {
            $.ajax({
                type: "PUT",
                url: "/api/consignment/user/info",
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {

                    alert(response.message);
                    $('.loader').css("display", "none");
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }

        $('#avatarUpload').on('change', function () {
            var formData = new FormData();
            formData.append('multipartFile', $('#avatarUpload')[0].files[0]);

            $.ajax({
                url: '/api/consignment/upload/images',
                type: 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                enctype: 'multipart/form-data',
                data: formData,
                processData: false,  // Important!
                contentType: false,
                cache: false,
                beforeSend: function () {

                },
                success: function (result) {
                    console.log(result)
                    $('.avatar').attr("src", result.data.src);
                    updateAvatar(result.data.src)
                },
                error: function (response, textStatus, errorThrown) {
                    $('#loader').css("display", "none");
                    alert("Tải ảnh không thành công")
                }
            });
        });

        function updateAvatar(url) {
            var data = {};
            data['avatar'] = url;
            $.ajax({
                type: "PUT",
                url: "/api/consignment/user/avatar",
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    window.localStorage.setItem("avatar",url);
                    alert("Cập nhật ảnh thành công");
                    $('.loader').css("display", "none");
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert("Cập nhật ảnh không thành công");
                }
            });

        }
        $('#formEditPassword').on('submit',function (e) {
            e.preventDefault();
            var formData = $('#formEditPassword').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            console.log(data)
            if (data.passwordChange!=data.passwordRepeated){
                $('#alert').css("display","block");
                throw "fail";
            }
            $.ajax({
                type: "PUT",
                url: "/api/consignment/user/change-password",
                headers: {"Authorization": "Bearer " + localStorage.getItem('consignment_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {

                    alert(response.message);
                    window.location.href="/consignment/login";
                    $('.loader').css("display", "none");
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        })
    })
})