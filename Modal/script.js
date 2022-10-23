'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

btnOpenModal.forEach(btn => {
  btn.addEventListener('click', toggleModal);
});

btnCloseModal.addEventListener('click', toggleModal);

overlay.addEventListener('click', toggleModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) toggleModal();
});

function toggleModal() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}
