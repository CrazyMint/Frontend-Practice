const HOST = "server.com/";

// Event

const populateCategories = (category) => {
  const activeMenuItemName = activeMenuItem.children[0].innerHTML;
  api.get(
    HOST + "categories",
    { category, menuItem: activeMenuItemName },
    (response) => {
      const categories = response;
      let categoryList = "";
      for (let cate of categories) {
        const categoryElement = `
        <li class="menu__sub__categoties__item">
          <a href="#" class="menu__sub__categories__item__link">${cate}</a>
        </li>
      `;
        categoryList += categoryElement;
      }
      const submenuElement = document.getElementsByClassName(
        `menu__sub__categories__items--${category}`
      )[0];
      submenuElement.innerHTML = categoryList;
    }
  );
};

const showSubmenu = () => {
  const submenu = document.getElementsByClassName("menu__sub")[0];
  submenu.style.display = "block";

  populateCategories("top");
  populateCategories("additional");
};

const hideSubmenu = () => {
  const submenu = document.getElementsByClassName("menu__sub")[0];
  submenu.style.display = "none";
};

let activeMenuItem = null;

const onMenuItemMouseEnter = (newActiveItem) => {
  if (activeMenuItem) {
    activeMenuItem.classList.remove("menu__main__item--active");
  }
  activeMenuItem = newActiveItem;
  newActiveItem.classList.add("menu__main__item--active");
  showSubmenu();
};

const menuItems = document.querySelectorAll(".menu__main__item");

for (let menuItem of menuItems) {
  menuItem.onmouseenter = () => onMenuItemMouseEnter(menuItem);
}

const menu = document.getElementsByClassName("menu")[0];
menu.onmouseleave = hideSubmenu;

const deactivateMenuItem = () => {
  activeMenuItem.classList.remove("menu__main__item--active");
};

const submenu = document.getElementsByClassName("menu__sub")[0];
submenu.onmouseleave = deactivateMenuItem;

// Server

function getCategories(data) {
  if (data.category == "top") {
    if (data.menuItem == "Motors") {
      return ["Car", "Motorcycle", "Plane", "Trucks", "Wheels"];
    }
    if (data.menuItem == "Fashion") {
      return ["Women's tops", "Men's tops", "Jeans", "Hats"];
    }
    return ["Server apple", "Server banana", "Server pear", "Server orange"];
  }
  if (data.category == "additional") {
    if (data.menuItem == "Motors") {
      return ["Tires", "Windshields", "Ski racks", "Doors", "Windows"];
    }
    if (data.menuItem == "Fashion") {
      return ["On sale", "Red stuff", "Gucci", "New Arrivals"];
    }
    return ["Server square", "Server circle", "Server oval", "Server diamond"];
  }
  return [];
}

const endpoints = {
  "/": {
    get: () => "hello world",
  },
  "/categories": {
    get: getCategories,
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
