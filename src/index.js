console.log('%c HI', 'color: firebrick')

function breedsDisplay(breeds, ul) {
  breeds.forEach(breed => {
    const li = document.createElement('li');
    li.setAttribute('data-breed', breed)
    li.textContent = breed;
    li.addEventListener("click", () => {
      li.innerHTML = `<font color="red">${li.innerHTML}</font>`
    })
    ul.appendChild(li);
  });
}


function breedFilter(array, letter = '') {
  if (letter == '') {
    return array;
  } else {
    return array.filter(breed => {
      return breed.startsWith(letter);
    });
  }
}

function fetchBreeds(breedUrl, ul, filter = 'a') {
  fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {
      let breedArray = Object.keys(json.message);
      breedArray = breedFilter(breedArray, filter);
      breedsDisplay(breedArray, ul);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  const ul = document.getElementById("dog-breeds");
  fetch(imgUrl)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (json) {
      json.message.forEach(image => {
        const img = document.createElement('img');
        img.setAttribute("src", image);
        document.body.appendChild(img);
      });
      fetchBreeds(breedUrl, ul)
    });


  const dropdown = document.getElementById('breed-dropdown')
  dropdown.addEventListener('change', () => {
    ul.innerHTML = "";
    fetchBreeds(breedUrl, ul, dropdown.value);
  });
});