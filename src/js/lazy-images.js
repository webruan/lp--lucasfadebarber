// Dev must change this vars.
const isImageResponsive = true;
const imagePath = './src/images/desktop/';

const imageExtension = ['webp'];

function generateImage(imgNameId, isImageResponsive, callback) {
  let imgMatch = false;

  for(var i = 0; i < imageExtension.length; i++) {
    let ext = imageExtension[i];
    const imgSource = `${imagePath}${imgNameId}.${ext}`;
    const imagesPath = './src/images';
    const finalImg = `${imgNameId}.${ext}`;

    fileExists(imgSource, function (exists) {
      if (exists && !imgMatch) {
        imgMatch = true;
        let imgResult;

        if (isImageResponsive) {
          imgResult = `
            <picture>
              <source media="(min-width: 1200px)" srcset="${imagesPath}/desktop/${finalImg}">
              <source media="(min-width: 768px)" srcset="${imagesPath}/tablet/${finalImg}">
              <source media="(min-width: 320px)" srcset="${imagesPath}/mobile/${finalImg}">
              <img loading="lazy" src="${imagesPath}/desktop/${finalImg}">
            </picture>
          `;
        } else {
          imgResult = `
            <img loading="lazy" src="${imagesPath}/desktop/${finalImg}">
          `;
        }
        callback(imgResult);
      }
    });
  }
}

function fileExists(filePath, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      callback(xhr.status === 200);
    }
  };
  xhr.open('HEAD', filePath, true);
  xhr.send();
}

function isSectionVisible(element) {
  let { top, bottom, left, right } = element.getBoundingClientRect(); 

  let windowHeight = window.innerHeight || document.documentElement.clientHeight;
  let windowWidth = window.innerWidth || document.documentElement.clientWidth;

  let vertInView = (top <= windowHeight) && (bottom >= 0);
  let horInView = (left <= windowWidth) && (right >= 0);

  return vertInView && horInView;
}

function getDocumentElements() {
  let bodyElement = document.getElementsByTagName('body')[0];
  let documentSections = bodyElement.querySelectorAll('section');
  let sectionsList = [];

  const sectionImgs = [];

  documentSections.forEach(section => {
    sectionsList.push(section);
  });

  sectionsList.forEach(section => {
    const sectionInfoObject = {
      sectionTag: section,
      sectionId: section.id,
      images: []
    };
    
    imgDiv = section.getElementsByClassName('img-load');
  
    for (var i = 0; i < imgDiv.length; i++) {
      let divImgNameId = imgDiv[i];

      sectionInfoObject.images.push(divImgNameId);
    };
  
    sectionImgs.push(sectionInfoObject);
  });

  return sectionImgs;
}

function loadImages(sectionImgs) { 
  sectionImgs.forEach(section => {
    if (isSectionVisible(section.sectionTag) && !section.sectionTag.classList.contains('processed')) { 
      section.images.forEach(img => {
        let imgNameId = img.attributes.id.nodeValue;
        let imgDivElement = document.getElementById(imgNameId); 

        if (imgDivElement) {
          generateImage(imgNameId, isImageResponsive, function (html) {
            imgDivElement.innerHTML = html;
          });
        };
      });
      section.sectionTag.classList.add('processed');
    }
  });
}

window.addEventListener('scroll', () => {
  let imgsElement = getDocumentElements();
  loadImages(imgsElement);
});