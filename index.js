/// [clients]
fetch("data/ClientsList.json")
  .then(response => response.json())
  .then(data => {
        const clientsContainer = document.getElementById('clients').querySelector('.clients');
        data.forEach(client => {
            const newClient = document.createElement('a');
      newClient.className = 'client';
      newClient.href = client.url;
            const img = document.createElement('img');
      img.src = `images/clients/${client.logo}`;
      img.alt = client.name;
            newClient.appendChild(img);
            clientsContainer.appendChild(newClient);
    });
  });

/// [services]
fetch('data/ServicesData.json')
.then(response => response.json())
.then(data => {
    const servicesContainer = document.getElementById('services').querySelector('.services-grid');
    data.forEach(service => {
        const newService = document.createElement('div');
    newService.className = 'services-item';
        const img = document.createElement('img');
    img.className = 'service-icon';
    img.src = `images/services/${service.img}`;
        const title = document.createElement('h3');
    title.textContent = service.title;
        const desc = document.createElement('p');
    desc.textContent = service.desc;
        const detailContainer = document.createElement('div');
    detailContainer.className = 'services-details';
        detailContainer.appendChild(title);
    detailContainer.appendChild(desc);
        newService.appendChild(img);
    newService.appendChild(detailContainer);
        servicesContainer.appendChild(newService);
  });
});

/// [Projects]

fetch("data/ProjectsData.json")
  .then(response => response.json())
  .then(data => {
    const carouselContainer = document.getElementById("projects").querySelector("#projects-carousel");
    data.forEach(project => {
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
  .catch(error => {
    console.error("Error fetching JSON data:", error);
  });

document.querySelector(".carousel-button-prev").addEventListener("click", function() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = carouselItems.length - 1;
  }
  updateCarousel();
});

document.querySelector(".carousel-button-next").addEventListener("click", function() {
  currentIndex++;
  if (currentIndex >= carouselItems.length) {
    currentIndex = 0;
  }
  updateCarousel();
});

function updateCarousel() {
  carouselItems.forEach(function(item) {
    item.style.display = "none";
  });
  carouselItems[currentIndex].style.display = "flex";
}