const projects = [
  {title:"Todo List",tech:"React · Material UI",description:"A task management application built with React and Material UI. The project focuses on organizing tasks, filtering them and presenting a clean interface.",image:"assets/todo-cover.svg",github:"",note:"Add your repository URL in script.js when it is published."},
  {title:"Jeu X-O",tech:"HTML · CSS · JavaScript",description:"A Tic-Tac-Toe game with an interactive board, two-player gameplay, score tracking and restart controls.",image:"assets/x-o.png",github:"https://github.com/Abdellah-Htet/Jeu-x-o",note:""},
  {title:"Product CRUD",tech:"HTML · CSS · JavaScript",description:"A product management interface demonstrating CRUD operations: create, display, update and delete products.",image:"assets/crudsjs.png",github:"",note:"Add your repository URL in script.js when it is published."},
  {title:"Gestion des employés",tech:"PHP · MySQL",description:"An employee management project using PHP and MySQL to practice server-side forms and database operations.",image:"assets/employees-cover.svg",github:"",note:"Add your repository URL in script.js when it is published."},
  {title:"Taounate Website",tech:"HTML · CSS · Bootstrap",description:"A website presenting Taounate, with sections highlighting the area and its places.",image:"assets/taounate.png",github:"https://github.com/Abdellah-Htet/Taounate-Morroco",note:""},
  {title:"Real Madrid Website",tech:"HTML · CSS · JavaScript",description:"A fan website concept dedicated to Real Madrid, built to practice layout, styling and interactive front-end elements.",image:"assets/madrid-cover.svg",github:"",note:"Add your repository URL in script.js when it is published."},
  {title:"Simple Photoshop",tech:"HTML · CSS · JavaScript",description:"A simple image-editing interface concept with basic visual effects and controls.",image:"assets/photoshop.png",github:"",note:"Add your repository URL in script.js when it is published."},
  {title:"Phone & PC Store",tech:"HTML · CSS",description:"A responsive storefront concept for phones and computers, focused on product presentation and page layout.",image:"assets/store-cover.svg",github:"",note:"Add your repository URL in script.js when it is published."}
];

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

const showMore = document.getElementById("showMore");
showMore.addEventListener("click", () => {
  const extras = document.querySelectorAll(".extra-project");
  const isHidden = extras[0].classList.contains("hidden");
  extras.forEach(card => card.classList.toggle("hidden"));
  showMore.innerHTML = isHidden ? 'Show fewer projects <span>−</span>' : 'Show more projects <span>＋</span>';
});

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalTech = document.getElementById("modalTech");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.getElementById("modalImage");
const modalGithub = document.getElementById("modalGithub");
const modalGithubNote = document.getElementById("modalGithubNote");

document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => {
    const project = projects[Number(button.dataset.project)];
    modalTitle.textContent = project.title;
    modalTech.textContent = project.tech;
    modalDescription.textContent = project.description;
    modalImage.src = project.image;
    modalImage.alt = project.title + " cover";
    if (project.github) {
      modalGithub.href = project.github;
      modalGithub.classList.remove("disabled");
      modalGithub.textContent = "View on GitHub ↗";
      modalGithub.textContent = modalGithubGithubText;
      modalGithubNote.textContent = "";
    } else {
      modalGithub.href = "#";
      modalGithub.classList.add("disabled");
      modalGithub.textContent = "GitHub link not added";
      modalGithubNote.textContent = project.note;
    }
    modal.showModal();
  });
});
document.getElementById("modalClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
contactForm.addEventListener("submit", async event => {
  event.preventDefault();
  const accessKey = "7a79c3e6-f7dc-4bb3-be90-5d8961633ca9";
 
  const submitButton = contactForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  const data = new FormData(contactForm);
  data.append("access_key", accessKey);
  data.append("subject", "New message from Abdellah's portfolio");
  try {
    const response = await fetch("https://api.web3forms.com/submit", {method:"POST", body:data});
    const result = await response.json();
    if (result.success) {
      formStatus.textContent = "Your message has been sent successfully. Thank you!";
      formStatus.style.color = "#86efac";
      contactForm.reset();
    } else {
      formStatus.textContent = result.message || "Something went wrong. Please try again.";
      formStatus.style.color = "#fca5a5";
    }
  } catch (error) {
    formStatus.textContent = "Network error. Please try again later or email me directly.";
    formStatus.style.color = "#fca5a5";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send message <span>↗</span>';
  }
});
// Dark / Light Mode
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeButton();

themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);

    updateThemeButton();
});

function updateThemeButton() {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
}

const typingText = document.getElementById("typing-text");

const roles = [
    "Full Stack Developer",
    "Web Developer",
    "Full Stack Web Developer",
    
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 1500;
        isDeleting = true;
    }

    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// Scroll Progress & Back To Top

const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    // Calculate Scroll Progress
    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / documentHeight) * 100;

    scrollProgress.style.width = progress + "%";

    // Show / Hide Back To Top
    if (scrollTop > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

// Back To Top Click
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});