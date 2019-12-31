window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        height = canvas.height = window.innerHeight,
        width = canvas.width = window.innerWidth,

        p0 = { x: width / 2 - 100, y: height / 2 - 100 },
        p1 = { x: width / 2 + 100, y: height / 2 + 100 },
        p2 = { x: width / 2 - 100, y: height / 2 + 100 },
        p3 = { x: width / 2 + 100, y: height / 2 - 100 },
        clickPoint;
    document.body.addEventListener("mousedown", onMouseDown);

    function onMouseDown(event) {
        clickPoint = getClickPoint(event.clientX, event.clientY);
        if (clickPoint) {
            document.body.addEventListener("mousemove", onMouseMove);
            document.body.addEventListener("mouseup", onMouseUp);
        }
    }

    function onMouseMove(event) {
        clickPoint.x = event.clientX;
        clickPoint.y = event.clientY;
        render();
    }

    function onMouseUp(event) {
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
    }

    function getClickPoint(clientX, clientY) {
        var points = [p0, p1, p2, p3]
        for (var i = 0; i < points.length; i++) {
            var dx = points[i].x - clientX,
                dy = points[i].y - clientY,
                dist = Math.sqrt(dx * dx + dy * dy);
            //console.log("dist" + dist)
            if (dist < 10) {
                return points[i];
            }
        }

    }

    render();

    function render() {
        context.clearRect(0, 0, width, height);
        drawCircle(p0);
        drawCircle(p1);
        drawCircle(p2);
        drawCircle(p3);

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.moveTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.stroke();

        var inPoint = intersection(p0, p1, p2, p3);
        console.log(inPoint);
        if (inPoint) {
            context.beginPath();
            context.arc(inPoint.x, inPoint.y, 10, 0, Math.PI * 2, false);
            context.stroke();
        }

    }

    function drawCircle(p) {

        context.beginPath();
        context.arc(p.x, p.y, 10, 0, Math.PI * 2, false);
        context.fill();
    }

    function intersection(p0, p1, p2, p3) {
        var A1 = p1.y - p0.y,
            B1 = p0.x - p1.x,
            C1 = A1 * p0.x + B1 * p0.y,
            A2 = p3.y - p2.y,
            B2 = p2.x - p3.x,
            C2 = p2.x * A2 + p2.y * B2;

        denominator = A1 * B2 - A2 * B1;

        console.log(denominator);

        if (denominator == 0) {
            return null;
        }
        var intersectionX = (B2 * C1 - B1 * C2) / denominator,
            intersectionY = (A1 * C2 - A2 * C1) / denominator;
        console.log(intersectionX);

        var distX0 = (intersectionX - p0.x) / (p1.x - p0.x),
            distY0 = (intersectionY - p0.y) / (p1.y - p0.y),
            distX2 = (intersectionX - p2.x) / (p3.x - p2.x),
            distY2 = (intersectionY - p2.y) / (p3.y - p2.y);
        //console.log(distX0);

        if (((distX0 >= 0 && distX0 <= 1) || (distY0 >= 0 && distY0 <= 1)) &&
            ((distX2 >= 0 && distX2 <= 1) || (distY2 >= 0 && distY2 <= 1))) {
            return { x: intersectionX, y: intersectionY };
        } else {
            return null;
        }
    }
};