// Main JavaScript for Text Counter Site

// Global variables
let mobileMenuOpen = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Text Counter Site Loaded');
    initializeNavigation();
    initializeCounters();
});

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Dropdown functionality for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.navbar');
        if (!nav.contains(e.target) && mobileMenuOpen) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        mobileMenuOpen = !mobileMenuOpen;
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        mobileMenuOpen = false;
        document.body.style.overflow = '';
        
        // Close all dropdowns
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}

// Counter Functions
function initializeCounters() {
    const textInput = document.getElementById('textInput');
    if (textInput) {
        // Initial count
        updateCounters();
        
        // Auto-save functionality
        loadSavedText();
        textInput.addEventListener('input', function() {
            updateCounters();
            saveTextToStorage();
        });
    }
}

// Text manipulation functions
function clearText() {
    const textInput = document.getElementById('textInput');
    if (textInput) {
        textInput.value = '';
        updateCounters();
        clearSavedText();
        textInput.focus();
    }
}

function loadSample() {
    const sampleTexts = [
        "안녕하세요! 이것은 텍스트 카운터의 샘플 텍스트입니다. 이 도구를 사용하여 글자수, 단어수, 문장수, 문단수를 실시간으로 확인할 수 있습니다.\n\n한글과 영어를 모두 지원하며, SEO 글쓰기나 문서 작성 시 매우 유용합니다. 블로그 포스트나 논문 작성 시 적절한 길이를 확인하는데 도움이 됩니다.\n\n이 텍스트는 세 개의 문단으로 구성되어 있으며, 총 152개의 글자와 약 25개의 단어로 이루어져 있습니다.",
        
        "Hello! This is a sample text for the Text Counter tool. You can use this tool to count characters, words, sentences, and paragraphs in real-time.\n\nIt supports both Korean and English text, making it very useful for SEO writing and document creation. This tool helps you check the appropriate length when writing blog posts or academic papers.\n\nThis sample text consists of three paragraphs with approximately 280 characters and 50 words in English.",
        
        "텍스트 분석의 중요성\n\n효과적인 글쓰기를 위해서는 텍스트의 길이와 구조를 파악하는 것이 중요합니다. 적절한 문장 길이는 가독성을 높이고, 독자의 이해를 돕습니다.\n\nSEO 최적화를 위해서는 키워드 밀도와 텍스트 길이를 고려해야 합니다. 검색엔진은 적절한 길이의 콘텐츠를 선호하며, 사용자 경험을 중시합니다.\n\n이러한 이유로 텍스트 카운터는 블로거, 작가, 마케터들에게 필수적인 도구가 되었습니다."
    ];
    
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    const textInput = document.getElementById('textInput');
    
    if (textInput) {
        textInput.value = sampleTexts[randomIndex];
        updateCounters();
        textInput.focus();
    }
}

// Storage functions
function saveTextToStorage() {
    const textInput = document.getElementById('textInput');
    if (textInput && textInput.value.trim()) {
        localStorage.setItem('textCounterContent', textInput.value);
    }
}

function loadSavedText() {
    const saved = localStorage.getItem('textCounterContent');
    const textInput = document.getElementById('textInput');
    
    if (saved && textInput && !textInput.value) {
        textInput.value = saved;
        updateCounters();
    }
}

function clearSavedText() {
    localStorage.removeItem('textCounterContent');
}

// Utility functions
function formatNumber(num) {
    return num.toLocaleString('ko-KR');
}

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

// Smooth scrolling for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        return new Promise((resolve, reject) => {
            document.execCommand('copy') ? resolve() : reject();
            textArea.remove();
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Add CSS animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export text functionality
function exportText(format = 'txt') {
    const textInput = document.getElementById('textInput');
    if (!textInput || !textInput.value.trim()) {
        showNotification('내보낼 텍스트가 없습니다.', 'error');
        return;
    }
    
    const text = textInput.value;
    const stats = getTextStatistics(text);
    
    let content = '';
    let filename = '';
    let mimeType = '';
    
    switch (format) {
        case 'txt':
            content = text;
            filename = 'text-export.txt';
            mimeType = 'text/plain';
            break;
        case 'stats':
            content = `텍스트 분석 결과\n==================\n\n`;
            content += `전체 문자수: ${stats.characters}\n`;
            content += `공백 제외 문자수: ${stats.charactersNoSpace}\n`;
            content += `단어수: ${stats.words}\n`;
            content += `문장수: ${stats.sentences}\n`;
            content += `문단수: ${stats.paragraphs}\n`;
            content += `읽기 시간: ${stats.readingTime}\n\n`;
            content += `상세 분석\n----------\n`;
            content += `한글 문자: ${stats.korean}\n`;
            content += `영어 문자: ${stats.english}\n`;
            content += `숫자: ${stats.numbers}\n`;
            content += `특수문자: ${stats.special}\n`;
            content += `공백: ${stats.spaces}\n`;
            content += `줄바꿈: ${stats.lineBreaks}\n\n`;
            content += `원본 텍스트\n============\n\n${text}`;
            filename = 'text-analysis.txt';
            mimeType = 'text/plain';
            break;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`${filename} 파일이 다운로드되었습니다.`, 'success');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+A to select all text in textarea
    if (e.ctrlKey && e.key === 'a') {
        const textInput = document.getElementById('textInput');
        if (textInput && document.activeElement === textInput) {
            e.preventDefault();
            textInput.select();
        }
    }
    
    // Ctrl+L to clear text
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        clearText();
    }
    
    // Ctrl+S to save (download) text
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        exportText('txt');
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
    }
});

// Window load event
window.addEventListener('load', function() {
    // Fade in animation for content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Performance tracking
    console.log('Page loaded in', performance.now(), 'ms');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('일시적인 오류가 발생했습니다. 페이지를 새로고침해 주세요.', 'error');
});

// Console welcome message
console.log('%c텍스트 카운터에 오신 것을 환영합니다!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('이 도구는 텍스트 분석을 위한 무료 서비스입니다.');
console.log('키보드 단축키: Ctrl+L (텍스트 지우기), Ctrl+S (텍스트 저장)');

// Export functions for use in other files
window.TextCounterApp = {
    clearText,
    loadSample,
    exportText,
    showNotification,
    copyToClipboard,
    toggleMobileMenu
};