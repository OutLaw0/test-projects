import './style/main.scss';
import partners_arr from './assets/partners_arr.json'

const cityArray = ['Москва', 'Санкт-Петербург', 'Владимир', 'Волгоград', 'Воронеж', 'Екатеринбург', 'Иваново', 'Краснодар', 'Липецк', 'Мичуринск', 'Новосибирск', 'Рязань', 'Самара', 'Тула', 'Тюмень', 'Анапа', 'Арзамас', 'Балашиха', 'Владивосток', 'Владикавказ', 'Егорьевск', 'Киров', 'Клин', 'Красногорск', 'Красноярск', 'Люберцы', 'Мурманск', 'Мытищи', 'Нальчик', 'Наро-Фоминск', 'Нижний Новгород', 'Обнинск', 'Одинцово', 'Подольск', 'Раменское', 'Реутов', 'Ростов-на-Дону', 'Симферополь', 'Сочи', 'Сызрань', 'Тверь', 'Тольятти', 'Химки', 'Чита', 'Южно-Сахалинск', 'Якутск', 'Ярославль', 'Адлер', 'Алексин', 'Барнаул', 'Белгород', 'Брянск', 'Великий Новгород', 'Видное', 'Волжский', 'Вологда', 'Воскресенск', 'Воткинск', 'Всеволожск', 'Гатчина', 'Дзержинск', 'Долгопрудный', 'Домодедово', 'Железнодорожный', 'Жуковский', 'Зеленоград', 'Ижевск', 'Истра', 'Йошкар-Ола', 'Казань', 'Калуга', 'Кемерово', 'Климовск', 'Коломна', 'Колпино', 'Королёв', 'Кострома', 'Кудрово', 'Курск', 'Лобня', 'Московский', 'Набережные Челны', 'Нахабино', 'Нижний Тагил', 'Новомосковск', 'Ногинск', 'Омск', 'Орёл', 'Орехово-Зуево', 'Пенза', 'Пермь', 'Петрозаводск', 'Псков', 'Пушкин', 'Пушкино', 'Саранск', 'Саратов', 'Сергиев Посад', 'Серпухов', 'Смоленск', 'Солнечногорск', 'Ставрополь', 'Старый', 'Оскол', 'Ступино', 'Таганрог', 'Тамбов', 'Томск', 'Троицк', 'Ульяновск', 'Уфа', 'Фрязино', 'Чебоксары', 'Челябинск', 'Череповец', 'Чехов', 'Щёкино', 'Щёлково', 'Щербинка', 'Электросталь', 'Иркутск', 'Калининград', 'Новокузнецк', 'Новороссийск', 'Ноябрьск', 'Оренбург', 'Пятигорск', 'Севастополь', 'Хабаровск', 'Ялта', 'Дятьково', 'Орел', 'Альметьевск', 'Березники', 'Каменск-Уральский', 'Курган', 'Магнитогорск', 'Миасс', 'Находка', 'Нефтекамск', 'Нефтеюганск', 'Нижневартовск', 'Нижнекамск', 'Новотроицк', 'Новый Уренгой', 'Нягань', 'Октябрьский', 'Орск', 'Серов', 'Снежинск', 'Стерлитамак', 'Сургут', 'Ханты-Мансийск', 'Югорск', 'Астрахань', 'Благовещенск', 'Волгодонск', 'Геленджик', 'Евпатория', 'Кандалакша', 'Караганда', 'Махачкала', 'Рыбинск', 'Славянск-на-Кубани', 'Черкесск']

/*const cityCollection = new Set();
partners_arr.map((item) => item.city.forEach(i => cityCollection.add(i)))
console.log(Array.from(cityCollection).slice(99));
console.log(('1')
  .split(', ')
)
*/

const myInput = document.getElementById("myInput");
const list = document.getElementsByClassName("dropdown-content")[0]
const resultList = document.getElementsByClassName("dropdown__result")[0]
const closeButton = document.getElementsByClassName("dropdown__input-close")[0]
myInput.addEventListener('focus', myFunctionFocus)
myInput.addEventListener('input', filterFunction, false)
document.addEventListener('click', myFunction)
list.addEventListener('click', clickList)
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
createSelectList();

function createResultList(city) {
  const fragment = document.createDocumentFragment();

  partners_arr.forEach(item => {
    if (item.allCity || item.city.indexOf(city) != -1) {
      const imgLink = item.imgSrc ? `assets${item.imgSrc}` : ''
      const itemList = document.createElement('div');
      itemList.classList.add("dropdown__result-item");
      itemList.setAttribute("data-id", item.id);
      const itemListInner = `<div class="item__image">
      <a href="http://ya.ru/" target="_blank" rel="noopener noreferrer"><img src="${imgLink}" alt="${item.name} logo"></a></div>`
      itemList.insertAdjacentHTML('beforeend', itemListInner);
      fragment.appendChild(itemList)
    }
    myInput.value = city;
  })
  console.log(fragment)
  resultList.innerHTML = ''
  resultList.appendChild(fragment)
}
createResultList('Москва')

