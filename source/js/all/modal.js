// Modal windows (login, registration, overlay) (modal.js)
// ----------------------------------------------------------------------

'use strict';

const mainNavUserLoginLink = document.querySelector('.user-list__login');
const overlayModal = document.querySelector('.modal-overlay');
const loginModal = document.querySelector('.login-modal');
const loginModalCloseBtn = document.querySelector('.login-modal__close-button');
const toRegistrationModalLink = document.querySelector('.login-modal__registration-link');
const registrationModal = document.querySelector('.registration-modal');
const registrationModalCloseBtn = document.querySelector('.registration-modal__close-button');

// Login modal
// ----------------------------------------------------------------------
mainNavUserLoginLink.addEventListener('click', function (event) {
  event.preventDefault();
  loginModal.classList.add('login-modal--opened');
  overlayModal.classList.add('modal-overlay--opened');
});

loginModalCloseBtn.addEventListener('click', function (event) {
  event.preventDefault();
  loginModal.classList.remove('login-modal--opened');
  overlayModal.classList.remove('modal-overlay--opened');
});

// Registration modal
// ----------------------------------------------------------------------
toRegistrationModalLink.addEventListener('click', function (event) {
  event.preventDefault();
  loginModal.classList.remove('login-modal--opened');
  overlayModal.classList.remove('modal-overlay--opened');
  registrationModal.classList.add('registration-modal--opened');
  overlayModal.classList.add('modal-overlay--opened');
});

registrationModalCloseBtn.addEventListener('click', function (event) {
  event.preventDefault();
  registrationModal.classList.remove('registration-modal--opened');
  overlayModal.classList.remove('modal-overlay--opened');
});

// Overlay modal
// ----------------------------------------------------------------------
overlayModal.addEventListener('click', function () {
  loginModal.classList.remove('login-modal--opened');
  registrationModal.classList.remove('registration-modal--opened');
  overlayModal.classList.remove('modal-overlay--opened');
});
