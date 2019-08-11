// Case-block range slider (case-range-slider.js)
// ----------------------------------------------------------------------

'use strict';

const catSlider = document.getElementById('case__range-slider');
const catImgBefore = document.querySelector('.case__cat-img--before');

catSlider.oninput = function() {
    catImgBefore.style.width = this.value + 'px';
};

// IE11 version instead unsupported oninput
function ie11Version() {
    let x = catSlider.value;
    catImgBefore.style.width = x + 'px';
}