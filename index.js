const items = [
  'https://picsum.photos/500/300/?random=1',
  'https://picsum.photos/500/300/?random=2',
  'https://picsum.photos/500/300/?random=3',
  'https://picsum.photos/500/300/?random=4',
  'https://picsum.photos/500/300/?random=5',
  'https://picsum.photos/500/300/?random=6',
];

(function () {
  let counter = 0;

  function modalWindow() {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    modal.style.display = 'block';
    modalImg.src = this.src;
    modalImg.id = this.id;
    captionText.innerHTML = this.alt;
  }

  const generateContent = () => {
    const root = document.getElementById('root');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const h1 = document.createElement('h1');
    h1.classList.add('h1-title');
    h1.textContent = 'Gallery';

    const img = document.createElement('img');
    img.setAttribute('id', counter);
    img.classList.add('photos');
    img.addEventListener('click', modalWindow);
    img.src = 'https://picsum.photos/500/300/?random=0';
    wrapper.append(img);
    root.prepend(h1, wrapper);
  };

  generateContent();

  const deleteClass = (arg) => {
    const elem = document.querySelector(`.photos.${arg}`);
    elem.classList.remove(arg);
  };

  const generateNewPhoto = (arg, arg2) => {
    const newImg = document.createElement('img');
    newImg.setAttribute('id', arg);
    newImg.classList.add('photos', arg2);
    newImg.src = items[arg];
    newImg.alt = items[arg];
    newImg.addEventListener('click', modalWindow);
    document.querySelector('.wrapper').append(newImg);
    setTimeout(() => {
      deleteClass(arg2);
    }, 100);
  };

  const changeOpacity = (ind) => {
    const change = document.getElementsByClassName('img-gallery')[ind];
    change.classList.add('opas');
  };

  const deleteOpacity = () => {
    for (let i = 0; i <= items.length - 1; i += 1) {
      if (
        document
          .getElementsByClassName('img-gallery')[i].classList.contains('opas')
      ) {
        document
          .getElementsByClassName('img-gallery')[i].classList.remove('opas');
      }
    }
    changeOpacity(counter);
  };

  function forwardNext() {
    counter += 1;
    if (counter >= items.length) counter = 0;
    document.querySelector('.photos').classList.add('img-shift');
    setTimeout(() => {
      document.querySelector('.photos').remove();
      generateNewPhoto(counter, 'img-shift2');
    }, 300);
    deleteOpacity();
  }

  function forwardPrew() {
    counter -= 1;
    if (counter < 0) counter = items.length - 1;
    document.querySelector('.photos').classList.add('img-unshift');
    setTimeout(() => {
      document.querySelector('.photos').remove();
      generateNewPhoto(counter, 'img-unshift2');
    }, 300);
    deleteOpacity();
  }

  document.querySelector('.btn-prev').addEventListener('click', forwardPrew);
  document.querySelector('.btn-next').addEventListener('click', forwardNext);

  const firstOpacity = () => {
    document.getElementsByClassName('img-gallery')[0].classList.add('opas');
  };

  const targetPhoto = (e) => {
    counter = Number(e.currentTarget.id);
    document.querySelector('.photos').remove();
    generateNewPhoto(counter, 'img-shift2');
    deleteOpacity();
  };

  const createGallery = () => {
    const gallery = document.querySelector('.gallery');
    items.forEach((el, ind) => {
      const img = document.createElement('img');
      img.src = el;
      img.setAttribute('id', ind);
      img.classList.add('img-gallery');
      img.addEventListener('click', (e) => {
        targetPhoto(e);
      });
      gallery.append(img);
    });
  };

  createGallery();
  firstOpacity();
}());

const span = document.getElementsByClassName('close')[0];

span.onclick = function () {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
};

function forwardRight() {
  const currentImg = document.querySelector('.modal-content');
  const attributeValue = currentImg.getAttribute('id');
  console.log(Number(attributeValue));
  // counter += 1;
  //   if (counter >= items.length) counter = 0;
  currentImg.classList.add('img-shift-modal');
  setTimeout(() => {
    currentImg.remove();
  }, 300);
}

const arrowRight = document.querySelector('.arrow-right');
arrowRight.addEventListener('click', forwardRight);
