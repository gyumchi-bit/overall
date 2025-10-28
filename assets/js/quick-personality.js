// 빠른 성격 분석 JavaScript
class QuickPersonalityTest {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.questions = [
            {
                id: 1,
                text: "새로운 사람들과 만날 때 당신은?",
                dimension: "EI",
                answers: [
                    { text: "먼저 다가가서 인사하고 대화를 시작한다", value: "E", score: 1 },
                    { text: "누군가 먼저 말을 걸 때까지 기다린다", value: "I", score: 1 }
                ]
            },
            {
                id: 2,
                text: "중요한 결정을 내릴 때 무엇을 더 중시하나요?",
                dimension: "TF",
                answers: [
                    { text: "논리적 분석과 객관적 사실", value: "T", score: 1 },
                    { text: "감정과 다른 사람들에게 미치는 영향", value: "F", score: 1 }
                ]
            },
            {
                id: 3,
                text: "정보를 받아들일 때 당신은?",
                dimension: "SN",
                answers: [
                    { text: "구체적이고 실질적인 정보를 선호한다", value: "S", score: 1 },
                    { text: "가능성과 의미, 전체적인 그림을 중시한다", value: "N", score: 1 }
                ]
            },
            {
                id: 4,
                text: "계획을 세울 때 당신의 스타일은?",
                dimension: "JP",
                answers: [
                    { text: "미리 세세하게 계획하고 일정을 지킨다", value: "J", score: 1 },
                    { text: "대략적인 방향만 정하고 융통성 있게 진행한다", value: "P", score: 1 }
                ]
            },
            {
                id: 5,
                text: "문제가 생겼을 때 당신의 해결 방식은?",
                dimension: "TF",
                answers: [
                    { text: "원인을 분석하고 체계적으로 접근한다", value: "T", score: 1 },
                    { text: "관련된 사람들의 감정과 관계를 고려한다", value: "F", score: 1 }
                ]
            },
            {
                id: 6,
                text: "휴식 시간에 당신은?",
                dimension: "EI",
                answers: [
                    { text: "친구들과 함께 시간을 보내며 에너지를 얻는다", value: "E", score: 1 },
                    { text: "혼자만의 시간을 가지며 재충전한다", value: "I", score: 1 }
                ]
            },
            {
                id: 7,
                text: "미래에 대해 생각할 때?",
                dimension: "SN",
                answers: [
                    { text: "현실적이고 구체적인 목표에 집중한다", value: "S", score: 1 },
                    { text: "큰 그림과 이상적인 비전을 그린다", value: "N", score: 1 }
                ]
            },
            {
                id: 8,
                text: "작업을 마무리할 때?",
                dimension: "JP",
                answers: [
                    { text: "정해진 기한 전에 미리 완료하려고 한다", value: "J", score: 1 },
                    { text: "마감 직전에 집중해서 빠르게 처리한다", value: "P", score: 1 }
                ]
            }
        ];
        
        this.mbtiTypes = {
            "INTJ": { name: "건축가", description: "상상력이 풍부하고 전략적인 사고를 가진 완벽주의자" },
            "INTP": { name: "논리술사", description: "지식을 갈망하는 혁신적인 발명가" },
            "ENTJ": { name: "통솔자", description: "대담하고 상상력이 풍부한 강력한 지도자" },
            "ENTP": { name: "변론가", description: "영리하고 호기심이 많은 사색가" },
            "INFJ": { name: "옹호자", description: "선의의 옹호자이자 이상주의자" },
            "INFP": { name: "중재자", description: "항상 선을 행할 준비가 되어 있는 이타주의자" },
            "ENFJ": { name: "선도자", description: "카리스마 있고 영감을 주는 지도자" },
            "ENFP": { name: "활동가", description: "열정적이고 창의적인 자유로운 영혼" },
            "ISTJ": { name: "현실주의자", description: "실용적이고 현실적인 신뢰할 수 있는 사람" },
            "ISFJ": { name: "수호자", description: "따뜻한 마음과 헌신적인 보호자" },
            "ESTJ": { name: "경영자", description: "훌륭한 관리자이며 전통과 질서를 중시하는 사람" },
            "ESFJ": { name: "집정관", description: "배려심이 많고 사교적인 인기인" },
            "ISTP": { name: "장인", description: "대담하고 실용적인 실험정신이 풍부한 사람" },
            "ISFP": { name: "모험가", description: "유연하고 매력적인 예술가" },
            "ESTP": { name: "사업가", description: "영리하고 에너지 넘치는 인식이 뛰어난 사람" },
            "ESFP": { name: "연예인", description: "자발적이고 열정적인 사람들의 연예인" }
        };
        
