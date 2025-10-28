// MBTI 분석 사이트 - 홈페이지 JavaScript

/* ==========================================================================
   홈페이지 초기화
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTypesPreview();
    initializeScrollEffects();
    initializeHeroAnimations();
    console.log('홈페이지 초기화 완료');
});

/* ==========================================================================
   반응형 네비게이션
   ========================================================================== */

function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // 모바일 메뉴 토글
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 바 애니메이션
            if (navToggle.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 메뉴 링크 클릭 시 메뉴 닫기 (모바일)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 991) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // 윈도우 리사이즈 시 메뉴 상태 리셋
        window.addEventListener('resize', function() {
            if (window.innerWidth > 991) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // 드롭다운 메뉴 (모바일에서 클릭으로 동작)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const dropdownMenu = this.parentElement.querySelector('.dropdown-menu');
                
                // 다른 드롭다운 모두 닫기
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                    }
                });
                
                // 현재 드롭다운 토글
                dropdownMenu.classList.toggle('show');
            }
        });
    });
    
    // 스크롤 시 네비게이션 스타일 변경
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

/* ==========================================================================
   MBTI 타입 미리보기
   ========================================================================== */

function initializeTypesPreview() {
    const typesGrid = document.getElementById('typesGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!typesGrid) return;
    
    // MBTI 타입 데이터
    const mbtiTypes = {
        // 분석가 (NT)
        'INTJ': { group: 'nt', name: '건축가', description: '상상력이 풍부하고 전략적인 사고를 하는 완벽주의자' },
        'INTP': { group: 'nt', name: '논리술사', description: '혁신적인 발명가로, 지식에 대한 갈증이 끝이 없음' },
        'ENTJ': { group: 'nt', name: '통솔자', description: '대담하고 상상력이 풍부한 강력한 의지의 지도자' },
        'ENTP': { group: 'nt', name: '변론가', description: '영리하고 호기심이 많은 사색가로, 도전을 거부할 수 없음' },
        
        // 외교관 (NF)
        'INFJ': { group: 'nf', name: '옹호자', description: '선의의 옹호자로, 조용하지만 매우 고무적인 성격' },
        'INFP': { group: 'nf', name: '중재자', description: '시적이고 친절하며 이타적인 사람' },
        'ENFJ': { group: 'nf', name: '선도자', description: '카리스마 있고 영감을 주는 지도자' },
        'ENFP': { group: 'nf', name: '활동가', description: '열정적이고 창의적인 사교적인 자유로운 영혼' },
        
        // 관리자 (SJ)
        'ISTJ': { group: 'sj', name: '현실주의자', description: '사실적이고 신뢰할 수 있는 실용주의자' },
        'ISFJ': { group: 'sj', name: '수호자', description: '따뜻한 마음과 헌신적인 성격을 지닌 수호자' },
        'ESTJ': { group: 'sj', name: '경영자', description: '뛰어난 관리자로, 사물이나 사람들을 관리하는 데 능숙' },
        'ESFJ': { group: 'sj', name: '집정관', description: '매우 사교적이고 인기가 많으며 항상 열성적' },
        
        // 탐험가 (SP)
        'ISTP': { group: 'sp', name: '장인', description: '대담하고 실용적인 실험정신이 풍부한 장인' },
        'ISFP': { group: 'sp', name: '모험가', description: '유연하고 매력적인 예술가' },
        'ESTP': { group: 'sp', name: '사업가', description: '영리하고 에너지 넘치며 지각이 뛰어난 사람' },
        'ESFP': { group: 'sp', name: '연예인', description: '자발적이고 열정적이며 사교적인 연예인' }
    };
    
    // 타입 카드 생성
    function renderTypeCards(filter = 'all') {
        let html = '';
        
        Object.keys(mbtiTypes).forEach(typeCode => {
            const type = mbtiTypes[typeCode];
            
            if (filter === 'all' || type.group === filter) {
                html += `
                    <a href="types/${typeCode.toLowerCase()}.html" class="type-card ${type.group}" data-group="${type.group}">
                        <div class="type-code">${typeCode}</div>
                        <div class="type-name">${type.name}</div>
                        <div class="type-description">${type.description}</div>
                    </a>
                `;
            }
        });
        
        typesGrid.innerHTML = html;
        
        // 카드 애니메이션
        const cards = typesGrid.querySelectorAll('.type-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
    
    // 초기 렌더링
    renderTypeCards();
    
    // 필터 버튼 이벤트
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 활성 버튼 변경
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 필터링
            const group = this.dataset.group;
            renderTypeCards(group);
        });
    });
}

/* ==========================================================================
   스크롤 효과
   ========================================================================== */

function initializeScrollEffects() {
    // Intersection Observer 설정
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // 애니메이션할 요소들 관찰
    const animateElements = document.querySelectorAll(
        '.feature-card, .section-header'
    );
    
    animateElements.forEach(el => observer.observe(el));
    
    // 통계 카운터 애니메이션
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => statsObserver.observe(stat));
    }
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/,/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

/* ==========================================================================
   히어로 섹션 애니메이션
   ========================================================================== */

function initializeHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // 페이지 로드 후 히어로 애니메이션
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // 부드러운 스크롤
    const scrollButtons = document.querySelectorAll('.scroll-to');
    scrollButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 맨 위로 스크롤 버튼
    createScrollToTopButton();
}

function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.setAttribute('aria-label', '맨 위로 스크롤');
    
    document.body.appendChild(scrollBtn);
    
    // 스크롤 위치에 따라 버튼 표시/숨김
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // 클릭 시 맨 위로 스크롤
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   유틸리티 함수들
   ========================================================================== */

// 알림 표시 함수
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconMap = {
        'success': 'check-circle',
        'warning': 'exclamation-triangle', 
        'error': 'exclamation-circle',
        'info': 'info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconMap[type] || iconMap.info}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 애니메이션으로 표시
    setTimeout(() => notification.classList.add('show'), 100);
    
    // 닫기 버튼 이벤트
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // 자동 숨김
    if (duration > 0) {
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

// 로컬 스토리지 헬퍼
const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage 사용 불가:', e);
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('LocalStorage 사용 불가:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage 사용 불가:', e);
        }
    }
};

// 전역 객체로 노출
window.MBTI = {
    showNotification,
    Storage
};