const prizes = [
    { name: "1등", quantity: 1 },
    { name: "2등", quantity: 3 },
    { name: "3등", quantity: 5 },
    { name: "4등", quantity: 100 }
];

const prizeList = document.getElementById('prize-list');

// 초기 상품 리스트 표시
function updatePrizeList() {
    prizeList.innerHTML = '';
    prizes.forEach(prize => {
        const listItem = document.createElement('li');
        listItem.innerText = `${prize.name}: ${prize.quantity}개 남음`;
        prizeList.appendChild(listItem);
    });
}

// 상품 리스트 초기화
updatePrizeList();

document.getElementById('draw').addEventListener('click', function() {
    // 남은 상품 배열 생성
    const allPrizes = [];
    prizes.forEach(prize => {
        for (let i = 0; i < prize.quantity; i++) {
            allPrizes.push(prize.name);
        }
    });

    // 랜덤으로 제비뽑기
    const randomIndex = Math.floor(Math.random() * allPrizes.length);
    const result = allPrizes[randomIndex];

    // 선택한 상품의 수량 감소
    prizes.forEach(prize => {
        if (prize.name === result) {
            prize.quantity--;
        }
    });

    // 결과 표시 및 종이 애니메이션
    const resultDiv = document.getElementById('result');
    const paperDiv = document.getElementById('paper');

    resultDiv.innerText = `당첨: ${result}`;
    resultDiv.style.opacity = 1; // 결과를 보여줌
    paperDiv.style.display = 'block';
    paperDiv.style.animation = 'fadeIn 0.5s, flutter 1s infinite';

    // 상품 리스트 업데이트
    updatePrizeList();

    // 결과 사라지기 애니메이션
    setTimeout(() => {
        resultDiv.style.opacity = 0;
        paperDiv.style.animation = 'none'; // 애니메이션 정지
        paperDiv.style.display = 'none'; // 종이 사라짐
    }, 3000); // 3초 후 사라짐
});