        this.startTime = null;
        this.timer = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        const startBtn = document.getElementById('startQuickTest');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const retakeBtn = document.getElementById('retakeTest');
        const shareBtn = document.getElementById('shareResult');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startTest());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevQuestion());
        }
        
        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => this.retakeTest());
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareResult());
        }
    }
    
    startTest() {
        this.startTime = new Date();
        this.currentQuestion = 0;
        this.answers = {};
        
        // Hide intro card
        document.getElementById('introCard').style.display = 'none';
        
        // Show progress and questions
        document.getElementById('progressContainer').classList.remove('d-none');
        document.getElementById('questionsContainer').classList.remove('d-none');
        document.getElementById('navigationButtons').classList.remove('d-none');
        
        // Start timer
        this.startTimer();
        
        // Show first question
        this.showQuestion(0);
    }
    
    startTimer() {
        const timerDisplay = document.getElementById('timeDisplay');
        
        this.timer = setInterval(() => {
            const now = new Date();
            const elapsed = Math.floor((now - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    showQuestion(index) {
        if (index >= this.questions.length) {
            this.showResult();
            return;
        }
        
        const question = this.questions[index];
        const container = document.getElementById('questionsContainer');
        
        container.innerHTML = `
            <div class="question-card">
                <div class="question-number">${question.id}</div>
                <div class="question-text">${question.text}</div>
                <div class="answers-container">
                    ${question.answers.map((answer, i) => `
                        <label class="answer-choice" data-value="${answer.value}">
                            <input type="radio" name="question${question.id}" value="${answer.value}">
                            <span>${answer.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Bind answer selection
        const answerChoices = container.querySelectorAll('.answer-choice');
        answerChoices.forEach(choice => {
            choice.addEventListener('click', () => {
                // Remove selected class from all choices
                answerChoices.forEach(c => c.classList.remove('selected'));
                
                // Add selected class to clicked choice
                choice.classList.add('selected');
                
                // Store answer
                this.answers[question.dimension] = choice.dataset.value;
                
                // Enable next button
                document.getElementById('nextBtn').disabled = false;
                
                // Auto-advance after short delay
                setTimeout(() => {
                    if (this.currentQuestion < this.questions.length - 1) {
                        this.nextQuestion();
                    } else {
                        this.showResult();
                    }
                }, 500);
            });
        });
        
        // Update progress
        this.updateProgress();
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }
    
    updateProgress() {
        const progress = (this.currentQuestion / this.questions.length) * 100;
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${this.currentQuestion}/${this.questions.length}`;
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.disabled = this.currentQuestion === 0;
        nextBtn.disabled = !this.answers[this.questions[this.currentQuestion].dimension];
        
        if (this.currentQuestion === this.questions.length - 1) {
            nextBtn.innerHTML = '결과 보기<i class="fas fa-check ms-2"></i>';
        } else {
            nextBtn.innerHTML = '다음<i class="fas fa-chevron-right ms-2"></i>';
        }
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion(this.currentQuestion);
        } else {
            this.showResult();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion(this.currentQuestion);
        }
    }
    
    calculateResult() {
        const scores = {
            E: 0, I: 0,
            S: 0, N: 0,
            T: 0, F: 0,
            J: 0, P: 0
        };
        
        // Count scores for each dimension
        this.questions.forEach(question => {
            const answer = this.answers[question.dimension];
            if (answer) {
                scores[answer]++;
            }
        });
        
        // Determine type
        const type = 
            (scores.E >= scores.I ? 'E' : 'I') +
            (scores.S >= scores.N ? 'S' : 'N') +
            (scores.T >= scores.F ? 'T' : 'F') +
            (scores.J >= scores.P ? 'J' : 'P');
        
        // Calculate percentages
        const percentages = {
            EI: scores.E > scores.I ? { type: 'E', percent: Math.round((scores.E / (scores.E + scores.I)) * 100) } : 
                                     { type: 'I', percent: Math.round((scores.I / (scores.E + scores.I)) * 100) },
            SN: scores.S > scores.N ? { type: 'S', percent: Math.round((scores.S / (scores.S + scores.N)) * 100) } : 
                                     { type: 'N', percent: Math.round((scores.N / (scores.S + scores.N)) * 100) },
            TF: scores.T > scores.F ? { type: 'T', percent: Math.round((scores.T / (scores.T + scores.F)) * 100) } : 
                                     { type: 'F', percent: Math.round((scores.F / (scores.T + scores.F)) * 100) },
            JP: scores.J > scores.P ? { type: 'J', percent: Math.round((scores.J / (scores.J + scores.P)) * 100) } : 
                                     { type: 'P', percent: Math.round((scores.P / (scores.J + scores.P)) * 100) }
        };
        
        return { type, percentages, scores };
    }
    
    showResult() {
        clearInterval(this.timer);
        
        const result = this.calculateResult();
        const typeInfo = this.mbtiTypes[result.type];
        
        // Hide test interface
        document.getElementById('progressContainer').style.display = 'none';
        document.getElementById('questionsContainer').style.display = 'none';
        document.getElementById('navigationButtons').style.display = 'none';
        
        // Show result
        const resultContainer = document.getElementById('resultContainer');
        document.getElementById('resultType').textContent = result.type;
        document.getElementById('resultName').textContent = typeInfo.name;
        
        // Show dimension scores
        this.showDimensionScores(result.percentages);
        
        resultContainer.style.display = 'block';
        
        // Store result for sharing
        this.lastResult = result;
    }
    
    showDimensionScores(percentages) {
        const container = document.getElementById('dimensionScores');
        const dimensions = [
            { key: 'EI', label: '에너지 방향', types: { E: '외향형', I: '내향형' } },
            { key: 'SN', label: '인식 기능', types: { S: '감각형', N: '직관형' } },
            { key: 'TF', label: '판단 기능', types: { T: '사고형', F: '감정형' } },
            { key: 'JP', label: '생활 양식', types: { J: '판단형', P: '인식형' } }
        ];
        
        container.innerHTML = dimensions.map(dim => {
            const result = percentages[dim.key];
            const opposite = dim.key === 'EI' ? (result.type === 'E' ? 'I' : 'E') :
                            dim.key === 'SN' ? (result.type === 'S' ? 'N' : 'S') :
                            dim.key === 'TF' ? (result.type === 'T' ? 'F' : 'T') :
                                               (result.type === 'J' ? 'P' : 'J');
            
            return `
                <div class="col-12">
                    <div class="dimension-score">
                        <div class="dimension-label">
                            <span><strong>${dim.label}</strong></span>
                            <span class="text-muted">${dim.types[result.type]} ${result.percent}%</span>
                        </div>
                        <div class="dimension-bar">
                            <div class="dimension-fill" 
                                 style="width: ${result.percent}%; background: var(--gradient-${result.type === 'E' || result.type === 'N' || result.type === 'F' || result.type === 'P' ? 'primary' : 'secondary'});">
                                <div class="dimension-percentage">${result.percent}%</div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mt-1">
                            <small class="text-muted">${dim.types[opposite]}</small>
                            <small class="text-muted">${dim.types[result.type]}</small>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Animate bars
        setTimeout(() => {
            const fills = container.querySelectorAll('.dimension-fill');
            fills.forEach(fill => {
                fill.style.width = fill.style.width;
            });
        }, 100);
    }
    
    retakeTest() {
        // Reset everything
        this.currentQuestion = 0;
        this.answers = {};
        this.startTime = null;
        clearInterval(this.timer);
        
        // Show intro card
        document.getElementById('introCard').style.display = 'block';
        
        // Hide other elements
        document.getElementById('progressContainer').classList.add('d-none');
        document.getElementById('questionsContainer').classList.add('d-none');
        document.getElementById('navigationButtons').classList.add('d-none');
        document.getElementById('resultContainer').style.display = 'none';
        
        // Reset timer display
        document.getElementById('timeDisplay').textContent = '00:00';
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    shareResult() {
        if (!this.lastResult) return;
        
        const result = this.lastResult;
        const typeInfo = this.mbtiTypes[result.type];
        const url = window.location.href.split('?')[0];
        
        const shareText = `빠른 성격 분석 결과: ${result.type} - ${typeInfo.name}\n${typeInfo.description}\n\n나도 테스트해보기: ${url}`;
        
        if (navigator.share) {
            navigator.share({
                title: '빠른 MBTI 성격 분석 결과',
                text: shareText,
                url: url
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                // Show toast or alert
                this.showToast('결과가 클립보드에 복사되었습니다!');
            }).catch(() => {
                // Fallback: show modal with text to copy
                alert('다음 텍스트를 복사해서 공유하세요:\n\n' + shareText);
            });
        }
    }
    
    showToast(message) {
        // Simple toast implementation
        const toast = document.createElement('div');
        toast.className = 'position-fixed top-0 start-50 translate-middle-x mt-3 alert alert-success alert-dismissible';
        toast.style.zIndex = '9999';
        toast.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuickPersonalityTest();
});

// Gradient definitions for different types
const gradientColors = {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    E: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    I: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    S: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    N: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    T: 'linear-gradient(135deg, #96fbc4 0%, #f9f047 100%)',
    F: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    J: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    P: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
};