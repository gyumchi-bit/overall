// MBTI 인간관계 분석 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeRelationshipAnalysis();
});

// 16가지 MBTI 유형 정의
const mbtiTypes = [
    { code: 'INTJ', name: '건축가', group: 'nt' },
    { code: 'INTP', name: '논리술사', group: 'nt' },
    { code: 'ENTJ', name: '통솔자', group: 'nt' },
    { code: 'ENTP', name: '변론가', group: 'nt' },
    { code: 'INFJ', name: '옹호자', group: 'nf' },
    { code: 'INFP', name: '중재자', group: 'nf' },
    { code: 'ENFJ', name: '선도자', group: 'nf' },
    { code: 'ENFP', name: '활동가', group: 'nf' },
    { code: 'ISTJ', name: '현실주의자', group: 'sj' },
    { code: 'ISFJ', name: '수호자', group: 'sj' },
    { code: 'ESTJ', name: '경영자', group: 'sj' },
    { code: 'ESFJ', name: '집정관', group: 'sj' },
    { code: 'ISTP', name: '장인', group: 'sp' },
    { code: 'ISFP', name: '모험가', group: 'sp' },
    { code: 'ESTP', name: '사업가', group: 'sp' },
    { code: 'ESFP', name: '연예인', group: 'sp' }
];

