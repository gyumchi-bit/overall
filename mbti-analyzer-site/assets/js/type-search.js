// MBTI 성격유형 검색기 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTypeSearch();
});

// MBTI 유형 데이터
const mbtiTypesData = {
    INTJ: {
        code: 'INTJ',
        name: '건축가',
        group: 'nt',
        description: '독립적이고 전략적인 사고를 가진 완벽주의자입니다. 복잡한 문제를 해결하고 장기적인 목표를 달성하는 데 뛰어납니다.',
        traits: ['독립적', '전략적', '완벽주의', '혁신적', '분석적'],
        careers: ['과학자', '엔지니어', '연구원', '컨설턴트', '작가'],
        famous: ['일론 머스크', '스티븐 호킹', '니콜라 테슬라'],
        percentage: 2,
        keywords: ['독립적', '전략적', '완벽주의자', '혁신적', '분석적', '내향적', '직관적', '논리적', '계획적']
    },
    INTP: {
        code: 'INTP',
        name: '논리술사',
        group: 'nt',
        description: '혁신적인 발명가로, 지식에 대한 갈증이 끝이 없습니다. 이론적 사고와 창의적 문제 해결에 뛰어납니다.',
        traits: ['논리적', '창의적', '독립적', '분석적', '유연한'],
        careers: ['연구원', '프로그래머', '철학자', '수학자', '발명가'],
        famous: ['알버트 아인슈타인', '빌 게이츠', '스티븐 호킹'],
        percentage: 3,
        keywords: ['논리적', '창의적', '독립적', '분석적', '유연한', '내향적', '직관적', '논리적', '즉흥적']
    },
    ENTJ: {
        code: 'ENTJ',
        name: '통솔자',
        group: 'nt',
        description: '대담하고 상상력이 풍부한 강력한 의지의 지도자입니다. 조직을 이끌고 목표를 달성하는 데 탁월합니다.',
        traits: ['리더십', '결단력', '효율성', '전략적', '자신감'],
        careers: ['CEO', '경영자', '정치인', '변호사', '컨설턴트'],
        famous: ['스티브 잡스', '마거릿 대처', '프랭클린 루즈벨트'],
        percentage: 2,
        keywords: ['리더십', '결단력', '효율성', '전략적', '자신감', '외향적', '직관적', '논리적', '계획적']
    },
    ENTP: {
        code: 'ENTP',
        name: '변론가',
        group: 'nt',
        description: '영리하고 호기심이 많은 사색가로, 지적 도전을 즐깁니다. 새로운 아이디어와 가능성을 탐구합니다.',
        traits: ['창의적', '논리적', '열정적', '유연한', '혁신적'],
        careers: ['기업가', '마케터', '발명가', '언론인', '변호사'],
        famous: ['마크 트웨인', '토마스 에디슨', '리처드 파인만'],
        percentage: 2,
        keywords: ['창의적', '논리적', '열정적', '유연한', '혁신적', '외향적', '직관적', '논리적', '즉흥적']
    },
    INFJ: {
        code: 'INFJ',
        name: '옹호자',
        group: 'nf',
        description: '선의의 옹호자로, 조용하지만 매우 영향력이 있습니다. 이상주의적이며 도덕적 가치를 중시합니다.',
        traits: ['이상주의적', '통찰력', '창의적', '헌신적', '독립적'],
        careers: ['상담사', '작가', '교사', '심리학자', '활동가'],
        famous: ['마틴 루터 킹', '간디', '플라톤'],
        percentage: 1,
        keywords: ['이상주의적', '통찰력', '창의적', '헌신적', '독립적', '내향적', '직관적', '감정적', '계획적']
    },
    INFP: {
        code: 'INFP',
        name: '중재자',
        group: 'nf',
        description: '항상 선을 행할 준비가 되어 있는 시적이고 친절한 이타주의자입니다. 개인의 가치와 신념을 중시합니다.',
        traits: ['이상주의적', '창의적', '공감적', '유연한', '열정적'],
        careers: ['작가', '예술가', '상담사', '심리학자', '사회복지사'],
        famous: ['윌리엄 셰익스피어', '조니 뎁', 'J.K. 롤링'],
        percentage: 13,
        keywords: ['이상주의적', '창의적', '공감적', '유연한', '열정적', '내향적', '직관적', '감정적', '즉흥적']
    },
    ENFJ: {
        code: 'ENFJ',
        name: '선도자',
        group: 'nf',
        description: '카리스마 있고 영감을 주는 지도자로, 청중을 사로잡습니다. 다른 사람들의 성장과 발전을 도웁니다.',
        traits: ['카리스마', '공감적', '영감적', '협력적', '열정적'],
        careers: ['교사', '상담사', '코치', '정치인', '종교인'],
        famous: ['오프라 윈프리', '넬슨 만델라', '버락 오바마'],
        percentage: 2,
        keywords: ['카리스마', '공감적', '영감적', '협력적', '열정적', '외향적', '직관적', '감정적', '계획적']
    },
    ENFP: {
        code: 'ENFP',
        name: '활동가',
        group: 'nf',
        description: '열정적이고 창의적인 사회자로, 항상 긍정적인 이유를 찾습니다. 새로운 가능성과 아이디어를 추구합니다.',
        traits: ['열정적', '창의적', '사교적', '낙관적', '유연한'],
        careers: ['마케터', '상담사', '언론인', '배우', '기업가'],
        famous: ['로빈 윌리엄스', '엘런 드제너러스', '윌 스미스'],
        percentage: 8,
        keywords: ['열정적', '창의적', '사교적', '낙관적', '유연한', '외향적', '직관적', '감정적', '즉흥적']
    },
    ISTJ: {
        code: 'ISTJ',
        name: '현실주의자',
        group: 'sj',
        description: '실용적이고 사실에 기반한 신뢰할 수 있는 사람입니다. 체계적이고 책임감이 강합니다.',
        traits: ['신뢰성', '체계적', '실용적', '책임감', '꼼꼼함'],
        careers: ['회계사', '변호사', '의사', '관리자', '공무원'],
        famous: ['조지 워싱턴', '워렌 버핏', '앙겔라 메르켈'],
        percentage: 11,
        keywords: ['신뢰성', '체계적', '실용적', '책임감', '꼼꼼함', '내향적', '현실적', '논리적', '계획적']
    },
    ISFJ: {
        code: 'ISFJ',
        name: '수호자',
        group: 'sj',
        description: '매우 헌신적이고 따뜻한 수호자로, 항상 사랑하는 사람들을 보호합니다. 배려심이 깊고 협력적입니다.',
        traits: ['헌신적', '배려심', '협력적', '신뢰성', '겸손함'],
        careers: ['간호사', '교사', '상담사', '사회복지사', '의료진'],
        famous: ['마더 테레사', '케이트 미들턴', '로사 파크스'],
        percentage: 14,
        keywords: ['헌신적', '배려심', '협력적', '신뢰성', '겸손함', '내향적', '현실적', '감정적', '계획적']
    },
    ESTJ: {
        code: 'ESTJ',
        name: '경영자',
        group: 'sj',
        description: '뛰어난 관리자로, 사물이나 사람을 관리하는 데 타의 추종을 불허합니다. 효율성과 성과를 중시합니다.',
        traits: ['리더십', '효율성', '책임감', '실용적', '결단력'],
        careers: ['경영자', '관리자', '판사', '군인', '정치인'],
        famous: ['힐러리 클린턴', '프랭크 시나트라', '존 록펠러'],
        percentage: 8,
        keywords: ['리더십', '효율성', '책임감', '실용적', '결단력', '외향적', '현실적', '논리적', '계획적']
    },
    ESFJ: {
        code: 'ESFJ',
        name: '집정관',
        group: 'sj',
        description: '매우 배려심 많고 사교적이며 인기가 많은 사람입니다. 조화와 협력을 중시하며 다른 사람들을 돕습니다.',
        traits: ['배려심', '사교적', '협력적', '조화로운', '책임감'],
        careers: ['교사', '간호사', '상담사', '인사담당자', '이벤트 기획자'],
        famous: ['테일러 스위프트', '휴 잭맨', '대니 글로버'],
        percentage: 12,
        keywords: ['배려심', '사교적', '협력적', '조화로운', '책임감', '외향적', '현실적', '감정적', '계획적']
    },
    ISTP: {
        code: 'ISTP',
        name: '장인',
        group: 'sp',
        description: '대담하고 실용적인 실험정신의 소유자로, 모든 종류의 도구를 다루는 데 능숙합니다. 문제 해결 능력이 뛰어납니다.',
        traits: ['실용적', '독립적', '유연한', '분석적', '모험적'],
        careers: ['엔지니어', '정비사', '파일럿', '외과의', '운동선수'],
        famous: ['클린트 이스트우드', '브루스 리', '마이클 조던'],
        percentage: 5,
        keywords: ['실용적', '독립적', '유연한', '분석적', '모험적', '내향적', '현실적', '논리적', '즉흥적']
    },
    ISFP: {
        code: 'ISFP',
        name: '모험가',
        group: 'sp',
        description: '유연하고 매력적인 예술가로, 항상 새로운 가능성을 탐험할 준비가 되어 있습니다. 개인적 가치를 중시합니다.',
        traits: ['예술적', '유연한', '친근한', '겸손한', '민감한'],
        careers: ['예술가', '음악가', '디자이너', '상담사', '수의사'],
        famous: ['마이클 잭슨', '프린스', '오드리 헵번'],
        percentage: 8,
        keywords: ['예술적', '유연한', '친근한', '겸손한', '민감한', '내향적', '현실적', '감정적', '즉흥적']
    },
    ESTP: {
        code: 'ESTP',
        name: '사업가',
        group: 'sp',
        description: '영리하고 에너지 넘치며 지각이 뛰어난 사람으로, 진정으로 삶을 즐깁니다. 즉흥적이고 적응력이 뛰어납니다.',
        traits: ['에너지 넘치는', '실용적', '사교적', '적응력', '현실적'],
        careers: ['영업', '기업가', '운동선수', '연예인', '응급의료진'],
        famous: ['도널드 트럼프', '마돈나', '어니스트 헤밍웨이'],
        percentage: 4,
        keywords: ['에너지 넘치는', '실용적', '사교적', '적응력', '현실적', '외향적', '현실적', '논리적', '즉흥적']
    },
    ESFP: {
        code: 'ESFP',
        name: '연예인',
        group: 'sp',
        description: '자발적이고 열정적이며 사교적인 연예인으로, 어디서나 삶이 지루할 틈이 없습니다. 사람들에게 즐거움을 선사합니다.',
        traits: ['열정적', '사교적', '자발적', '낙관적', '친근한'],
        careers: ['연예인', '교사', '상담사', '판매원', '이벤트 기획자'],
        famous: ['엘비스 프레슬리', '마릴린 먼로', '윌 스미스'],
        percentage: 8,
        keywords: ['열정적', '사교적', '자발적', '낙관적', '친근한', '외향적', '현실적', '감정적', '즉흥적']
    }
};

