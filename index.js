const items = [
  'https://picsum.photos/500/300/?random=1',
  'https://picsum.photos/500/300/?random=2',
  'https://picsum.photos/500/300/?random=3',
  'https://picsum.photos/500/300/?random=4',
  'https://picsum.photos/500/300/?random=5',
  'https://picsum.photos/500/300/?random=6',
];

(function () {
  let COUNTER = 0;
  let COUNTER_SLIDER = 0;

  function modalWindow() {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    modal.style.display = 'block';
    modalImg.src = this.src;
    modalImg.id = this.id;
    captionText.innerText = this.src;
  }

  const generateContent = () => {
    const root = document.getElementById('root');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const h1 = document.createElement('h1');
    h1.classList.add('h1-title');
    h1.textContent = 'Gallery';

    const img = document.createElement('img');
    img.setAttribute('id', COUNTER);
    img.classList.add('photos');
    img.addEventListener('click', modalWindow);
    img.src = 'https://picsum.photos/500/300/?random=0';
    wrapper.append(img);
    root.prepend(h1, wrapper);
  };

  generateContent();

  const deleteClass = (arg1, arg2) => {
    const elem = document.querySelector(`${arg1}.${arg2}`);
    elem.classList.remove(arg2);
  };

  const generateNewPhoto = (arg, arg2, arg3) => {
    const newImg = document.createElement('img');
    newImg.setAttribute('id', arg);
    newImg.classList.add(arg3, arg2);
    newImg.src = items[arg];
    newImg.alt = items[arg];
    newImg.addEventListener('click', modalWindow);
    document.querySelector('.wrapper').append(newImg);
    setTimeout(() => {
      deleteClass('.photos', arg2);
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
    changeOpacity(COUNTER);
  };

  function forwardNext() {
    COUNTER += 1;
    if (COUNTER >= items.length) COUNTER = 0;
    document.querySelector('.photos').classList.add('img-shift');
    setTimeout(() => {
      document.querySelector('.photos').remove();
      generateNewPhoto(COUNTER, 'img-shift2', 'photos');
    }, 300);
    deleteOpacity();
  }

  function forwardPrew() {
    COUNTER -= 1;
    if (COUNTER < 0) COUNTER = items.length - 1;
    document.querySelector('.photos').classList.add('img-unshift');
    setTimeout(() => {
      document.querySelector('.photos').remove();
      generateNewPhoto(COUNTER, 'img-unshift2', 'photos');
    }, 300);
    deleteOpacity();
  }

  document.querySelector('.btn-prev').addEventListener('click', forwardPrew);
  document.querySelector('.btn-next').addEventListener('click', forwardNext);

  const firstOpacity = () => {
    document.getElementsByClassName('img-gallery')[0].classList.add('opas');
  };

  const targetPhoto = (e) => {
    COUNTER = Number(e.currentTarget.id);
    document.querySelector('.photos').classList.add('img-shift');
    setTimeout(() => {
      document.querySelector('.photos').remove();
      generateNewPhoto(COUNTER, 'img-shift2', 'photos');
    }, 300);
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

  const span = document.getElementsByClassName('close')[0];

  span.onclick = function () {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  };

  function generatePhotoForSlider(arg, arg2, arg3) {
    const newImg = document.createElement('img');
    newImg.setAttribute('id', arg);
    newImg.classList.add(arg3, arg2);
    newImg.src = items[arg];
    newImg.alt = items[arg];
    newImg.style.animation = 'none';
    document.querySelector('.modal-wrapper').append(newImg);
    setTimeout(() => {
      deleteClass('.modal-content', arg2);
    }, 300);
  }

  const removeCaption = () => {
    const caption = document.getElementById('caption');
    caption.remove();
  };

  const createCaption = () => {
    const modal = document.getElementById('myModal');
    const caption = document.createElement('div');
    caption.setAttribute('id', 'caption');
    caption.innerText = items[COUNTER_SLIDER];
    modal.append(caption);
  };

  function forwardRight() {
    const currentImg = document.querySelector('.modal-content');
    const attributeValue = currentImg.getAttribute('id');
    COUNTER_SLIDER = Number(attributeValue) + 1;
    if (COUNTER_SLIDER >= items.length) COUNTER_SLIDER = 0;
    currentImg.classList.add('img-shift-modal');
    removeCaption();
    setTimeout(() => {
      currentImg.remove();
      generatePhotoForSlider(COUNTER_SLIDER, 'img-shift2-modal', 'modal-content');
      createCaption();
    }, 300);
  }

  function forwardLeft() {
    const currentImg = document.querySelector('.modal-content');
    const attributeValue = currentImg.getAttribute('id');
    COUNTER_SLIDER = Number(attributeValue) - 1;
    if (COUNTER_SLIDER < 0) COUNTER_SLIDER = items.length - 1;
    currentImg.classList.add('img-unshift-modal');
    removeCaption();
    setTimeout(() => {
      currentImg.remove();
      generatePhotoForSlider(COUNTER_SLIDER, 'img-unshift2-modal', 'modal-content');
      createCaption();
    }, 300);
  }

  const arrowRight = document.querySelector('.arrow-right');
  arrowRight.addEventListener('click', forwardRight);
  const arrowLeft = document.querySelector('.arrow-left');
  arrowLeft.addEventListener('click', forwardLeft);
}());
