import pets_info from './assets/slider_arr.json'
//import {createPet} from './utilities';

const width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

let slidesCount = 4;
if (width <= 1250) slidesCount = 3;
if (width <= 768) slidesCount = 2;
if (width <= 550) slidesCount = 1;

/* SLIDER*/
const sliderWrapper = document.querySelector(".main__items");
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
const sliderWrapperBase = document.querySelector(".slider__wrapper");
const prev = document.querySelector('.icon-Arrow-left');
const next = document.querySelector('.icon-Arrow-right');
let new_inner = '';

function createPet(pet) { //Create one pets card
  const pet_number = pets_info.filter(i => i.name === pet)[0];
  return `
    <div class="slider__item" data-pet="${pet}">
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
  </div>`
}

function startSlider() { //Create default slide
  let i = 0;
  let temp = '';
  while (i < slidesCount) { // выводит 0, затем 1, затем 2
    temp = temp + createPet(pets_info[i].name);
    i++;
  }
  new_inner = '<div class="slider__items">' + temp + '</div>';
  sliderWrapper.innerHTML = new_inner;
}
// const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
/* if (width >=551) new_inner += createPet("Jennifer");
 if (width >=1051) new_inner += createPet("Woody");*/


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
  console.log(item);
  return item
}

function createSlider(event) {
  const sliderItems = document.querySelector(".slider__items");
  animationStop = false;
  let containerWidth = sliderWrapperBase.offsetWidth;
  //let containerHeight = sliderWrapperBase.getBoundingClientRect().height; //get height number with after the decimal point
  let sliderWidth = sliderWrapper.offsetWidth;

  sliderWrapper.style.width = sliderWidth + 265 + "px";
  sliderWrapperBase.style.width = containerWidth + "px";
  //sliderItems.style.height = containerHeight + "px";

  if (event.currentTarget == next) { //NEXT
    new_inner = createPet(getRandomPet('first'));
    sliderItems.insertAdjacentHTML("beforeend", new_inner)
    sliderWrapper.style.float = 'left'
    sliderWrapper.style.transform = `translate3d(${-265}px, 0px, 0px)`;
    sliderWrapper.style.transition = 'transform ease-in-out 500ms';
    setTimeout(() => {
      sliderWrapper.style.transition = "none";
      //console.log(sliderWrapper.firstElementChild);
      sliderItems.firstElementChild.remove();
      sliderWrapper.style.width = "auto"; sliderWrapper.style.transform = `translate3d(0px, 0px, 0px)`; animationStop = true;
      sliderWrapperBase.style.width = "auto"; // sliderItems.style.height = "auto";

    }, 500);
  }
  else { //PREV
    new_inner = createPet(getRandomPet('last'));
    sliderItems.insertAdjacentHTML("afterbegin", new_inner);
    sliderWrapper.style.float = 'right';
    sliderWrapper.style.transform = `translate3d(${265}px, 0px, 0px)`;

    sliderWrapper.style.transition = 'transform ease-in-out 500ms';

    setTimeout(() => {
      sliderWrapper.style.transition = "none";
      sliderItems.lastElementChild.remove(); sliderWrapper.style.width = "auto";
      sliderWrapper.style.transform = 'none'; animationStop = true;
      sliderWrapperBase.style.width = "auto"; // sliderItems.style.height = "auto";
    }, 500);
  }

  //petsArray = petsArray.concat(inSliderArray);
  //inSliderArray = newPetsArray;
  //newPetsArray = [];
}


window.addEventListener('load', startSlider());

prev.addEventListener('click', (event) => { if (animationStop) createSlider(event) }); //we need to prevent many synchronous clicks
next.addEventListener('click', (event) => { if (animationStop) createSlider(event) });

/* SLIDER END*/

