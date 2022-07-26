const thumbnails = document.querySelectorAll('.thumbnail img');
const popup = document.querySelector('.popup');
const popup_img = document.querySelector('.popup__img')
const popup_close = document.querySelector('.popup__close');
const arrow_left = document.querySelector('.popup__arrow--left');
const arrow_right = document.querySelector('.popup__arrow--right');
const imgIndex = document.querySelector('.imgIndex');

let currentImgIndex;
let imgNumber = currentImgIndex + 1;
let imgCount = thumbnails.length;

const nextImg = () => {
        if(currentImgIndex === thumbnails.length - 1){
            currentImgIndex = 0;
        } else {
            currentImgIndex++;
        }
        popup_img.src = thumbnails[currentImgIndex].src;

        imgNumber = currentImgIndex + 1;
        imgIndex.innerHTML = imgNumber + "/" + imgCount;
    }

const prevImg = () => {
        if(currentImgIndex === 0){
            currentImgIndex = thumbnails.length - 1;
        } else {
            currentImgIndex--;
        }
        popup_img.src = thumbnails[currentImgIndex].src;

        imgNumber = currentImgIndex + 1;
        imgIndex.innerHTML = imgNumber + "/9";
    }

const closeImg = () => {
    popup.classList.add('fade-out');
    setTimeout(() => {
        popup.classList.add('hidden');
        popup.classList.remove('fade-out');
        thumbnails.forEach(element => {
            element.setAttribute("tabIndex", 1)
        })
    }, 500)
}

thumbnails.forEach((thumbnail, index) => {

    const showImg = () => {
        popup.classList.remove('hidden');
        popup_img.src = thumbnail.src; 
        currentImgIndex = index;

        imgNumber = currentImgIndex + 1;
        imgIndex.innerHTML = imgNumber + "/9";

        thumbnails.forEach(element => {
            element.setAttribute("tabIndex", -1)
        })
    }

    thumbnail.addEventListener('click', showImg);

    thumbnail.addEventListener('keydown', (e) => {
        if(e.code === "Enter" || e.keyCode === 13){
            showImg(e);
        }
    })
});

popup_close.addEventListener('click', closeImg);

arrow_left.addEventListener('click', prevImg);

arrow_right.addEventListener('click', nextImg);

document.addEventListener('keydown', (e) => {
    if(!popup.classList.contains('hidden')){
        if(e.key === "ArrowRight" || e.keyCode === 39){
            nextImg();
        }
    
        if(e.key === "ArrowLeft" || e.keyCode === 37){
            prevImg();
        }
    
        if(e.key === "Escaoe" || e.keyCode === 27){
            closeImg();
        }
    }
});

popup.addEventListener('click', (e) => {
    if(e.target === popup) {
        closeImg();
    }
});