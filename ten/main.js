window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        targetPosition = {
            x: width,
            y: height / 2 * Math.random()
        },
        points = [],
        numPoints = 100,
        ease = 0.25,
        easing = false;
    for (var i = 0; i < numPoints; i += 1) {
        points[i] = {
            x: 0,
            y: 0
        }
    }
    document.body.addEventListener("mousemove", function(event) {
        targetPosition.x = event.clientX;
        targetPosition.y = event.clientY;
        // if (!easing) {
        //     easing = true;
        //     update();
        // }
    });

    function easeTo(position, target, ease) {
        var dx = target.x - position.x,
            dy = target.y - position.y,
            vx = dx * ease,
            vy = dy * ease;
        position.x += vx;
        position.y += vy;
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
            position = target;
            //return false;
        }
        // return true;
        return position;
    }
    //context.translate(width / 2, height / 2);
    update();

    function update() {
        //context.clearRect(-width / 2, -height / 2, width, height);
        context.clearRect(0, 0, width, height);
        var leader = {
                x: targetPosition.x,
                y: targetPosition.y
            }
            //context.translate(myPosition.x, myPosition.y);
        context.beginPath();
        context.moveTo(targetPosition.x, targetPosition.y);

        for (var i = 0; i < numPoints; i++) {
            var myPoint = points[i];

            myPoint = easeTo(myPoint, leader, ease);
            context.lineTo(myPoint.x, myPoint.y);


            leader.x = myPoint.x;
            leader.y = myPoint.y;

        }
        context.stroke();
        // if (easing) {
        requestAnimationFrame(update);
        // }
    }
};