// Cat image switch (case.js)
// ----------------------------------------------------------------------

'use strict';

const catImgBefore = document.querySelector('.case__cat-img--before');
const catImgAfter = document.querySelector('.case__cat-img--after');
const beforeBtn = document.querySelector('.case__button--before');
const afterBtn = document.querySelector('.case__button--after');
const indicatorCellRight = document.querySelector('.indicator-bar__cell--right');
const indicatorCellLeft = document.querySelector('.indicator-bar__cell--left');

beforeBtn.addEventListener('click', function () {
    if (catImgBefore.classList.contains('hidden')) {
        catImgBefore.classList.remove('hidden');
        catImgAfter.classList.add('hidden');
        indicatorCellLeft.classList.remove('invisible');
        indicatorCellRight.classList.add('invisible');
    }
});

afterBtn.addEventListener('click', function () {
    if (catImgAfter.classList.contains('hidden')) {
        catImgAfter.classList.remove('hidden');
        catImgBefore.classList.add('hidden');
        indicatorCellRight.classList.remove('invisible');
        indicatorCellLeft.classList.add('invisible');
    }
});
