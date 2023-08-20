const calendar = document.querySelector(".calendar");
const dateContainer = document.querySelector(".dates");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const monthText = document.querySelector(".month");

let today = new Date();
let selectedDate;
let month = today.getMonth();
let year = today.getFullYear();

const addTodoListBtn = document.querySelector(".add-todolist-btn");
const addTodoContainer = document.querySelector(".add-todo-container");
const addTodoCloseBtn = document.querySelector(".close");

const addTodoTitle = document.querySelector(".todo-title");
const addTodoStart = document.querySelector(".todo-time-start");
const addTodoEnd = document.querySelector(".todo-time-end");

const todoDay = document.querySelector(".todo-day");
const todoDate = document.querySelector(".todo-date");
const todoLists = document.querySelector(".todo-list");

const addtodoSubmit = document.querySelector(".add-todo-btn");
const deleteBtn = document.querySelector(".delete");

// 월을 숫자로는 가져와도 글자로는 가져오지 못하므로 선택가능하도록 배열만들기
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// todo list 구현시 필요한 arr로, 상단으로 변수 올림
/* const todoArr = [
   {
    date: 19,
    month: 8,
    year: 2023,
    tasks: [
      {
        title: "Event 1. this is an example task ",
        time: "11:00 AM",
      },
      {
        title: "Event 2.this is an example task",
        time: "12:00 PM",
      },
    ],
  },
]; */
let todoArr = []; // 예시용 아니라 해당 array에 추가될 수 있도록 let으로 빈 배열로 다시 선언
getTodoFromStorage(); // 제일 처음 저장된 todo를 불러와서 아래 함수들에 저장될 수 있도록 함

// 달력구현

/* 1. 현재 월의 달력 구현 함수 (초기화 및 생성) */
// 달력 버튼 눌렀을 때 달력이 초기화되고 필요한 정보를 미리 저장
// 이전 월,일 & 현재 월과 전체 일자 & 다음 월 시작 요일
function initCalendar() {
  const firstDay = new Date(year, month, 1); // 현재 월의 1일을 "생성하는" 날짜 내장함수
  const lastDay = new Date(year, month + 1, 0); // 현재 월의 마지막날을 "생성하는" 날짜 내장함수
  const prevLastDay = new Date(year, month, 0); // 직전 월의 마지막날을 "생성하는" 날짜 내장함수
  const prevDays = prevLastDay.getDate(); // 이전 월의 마지막날의 일자(28, 29, 30, 31 중 하나)를 가져옴
  const lastDate = lastDay.getDate(); // 현재 월의 마지막날의 일자(28, 29, 30, 31 중 하나)를 가져옴
  const day = firstDay.getDay(); // 현재 월의 1일의 요일 가져옴
  const nextDays = 7 - lastDay.getDay() - 1; // 다음 월의 1일의 요일
  // 7에서 마지막날짜의 요일값에서 -1을 빼며 다음 월의 첫번째 날짜의 요일을 계산함
  // 7은 일주일을 뜻하고 - lastDay.getDay()는 마지막날의 요일 숫자 -1 (1을 빼는건 요일이 0부터 계산되므로)

  // 캘린더 상단 월 영문 변경
  monthText.innerHTML = months[month] + " " + year;

  // html 페이지에 자동으로 월별 일자 div 추가
  let dates = "";

  /* 전월 일자 */
  for (x = day; x > 0; x--) {
    // 1번만 돌고 그만 돌게 하기 위함 (day는 1일이므로)
    dates += `<div class="date prev-date">${prevDays - x + 1}</div>`; // 전월의 마지막 날짜를 나타냄
  }

  /* 현재 월의 일자 */
  for (let i = 1; i <= lastDate; i++) {
    // 현재 월의 일자 수에 맞는 div 생성 전 todo list 관련 내용 (구현순서는 달력 먼저 하고 다시 해당 코드로 와서 작업하는 것)
    let task = false; // todo list 있는지 확인하고 class명에 task 넣기
    todoArr.forEach((todoObj) => {
      if (
        todoObj.date === i &&
        todoObj.month === month + 1 &&
        todoObj.year === year
      ) {
        task = true;
      }
    });

    // 마지막일자전까지 반복해서 일자 나타낼 div를 생성
    if (
      // 만약 오늘 날짜라면, 새로운 클래스 추가 (오늘 알려줄 새로운 클래스 생성할 것)
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      // 오늘날짜일 경우 default 값으로 바로 보여지므로
      // todo 날짜헤더, todo list 목록보여주는 함수 해당 날짜로 바로 실행하도록
      selectedDate = i;
      getSelectDate(i);
      updateTodolists(i);
      // dates += `<div class="date today highlight">${i}</div>`; 원래 코드 주석처리
      // 만약 현재 일에 todo가 작성되어 있을 경우를 위해 이중조건문 처리
      // 오늘 날짜에는 select 클래스 기본값으로 적용하여 강조효과
      if (task) {
        dates += `<div class="date today select task">${i}</div>`;
      } else {
        dates += `<div class="date today select">${i}</div>`;
      }
    } else {
      // 오늘이 아닌 날짜는 today 클래스 제외하고 생성되도록
      // 오늘이 아닌 날짜더라도 todo 작성되어 있을 경우 위해 이중조건문
      // dates += `<div class="date">${i}</div>`; 원래코드 주석처리함
      if (task) {
        dates += `<div class="date task">${i}</div>`;
      } else {
        dates += `<div class="date">${i}</div>`;
      }
    }
  }
  /* 다음 월의 일자 */
  for (let j = 1; j <= nextDays; j++) {
    // 다음달의 1일의 요일 전까지 현재 월의 달력에 생성
    // 현재 월이 딱 일주일 맞게 끝나지 않을 경우가 있기 때문임
    dates += `<div class="date next-date">${j}</div>`;
  }

  dateContainer.innerHTML = dates;
  // todo관련 추가
  addSelectListner(); // 캘린더가 설정되고 나서 active 클래스 listener 함수 실행
}
initCalendar();