// 각 유형별 인간관계 특성 데이터
const relationshipCharacteristics = {
    INTJ: {
        traits: [
            {
                title: "선택적 사교활동",
                description: "소수의 깊고 의미 있는 관계를 선호하며, 피상적인 관계는 피하는 경향이 있습니다."
            },
            {
                title: "독립적 성향",
                description: "혼자만의 시간을 중요하게 여기며, 타인에게 의존하지 않으려고 합니다."
            },
            {
                title: "진정성 추구",
                description: "가식적이거나 표면적인 대화보다는 깊이 있고 진솔한 소통을 추구합니다."
            },
            {
                title: "장기적 관점",
                description: "관계에서도 장기적인 목표와 비전을 중시하며, 일시적인 감정보다는 안정성을 추구합니다."
            }
        ],
        communicationTips: [
            "논리적이고 체계적인 설명을 제공하세요",
            "개인적인 공간과 시간을 존중해 주세요",
            "즉흥적인 제안보다는 미리 계획을 세워 알려주세요",
            "피상적인 대화보다는 의미 있는 주제로 대화하세요",
            "감정적인 압박보다는 합리적인 설득을 시도하세요"
        ],
        conflictResolution: {
            approach: "논리적 해결 방식",
            strategies: [
                "감정보다는 사실과 논리에 기반하여 문제를 분석합니다",
                "충분한 시간을 두고 냉정하게 상황을 검토합니다",
                "상호 이익이 되는 해결책을 체계적으로 모색합니다",
                "개인적 감정은 배제하고 객관적 관점에서 접근합니다"
            ]
        }
    },
    INTP: {
        traits: [
            {
                title: "사색적 교류",
                description: "지적 호기심을 자극하는 대화를 즐기며, 아이디어와 개념을 탐구하는 것을 좋아합니다."
            },
            {
                title: "유연한 관계",
                description: "형식적이고 규칙적인 관계보다는 자유롭고 유연한 관계를 선호합니다."
            },
            {
                title: "분석적 태도",
                description: "사람과 상황을 분석적으로 관찰하며, 패턴과 가능성을 탐구합니다."
            },
            {
                title: "저압적 소통",
                description: "강요하거나 압박하지 않으며, 상대방의 자율성을 존중합니다."
            }
        ],
        communicationTips: [
            "흥미로운 아이디어나 개념으로 대화를 시작하세요",
            "정답을 강요하기보다는 함께 탐구하는 자세를 보이세요",
            "충분한 생각할 시간을 제공하세요",
            "논리적 모순을 지적할 때는 부드럽게 접근하세요",
            "창의적이고 혁신적인 관점을 인정해 주세요"
        ],
        conflictResolution: {
            approach: "탐구적 해결 방식",
            strategies: [
                "문제의 근본 원인을 다각도로 분석합니다",
                "여러 가능한 해결책을 창의적으로 모색합니다",
                "상대방의 관점을 이해하려고 노력합니다",
                "완벽한 해결책을 찾기보다는 최선의 대안을 선택합니다"
            ]
        }
    },
    ENTJ: {
        traits: [
            {
                title: "리더십 발휘",
                description: "그룹에서 자연스럽게 주도권을 잡으며, 목표 달성을 위해 팀을 이끌어갑니다."
            },
            {
                title: "효율성 추구",
                description: "시간을 효율적으로 사용하며, 생산적이지 못한 관계나 활동을 기피합니다."
            },
            {
                title: "직설적 소통",
                description: "솔직하고 직접적인 의사소통을 선호하며, 명확한 피드백을 제공합니다."
            },
            {
                title: "성장 지향",
                description: "자신과 타인의 발전과 성장을 중요하게 여기며, 도전적인 목표를 설정합니다."
            }
        ],
        communicationTips: [
            "명확하고 간결하게 요점을 전달하세요",
            "구체적인 계획과 일정을 제시하세요",
            "도전적이고 야심찬 목표에 대해 이야기하세요",
            "비효율적인 과정이나 절차는 개선 방안과 함께 언급하세요",
            "성과와 결과에 대한 객관적 평가를 인정하세요"
        ],
        conflictResolution: {
            approach: "목표 지향적 해결 방식",
            strategies: [
                "갈등을 해결하여 목표 달성에 집중합니다",
                "명확한 역할과 책임을 정의합니다",
                "성과 기준과 평가 방법을 객관적으로 설정합니다",
                "장기적 관점에서 최적의 해결책을 모색합니다"
            ]
        }
    },
    ENTP: {
        traits: [
            {
                title: "활발한 사교성",
                description: "다양한 사람들과의 만남을 즐기며, 새로운 관계 형성에 적극적입니다."
            },
            {
                title: "아이디어 공유",
                description: "창의적인 아이디어를 나누는 것을 좋아하며, 브레인스토밍을 즐깁니다."
            },
            {
                title: "논쟁적 대화",
                description: "건설적인 토론과 논쟁을 통해 아이디어를 발전시키는 것을 즐깁니다."
            },
            {
                title: "변화 추구",
                description: "일상적이고 반복적인 관계보다는 변화와 자극이 있는 관계를 선호합니다."
            }
        ],
        communicationTips: [
            "흥미롭고 참신한 주제로 대화를 이끌어가세요",
            "다양한 관점에서 문제를 바라보는 자세를 보여주세요",
            "유머와 재치를 활용한 대화를 즐겨보세요",
            "새로운 가능성과 기회에 대해 이야기하세요",
            "너무 세부적인 것보다는 큰 그림에 집중하세요"
        ],
        conflictResolution: {
            approach: "창의적 해결 방식",
            strategies: [
                "기존과는 다른 혁신적인 해결책을 모색합니다",
                "여러 대안을 제시하고 최적의 조합을 찾습니다",
                "상황을 다각도로 분석하여 새로운 관점을 제공합니다",
                "유연하고 적응적인 해결 과정을 선호합니다"
            ]
        }
    },
    INFJ: {
        traits: [
            {
                title: "깊은 공감 능력",
                description: "타인의 감정과 입장을 깊이 이해하며, 진심어린 관심과 지지를 제공합니다."
            },
            {
                title: "조화로운 관계",
                description: "갈등을 피하고 조화로운 관계를 유지하려고 노력하며, 평화로운 분위기를 만듭니다."
            },
            {
                title: "가치 기반 소통",
                description: "개인의 가치관과 신념에 기반한 의미 있는 대화를 추구합니다."
            },
            {
                title: "장기적 헌신",
                description: "한 번 맺은 관계에 대해 장기적으로 헌신하며, 지속적인 발전을 추구합니다."
            }
        ],
        communicationTips: [
            "진정성 있고 따뜻한 태도로 대화하세요",
            "개인적인 가치와 신념을 존중해 주세요",
            "감정적인 지지와 이해를 표현하세요",
            "미래에 대한 비전과 이상을 공유하세요",
            "압박보다는 부드러운 격려를 해주세요"
        ],
        conflictResolution: {
            approach: "조화 추구적 해결 방식",
            strategies: [
                "모든 당사자의 감정과 입장을 고려합니다",
                "상호 이해와 공감을 바탕으로 해결책을 모색합니다",
                "장기적 관계 유지를 우선으로 생각합니다",
                "가치관의 차이를 인정하고 존중하는 방향으로 접근합니다"
            ]
        }
    },
    INFP: {
        traits: [
            {
                title: "진정성 중시",
                description: "자신의 가치관에 부합하는 진정한 관계를 추구하며, 가식적인 관계를 불편해합니다."
            },
            {
                title: "개인적 공간",
                description: "개인의 독립성과 자율성을 중요하게 여기며, 타인의 개성도 존중합니다."
            },
            {
                title: "감정적 깊이",
                description: "감정적으로 깊고 의미 있는 연결을 추구하며, 표면적인 관계는 선호하지 않습니다."
            },
            {
                title: "지지적 태도",
                description: "타인의 꿈과 이상을 지지하며, 격려와 응원을 아끼지 않습니다."
            }
        ],
        communicationTips: [
            "개인의 가치관과 신념을 존중하세요",
            "충분한 개인적 공간과 시간을 제공하세요",
            "감정적인 지지와 격려를 표현하세요",
            "창의적이고 상상력 있는 아이디어에 관심을 보이세요",
            "비판보다는 건설적인 피드백을 제공하세요"
        ],
        conflictResolution: {
            approach: "가치 중심적 해결 방식",
            strategies: [
                "개인의 가치관과 신념을 우선적으로 고려합니다",
                "감정적 상처를 치유하는 것을 중요하게 생각합니다",
                "상호 이해와 공감을 통한 해결을 추구합니다",
                "압박보다는 자발적인 해결을 기다리는 인내심을 보입니다"
            ]
        }
    },
    ENFJ: {
        traits: [
            {
                title: "타인 중심적",
                description: "다른 사람들의 성장과 발전을 돕는 것을 기쁨으로 여기며, 적극적으로 지원합니다."
            },
            {
                title: "사회적 리더십",
                description: "그룹의 화합과 발전을 이끌어가며, 긍정적인 분위기를 조성합니다."
            },
            {
                title: "감정적 지지",
                description: "타인의 감정을 민감하게 파악하고, 필요한 지지와 격려를 제공합니다."
            },
            {
                title: "미래 지향적",
                description: "개인과 그룹의 잠재력을 보고, 미래의 가능성을 실현하도록 돕습니다."
            }
        ],
        communicationTips: [
            "다른 사람들에 대한 관심과 배려를 인정해 주세요",
            "긍정적이고 격려하는 태도로 대화하세요",
            "개인의 성장과 발전에 대해 이야기하세요",
            "그룹의 화합과 팀워크를 중시하세요",
            "감정적인 지지와 공감을 표현하세요"
        ],
        conflictResolution: {
            approach: "관계 중심적 해결 방식",
            strategies: [
                "모든 사람의 감정과 입장을 고려합니다",
                "그룹의 화합과 단결을 우선시합니다",
                "개인의 성장과 발전 기회로 갈등을 활용합니다",
                "상호 이해와 소통을 통한 근본적 해결을 추구합니다"
            ]
        }
    },
    ENFP: {
        traits: [
            {
                title: "열정적 소통",
                description: "에너지 넘치는 대화를 즐기며, 상대방에게 영감과 동기를 부여합니다."
            },
            {
                title: "다양성 추구",
                description: "다양한 배경과 관점을 가진 사람들과의 교류를 즐기고 새로운 경험을 추구합니다."
            },
            {
                title: "감정적 연결",
                description: "깊은 감정적 유대감을 형성하며, 진정성 있는 관계를 중요하게 여깁니다."
            },
            {
                title: "가능성 탐구",
                description: "타인의 잠재력을 발견하고 개발하는 데 관심이 많으며, 성장을 지원합니다."
            }
        ],
        communicationTips: [
            "열정적이고 에너지 넘치는 대화를 즐겨보세요",
            "새로운 아이디어와 가능성에 대해 이야기하세요",
            "개인적인 경험과 감정을 공유하세요",
            "창의적이고 혁신적인 관점을 인정해 주세요",
            "미래의 비전과 꿈에 대해 함께 이야기하세요"
        ],
        conflictResolution: {
            approach: "협력적 해결 방식",
            strategies: [
                "모든 당사자의 감정과 관점을 고려합니다",
                "창의적이고 혁신적인 해결책을 모색합니다",
                "관계 회복과 개선에 우선순위를 둡니다",
                "긍정적이고 미래 지향적인 관점으로 접근합니다"
            ]
        }
    },
    ISTJ: {
        traits: [
            {
                title: "안정적 관계",
                description: "신뢰할 수 있고 예측 가능한 관계를 선호하며, 꾸준하고 일관된 교류를 추구합니다."
            },
            {
                title: "책임감 있는 태도",
                description: "약속과 의무를 중요하게 여기며, 신뢰할 수 있는 관계 파트너가 됩니다."
            },
            {
                title: "전통적 가치",
                description: "전통적인 관계 가치와 예의를 중시하며, 상호 존중을 기반으로 합니다."
            },
            {
                title: "점진적 친밀감",
                description: "시간을 두고 천천히 관계를 발전시키며, 급작스러운 변화를 선호하지 않습니다."
            }
        ],
        communicationTips: [
            "명확하고 구체적인 정보를 제공하세요",
            "약속과 계획을 미리 세우고 지켜주세요",
            "전통적인 예의와 매너를 지켜주세요",
            "점진적이고 단계적인 접근을 하세요",
            "신뢰성과 일관성을 보여주세요"
        ],
        conflictResolution: {
            approach: "체계적 해결 방식",
            strategies: [
                "기존의 규칙과 절차에 따라 문제를 해결합니다",
                "과거의 경험과 사례를 참고합니다",
                "단계별로 체계적인 해결 과정을 거칩니다",
                "안정적이고 지속 가능한 해결책을 선호합니다"
            ]
        }
    },
    ISFJ: {
        traits: [
            {
                title: "배려심 깊은 지지",
                description: "타인의 필요를 민감하게 감지하고, 실질적인 도움과 지지를 제공합니다."
            },
            {
                title: "조화로운 분위기",
                description: "갈등을 피하고 평화로운 분위기를 만들기 위해 노력하며, 중재 역할을 합니다."
            },
            {
                title: "충성스러운 관계",
                description: "한 번 맺은 관계에 대해 충성스럽고 헌신적이며, 장기적인 관계를 추구합니다."
            },
            {
                title: "세심한 관찰",
                description: "상대방의 작은 변화나 필요를 민감하게 파악하고, 적절한 반응을 보입니다."
            }
        ],
        communicationTips: [
            "따뜻하고 친근한 태도로 대화하세요",
            "감정적인 지지와 공감을 표현하세요",
            "작은 배려와 관심을 알아봐 주세요",
            "갈등보다는 협력과 조화를 추구하세요",
            "개인적인 상황과 감정을 존중해 주세요"
        ],
        conflictResolution: {
            approach: "조화 추구적 해결 방식",
            strategies: [
                "모든 사람의 감정을 고려하여 해결합니다",
                "갈등의 감정적 상처를 치유하는 데 집중합니다",
                "평화롭고 안정적인 해결을 추구합니다",
                "상호 타협과 양보를 통한 해결을 선호합니다"
            ]
        }
    },
    ESTJ: {
        traits: [
            {
                title: "조직적 리더십",
                description: "그룹을 체계적으로 이끌어가며, 명확한 역할과 규칙을 통해 효율성을 추구합니다."
            },
            {
                title: "실용적 접근",
                description: "현실적이고 실용적인 관점에서 관계를 바라보며, 실질적인 결과를 중시합니다."
            },
            {
                title: "직설적 소통",
                description: "솔직하고 직접적인 의사소통을 선호하며, 명확한 피드백을 제공합니다."
            },
            {
                title: "전통적 가치",
                description: "사회적 규범과 전통적인 가치를 중시하며, 안정적인 관계 구조를 선호합니다."
            }
        ],
        communicationTips: [
            "명확하고 구체적인 의사소통을 하세요",
            "실용적이고 현실적인 제안을 하세요",
            "체계적이고 조직적인 접근을 보여주세요",
            "전통적인 예의와 매너를 지켜주세요",
            "성과와 결과에 대한 객관적 평가를 인정하세요"
        ],
        conflictResolution: {
            approach: "규칙 기반 해결 방식",
            strategies: [
                "기존의 규칙과 절차에 따라 해결합니다",
                "명확한 역할과 책임을 정의합니다",
                "객관적이고 공정한 기준을 적용합니다",
                "효율적이고 실용적인 해결책을 추구합니다"
            ]
        }
    },
    ESFJ: {
        traits: [
            {
                title: "사회적 조화",
                description: "그룹의 화합과 단결을 중시하며, 모든 구성원이 편안함을 느끼도록 노력합니다."
            },
            {
                title: "감정적 지지",
                description: "타인의 감정을 민감하게 파악하고, 따뜻한 지지와 격려를 제공합니다."
            },
            {
                title: "협력적 태도",
                description: "경쟁보다는 협력을 선호하며, 팀워크를 통한 성과 달성을 추구합니다."
            },
            {
                title: "전통적 관계",
                description: "전통적인 관계 가치와 사회적 예의를 중시하며, 안정적인 관계를 추구합니다."
            }
        ],
        communicationTips: [
            "따뜻하고 친근한 태도로 대화하세요",
            "그룹의 화합과 협력을 중시하세요",
            "감정적인 지지와 격려를 표현하세요",
            "전통적인 예의와 매너를 지켜주세요",
            "개인적인 관심과 배려를 보여주세요"
        ],
        conflictResolution: {
            approach: "관계 중심 해결 방식",
            strategies: [
                "모든 사람의 감정을 고려하여 해결합니다",
                "그룹의 화합과 단결을 우선시합니다",
                "상호 이해와 공감을 바탕으로 접근합니다",
                "전통적이고 검증된 해결 방법을 선호합니다"
            ]
        }
    },
    ISTP: {
        traits: [
            {
                title: "독립적 성향",
                description: "개인의 자유와 독립성을 중시하며, 타인의 개인적 공간도 존중합니다."
            },
            {
                title: "실용적 도움",
                description: "말보다는 행동으로 도움을 제공하며, 실질적이고 구체적인 지원을 선호합니다."
            },
            {
                title: "유연한 관계",
                description: "관계에서 자유로움과 유연성을 추구하며, 구속받지 않는 관계를 선호합니다."
            },
            {
                title: "문제 해결형",
                description: "문제 상황에서 냉정하고 객관적으로 해결책을 찾아 실행합니다."
            }
        ],
        communicationTips: [
            "개인적 공간과 자유를 존중해 주세요",
            "실용적이고 구체적인 내용으로 대화하세요",
            "강요보다는 선택권을 제공하세요",
            "문제 해결에 집중한 대화를 하세요",
            "감정적 압박보다는 논리적 설명을 하세요"
        ],
        conflictResolution: {
            approach: "실용적 해결 방식",
            strategies: [
                "감정보다는 실용적 관점에서 접근합니다",
                "구체적이고 실행 가능한 해결책을 찾습니다",
                "개인의 자유와 선택권을 보장합니다",
                "최소한의 개입으로 효과적인 해결을 추구합니다"
            ]
        }
    },
    ISFP: {
        traits: [
            {
                title: "개인적 가치",
                description: "자신만의 가치관과 신념을 중시하며, 타인의 개성과 다양성도 존중합니다."
            },
            {
                title: "감정적 공감",
                description: "타인의 감정에 민감하게 반응하며, 진정성 있는 공감과 지지를 제공합니다."
            },
            {
                title: "조화로운 관계",
                description: "갈등을 피하고 평화로운 관계를 추구하며, 상호 이해를 중시합니다."
            },
            {
                title: "창의적 표현",
                description: "관계에서도 창의성과 독창성을 중시하며, 예술적 감성을 공유합니다."
            }
        ],
        communicationTips: [
            "개인의 가치관과 신념을 존중하세요",
            "감정적인 공감과 이해를 표현하세요",
            "창의적이고 예술적인 관심을 공유하세요",
            "강요보다는 자발적 참여를 기다려주세요",
            "개인적 공간과 시간을 존중해 주세요"
        ],
        conflictResolution: {
            approach: "조화 추구적 해결 방식",
            strategies: [
                "개인의 가치관과 감정을 우선 고려합니다",
                "상호 이해와 공감을 바탕으로 접근합니다",
                "평화롭고 조화로운 해결을 추구합니다",
                "개인의 독립성과 자율성을 보장합니다"
            ]
        }
    },
    ESTP: {
        traits: [
            {
                title: "활발한 사교성",
                description: "에너지 넘치는 사교활동을 즐기며, 많은 사람들과 활발하게 교류합니다."
            },
            {
                title: "현재 중심적",
                description: "현재의 즐거움과 경험을 중시하며, 즉흥적이고 자유로운 관계를 선호합니다."
            },
            {
                title: "실용적 도움",
                description: "어려운 상황에서 즉시 도움을 제공하며, 실질적이고 직접적인 지원을 합니다."
            },
            {
                title: "유연한 적응",
                description: "변화하는 상황에 빠르게 적응하며, 다양한 사람들과 쉽게 어울립니다."
            }
        ],
        communicationTips: [
            "활발하고 에너지 넘치는 대화를 즐겨보세요",
            "현재의 경험과 활동에 집중하세요",
            "유머와 재미를 활용한 대화를 하세요",
            "즉흥적이고 자유로운 제안을 해보세요",
            "구체적이고 실용적인 내용으로 대화하세요"
        ],
        conflictResolution: {
            approach: "즉석 해결 방식",
            strategies: [
                "즉시 문제를 해결하려고 노력합니다",
                "실용적이고 현실적인 해결책을 찾습니다",
                "유연하고 적응적인 접근을 합니다",
                "감정보다는 행동을 통한 해결을 선호합니다"
            ]
        }
    },
    ESFP: {
        traits: [
            {
                title: "따뜻한 관심",
                description: "타인에 대한 진정한 관심과 애정을 표현하며, 긍정적인 에너지를 전파합니다."
            },
            {
                title: "감정적 표현",
                description: "감정을 자유롭게 표현하며, 상대방의 감정에도 민감하게 반응합니다."
            },
            {
                title: "즐거운 분위기",
                description: "재미있고 즐거운 분위기를 만들어가며, 모든 사람이 편안함을 느끼도록 합니다."
            },
            {
                title: "협력적 태도",
                description: "팀워크를 중시하며, 모든 사람이 참여할 수 있는 환경을 만들어갑니다."
            }
        ],
        communicationTips: [
            "따뜻하고 친근한 태도로 대화하세요",
            "감정적인 공감과 지지를 표현하세요",
            "재미있고 즐거운 활동을 함께 해보세요",
            "긍정적이고 격려하는 말을 많이 해주세요",
            "현재의 경험과 감정을 공유하세요"
        ],
        conflictResolution: {
            approach: "감정 중심 해결 방식",
            strategies: [
                "모든 사람의 감정을 고려하여 해결합니다",
                "관계 회복과 화합을 우선시합니다",
                "긍정적이고 희망적인 관점으로 접근합니다",
                "협력과 팀워크를 통한 해결을 추구합니다"
            ]
        }
    }
};

