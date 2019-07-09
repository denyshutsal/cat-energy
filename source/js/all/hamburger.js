// Hamburger (hamburger.js)
// ----------------------------------------------------------------------

'use strict';

const hamburger = document.querySelector('.main-nav');
const hamburgerToggleBtn = document.querySelector('.main-nav__toggle');

hamburger.classList.remove('main-nav--nojs');

hamburgerToggleBtn.addEventListener('click', function () {
  if (hamburger.classList.contains('main-nav--closed')) {
    hamburger.classList.remove('main-nav--closed');
    hamburger.classList.add('main-nav--opened');
  } else {
    hamburger.classList.remove('main-nav--opened');
    hamburger.classList.add('main-nav--closed');
  }
});
