// Result Page JavaScript (result.html)

// Global variables
let testResult = null;
let mbtiTypeData = null;

// Initialize result page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeResultPage();
});

function initializeResultPage() {
    // Load test result
    loadTestResult();
    
    // Initialize page components
    if (testResult) {
        displayResult();
        initializeShareFunctionality();
        initializeResultNavigation();
        initializeAnimations();
        initializeCompatibilitySection();
        initializeCareerSection();
        initializeLearningStyleSection();
    } else {
        showNoResultMessage();
    }
}

// Load test result from localStorage
function loadTestResult() {
    console.log('결과 페이지 로딩 시작...');
    testResult = StorageManager.getItem('mbti_test_result');
    console.log('localStorage에서 가져온 결과:', testResult);
    
    if (!testResult) {
        console.log('localStorage에 결과가 없음, URL 파라미터 확인...');
        // Try to get from URL parameters (for shared results)
        const urlParams = URLUtils.getQueryParams();
        console.log('URL 파라미터:', urlParams);
        if (urlParams.type) {
            testResult = {
                type: urlParams.type,
                certainty: parseInt(urlParams.certainty) || 75,
                timestamp: urlParams.timestamp || new Date().toISOString(),
                // Create mock percentages for shared results
                percentages: createMockPercentages(urlParams.type)
            };
            console.log('URL에서 생성한 결과:', testResult);
        }
    }
    
    if (testResult && testResult.type) {
        mbtiTypeData = mbtiTypes[testResult.type];
        console.log('MBTI 타입 데이터:', mbtiTypeData);
    } else {
        console.log('결과 데이터가 없습니다.');
    }
}

function createMockPercentages(type) {
    const dimensions = {
        EI: { E: 0, I: 0 },
        SN: { S: 0, N: 0 },
        TF: { T: 0, F: 0 },
        JP: { J: 0, P: 0 }
    };
    
    // Set based on type
    dimensions.EI[type[0]] = 60;
    dimensions.EI[type[0] === 'E' ? 'I' : 'E'] = 40;
    dimensions.SN[type[1]] = 60;
    dimensions.SN[type[1] === 'S' ? 'N' : 'S'] = 40;
    dimensions.TF[type[2]] = 60;
    dimensions.TF[type[2] === 'T' ? 'F' : 'T'] = 40;
    dimensions.JP[type[3]] = 60;
    dimensions.JP[type[3] === 'J' ? 'P' : 'J'] = 40;
    
    return dimensions;
}

// Display result
function displayResult() {
    displayResultHeader();
    displayPersonalityTraits();
    displayDimensionsAnalysis();
    displayStrengthsWeaknesses();
    displayRelationshipStyle();
    displayGrowthSuggestions();
}

// Display result header
function displayResultHeader() {
    const resultHeader = document.querySelector('.result-header');
    if (!resultHeader || !mbtiTypeData) return;
    
    const typeColor = mbtiColors[testResult.type];
    
    resultHeader.style.setProperty('--type-color', typeColor);
    
    resultHeader.innerHTML = `
        <div class="result-type">
            <h1 class="type-name">${testResult.type}</h1>
            <p class="type-nickname">${mbtiTypeData.nickname}</p>
        </div>
        <div class="result-meta">
            <div class="certainty">
                <span class="certainty-label">정확도</span>
                <div class="certainty-bar">
                    <div class="certainty-fill" style="width: ${testResult.certainty}%"></div>
                </div>
                <span class="certainty-value">${testResult.certainty}%</span>
            </div>
            <div class="test-date">
                <span class="date-label">테스트 일시</span>
                <span class="date-value">${DateUtils.formatDate(testResult.timestamp, 'YYYY-MM-DD HH:mm')}</span>
            </div>
        </div>
        <div class="result-description">
            <p>${mbtiTypeData.description}</p>
        </div>
    `;
    
    // Animate certainty bar
    setTimeout(() => {
        const certaintyFill = resultHeader.querySelector('.certainty-fill');
        if (certaintyFill) {
            certaintyFill.style.width = '0%';
            setTimeout(() => {
                certaintyFill.style.transition = 'width 1s ease-out';
                certaintyFill.style.width = `${testResult.certainty}%`;
            }, 500);
        }
    }, 1000);
}

