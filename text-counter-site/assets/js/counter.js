// Text Counter Functions

// Main update function
function updateCounters() {
    const textInput = document.getElementById('textInput');
    if (!textInput) return;
    
    const text = textInput.value;
    const stats = getTextStatistics(text);
    
    // Update basic stats
    updateElement('characterCount', formatNumber(stats.characters));
    updateElement('characterNoSpaceCount', formatNumber(stats.charactersNoSpace));
    updateElement('wordCount', formatNumber(stats.words));
    updateElement('sentenceCount', formatNumber(stats.sentences));
    updateElement('paragraphCount', formatNumber(stats.paragraphs));
    updateElement('readingTime', stats.readingTime);
    
    // Update detailed stats
    updateElement('koreanCount', formatNumber(stats.korean));
    updateElement('englishCount', formatNumber(stats.english));
    updateElement('numberCount', formatNumber(stats.numbers));
    updateElement('specialCount', formatNumber(stats.special));
    updateElement('spaceCount', formatNumber(stats.spaces));
    updateElement('lineBreakCount', formatNumber(stats.lineBreaks));
}

// Get comprehensive text statistics
function getTextStatistics(text) {
    if (!text) {
        return {
            characters: 0,
            charactersNoSpace: 0,
            words: 0,
            sentences: 0,
            paragraphs: 0,
            korean: 0,
            english: 0,
            numbers: 0,
            special: 0,
            spaces: 0,
            lineBreaks: 0,
            readingTime: '0분'
        };
    }
    
    // Basic counts
    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, '').length;
    
    // Word count (improved for Korean and English)
    const words = countWords(text);
    
    // Sentence count
    const sentences = countSentences(text);
    
    // Paragraph count
    const paragraphs = countParagraphs(text);
    
    // Character type analysis
    const korean = countKoreanChars(text);
    const english = countEnglishChars(text);
    const numbers = countNumbers(text);
    const special = countSpecialChars(text);
    const spaces = countSpaces(text);
    const lineBreaks = countLineBreaks(text);
    
    // Reading time calculation
    const readingTime = calculateReadingTime(text, words);
    
    return {
        characters,
        charactersNoSpace,
        words,
        sentences,
        paragraphs,
        korean,
        english,
        numbers,
        special,
        spaces,
        lineBreaks,
        readingTime
    };
}

// Word counting function (supports Korean and English)
function countWords(text) {
    if (!text.trim()) return 0;
    
    // Remove extra whitespace
    const cleanText = text.trim().replace(/\s+/g, ' ');
    
    // Count Korean words (separated by spaces or punctuation)
    const koreanWords = (cleanText.match(/[가-힣]+/g) || []).length;
    
    // Count English words (separated by spaces)
    const englishWords = (cleanText.match(/\b[a-zA-Z]+\b/g) || []).length;
    
    // Count number sequences as words
    const numberWords = (cleanText.match(/\b\d+\b/g) || []).length;
    
    // If no Korean words, use simple space-based counting for mixed content
    if (koreanWords === 0) {
        return cleanText.split(/\s+/).filter(word => word.length > 0).length;
    }
    
    return koreanWords + englishWords + numberWords;
}

// Sentence counting function
function countSentences(text) {
    if (!text.trim()) return 0;
    
    // Korean and English sentence endings
    const sentences = text.match(/[.!?。！？]+/g);
    return sentences ? sentences.length : 0;
}

// Paragraph counting function
function countParagraphs(text) {
    if (!text.trim()) return 0;
    
    // Split by double line breaks or more
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    return paragraphs.length;
}

// Korean character count
function countKoreanChars(text) {
    const matches = text.match(/[가-힣]/g);
    return matches ? matches.length : 0;
}

// English character count (letters only)
function countEnglishChars(text) {
    const matches = text.match(/[a-zA-Z]/g);
    return matches ? matches.length : 0;
}

// Number count
function countNumbers(text) {
    const matches = text.match(/\d/g);
    return matches ? matches.length : 0;
}

// Special character count
function countSpecialChars(text) {
    const matches = text.match(/[^가-힣a-zA-Z0-9\s]/g);
    return matches ? matches.length : 0;
}

// Space count
function countSpaces(text) {
    const matches = text.match(/ /g);
    return matches ? matches.length : 0;
}

// Line break count
function countLineBreaks(text) {
    const matches = text.match(/\n/g);
    return matches ? matches.length : 0;
}

