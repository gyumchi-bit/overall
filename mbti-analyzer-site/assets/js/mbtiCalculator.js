// MBTI Calculator Functions

// Calculate MBTI scores from answers
function calculateMBTIScores(answers) {
    const scores = {
        E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };

    answers.forEach(answer => {
        scores[answer.preference] += answer.weight;
    });

    return scores;
}

// Calculate percentages for each dimension
function calculatePercentages(scores) {
    const EITotal = scores.E + scores.I;
    const SNTotal = scores.S + scores.N;
    const TFTotal = scores.T + scores.F;
    const JPTotal = scores.J + scores.P;

    return {
        EI: {
            E: EITotal > 0 ? Math.round((scores.E / EITotal) * 100) : 50,
            I: EITotal > 0 ? Math.round((scores.I / EITotal) * 100) : 50
        },
        SN: {
            S: SNTotal > 0 ? Math.round((scores.S / SNTotal) * 100) : 50,
            N: SNTotal > 0 ? Math.round((scores.N / SNTotal) * 100) : 50
        },
        TF: {
            T: TFTotal > 0 ? Math.round((scores.T / TFTotal) * 100) : 50,
            F: TFTotal > 0 ? Math.round((scores.F / TFTotal) * 100) : 50
        },
        JP: {
            J: JPTotal > 0 ? Math.round((scores.J / JPTotal) * 100) : 50,
            P: JPTotal > 0 ? Math.round((scores.P / JPTotal) * 100) : 50
        }
    };
}

// Determine MBTI type from scores
function determineMBTIType(scores) {
    const type = [
        scores.E >= scores.I ? 'E' : 'I',
        scores.S >= scores.N ? 'S' : 'N',
        scores.T >= scores.F ? 'T' : 'F',
        scores.J >= scores.P ? 'J' : 'P'
    ].join('');

    return type;
}

// Calculate result certainty (0-100%)
function calculateCertainty(scores) {
    const dimensions = [
        { total: scores.E + scores.I, diff: Math.abs(scores.E - scores.I) },
        { total: scores.S + scores.N, diff: Math.abs(scores.S - scores.N) },
        { total: scores.T + scores.F, diff: Math.abs(scores.T - scores.F) },
        { total: scores.J + scores.P, diff: Math.abs(scores.J - scores.P) }
    ];

    const avgCertainty = dimensions.reduce((acc, dim) => {
        const certainty = dim.total > 0 ? (dim.diff / dim.total) * 100 : 0;
        return acc + certainty;
    }, 0) / 4;

    return Math.round(avgCertainty);
}

// Get dominant dimensions (>= 70%)
function getDominantDimensions(percentages) {
    const dominant = [];
    
    if (percentages.EI.E >= 70 || percentages.EI.I >= 70) {
        dominant.push(percentages.EI.E > percentages.EI.I ? 'E' : 'I');
    }
    if (percentages.SN.S >= 70 || percentages.SN.N >= 70) {
        dominant.push(percentages.SN.S > percentages.SN.N ? 'S' : 'N');
    }
    if (percentages.TF.T >= 70 || percentages.TF.F >= 70) {
        dominant.push(percentages.TF.T > percentages.TF.F ? 'T' : 'F');
    }
    if (percentages.JP.J >= 70 || percentages.JP.P >= 70) {
        dominant.push(percentages.JP.J > percentages.JP.P ? 'J' : 'P');
    }

    return dominant;
}

// Main MBTI calculation function
function calculateMBTIResult(testQuestions, userAnswers) {
    // Convert answers to proper format
    const answers = Object.entries(userAnswers).map(([questionId, optionIndex]) => {
        const question = testQuestions.find(q => q.id === parseInt(questionId));
        if (!question) {
            throw new Error(`Question with id ${questionId} not found`);
        }
        
        const selectedOption = question.options[optionIndex];
        if (!selectedOption) {
            throw new Error(`Invalid option index ${optionIndex} for question ${questionId}`);
        }

        return {
            questionId: parseInt(questionId),
            selectedOption: optionIndex,
            preference: selectedOption.preference,
            weight: selectedOption.weight
        };
    });

    // Calculate scores
    const scores = calculateMBTIScores(answers);
    
    // Calculate percentages
    const percentages = calculatePercentages(scores);
    
    // Determine MBTI type
    const type = determineMBTIType(scores);
    
    // Calculate certainty
    const certainty = calculateCertainty(scores);
    
    // Get dominant dimensions
    const dominantDimensions = getDominantDimensions(percentages);

    return {
        type,
        scores,
        percentages,
        certainty,
        dominantDimensions,
        timestamp: new Date().toISOString()
    };
}