// Display personality traits
function displayPersonalityTraits() {
    const traitsGrid = document.querySelector('.traits-grid');
    if (!traitsGrid || !mbtiTypeData) return;
    
    DOMUtils.removeAllChildren(traitsGrid);
    
    mbtiTypeData.traits.forEach((trait, index) => {
        const traitCard = DOMUtils.createElement('div', 'trait-card');
        traitCard.innerHTML = `
            <div class="trait-icon">
                <i class="icon-trait-${index + 1}"></i>
            </div>
            <div class="trait-content">
                <h4 class="trait-title">${trait}</h4>
                <p class="trait-description">${getTraitDescription(trait)}</p>
            </div>
        `;
        
        // Add animation delay
        traitCard.style.animationDelay = `${index * 0.1}s`;
        
        traitsGrid.appendChild(traitCard);
    });
}

function getTraitDescription(trait) {
    const descriptions = {
        '분석적': '복잡한 문제를 논리적으로 분해하고 해결책을 찾는 능력이 뛰어납니다.',
        '독립적': '자신만의 방식으로 일을 처리하며 자율성을 중요하게 생각합니다.',
        '창의적': '새로운 아이디어와 혁신적인 해결책을 제시하는 능력이 있습니다.',
        '체계적': '질서정연하고 계획적인 접근을 통해 목표를 달성합니다.',
        '사교적': '다양한 사람들과 쉽게 어울리며 관계를 형성합니다.',
        '직관적': '상황의 본질을 빠르게 파악하고 미래를 내다보는 능력이 있습니다.',
        '논리적': '객관적 사실과 논리에 기반하여 판단을 내립니다.',
        '감정적': '타인의 감정을 잘 이해하고 공감하는 능력이 뛰어납니다.',
        '현실적': '실용적이고 구체적인 관점에서 문제를 바라봅니다.',
        '이상주의적': '높은 이상과 가치를 추구하며 의미를 중시합니다.',
        '적응적': '변화하는 상황에 유연하게 대응할 수 있습니다.',
        '결단력': '빠른 판단과 실행력을 바탕으로 목표를 달성합니다.'
    };
    
    return descriptions[trait] || '이 특성은 당신의 독특한 개성을 나타냅니다.';
}

// Display dimensions analysis
function displayDimensionsAnalysis() {
    const dimensionsContainer = document.querySelector('.dimensions-analysis');
    if (!dimensionsContainer || !testResult.percentages) return;
    
    const dimensions = [
        { key: 'EI', name: 'E (외향) vs I (내향)', data: testResult.percentages.EI },
        { key: 'SN', name: 'S (감각) vs N (직관)', data: testResult.percentages.SN },
        { key: 'TF', name: 'T (사고) vs F (감정)', data: testResult.percentages.TF },
        { key: 'JP', name: 'J (판단) vs P (인식)', data: testResult.percentages.JP }
    ];
    
    DOMUtils.removeAllChildren(dimensionsContainer);
    
    dimensions.forEach((dimension, index) => {
        const dimensionElement = createDimensionElement(dimension);
        dimensionsContainer.appendChild(dimensionElement);
        
        // Animate bars with delay
        setTimeout(() => {
            animateDimensionBars(dimensionElement, dimension.data);
        }, index * 200 + 1000);
    });
}

function createDimensionElement(dimension) {
    const element = DOMUtils.createElement('div', 'dimension-item');
    const letters = Object.keys(dimension.data);
    
    element.innerHTML = `
        <div class="dimension-header">
            <h4 class="dimension-name">${dimension.name}</h4>
            <div class="dimension-description">
                ${getDimensionDescription(dimension.key)}
            </div>
        </div>
        <div class="dimension-bars">
            ${letters.map(letter => `
                <div class="dimension-bar">
                    <div class="bar-label">
                        <span class="bar-letter">${letter}</span>
                        <span class="bar-percentage">${dimension.data[letter]}%</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar-fill" data-letter="${letter}" style="width: 0%"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    return element;
}

