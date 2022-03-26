let addElemForm = document.querySelector(".form-add");
let addElemInput = document.querySelector("textarea");
let container = document.querySelector(".elements-container");
let elements = container.children;
let template = document.querySelector("template").content;
let elementTemplate = template.querySelector(".template-element");
let randButton = document.querySelector(".random-button");

// Вывод экрана загрузки
function showLoadScreen(time) {
  let loadCover = document.querySelector(".load-cover");
  let loadLogo = document.querySelector(".load-logo");
  loadCover.classList.remove("hidden");
  loadLogo.classList.remove("hidden");
  setTimeout(function () {
    loadCover.classList.add("hidden");
    loadLogo.classList.add("hidden");
  }, time);
}

// Вывод "Пока пусто"
let showEmpty = function () {
  let empty = document.querySelector(".empty");
  if (elements.length > 0) {
    empty.classList.add("hidden");
  } else {
    empty.classList.remove("hidden");
  }
  console.log(elements, elements.length);
};

// Обработчик удаления элементов
let handleDelete = function (elem) {
  let deleteButton = elem.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    elem.remove();
    showEmpty();
  });
};

// Очистка списка
let clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", () => {
  container.innerHTML = "";
  showEmpty();
});

// Добавление элемента
addElemForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let textArr = addElemInput.value.split("\n");
  for (let j = 0; j < textArr.length; j++) {
    let newElement = elementTemplate.cloneNode(true);
    if (addElemInput.value !== "") {
      newElement.querySelector(".template-text").textContent = textArr[j];
      container.appendChild(newElement);
      handleDelete(newElement);
    }
  }
  addElemInput.value = "";
  showEmpty();
});

// Определение случайного победителя
randButton.addEventListener("click", () => {
  let arr = [];
  for (let i = 0; i < elements.length; i++) {
    let elemText = elements[i].querySelector(".template-text").textContent;
    arr.push(elemText);
  }
  let rand = Math.floor(Math.random() * arr.length);
  showLoadScreen(500);
  document.querySelector(".random-value").textContent = arr[rand];
});