// 궁합도 데이터 (간소화된 버전)
const compatibilityData = {
    INTJ: {
        excellent: ['ENFP', 'ENTP', 'INFJ', 'INTJ'],
        good: ['INFP', 'ENTJ', 'INTP', 'ISFP'],
        fair: ['ISFJ', 'ISTJ', 'ENFJ', 'ESTJ'],
        challenging: ['ESFP', 'ESTP', 'ESFJ', 'ISTP']
    },
    INTP: {
        excellent: ['ENFJ', 'ENTJ', 'INFJ', 'INTP'],
        good: ['INTJ', 'ENTP', 'INFP', 'ISFJ'],
        fair: ['ISTJ', 'ESTJ', 'ENFP', 'ISFP'],
        challenging: ['ESFP', 'ESTP', 'ESFJ', 'ISTP']
    },
    ENTJ: {
        excellent: ['INFP', 'INTP', 'ENFP', 'ENTJ'],
        good: ['INTJ', 'INFJ', 'ENTP', 'ISFP'],
        fair: ['ENFJ', 'ESTJ', 'ISTJ', 'ISFJ'],
        challenging: ['ESFP', 'ESTP', 'ESFJ', 'ISTP']
    },
    ENTP: {
        excellent: ['INFJ', 'INTJ', 'ENFJ', 'ENTP'],
        good: ['INTP', 'ENTJ', 'INFP', 'ISFJ'],
        fair: ['ENFP', 'ESTJ', 'ISTJ', 'ISFP'],
        challenging: ['ESFP', 'ESTP', 'ESFJ', 'ISTP']
    },
    INFJ: {
        excellent: ['ENTP', 'ENFP', 'INTJ', 'INFJ'],
        good: ['INTP', 'ENTJ', 'INFP', 'ISFP'],
        fair: ['ENFJ', 'ISTJ', 'ISFJ', 'ESTJ'],
        challenging: ['ESFP', 'ESTP', 'ESFJ', 'ISTP']
    },
    INFP: {
        excellent: ['ENFJ', 'ENTJ', 'INFP', 'ISFJ'],
        good: ['INFJ', 'INTJ', 'ENTP', 'ISFP'],
        fair: ['ENFP', 'INTP', 'ESTJ', 'ISTJ'],
        challenging: ['ESFP', 'ESTP', 'ESFJ', 'ISTP']
    },
    ENFJ: {
        excellent: ['INFP', 'ISFP', 'INTP', 'ENFJ'],
        good: ['INFJ', 'ENFP', 'ENTP', 'ISFJ'],
        fair: ['INTJ', 'ENTJ', 'ESTJ', 'ISTJ'],
        challenging: ['ESFP', 'ESTP', 'ESFJ', 'ISTP']
    },
    ENFP: {
        excellent: ['INTJ', 'INFJ', 'ISFJ', 'ENFP'],
        good: ['INFP', 'ENFJ', 'ENTJ', 'ISFP'],
        fair: ['INTP', 'ENTP', 'ESTJ', 'ISTJ'],
        challenging: ['ESFP', 'ESTP', 'ESFJ', 'ISTP']
    },
    ISTJ: {
        excellent: ['ESFP', 'ESTP', 'ISFP', 'ISTJ'],
        good: ['ISFJ', 'ESTJ', 'ESFJ', 'ISTP'],
        fair: ['INFP', 'ENFP', 'INTJ', 'ENTJ'],
        challenging: ['INFJ', 'ENFJ', 'INTP', 'ENTP']
    },
    ISFJ: {
        excellent: ['ESFP', 'ESTP', 'ENFP', 'ISFJ'],
        good: ['ISFP', 'ESTJ', 'ESFJ', 'ISTJ'],
        fair: ['INFP', 'ENFJ', 'INTP', 'ENTP'],
        challenging: ['INFJ', 'INTJ', 'ENTJ', 'ISTP']
    },
    ESTJ: {
        excellent: ['ISFP', 'ISTP', 'ISFJ', 'ESTJ'],
        good: ['ISTJ', 'ESFJ', 'ESFP', 'ESTP'],
        fair: ['INFP', 'ENFP', 'INTJ', 'ENTJ'],
        challenging: ['INFJ', 'ENFJ', 'INTP', 'ENTP']
    },
    ESFJ: {
        excellent: ['ISFP', 'ISTP', 'ISFJ', 'ESFJ'],
        good: ['ISTJ', 'ESTJ', 'ESFP', 'ESTP'],
        fair: ['INFP', 'ENFP', 'ENFJ', 'INFJ'],
        challenging: ['INTJ', 'ENTJ', 'INTP', 'ENTP']
    },
    ISTP: {
        excellent: ['ESFJ', 'ESTJ', 'ENFJ', 'ISTP'],
        good: ['ISFJ', 'ISTJ', 'ESFP', 'ESTP'],
        fair: ['ISFP', 'INFP', 'ENFP', 'INFJ'],
        challenging: ['INTJ', 'ENTJ', 'INTP', 'ENTP']
    },
    ISFP: {
        excellent: ['ENFJ', 'ESFJ', 'ESTJ', 'ISFP'],
        good: ['ISFJ', 'ISTJ', 'ESFP', 'ESTP'],
        fair: ['INFP', 'ENFP', 'INFJ', 'ISTP'],
        challenging: ['INTJ', 'ENTJ', 'INTP', 'ENTP']
    },
    ESTP: {
        excellent: ['ISFJ', 'ISTJ', 'INFJ', 'ESTP'],
        good: ['ISFP', 'ESTJ', 'ESFJ', 'ISTP'],
        fair: ['ESFP', 'ENFJ', 'INFP', 'ENFP'],
        challenging: ['INTJ', 'ENTJ', 'INTP', 'ENTP']
    },
    ESFP: {
        excellent: ['ISFJ', 'ISTJ', 'INFJ', 'ESFP'],
        good: ['ISFP', 'ESTJ', 'ESFJ', 'ESTP'],
        fair: ['ISTP', 'ENFJ', 'INFP', 'ENFP'],
        challenging: ['INTJ', 'ENTJ', 'INTP', 'ENTP']
    }
};

