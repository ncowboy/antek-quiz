"use strict";

//Burger menu

$('.menu__btn').click(function () {
  $('.menu__contacts-mobile').toggleClass('menu__open');
  $('.menu__btn').toggleClass('menu__btn_open');
});


$('#modal-request').on('hidden.bs.modal', function () {
  setTimeout(function () {
    $('#modal-success').modal('show');
  }, 1000);
});



// Quiz

$('.quiz__input_range').on('change', function (e) {
  const btn = $(e.target).parent().next().find('.btn');
  if (e.target.value !== '0') {
    btn.attr('disabled', false).removeClass('btn_inactive');
  } else {
    btn.attr('disabled', true).addClass('btn_inactive');
  }


$('.quiz__btn').click(function (e) {
    const currentBlock = $(e.target).parent().parent();
    const blockIndex = e.target.dataset.target;
    const nextBlock = $('.quiz__form').find(`.quiz__block[data-block=${blockIndex}]`);
    currentBlock.hide();
    nextBlock.show();
  })
});

$('.quiz__check').on('change', function (e) {
  const btn = $(e.target).parent().parent().next().find('.btn').not('.btn_inactive').not('.quiz__btn_prev');
  const btn_disabled = $(e.target).parent().parent().next().find('.btn_inactive');
  const blockInputName = $(e.target).attr('name');
  let checked = 0;

  $(`.quiz__check[name=${blockInputName}]`).each(function (index, el) {
    if($(el).get(0).checked) {
           checked++;
    }
  });
  if (btn_disabled && checked !== 0) {
    btn_disabled.attr('disabled', false).removeClass('btn_inactive');
  }

  if(btn && checked === 0) {
    btn.attr('disabled', true).addClass('btn_inactive');
  }
});

$('.quiz__form').submit(function (e) {
  e.preventDefault();

  setTimeout(function () {
    $('#modal-quiz-success').modal('show');
  }, 1000);
});



