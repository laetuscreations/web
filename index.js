/// [ Mouse Cursor ]
// const cursorRounded = document.querySelector('.rounded');
// const cursorPointed = document.querySelector('.pointed');


// const moveCursor = (e)=> {
//   const mouseY = e.clientY;
//   const mouseX = e.clientX;
   
//   cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  
//   cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
 
// }

// window.addEventListener('mousemove', moveCursor)


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
      const newClient = document.createElement("div");
      newClient.className = "client";
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
      newService.appendChild(img);
      newService.appendChild(title);
      newService.appendChild(desc);
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
      // newProject.appendChild(detailContainer);
      const link = document.createElement("a");
      link.className = "project-link";
      link.target = "_blank";
      link.href = project.link;
      link.textContent = "View Project";
      // newProject.appendChild(link);
      carouselContainer.appendChild(newProject);
    });

    // Select the dynamic carousel items
    carouselItems = document.querySelectorAll(".carousel-item");
    currentIndex = 0;
    updateCarousel();

    // Set the interval to switch the carousel items
    const intervalTime = 3000; // 3 seconds
    setInterval(nextCarouselItem, intervalTime);
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

function nextCarouselItem() {
  currentIndex++;
  if (currentIndex >= carouselItems.length) {
    currentIndex = 0;
  }
  updateCarousel();
}

function updateCarousel() {
  carouselItems.forEach(function (item) {
    item.style.display = "none";
  });
  $(carouselItems[currentIndex]).animate({ opacity: "0" }, 0);
  carouselItems[currentIndex].style.display = "flex";
  $(carouselItems[currentIndex]).animate({ opacity: "1" });
}


/// [Testimonials]

fetch("data/TestimonialsData.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((client) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("client-item");
      carouselItem.innerHTML = `
        <div class="client-img-wrapper">
          <img class="client-img" src="${client.image}" alt="${client.name}">
        </div>
        <h3 class="client-title">${client.name}</h3>
        <h4 class="client-subtitle">${client.subtitle}</h4>
        <p class="client-text">${client.text}</p>
      `;
      document.querySelector("#carousel-inner").appendChild(carouselItem);
    });

    // Select the dynamic carousel items
    testimonialItems = document.querySelectorAll(".client-item");
    currentTestimonial = 0;
    updateTestimonialCarousel();
  });

document.querySelector(".prev-button").addEventListener("click", function () {
  currentTestimonial--;
  if (currentTestimonial < 0) {
    currentTestimonial = testimonialItems.length - 1;
  }
  updateTestimonialCarousel();
});

document.querySelector(".next-button").addEventListener("click", function () {
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
  $(testimonialItems[currentTestimonial]).animate({ opacity: "0" }, 0);
  testimonialItems[currentTestimonial].style.display = "flex";
  $(testimonialItems[currentTestimonial]).animate({ opacity: "1" });
}

// Send email function
function sendMail() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("msg").value;

  Email.send({
    SecureToken: "f0a1f360-d9ac-4785-a721-5b29bec4428d",
    To: "laetuscreation@gmail.com",
    From: "laetuscreation@gmail.com",
    Subject: `${name} sent you a message from your website`,
    Body: `Name: ${name} <br/> Email: ${email} <br/><br/> Message: ${message}`,
  }).then((message) => {
    if (message == "OK") {
      alert("Your message has been sent. Thank you for contacting us.");
    } else {
      alert("There was an error sending your message. Please try again.");
    }
  });
}

// send mail on submit
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    sendMail();
  });
