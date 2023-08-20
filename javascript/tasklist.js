const addTodayListBtn = document.querySelector(".addTodayBtn");
const addTodayContainer = document.querySelector(".add-today-container");
const addTodayListCloseBtn = document.querySelector(".today.close");
const addTodayTitle = document.querySelector(".today-title");
const addTodayStart = document.querySelector(".today-time-start");
const addTodayEnd = document.querySelector(".today-time-end");
const addtodaySubmit = document.querySelector(".add-today-btn");
const deletetodayBtn = document.querySelector(".delete");

const todayLists = document.querySelector(".today-task-all");
let todaydate = new Date();
let datenow = new Date().getDate();
let datemonth = todaydate.getMonth();
let dateyear = todaydate.getFullYear();

let todayArr = [];
// const todayArr = [
//   {
//     date: todaydate.getDate(),
//     month: todaydate.getMonth() + 1,
//     year: todaydate.getFullYear(),
//     tasks: [
//       {
//         title: "Event 1. this is an example task ",
//         time: "11:00 AM",
//       },
//       {
//         title: "Event 2.this is an example task",
//         time: "12:00 PM",
//       },
//     ],
//   },
// ];

// --------------------------------------------------
// 입력창 토글
// --------------------------------------------------
addTodayListBtn.addEventListener("click", () => {
  addTodayContainer.classList.toggle("active");
});
// task 세부입력창 x 버튼 누르면 없어지도록
addTodayListCloseBtn.addEventListener("click", () => {
  addTodayContainer.classList.remove("active");
});
// 외부 누르면 입력창 없어지도록
document.addEventListener("click", (e) => {
  if (e.target !== addTodayListBtn && !addTodayContainer.contains(e.target)) {
    addTodayContainer.classList.remove("active");
  }
});

// --------------------------------------------------
/* 입력창 입력포맷 내용 추가 */
// --------------------------------------------------
// (1) todo task title 글자수 제한
// --------------------------------------------------
addTodayTitle.addEventListener("input", (e) => {
  addTodayTitle.value = addTodayTitle.value.slice(0, 50);
});
// --------------------------------------------------
// (2) 시간 부분 포맷
// 시작시간
// --------------------------------------------------
addTodayStart.addEventListener("input", (e) => {
  // 숫자와 : 기호 아닌 것 모두 삭제
  addTodayStart.value = addTodayStart.value.replace(/[^0-9:]/g, "");

  // start 시간에 2개의 값 입력되었을시 자동으로 : 추가
  if (addTodayStart.value.length === 2) {
    addTodayStart.value += ":";
  }
  // start 시간에 5개보다 많이 입력되었을시 인덱스 5전 까지만 복사하여 반환(인덱스 5 전 => 4 즉, 5개)
  if (addTodayStart.value.length > 5) {
    addTodayStart.value = addTodayStart.value.slice(0, 5);
  }
});

// 종료시간 - start 복사해서 변수만 변경
// --------------------------------------------------
addTodayEnd.addEventListener("input", (e) => {
  addTodayEnd.value = addTodayEnd.value.replace(/[^0-9:]/g, "");

  if (addTodayEnd.value.length === 2) {
    addTodayEnd.value += ":";
  }
  if (addTodayEnd.value.length > 5) {
    addTodayEnd.value = addTodayEnd.value.slice(0, 5);
  }
});

// todo 업데이트 기능 --------------------------------------------------
/* 해당 날짜의 todo task를 보여주는 함수(날짜별 todo list 불러오는 것) */

// --------------------------------------------------
// 일자 변경시마다 todo list 업데이트 및 표시 && 혹은 무언가 추가됐을때마다 / 삭제될때마다 업데이트 표시 PART
// ==> 이후 localStorage  저장관련 함수 추가
// --------------------------------------------------

