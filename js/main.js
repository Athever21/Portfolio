function type(word) {
  for (let i = 0; i < word.length; i++) {
    setTimeout(
      () => (document.querySelector(".write").textContent += word[i]),
      150 * i
    );
  }
}

type("WEB DEVELOPMENT");

const links = document.querySelectorAll("header nav a");

for (const link of links) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("data-to");
    const offsetTop = document.querySelector(`.${target}`).offsetTop;

    scroll({
      top: offsetTop,
      behavior: "smooth",
    });
  });
}

class ScrollEvents {
  aboutLoaded = false;
  projectsLoaded = false;

  loadAbout() {
    if (!this.aboutLoaded) {
      const about = document.querySelector(".about");
      const text = about.querySelector("p");
      const stack = about.querySelector(".stack-logos");

      text.style.animation = "fly-in-left 0.8s ease-in-out";
      stack.style.animation = "fly-in-down 0.8s ease-in-out";
      text.style.transform = "translateX(0%)";
      stack.style.transform = "translateY(0%)";
      this.aboutLoaded = true;
    }
  }

  async displayRepos() {
    const repos = await (
      await fetch("https://api.github.com/users/Athever21/repos")
    ).json();
    repos.reverse().forEach((rep) => displayRepo(rep));
  }

  async loadProjects() {
    if (!this.projectsLoaded) {
      this.projectsLoaded = true;
      const projects = document.querySelector(".projects");
      const text = projects.querySelector("p");
      const fly = projects.querySelector(".fly");

      text.style.animation = "fly-in-right 0.8s ease-in-out";
      fly.style.animation = "fly-in-down 0.8s ease-in-out";
      text.style.transform = "translateX(0%)";
      fly.style.transform = "translateY(0%)";
    }
  }
}

const scrollE = new ScrollEvents();
scrollE.displayRepos();
const d = document.documentElement;
const aboutH = document.querySelector(".about").offsetTop - 400;
const projectsH = document.querySelector(".projects").offsetTop - 400;

window.addEventListener("scroll", () => {
  if (d.scrollTop > aboutH) {
    scrollE.loadAbout();
  }

  if (d.scrollTop > projectsH) {
    scrollE.loadProjects();
  }
});

const ce = document.createElement.bind(document);

function displayRepo(rep) {
  if (rep.name === "Portfolio") return;
  console.log(rep);

  const fly = document.querySelector(".fly");
  const div = ce("div");
  div.classList.add("project");
  const h2 = ce("h2");
  h2.innerHTML = rep.name;

  const links = ce("div");
  links.classList.add("links");
  addLink(rep.html_url, "Github", links);
  if (rep.homepage) addLink(rep.homepage, "Live Website", links);

  const lang = ce("div");
  lang.classList.add("lang");
  addLang(rep.language, lang);

  [h2, links, lang].forEach((x) => div.appendChild(x));
  fly.appendChild(div);
  console.log(div);
}

function addLink(href, text, target) {
  const link = ce("a");
  link.href = href;
  link.setAttribute("target", "_blank");
  link.innerHTML = text;
  target.appendChild(link);
}

function addLang(text, target) {
  const lang = ce("p");
  const circle = ce("div");

  const colors = [
    ["typescript", "007acc"],
    ["javascript", "f0db4f "],
    ["go", "2fbdb0"],
    ["java", "f89820"],
    ["php", "8993be"]
  ];
  const color = colors.find((x) => x[0] === text.toLowerCase());
  circle.style.background = `#${color[1]}`;

  lang.innerHTML = text;

  target.appendChild(lang);
  target.appendChild(circle);
}
