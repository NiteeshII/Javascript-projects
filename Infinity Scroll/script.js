const apiKey = "jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek";
let count = 30;
let imagesloaded = 0;
let totalimages = 0;
let photoArray = [];
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader-img");

function imageLoad() {
  imagesloaded++;
  if (totalimages === imagesloaded) {
    ready = true;
    loader.hidden = true;
  }
}

function setattributes(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

function displayPhotos() {
  imagesloaded = 0;
  totalimages = photoArray.length;
  for (let i = 0; i < photoArray.length; i++) {
    const img = document.createElement("img");
    setattributes(img, {
      src: photoArray[i]?.urls.regular,
      alt: photoArray[i]?.alt_description,
      title: photoArray[i]?.alt_description,
    });

    const linktag = document.createElement("a");
    setattributes(linktag, {
      href: photoArray[i]?.links.html,
      target: "_blank",
    });

    img.addEventListener("load", imageLoad);
    linktag.appendChild(img);

    imageContainer.appendChild(linktag);
  }
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    console.log(photoArray);
    displayPhotos();
  } catch (error) {
    console.log(error, "error");
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
