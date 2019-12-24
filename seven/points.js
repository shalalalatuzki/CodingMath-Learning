window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        fl = 300,
        points = [],
        numpoints = 200,
        CenterZ = 2000,
        radius = 1000,
        ypos = 0,
        baseAngle = 0,
        rotationSpeed = 0.01;


    for (var i = 0; i < numpoints; i += 1) {
        var point = {
            angle: 0.2 * i,
            y: 2000 - 4000 / numpoints * i
        };
        point.x = Math.cos(point.angle + baseAngle) * radius;
        point.z = CenterZ + Math.sin(point.angle + baseAngle) * radius;
        points.push(point);
    }

    context.translate(width / 2, height / 2);


    document.body.addEventListener("mousemove", function(event) {
        rotationSpeed = (event.clientX - width / 2) * 0.00005;
        ypos = (event.clientY - height / 2) * 2;
    });

    update();

    function update() {
        baseAngle += rotationSpeed;
        //points.sort(zsort);
        context.clearRect(-width / 2, -height / 2, width, height);

        context.beginPath();

        for (var i = 0; i < numpoints; i += 1) {
            var point = points[i];
            perspective = fl / (fl + point.z);

            context.save();
            context.scale(perspective, perspective);
            context.translate(point.x, point.y);


            //context.scale(Math.sin(point.angle + baseAngle), 1);

            //context.arc(0, 0, 40, 0, Math.PI * 2, false);
            //context.fill();
            if (i == 0) {
                context.moveTo(0, 0);
            } else {
                context.lineTo(0, 0);
            }
            context.restore();

            point.x = Math.cos(point.angle + baseAngle) * radius;
            point.z = CenterZ + Math.sin(point.angle + baseAngle) * radius;
        }
        context.stroke();
        requestAnimationFrame(update);
    }
};