/* 2. 이전 월의 달력을 만드는 함수 */
function prevMonth() {
  month--; // 월을 하나씩 감소시킴
  if (month < 0) {
    // 만약 월이 0보다 작으면 (0에서 한번 더 빼면 -1이 되는데, 0은 1월을 의미)
    month = 11; // 월은 11 즉, 12월로 설정
    year--; // 연도는 감소시킨다 (작년 12월)
  }

  initCalendar(); //날짜 재설정했으므로 달력 만드는 함수 실행
}

/* 3. 다음 월의 달력을 만드는 함수 */
function nextMonth() {
  month++; // 월을 하나씩 증가시킴
  if (month > 11) {
    // 만약 월이 12보다 크면 (12에서 한번 더 더하면 12이 되므로. 11은 12월을 의미)
    month = 0; // 월은 0 즉, 1월로 설정
    year++; // 연도는 증가시킨다 (내년 1월)
  }
  initCalendar(); //날짜 재설정했으므로 달력 만드는 함수 실행
}

/* 4. prev, next 버튼 클릭시 작동하도록 eventListener추가 */
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

/* 5. 날짜 클릭하여 특정 일자 선택시 강조하는 효과 내도록 */
function addSelectListner() {
  const allDates = document.querySelectorAll(".date");
  // 현재 일자들 전부에 forEach로 순회하여 함수 실행
  allDates.forEach((date) => {
    date.addEventListener("click", (e) => {
      // 각 일자 div가 클릭될시, 해당 클릭된 div의 innerHTML의 숫자를 selectedDate로 설정
      selectedDate = Number(e.target.innerHTML);
      // 클릭된 일자에 따라 todo 헤더 날짜 텍스트 변경함수를 여기에 적용
      getSelectDate(e.target.innerHTML);
      // 클릭된 일자의 todo list 보이도록 todo list 보여주는 함수 실행
      updateTodolists(Number(e.target.innerHTML)); // 안하면 일정 없어도 일정이 보임

      // 우선 초기화 진행 -> select 클래스명을 date div에서 모두 삭제
      allDates.forEach((date) => {
        date.classList.remove("select");
      });

      // 현재월의 이전달 날짜들 선택시
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        const prevDates = document.querySelectorAll(".date");
        prevDates.forEach((date) => {
          if (
            !date.classList.contains("prev-date") &&
            date.innerHTML === e.target.innerHTML
          ) {
            date.classList.add("select");
          }
        });
      }
      // 현재월의 다음달 일자들 선택시
      else if (e.target.classList.contains("next-date")) {
        nextMonth();
        const nextDates = document.querySelectorAll(".date");
        nextDates.forEach((date) => {
          if (
            !date.classList.contains("next-date") &&
            date.innerHTML === e.target.innerHTML
          ) {
            date.classList.add("select");
          }
        });
      }
      // 현재월의 날짜들중 선택시
      else {
        e.target.classList.add("select");
      }
    });
  });
}

// ----------------------------------------------------------------------------
// 달력 TODO 구현

