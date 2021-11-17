function type(word) {
  for (let i = 0; i < word.length; i++) {
    setTimeout(
      () => (document.querySelector(".write").textContent += word[i]),
      150 * i
    );
  }
}

type("WEB DEVELOPMENT");

let socialsToggle = true;
document
  .querySelector(".toggle-socials")
  .addEventListener("click", ({ target }) => {
    if (socialsToggle) {
      document.querySelector(".socials").style.width = "4rem";
      document.querySelector(".social-wrapper").style.marginLeft = "0";
      target.style.marginLeft = "0rem";
    } else {
      document.querySelector(".social-wrapper").style.marginLeft = "-4rem";
      target.style.marginLeft = "-4rem";
    }

    socialsToggle = !socialsToggle;
  });

const displayRepos = async () => {
  const repos = await (
    await fetch("https://api.github.com/users/Athever21/repos")
  ).json();
  repos.reverse().forEach((rep) => displayRepo(rep));
};

displayRepos();

const projects = document.querySelector(".projects");
const text = projects.querySelector("p");


const ce = document.createElement.bind(document);

function displayRepo(rep) {
  if (rep.name === "Portfolio") return;

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
    ["php", "8993be"],
  ];
  const color = colors.find((x) => x[0] === text.toLowerCase());
  circle.style.background = `#${color[1]}`;

  lang.innerHTML = text;

  target.appendChild(lang);
  target.appendChild(circle);
}
