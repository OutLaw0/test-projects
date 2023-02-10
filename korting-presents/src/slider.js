import pets_info from './assets/slider_arr.json'
//import {createPet} from './utilities';

const width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

let slidesCount = 4;
if (width <= 1250) slidesCount = 3;
if (width <= 900) slidesCount = 2;
if (width <= 550) slidesCount = 3;

/* SLIDER*/

let petsArray = []; //array that we a create new slide from 
for (let i = slidesCount; i < pets_info.length; i++) {
  petsArray.push(pets_info[i].name);
}
let inSliderArray = []; //starting array
for (let i = 0; i < slidesCount; i++) {
  inSliderArray.push(pets_info[i].name);
}
// let newPetsArray = []; //temporary array for random func
let animationStop = true; // for prevent throttling slider
const sliderWrapper = document.getElementsByClassName("main__items")[0];
const sliderWrapperBase = document.getElementsByClassName("slider__wrapper")[0];
const prev = document.getElementsByClassName('icon-Arrow-left')[0];
const next = document.getElementsByClassName('icon-Arrow-right')[0];
let new_inner = '';
let new_inner_pag = '';

function createPet(pet) { //Create one pets card
  const pet_number = pets_info.filter(i => i.name === pet)[0];
  return `
  <a href="${pet_number.brandLink}" class="slider__item" data-pet="${pet_number.id}" target="_blank" rel="noopener noreferrer">
    <div class="slider__item-top">
      <div class="slider__item-top_background"></div>
      <img class="slider__item_image"
        src="${API_URL}assets${pet_number.imgSrc}"
        alt="${pet}">
    </div>
    <div class="slider__item-title">${pet}</div>
    <div class="slider__item-subtitle">${pet_number.sub_name}</div>
    <div class="slider__item-price">
      <span class="slider__item-price_real">${pet_number.price}</span>
      <span class="slider__item-price_null">0 ₽</span>
    </div>
  </a>`
}

function startSlider() { //Create default slide
  let i = 0;
  let temp = '';
  let temp2 = '';
  while (i < slidesCount) {
    temp = temp + createPet(pets_info[i].name);
    i++;
  }
  for (let j = 0; j < pets_info.length; j++) {
    temp2 = temp2 + `<div class="pagination__item"></div>`
  }

  new_inner = '<div class="slider__items">' + temp + '</div>';
  new_inner_pag = '<div class="pagination__items">' + temp2 + '</div>';
  sliderWrapper.insertAdjacentHTML("afterbegin", new_inner);
  sliderWrapperBase.insertAdjacentHTML("beforeend", new_inner_pag);
  const activeSliderItem = document.getElementsByClassName("slider__item")[1];
  activeSliderItem.classList.add('active');
  const activePagItem = document.getElementsByClassName("pagination__item")[1];
  activePagItem.classList.add('active');

}

function getRandomPet(pos) {
  let item = '';
  if (pos === "first") {
    item = petsArray.shift();
    inSliderArray.push(item);
    petsArray.push(inSliderArray.shift());
  }
  else {
    item = petsArray.pop();
    inSliderArray.unshift(item);
    petsArray.unshift(inSliderArray.pop());
  }
  return item
}

function moveSlideNext() {
  const sliderItems = document.getElementsByClassName("slider__items")[0];
  const activeSliderItem = document.getElementsByClassName("slider__item")[2] || document.getElementsByClassName("slider__item")[1];
  new_inner = createPet(getRandomPet('first'));
  sliderItems.insertAdjacentHTML("beforeend", new_inner)
  if (width <= 550) {
    new_inner = createPet('KORTING KDI 45140');
    sliderItems.insertAdjacentHTML("afterbegin", new_inner);
  }
  if (width > 550) sliderWrapper.style.float = 'left';
  sliderWrapper.style.transform = `translate3d(${width > 550 ? -265 : -245}px, 0px, 0px)`;
  sliderWrapper.style.transition = 'transform ease-in-out 500ms';

  Array.from(document.getElementsByClassName("slider__item")).forEach(i => i.classList.remove('active'))
  Array.from(document.getElementsByClassName("pagination__item")).forEach(i => i.classList.remove('active'))
  setTimeout(() => {
    sliderWrapper.style.transition = "none";
    sliderItems.firstElementChild.remove();
    if (width <= 550) {
      sliderItems.firstElementChild.remove();
    }
    sliderWrapper.style.width = "auto";
    sliderWrapper.style.transform = `translate3d(0px, 0px, 0px)`;
    animationStop = true;
    sliderWrapperBase.style.width = "auto"; // sliderItems.style.height = "auto";
    activeSliderItem.classList.add('active');
    let activePagNumber = document.querySelector('.slider__item.active').getAttribute('data-pet');
    document.getElementsByClassName("pagination__item")[activePagNumber].classList.add('active');
  }, 500);
}

