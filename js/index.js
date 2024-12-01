$(function () {
  let result = document.querySelector("#result"),
    user = document.querySelector("#user"),
    play = document.querySelector("#play"),
    retry = document.querySelector("#retry"),
    attempts = document.querySelector("#attempts");

  let computerNum,
    remainingAttempts = 10;

  // 컴퓨터의 랜덤 숫자를 생성하는 함수
  function randomNum() {
    computerNum = Math.floor(Math.random() * 100 + 1); // 전역 변수 computerNum에 값 저장
    console.log("컴퓨터가 선택한 숫자:", computerNum); // 디버깅을 위해 출력
  }

  randomNum();

  play.addEventListener("click", function (e) {
    e.preventDefault();

    let userNum = Number(user.value); // 입력값을 숫자로 변환
    console.log("사용자가 입력한 숫자:", userNum);

    // 입력 값이 없거나 범위 밖일 때
    if (!userNum || userNum < 1 || userNum > 100) {
      result.textContent = "1부터 100 사이의 숫자를 입력하세요!";
      result.style.color = "red";
    } else {
      remainingAttempts--;
      attempts.textContent = `남은 기회: ${remainingAttempts}`;

      if (computerNum > userNum) {
        result.textContent = "UP!";
        result.style.color = "#3498db"; // 파란색
      } else if (computerNum < userNum) {
        result.textContent = "DOWN!";
        result.style.color = "#e74c3c"; // 빨간색
      } else {
        result.textContent = "Bingo! 정답입니다!";
        result.style.color = "#2ecc71"; // 초록색
        retry.style.display = "inline-block"; // 재도전 버튼 표시
        return;
      }

      if (remainingAttempts === 0) {
        result.textContent = "게임 종료! 기회가 모두 끝났습니다.";
        result.style.color = "#e74c3c"; // 빨간색
        play.disabled = true; // 게임 시작 버튼 비활성화
        retry.style.display = "inline-block"; // 재도전 버튼 표시
      }
    }
  });

  // 재도전 버튼 클릭 시
  retry.addEventListener("click", function () {
    randomNum(); // 새로운 랜덤 숫자 생성
    remainingAttempts = 10; // 기회 초기화
    attempts.textContent = `남은 기회: ${remainingAttempts}`; // 기회 업데이트
    user.value = ""; // 입력 필드 초기화
    result.textContent = "up / down / bingo"; // 결과 초기화
    result.style.color = "#3498db"; // 결과 색상 초기화
    retry.style.display = "none"; // 재도전 버튼 숨기기
    play.disabled = false; // 게임 시작 버튼 활성화
  });

  // 숫자 입력 이벤트 리스너
  user.addEventListener("input", function () {
    // 숫자가 없을 경우 입력 필드 값을 빈 문자열로 설정
    if (user.value === "") {
      user.value = ""; // 빈 값일 때 1로 돌아가지 않음
    }
  });
});
