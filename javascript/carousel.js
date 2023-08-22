const SHOWING_CLASS = "showing";
const HIDDEN_CLASS = "hidden";

const dots = Array.from(document.getElementsByClassName("dot"));
const carouselItems = Array.from(
  document.getElementsByClassName("carousel_item")
);

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const firstImg = document.querySelector(".carousel_item:first-child");
const lastImg = document.querySelector(".carousel_item:last-child");
// const currentImg = document.querySelector(`.${SHOWING_CLASS}`);
// currentImg를 전역에 선언하면 안되는 이유는, 함수 실행시, currentImg 즉, showing 클래스 가진 element가 바뀌더라도,
// 전역변수의 값은 그대로이므로 계속 똑같은 첫번째 이미지가 currentImg로 된다.

function onClickDotBtn(event) {
  const dotsIndex = dots.indexOf(event.target);
  const currentImg = document.querySelector(`.${SHOWING_CLASS}`);
  if (currentImg) {
    currentImg.classList.remove(SHOWING_CLASS);
    currentImg.classList.add(HIDDEN_CLASS);
    const chosenCarousel = carouselItems[dotsIndex];
    if (chosenCarousel) {
      chosenCarousel.classList.add(SHOWING_CLASS);
      chosenCarousel.classList.remove(HIDDEN_CLASS);
    }
  }
}

function onRightImgChange(e) {
  const currentImg = document.querySelector(`.${SHOWING_CLASS}`);
  if (currentImg) {
    currentImg.classList.remove(SHOWING_CLASS);
    currentImg.classList.add(HIDDEN_CLASS);
    const nextImg = currentImg.nextElementSibling;
    if (nextImg) {
      nextImg.classList.add(SHOWING_CLASS);
      nextImg.classList.remove(HIDDEN_CLASS);
    } else {
      firstImg.classList.add(SHOWING_CLASS);
      firstImg.classList.remove(HIDDEN_CLASS);
    }
  }
}

function onLeftImgChange(e) {
  const currentImg = document.querySelector(`.${SHOWING_CLASS}`);
  if (currentImg) {
    currentImg.classList.remove(SHOWING_CLASS);
    currentImg.classList.add(HIDDEN_CLASS);
    const previousImg = currentImg.previousElementSibling;
    if (previousImg) {
      previousImg.classList.add(SHOWING_CLASS);
      previousImg.classList.remove(HIDDEN_CLASS);
    } else {
      lastImg.classList.add(SHOWING_CLASS);
      lastImg.classList.remove(HIDDEN_CLASS);
    }
  }
}

function currenBackground() {
  firstImg.classList.add(SHOWING_CLASS);
  firstImg.classList.remove(HIDDEN_CLASS);
}

leftArrow.addEventListener("click", onLeftImgChange);
rightArrow.addEventListener("click", onRightImgChange);
currenBackground();

dots.forEach((item) => item.addEventListener("click", onClickDotBtn));

// 코드 리뷰 받아서 수정한 코드
/* function onClickDotBtn(event) {
  const dotsIndex = dots.indexOf(event.target);
  displayImage(false, false, dotsIndex);
}

function onRightImgChange(e) {
  displayImage(true, false);
}

function onLeftImgChange(e) {
  displayImage(false, true);
}

function displayImage(isRight = false, isLeft = false, dotsIndex) {
  const currentImg = document.querySelector(.${SHOWING_CLASS});
  if (currentImg) {
      currentImg.classList.remove(SHOWING_CLASS);
      currentImg.classList.add(HIDDEN_CLASS);
      let selectedImage = null; 
      if (isRight) {
          selectedImage = currentImg.nextElementSibling ? currentImg.nextElementSibling : firstImg;
      } else if (isLeft) {
          selectedImage = currentImg.previousElementSibling ? currentImg.previousElementSibling : lastImg;
      } else {
          if (dotsIndex !== undefined && dotsIndex !== null) {
              selectedImage = carouselItems[dotsIndex];
          }
      }
      if (selectedImage) {
          selectedImage.classList.add(SHOWING_CLASS);
          selectedImage.classList.remove(HIDDEN_CLASS);
      }
  }
} */
