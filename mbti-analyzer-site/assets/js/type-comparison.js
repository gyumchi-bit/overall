// MBTI 유형 비교 도구 JavaScript
class TypeComparison {
    constructor() {
        this.selectedType1 = null;
        this.selectedType2 = null;
        
        this.mbtiTypes = {
            "INTJ": { name: "건축가", description: "상상력이 풍부하고 전략적인 사고를 가진 완벽주의자", group: "NT" },
            "INTP": { name: "논리술사", description: "지식을 갈망하는 혁신적인 발명가", group: "NT" },
            "ENTJ": { name: "통솔자", description: "대담하고 상상력이 풍부한 강력한 지도자", group: "NT" },
            "ENTP": { name: "변론가", description: "영리하고 호기심이 많은 사색가", group: "NT" },
            "INFJ": { name: "옹호자", description: "선의의 옹호자이자 이상주의자", group: "NF" },
            "INFP": { name: "중재자", description: "항상 선을 행할 준비가 되어 있는 이타주義자", group: "NF" },
            "ENFJ": { name: "선도자", description: "카리스마 있고 영감을 주는 지도자", group: "NF" },
            "ENFP": { name: "활동가", description: "열정적이고 창의적인 자유로운 영혼", group: "NF" },
            "ISTJ": { name: "현실주의자", description: "실용적이고 현실적인 신뢰할 수 있는 사람", group: "SJ" },
            "ISFJ": { name: "수호자", description: "따뜻한 마음과 헌신적인 보호자", group: "SJ" },
            "ESTJ": { name: "경영자", description: "훌륭한 관리자이며 전통과 질서를 중시하는 사람", group: "SJ" },
            "ESFJ": { name: "집정관", description: "배려심이 많고 사교적인 인기인", group: "SJ" },
            "ISTP": { name: "장인", description: "대담하고 실용적인 실험정신이 풍부한 사람", group: "SP" },
            "ISFP": { name: "모험가", description: "유연하고 매력적인 예술가", group: "SP" },
            "ESTP": { name: "사업가", description: "영리하고 에너지 넘치는 인식이 뛰어난 사람", group: "SP" },
            "ESFP": { name: "연예인", description: "자발적이고 열정적인 사람들의 연예인", group: "SP" }
        };
        
        this.popularComparisons = [
            { types: ["INTJ", "ENFP"], title: "완벽한 보완 관계" },
            { types: ["INFJ", "ENTP"], title: "영감을 주는 만남" },
            { types: ["ISTJ", "ESFP"], title: "안정과 활력의 조화" },
            { types: ["ENFJ", "INFP"], title: "이상을 추구하는 파트너" },
            { types: ["ESTP", "ISFJ"], title: "실용성과 배려의 결합" },
            { types: ["ENTJ", "INFP"], title: "리더십과 창의성" }
        ];
        
        this.init();
    }
    
    init() {
        this.generateTypeGrids();
        this.generatePopularComparisons();
        this.bindEvents();
    }
    
    generateTypeGrids() {
        const typeGrid1 = document.getElementById('typeGrid1');
        const typeGrid2 = document.getElementById('typeGrid2');
        
        const typeButtons = Object.keys(this.mbtiTypes).map(type => {
            const info = this.mbtiTypes[type];
            return `
                <div class="type-button" data-type="${type}">
                    <div class="type-code">${type}</div>
                    <div class="type-name">${info.name}</div>
                </div>
            `;
        }).join('');
        
        typeGrid1.innerHTML = typeButtons;
        typeGrid2.innerHTML = typeButtons;
    }
    
    generatePopularComparisons() {
        const container = document.getElementById('popularComparisons');
        
        container.innerHTML = this.popularComparisons.map(comparison => `
            <div class="popular-item" data-type1="${comparison.types[0]}" data-type2="${comparison.types[1]}">
                <div class="popular-types">${comparison.types[0]} × ${comparison.types[1]}</div>
                <div class="popular-title">${comparison.title}</div>
            </div>
        `).join('');
    }
    
