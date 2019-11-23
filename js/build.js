var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
System.register("tools", [], function (exports_1, context_1) {
    "use strict";
    var random;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Number.prototype.remap = function (fromRange, toRange) {
                return ((this - fromRange[0]) * (toRange[1] - toRange[0])) / (fromRange[1] - fromRange[0]) + toRange[0];
            };
            exports_1("random", random = function (min, max) {
                return Math.random() * (max - min) + min;
            });
        }
    };
});
System.register("main", ["tools"], function (exports_2, context_2) {
    "use strict";
    var tools_1, setPos, starsPool, TS, tick;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (tools_1_1) {
                tools_1 = tools_1_1;
            }
        ],
        execute: function () {
            setPos = function (star, x, y) {
                star.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
            };
            starsPool = [];
            // for (let i = 0; i < 10; i++) {
            //     const star: Star = {
            //         ...document.createElement('div'),
            //         createdAt: 0
            //     }
            //     star.classList.add('star')
            //     starsPool.push(star)
            // }
            setInterval(function () {
                var star = __assign(__assign({}, document.createElement('div')), { createdAt: TS });
                star.classList.add('star');
                var x = tools_1.random(0, window.screen.width);
                var y = tools_1.random(0, window.screen.height);
                setPos(star, x, y);
                starsPool.push(star);
                document.body.appendChild(star);
            }, 1000);
            TS = 0;
            tick = function (now) {
                TS = now;
                for (var i = starsPool.length - 1; i > 0; i--) {
                    var star = starsPool[i];
                    var age = TS - star.createdAt;
                    var opacity = age.remap([0, 1000], [1, 0]);
                    star.style.opacity = "" + opacity;
                    if (opacity <= 0) {
                    }
                }
                requestAnimationFrame(tick);
                console.log('ok');
            };
            requestAnimationFrame(tick);
            console.log('test');
        }
    };
});
