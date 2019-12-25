window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        targetPosition = {
            x: width,
            y: height / 2 * Math.random()
        },
        myPosition = {
            x: 0,
            y: height / 2 * Math.random()
        };
    ease = 0.1;
    document.body.addEventListener("mousemove", function(event) {
        targetPosition.x = event.clientX;
        targetPosition.y = event.clientY;
    });
    //context.translate(width / 2, height / 2);
    update();

    function update() {
        //context.clearRect(-width / 2, -height / 2, width, height);
        context.clearRect(0, 0, width, height);

        //context.translate(myPosition.x, myPosition.y);
        context.beginPath();

        context.arc(myPosition.x, myPosition.y, 20, 0, Math.PI * 2, false);
        context.fill();
        context.restore();

        var dx = targetPosition.x - myPosition.x,
            dy = targetPosition.y - myPosition.y,
            vx = dx * ease,
            vy = dy * ease;
        myPosition.x += vx;
        myPosition.y += vy;
        requestAnimationFrame(update);
    }
};