    bindEvents() {
        // Type selection events
        document.getElementById('typeGrid1').addEventListener('click', (e) => {
            if (e.target.closest('.type-button')) {
                this.selectType(1, e.target.closest('.type-button').dataset.type);
            }
        });
        
        document.getElementById('typeGrid2').addEventListener('click', (e) => {
            if (e.target.closest('.type-button')) {
                this.selectType(2, e.target.closest('.type-button').dataset.type);
            }
        });
        
        // Popular comparison events
        document.getElementById('popularComparisons').addEventListener('click', (e) => {
            if (e.target.closest('.popular-item')) {
                const item = e.target.closest('.popular-item');
                this.selectType(1, item.dataset.type1);
                this.selectType(2, item.dataset.type2);
            }
        });
        
        // Action button events
        const shareBtn = document.getElementById('shareComparison');
        const newBtn = document.getElementById('newComparison');
        
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareComparison());
        }
        
        if (newBtn) {
            newBtn.addEventListener('click', () => this.newComparison());
        }
    }
    
    selectType(gridNumber, type) {
        // Update selection
        if (gridNumber === 1) {
            this.selectedType1 = type;
            this.updateSelectedDisplay(1, type);
            this.updateTypeGrid(1, type);
        } else {
            this.selectedType2 = type;
            this.updateSelectedDisplay(2, type);
            this.updateTypeGrid(2, type);
        }
        
        // Show comparison if both types are selected
        if (this.selectedType1 && this.selectedType2) {
            this.showComparison();
        }
    }
    
    updateSelectedDisplay(gridNumber, type) {
        const info = this.mbtiTypes[type];
        const display = document.getElementById(`selectedType${gridNumber}`);
        
        display.innerHTML = `
            <div class="display-4 fw-bold text-primary">${type}</div>
            <small class="text-muted">${info.name}</small>
        `;
    }
    
    updateTypeGrid(gridNumber, selectedType) {
        const grid = document.getElementById(`typeGrid${gridNumber}`);
        const buttons = grid.querySelectorAll('.type-button');
        
        buttons.forEach(button => {
            button.classList.remove('selected');
            if (button.dataset.type === selectedType) {
                button.classList.add('selected');
            }
        });
    }
    
    showComparison() {
        const compatibility = this.calculateCompatibility(this.selectedType1, this.selectedType2);
        
        // Update compatibility score
        this.updateCompatibilityScore(compatibility);
        
        // Update dimension comparison
        this.updateDimensionComparison();
        
        // Update relationship analysis
        this.updateRelationshipAnalysis(compatibility);
        
        // Show results
        document.getElementById('comparisonResults').style.display = 'block';
        
        // Scroll to results
        document.getElementById('comparisonResults').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    calculateCompatibility(type1, type2) {
        // Simple compatibility algorithm based on cognitive functions
        const dimensions1 = this.getTypeDimensions(type1);
        const dimensions2 = this.getTypeDimensions(type2);
        
        let score = 50; // Base score
        
        // Same vs different preferences
        if (dimensions1.E === dimensions2.E) score += 10; else score += 15; // Opposite energy can be complementary
        if (dimensions1.S === dimensions2.S) score += 15; else score += 10; // Same perception is helpful
        if (dimensions1.T === dimensions2.T) score += 10; else score += 15; // Different judgment can balance
        if (dimensions1.J === dimensions2.J) score += 20; else score -= 5;  // Same lifestyle is important
        
        // Special combinations
        const specialPairs = [
            ['INTJ', 'ENFP'], ['ENFP', 'INTJ'],
            ['INFJ', 'ENTP'], ['ENTP', 'INFJ'],
            ['ISTJ', 'ESFP'], ['ESFP', 'ISTJ'],
            ['ISFJ', 'ESTP'], ['ESTP', 'ISFJ']
        ];
        
        if (specialPairs.some(pair => pair[0] === type1 && pair[1] === type2)) {
            score += 15;
        }
        
        return Math.min(100, Math.max(0, score));
    }
    
    getTypeDimensions(type) {
        return {
            E: type[0] === 'E',
            S: type[1] === 'S', 
            T: type[2] === 'T',
            J: type[3] === 'J'
        };
    }
    
    updateCompatibilityScore(score) {
        document.getElementById('compatibilityScore').textContent = score;
        
        let title, description, color;
        if (score >= 85) {
            title = '최고의 호환성';
            description = '두 유형은 서로를 완벽하게 이해하고 보완할 수 있는 이상적인 관계입니다.';
            color = '#28a745';
        } else if (score >= 70) {
            title = '높은 호환성';
            description = '두 유형은 서로를 잘 이해하고 보완할 수 있는 좋은 관계입니다.';
            color = '#20c997';
        } else if (score >= 50) {
            title = '보통 호환성';
            description = '두 유형은 노력과 이해를 통해 좋은 관계를 만들 수 있습니다.';
            color = '#ffc107';
        } else {
            title = '낮은 호환성';
            description = '두 유형은 많은 차이가 있지만, 서로 배울 점이 많은 관계입니다.';
            color = '#dc3545';
        }
        
        document.getElementById('compatibilityTitle').textContent = title;
        document.getElementById('compatibilityDescription').textContent = description;
        document.getElementById('compatibilityCircle').style.borderColor = color;
    }
    
    updateDimensionComparison() {
        const dims1 = this.getTypeDimensions(this.selectedType1);
        const dims2 = this.getTypeDimensions(this.selectedType2);
        
        const comparisons = [
            { 
                key: 'energy', 
                type1: dims1.E ? 'E' : 'I', 
                type2: dims2.E ? 'E' : 'I',
                labels: { E: '외향형', I: '내향형' }
            },
            { 
                key: 'perception', 
                type1: dims1.S ? 'S' : 'N', 
                type2: dims2.S ? 'S' : 'N',
                labels: { S: '감각형', N: '직관형' }
            },
            { 
                key: 'judgment', 
                type1: dims1.T ? 'T' : 'F', 
                type2: dims2.T ? 'T' : 'F',
                labels: { T: '사고형', F: '감정형' }
            },
            { 
                key: 'lifestyle', 
                type1: dims1.J ? 'J' : 'P', 
                type2: dims2.J ? 'J' : 'P',
                labels: { J: '판단형', P: '인식형' }
            }
        ];
        
        const container = document.getElementById('dimensionComparison');
        container.innerHTML = comparisons.map(comp => `
            <div class="dimension-comparison">
                <div class="dimension-item">
                    <div class="dimension-type ${comp.type1 === comp.type2 ? 'text-success' : 'text-primary'}">${comp.type1}</div>
                    <div class="dimension-name">${comp.labels[comp.type1]}</div>
                </div>
                <div class="dimension-separator">${comp.type1 === comp.type2 ? '=' : '≠'}</div>
                <div class="dimension-item">
                    <div class="dimension-type ${comp.type1 === comp.type2 ? 'text-success' : 'text-primary'}">${comp.type2}</div>
                    <div class="dimension-name">${comp.labels[comp.type2]}</div>
                </div>
            </div>
        `).join('');
    }
    
    updateRelationshipAnalysis(compatibilityScore) {
        const analysis = this.getRelationshipAnalysis(this.selectedType1, this.selectedType2, compatibilityScore);
        
        // Update strengths
        const strengthsContainer = document.getElementById('relationshipStrengths');
        strengthsContainer.innerHTML = analysis.strengths.map(strength => 
            `<div class="strength-item">${strength}</div>`
        ).join('');
        
        // Update challenges
        const challengesContainer = document.getElementById('relationshipChallenges');
        challengesContainer.innerHTML = analysis.challenges.map(challenge => 
            `<div class="challenge-item">${challenge}</div>`
        ).join('');
        
        // Update advice
        const adviceContainer = document.getElementById('relationshipAdvice');
        adviceContainer.innerHTML = analysis.advice.map(advice => 
            `<div class="advice-item">${advice}</div>`
        ).join('');
    }
    
    getRelationshipAnalysis(type1, type2, score) {
        const dims1 = this.getTypeDimensions(type1);
        const dims2 = this.getTypeDimensions(type2);
        const info1 = this.mbtiTypes[type1];
        const info2 = this.mbtiTypes[type2];
        
        let strengths = [];
        let challenges = [];
        let advice = [];
        
        // Energy direction analysis
        if (dims1.E === dims2.E) {
            if (dims1.E) {
                strengths.push('둘 다 외향적이어서 활발한 소통과 다양한 활동을 즐깁니다');
                challenges.push('때로는 혼자만의 시간이 필요할 수 있습니다');
            } else {
                strengths.push('둘 다 내향적이어서 깊이 있는 대화와 조용한 활동을 선호합니다');
                challenges.push('새로운 사람들과의 만남에서 소극적일 수 있습니다');
            }
        } else {
            strengths.push('외향형과 내향형이 만나 서로의 에너지를 보완할 수 있습니다');
            advice.push('서로의 에너지 충전 방식을 이해하고 존중해주세요');
        }
        
        // Perception analysis
        if (dims1.S === dims2.S) {
            if (dims1.S) {
                strengths.push('현실적이고 실용적인 접근 방식을 공유합니다');
            } else {
                strengths.push('창의적이고 미래지향적인 사고방식을 공유합니다');
            }
        } else {
            strengths.push('세부사항과 큰 그림을 모두 고려할 수 있는 균형잡힌 관점을 가집니다');
            challenges.push('정보 처리 방식의 차이로 인한 오해가 생길 수 있습니다');
        }
        
        // Decision making analysis  
        if (dims1.T === dims2.T) {
            if (dims1.T) {
                strengths.push('논리적이고 객관적인 의사결정을 함께 할 수 있습니다');
                challenges.push('감정적인 면을 간과할 수 있습니다');
            } else {
                strengths.push('감정과 가치를 중시하는 따뜻한 관계를 만들 수 있습니다');
                challenges.push('논리적 분석이 부족할 수 있습니다');
            }
        } else {
            strengths.push('논리와 감정의 균형을 맞춘 종합적인 판단이 가능합니다');
            advice.push('서로의 판단 기준을 이해하고 존중해주세요');
        }
        
        // Lifestyle analysis
        if (dims1.J === dims2.J) {
            if (dims1.J) {
                strengths.push('계획적이고 체계적인 생활 방식을 공유합니다');
            } else {
                strengths.push('유연하고 자유로운 생활 방식을 즐깁니다');
            }
        } else {
            challenges.push('계획성과 즉흥성의 차이로 갈등이 생길 수 있습니다');
            advice.push('서로의 생활 리듬을 이해하고 조율해나가세요');
        }
        
        // General advice
        advice.push('서로의 차이점을 약점이 아닌 보완점으로 여기세요');
        advice.push('열린 마음으로 소통하고 서로에게서 배우려고 노력하세요');
        advice.push('각자의 개성을 존중하면서도 공통점을 찾아가세요');
        
        return { strengths, challenges, advice };
    }
    
    shareComparison() {
        if (!this.selectedType1 || !this.selectedType2) {
            this.showToast('비교할 두 유형을 선택해주세요.', 'warning');
            return;
        }
        
        const type1Info = this.mbtiTypes[this.selectedType1];
        const type2Info = this.mbtiTypes[this.selectedType2];
        const compatibilityScore = document.getElementById('compatibilityScore').textContent;
        const url = window.location.href.split('?')[0];
        
        const shareText = `MBTI 유형 비교 결과\n\n${this.selectedType1} (${type1Info.name}) × ${this.selectedType2} (${type2Info.name})\n호환성: ${compatibilityScore}점\n\n비교 도구 사용하기: ${url}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'MBTI 유형 비교 결과',
                text: shareText,
                url: url
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showToast('결과가 클립보드에 복사되었습니다!', 'success');
            }).catch(() => {
                alert('다음 텍스트를 복사해서 공유하세요:\n\n' + shareText);
            });
        }
    }
    
    newComparison() {
        // Reset selections
        this.selectedType1 = null;
        this.selectedType2 = null;
        
        // Reset displays
        document.getElementById('selectedType1').innerHTML = `
            <div class="display-4 fw-bold text-muted">?</div>
            <small class="text-muted">유형을 선택해주세요</small>
        `;
        document.getElementById('selectedType2').innerHTML = `
            <div class="display-4 fw-bold text-muted">?</div>
            <small class="text-muted">유형을 선택해주세요</small>
        `;
        
        // Clear selections
        document.querySelectorAll('.type-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Hide results
        document.getElementById('comparisonResults').style.display = 'none';
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        this.showToast('새로운 비교를 시작합니다.', 'info');
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypeComparison();
});