// 그룹별 정보
const groupInfo = {
    nt: { name: '분석가', color: 'primary', description: '이론적이고 추상적 사고를 선호하는 분석가들' },
    nf: { name: '외교관', color: 'success', description: '인간관계와 가치를 중시하는 외교관들' },
    sj: { name: '관리자', color: 'info', description: '체계적이고 안정적인 관리자들' },
    sp: { name: '탐험가', color: 'warning', description: '현실적이고 적응력이 뛰어난 탐험가들' }
};

let currentFilter = 'all';
let searchQuery = '';

function initializeTypeSearch() {
    setupEventListeners();
    displayAllTypes();
    setupPopularSearches();
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // 검색 이벤트
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    searchBtn.addEventListener('click', handleSearch);

    // 필터 이벤트
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            performSearch();
        });
    });

    // 인기 검색어 클릭 이벤트
    document.querySelectorAll('.badge').forEach(badge => {
        badge.addEventListener('click', function() {
            const query = this.textContent.trim();
            searchInput.value = query;
            handleSearch();
        });
    });
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    searchQuery = searchInput.value.trim().toLowerCase();
    performSearch();
}

function performSearch() {
    const results = [];
    
    Object.values(mbtiTypesData).forEach(type => {
        let matches = false;
        
        // 필터 체크
        if (currentFilter !== 'all' && type.group !== currentFilter) {
            return;
        }
        
        if (!searchQuery) {
            matches = true;
        } else {
            // 검색어 매칭
            const searchFields = [
                type.code.toLowerCase(),
                type.name.toLowerCase(),
                type.description.toLowerCase(),
                ...type.traits.map(t => t.toLowerCase()),
                ...type.careers.map(c => c.toLowerCase()),
                ...type.keywords.map(k => k.toLowerCase())
            ];
            
            matches = searchFields.some(field => field.includes(searchQuery));
        }
        
        if (matches) {
            results.push(type);
        }
    });
    
    displayResults(results);
}

