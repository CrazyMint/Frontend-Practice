const HOST = "server.com/";

// document.onclick = () => {
//   api.get(HOST, {}, (response) => {
//     document.body.innerHTML += response;
//   });
// };

const goElement = document.getElementById("go");
goElement.onclick = () => {
  const inputElement = document.getElementById("test");
  api.get(HOST + "menus", { menu: inputElement.value }, displayText);
};

const displayText = (response) => {
  const outputElement = document.getElementById("output");
  outputElement.innerHTML += response + "<br>";
};

// Server

const getMenu = (data) => {
  const inputData = data.menu;
  if (inputData === "a") {
    return "I got an A";
  } else if (inputData === "b") {
    return "I got a B";
  } else {
    return "I got something else";
  }
};

const endpoints = {
  "/": {
    get: () => "hello world",
  },
  "/menus": {
    get: getMenu,
  },
};

// API Library

const getFunction = (url, data, callback) => {
  const domain = url.substring(0, url.indexOf("/"));
  const endpoint = url.substring(url.indexOf("/"));

  callback(endpoints[endpoint]["get"](data));
};

const api = {
  get: getFunction,
};

// Event

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
