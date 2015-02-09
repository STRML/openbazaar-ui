module.exports = function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            $timeout(function () {
                var words = scope.$apply(attrs.nsMalarkey);
                el.text(words.shift());
                var pause = 800;
                var typist = malarkey(el[0], {speed: 60, loop: false, postfix: ''});
                typist.pause(2400).delete(el.text().length)
                for (var i = 0; i < words.length; i++) {
                    typist.type(words[i])
                    if (i !== words.length - 1) {
                        typist.pause(pause).delete(words[i].length);
                    }
                }
                typist
                    .pause(1200)
                    .call(function () { el.addClass('disabled'); });
            });
        }
    }
};