// Utility Functions

// Local Storage Management
class StorageManager {
    static setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return false;
        }
    }

    static getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Failed to get from localStorage:', error);
            return null;
        }
    }

    static removeItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
            return false;
        }
    }

    static clearAll() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
            return false;
        }
    }
}

// Animation Utilities
class AnimationUtils {
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    static fadeOut(element, duration = 300) {
        const start = performance.now();
        const initialOpacity = parseFloat(getComputedStyle(element).opacity);
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = initialOpacity * (1 - progress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    }

    static slideUp(element, duration = 300) {
        const start = performance.now();
        const initialHeight = element.offsetHeight;
        
        element.style.overflow = 'hidden';
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.height = `${initialHeight * (1 - progress)}px`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
                element.style.height = '';
                element.style.overflow = '';
            }
        }
        
        requestAnimationFrame(animate);
    }

    static slideDown(element, duration = 300) {
        element.style.display = 'block';
        const targetHeight = element.scrollHeight;
        element.style.height = '0px';
        element.style.overflow = 'hidden';
        
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.height = `${targetHeight * progress}px`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.height = '';
                element.style.overflow = '';
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// DOM Utilities
class DOMUtils {
    static createElement(tag, className = '', textContent = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    static addEventListeners(element, events) {
        Object.entries(events).forEach(([event, handler]) => {
            element.addEventListener(event, handler);
        });
    }

    static removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    static isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    static scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Form Validation
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validateRequired(value) {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    }

    static validateLength(value, min, max) {
        const length = value ? value.toString().length : 0;
        return length >= min && length <= max;
    }

    static validatePattern(value, pattern) {
        return pattern.test(value);
    }
}

// SNS Sharing Functions
class SNSShare {
    static shareToFacebook(url, text = '') {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        this.openShareWindow(shareUrl);
    }

    static shareToTwitter(url, text = '') {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        this.openShareWindow(shareUrl);
    }

    static shareToKakao(url, title, description, imageUrl = '') {
        if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
            Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: title,
                    description: description,
                    imageUrl: imageUrl,
                    link: {
                        mobileWebUrl: url,
                        webUrl: url,
                    },
                },
                buttons: [
                    {
                        title: '웹으로 보기',
                        link: {
                            mobileWebUrl: url,
                            webUrl: url,
                        },
                    },
                ],
            });
        } else {
            console.error('Kakao SDK not loaded');
        }
    }

    static shareToLine(url, text = '') {
        const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        this.openShareWindow(shareUrl);
    }

    static copyToClipboard(text) {
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
                try {
                    document.execCommand('copy');
                    textArea.remove();
                    resolve();
                } catch (error) {
                    textArea.remove();
                    reject(error);
                }
            });
        }
    }

    static openShareWindow(url, width = 600, height = 600) {
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        
        window.open(
            url,
            'share',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    }
}

// Progress Bar Utility
class ProgressBar {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            min: 0,
            max: 100,
            value: 0,
            showLabel: true,
            animated: true,
            ...options
        };
        
        this.create();
    }

    create() {
        this.progressBar = DOMUtils.createElement('div', 'progress-bar');
        this.progressFill = DOMUtils.createElement('div', 'progress-fill');
        this.progressLabel = DOMUtils.createElement('div', 'progress-label');

        this.progressBar.appendChild(this.progressFill);
        if (this.options.showLabel) {
            this.progressBar.appendChild(this.progressLabel);
        }
        
        this.container.appendChild(this.progressBar);
        this.update(this.options.value);
    }

    update(value) {
        this.options.value = Math.max(this.options.min, Math.min(this.options.max, value));
        const percentage = ((this.options.value - this.options.min) / (this.options.max - this.options.min)) * 100;
        
        if (this.options.animated) {
            this.progressFill.style.transition = 'width 0.3s ease';
        }
        
        this.progressFill.style.width = `${percentage}%`;
        
        if (this.options.showLabel) {
            this.progressLabel.textContent = `${Math.round(percentage)}%`;
        }
    }

    getValue() {
        return this.options.value;
    }

    destroy() {
        if (this.progressBar && this.progressBar.parentNode) {
            this.progressBar.parentNode.removeChild(this.progressBar);
        }
    }
}

// Loading Spinner Utility
class LoadingSpinner {
    static show(container, message = '로딩 중...') {
        const loader = DOMUtils.createElement('div', 'loading-spinner');
        const spinner = DOMUtils.createElement('div', 'spinner');
        const text = DOMUtils.createElement('div', 'loading-text', message);
        
        loader.appendChild(spinner);
        loader.appendChild(text);
        container.appendChild(loader);
        
        return loader;
    }

    static hide(loader) {
        if (loader && loader.parentNode) {
            AnimationUtils.fadeOut(loader, 200);
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 200);
        }
    }
}

// Toast Notification
class Toast {
    static show(message, type = 'info', duration = 3000) {
        const toast = DOMUtils.createElement('div', `toast toast-${type}`);
        const icon = DOMUtils.createElement('div', 'toast-icon');
        const text = DOMUtils.createElement('div', 'toast-text', message);
        
        toast.appendChild(icon);
        toast.appendChild(text);
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Hide toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    static success(message, duration) {
        this.show(message, 'success', duration);
    }

    static error(message, duration) {
        this.show(message, 'error', duration);
    }

    static warning(message, duration) {
        this.show(message, 'warning', duration);
    }

    static info(message, duration) {
        this.show(message, 'info', duration);
    }
}

// URL Utilities
class URLUtils {
    static getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }

    static setQueryParam(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    }

    static removeQueryParam(key) {
        const url = new URL(window.location);
        url.searchParams.delete(key);
        window.history.pushState({}, '', url);
    }

    static getCurrentURL() {
        return window.location.href;
    }

    static createShareableURL(result) {
        const baseUrl = window.location.origin + window.location.pathname;
        const params = new URLSearchParams();
        
        params.set('type', result.type);
        params.set('certainty', result.certainty);
        params.set('timestamp', result.timestamp);
        
        return `${baseUrl}?${params.toString()}`;
    }
}

// Date/Time Utilities
class DateUtils {
    static formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }

    static getRelativeTime(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}일 전`;
        if (hours > 0) return `${hours}시간 전`;
        if (minutes > 0) return `${minutes}분 전`;
        return '방금 전';
    }
}

// Device Detection
class DeviceUtils {
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static isTablet() {
        return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    }

    static isDesktop() {
        return !this.isMobile() && !this.isTablet();
    }

    static getViewportSize() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight
        };
    }
}

// Export utilities for global use
window.StorageManager = StorageManager;
window.AnimationUtils = AnimationUtils;
window.DOMUtils = DOMUtils;
window.FormValidator = FormValidator;
window.SNSShare = SNSShare;
window.ProgressBar = ProgressBar;
window.LoadingSpinner = LoadingSpinner;
window.Toast = Toast;
window.URLUtils = URLUtils;
window.DateUtils = DateUtils;
window.DeviceUtils = DeviceUtils;