"use strict";

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);


//Burger menu

$('.menu__btn').click(function () {
  $('.menu__contacts-mobile').toggleClass('menu__open')
  $('.menu__btn').toggleClass('menu__btn_open')
});


$('#modal-request').on('hidden.bs.modal', function () {
  setTimeout(function () {
    $('#modal-success').modal('show');
  }, 1000);
});

