import './style/main.scss';
import partners_arr from './assets/partners_arr.json'

const cityArray = ['Москва', 'Санкт-Петербург', 'Адлер', 'Алексин', 'Альметьевск', 'Анапа', 'Балашиха', 'Барнаул', 'Белгород', 'Березники', 'Брянск', 'Великий Новгород', 'Видное', 'Владивосток', 'Владимир', 'Волгоград', 'Волжский', 'Вологда', 'Воронеж', 'Воскресенск', 'Воткинск', 'Всеволожск', 'Гатчина', 'Дзержинск', 'Долгопрудный', 'Домодедово', 'Екатеринбург', 'Железнодорожный', 'Жуковский', 'Зеленоград', 'Иваново', 'Ижевск', 'Иркутск', 'Истра', 'Йошкар-Ола', 'Казань', 'Калининград', 'Калуга', 'Каменск-Уральский', 'Кемерово', 'Киров', 'Климовск', 'Клин', 'Коломна', 'Колпино', 'Королёв', 'Кострома', 'Красногорск', 'Краснодар', 'Красноярск', 'Кудрово', 'Курган', 'Курск', 'Липецк', 'Лобня', 'Люберцы', 'Магнитогорск', 'Миасс', 'Московский', 'Мурманск', 'Мытищи', 'Набережные Челны', 'Нахабино', 'Находка', 'Нефтекамск', 'Нефтеюганск', 'Нижневартовск', 'Нижнекамск', 'Нижний Новгород', 'Нижний Тагил', 'Новокузнецк', 'Новомосковск', 'Новороссийск', 'Новосибирск', 'Новотроицк', 'Новый Уренгой', 'Ногинск', 'Ноябрьск', 'Нягань', 'Обнинск', 'Одинцово', 'Октябрьский', 'Омск', 'Орёл', 'Оренбург', 'Орехово-Зуево', 'Орск', 'Оскол', 'Пенза', 'Пермь', 'Петрозаводск', 'Подольск', 'Псков', 'Пушкин', 'Пушкино', 'Пятигорск', 'Раменское', 'Реутов', 'Ростов-на-Дону', 'Рязань', 'Самара', 'Саранск', 'Саратов', 'Севастополь', 'Сергиев Посад', 'Серов', 'Серпухов', 'Смоленск', 'Снежинск', 'Солнечногорск', 'Сочи', 'Ставрополь', 'Старый', 'Стерлитамак', 'Ступино', 'Сургут', 'Таганрог', 'Тамбов', 'Тверь', 'Тольятти', 'Томск', 'Троицк', 'Тула', 'Тюмень', 'Ульяновск', 'Уфа', 'Фрязино', 'Хабаровск', 'Ханты-Мансийск', 'Химки', 'Чебоксары', 'Челябинск', 'Череповец', 'Чехов', 'Чита', 'Щёкино', 'Щёлково', 'Щербинка', 'Электросталь', 'Югорск', 'Южно-Сахалинск', 'Ялта', 'Ярославль']


/* const cityCollection = new Set();
partners_arr.map((item) => item.city.forEach(i => cityCollection.add(i)))
console.log(Array.from(cityCollection).sort((a, b) => a.localeCompare(b)).slice(99));
console.log(('Москва, Санкт-Петербург, Брянск, Владимир, Волгоград, Воронеж, Дзержинск, Екатеринбург, Иваново, Казань, Калуга, Ковров, Кострома, Лабытнанги, Липецк, Муром, Нижний-Новгород, Орёл, Пермь, Петрозаводск, Рыбинск, Рязань, Салехард, Серпухов, Ступино, Тверь, Тула, Тутаев, Ярославль, Ясногорск')
  .split(', ')
)*/

