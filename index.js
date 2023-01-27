/// [nav]
(($) =>
  // Begin jQuery
  $(function () {
    // DOM ready
    // If a link has a dropdown, add sub menu toggle.
    $("nav ul li a:not(:only-child)").click(function (e) {
      $(this).siblings(".nav-dropdown").toggle();
      // Close one dropdown when selecting another
      $(".nav-dropdown").not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $("html").click(() => $(".nav-dropdown").hide());
    // Toggle open and close nav styles on click
    $("#nav-toggle").click(() => $("nav ul").slideToggle());
    // Hamburger to X toggle
    $("#nav-toggle").on("click", () => this.classList.toggle("active"));

    const mq = window.matchMedia("(max-width: 800px)");
    $("nav ul li").click(() => {
      if (mq.matches) {
          $("nav ul").slideToggle();
      }
  });

  }))(jQuery); // end jQuery

/// [clients]
fetch("data/ClientsList.json")
  .then((response) => response.json())
  .then((data) => {
    const clientsContainer = document
      .getElementById("clients")
      .querySelector(".clients");
    data.forEach((client) => {
      const newClient = document.createElement("a");
      newClient.className = "client";
      newClient.href = client.url;
      const img = document.createElement("img");
      img.src = `images/clients/${client.logo}`;
      img.alt = client.name;
      newClient.appendChild(img);
      clientsContainer.appendChild(newClient);
    });
  });

/// [services]
fetch("data/ServicesData.json")
  .then((response) => response.json())
  .then((data) => {
    const servicesContainer = document
      .getElementById("services")
      .querySelector(".services-grid");
    data.forEach((service) => {
      const newService = document.createElement("div");
      newService.className = "services-item";
      const img = document.createElement("img");
      img.className = "service-icon";
      img.src = `images/services/${service.img}`;
      const title = document.createElement("h3");
      title.textContent = service.title;
      const desc = document.createElement("p");
      desc.textContent = service.desc;
      const detailContainer = document.createElement("div");
      detailContainer.className = "services-details";
      detailContainer.appendChild(title);
      detailContainer.appendChild(desc);
      newService.appendChild(img);
      newService.appendChild(detailContainer);
      servicesContainer.appendChild(newService);
    });
  });

/// [Projects]

fetch("data/ProjectsData.json")
  .then((response) => response.json())
  .then((data) => {
    const carouselContainer = document
      .getElementById("projects")
      .querySelector("#projects-carousel");
    data.forEach((project) => {
      const newProject = document.createElement("div");
      newProject.className = "carousel-item";
      const img = document.createElement("img");
      img.src = `images/projects/${project.img}`;
      img.alt = project.title;
      const title = document.createElement("h3");
      title.textContent = project.title;
      const desc = document.createElement("p");
      desc.textContent = project.desc;
      const detailContainer = document.createElement("div");
      detailContainer.className = "carousel-details";
      detailContainer.appendChild(title);
      detailContainer.appendChild(desc);
      newProject.appendChild(img);
      newProject.appendChild(detailContainer);
      const link = document.createElement("a");
      link.className = "project-link";
      link.target = "_blank";
      link.href = project.link;
      link.textContent = "View Project";
      newProject.appendChild(link);
      carouselContainer.appendChild(newProject);
    });

    // Select the dynamic carousel items
    carouselItems = document.querySelectorAll(".carousel-item");
    currentIndex = 0;
    updateCarousel();
  })
  .catch((error) => {
    console.error("Error fetching JSON data:", error);
  });

document
  .querySelector(".carousel-button-prev")
  .addEventListener("click", function () {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = carouselItems.length - 1;
    }
    updateCarousel();
  });

document
  .querySelector(".carousel-button-next")
  .addEventListener("click", function () {
    currentIndex++;
    if (currentIndex >= carouselItems.length) {
      currentIndex = 0;
    }
    updateCarousel();
  });

function updateCarousel() {
  carouselItems.forEach(function (item) {
    item.style.display = "none";
  });
  $(carouselItems[currentIndex]).animate({opacity: '0'}, 0);
  carouselItems[currentIndex].style.display = "flex";
  $(carouselItems[currentIndex]).animate({opacity: '1'});
}

/// [Testimonials]

fetch('data/TestimonialsData.json')
  .then(response => response.json())
  .then(data => {
    data.forEach((client) => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('client-item');
      carouselItem.innerHTML = `
        <div class="client-img-wrapper">
          <img class="client-img" src="${client.image}" alt="${client.name}">
        </div>
        <h3 class="client-title">${client.name}</h3>
        <h4 class="client-subtitle">${client.subtitle}</h4>
        <p class="client-text">${client.text}</p>
      `;
      document.querySelector('#carousel-inner').appendChild(carouselItem);
    });

    // Select the dynamic carousel items
    testimonialItems = document.querySelectorAll(".client-item");
    currentTestimonial = 0;
    updateTestimonialCarousel();
  });

  document
  .querySelector(".prev-button")
  .addEventListener("click", function () {
    currentTestimonial--;
    if (currentTestimonial < 0) {
      currentTestimonial = testimonialItems.length - 1;
    }
    updateTestimonialCarousel();
  });

