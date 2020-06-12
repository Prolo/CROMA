$(document).ready(function () {

    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }

    processor.doLoad();
   

});


let processor = {
    timerCallback: function () {

        this.computeFrame();
        let self = this;
        setTimeout(function () {
            self.timerCallback();
        }, 0);
    },

    doLoad: function () {
        this.video = document.getElementById("videoElement");
        this.c1 = document.getElementById("c1");
        this.ctx1 = this.c1.getContext("2d");

        let self = this;
        this.video.addEventListener("play", function () {
            self.width = self.video.videoWidth;
            self.height = self.video.videoHeight;
            self.timerCallback();
        }, false);
    },

    computeFrame: function () {


        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        let l = frame.data.length / 4;

        for (let i = 0; i < l; i++)
        {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];

            if (r > 170 && g > 170 && b > 60)
            {
                frame.data[i * 4 + 3] = 0;
            }
       
        }

        this.ctx1.putImageData(frame, 0, 0);
        return;
    }
};