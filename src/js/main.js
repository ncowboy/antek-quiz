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

$('#modal-quiz').modal('show');

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
    const nextBlock =  $('.quiz__form').find(`.quiz__block[data-block=${blockIndex}]`);
    currentBlock.hide();
    nextBlock.show();
  })
});

$('.quiz__check').on('change', function (e) {
  const btn = $(e.target).parent().parent().next().find('.btn_inactive');
  if(btn) {
    btn.attr('disabled', false).removeClass('btn_inactive');
  }

});

