const loginBackground = document.querySelector(".login-background");
const loginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector(".username-input");
const loginBtn = document.querySelector(".login-btn");
// const needToShow = document.querySelectorAll(".backward");

const BACKWARD = "backward";
const FIRST = "indexFirst";
const USERNAME_KEY = "username";

function handleLogin(e) {
  e.preventDefault();
  loginBackground.classList.remove(FIRST);
  loginBackground.classList.add(BACKWARD);

  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
}
loginForm.addEventListener("submit", handleLogin);

const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
  loginForm.classList.remove(BACKWARD);
  loginForm.classList.add(FIRST);
  loginForm.addEventListener("submit", onLoginSubmit);
  //   savedUsername === null, 즉 없으면 hidden클래스 삭제하고 addEventListner실행
}