function animateDimensionBars(element, data) {
    const bars = element.querySelectorAll('.bar-fill');
    
    bars.forEach(bar => {
        const letter = bar.dataset.letter;
        const percentage = data[letter];
        
        bar.style.transition = 'width 1s ease-out';
        bar.style.width = `${percentage}%`;
        
        // Add color based on dominance
        if (percentage > 60) {
            bar.style.backgroundColor = 'var(--primary-color)';
        } else if (percentage < 40) {
            bar.style.backgroundColor = 'var(--secondary-color)';
        } else {
            bar.style.backgroundColor = 'var(--accent-color)';
        }
    });
}

// Display strengths and weaknesses
function displayStrengthsWeaknesses() {
    displayStrengths();
    displayWeaknesses();
}

function displayStrengths() {
    const strengthsList = document.querySelector('.strengths-list');
    if (!strengthsList || !mbtiTypeData) return;
    
    DOMUtils.removeAllChildren(strengthsList);
    
    mbtiTypeData.strengths.forEach((strength, index) => {
        const strengthItem = DOMUtils.createElement('li', 'strength-item');
        strengthItem.innerHTML = `
            <div class="strength-icon">✓</div>
            <span class="strength-text">${strength}</span>
        `;
        
        strengthItem.style.animationDelay = `${index * 0.1}s`;
        strengthsList.appendChild(strengthItem);
    });
}

function displayWeaknesses() {
    const weaknessesList = document.querySelector('.weaknesses-list');
    if (!weaknessesList || !mbtiTypeData) return;
    
    DOMUtils.removeAllChildren(weaknessesList);
    
    mbtiTypeData.weaknesses.forEach((weakness, index) => {
        const weaknessItem = DOMUtils.createElement('li', 'weakness-item');
        weaknessItem.innerHTML = `
            <div class="weakness-icon">!</div>
            <span class="weakness-text">${weakness}</span>
        `;
        
        weaknessItem.style.animationDelay = `${index * 0.1}s`;
        weaknessesList.appendChild(weaknessItem);
    });
}

