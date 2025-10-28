// MBTI 홈페이지 Bootstrap 통합 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeHomePage();
});

// MBTI 유형 데이터
const mbtiTypesData = [
    { code: 'INTJ', name: '건축가', group: 'nt', description: '독립적이고 전략적인 사고를 가진 완벽주의자' },
    { code: 'INTP', name: '논리술사', group: 'nt', description: '혁신적인 발명가로, 지식에 대한 갈증이 끝이 없음' },
    { code: 'ENTJ', name: '통솔자', group: 'nt', description: '대담하고 상상력이 풍부한 강력한 의지의 지도자' },
    { code: 'ENTP', name: '변론가', group: 'nt', description: '영리하고 호기심이 많은 사색가로, 지적 도전을 즐김' },
    
    { code: 'INFJ', name: '옹호자', group: 'nf', description: '선의의 옹호자로, 조용하지만 매우 영향력이 있음' },
    { code: 'INFP', name: '중재자', group: 'nf', description: '항상 선을 행할 준비가 되어 있는 시적이고 친절한 이타주의자' },
    { code: 'ENFJ', name: '선도자', group: 'nf', description: '카리스마 있고 영감을 주는 지도자로, 청중을 사로잡음' },
    { code: 'ENFP', name: '활동가', group: 'nf', description: '열정적이고 창의적인 사회자로, 항상 긍정적인 이유를 찾음' },
    
    { code: 'ISTJ', name: '현실주의자', group: 'sj', description: '실용적이고 사실에 기반한 신뢰할 수 있는 사람' },
    { code: 'ISFJ', name: '수호자', group: 'sj', description: '매우 헌신적이고 따뜻한 수호자로, 항상 사랑하는 사람들을 보호함' },
    { code: 'ESTJ', name: '경영자', group: 'sj', description: '뛰어난 관리자로, 사물이나 사람을 관리하는 데 타의 추종을 불허함' },
    { code: 'ESFJ', name: '집정관', group: 'sj', description: '매우 배려심 많고 사교적이며 인기가 많은 사람' },
    
    { code: 'ISTP', name: '장인', group: 'sp', description: '대담하고 실용적인 실험정신의 소유자로, 모든 종류의 도구를 다루는 데 능숙함' },
    { code: 'ISFP', name: '모험가', group: 'sp', description: '유연하고 매력적인 예술가로, 항상 새로운 가능성을 탐험할 준비가 됨' },
    { code: 'ESTP', name: '사업가', group: 'sp', description: '영리하고 에너지 넘치며 지각이 뛰어난 사람으로, 진정으로 삶을 즐김' },
    { code: 'ESFP', name: '연예인', group: 'sp', description: '자발적이고 열정적이며 사교적인 연예인으로, 어디서나 삶이 지루할 틈이 없음' }
];

function initializeHomePage() {
    createTypesGrid();
    setupTypeFiltering();
    setupScrollAnimations();
    setupNavigationEffects();
}

function createTypesGrid() {
    const typesContainer = document.getElementById('typesContainer');
    if (!typesContainer) return;
    
    mbtiTypesData.forEach(type => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-3 col-md-4 col-sm-6';
        colDiv.setAttribute('data-type-group', type.group);
        
        const cardElement = document.createElement('div');
        cardElement.className = `mbti-type-card ${type.group} animate-on-scroll`;
        cardElement.innerHTML = `
            <div class="mbti-type-code">${type.code}</div>
            <div class="mbti-type-name mb-2">${type.name}</div>
            <p class="card-text small text-muted">${type.description}</p>
            <a href="types/${type.code.toLowerCase()}.html" class="btn btn-sm btn-outline-primary">
                자세히 보기
            </a>
        `;
        
        // 호버 효과 추가
        cardElement.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        cardElement.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        colDiv.appendChild(cardElement);
        typesContainer.appendChild(colDiv);
    });
}

function setupTypeFiltering() {
    const filterButtons = document.querySelectorAll('input[name="typeFilter"]');
    
    filterButtons.forEach(button => {
        button.addEventListener('change', function() {
            const filterValue = this.id;
            filterTypes(filterValue);
        });
    });
}

function filterTypes(filter) {
    const typeCards = document.querySelectorAll('[data-type-group]');
    
    typeCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-type-group') === filter) {
            card.style.display = 'block';
            card.classList.add('animate-fadeInUp');
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-fadeInUp');
        }
    });
}

function setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // 카드들에 순차적 애니메이션 적용
                if (entry.target.classList.contains('mbti-type-card')) {
                    const delay = Array.from(entry.target.parentNode.parentNode.children)
                        .indexOf(entry.target.parentNode) * 100;
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);

    // 모든 애니메이션 요소 관찰
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function setupNavigationEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // 스크롤시 네비게이션 배경 효과
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // 스크롤 방향에 따른 네비게이션 숨김/표시
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 드롭다운 메뉴 호버 효과
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// 부드러운 스크롤 함수
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 모바일 메뉴 토글 (Bootstrap에서 자동 처리되지만 추가 효과를 위해)
function setupMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // 추가 모바일 메뉴 효과
            this.classList.toggle('active');
        });
    }
}

// 페이지 로드 완료 후 추가 초기화
window.addEventListener('load', function() {
    // 프리로더 제거 (있는 경우)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // 첫 화면 애니메이션
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-fadeInLeft');
    }
});

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

// 반응형 체크 함수
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// 테마 전환 함수 (다크모드 지원 시 사용)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 저장된 테마 로드
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// 초기화 함수 호출
document.addEventListener('DOMContentLoaded', function() {
    loadSavedTheme();
    setupMobileMenu();
});

// 전역 함수로 내보내기 (다른 스크립트에서 사용할 수 있도록)
window.MBTIHome = {
    smoothScrollTo,
    toggleTheme,
    isMobile,
    isTablet,
    isDesktop,
    mbtiTypesData
};