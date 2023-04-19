const HOST = "server.com/";

// document.onclick = () => {
//   api.get(HOST, {}, (response) => {
//     document.body.innerHTML += response;
//   });
// };

// Server

const endpoints = {
  "/": {
    get: "hello world",
  },
};

const getFunction = (url, data, callback) => {
  const domain = url.substring(0, url.indexOf("/"));
  const endpoint = url.substring(url.indexOf("/"));

  callback(endpoints[endpoint]["get"]);
};

const api = {
  get: getFunction,
};

const showSubmenu = () => {
  const submenu = document.getElementsByClassName("menu__sub")[0];
  submenu.style.display = "block";
};

const hideSubmenu = () => {
  const submenu = document.getElementsByClassName("menu__sub")[0];
  submenu.style.display = "none";
};

let lastActive = null;
const onMenuItemMouseEnter = (item) => {
  if (lastActive) {
    lastActive.classList.remove("menu__main__item--active");
  }
  lastActive = item;
  item.classList.add("menu__main__item--active");
  showSubmenu();
};

const menuItems = document.querySelectorAll(".menu__main__item");

for (let menuItem of menuItems) {
  menuItem.onmouseenter = () => onMenuItemMouseEnter(menuItem);
}

const menu = document.getElementsByClassName("menu")[0];
menu.onmouseleave = hideSubmenu;
