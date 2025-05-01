const gallery = document.getElementById('gallery');
const tabs = document.querySelectorAll('.tab');

const projects = {
  events: [
    "design/Discover.png", "design/Discover-1.png", "design/Discover-2.png", "design/Discover_2.png",
    "design/Discover-3.png", "design/Filter and search-1.png", "design/Filter and search.png", "design/Search.png",
    "design/Search_recent.png", "design/Search_typing.png"
  ],
  learning: [
    "design/LP/1 space.png", "design/LP/1 space resources.png", "design/LP/Resource page.png",
    "design/LP/1 LP overview.png", "design/LP/Wireframe - 1.png", "design/LP/Make resource request.png", "design/LP/Public profile page_hover and expanded.png"
  ],
  co2: [
    "img/co2screen.jpg",
    "https://i.imgur.com/MBpfllS.gif" // Your big video/gif hosted externally
  ]
};

let currentProject = "events";
let currentIndex = 0;

function loadProject(project) {
    gallery.className = `gallery ${project}`; // ✅ ADD THIS!
    gallery.innerHTML = ""; 
    projects[project].forEach((item) => {
      if (item.endsWith('.mp4') || item.endsWith('.gif') || item.includes('i.imgur.com')) {
        const video = document.createElement('img');
        video.src = item;
        gallery.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = item;
        gallery.appendChild(img);
      }
    });
    currentIndex = 0;
    
    setTimeout(() => {
      updateGalleryPosition();
    }, 50);
  }
   

function updateGalleryPosition() {
    const galleryItems = gallery.children;
    if (galleryItems.length > 0) {
      const itemWidth = galleryItems[0].offsetWidth;
      const gap = parseInt(window.getComputedStyle(gallery).gap) || 0;
      const totalShift = currentIndex * (itemWidth + gap);
      gallery.style.transform = `translateX(-${totalShift}px)`;
    }
  }
  

// Button actions
document.getElementById('prev').onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateGalleryPosition();
  }
};
document.getElementById('next').onclick = () => {
  if (currentIndex < projects[currentProject].length - 1) {
    currentIndex++;
    updateGalleryPosition();
  }
};

// Tab actions
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentProject = tab.dataset.project;
    loadProject(currentProject);
  });
});

// Initial Load
loadProject(currentProject);
