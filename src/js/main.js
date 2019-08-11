// // fix preload animation problem.
window.addEventListener(
  "load",
  evt => {
    document.querySelector("body").classList.toggle("preload");
  },
  false
);

const staticHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

staticHeight();

const randomRange = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

const calculateLimit = function(base) {
  const multiplier = 2;
  const { offsetWidth, offsetHeight } = base;
  const proportion = (offsetHeight * offsetWidth) / 9323;

  if (proportion <= 50) {
    return Math.floor(proportion * multiplier);
  }
  return Math.floor(proportion);
};

const createContainer = () => {
  const container = document.createElement("div");
  const properties = `
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      position: absolute;
    `;

  container.style.cssText = properties;
  return container;
};

const nightfall = selector => {
  const elements = document.querySelectorAll(selector);

  elements.forEach(element => {
    const container = createContainer();
    const limit = calculateLimit(element);
    Array(limit)
      .fill()
      .forEach(p => container.appendChild(createStar()));
    element.appendChild(container);
    element.style.position = "relative";
  });
};

const createStar = () => {
  const star = document.createElement("div");
  star.classList.add("star", `star-${Math.floor(randomRange(1, 6))}`);
  const starSize = randomRange(2, 4);
  let properties = `
     width: ${starSize}px; 
     height: ${starSize}px;
     top: ${Math.floor(randomRange(2, 98))}%; 
     left: ${Math.floor(randomRange(2, 98))}%;
     animation-delay: ${randomRange(1, 60) / 10}s`;
  star.style.cssText = properties;
  return star;
};

nightfall("[data-night-fall]");

// nav

const nav = () => {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const navItems = document.querySelectorAll(".main-nav__item");
  const mainNav = document.querySelector(".main-nav");

  const toggle = evt => {
    hamburgerIcon.classList.toggle("open");
    mainNav.classList.toggle("main-nav--open");
  };

  hamburgerIcon.addEventListener("click", toggle);
  navItems.forEach(p => p.addEventListener("click", toggle));
};

nav();

// float labels
const floatLabels = () => {
  const inputs = document.querySelectorAll(".contact-form__item");

  const handler = evt => {
    const className = "float-label";
    if (evt.type === "focus") {
      evt.target.classList.add(className);
    }

    if (evt.type === "blur" && !evt.target.value) {
      evt.target.classList.remove(className);
    }
  };

  inputs.forEach(p => {
    p.addEventListener("focus", handler, true);
    p.addEventListener("blur", handler, true);
  });
};

floatLabels();

// text resizing

const addAutoResize = () => {
  document.querySelectorAll("[data-autoresize]").forEach(element => {
    var offset = element.offsetHeight - element.clientHeight;
    element.addEventListener("input", event => {
      event.target.style.height = event.target.scrollHeight + offset + "px";
    });
  });
};

addAutoResize();
