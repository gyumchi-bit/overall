// MBTI Test Questions Database
const questions = [
    {
        id: 1,
        text: "새로운 사람들과 만나는 상황에서 당신은?",
        dimension: "EI",
        options: [
            { text: "먼저 다가가서 대화를 시작한다", value: "E", score: 2 },
            { text: "상대방이 먼저 말을 걸어주기를 기다린다", value: "I", score: 2 }
        ]
    },
    {
        id: 2,
        text: "정보를 받아들일 때 당신은 주로?",
        dimension: "SN",
        options: [
            { text: "구체적이고 실용적인 정보를 선호한다", value: "S", score: 2 },
            { text: "개념적이고 이론적인 정보를 선호한다", value: "N", score: 2 }
        ]
    },
    {
        id: 3,
        text: "결정을 내릴 때 당신이 더 중요하게 생각하는 것은?",
        dimension: "TF",
        options: [
            { text: "논리적이고 객관적인 분석", value: "T", score: 2 },
            { text: "사람들의 감정과 가치관", value: "F", score: 2 }
        ]
    },
    {
        id: 4,
        text: "일상생활에서 당신은?",
        dimension: "JP",
        options: [
            { text: "계획을 세우고 체계적으로 생활한다", value: "J", score: 2 },
            { text: "상황에 따라 유연하게 대응한다", value: "P", score: 2 }
        ]
    },
    {
        id: 5,
        text: "파티나 모임에서 당신은?",
        dimension: "EI",
        options: [
            { text: "여러 사람들과 다양한 대화를 나눈다", value: "E", score: 2 },
            { text: "한두 명과 깊이 있는 대화를 나눈다", value: "I", score: 2 }
        ]
    },
    {
        id: 6,
        text: "문제를 해결할 때 당신은?",
        dimension: "SN",
        options: [
            { text: "경험과 사실에 기반해서 해결한다", value: "S", score: 2 },
            { text: "직감과 영감에 의존해서 해결한다", value: "N", score: 2 }
        ]
    },
    {
        id: 7,
        text: "비판을 받았을 때 당신은?",
        dimension: "TF",
        options: [
            { text: "내용이 합리적인지 분석한다", value: "T", score: 2 },
            { text: "기분이 상하고 감정적으로 반응한다", value: "F", score: 2 }
        ]
    },
    {
        id: 8,
        text: "여행을 계획할 때 당신은?",
        dimension: "JP",
        options: [
            { text: "미리 상세한 일정을 짠다", value: "J", score: 2 },
            { text: "그때그때 상황에 맞춰 결정한다", value: "P", score: 2 }
        ]
    }
];

// 추가 질문들을 60개까지 확장
for (let i = 9; i <= 60; i++) {
    const dimensions = ["EI", "SN", "TF", "JP"];
    const dimension = dimensions[(i - 1) % 4];
    
    let questionText, options;
    
    switch (dimension) {
        case "EI":
            questionText = `외향성/내향성 관련 질문 ${i}`;
            options = [
                { text: "외향적인 선택지", value: "E", score: 2 },
                { text: "내향적인 선택지", value: "I", score: 2 }
            ];
            break;
        case "SN":
            questionText = `감각/직관 관련 질문 ${i}`;
            options = [
                { text: "감각적인 선택지", value: "S", score: 2 },
                { text: "직관적인 선택지", value: "N", score: 2 }
            ];
            break;
        case "TF":
            questionText = `사고/감정 관련 질문 ${i}`;
            options = [
                { text: "사고적인 선택지", value: "T", score: 2 },
                { text: "감정적인 선택지", value: "F", score: 2 }
            ];
            break;
        case "JP":
            questionText = `판단/인식 관련 질문 ${i}`;
            options = [
                { text: "판단적인 선택지", value: "J", score: 2 },
                { text: "인식적인 선택지", value: "P", score: 2 }
            ];
            break;
    }
    
    questions.push({
        id: i,
        text: questionText,
        dimension: dimension,
        options: options
    });
}