// Calculate compatibility between two MBTI types
function calculateCompatibility(type1, type2) {
    if (type1.length !== 4 || type2.length !== 4) {
        return 0;
    }

    let compatibility = 0;
    
    // Each dimension comparison
    for (let i = 0; i < 4; i++) {
        const char1 = type1[i];
        const char2 = type2[i];
        
        // Same preference
        if (char1 === char2) {
            compatibility += 25;
        }
        // Complementary relationships
        else {
            // E/I: moderate difference is good
            if (i === 0) {
                compatibility += 15;
            }
            // S/N: different perspectives can help
            else if (i === 1) {
                compatibility += 10;
            }
            // T/F: balance is needed
            else if (i === 2) {
                compatibility += 15;
            }
            // J/P: complementary relationship
            else if (i === 3) {
                compatibility += 20;
            }
        }
    }

    return Math.min(compatibility, 100);
}

// Generate improvement suggestions
function generateImprovementSuggestions(result) {
    const suggestions = [];
    const { type, percentages, certainty } = result;

    // Low certainty
    if (certainty < 60) {
        suggestions.push("결과의 확실성이 낮습니다. 다양한 상황에서의 행동을 더 생각해보세요.");
    }

    // Extreme preferences advice
    if (percentages.EI.E >= 80) {
        suggestions.push("매우 외향적이신군요! 때로는 혼자만의 시간을 가져보세요.");
    } else if (percentages.EI.I >= 80) {
        suggestions.push("매우 내향적이신군요! 가끔은 새로운 사람들과 만나보세요.");
    }

    if (percentages.SN.S >= 80) {
        suggestions.push("현실적이고 실용적이신군요! 때로는 상상력을 발휘해보세요.");
    } else if (percentages.SN.N >= 80) {
        suggestions.push("상상력이 풍부하시군요! 때로는 현실적인 관점도 고려해보세요.");
    }

    if (percentages.TF.T >= 80) {
        suggestions.push("논리적이고 객관적이신군요! 감정적인 측면도 고려해보세요.");
    } else if (percentages.TF.F >= 80) {
        suggestions.push("감정적이고 배려심이 많으시군요! 때로는 객관적 분석도 필요합니다.");
    }

    if (percentages.JP.J >= 80) {
        suggestions.push("계획적이고 체계적이신군요! 때로는 유연함도 필요합니다.");
    } else if (percentages.JP.P >= 80) {
        suggestions.push("유연하고 적응력이 좋으시군요! 때로는 계획을 세워보세요.");
    }

    return suggestions;
}

// Get career recommendations for MBTI type
function getCareerRecommendations(type) {
    const mbtiType = mbtiTypes[type];
    return mbtiType ? mbtiType.careers : [];
}

// Get learning style recommendations
function getLearningStyleRecommendations(type) {
    const learningStyles = {
        'INTJ': ['체계적 학습', '장기 계획', '독립적 연구', '개념적 이해'],
        'INTP': ['탐구적 학습', '논리적 분석', '자율적 진도', '이론적 깊이'],
        'ENTJ': ['목표 지향적 학습', '리더십 역할', '실용적 응용', '경쟁적 환경'],
        'ENTP': ['창의적 학습', '토론과 브레인스토밍', '다양한 관점', '혁신적 접근'],
        'INFJ': ['의미 중심 학습', '조용한 환경', '깊이 있는 성찰', '가치 연결'],
        'INFP': ['개인화된 학습', '창의적 표현', '자율적 속도', '관심 분야 집중'],
        'ENFJ': ['협력적 학습', '그룹 활동', '타인 도움', '사회적 맥락'],
        'ENFP': ['상호작용적 학습', '다양한 활동', '영감적 환경', '자유로운 탐구'],
        'ISTJ': ['단계적 학습', '반복 연습', '구조화된 환경', '검증된 방법'],
        'ISFJ': ['지원적 환경', '실용적 응용', '점진적 발전', '협력적 분위기'],
        'ESTJ': ['체계적 접근', '명확한 목표', '실무 중심', '피드백 활용'],
        'ESFJ': ['사회적 학습', '팀워크', '실생활 연결', '격려적 환경'],
        'ISTP': ['실습 중심', '개별적 탐구', '문제 해결', '유연한 접근'],
        'ISFP': ['경험적 학습', '개인적 관심', '예술적 표현', '비경쟁적 환경'],
        'ESTP': ['활동적 학습', '즉시 적용', '실용적 기술', '동적 환경'],
        'ESFP': ['상호작용적', '재미있는 활동', '사회적 맥락', '긍정적 분위기']
    };

    return learningStyles[type] || [];
}