const myInput = document.getElementById("myInput");
const list = document.getElementsByClassName("dropdown-content")[0]
const resultList = document.getElementsByClassName("dropdown__result")[0]
const closeButton = document.getElementsByClassName("dropdown__input-close")[0]
myInput.addEventListener('focus', openOnFocusCityList)
myInput.addEventListener('input', onInputCityList, false)
document.addEventListener('click', toggleCityList)
list.addEventListener('click', clickCityList)
closeButton.addEventListener('click', () => createResultList('Москва'))

function createSelectList() {
  const fragment = document.createDocumentFragment();

  cityArray.forEach(item => {
    const itemList = document.createElement('li');
    itemList.classList.add("dropdown-content__item");
    itemList.setAttribute("data-value", item);
    itemList.textContent = item;
    fragment.appendChild(itemList)
  })
  list.appendChild(fragment)
}


function createResultList(city) {
  const fragment = document.createDocumentFragment();
  partners_arr.forEach(item => {
    if (item.allCity || item.city.indexOf(city) != -1) {
      const imgLink = item.imgSrc ? `assets${item.imgSrc}` : ''
      const itemList = document.createElement('div');
      itemList.classList.add("dropdown__result-item");
      itemList.setAttribute("data-id", item.id);
      const itemListInner = `<div class="item__image"> 
      <a href="${item.brandLink}" target="_blank" rel="noopener noreferrer"><img src="${API_URL}${imgLink}" alt="${item.name} logo"></a></div>`
      itemList.insertAdjacentHTML('beforeend', itemListInner);
      fragment.appendChild(itemList)
    }
    myInput.value = city;
  })
  resultList.innerHTML = ''
  resultList.appendChild(fragment)
}

function toggleCityList(e) {
  const listOpen = list.classList.contains('show');
  if (e.target !== myInput && listOpen) {
    list.classList.toggle("show");
  }
}

function clickCityList(e) {
  const clickResult = e.target.textContent;
  myInput.value = clickResult;
  createResultList(clickResult);
}

function openOnFocusCityList() {
  if (!list.classList.contains('show')) {list.classList.add("show");}
}

function onInputCityList() {
  let input, filter, li, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  li = list.getElementsByClassName("dropdown-content__item");
  for (i = 0; i < li.length; i++) {
    const txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
  if (filter === '') {
    createResultList('')
  }
}

function startTimer() {
  // конечная дата, например 1 июля 2021
  const deadline = new Date(2023, 4, 1);
  // id таймера
  let timerId = null;
  // получаем элементы, содержащие компоненты даты
  const $days = document.getElementsByClassName("section__timer-day")[0]
  const $hours = document.getElementsByClassName("section__timer-hour")[0]
  const $minutes = document.getElementsByClassName("section__timer-minute")[0]
  const $daysText = document.getElementsByClassName("section__timer-day-text")[0]
  const $hoursText = document.getElementsByClassName("section__timer-hour-text")[0]
  const $minutesText = document.getElementsByClassName("section__timer-minute-text")[0]
  // склонение числительных
  function declensionNum(num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }
  // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
  function countdownTimer() {
    const diff = deadline - new Date();
    // startCircleTimer(diff);

    if (diff <= 0) {
      clearInterval(timerId);
    }
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    $days.textContent = days;
    $hours.textContent = hours;
    $minutes.textContent = minutes;
    $daysText.textContent = declensionNum(days, ['д', 'д', 'д']);
    $hoursText.textContent = declensionNum(hours, ['ч', 'ч', 'ч']);
    $minutesText.textContent = declensionNum(minutes, ['мин', 'мин', 'мин']);
  }

  // вызываем функцию countdownTimer
  countdownTimer();

  // вызываем функцию countdownTimer каждую секунду
  timerId = setInterval(countdownTimer, 8000);
}

document.addEventListener('DOMContentLoaded', function () {
  createSelectList();
  createResultList('Москва')
  startTimer();
  document.getElementsByClassName("middle")[0].style.maxWidth = 'none';
  document.getElementsByClassName("middle")[0].style.padding = '0';
  document.getElementsByClassName("page__title")[0].style.display = 'none';
});