// Display relationship style
function displayRelationshipStyle() {
    const relationshipSection = document.querySelector('.relationship-style');
    if (!relationshipSection || !mbtiTypeData) return;
    
    const relationshipContent = relationshipSection.querySelector('.relationship-content');
    if (relationshipContent) {
        relationshipContent.innerHTML = `
            <p>${mbtiTypeData.relationships}</p>
            <div class="relationship-tips">
                <h5>관계 개선 팁</h5>
                <ul>
                    ${getRelationshipTips(testResult.type).map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

function getRelationshipTips(type) {
    const tips = {
        'INTJ': ['깊이 있는 대화를 나누세요', '상대방의 감정도 고려해보세요', '완벽주의적 성향을 조절하세요'],
        'INTP': ['감정 표현을 더 해보세요', '실용적인 조언도 제공하세요', '일관성을 유지하세요'],
        'ENTJ': ['다른 사람의 의견도 들어보세요', '감정적인 면도 인정하세요', '인내심을 기르세요'],
        'ENTP': ['약속을 지키려 노력하세요', '상대방의 감정을 배려하세요', '깊이 있는 관계를 만들어보세요'],
        'INFJ': ['자신의 필요도 표현하세요', '경계선을 설정하세요', '완벽함을 추구하지 마세요'],
        'INFP': ['갈등을 피하지 마세요', '현실적인 기대를 가지세요', '자신의 가치를 명확히 하세요'],
        'ENFJ': ['자신을 돌보는 시간을 가지세요', '비판을 받아들이는 연습을 하세요', '경계선을 지키세요'],
        'ENFP': ['약속을 지키려 노력하세요', '현실적인 계획을 세우세요', '감정의 기복을 조절하세요'],
        'ISTJ': ['변화에 유연하게 대응하세요', '감정 표현을 늘려보세요', '새로운 경험에 열린 마음을 가지세요'],
        'ISFJ': ['자신의 의견을 표현하세요', '거절하는 법을 배우세요', '자신을 우선시하는 시간을 가지세요'],
        'ESTJ': ['다른 관점을 수용하세요', '감정적인 지지를 제공하세요', '융통성을 발휘하세요'],
        'ESFJ': ['비판을 개인적으로 받아들이지 마세요', '자신의 필요를 표현하세요', '갈등을 건설적으로 해결하세요'],
        'ISTP': ['감정을 표현해보세요', '계획을 세우는 습관을 기르세요', '타인과의 소통을 늘려보세요'],
        'ISFP': ['자신의 의견을 당당히 표현하세요', '갈등을 피하지 마세요', '현실적인 목표를 세우세요'],
        'ESTP': ['장기적인 계획을 세워보세요', '다른 사람의 감정을 고려하세요', '충동적인 행동을 자제하세요'],
        'ESFP': ['현실적인 계획을 세우세요', '비판을 받아들이는 연습을 하세요', '혼자만의 시간도 가지세요']
    };
    
    return tips[type] || ['서로를 이해하려 노력하세요', '소통을 늘려보세요', '차이점을 인정하세요'];
}

// Display growth suggestions
function displayGrowthSuggestions() {
    const suggestionsSection = document.querySelector('.growth-suggestions');
    if (!suggestionsSection || !testResult) return;
    
    const suggestions = generateImprovementSuggestions(testResult);
    const suggestionsList = suggestionsSection.querySelector('.suggestions-list');
    
    if (suggestionsList) {
        DOMUtils.removeAllChildren(suggestionsList);
        
        suggestions.forEach((suggestion, index) => {
            const suggestionItem = DOMUtils.createElement('li', 'suggestion-item');
            suggestionItem.innerHTML = `
                <div class="suggestion-icon">💡</div>
                <span class="suggestion-text">${suggestion}</span>
            `;
            
            suggestionItem.style.animationDelay = `${index * 0.1}s`;
            suggestionsList.appendChild(suggestionItem);
        });
    }
}

// Initialize share functionality
function initializeShareFunctionality() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(button => {
        const platform = button.dataset.share;
        button.addEventListener('click', () => shareResult(platform));
    });
    
    // Copy link button
    const copyLinkBtn = document.querySelector('.btn-copy-link');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', copyResultLink);
    }
}

function shareResult(platform) {
    const shareURL = URLUtils.createShareableURL(testResult);
    const shareText = `내 MBTI 유형은 ${testResult.type} (${mbtiTypeData.nickname})입니다! 정확도 ${testResult.certainty}%`;
    
    switch(platform) {
        case 'facebook':
            SNSShare.shareToFacebook(shareURL, shareText);
            break;
        case 'twitter':
            SNSShare.shareToTwitter(shareURL, shareText);
            break;
        case 'kakao':
            SNSShare.shareToKakao(shareURL, shareText, mbtiTypeData.description);
            break;
        case 'line':
            SNSShare.shareToLine(shareURL, shareText);
            break;
    }
    
    // Track share event
    trackShareEvent(platform);
}

function copyResultLink() {
    const shareURL = URLUtils.createShareableURL(testResult);
    
    SNSShare.copyToClipboard(shareURL)
        .then(() => {
            Toast.success('링크가 클립보드에 복사되었습니다!');
        })
        .catch(() => {
            Toast.error('링크 복사에 실패했습니다.');
        });
}

function trackShareEvent(platform) {
    // Analytics tracking would go here
    console.log(`Shared to ${platform}:`, testResult.type);
}

// Initialize result navigation
function initializeResultNavigation() {
    // Retake test button
    const retakeBtn = document.querySelector('.btn-retake');
    if (retakeBtn) {
        retakeBtn.addEventListener('click', () => {
            if (confirm('테스트를 다시 받으시겠습니까?')) {
                // Clear stored result
                StorageManager.removeItem('mbti_test_result');
                window.location.href = 'test.html';
            }
        });
    }
    
    // Home button
    const homeBtn = document.querySelector('.btn-home');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    // Print result button
    const printBtn = document.querySelector('.btn-print');
    if (printBtn) {
        printBtn.addEventListener('click', printResult);
    }
    
    // Download PDF button
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResultPDF);
    }
}

function printResult() {
    window.print();
}

function downloadResultPDF() {
    Toast.info('PDF 다운로드 기능은 준비 중입니다.');
    // PDF generation would be implemented here
}

// Initialize animations
function initializeAnimations() {
    // Stagger animations for result sections
    const resultSections = document.querySelectorAll('.result-section');
    resultSections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
        section.classList.add('fade-in-up');
    });
    
    // Parallax effect for result header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const resultHeader = document.querySelector('.result-header');
        if (resultHeader) {
            resultHeader.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Initialize compatibility section
function initializeCompatibilitySection() {
    const compatibilityContainer = document.querySelector('.compatibility-types');
    if (!compatibilityContainer) return;
    
    const compatibleTypes = getCompatibleTypes(testResult.type);
    
    DOMUtils.removeAllChildren(compatibilityContainer);
    
    compatibleTypes.forEach(({ type, compatibility }) => {
        const typeCard = createCompatibilityCard(type, compatibility);
        compatibilityContainer.appendChild(typeCard);
    });
}

function getCompatibleTypes(userType) {
    const allTypes = Object.keys(mbtiTypes);
    const compatibilities = allTypes.map(type => ({
        type,
        compatibility: calculateCompatibility(userType, type)
    }));
    
    return compatibilities
        .sort((a, b) => b.compatibility - a.compatibility)
        .slice(0, 5); // Top 5 compatible types
}

function createCompatibilityCard(type, compatibility) {
    const card = DOMUtils.createElement('div', 'compatibility-card');
    const typeData = mbtiTypes[type];
    
    card.innerHTML = `
        <div class="compatibility-header">
            <h4 class="compatibility-type">${type}</h4>
            <div class="compatibility-score">${compatibility}%</div>
        </div>
        <p class="compatibility-name">${typeData.nickname}</p>
        <div class="compatibility-bar">
            <div class="compatibility-fill" style="width: ${compatibility}%"></div>
        </div>
    `;
    
    card.style.setProperty('--type-color', mbtiColors[type]);
    
    return card;
}

// Initialize career section
function initializeCareerSection() {
    const careersContainer = document.querySelector('.careers-grid');
    if (!careersContainer || !mbtiTypeData) return;
    
    DOMUtils.removeAllChildren(careersContainer);
    
    mbtiTypeData.careers.forEach((career, index) => {
        const careerCard = DOMUtils.createElement('div', 'career-card');
        careerCard.innerHTML = `
            <div class="career-icon">💼</div>
            <h4 class="career-title">${career}</h4>
            <p class="career-description">${getCareerDescription(career)}</p>
        `;
        
        careerCard.style.animationDelay = `${index * 0.1}s`;
        careersContainer.appendChild(careerCard);
    });
}

function getCareerDescription(career) {
    // This could be expanded with a comprehensive career description database
    return '이 직업은 당신의 성격 유형과 잘 맞는 분야입니다.';
}

// Initialize learning style section
function initializeLearningStyleSection() {
    const learningContainer = document.querySelector('.learning-styles');
    if (!learningContainer) return;
    
    const learningStyles = getLearningStyleRecommendations(testResult.type);
    
    DOMUtils.removeAllChildren(learningContainer);
    
    learningStyles.forEach((style, index) => {
        const styleItem = DOMUtils.createElement('div', 'learning-style-item');
        styleItem.innerHTML = `
            <div class="style-icon">📚</div>
            <span class="style-text">${style}</span>
        `;
        
        styleItem.style.animationDelay = `${index * 0.1}s`;
        learningContainer.appendChild(styleItem);
    });
}

// Show no result message
function showNoResultMessage() {
    const resultContainer = document.querySelector('.result-container');
    if (resultContainer) {
        resultContainer.innerHTML = `
            <div class="no-result">
                <div class="no-result-icon">🤔</div>
                <h2>결과를 찾을 수 없습니다</h2>
                <p>테스트를 완료하지 않았거나 결과가 만료되었습니다.</p>
                <a href="test.html" class="btn btn-primary">테스트 시작하기</a>
            </div>
        `;
    }
}

// Save result for future reference
function saveResultHistory() {
    if (!testResult) return;
    
    const history = StorageManager.getItem('mbti_result_history') || [];
    
    // Add current result to history
    history.unshift({
        ...testResult,
        id: Date.now()
    });
    
    // Keep only last 10 results
    const limitedHistory = history.slice(0, 10);
    
    StorageManager.setItem('mbti_result_history', limitedHistory);
}

// Save result to history
saveResultHistory();