function myFunction(e) {
  const listOpen = list.classList.contains('show');
  if (e.target !== myInput && listOpen) {
    list.classList.toggle("show");
  }
}
function clickList(e) {
  const clickResult = e.target.textContent;
  myInput.value = clickResult;
  createResultList(clickResult);
}
function myFunctionFocus() {
  list.classList.toggle("show");
}

function filterFunction() {
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
  const deadline = new Date(2022, 11, 1);
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
    startCircleTimer(diff);

    if (diff <= 0) {
      clearInterval(timerId);
    }
    console.log(diff)
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    $days.textContent = days < 10 ? '0' + days : days;
    $hours.textContent = hours < 10 ? '0' + hours : hours;
    $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    $daysText.textContent = declensionNum(days, ['день', 'дня', 'дней']);
    $hoursText.textContent = declensionNum(hours, ['час', 'часа', 'часов']);
    $minutesText.textContent = declensionNum(minutes, ['минута', 'минуты', 'минут']);
  }

  // вызываем функцию countdownTimer
  countdownTimer();

  // вызываем функцию countdownTimer каждую секунду
  timerId = setInterval(countdownTimer, 8000);
}

document.addEventListener('DOMContentLoaded', function () {
  startTimer();
  document.getElementsByClassName("middle")[0].style.padding = '0';
  document.getElementsByClassName("page__title")[0].style.display = 'none';
});

const progressbar = document.getElementsByClassName("section__timer-wrapper")[0];
//progressbar.addEventListener('click', startCircleTimer);

function startCircleTimer(diff) {
  const quad1 = document.getElementsByClassName('quad1')[0];
  const quad2 = document.getElementsByClassName('quad2')[0];
  const quad3 = document.getElementsByClassName('quad3')[0];
  const quad4 = document.getElementsByClassName('quad4')[0];

  incrementProg(diff)

  function incrementProg(diff) {
    const maxDays = 2592000000;
    let progress = Math.floor((maxDays - diff) / maxDays * 100)
    console.log(progress)
    if (progress > 100) {
      progress = 100
    }
    if (progress > 0) {
      setPie(progress);
    }
  }

  function setPie(progress) {
    if (progress <= 25) {
      quad1.setAttribute('style', 'transform: skew(' + progress * (-90 / 25) + 'deg)');
    }
    /* От 25 до 50: скрыть 1-й квадрант + изменить угол перекоса 2-го квадранта */
    else if (progress > 25 && progress <= 50) {
      quad1.setAttribute('style', 'transform: skew(-90deg)'); // полностью скрывает 1-й квадрант
      quad2.setAttribute('style', 'transform: skewY(' + (progress - 25) * (90 / 25) + 'deg)');
      progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 25px #e8f9fe');
    }
    /* От 50 до 75: скрыть первые 2 квадранта + изменить угол наклона 3-го квадранта. */
    else if (progress > 50 && progress <= 75) {
      quad1.setAttribute('style', 'transform: skew(-90deg)'); // полностью скрывает 1-й
      quad2.setAttribute('style', 'transform: skewY(90deg)'); // полностью скрывает второй
      quad3.setAttribute('style', 'transform: skew(' + (progress - 50) * (-90 / 25) + 'deg)');
      progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 25px #e8f9fe');
    }
    /* Аналогично приведенному выше для значения от 75 до 100 */
    else if (progress > 75 && progress < 100) {
      quad1.setAttribute('style', 'transform: skew(-90deg)'); // hides 1st completely
      quad2.setAttribute('style', 'transform: skewY(90deg)'); // hides 2nd completely
      quad3.setAttribute('style', 'transform: skew(-90deg)'); // hides 3rd completely
      quad4.setAttribute('style', 'transform: skewY(' + (progress - 75) * (90 / 25) + 'deg)');
      progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 25px #e8f9fe');
    }
    else {
      quad1.setAttribute('style', 'transform: skew(-90deg)'); // hides 1st completely
      quad2.setAttribute('style', 'transform: skewY(90deg)'); // hides 2nd completely
      quad3.setAttribute('style', 'transform: skew(-90deg)'); // hides 3rd completely
      quad4.setAttribute('style', 'transform: skewY(90deg)');
      progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 25px #ff8100');
    }
  }
}

const sections = document.getElementsByClassName('section__wrapper');

window.addEventListener("scroll", () => {
  const y = window.innerHeight;
  const sectionMax = { max: 0, sectionId: '' };
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    // console.log(y, rect, section.id);
    if (rect.top < y && rect.bottom > 0) {
      const bottom = rect.bottom > y ? y : rect.bottom;
      const top = rect.top > 0 ? rect.top : 0;
      const diff = (bottom - top)
      if (diff > sectionMax.max) {
        sectionMax.max = diff;
        sectionMax.sectionId = section.id;
      }
    }
  }
  console.log(sectionMax.sectionId);
  const sectionId = sectionMax.sectionId;
  // дизактивируем все активные ссылки
  document.querySelector('.navigation-block-dot.active').classList.remove("active");
  // активируем текущую
  const navigationContainer = document.getElementById(sectionId);
  navigationContainer.querySelector(`[href*=${sectionId}]`).firstElementChild.classList.add("active")

});