const starcontainer = document.getElementById("star-display");

function star(count, callback) {
  const Fragment = document.createDocumentFragment();
  for (let i = 1; i <= count; i++) {
    const newelem = document.createElement("i");
    newelem.classList.add("fa");
    newelem.classList.add("fa-star-o");
    newelem.dataset.returnValue = i;
    Fragment.appendChild(newelem);
  }
  starcontainer.appendChild(Fragment);

  starcontainer.addEventListener("mouseover", mouseover);
  starcontainer.addEventListener("click", onClick);
  starcontainer.addEventListener("mouseleave", mouseleave);

  function mouseover(e) {
    const returnValue = e.target.dataset.returnValue;
    if (!returnValue) {
      return;
    } else {
      fill(returnValue);
    }
  }

  function mouseleave(e) {
    fill(active);
  }

  function onClick(e) {
    active = e.target.dataset.returnValue;
    fill(active);
    callback(active);
  }

  function fill(ratingValue) {
    for (let i = 0; i < count; i++) {
      if (i < ratingValue) {
        starcontainer.children[i].classList.add("fa-star");
      } else {
        starcontainer.children[i].classList.remove("fa-star");
      }
    }
  }
}

function getStar(value) {
  document.getElementById("rating").innerHTML = value;
}

star(5, getStar);
