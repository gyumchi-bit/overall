// MBTI 점수 계산기 JavaScript
class MBTICalculator {
    constructor() {
        this.scores = {
            E: 50, I: 50,
            S: 50, N: 50,
            T: 50, F: 50,
            J: 50, P: 50
        };
        
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
        
        this.dimensionLabels = {
            E: "외향형", I: "내향형",
            S: "감각형", N: "직관형", 
            T: "사고형", F: "감정형",
            J: "판단형", P: "인식형"
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateAllResults();
    }
    
    bindEvents() {
        // Score input events
        const scoreInputs = document.querySelectorAll('.score-input');
        scoreInputs.forEach(input => {
            input.addEventListener('input', (e) => this.handleScoreInput(e));
            input.addEventListener('blur', (e) => this.validateInput(e));
        });
        
        // Preset button events
        const presetButtons = document.querySelectorAll('.preset-btn');
        presetButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handlePresetClick(e));
        });
        
        // Action button events
        const viewDetailBtn = document.getElementById('viewTypeDetail');
        const shareBtn = document.getElementById('shareCalculation');
        const resetBtn = document.getElementById('resetCalculator');
        
        if (viewDetailBtn) {
            viewDetailBtn.addEventListener('click', () => this.viewTypeDetail());
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareCalculation());
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetCalculator());
        }
    }
    
    handleScoreInput(event) {
        const input = event.target;
        const value = parseInt(input.value) || 0;
        const pairInputId = input.dataset.pair;
        const pairInput = document.getElementById(pairInputId);
        
        // Validate range
        if (value < 0) {
            input.value = 0;
            return;
        }
        if (value > 100) {
            input.value = 100;
            return;
        }
        
        // Update pair value to maintain 100 total
        const pairValue = 100 - value;
        pairInput.value = pairValue;
        
        // Update scores object
        const scoreKey = input.id.replace('score', '');
        const pairKey = pairInput.id.replace('score', '');
        
        this.scores[scoreKey] = value;
        this.scores[pairKey] = pairValue;
        
        // Update visual results
        this.updateDimensionResult(scoreKey, pairKey);
        this.updateCalculationResult();
        
        // Remove invalid class
        input.classList.remove('invalid');
        pairInput.classList.remove('invalid');
    }
    
    validateInput(event) {
        const input = event.target;
        const value = parseInt(input.value);
        const pairInputId = input.dataset.pair;
        const pairInput = document.getElementById(pairInputId);
        const pairValue = parseInt(pairInput.value);
        
        // Check if sum equals 100
        if (value + pairValue !== 100) {
            input.classList.add('invalid');
            pairInput.classList.add('invalid');
            this.showToast('좌우 점수의 합이 100이 되어야 합니다.', 'warning');
        } else {
            input.classList.remove('invalid');
            pairInput.classList.remove('invalid');
        }
    }
    
    handlePresetClick(event) {
        const button = event.target;
        const dimension = button.dataset.dimension;
        const leftValue = parseInt(button.dataset.left);
        const rightValue = parseInt(button.dataset.right);
        
        // Update inputs based on dimension
        let leftInput, rightInput;
        
        switch(dimension) {
            case 'EI':
                leftInput = document.getElementById('scoreE');
                rightInput = document.getElementById('scoreI');
                break;
            case 'SN':
                leftInput = document.getElementById('scoreS');
                rightInput = document.getElementById('scoreN');
                break;
            case 'TF':
                leftInput = document.getElementById('scoreT');
                rightInput = document.getElementById('scoreF');
                break;
            case 'JP':
                leftInput = document.getElementById('scoreJ');
                rightInput = document.getElementById('scoreP');
                break;
        }
        
        if (leftInput && rightInput) {
            leftInput.value = leftValue;
            rightInput.value = rightValue;
            
            // Trigger input event to update everything
            leftInput.dispatchEvent(new Event('input'));
        }
    }
    
    updateDimensionResult(leftKey, rightKey) {
        const leftScore = this.scores[leftKey];
        const rightScore = this.scores[rightKey];
        
        // Determine dimension pair
        let dimension;
        if ((leftKey === 'E' && rightKey === 'I') || (leftKey === 'I' && rightKey === 'E')) {
            dimension = 'EI';
        } else if ((leftKey === 'S' && rightKey === 'N') || (leftKey === 'N' && rightKey === 'S')) {
            dimension = 'SN';
        } else if ((leftKey === 'T' && rightKey === 'F') || (leftKey === 'F' && rightKey === 'T')) {
            dimension = 'TF';
        } else if ((leftKey === 'J' && rightKey === 'P') || (leftKey === 'P' && rightKey === 'J')) {
            dimension = 'JP';
        }
        
        const resultBar = document.getElementById(`result${dimension}`);
        const resultText = document.getElementById(`resultText${dimension}`);
        
        if (!resultBar || !resultText) return;
        
        // Determine dominant type and percentage
        let dominantType, dominantScore, dominantLabel;
        
        if (leftScore > rightScore) {
            dominantType = leftKey;
            dominantScore = leftScore;
            dominantLabel = this.dimensionLabels[leftKey];
        } else if (rightScore > leftScore) {
            dominantType = rightKey;
            dominantScore = rightScore;
            dominantLabel = this.dimensionLabels[rightKey];
        } else {
            dominantType = 'balanced';
            dominantScore = 50;
            dominantLabel = '균형';
        }
        
        // Update visual bar
        const percentage = dominantScore;
        resultBar.style.width = `${percentage}%`;
        resultBar.textContent = `${dominantLabel} ${percentage}%`;
        
        // Update result text
        if (dominantScore === 50) {
            resultText.textContent = `${this.dimensionLabels[leftKey]}과 ${this.dimensionLabels[rightKey]}이 균형을 이루고 있습니다.`;
        } else if (dominantScore >= 70) {
            resultText.textContent = `강한 ${dominantLabel} 성향을 보입니다. (${dominantScore}%)`;
        } else if (dominantScore >= 60) {
            resultText.textContent = `중간 정도의 ${dominantLabel} 성향을 보입니다. (${dominantScore}%)`;
        } else {
            resultText.textContent = `약한 ${dominantLabel} 성향을 보입니다. (${dominantScore}%)`;
        }
    }
    
    updateAllResults() {
        // Update all dimension results
        this.updateDimensionResult('E', 'I');
        this.updateDimensionResult('S', 'N');
        this.updateDimensionResult('T', 'F');
        this.updateDimensionResult('J', 'P');
        
        // Update calculation result
        this.updateCalculationResult();
    }
    
    updateCalculationResult() {
        // Calculate MBTI type
        const type = 
            (this.scores.E >= this.scores.I ? 'E' : 'I') +
            (this.scores.S >= this.scores.N ? 'S' : 'N') +
            (this.scores.T >= this.scores.F ? 'T' : 'F') +
            (this.scores.J >= this.scores.P ? 'J' : 'P');
        
        const typeInfo = this.mbtiTypes[type];
        
        // Update display
        document.getElementById('calculatedType').textContent = type;
        document.getElementById('calculatedName').textContent = typeInfo.name;
        
        // Update breakdown
        const breakdown = document.getElementById('dimensionBreakdown');
        const typeArray = type.split('');
        
        breakdown.innerHTML = typeArray.map((letter, index) => {
            const score = this.scores[letter];
            const label = this.dimensionLabels[letter];
            
            return `
                <div class="breakdown-item">
                    <div class="breakdown-type">${letter}</div>
                    <div class="breakdown-percentage">${score}%</div>
                    <div class="breakdown-label">${label}</div>
                </div>
            `;
        }).join('');
        
        // Update view detail link
        const viewDetailBtn = document.getElementById('viewTypeDetail');
        if (viewDetailBtn) {
            viewDetailBtn.href = `types/${type.toLowerCase()}.html`;
        }
    }
    
    viewTypeDetail() {
        const type = document.getElementById('calculatedType').textContent;
        window.open(`types/${type.toLowerCase()}.html`, '_blank');
    }
    
    shareCalculation() {
        const type = document.getElementById('calculatedType').textContent;
        const name = document.getElementById('calculatedName').textContent;
        const url = window.location.href.split('?')[0];
        
        // Create share text with scores
        const scoresText = [
            `E: ${this.scores.E}% / I: ${this.scores.I}%`,
            `S: ${this.scores.S}% / N: ${this.scores.N}%`,
            `T: ${this.scores.T}% / F: ${this.scores.F}%`,
            `J: ${this.scores.J}% / P: ${this.scores.P}%`
        ].join('\n');
        
        const shareText = `MBTI 점수 계산 결과: ${type} - ${name}\n\n세부 점수:\n${scoresText}\n\n계산기 사용하기: ${url}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'MBTI 점수 계산 결과',
                text: shareText,
                url: url
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showToast('결과가 클립보드에 복사되었습니다!', 'success');
            }).catch(() => {
                // Fallback: show modal with text to copy
                alert('다음 텍스트를 복사해서 공유하세요:\n\n' + shareText);
            });
        }
    }
    
    resetCalculator() {
        // Reset all scores to 50/50
        this.scores = {
            E: 50, I: 50,
            S: 50, N: 50,
            T: 50, F: 50,
            J: 50, P: 50
        };
        
        // Reset all inputs
        const scoreInputs = document.querySelectorAll('.score-input');
        scoreInputs.forEach(input => {
            input.value = 50;
            input.classList.remove('invalid');
        });
        
        // Update all results
        this.updateAllResults();
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        this.showToast('계산기가 초기화되었습니다.', 'info');
    }
    
    showToast(message, type = 'info') {
        // Simple toast implementation
        const toast = document.createElement('div');
        const bgClass = type === 'success' ? 'alert-success' : 
                       type === 'warning' ? 'alert-warning' : 
                       type === 'error' ? 'alert-danger' : 'alert-info';
        
        toast.className = `position-fixed top-0 start-50 translate-middle-x mt-3 alert ${bgClass} alert-dismissible`;
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
    
    // Utility method to set scores programmatically
    setScores(newScores) {
        // Validate that pairs sum to 100
        if (newScores.E + newScores.I !== 100 ||
            newScores.S + newScores.N !== 100 ||
            newScores.T + newScores.F !== 100 ||
            newScores.J + newScores.P !== 100) {
            console.error('Invalid scores: pairs must sum to 100');
            return false;
        }
        
        // Update scores
        this.scores = { ...newScores };
        
        // Update inputs
        Object.keys(newScores).forEach(key => {
            const input = document.getElementById(`score${key}`);
            if (input) {
                input.value = newScores[key];
            }
        });
        
        // Update results
        this.updateAllResults();
        
        return true;
    }
    
    // Method to get current calculated type
    getCurrentType() {
        return (this.scores.E >= this.scores.I ? 'E' : 'I') +
               (this.scores.S >= this.scores.N ? 'S' : 'N') +
               (this.scores.T >= this.scores.F ? 'T' : 'F') +
               (this.scores.J >= this.scores.P ? 'J' : 'P');
    }
    
    // Method to get current scores
    getCurrentScores() {
        return { ...this.scores };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mbtiCalculator = new MBTICalculator();
});

// URL parameter handling for preset scores
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if scores are provided in URL
    const scores = {
        E: parseInt(urlParams.get('E')) || 50,
        I: parseInt(urlParams.get('I')) || 50,
        S: parseInt(urlParams.get('S')) || 50,
        N: parseInt(urlParams.get('N')) || 50,
        T: parseInt(urlParams.get('T')) || 50,
        F: parseInt(urlParams.get('F')) || 50,
        J: parseInt(urlParams.get('J')) || 50,
        P: parseInt(urlParams.get('P')) || 50
    };
    
    // If any non-default scores are provided, set them
    const hasCustomScores = Object.values(scores).some(score => score !== 50);
    if (hasCustomScores && window.mbtiCalculator) {
        setTimeout(() => {
            window.mbtiCalculator.setScores(scores);
        }, 100);
    }
});