function initializeRelationshipAnalysis() {
    createTypeGrid();
    setupEventListeners();
    
    // URL에서 유형 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const selectedType = urlParams.get('type');
    if (selectedType && mbtiTypes.find(type => type.code === selectedType.toUpperCase())) {
        selectType(selectedType.toUpperCase());
    }
}

function createTypeGrid() {
    const typeGrid = document.getElementById('typeGrid');
    
    mbtiTypes.forEach(type => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-3 col-md-4 col-sm-6 col-6';
        
        const typeElement = document.createElement('div');
        typeElement.className = `mbti-type-card ${type.group} text-center`;
        typeElement.setAttribute('data-type', type.code);
        typeElement.innerHTML = `
            <div class="mbti-type-code">${type.code}</div>
            <div class="mbti-type-name">${type.name}</div>
        `;
        
        typeElement.addEventListener('click', () => selectType(type.code));
        colDiv.appendChild(typeElement);
        typeGrid.appendChild(colDiv);
    });
}

function setupEventListeners() {
    // 반응형 네비게이션 이벤트 리스너들은 home.js에서 처리
}

function selectType(typeCode) {
    // 이전 선택 제거
    document.querySelectorAll('.mbti-type-card').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 새로운 선택 적용
    const selectedOption = document.querySelector(`[data-type="${typeCode}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        selectedOption.style.transform = 'scale(0.95)';
        setTimeout(() => {
            selectedOption.style.transform = '';
        }, 150);
        showAnalysisResults(typeCode);
    }
}

function showAnalysisResults(typeCode) {
    const analysisResults = document.getElementById('analysisResults');
    const data = relationshipCharacteristics[typeCode];
    
    if (!data) return;
    
    // 제목 업데이트
    document.getElementById('selectedTypeTitle').textContent = typeCode;
    
    // 특성 리스트 생성
    createCharacteristicsList(data.traits);
    
    // 궁합도 그리드 생성
    createCompatibilityGrid(typeCode);
    
    // 소통 팁 생성
    createCommunicationTips(data.communicationTips);
    
    // 갈등 해결 전략 생성
    createConflictResolution(data.conflictResolution);
    
    // 결과 표시 (Bootstrap 클래스 사용)
    analysisResults.classList.remove('d-none');
    analysisResults.classList.add('animate-fadeInUp');
    
    // 부드러운 스크롤
    analysisResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createCharacteristicsList(traits) {
    const characteristicsList = document.getElementById('characteristicsList');
    characteristicsList.innerHTML = '';
    
    traits.forEach(trait => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-6 col-md-12';
        
        const traitElement = document.createElement('div');
        traitElement.className = 'card h-100';
        traitElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title text-primary">${trait.title}</h5>
                <p class="card-text text-muted">${trait.description}</p>
            </div>
        `;
        
        colDiv.appendChild(traitElement);
        characteristicsList.appendChild(colDiv);
    });
}

