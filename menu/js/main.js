'use strict';

window.onload = function () {
    document.querySelectorAll('.items li').forEach(function (element) {
        element.addEventListener('click', function (t) {
            document.querySelectorAll('.items li').forEach(function (li) {
                return li.setAttribute('class', '');
            });
            t.target.setAttribute('class', 'selected');
            document.querySelector('.items span').innerHTML = t.target.innerText;
        });
    }, this);
};

var arrowFunc = function arrowFunc() {};