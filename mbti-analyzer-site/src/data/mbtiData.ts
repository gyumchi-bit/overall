// MBTI Type definitions and descriptions
export interface MBTIType {
  type: string;
  name: string;
  nickname: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  relationships: string;
  color: string;
  illustration: string;
}

export const mbtiTypes: Record<string, MBTIType> = {
  INTJ: {
    type: "INTJ",
    name: "건축가",
    nickname: "전략가",
    description: "상상력이 풍부하고 전략적 사고를 하는 완벽주의자입니다. 독립적이고 결단력이 있으며, 자신의 비전을 실현하기 위해 끊임없이 노력합니다.",
    strengths: ["체계적 사고", "독창성", "결단력", "독립성", "전략적 계획"],
    weaknesses: ["지나친 비판적 성향", "타인의 감정 무시", "완벽주의", "사교성 부족"],
    careers: ["과학자", "엔지니어", "건축가", "변호사", "의사", "연구원", "전략 기획자"],
    relationships: "진솔하고 깊이 있는 관계를 선호하며, 소수의 친밀한 관계를 유지합니다.",
    color: "#6366f1",
    illustration: "architect"
  },
  INTP: {
    type: "INTP",
    name: "논리술사",
    nickname: "사색가",
    description: "논리적이고 유연한 사고를 가진 혁신적인 발명가입니다. 지식에 대한 갈증이 강하며, 복잡한 문제를 해결하는 것을 즐깁니다.",
    strengths: ["논리적 분석", "창의성", "객관성", "적응력", "학습 능력"],
    weaknesses: ["실행력 부족", "감정 표현 어려움", "일상적 업무 회피", "결정 지연"],
    careers: ["연구원", "프로그래머", "철학자", "수학자", "과학자", "분석가", "발명가"],
    relationships: "지적인 대화를 중시하며, 개인적 공간을 존중하는 관계를 선호합니다.",
    color: "#8b5cf6",
    illustration: "thinker"
  },
  ENTJ: {
    type: "ENTJ",
    name: "통솔자",
    nickname: "지휘관",
    description: "타고난 리더로서 카리스마와 자신감을 겸비한 대담한 지도자입니다. 목표 달성을 위해 팀을 이끄는 능력이 뛰어납니다.",
    strengths: ["리더십", "전략적 사고", "결단력", "효율성", "목표 지향성"],
    weaknesses: ["지나친 지배욕", "감정적 측면 경시", "참을성 부족", "비판적 성향"],
    careers: ["CEO", "경영진", "변호사", "정치인", "컨설턴트", "프로젝트 매니저"],
    relationships: "도전적이고 성장 지향적인 관계를 선호하며, 파트너의 발전을 지원합니다.",
    color: "#ef4444",
    illustration: "commander"
  },
  ENTP: {
    type: "ENTP",
    name: "변론가",
    nickname: "발명가",
    description: "영리하고 호기심 많은 사고가입니다. 새로운 아이디어와 가능성을 탐구하며, 토론을 통해 새로운 관점을 얻는 것을 즐깁니다.",
    strengths: ["창의성", "적응력", "열정", "논리적 사고", "의사소통 능력"],
    weaknesses: ["집중력 부족", "일관성 결여", "실행 어려움", "감정적 측면 간과"],
    careers: ["기업가", "컨설턴트", "발명가", "변호사", "저널리스트", "마케터"],
    relationships: "지적 자극과 새로운 경험을 공유할 수 있는 역동적인 관계를 추구합니다.",
    color: "#f59e0b",
    illustration: "debater"
  },
  INFJ: {
    type: "INFJ",
    name: "옹호자",
    nickname: "예언자",
    description: "선의를 가지고 세상을 변화시키고자 하는 이상주의자입니다. 깊은 통찰력과 강한 원칙을 가지고 있습니다.",
    strengths: ["통찰력", "이상주의", "결단력", "창의성", "공감 능력"],
    weaknesses: ["완벽주의", "예민함", "번아웃 위험", "비현실적 기대"],
    careers: ["상담사", "작가", "교사", "종교인", "사회복지사", "예술가"],
    relationships: "깊고 의미 있는 관계를 추구하며, 상대방의 성장과 행복을 중시합니다.",
    color: "#10b981",
    illustration: "advocate"
  },
  INFP: {
    type: "INFP",
    name: "중재자",
    nickname: "몽상가",
    description: "이상주의적이고 충성심이 강한 중재자입니다. 자신의 가치관에 따라 행동하며, 다른 사람들의 잠재력을 믿습니다.",
    strengths: ["창의성", "공감 능력", "개방성", "유연성", "이상주의"],
    weaknesses: ["지나친 이상주의", "결정 어려움", "비판에 민감", "실용성 부족"],
    careers: ["작가", "상담사", "예술가", "심리학자", "사회복지사", "번역가"],
    relationships: "진정성과 깊은 이해를 바탕으로 한 조화로운 관계를 추구합니다.",
    color: "#06b6d4",
    illustration: "mediator"
  },
  ENFJ: {
    type: "ENFJ",
    name: "선도자",
    nickname: "교육자",
    description: "카리스마 넘치고 영감을 주는 지도자입니다. 다른 사람들의 성장과 발전을 돕는 것에서 보람을 느낍니다.",
    strengths: ["리더십", "공감 능력", "의사소통", "이타주의", "영감력"],
    weaknesses: ["지나친 이타심", "비판에 민감", "완벽주의", "자기 돌봄 소홀"],
    careers: ["교사", "상담사", "HR 전문가", "코치", "정치인", "종교인"],
    relationships: "따뜻하고 지지적인 관계를 형성하며, 파트너의 잠재력 실현을 돕습니다.",
    color: "#f97316",
    illustration: "protagonist"
  },
  ENFP: {
    type: "ENFP",
    name: "활동가",
    nickname: "영감을 주는 자",
    description: "열정적이고 창의적인 자유로운 영혼입니다. 진정한 삶의 의미를 찾고 다른 사람들과 깊은 관계를 맺고 싶어합니다.",
    strengths: ["열정", "창의성", "공감 능력", "의사소통", "적응력"],
    weaknesses: ["집중력 부족", "스트레스에 민감", "실행력 부족", "결정 어려움"],
    careers: ["예술가", "상담사", "기자", "마케터", "이벤트 기획자", "컨설턴트"],
    relationships: "활기차고 영감을 주는 관계를 선호하며, 깊은 감정적 연결을 추구합니다.",
    color: "#ec4899",
    illustration: "campaigner"
  },
  ISTJ: {
    type: "ISTJ",
    name: "논리주의자",
    nickname: "관리자",
    description: "실무적이고 사실에 기반한 신뢰할 수 있는 성격입니다. 체계적이고 책임감이 강하며, 전통과 규칙을 중시합니다.",
    strengths: ["신뢰성", "체계성", "책임감", "실용성", "인내력"],
    weaknesses: ["변화 거부", "융통성 부족", "감정 표현 어려움", "새로운 아이디어 수용 어려움"],
    careers: ["회계사", "은행원", "공무원", "관리자", "의료진", "법무팀"],
    relationships: "안정적이고 신뢰할 수 있는 관계를 추구하며, 전통적인 가치를 중시합니다.",
    color: "#059669",
    illustration: "logistician"
  },
  ISFJ: {
    type: "ISFJ",
    name: "옹호자",
    nickname: "보호자",
    description: "따뜻하고 헌신적인 보호자입니다. 다른 사람들을 돌보는 것을 좋아하며, 조화로운 환경을 만들기 위해 노력합니다.",
    strengths: ["배려심", "신뢰성", "인내심", "실용성", "세심함"],
    weaknesses: ["자기주장 부족", "변화 거부", "과도한 겸손", "번아웃 위험"],
    careers: ["간호사", "교사", "상담사", "인사담당자", "사회복지사", "비서"],
    relationships: "안정감을 주고 받는 헌신적인 관계를 추구하며, 파트너를 세심하게 보살핍니다.",
    color: "#7c3aed",
    illustration: "protector"
  },
  ESTJ: {
    type: "ESTJ",
    name: "경영자",
    nickname: "관리자",
    description: "뛰어난 관리 능력을 가진 대표적인 경영자입니다. 질서와 체계를 중시하며, 목표 달성을 위해 노력합니다.",
    strengths: ["리더십", "체계성", "효율성", "실용성", "결단력"],
    weaknesses: ["융통성 부족", "감정적 측면 경시", "지배적 성향", "변화 거부"],
    careers: ["경영진", "관리자", "군인", "판사", "은행원", "프로젝트 매니저"],
    relationships: "전통적이고 안정적인 관계를 선호하며, 명확한 역할과 책임을 중시합니다.",
    color: "#dc2626",
    illustration: "executive"
  },
  ESFJ: {
    type: "ESFJ",
    name: "집정관",
    nickname: "협력자",
    description: "사교적이고 인기가 많은 협력자입니다. 다른 사람들과 조화를 이루며 살아가는 것을 중시합니다.",
    strengths: ["협조성", "책임감", "실용성", "배려심", "의사소통"],
    weaknesses: ["비판에 민감", "갈등 회피", "변화 어려움", "지나친 타인 의존"],
    careers: ["교사", "간호사", "이벤트 기획자", "인사담당자", "상담사", "영업직"],
    relationships: "따뜻하고 지지적인 관계를 형성하며, 상대방의 행복을 자신의 행복으로 여깁니다.",
    color: "#16a34a",
    illustration: "consul"
  },
  ISTP: {
    type: "ISTP",
    name: "만능재주꾼",
    nickname: "장인",
    description: "대담하고 실용적인 실험 정신을 가진 만능재주꾼입니다. 모든 종류의 도구를 자유자재로 다룹니다.",
    strengths: ["실용성", "융통성", "위기 대처", "논리적 사고", "독립성"],
    weaknesses: ["감정 표현 어려움", "장기 계획 부족", "헌신 어려움", "예측 불가능"],
    careers: ["엔지니어", "정비사", "파일럿", "소방관", "경찰관", "운동선수"],
    relationships: "자유롭고 독립적인 관계를 선호하며, 실제적인 도움을 통해 사랑을 표현합니다.",
    color: "#ca8a04",
    illustration: "virtuoso"
  },
  ISFP: {
    type: "ISFP",
    name: "모험가",
    nickname: "예술가",
    description: "유연하고 매력적인 예술가입니다. 새로운 가능성과 아이디어를 탐구하는 것을 좋아합니다.",
    strengths: ["창의성", "개방성", "유연성", "배려심", "겸손함"],
    weaknesses: ["계획성 부족", "결정 어려움", "경쟁 싫어함", "비판에 민감"],
    careers: ["예술가", "디자이너", "음악가", "상담사", "요리사", "수의사"],
    relationships: "진정성 있고 자유로운 관계를 추구하며, 상대방의 개성을 존중합니다.",
    color: "#0891b2",
    illustration: "adventurer"
  },
  ESTP: {
    type: "ESTP",
    name: "사업가",
    nickname: "활동가",
    description: "에너지 넘치고 인식이 뛰어난 즉흥연주자입니다. 어떤 상황에서도 다른 사람들을 즐겁게 해줍니다.",
    strengths: ["적응력", "실용성", "사교성", "관찰력", "활동성"],
    weaknesses: ["계획성 부족", "집중력 부족", "규칙 무시", "감정적 측면 간과"],
    careers: ["영업직", "연예인", "운동선수", "기업가", "응급의료진", "경찰관"],
    relationships: "활기차고 즐거운 관계를 선호하며, 현재 순간을 함께 즐기는 것을 중시합니다.",
    color: "#ea580c",
    illustration: "entrepreneur"
  },
  ESFP: {
    type: "ESFP",
    name: "연예인",
    nickname: "엔터테이너",
    description: "자발적이고 열정적인 연예인입니다. 진정으로 자유로운 정신을 가지고 있으며, 다른 사람들에게 영감을 줍니다.",
    strengths: ["열정", "창의성", "사교성", "유연성", "낙천성"],
    weaknesses: ["계획성 부족", "집중력 부족", "비판에 민감", "갈등 회피"],
    careers: ["연예인", "이벤트 기획자", "상담사", "교사", "디자이너", "요리사"],
    relationships: "따뜻하고 즐거운 관계를 추구하며, 상대방과 함께 인생을 축하하고 싶어합니다.",
    color: "#e11d48",
    illustration: "entertainer"
  }
};

export const getDimensionDescription = (dimension: string, preference: string): string => {
  const descriptions: Record<string, Record<string, string>> = {
    EI: {
      E: "외향형 - 에너지를 외부 세계에서 얻으며, 사람들과의 상호작용을 선호합니다.",
      I: "내향형 - 에너지를 내부 세계에서 얻으며, 혼자만의 시간을 필요로 합니다."
    },
    SN: {
      S: "감각형 - 현실적이고 구체적인 정보를 선호하며, 경험에 의존합니다.",
      N: "직관형 - 가능성과 의미를 추구하며, 미래 지향적이고 창의적입니다."
    },
    TF: {
      T: "사고형 - 논리적이고 객관적인 분석을 통해 결정을 내립니다.",
      F: "감정형 - 가치와 감정을 고려하여 사람 중심의 결정을 내립니다."
    },
    JP: {
      J: "판단형 - 계획적이고 체계적이며, 확실성과 결정을 선호합니다.",
      P: "인식형 - 유연하고 적응적이며, 개방성과 가능성을 선호합니다."
    }
  };
  
  return descriptions[dimension]?.[preference] || '';
};