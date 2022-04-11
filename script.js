let addElemForm = document.querySelector(".form");
let randButton = document.querySelector(".list-header__random-button");
let helpButton = document.querySelector(".header__help");
let container = document.querySelector(".list-elements");
let elements = container.children;
let closeHelpButton = document.querySelector(".popup-header__close-button");
let overlay = document.querySelector(".overlay");

// Вывод экрана загрузки
function showLoadScreen(time) {
  let loadLogo = document.querySelector(".load-logo");
  loadLogo.classList.remove("hidden");
  setTimeout(function () {
    loadLogo.classList.add("hidden");
  }, time);
}

// Справка
helpButton.addEventListener("click", () => {
  let popup = document.querySelector(".popup");
  popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
  closeHelpButton.addEventListener("click", () => {
    popup.classList.add("hidden");
    overlay.classList.add("hidden");
  });
});

// Вывод "Пока пусто"
let showEmpty = function () {
  let listText = document.querySelector(".list-text");
  let list = document.querySelector(".list");
  if (elements.length > 0) {
    listText.classList.add("hidden");
    list.classList.remove("hidden");
  } else {
    listText.classList.remove("hidden");
    list.classList.add("hidden");
  }
};

// Обработчик удаления элементов
let handleDelete = function (elem) {
  let deleteButton = elem.querySelector(".template-element__button");
  deleteButton.addEventListener("click", () => {
    elem.remove();
    showEmpty();
  });
};

// Очистка списка
let clearButton = document.querySelector(".list-header__clear-button");
clearButton.addEventListener("click", () => {
  container.innerHTML = "";
  showEmpty();
});

// Добавление элемента
addElemForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let addElemInput = document.querySelector(".form__area");
  let template = document.querySelector("template").content;
  let elementTemplate = template.querySelector(".template-element");
  let textArr = addElemInput.value.split("\n");
  for (let j = 0; j < textArr.length; j++) {
    let newElement = elementTemplate.cloneNode(true);
    if (textArr[j] !== "" && !textArr[j].startsWith(" ")) {
      newElement.querySelector(".template-element__text").textContent =
        textArr[j];
      container.appendChild(newElement);
      handleDelete(newElement);
    }
  }
  addElemInput.value = "";
  showEmpty();
});

// Определение случайного победителя
randButton.addEventListener("click", () => {
  let informationText = document.querySelector(".information-text");
  let informationWinner = document.querySelector(".information-winner");
  let arr = [];
  for (let i = 0; i < elements.length; i++) {
    let elemText = elements[i].querySelector(
      ".template-element__text"
    ).textContent;
    arr.push(elemText);
  }
  let rand = Math.floor(Math.random() * arr.length);
  //showLoadScreen(500);
  document.querySelector(".information-winner__random-value").textContent =
    arr[rand];
  informationText.classList.add("hidden");
  informationWinner.classList.remove("hidden");
});
