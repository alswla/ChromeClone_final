function handleEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // 기본 엔터 동작 방지

    const usernameInput = document.getElementById("usernameInput");
    const username = usernameInput.value.trim();

    if (username !== "") {
      // 입력된 값이 공백이 아닌 경우에만 페이지 전환
      window.location.href =
        "html/calendar.html";
      localStorage.setItem("username", username);
    }
  }
}