/* 1. tasklist 추가 버튼 누를 시 기능 */
// 동그란 리스트 추가 버튼 누르면 입력창 나타나도록, 다시 누르면 사라지도록
addTodoListBtn.addEventListener("click", () => {
  addTodoContainer.classList.toggle("active");
});
// task 세부입력창 x 버튼 누르면 없어지도록
addTodoCloseBtn.addEventListener("click", () => {
  addTodoContainer.classList.remove("active");
});
// 외부 누르면 입력창 없어지도록
document.addEventListener("click", (e) => {
  if (e.target !== addTodoListBtn && !addTodoContainer.contains(e.target)) {
    addTodoContainer.classList.remove("active");
  }
});

/* 2. task 입력창부분 기능구현 */
// (1) todo task title 글자수 제한
addTodoTitle.addEventListener("input", (e) => {
  addTodoTitle.value = addTodoTitle.value.slice(0, 50);
});

// (2) 시간 부분 포맷
// 시작시간
addTodoStart.addEventListener("input", (e) => {
  // 숫자와 : 기호 아닌 것 모두 삭제
  addTodoStart.value = addTodoStart.value.replace(/[^0-9:]/g, "");

  // start 시간에 2개의 값 입력되었을시 자동으로 : 추가
  if (addTodoStart.value.length === 2) {
    addTodoStart.value += ":";
  }
  // start 시간에 5개보다 많이 입력되었을시 인덱스 5전 까지만 복사하여 반환(인덱스 5 전 => 4 즉, 5개)
  if (addTodoStart.value.length > 5) {
    addTodoStart.value = addTodoStart.value.slice(0, 5);
  }
});

// 종료시간 - start 복사해서 변수만 변경
addTodoEnd.addEventListener("input", (e) => {
  addTodoEnd.value = addTodoEnd.value.replace(/[^0-9:]/g, "");

  if (addTodoEnd.value.length === 2) {
    addTodoEnd.value += ":";
  }
  if (addTodoEnd.value.length > 5) {
    addTodoEnd.value = addTodoEnd.value.slice(0, 5);
  }
});

/* 3. 일자 선택시 todo list 헤더의 날짜 text 변경할 수 있는 함수 생성 */
function getSelectDate(date) {
  const dateForTodo = new Date(year, month, date);
  const dayForTodo = dateForTodo.toString().split(" ")[0];
  todoDay.innerHTML = dayForTodo;
  todoDate.innerHTML = date + " " + months[month] + " " + year;
}

// 일자 변경시마다 todo list 업데이트 및 표시 && 혹은 무언가 추가됐을때마다 / 삭제될때마다 업데이트 표시 PART
// ==> 이후 localStorage  저장관련 함수 추가
/* 4. 해당 날짜의 todo task를 보여주는 함수(날짜별 todo list 불러오는 것) */
function updateTodolists(date) {
  let todos = "";
  todoArr.forEach((todoObj) => {
    if (
      date === todoObj.date &&
      month + 1 === todoObj.month &&
      year === todoObj.year
    ) {
      todoObj.tasks.forEach((task) => {
        todos += `
        <div class="todos">
          <div class="todo-contents">
            <span class="check">
              <i class="fa-solid fa-check"></i>
            </span>
            <h3 class="todo-title">${task.title}</h3>
            <i class="fa-solid fa-delete-left delete"></i>
          </div>
          <div class="todo-time">${task.time}</div>
        </div>
        `;
      });
    }
  });
  if (todos === "") {
    todos = `
    <div class="no-todo">
      <h3 class="todo-title">No Tasks</h3>
    </div>
    `;
  }
  todoLists.innerHTML = todos;
  // 날짜 변경시마다 업데이트 됐으므로 저장이 필요하며
  // task가 없더라도 todo 추가 혹은 삭제 함수 실행 후 다시 화면 업데이트를 위해 해당함수를 사용함
  // 이 경우를 위해서라도 saveTodoInStorage는 필요함
  saveTodoInStoarge();

  // getTodoFromStorage();는 이미 제일 처음 자바스크립트 시작시 불러왔으므로 todoArr에 저장되어
  // updateTodolist (현재함수) 실행하기만 해도 알아서 나타남
}

