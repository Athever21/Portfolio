let curr = 0;
let currImage = 0;
const images = [];
let cards = document.querySelectorAll(".card");
let aboutInterval;

cards[curr].style.marginLeft = "0";

document.querySelector(".to-left").addEventListener("click", () => {
  const next = curr ? curr - 1 : cards.length - 1;
  const nextCard = cards[next];
  const currCard = cards[curr];

  slide(currCard, nextCard, true);

  curr = next;
});

document.querySelector(".to-right").addEventListener("click", () => {
  const next = curr == cards.length - 1 ? 0 : curr + 1;
  const nextCard = cards[next];
  const currCard = cards[curr];

  slide(currCard, nextCard, false);

  curr = next;
});

function slide(currCard, nextCard, left) {
  nextCard.style.transition = "none";
  nextCard.style.marginLeft = left ? "100%" : "-100%";

  if (nextCard == cards[1]) aboutAnimations();
  else cancelAboutAnimations();

  if (nextCard == cards[2]) projectsAnimations();
  else cancelProjectsAnimations();

  setTimeout(() => {
    nextCard.style.transition = "margin 0.5s ease-in-out";
    currCard.style.transition = "margin 0.5s ease-in-out";
    currCard.style.marginLeft = left ? "-100%" : "100%";
    nextCard.style.marginLeft = "0";
  }, 1);
}

document.querySelectorAll(".header-nav").forEach((x) =>
  x.addEventListener("click", ({ target }) => {
    const next = parseInt(target.getAttribute("data-to"));
    if (curr == next) return;

    const currCard = cards[curr];
    const nextCard = cards[next];

    slide(currCard, nextCard, next > curr ? false : true);
    curr = next;
  })
);

function aboutStackChange() {
  aboutInterval = setInterval(() => {
    const next = currImage == images.length - 1 ? 0 : currImage + 1;
    const nextImage = images[next];
    const currImageDiv = images[currImage];

    currImageDiv.style.opacity = '0';
    nextImage.style.opacity = '0.5';

    currImage = next == 0 ? 0 : next;
  }, 3500);
}

function preLoadImages() {
  const stack = [
    ["mongo", "mongo.png"],
    ["react", "react.png"],
    ["node", "node.webp"],
    ["java", "java.png"],
    ["go", "go.webp"],
  ];

  const parent = document.querySelector('.container');

  for (const s of stack) {
    const div = document.createElement('div');
    div.classList.add('about-background');
    div.style.backgroundImage = `url(img/${s[1]})`;
    if (s[0] != "mongo") div.style.opacity = '0';
    parent.appendChild(div);
    images.push(div);
  }
}

preLoadImages();

function aboutAnimations() {
  aboutStackChange();
  cards[1].querySelector('.about-desc').style.transform = "translateY(0)";
}

function cancelAboutAnimations() {
  console.log(clearInterval(aboutInterval));
  aboutInterval = null;
  cards[1].querySelector('.about-desc').style.transform = "translateY(200%)";
}

function projectsAnimations() {
  cards[2].querySelector('.fly').style.transform = "translateY(0)";
}

function cancelProjectsAnimations() {
  cards[2].querySelector('.fly').style.transform = "translateY(200%)";
}