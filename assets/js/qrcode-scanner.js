var image_data;
var xxxx = {
    init: function (router) {
        this.eventBind(router);
    },
    eventBind: function (router) {
        var that = this;
        $("#file-input").change(function () {
            var reader = new FileReader();
            reader.onload = function (e) {
                that.compress(this.result, router);
            };
            reader.readAsDataURL(this.files[0]);
        });
    },
    compress: function (res, router) {
        var that = this;
        var img = new Image(),
            maxH = 300;

        img.onload = function () {
            var cvs = document.createElement('canvas'),
                ctx = cvs.getContext('2d');

            if (img.height > maxH) {
                img.width *= maxH / img.height;
                img.height = maxH;
            }
            cvs.width = img.width;
            cvs.height = img.height;

            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var dataUrl = cvs.toDataURL('image/jpeg', 1);
            $(".img_wrap").attr("src", dataUrl);
            $(".img_wrap").show();
            // 上传略
            that.upload(dataUrl, router);
        };

        img.src = res;

    },
    upload: function (image_data, router) {
        document.getElementById('my_camera')
            .setAttribute(
            'src', image_data
            );

        demo_h5_upload_ops.decodeImageFromBase64(image_data, result => {
            if (result == '/menu/inventoryList/O20171028026') {
                console.log(result)
                router.navigateByUrl(result)
            } else {
                console.log("請從掃")
            }
        })


    },
    decodeImageFromBase64: function (data, callback) {
        qrcode.callback = callback;
        // Start decoding
        qrcode.decode(data)


    }
};