function displayResults(results) {
    const searchResults = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    const recommendedTypes = document.getElementById('recommendedTypes');
    
    if (results.length === 0) {
        searchResults.innerHTML = '';
        noResults.classList.remove('d-none');
        recommendedTypes.classList.remove('d-none');
    } else {
        noResults.classList.add('d-none');
        recommendedTypes.classList.add('d-none');
        
        searchResults.innerHTML = results.map(type => createTypeCard(type)).join('');
        
        // 애니메이션 효과
        setTimeout(() => {
            document.querySelectorAll('.type-result-card').forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 10);
    }
}

function createTypeCard(type) {
    const groupColor = groupInfo[type.group].color;
    
    return `
        <div class="type-result-card ${type.group}" data-type="${type.code}">
            <div class="row">
                <div class="col-md-8">
                    <div class="type-code text-${groupColor}">${type.code}</div>
                    <div class="type-name">${type.name}</div>
                    <div class="type-description">${type.description}</div>
                    
                    <div class="type-tags">
                        ${type.traits.slice(0, 5).map(trait => 
                            `<span class="type-tag">${trait}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="mb-3">
                        <strong>적합한 직업:</strong>
                        <span class="text-muted">${type.careers.slice(0, 3).join(', ')}</span>
                    </div>
                    
                    <div class="d-flex gap-2">
                        <a href="types/${type.code.toLowerCase()}.html" class="btn btn-outline-${groupColor} btn-sm">
                            <i class="fas fa-info-circle me-1"></i>상세 정보
                        </a>
                        <button class="btn btn-outline-secondary btn-sm" onclick="shareType('${type.code}')">
                            <i class="fas fa-share me-1"></i>공유
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" onclick="compareType('${type.code}')">
                            <i class="fas fa-balance-scale me-1"></i>비교
                        </button>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="type-stats">
                        <div class="type-stat">
                            <div class="stat-value">${type.percentage}%</div>
                            <div class="stat-label">인구 비율</div>
                        </div>
                        <div class="type-stat">
                            <div class="stat-value">${groupInfo[type.group].name}</div>
                            <div class="stat-label">그룹</div>
                        </div>
                    </div>
                    
                    <div class="mt-3">
                        <small class="text-muted">
                            <strong>유명인:</strong><br>
                            ${type.famous.slice(0, 2).join(', ')}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayAllTypes() {
    const allTypes = Object.values(mbtiTypesData);
    displayResults(allTypes);
}

function setupPopularSearches() {
    const popularSearches = [
        'INFP 특징', 'INTJ 직업', 'ENFP 연애', 'ESTJ 궁합',
        '분석가 유형', '외교관 성격', '관리자 특성', '탐험가 직업'
    ];
    
    // 이미 HTML에 있는 인기 검색어에 클릭 이벤트 추가
    document.querySelectorAll('.badge').forEach((badge, index) => {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', function() {
            const searchInput = document.getElementById('searchInput');
            searchInput.value = this.textContent.trim();
            handleSearch();
            searchInput.focus();
        });
    });
}

