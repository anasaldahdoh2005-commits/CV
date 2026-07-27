"use strict";

const projects = [
  {
    title: "Angus For Meat",
    label: "موقع ويب لمطعم",
    category: "food",
    categoryLabel: "مطاعم",
    year: "2026",
    description:
      "واجهة متجاوبة لمطعم لحوم تبرز الهوية والأصناف بصريًا، مع تنقّل واضح وتجربة سريعة تساعد الزائر على الوصول إلى ما يريده بسهولة.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://anasaldahdoh2005-commits.github.io/Angus-For-Meat.com/",
    visual: "angus",
    image: "images/restaurant-website.png",
    imageAlt: "واجهة مشروع Angus For Meat",
    featured: true
  },
  {
    title: "مبروك يا جمال",
    label: "تجربة تهنئة تفاعلية",
    category: "experience",
    categoryLabel: "تجارب تفاعلية",
    year: "2026",
    description:
      "صفحة احتفالية صُممت لتوثيق لحظة النجاح بأسلوب دافئ ومؤثر، تجمع الرسائل الشخصية والحركة البصرية ضمن تجربة سلسة على الهاتف والحاسوب.",
    tags: ["Interactive UI", "Responsive", "JavaScript"],
    url: "https://anasaldahdoh2005-commits.github.io/mabrouk-jamal/",
    visual: "congrats",
    image: "images/congratulations-website.png",
    imageAlt: "واجهة مشروع مبروك يا جمال"
  },
  {
    title: "Snounu Restaurant",
    label: "تجربة طلب طعام",
    category: "food",
    categoryLabel: "مطاعم",
    year: "2026",
    description:
      "تجربة رقمية متكاملة لمطعم سنونو تشمل منيو قابل للتصفية، سلة طلبات، حساب الفاتورة، وتجهيز تفاصيل الطلب لإرسالها مباشرة عبر واتساب.",
    tags: ["Dynamic Menu", "Cart", "WhatsApp"],
    url: "https://anasaldahdoh2005-commits.github.io/Snounu-Rest/",
    visual: "snounu",
    image: "images/snounu.jpg",
    imageAlt: "الهوية البصرية لمطعم سنونو"
  },
  {
    title: "أكاديمية النون",
    label: "موقع أكاديمية تدريب",
    category: "product",
    categoryLabel: "منتجات رقمية",
    year: "2026",
    description:
      "واجهة تعريفية احترافية تجمع البرامج التدريبية، مساحات العمل والقاعات في مسار واضح، مع قنوات حجز واستفسار مباشرة عبر الهاتف وواتساب وتليجرام.",
    tags: ["Business Website", "Responsive", "Contact Flow"],
    url: "https://alpha-company-ai.github.io/Noon-Academy/",
    visual: "noon",
    image: "images/noon-academy.jpg",
    imageAlt: "شعار أكاديمية النون",
    imageFit: "contain"
  },
  {
    title: "DevLog AI",
    label: "منتج مدعوم بالذكاء الاصطناعي",
    category: "product",
    categoryLabel: "منتجات رقمية",
    year: "2026",
    description:
      "تطبيق يساعد المستخدم على توثيق إنجازاته وتحويلها إلى منشورات LinkedIn احترافية، مع أنماط كتابة متعددة ولوحة تحكم وسجل منظم للإنجازات.",
    tags: ["AI Product", "Dashboard", "Content Generation"],
    url: "https://anasaldahdoh2005-commits.github.io/DevLog-AI/",
    visual: "devlog",
    image: "images/devlog-ai.png",
    imageAlt: "شعار DevLog AI",
    imageFit: "contain"
  }
];

const projectGrid = document.querySelector("#projects-grid");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const navigationLinks = [...document.querySelectorAll("#primary-navigation a")];
const header = document.querySelector("#site-header");

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

function createProjectCard(project) {
  const article = createElement(
    "article",
    `project-card reveal${project.featured ? " featured" : ""}`
  );
  article.dataset.category = project.category;

  const visual = createElement("div", `project-visual visual-${project.visual}`);
  const image = createElement(
    "img",
    `project-image${project.imageFit === "contain" ? " image-contain" : ""}`
  );
  image.src = project.image;
  image.alt = project.imageAlt;
  image.loading = "lazy";
  image.decoding = "async";
  visual.append(image);

  const content = createElement("div", "project-content");
  const meta = createElement("div", "project-meta");
  meta.append(
    createElement("span"),
    createElement("b", "", project.categoryLabel),
    createElement("span"),
    createElement("b", "", project.year)
  );

  const title = createElement("h3", "", project.title);
  const description = createElement("p", "", project.description);
  const tags = createElement("div", "project-tags");
  project.tags.forEach((tag) => tags.append(createElement("span", "", tag)));

  const link = createElement("a", "project-link", "مشاهدة المشروع");
  link.href = project.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `مشاهدة مشروع ${project.title} في نافذة جديدة`);

  const arrow = createElement("i", "fas fa-arrow-left");
  arrow.setAttribute("aria-hidden", "true");
  link.append(arrow);

  content.append(meta, title, description, tags, link);
  article.append(visual, content);

  return article;
}

function renderProjects(filter = "all") {
  const fragment = document.createDocumentFragment();
  const matchingProjects = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  matchingProjects.forEach((project) => fragment.append(createProjectCard(project)));
  projectGrid.replaceChildren(fragment);
  observeRevealElements(projectGrid.querySelectorAll(".reveal"));
}

function setActiveFilter(selectedButton) {
  filterButtons.forEach((button) => {
    const isActive = button === selectedButton;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderProjects(selectedButton.dataset.filter);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveFilter(button));
});

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "فتح قائمة التنقل");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "فتح قائمة التنقل" : "إغلاق قائمة التنقل");
  navigation.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.13 }
      )
    : null;

function observeRevealElements(elements = document.querySelectorAll(".reveal")) {
  elements.forEach((element) => {
    if (revealObserver) {
      revealObserver.observe(element);
    } else {
      element.classList.add("is-visible");
    }
  });
}

const sectionObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            navigationLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          });
        },
        { rootMargin: "-35% 0px -55%", threshold: 0 }
      )
    : null;

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver?.observe(section);
});

window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 18),
  { passive: true }
);

document.querySelector("#current-year").textContent = new Date().getFullYear();

filterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
});

renderProjects();
observeRevealElements();
