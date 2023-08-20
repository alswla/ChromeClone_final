const inbox = document.querySelector(".goToInbox");
const today = document.querySelector(".goToToday");
const upcoming = document.querySelector(".goToUpcoming");

inbox.addEventListener("click", (e) => {
  window.location.href =
    "/Users/chloe/Desktop/Nomad coder/vanillajs_nomadcoder_2023/html/main.html";
});

today.addEventListener("click", (e) => {
  window.location.href =
    "/Users/chloe/Desktop/Nomad coder/vanillajs_nomadcoder_2023/html/calendar.html";
  document.title = "당신의 오늘은";
});

upcoming.addEventListener("click", (e) => {
  window.location.href =
    "/Users/chloe/Desktop/Nomad coder/vanillajs_nomadcoder_2023/html/calendar.html";
});