// 유틸리티 함수들
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function shareType(typeCode) {
    const type = mbtiTypesData[typeCode];
    if (navigator.share) {
        navigator.share({
            title: `MBTI ${type.code} - ${type.name}`,
            text: type.description,
            url: window.location.origin + `/types/${typeCode.toLowerCase()}.html`
        });
    } else {
        // 클립보드에 복사
        const url = window.location.origin + `/types/${typeCode.toLowerCase()}.html`;
        navigator.clipboard.writeText(url).then(() => {
            showToast('링크가 클립보드에 복사되었습니다!');
        });
    }
}

function compareType(typeCode) {
    // 비교 페이지로 이동 (추후 구현)
    window.location.href = `type-comparison.html?type=${typeCode}`;
}

function showToast(message) {
    // 간단한 토스트 메시지 (Bootstrap Toast 사용 가능)
    const toast = document.createElement('div');
    toast.className = 'alert alert-success position-fixed top-0 end-0 m-3';
    toast.style.zIndex = '9999';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 페이지 로드시 URL 파라미터 체크
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const filterParam = urlParams.get('filter');
    
    if (searchParam) {
        document.getElementById('searchInput').value = searchParam;
        searchQuery = searchParam.toLowerCase();
    }
    
    if (filterParam && ['nt', 'nf', 'sj', 'sp'].includes(filterParam)) {
        currentFilter = filterParam;
        document.querySelector(`[data-filter="${filterParam}"]`).classList.add('active');
        document.querySelector('[data-filter="all"]').classList.remove('active');
    }
    
    if (searchParam || filterParam) {
        performSearch();
    }
});

// 전역 함수로 내보내기
window.MBTITypeSearch = {
    handleSearch,
    performSearch,
    shareType,
    compareType,
    mbtiTypesData
};