window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,

        fl = 300,
        //rotationSpeed = 0.01,
        // radius = 1000,
        centerZ = 1500,
        needUpdate = true,
        points = [];

    context.translate(width / 2, height / 2);
    points[0] = { x: -500, y: 500, z: 500 };
    points[1] = { x: -500, y: -500, z: 500 };
    points[3] = { x: 500, y: 500, z: 500 };
    points[2] = { x: 500, y: -500, z: 500 };
    points[4] = { x: -500, y: 500, z: -500 };
    points[5] = { x: -500, y: -500, z: -500 };
    points[7] = { x: 500, y: 500, z: -500 };
    points[6] = { x: 500, y: -500, z: -500 };

    function project() {
        for (var i = 0; i < points.length; i++) {
            var myPoint = points[i],
                scale = fl / (fl + myPoint.z + centerZ);
            myPoint.sx = myPoint.x * scale;
            myPoint.sy = myPoint.y * scale;
        }
    }

    function drawLine() {
        var myPoint = points[arguments[0]];
        project();
        context.moveTo(myPoint.sx, myPoint.sy);

        for (var i = 0; i < arguments.length; i += 1) {
            myPoint = points[arguments[i]];
            context.lineTo(myPoint.sx, myPoint.sy);
        }

    }

    function translateCube(x, y, z) {
        for (var i = 0; i < points.length; i += 1) {
            points[i].x += x;
            points[i].y += y;
            points[i].z += z;
        }
        needUpdate = true;
    }

    function rotateX(a) {
        var cos = Math.cos(a),
            sin = Math.sin(a);
        for (var i = 0; i < points.length; i += 1) {
            var y = points[i].y * cos - points[i].z * sin,
                z = points[i].y * sin + points[i].z * cos;
            points[i].y = y;
            points[i].z = z;
        }
        needUpdate = true;
    }

    function rotateY(a) {
        var cos = Math.cos(a),
            sin = Math.sin(a);
        for (var i = 0; i < points.length; i += 1) {
            var x = points[i].x * cos - points[i].z * sin,
                z = points[i].x * sin + points[i].z * cos;
            points[i].x = x;
            points[i].z = z;
        }
        needUpdate = true;
    }

    function rotateZ(a) {
        var cos = Math.cos(a),
            sin = Math.sin(a);
        for (var i = 0; i < points.length; i += 1) {
            var x = points[i].x * cos - points[i].y * sin,
                y = points[i].x * sin + points[i].y * cos;
            points[i].x = x;
            points[i].y = y;
        }
        needUpdate = true;
    }

    document.body.addEventListener("keydown", function(event) {
        switch (event.keyCode) {
            case 37:
                if (event.ctrlKey) {
                    rotateY(0.05);
                } else {
                    translateCube(-20, 0, 0);
                }
                break;
            case 39:
                if (event.ctrlKey) {
                    rotateY(-0.05);
                } else {
                    translateCube(20, 0, 0);
                }
                break;
            case 38: // up
                if (event.shiftKey) {
                    translateCube(0, 0, 20);
                } else if (event.ctrlKey) {
                    rotateX(0.05);
                } else {
                    translateCube(0, -20, 0);
                }
                break;
            case 40: // down
                if (event.shiftKey) {
                    translateCube(0, 0, -20);
                } else if (event.ctrlKey) {
                    rotateX(-0.05);
                } else {
                    translateCube(0, 20, 0);
                }
                break;
        }
    });
    update();

    function update() {
        if (needUpdate) {
            context.clearRect(-width / 2, -height / 2, width, height);
            context.beginPath();
            drawLine(0, 1, 2, 3, 0);
            drawLine(4, 5, 6, 7, 4);
            drawLine(0, 4);
            drawLine(1, 5);
            drawLine(2, 6);
            drawLine(3, 7);
            context.stroke();
            context.restore();
            needUpdate = false;
        }
        requestAnimationFrame(update);
    }
}