document
  .querySelector(".next-button")
  .addEventListener("click", function () {
    currentTestimonial++;
    if (currentTestimonial >= testimonialItems.length) {
      currentTestimonial = 0;
    }
    updateTestimonialCarousel();
  });

function updateTestimonialCarousel() {
  testimonialItems.forEach(function (item) {
    item.style.display = "none";
  });
  $(testimonialItems[currentTestimonial]).animate({opacity: '0'}, 0);
  testimonialItems[currentTestimonial].style.display = "flex";
  $(testimonialItems[currentTestimonial]).animate({opacity: '1'});
}

// Cursor effect
const { gsap, CircleType } = window;

const cursorOuter = document.querySelector(".cursor--large");
const cursorInner = document.querySelector(".cursor--small");
const cursorTextContainerEl = document.querySelector(".cursor--text");
const cursorTextEl = cursorTextContainerEl.querySelector(".text");

const hoverItems = document.querySelectorAll(".cursor-hover-item");
const hoverEffectDuration = 0.3;
let isHovered = false;
let initialCursorHeight;

const cursorRotationDuration = 8;

let circleType = new CircleType(cursorTextEl);
circleType.radius(50);

setTimeout(() => {
  initialCursorHeight = circleType.container.style.getPropertyValue("height");
  console.log(initialCursorHeight);
}, 50);

hoverItems.forEach((item) => {
  item.addEventListener("pointerenter", handlePointerEnter);
  item.addEventListener("pointerleave", handlePointerLeave);
});

let mouse = {
  x: -100,
  y: -100
};

document.body.addEventListener("pointermove", updateCursorPosition);

function updateCursorPosition(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}

function updateCursor() {
  gsap.set([cursorInner, cursorTextContainerEl], {
    x: mouse.x,
    y: mouse.y
  });

  gsap.to(cursorOuter, {
    duration: 0.15,
    x: mouse.x,
    y: mouse.y
  });

  if (!isHovered) {
    gsap.to(cursorTextContainerEl, hoverEffectDuration * 0.5, {
      opacity: 0
    });
    gsap.set(cursorTextContainerEl, {
      rotate: 0
    });
  }

  requestAnimationFrame(updateCursor);
}

updateCursor();

function handlePointerEnter(e) {
  isHovered = true;

  const target = e.currentTarget;
  updateCursorText(target);

  gsap.set([cursorTextContainerEl, cursorTextEl], {
    height: initialCursorHeight,
    width: initialCursorHeight
  });

  gsap.fromTo(
    cursorTextContainerEl,
    {
      rotate: 0
    },
    {
      duration: cursorRotationDuration,
      rotate: 360,
      ease: "none",
      repeat: -1
    }
  );

  gsap.to(cursorInner, hoverEffectDuration, {
    scale: 2
  });

  gsap.fromTo(
    cursorTextContainerEl,
    hoverEffectDuration,
    {
      scale: 1.2,
      opacity: 0
    },
    {
      delay: hoverEffectDuration * 0.75,
      scale: 1,
      opacity: 1
    }
  );
  gsap.to(cursorOuter, hoverEffectDuration, {
    scale: 1.2,
    opacity: 0
  });
}

function handlePointerLeave() {
  isHovered = false;
  gsap.to([cursorInner, cursorOuter], hoverEffectDuration, {
    scale: 1,
    opacity: 1
  });
}

function updateCursorText(textEl) {
  const cursorTextRepeatTimes = textEl.getAttribute("data-cursor-text-repeat");
  const cursorText = returnMultipleString(
    textEl.getAttribute("data-cursor-text"),
    cursorTextRepeatTimes
  );

  circleType.destroy();

  cursorTextEl.innerHTML = cursorText;
  circleType = new CircleType(cursorTextEl);
}

function returnMultipleString(string, count) {
  let s = "";
  for (let i = 0; i < count; i++) {
    s += ` ${string} `;
  }
  return s;
}