// Calculate reading time
function calculateReadingTime(text, wordCount) {
    if (!text.trim() || wordCount === 0) return '0분';
    
    // Average reading speeds (words per minute)
    const koreanWPM = 200; // Korean words per minute
    const englishWPM = 250; // English words per minute
    
    // Check if text is primarily Korean
    const koreanChars = countKoreanChars(text);
    const englishChars = countEnglishChars(text);
    
    let wpm;
    if (koreanChars > englishChars) {
        wpm = koreanWPM;
    } else {
        wpm = englishWPM;
    }
    
    const minutes = Math.ceil(wordCount / wpm);
    
    if (minutes < 1) return '1분 미만';
    if (minutes === 1) return '1분';
    if (minutes < 60) return `${minutes}분`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) return `${hours}시간`;
    return `${hours}시간 ${remainingMinutes}분`;
}

// Utility function to update DOM elements
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        // Add animation class
        element.classList.add('updating');
        element.textContent = value;
        
        // Remove animation class after animation
        setTimeout(() => {
            element.classList.remove('updating');
        }, 300);
    }
}

// Format number with Korean locale
function formatNumber(num) {
    return num.toLocaleString('ko-KR');
}

// Text analysis for specific purposes
function analyzeForSEO(text) {
    const stats = getTextStatistics(text);
    const analysis = {
        length: stats.characters,
        wordDensity: {},
        readability: 'good', // simplified
        suggestions: []
    };
    
    // Word density analysis
    if (stats.words > 0) {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const wordCount = {};
        
        words.forEach(word => {
            if (word.length > 2) { // Only count words longer than 2 characters
                wordCount[word] = (wordCount[word] || 0) + 1;
            }
        });
        
        // Calculate density percentages
        Object.keys(wordCount).forEach(word => {
            const density = (wordCount[word] / stats.words) * 100;
            if (density >= 1) { // Only show words with 1% or higher density
                analysis.wordDensity[word] = density.toFixed(1);
            }
        });
    }
    
    // SEO suggestions
    if (stats.characters < 300) {
        analysis.suggestions.push('콘텐츠가 너무 짧습니다. SEO를 위해 300자 이상을 권장합니다.');
    }
    
    if (stats.words < 50) {
        analysis.suggestions.push('단어수가 부족합니다. 50단어 이상을 권장합니다.');
    }
    
    if (stats.sentences === 0) {
        analysis.suggestions.push('문장 구조를 명확히 하기 위해 마침표를 사용하세요.');
    }
    
    if (stats.paragraphs === 1 && stats.characters > 500) {
        analysis.suggestions.push('가독성을 위해 문단을 나누는 것을 권장합니다.');
    }
    
    return analysis;
}

// Text comparison function
function compareTexts(text1, text2) {
    const stats1 = getTextStatistics(text1);
    const stats2 = getTextStatistics(text2);
    
    const comparison = {
        characterDiff: stats2.characters - stats1.characters,
        wordDiff: stats2.words - stats1.words,
        sentenceDiff: stats2.sentences - stats1.sentences,
        paragraphDiff: stats2.paragraphs - stats1.paragraphs
    };
    
    return comparison;
}

// Export text statistics to different formats
function exportStatistics(format = 'json') {
    const textInput = document.getElementById('textInput');
    if (!textInput || !textInput.value.trim()) {
        showNotification('분석할 텍스트가 없습니다.', 'error');
        return;
    }
    
    const stats = getTextStatistics(textInput.value);
    const timestamp = new Date().toISOString();
    
    let content = '';
    let filename = '';
    let mimeType = '';
    
    switch (format) {
        case 'json':
            const data = {
                timestamp,
                statistics: stats,
                originalText: textInput.value
            };
            content = JSON.stringify(data, null, 2);
            filename = 'text-statistics.json';
            mimeType = 'application/json';
            break;
            
        case 'csv':
            content = 'Metric,Value\n';
            content += `Characters,${stats.characters}\n`;
            content += `Characters (no space),${stats.charactersNoSpace}\n`;
            content += `Words,${stats.words}\n`;
            content += `Sentences,${stats.sentences}\n`;
            content += `Paragraphs,${stats.paragraphs}\n`;
            content += `Korean Characters,${stats.korean}\n`;
            content += `English Characters,${stats.english}\n`;
            content += `Numbers,${stats.numbers}\n`;
            content += `Special Characters,${stats.special}\n`;
            content += `Spaces,${stats.spaces}\n`;
            content += `Line Breaks,${stats.lineBreaks}\n`;
            content += `Reading Time,${stats.readingTime}\n`;
            filename = 'text-statistics.csv';
            mimeType = 'text/csv';
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

// Real-time text analysis with debouncing
const debouncedUpdate = debounce(updateCounters, 100);

// Initialize counters when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for updating animation
    const style = document.createElement('style');
    style.textContent = `
        .updating {
            animation: pulse 0.3s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); color: var(--primary-color); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize counters
    updateCounters();
});

// Export functions for global access
window.TextCounterStats = {
    updateCounters,
    getTextStatistics,
    analyzeForSEO,
    compareTexts,
    exportStatistics
};