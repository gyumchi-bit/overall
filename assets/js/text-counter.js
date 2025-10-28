// 글자수 세기 JavaScript
class TextCounter {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.history = [];
        this.maxHistoryLength = 50;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateStats();
    }
    
    bindEvents() {
        // Text input events
        this.textInput.addEventListener('input', (e) => {
            this.saveToHistory();
            this.updateStats();
        });
        
        this.textInput.addEventListener('paste', (e) => {
            setTimeout(() => {
                this.saveToHistory();
                this.updateStats();
            }, 10);
        });
        
        // Control button events
        document.getElementById('clearBtn').addEventListener('click', () => this.clearText());
        document.getElementById('copyBtn').addEventListener('click', () => this.copyText());
        document.getElementById('pasteBtn').addEventListener('click', () => this.pasteText());
        document.getElementById('undoBtn').addEventListener('click', () => this.undoText());
        
        // Save initial state
        this.saveToHistory();
    }
    
    saveToHistory() {
        const currentText = this.textInput.value;
        
        // Don't save if it's the same as the last entry
        if (this.history.length > 0 && this.history[this.history.length - 1] === currentText) {
            return;
        }
        
        this.history.push(currentText);
        
        // Limit history size
        if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
        }
    }
    
    updateStats() {
        const text = this.textInput.value;
        
        // Basic counts
        const charCount = text.length;
        const charCountNoSpace = text.replace(/\s/g, '').length;
        const spaceCount = charCount - charCountNoSpace;
        
        // Word count (Korean and English words)
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = text.trim() === '' ? 0 : words.length;
        
        // Sentence count (periods, exclamation marks, question marks)
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        const sentenceCount = sentences.length;
        
        // Paragraph count (double line breaks)
        const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0);
        const paragraphCount = text.trim() === '' ? 0 : paragraphs.length;
        
        // Line count
        const lines = text.split(/\n/);
        const lineCount = text === '' ? 0 : lines.length;
        
        // Advanced statistics
        const digitCount = (text.match(/\d/g) || []).length;
        const punctuationCount = (text.match(/[.,;:!?'"()\\[\\]{}\\-]/g) || []).length;
        
        // Average calculations
        const avgWordsPerSentence = sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;
        const avgCharsPerWord = wordCount > 0 ? Math.round((charCountNoSpace / wordCount) * 10) / 10 : 0;
        
        // Reading time estimation (average 200 words per minute)
        const readingTimeMinutes = Math.ceil(wordCount / 200);
        const readingTime = readingTimeMinutes === 0 ? '0분' : `${readingTimeMinutes}분`;
        
        // Update display
        this.updateElement('charCount', this.formatNumber(charCount));
        this.updateElement('charCountNoSpace', this.formatNumber(charCountNoSpace));
        this.updateElement('wordCount', this.formatNumber(wordCount));
        this.updateElement('sentenceCount', this.formatNumber(sentenceCount));
        this.updateElement('paragraphCount', this.formatNumber(paragraphCount));
        this.updateElement('lineCount', this.formatNumber(lineCount));
        this.updateElement('spaceCount', this.formatNumber(spaceCount));
        this.updateElement('digitCount', this.formatNumber(digitCount));
        this.updateElement('punctuationCount', this.formatNumber(punctuationCount));
        this.updateElement('avgWordsPerSentence', avgWordsPerSentence);
        this.updateElement('avgCharsPerWord', avgCharsPerWord);
        this.updateElement('readingTime', readingTime);
        
        // Update live counter
        document.getElementById('liveCounter').textContent = `${this.formatNumber(charCount)}자`;
        
        // Animate number changes
        this.animateStatCards();
    }
    
    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            const oldValue = element.textContent;
            if (oldValue !== value.toString()) {
                element.textContent = value;
                element.style.transform = 'scale(1.1)';
                element.style.color = 'var(--bs-primary)';
                
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                    element.style.color = '';
                }, 200);
            }
        }
    }
    
    formatNumber(num) {
        return num.toLocaleString('ko-KR');
    }
    
    animateStatCards() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            stat.style.transition = 'all 0.3s ease';
        });
    }
    
    clearText() {
        if (this.textInput.value.trim() === '') {
            this.showToast('텍스트가 이미 비어있습니다.', 'info');
            return;
        }
        
        this.saveToHistory();
        this.textInput.value = '';
        this.updateStats();
        this.textInput.focus();
        this.showToast('텍스트가 지워졌습니다.', 'success');
    }
    
    async copyText() {
        const text = this.textInput.value;
        
        if (text.trim() === '') {
            this.showToast('복사할 텍스트가 없습니다.', 'warning');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('텍스트가 클립보드에 복사되었습니다.', 'success');
        } catch (err) {
            // Fallback for older browsers
            this.textInput.select();
            document.execCommand('copy');
            this.showToast('텍스트가 복사되었습니다.', 'success');
        }
    }
    
    async pasteText() {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                this.saveToHistory();
                this.textInput.value = text;
                this.updateStats();
                this.textInput.focus();
                this.showToast('텍스트가 붙여넣기되었습니다.', 'success');
            } else {
                this.showToast('클립보드가 비어있습니다.', 'warning');
            }
        } catch (err) {
            this.showToast('붙여넣기 권한이 필요합니다. Ctrl+V를 사용해주세요.', 'info');
        }
    }
    
    undoText() {
        if (this.history.length <= 1) {
            this.showToast('실행 취소할 내용이 없습니다.', 'warning');
            return;
        }
        
        // Remove current state and get previous state
        this.history.pop();
        const previousText = this.history[this.history.length - 1];
        
        this.textInput.value = previousText;
        this.updateStats();
        this.textInput.focus();
        this.showToast('실행 취소되었습니다.', 'success');
    }
    
    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toastId = 'toast-' + Date.now();
        
        const bgClass = type === 'success' ? 'bg-success' : 
                       type === 'warning' ? 'bg-warning' : 
                       type === 'error' ? 'bg-danger' : 'bg-info';
        
        const textClass = type === 'warning' ? 'text-dark' : 'text-white';
        
        const toastHTML = `
            <div class="toast ${bgClass} ${textClass}" id="${toastId}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ${bgClass} ${textClass} border-0">
                    <i class="fas fa-${this.getToastIcon(type)} me-2"></i>
                    <strong class="me-auto">알림</strong>
                    <button type="button" class="btn-close btn-close-${type === 'warning' ? 'dark' : 'white'}" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
        
        toast.show();
        
        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
    
    getToastIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'warning': return 'exclamation-triangle';
            case 'error': return 'times-circle';
            default: return 'info-circle';
        }
    }
    
    // Utility method to analyze text characteristics
    analyzeTextCharacteristics() {
        const text = this.textInput.value;
        
        if (text.trim() === '') return null;
        
        // Language detection (simple heuristic)
        const koreanChars = (text.match(/[가-힣]/g) || []).length;
        const englishChars = (text.match(/[a-zA-Z]/g) || []).length;
        const totalChars = koreanChars + englishChars;
        
        let primaryLanguage = 'mixed';
        if (totalChars > 0) {
            if (koreanChars / totalChars > 0.7) {
                primaryLanguage = 'korean';
            } else if (englishChars / totalChars > 0.7) {
                primaryLanguage = 'english';
            }
        }
        
        // Text complexity analysis
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const avgWordLength = words.length > 0 ? words.reduce((sum, word) => sum + word.length, 0) / words.length : 0;
        
        let complexity = 'simple';
        if (avgWordLength > 6) {
            complexity = 'complex';
        } else if (avgWordLength > 4) {
            complexity = 'medium';
        }
        
        return {
            primaryLanguage,
            complexity,
            avgWordLength: Math.round(avgWordLength * 10) / 10,
            koreanRatio: totalChars > 0 ? Math.round((koreanChars / totalChars) * 100) : 0,
            englishRatio: totalChars > 0 ? Math.round((englishChars / totalChars) * 100) : 0
        };
    }
    
    // Export stats as text
    exportStats() {
        const text = this.textInput.value;
        const stats = {
            글자수_공백포함: text.length,
            글자수_공백제외: text.replace(/\s/g, '').length,
            단어수: text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(word => word.length > 0).length,
            문장수: text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length,
            단락수: text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length,
            줄수: text === '' ? 0 : text.split(/\n/).length
        };
        
        let statsText = '=== 텍스트 분석 결과 ===\n\n';
        Object.entries(stats).forEach(([key, value]) => {
            statsText += `${key.replace(/_/g, ' ')}: ${value.toLocaleString('ko-KR')}\n`;
        });
        
        return statsText;
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+A: Select all text in textarea
    if (e.ctrlKey && e.key === 'a' && document.activeElement.id === 'textInput') {
        e.preventDefault();
        document.getElementById('textInput').select();
    }
    
    // Ctrl+Shift+C: Clear text
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        window.textCounter?.clearText();
    }
    
    // Ctrl+Shift+V: Paste text
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        window.textCounter?.pasteText();
    }
    
    // Ctrl+Z: Undo (when textarea is focused)
    if (e.ctrlKey && e.key === 'z' && document.activeElement.id === 'textInput') {
        e.preventDefault();
        window.textCounter?.undoText();
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.textCounter = new TextCounter();
});

// Auto-save functionality (optional)
let autoSaveTimer;
document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    
    // Load saved text from localStorage
    const savedText = localStorage.getItem('textCounter_savedText');
    if (savedText) {
        textInput.value = savedText;
        window.textCounter?.updateStats();
    }
    
    // Auto-save every 5 seconds
    textInput.addEventListener('input', () => {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            localStorage.setItem('textCounter_savedText', textInput.value);
        }, 5000);
    });
    
    // Save before page unload
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('textCounter_savedText', textInput.value);
    });
});