const contacts = document.getElementsByClassName("contacts")[0];
const stickyHeader = document.getElementsByClassName("stickyHeader")[0];
const items = []
const fragment = document.createDocumentFragment();


const max_contracts = 50000
const iter_contracts = 1000
const thr_contracts = 750
let current_contracts = 0

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
  if(topItemIndex >= current_contracts - iter_contracts + thr_contracts && current_contracts !== max_contracts)
    addNextContacts()
});

// Теперь эта функция загружает контракты частями если пользователь пролистал почти до конца
function addNextContacts() {
  console.log("HERE")
    for (let i = current_contracts; i < current_contracts + iter_contracts; i++) {
      const child = document.createElement("div");
      child.textContent = i;
      child.classList.add("contact");
      items.push(child)
      contacts.appendChild(child);
    }
    current_contracts += iter_contracts
}

addNextContacts();
// Список контактов

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




