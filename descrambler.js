(function () {
    $.fn.scramble = function (duration, interval, charset, uppercase) {
        if (typeof duration !== "number" || duration < 1000 || duration > 20000) {
            duration = 3000;
        }
        if (typeof interval !== "number" || interval < 5 || interval > 1000) {
            interval = 20;
        }
        var charsets = {
            numbers: "0123456789".split(""), alphabet: "abcdefghijklmnopqrstuvwxyz".split(""), get alphanumeric() {
                return this.numbers.concat(this.alphabet);
            }, punctuation: ["@", "#", "$", "%", "^", "&", "*", "(", ")"], get all() {
                return this.alphanumeric.concat(this.punctuation);
            },
        };
        if (!charset || !(charset in charsets)) {
            charset = "all";
        }
        var chars = charsets[charset];
        var upper = uppercase === true;
        var original = this.text();
        this.text("");

        var randomChar = () => {
            let c = chars[Math.floor(Math.random() * chars.length)];
            return upper ? c.toUpperCase() : c;
        };
        var arr = original.split("");
        var len = arr.length;
        var intervalCount = 0;
        var revealCount = 0;
        var magic = parseInt(duration / interval / len);
        var self = this;

        var timer = setInterval(() => {
            intervalCount++;
            var scrambled = Array.from({length: len}, () => randomChar());

            if (intervalCount % magic === 0) {
                revealCount++;
            }
            for (let i = 0; i < revealCount; i++) {
                scrambled[i] = arr[i];
            }
            self.text(scrambled.join(""));

            if (revealCount >= len) {
                clearInterval(timer);
            }
        }, interval);
        return this;
    };
})(jQuery);
