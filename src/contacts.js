const contacts = document.getElementsByClassName("contacts")[0];
const stickyHeader = document.getElementsByClassName("stickyHeader")[0];

function addContacts() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 50000; i++) {
    const child = document.createElement("div");
    child.textContent = i;
    child.classList.add("contact");
    fragment.appendChild(child);
  }
  contacts.appendChild(fragment);
  // Эта функция теперь возвращает список контактов, который сохраняется в константу
  return Array.from(contacts.getElementsByClassName("contact"));
}

// Список контактов
const items = addContacts();
// Вынес предикат в переменную
const topItemIndexPredicate = (item) => contacts.scrollTop - item.offsetTop <= -18;
// Обновляющийся индекс предыдущего контакта в sticky header
let oldItemStickyIndex = 0;

// Функции findLowerBorder и findUpperBorder вызываются в зависимости от того, куда пролистал пользователь
// Направление определяется в слушателе события
function findLowerBorder(current){
  //Так как пролистали вниз, то проверяем предикат начиная со старого индекса пока он не перестанет выполняться
  while(--current !== -1 && topItemIndexPredicate(items[current]));
  //Так как вышли из цикла когда предикат перестал выполняться надо прибавить 1
  return current + 1;
}

function findUpperBorder(current){
  //Так как пролистали вверх, то проверяем предикат начиная со старого индекса пока он не начнет выполняться
  while(!topItemIndexPredicate(items[++current]));
  return current;
}

contacts.addEventListener("scroll", (e) => {
  let topItemIndex;
  // Если предикат от старого индекса все еще выполняется - мы пролистали вверх
  // Иначе - вниз
  if(topItemIndexPredicate(items[oldItemStickyIndex]))
    topItemIndex = findLowerBorder(oldItemStickyIndex);
  else
    topItemIndex = findUpperBorder(oldItemStickyIndex);
  //const topItemIndex = items.findIndex(topItemIndexPredicate);
  if (topItemIndex !== -1) {
      // Обновление индекса
      oldItemStickyIndex = topItemIndex;
      stickyHeader.textContent = items[topItemIndex].textContent;
  }
});


