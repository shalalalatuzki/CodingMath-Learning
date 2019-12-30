window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ball = {
            x: width / 2 - 100,
            y: height / 2 - 100,
            alpha: 0
        }
    tween(ball, { x: width / 2, y: height / 2, alpha: 1 }, 2000, easeInOutQuad, render, tweeningBack);

    function tweeningBack() {
        tween(ball, {
            x: width / 2 - 100,
            y: height / 2 - 100,
            alpha: 0
        }, 2000, easeInOutQuad, render, render);
    }

    function tween(obj, props, duration, easingFunc, onProgress, onComplete) {


        var start = {},
            change = {},
            startTime = new Date();
        for (var prop in props) {
            start[prop] = obj[prop];
            change[prop] = props[prop] - start[prop];
        }
        update();

        function update() {
            nowTime = new Date() - startTime;
            if (nowTime < duration) {
                for (prop in props) {
                    obj[prop] = easingFunc(nowTime, start[prop], change[prop], duration);
                }
                onProgress();
                requestAnimationFrame(update);
            } else {
                time = duration;
                for (var prop in props) {
                    obj[prop] = easingFunc(nowTime, start[prop], change[prop], duration);
                }
                onComplete();
            }
        }
    }

    function render() {
        context.clearRect(0, 0, width, height);
        context.globalAlpha = ball.alpha;
        context.beginPath();
        context.arc(ball.x, ball.y, 20, 0, Math.PI * 2, false);
        context.fill();
    }


    function easeInQuad(t, b, c, d) {
        return c * (t /= d) * t + b;
    }

    function easeOutQuad(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    }

    function easeInOutQuad(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
}