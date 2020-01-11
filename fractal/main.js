window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var p0 = {
        x: 0,
        y: -321
    }
    p1 = {
        x: 278,
        y: 160
    }
    p2 = {
        x: -278,
        y: 160
    };

    context.translate(width / 2, height / 2);

    koch(p0, p1, 6);
    koch(p1, p2, 6);
    koch(p2, p0, 6);

    function koch(p0, p1, limit) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            unit = dist / 3,
            angle = Math.atan2(dy, dx),
            pa = {
                y: p0.y + dy / 3,
                x: p0.x + dx / 3
            },
            pc = {
                y: p1.y - dy / 3,
                x: p1.x - dx / 3
            },
            pb = {
                x: pa.x + Math.cos(angle - Math.PI / 3) * unit,
                y: pa.y + Math.sin(angle + Math.PI / 3) * unit
            };
        if (limit > 0) {
            koch(p0, pa, limit - 1);
            koch(pa, pb, limit - 1);
            koch(pb, pc, limit - 1);
            koch(pc, p1, limit - 1);
        } else {
            context.beginPath();
            context.moveTo(p0.x, p0.y);
            context.lineTo(pa.x, pa.y);
            context.lineTo(pb.x, pb.y);
            context.lineTo(pc.x, pc.y);
            context.lineTo(p1.x, p1.y);
            context.stroke();
        }
    }
}