function updateTodaylists(datenow) {
  let todayTasks = "";
  todayArr.forEach((todayObj) => {
    if (
      datenow === todayObj.date &&
      datemonth + 1 === todayObj.month &&
      dateyear === todayObj.year
    ) {
      todayObj.tasks.forEach((task) => {
        todayTasks += `
                <div class="today-task-all">
                  <div class="today-contents">
                    <span class="check">
                      <i class="fa-solid fa-check"></i>
                    </span>
                    <h3 class="today-task-title">${task.title}</h3>
                    <i class="fa-solid fa-delete-left delete"></i>
                  </div>
                  <div class="today-task-time">${task.time}</div>
                </div>
                `;
      });
    }
  });
  if (todayTasks === "") {
    todayTasks = `
      <div class="no-todo">
        <h3 class="todo-title">No Tasks</h3>
      </div>
      `;
  }
  todayLists.innerHTML = todayTasks;
  // 날짜 변경시마다 업데이트 됐으므로 저장이 필요하며
  // task가 없더라도 todo 추가 혹은 삭제 함수 실행 후 다시 화면 업데이트를 위해 해당함수를 사용함
  // 이 경우를 위해서라도 saveTodoInStorage는 필요함
  //   saveTodoInStoarge();
  // getTodoFromStorage();는 이미 제일 처음 자바스크립트 시작시 불러왔으므로 todoArr에 저장되어
  // updateTodolist (현재함수) 실행하기만 해도 알아서 나타남
}

// today todo 내용 추가 기능 --------------------------------------------------
/* today task 입력창을 통해 task 추가하는 함수 */

// --------------------------------------------------
// add 버튼 누르면 todo-list 클래스 div에 들어가도록 (column으로 나타난 것)
// --------------------------------------------------
addtodaySubmit.addEventListener("click", () => {
  const todayTaskTitle = addTodayTitle.value;
  const todayTaskStart = addTodayStart.value;
  const todayTaskEnd = addTodayEnd.value;

  if (todayTaskTitle === "" || todayTaskStart === "" || todayTaskEnd === "") {
    alert("Please fill all the fields");
    return;
  }

  // --------------------------------------------------
  // 시간변환 함수 (오전 오후)
  // --------------------------------------------------
  function convertTime(time) {
    let timeArr = time.split(":");
    let hour = timeArr[0];
    let min = timeArr[1];
    let timeIndex = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    time = `${hour}:${min} ${timeIndex}`;
    return time;
  }

  const timeStart = convertTime(todayTaskStart);
  const timeEnd = convertTime(todayTaskEnd);
  const newTodayTask = {
    title: todayTaskTitle,
    time: `${timeStart} - ${timeEnd}`,
  };

  let todayTaskAddstatus = false;
  // todo list 일정이 있는지 확인
  if (todayArr.length > 0) {
    // 선택한 날에 이미 일정이 있다면 새로운 task arr에 push
    todayArr.forEach((todayObj) => {
      if (
        todayObj.date === datenow &&
        todayObj.month === datemonth + 1 &&
        todayObj.year === dateyear
      ) {
        todayObj.tasks.push(newTodayTask);
        todayTaskAddstatus = true;
      }
    });
  }
  // --------------------------------------------------
  // 일정 없으면 새로 만든게 들어가도록
  // --------------------------------------------------
  if (!todayTaskAddstatus) {
    todayArr.push({
      date: datenow,
      month: datemonth + 1,
      year: dateyear,
      tasks: [newTodayTask],
    });
  }

  // task 입력 및 add 버튼 누르면 => 입력창 닫기 & 입력창 내용 초기화
  addTodayContainer.classList.remove("active");
  addTodayTitle.value = "";
  addTodayStart.value = "";
  addTodayEnd.value = "";

  // 일정 새로 추가했으니 업데이트된 일정 보여주도록 showTodoLists함수 재실행

  updateTodaylists(datenow);
});

/* 7.
  일정을 삭제하는 함수 */
todayLists.addEventListener("click", (e) => {
  // if (e.target.children[0].children[2].classList.contains("delete")) {
  // }
  if (e.target.classList.contains("today-task-all")) {
    const deleteTodayTask = e.target.children[0].children[1].innerHTML;
    todayArr.forEach((todayObj) => {
      if (
        todayObj.date === datenow &&
        todayObj.month === datemonth + 1 &&
        todayObj.year === dateyear
      ) {
        todayObj.tasks.forEach((item, index) => {
          if (item.title === deleteTodayTask) {
            todayObj.tasks.splice(index, 1);
          }
        });
        if (todayObj.tasks.length === 0) {
          todayArr.splice(todayArr.indexOf(todayObj), 1);
          const datenowEl = document.querySelector(".select");
          if (datenowEl.classList.contains("today-task-all")) {
            datenowEl.classList.remove("today-task-all");
          }
        }
      }
    });
    updateTodaylists(datenow); // showTodoList에서 local 저장하는 함수 실행되므로 여기서는 추가 필요 없음
  }
});