/* 6. todo task 입력창을 통해 task 추가하는 함수 */
// add 버튼 누르면 todo-list 클래스 div에 들어가도록 (column으로 나타난 것)
addtodoSubmit.addEventListener("click", () => {
  const taskTitle = addTodoTitle.value;
  const taskStart = addTodoStart.value;
  const taskEnd = addTodoEnd.value;

  if (taskTitle === "" || taskStart === "" || taskEnd === "") {
    alert("Please fill all the fields");
    return;
  }

  /* 시간유효성 검사 -> 딱히..지금은 필요하지 않은듯  
  
  const timeStartArr = taskStart.split(":");
  const timeEndArr = taskEnd.split(":");

  if (
    timeStartArr.length !== 2 ||
    timeEndArr !== 2 ||
    timeStartArr[0] > 23 ||
    timeStartArr[1] > 59 ||
    timeEndArr[0] > 23 ||
    timeEndArr[1] > 59
  ) {
    alert("Please write valid Time");
  } */

  // 시간변환 함수
  function convertTime(time) {
    let timeArr = time.split(":");
    let hour = timeArr[0];
    let min = timeArr[1];
    let timeIndex = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    time = `${hour}:${min} ${timeIndex}`;
    return time;
  }

  const timeStart = convertTime(taskStart);
  const timeEnd = convertTime(taskEnd);
  const newTask = {
    title: taskTitle,
    time: `${timeStart} - ${timeEnd}`,
  };

  let taskAddstatus = false;
  // todo list 일정이 있는지 확인
  if (todoArr.length > 0) {
    // 선택한 날에 이미 일정이 있다면 새로운 task arr에 push
    todoArr.forEach((todoObj) => {
      if (
        todoObj.date === selectedDate &&
        todoObj.month === month + 1 &&
        todoObj.year === year
      ) {
        todoObj.tasks.push(newTask);
        taskAddstatus = true;
      }
    });
  }

  // 일정 없으면 새로 만든게 들어가도록
  if (!taskAddstatus) {
    todoArr.push({
      date: selectedDate,
      month: month + 1,
      year: year,
      tasks: [newTask],
    });
  }

  // task 입력 및 add 버튼 누르면 => 입력창 닫기 & 입력창 내용 초기화
  addTodoContainer.classList.remove("active");
  addTodoTitle.value = "";
  addTodoStart.value = "";
  addTodoEnd.value = "";

  // 일정 새로 추가했으니 업데이트된 일정 보여주도록 현재 선택된 일자로 showTodoLists함수 재실행
  // showTodoList에서 local 저장하는 함수 실행되므로 여기서는 추가 필요 없음
  updateTodolists(selectedDate);
});

/* 7.
일정을 삭제하는 함수 */
todoLists.addEventListener("click", (e) => {
  // if (e.target.children[0].children[2].classList.contains("delete")) {
  // }
  if (e.target.classList.contains("todos")) {
    const deleteTodo = e.target.children[0].children[1].innerHTML;
    todoArr.forEach((todoObj) => {
      if (
        todoObj.date === selectedDate &&
        todoObj.month === month + 1 &&
        todoObj.year === year
      ) {
        todoObj.tasks.forEach((item, index) => {
          if (item.title === deleteTodo) {
            todoObj.tasks.splice(index, 1);
          }
        });
        if (todoObj.tasks.length === 0) {
          todoArr.splice(todoArr.indexOf(todoObj), 1);
          const selectedDateEl = document.querySelector(".select");
          if (selectedDateEl.classList.contains("todos")) {
            selectedDateEl.classList.remove("todos");
          }
        }
      }
    });
    updateTodolists(selectedDate); // showTodoList에서 local 저장하는 함수 실행되므로 여기서는 추가 필요 없음
  }
});

// ------------------------------------------------
// 로컬저장소 PART

/* 8.일정 로컬저장소에 저장 및 삭제하는 함수 */
// 저장
function saveTodoInStoarge() {
  localStorage.setItem("tasks", JSON.stringify(todoArr));
}

// 불러오기
function getTodoFromStorage() {
  if (localStorage.getItem("tasks" === null)) {
    return;
  }

  todoArr.push(...JSON.parse(localStorage.getItem("tasks"))); // todoArr에서 tasks property의 value값을 불러와라
}

// ------------------------------------------------
// 페이지 이동 버튼 PART

// 다른 버튼 누르면 메인 페이지 이동 (main.js와 동일 - 작업중)

const inboxbtn = document.querySelector(".goToInbox");
const todaybtn = document.querySelector(".goToToday");

inboxbtn.addEventListener("click", (e) => {
  window.location.href =
    "/Users/chloe/Desktop/Nomad coder/ChromeClone_final/javascript/calendar.js";
  document.title = "너의 날들은";
});

// ------------------------------------------------
// today 버튼 누르면 오늘 날짜로 & title 변경

todaybtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();

  document.title = "너의 오늘은";
});

prev.addEventListener("click", () => {
  document.title = "너의 날들은";
});
next.addEventListener("click", () => {
  document.title = "너의 날들은";
});
// ------------------------------------------------
/* 이후 작업할 내용임 */

// upcomingbtn.addEventListener("click", (e) => {
//   window.location.href =
//     "/Users/chloe/Desktop/Nomad coder/vanillajs_nomadcoder_2023/html/calendar.html";

//   document.title = "당신의 날들은";
// });
