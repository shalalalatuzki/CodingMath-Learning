window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        myPoint = {
            x: 300,
            y: 200
        },
        delta = 0.05;
    context.translate(width / 2, height / 2);
    update();


    function update() {
        context.clearRect(-width / 2, -height / 2, width, height);
        context.beginPath();
        context.arc(myPoint.x, myPoint.y, 20, 0, Math.PI * 2, false);
        context.fill();
        context.restore();

        var cos = Math.cos(delta),
            sin = Math.sin(delta),
            x = myPoint.x * cos - myPoint.y * sin,
            y = myPoint.x * sin + myPoint.y * cos;

        myPoint.x = x;
        myPoint.y = y;
        requestAnimationFrame(update);
    }
}