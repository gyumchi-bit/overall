// MBTI Test Questions
const questions = [
    // E/I 차원 (외향성/내향성)
    {
        id: 1,
        text: "새로운 사람들과 만나는 파티에 초대받았을 때 당신의 반응은?",
        dimension: "EI",
        options: [
            { text: "신나서 바로 참석한다! 새로운 사람들과 대화하는 게 즐겁다", preference: "E", weight: 2 },
            { text: "참석하지만 아는 사람들과만 주로 대화한다", preference: "E", weight: 1 },
            { text: "참석하지만 일찍 집에 가고 싶어진다", preference: "I", weight: 1 },
            { text: "가능하면 참석하지 않거나 짧게만 머물다 온다", preference: "I", weight: 2 }
        ]
    },
    {
        id: 2,
        text: "에너지를 회복하는 방법은?",
        dimension: "EI",
        options: [
            { text: "친구들과 만나서 수다를 떨거나 활동을 함께 한다", preference: "E", weight: 2 },
            { text: "사람들이 많은 곳에 가서 활기를 느낀다", preference: "E", weight: 2 },
            { text: "혼자만의 시간을 가지며 조용히 쉰다", preference: "I", weight: 2 },
            { text: "책을 읽거나 영화를 보며 혼자만의 취미를 즐긴다", preference: "I", weight: 2 }
        ]
    },
    {
        id: 3,
        text: "회의에서 아이디어를 제안할 때:",
        dimension: "EI",
        options: [
            { text: "즉석에서 떠오르는 아이디어를 바로 말한다", preference: "E", weight: 2 },
            { text: "다른 사람들과 토론하면서 아이디어를 발전시킨다", preference: "E", weight: 1 },
            { text: "미리 충분히 생각해본 후에 발표한다", preference: "I", weight: 1 },
            { text: "회의 후에 개별적으로 의견을 전달한다", preference: "I", weight: 2 }
        ]
    },
    {
        id: 4,
        text: "주말에 선호하는 활동은?",
        dimension: "EI",
        options: [
            { text: "친구들과 만나서 함께 활동한다", preference: "E", weight: 2 },
            { text: "새로운 사람들과 네트워킹 이벤트에 참가한다", preference: "E", weight: 1 },
            { text: "집에서 혼자만의 취미생활을 한다", preference: "I", weight: 1 },
            { text: "조용한 곳에서 명상하거나 산책한다", preference: "I", weight: 2 }
        ]
    },

    // S/N 차원 (감각/직관)
    {
        id: 5,
        text: "새로운 기술을 배울 때 선호하는 방법은?",
        dimension: "SN",
        options: [
            { text: "단계별 매뉴얼을 따라가며 차근차근 배운다", preference: "S", weight: 2 },
            { text: "실제 예시와 경험을 통해 배운다", preference: "S", weight: 1 },
            { text: "전체적인 개념을 먼저 파악한 후 세부사항을 배운다", preference: "N", weight: 1 },
            { text: "창의적으로 응용하면서 나만의 방법을 찾는다", preference: "N", weight: 2 }
        ]
    },
    {
        id: 6,
        text: "문제를 해결할 때:",
        dimension: "SN",
        options: [
            { text: "과거의 경험과 검증된 방법을 활용한다", preference: "S", weight: 2 },
            { text: "구체적인 사실과 데이터를 수집해서 분석한다", preference: "S", weight: 1 },
            { text: "직감적으로 새로운 해결책을 찾아본다", preference: "N", weight: 1 },
            { text: "창의적이고 혁신적인 방법을 시도한다", preference: "N", weight: 2 }
        ]
    },
    {
        id: 7,
        text: "대화할 때 더 관심 있는 주제는?",
        dimension: "SN",
        options: [
            { text: "실제 경험담이나 구체적인 사실들", preference: "S", weight: 2 },
            { text: "현재 일어나고 있는 실질적인 문제들", preference: "S", weight: 1 },
            { text: "미래의 가능성이나 이론적인 개념들", preference: "N", weight: 1 },
            { text: "추상적인 아이디어나 철학적 주제들", preference: "N", weight: 2 }
        ]
    },
    {
        id: 8,
        text: "정보를 기억할 때:",
        dimension: "SN",
        options: [
            { text: "구체적인 세부사항과 사실들을 잘 기억한다", preference: "S", weight: 2 },
            { text: "순서와 절차를 정확히 기억한다", preference: "S", weight: 1 },
            { text: "전체적인 패턴이나 의미를 기억한다", preference: "N", weight: 1 },
            { text: "상징적이거나 은유적인 내용을 잘 기억한다", preference: "N", weight: 2 }
        ]
    },

    // T/F 차원 (사고/감정)
    {
        id: 9,
        text: "중요한 결정을 내릴 때 가장 중요하게 생각하는 것은?",
        dimension: "TF",
        options: [
            { text: "논리적 분석과 객관적 데이터", preference: "T", weight: 2 },
            { text: "효율성과 실용성", preference: "T", weight: 1 },
            { text: "관련된 사람들의 감정과 관계", preference: "F", weight: 1 },
            { text: "나의 가치관과 신념", preference: "F", weight: 2 }
        ]
    },
    {
        id: 10,
        text: "다른 사람과 갈등이 생겼을 때:",
        dimension: "TF",
        options: [
            { text: "객관적인 사실을 바탕으로 문제를 해결한다", preference: "T", weight: 2 },
            { text: "논리적으로 따져서 옳고 그름을 판단한다", preference: "T", weight: 1 },
            { text: "상대방의 감정을 이해하려고 노력한다", preference: "F", weight: 1 },
            { text: "화해하고 관계를 회복하는 것을 우선시한다", preference: "F", weight: 2 }
        ]
    },
    {
        id: 11,
        text: "비판을 받을 때의 반응은?",
        dimension: "TF",
        options: [
            { text: "객관적으로 맞는 말인지 분석해본다", preference: "T", weight: 2 },
            { text: "개선할 점이 있다면 고쳐야겠다고 생각한다", preference: "T", weight: 1 },
            { text: "상처받지만 상대방의 의도를 이해하려 한다", preference: "F", weight: 1 },
            { text: "감정적으로 상처받고 관계가 걱정된다", preference: "F", weight: 2 }
        ]
    },
    {
        id: 12,
        text: "팀 프로젝트에서 선호하는 역할은?",
        dimension: "TF",
        options: [
            { text: "분석하고 계획을 세우는 역할", preference: "T", weight: 2 },
            { text: "효율적인 진행 방법을 찾는 역할", preference: "T", weight: 1 },
            { text: "팀원들의 의견을 조율하는 역할", preference: "F", weight: 1 },
            { text: "팀 분위기를 좋게 만드는 역할", preference: "F", weight: 2 }
        ]
    },

    // J/P 차원 (판단/인식)
    {
        id: 13,
        text: "여행 계획을 세울 때:",
        dimension: "JP",
        options: [
            { text: "상세한 일정표를 만들고 예약을 미리 다 해둔다", preference: "J", weight: 2 },
            { text: "대략적인 계획을 세우고 중요한 것만 예약한다", preference: "J", weight: 1 },
            { text: "최소한의 계획만 세우고 현지에서 상황에 따라 결정한다", preference: "P", weight: 1 },
            { text: "계획 없이 가서 그때그때 즉흥적으로 행동한다", preference: "P", weight: 2 }
        ]
    },
    {
        id: 14,
        text: "업무나 과제를 할 때:",
        dimension: "JP",
        options: [
            { text: "미리미리 계획을 세워서 일찍 완료한다", preference: "J", weight: 2 },
            { text: "일정을 정해두고 착실히 진행한다", preference: "J", weight: 1 },
            { text: "마감일이 가까워져야 집중이 잘 된다", preference: "P", weight: 1 },
            { text: "마감일 직전에 몰아서 하는 편이다", preference: "P", weight: 2 }
        ]
    },
    {
        id: 15,
        text: "새로운 가능성이 생겼을 때:",
        dimension: "JP",
        options: [
            { text: "기존 계획을 유지하고 신중하게 검토한다", preference: "J", weight: 2 },
            { text: "계획을 약간 수정해서 반영한다", preference: "J", weight: 1 },
            { text: "흥미롭다면 계획을 바꿔서라도 시도해본다", preference: "P", weight: 1 },
            { text: "즉시 새로운 방향으로 전환한다", preference: "P", weight: 2 }
        ]
    },
    {
        id: 16,
        text: "일상생활에서:",
        dimension: "JP",
        options: [
            { text: "하루 일과를 계획하고 그대로 실행한다", preference: "J", weight: 2 },
            { text: "To-do 리스트를 만들어서 체크한다", preference: "J", weight: 1 },
            { text: "그날 기분에 따라 할 일을 정한다", preference: "P", weight: 1 },
            { text: "계획보다는 즉흥적으로 행동한다", preference: "P", weight: 2 }
        ]
    }
];

// Get random questions (for shorter tests)
function getRandomQuestions(count = 12) {
    // 각 차원별로 최소 3개씩 포함되도록 선택
    const dimensions = ['EI', 'SN', 'TF', 'JP'];
    const questionsPerDimension = Math.floor(count / 4);
    const result = [];
    
    dimensions.forEach(dimension => {
        const dimensionQuestions = questions.filter(q => q.dimension === dimension);
        const shuffled = dimensionQuestions.sort(() => Math.random() - 0.5);
        result.push(...shuffled.slice(0, questionsPerDimension));
    });
    
    // 남은 자리가 있다면 랜덤으로 채우기
    const remaining = count - result.length;
    if (remaining > 0) {
        const unusedQuestions = questions.filter(q => !result.includes(q));
        const shuffled = unusedQuestions.sort(() => Math.random() - 0.5);
        result.push(...shuffled.slice(0, remaining));
    }
    
    return result.sort(() => Math.random() - 0.5); // 최종 섞기
}

// Shuffle array utility function
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}