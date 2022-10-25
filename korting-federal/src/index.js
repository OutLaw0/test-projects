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
      const itemListInner = `<div class="item__image"><img src="${imgLink}" alt="${item.name} logo"></div>
      <a href="http://ya.ru/" target="_blank" rel="noopener noreferrer">Перейти к партнеру</a>`
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