function createCompatibilityGrid(typeCode) {
    const compatibilityGrid = document.getElementById('compatibilityGrid');
    compatibilityGrid.innerHTML = '';
    
    const compatibility = compatibilityData[typeCode];
    if (!compatibility) return;
    
    const compatibilityLevels = [
        { level: 'excellent', score: '95%', label: '최고 궁합', className: 'text-success' },
        { level: 'good', score: '80%', label: '좋은 궁합', className: 'text-primary' },
        { level: 'fair', score: '65%', label: '보통 궁합', className: 'text-warning' },
        { level: 'challenging', score: '45%', label: '어려운 궁합', className: 'text-danger' }
    ];
    
    compatibilityLevels.forEach(level => {
        const types = compatibility[level.level] || [];
        
        types.slice(0, 4).forEach(compatibleType => {
            const typeInfo = mbtiTypes.find(t => t.code === compatibleType);
            if (!typeInfo) return;
            
            const colDiv = document.createElement('div');
            colDiv.className = 'col-lg-3 col-md-4 col-sm-6';
            
            const cardElement = document.createElement('div');
            cardElement.className = 'card text-center h-100';
            cardElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${compatibleType}</h5>
                    <div class="display-6 fw-bold ${level.className} mb-2">${level.score}</div>
                    <p class="card-text">${level.label}</p>
                    <small class="text-muted">${typeInfo.name}</small>
                </div>
            `;
            
            colDiv.appendChild(cardElement);
            compatibilityGrid.appendChild(colDiv);
        });
    });
}

function createCommunicationTips(tips) {
    const communicationTips = document.getElementById('communicationTips');
    communicationTips.innerHTML = '';
    
    tips.forEach(tip => {
        const tipElement = document.createElement('li');
        tipElement.className = 'list-group-item d-flex align-items-start';
        tipElement.innerHTML = `
            <i class="fas fa-lightbulb text-warning me-3 mt-1"></i>
            <span>${tip}</span>
        `;
        communicationTips.appendChild(tipElement);
    });
}

function createConflictResolution(conflictData) {
    const conflictResolution = document.getElementById('conflictResolution');
    
    conflictResolution.innerHTML = `
        <div class="alert alert-primary" role="alert">
            <h5 class="alert-heading">${conflictData.approach}</h5>
            <p class="mb-0">이 유형은 갈등 상황에서 다음과 같은 접근 방식을 선호합니다.</p>
        </div>
        <ul class="list-group list-group-flush">
            ${conflictData.strategies.map(strategy => 
                `<li class="list-group-item d-flex align-items-start">
                    <i class="fas fa-check-circle text-success me-3 mt-1"></i>
                    <span>${strategy}</span>
                 </li>`
            ).join('')}
        </ul>
    `;
}

// 유틸리티 함수들
function getCompatibilityScore(type1, type2) {
    const compatibility = compatibilityData[type1];
    if (!compatibility) return 50;
    
    if (compatibility.excellent.includes(type2)) return 95;
    if (compatibility.good.includes(type2)) return 80;
    if (compatibility.fair.includes(type2)) return 65;
    if (compatibility.challenging.includes(type2)) return 45;
    
    return 50;
}

function getCompatibilityLevel(score) {
    if (score >= 90) return { level: 'excellent', className: 'score-excellent', label: '최고 궁합' };
    if (score >= 75) return { level: 'good', className: 'score-good', label: '좋은 궁합' };
    if (score >= 60) return { level: 'fair', className: 'score-fair', label: '보통 궁합' };
    return { level: 'challenging', className: 'score-challenging', label: '어려운 궁합' };
}