function moveSlidePrev() {
  const sliderItems = document.getElementsByClassName("slider__items")[0];
  const activeSliderItem = document.getElementsByClassName("slider__item")[0];
  new_inner = createPet(getRandomPet('last'));
  sliderItems.insertAdjacentHTML("afterbegin", new_inner);
  if (width <= 550) {
    new_inner = createPet('KORTING KDI 45140');
    sliderItems.insertAdjacentHTML("beforeend", new_inner)
  }
  if (width > 550) sliderWrapper.style.float = 'right';
  sliderWrapper.style.transform = `translate3d(${width > 550 ? 265 : 245}px, 0px, 0px)`;
  sliderWrapper.style.transition = 'transform ease-in-out 500ms';

  Array.from(document.getElementsByClassName("slider__item")).forEach(i => i.classList.remove('active'));
  Array.from(document.getElementsByClassName("pagination__item")).forEach(i => i.classList.remove('active'));

  setTimeout(() => {
    sliderWrapper.style.transition = "none";
    sliderItems.lastElementChild.remove();
    if (width <= 550) {
      sliderItems.lastElementChild.remove();
    }
    sliderWrapper.style.width = "auto";
    sliderWrapper.style.transform = 'none'; animationStop = true;
    sliderWrapperBase.style.width = "auto"; // sliderItems.style.height = "auto";
    activeSliderItem.classList.add('active');
    let activePagNumber = document.querySelector('.slider__item.active').getAttribute('data-pet');
    document.getElementsByClassName("pagination__item")[activePagNumber].classList.add('active');
  }, 500);
}

function moveSlider(move) {
  animationStop = false;
  if (width > 550) {
    let containerWidth = sliderWrapperBase.offsetWidth;
    let sliderWidth = sliderWrapper.offsetWidth;
    sliderWrapper.style.width = sliderWidth + 265 + "px";
    sliderWrapperBase.style.width = containerWidth + "px";
  }

  if (move === 'next') { //NEXT
    moveSlideNext()
  }
  else { //PREV
    moveSlidePrev()
  }

}

window.addEventListener('load', startSlider());

prev.addEventListener('click', () => { if (animationStop) moveSlider('prev') }); //we need to prevent many synchronous clicks
next.addEventListener('click', () => { if (animationStop) moveSlider('next') });

/* SLIDER END*/

// Sliding event

let startX, startY,
  endX = 0,
  endY = 0;

function swipeStart(e) {
  // console.log(e)
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  // console.log("startX->"+startX,"startY ->"+startY)
}

function swipeMove(e) {
  endX = e.touches[0].clientX;
  endY = e.touches[0].clientY;
  // console.log("endX ->"+endX,"endY ->"+endY)
}

// main swipe event with lose checking
function swipeEnd(e, offset) {
  offset = offset ? offset : 50;
  let lengthX = endX == 0 ? 0 : Math.abs(startX - endX);
  let lengthY = endY == 0 ? 0 : Math.abs(startY - endY);
  // console.log("lengthX"+lengthX,"lengthY"+lengthY)
  if (lengthX > lengthY && lengthX >= offset) {
    (startX - endX) > 0 ? (swipeLeft()) : (swipeRight());
  } /* else if (lengthY > lengthX && lengthY >= offset) {
    (startY - endY) > 0 ? (swipeUp()) : (swipeDown());
  }*/

}

function swipeLeft() { moveSlider('next') }
function swipeRight() { moveSlider('prev') }
// function swipeUp() { keyUp() }
// function swipeDown() { keyDown() }

sliderWrapperBase.addEventListener('touchstart', swipeStart, { passive: true })
sliderWrapperBase.addEventListener('touchmove', swipeMove, { passive: true })
sliderWrapperBase.addEventListener('touchend', swipeEnd, { passive: true })

// END Sliding event  
