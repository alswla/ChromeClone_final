const quotes = [
  {
    jp: "大切にしまっておきなさい。 夢は覚めればいつか消えるようになっているよ。",
    kr: "잘 간직하거라. 꿈은 깨어나면 언젠가 사라지게 되어 있단다.",
  },
  {
    jp: "私たち、もしかして前に会ったことあるんじゃないですか。",
    kr: "우리..혹시 전에 만난적 있지 않나요?",
  },
  {
    jp: "糸を繋げることもむすび。人を繋げることもむすび。時間が流れることもむすび、全部神様の力さ。",
    kr: "실을 잇는 것도 무스비, 사람을 잇는 것도 무스비, 시간이 흐르는 것도 무스비, 전부 신의 힘이란다.",
  },
  {
    jp: "大切な人、忘れたくない人、忘れてはいけない人",
    kr: "소중한 사람, 잊고 싶지 않은 사람, 잊어버리면 안되는 사람",
  },
  {
    jp: "君が世界のどこにいようと、必ずもう一度訪ねてみる。",
    kr: "네가 세상 어디에 있든지간에 반드시 다시 한 번 찾아가겠어.",
  },
  {
    jp: "君の名前は？",
    kr: "너의 이름은?",
  },
  {
    jp: "一つだけ確かだ。私たちは会ったらすぐに分かるよ。",
    kr: "한 가지는 분명해, 우리는 만나면 바로 알아볼거야.",
  },
  {
    jp: "あの日、星が降った日、それはまるで、夢の景色のようにただひたすらに美しい眺めだった。",
    kr: "그날, 별이 무수히 쏟아지던날, 그것은 마치 꿈속 풍경처럼 그저 한없이 아름다운 광경이였다.",
  },
  {
    jp: "ずっと誰かを、何かを探している。",
    kr: "계속 누군가를, 무언가를 찾고있어.",
  },
  {
    jp: "まだ会ったことのない君を、探している。",
    kr: "아직 만난 적 없는 너를, 찾고 있어.",
  },
];

const quote_jp = document.querySelector(".quoteBox__jp");
const quote_kr = document.querySelector(".quoteBox__kr");

function rotateQuotes() {
  const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quote_jp.innerText = todaysQuote.jp;
  quote_kr.innerText = todaysQuote.kr;
}

rotateQuotes();
setInterval(rotateQuotes, 7000);

window.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const greeting = document.querySelector(".myprofile__greeting");
  const profileName = document.querySelector(".myprofile__name");
  profileName.innerText = `${username}`;
  profileName.classList.remove("hidden");
  greeting.classList.remove("hidden");
});
