// Word Counter Specific Functions

// Word counter update function
function updateWordCounters() {
    const textInput = document.getElementById('textInput');
    if (!textInput) return;
    
    const text = textInput.value;
    const countNumbers = document.getElementById('countNumbers')?.checked ?? true;
    const countHyphenated = document.getElementById('countHyphenated')?.checked ?? true;
    const caseSensitive = document.getElementById('caseSensitive')?.checked ?? false;
    
    const stats = getWordStatistics(text, {
        countNumbers,
        countHyphenated,
        caseSensitive
    });
    
    // Update main counter
    updateElement('totalWords', formatNumber(stats.total));
    
    // Update word type stats
    updateElement('koreanWords', formatNumber(stats.korean));
    updateElement('englishWords', formatNumber(stats.english));
    updateElement('numberWords', formatNumber(stats.numbers));
    updateElement('uniqueWords', formatNumber(stats.unique));
    
    // Update word length analysis
    updateElement('avgWordLength', stats.averageLength.toFixed(1));
    updateElement('shortestWord', stats.shortestWord || '-');
    updateElement('longestWord', stats.longestWord || '-');
    
    // Update reading time
    updateElement('readingTime', stats.readingTime);
    updateElement('speakingTime', stats.speakingTime);
    
    // Update frequent words
    updateFrequentWords(stats.frequentWords);
}

// Get word statistics with options
function getWordStatistics(text, options = {}) {
    const {
        countNumbers = true,
        countHyphenated = true,
        caseSensitive = false
    } = options;
    
    if (!text.trim()) {
        return {
            total: 0,
            korean: 0,
            english: 0,
            numbers: 0,
            unique: 0,
            averageLength: 0,
            shortestWord: '',
            longestWord: '',
            readingTime: '0분',
            speakingTime: '0분',
            frequentWords: []
        };
    }
    
    // Clean text and split into words
    const cleanText = text.trim().replace(/\s+/g, ' ');
    
    // Korean words (separated by spaces or punctuation)
    const koreanWords = extractKoreanWords(cleanText, countHyphenated);
    
    // English words
    const englishWords = extractEnglishWords(cleanText, countHyphenated, caseSensitive);
    
    // Number words
    const numberWords = countNumbers ? extractNumberWords(cleanText) : [];
    
    // Calculate totals
    const total = koreanWords.length + englishWords.length + numberWords.length;
    
    // Get unique words
    const allWords = [...koreanWords, ...englishWords, ...numberWords];
    const uniqueWords = caseSensitive 
        ? [...new Set(allWords)]
        : [...new Set(allWords.map(w => w.toLowerCase()))];
    
    // Calculate word lengths
    const wordLengths = allWords.map(word => word.length).filter(len => len > 0);
    const averageLength = wordLengths.length > 0 
        ? wordLengths.reduce((sum, len) => sum + len, 0) / wordLengths.length 
        : 0;
    
    // Find shortest and longest words
    const sortedByLength = allWords
        .filter(word => word.length > 0)
        .sort((a, b) => a.length - b.length);
    
    const shortestWord = sortedByLength[0] || '';
    const longestWord = sortedByLength[sortedByLength.length - 1] || '';
    
    // Calculate reading times
    const readingTime = calculateReadingTime(total, 'reading');
    const speakingTime = calculateReadingTime(total, 'speaking');
    
    // Get frequent words
    const frequentWords = getFrequentWords(allWords, caseSensitive);
    
    return {
        total,
        korean: koreanWords.length,
        english: englishWords.length,
        numbers: numberWords.length,
        unique: uniqueWords.length,
        averageLength,
        shortestWord,
        longestWord,
        readingTime,
        speakingTime,
        frequentWords
    };
}

// Extract Korean words
function extractKoreanWords(text, countHyphenated = true) {
    if (countHyphenated) {
        // Include hyphenated Korean words
        const matches = text.match(/[가-힣]+(?:-[가-힣]+)*/g);
        return matches || [];
    } else {
        const matches = text.match(/[가-힣]+/g);
        return matches || [];
    }
}

// Extract English words
function extractEnglishWords(text, countHyphenated = true, caseSensitive = false) {
    let pattern;
    
    if (countHyphenated) {
        // Include hyphenated English words and contractions
        pattern = /\b[a-zA-Z]+(?:[-'][a-zA-Z]+)*\b/g;
    } else {
        pattern = /\b[a-zA-Z]+\b/g;
    }
    
    const matches = text.match(pattern) || [];
    
    return caseSensitive ? matches : matches;
}

// Extract number words
function extractNumberWords(text) {
    // Match standalone numbers, decimals, and numbers with units
    const matches = text.match(/\b\d+(?:\.\d+)?(?:[%°C°F]|\w*)\b/g);
    return matches || [];
}

// Calculate reading/speaking time
function calculateReadingTime(wordCount, type = 'reading') {
    if (wordCount === 0) return '0분';
    
    // Words per minute rates
    const rates = {
        reading: 200,   // Average reading speed
        speaking: 150   // Average speaking speed
    };
    
    const wpm = rates[type] || rates.reading;
    const minutes = Math.ceil(wordCount / wpm);
    
    if (minutes < 1) return '1분 미만';
    if (minutes === 1) return '1분';
    if (minutes < 60) return `${minutes}분`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) return `${hours}시간`;
    return `${hours}시간 ${remainingMinutes}분`;
}

// Get frequent words
function getFrequentWords(words, caseSensitive = false) {
    if (words.length === 0) return [];
    
    // Filter out very short words and common stop words
    const stopWords = new Set([
        '그', '이', '저', '것', '수', '등', '및', '또', '더', '가', '나', '다', '을', '를', '은', '는', '이', '가',
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were'
    ]);
    
    const frequency = {};
    
    words.forEach(word => {
        if (word.length < 2) return; // Skip very short words
        
        const key = caseSensitive ? word : word.toLowerCase();
        
        if (stopWords.has(key)) return; // Skip stop words
        
        frequency[key] = (frequency[key] || 0) + 1;
    });
    
    // Sort by frequency and return top 10
    return Object.entries(frequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([word, count]) => ({ word, count }));
}

// Update frequent words display
function updateFrequentWords(frequentWords) {
    const container = document.getElementById('frequentWordsList');
    if (!container) return;
    
    if (frequentWords.length === 0) {
        container.innerHTML = '<div class="no-words">단어를 입력하면 빈도 분석이 표시됩니다.</div>';
        return;
    }
    
    const html = frequentWords.map(item => `
        <div class="frequent-word-item">
            <span class="word-text">${item.word}</span>
            <span class="word-count">${item.count}회</span>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Load word-specific sample text
function loadWordSample() {
    const samples = [
        "단어수 세기 도구의 정확성을 테스트해보세요. 이 샘플 텍스트는 다양한 종류의 단어들을 포함하고 있습니다.\n\n한글 단어: 안녕하세요, 반갑습니다, 텍스트, 분석, 도구\nEnglish words: hello, analysis, tool, technology, digital\n숫자와 단위: 100개, 50%, 3.14, 2024년\n하이픈 단어: 온라인-마케팅, real-time, co-worker\n\n이 텍스트를 통해 한글과 영어 단어가 정확하게 구분되어 계산되는지 확인할 수 있습니다. SEO 글쓰기나 콘텐츠 마케팅에서 단어수는 매우 중요한 지표입니다.",
        
        "SEO 최적화를 위한 콘텐츠 작성 가이드라인입니다. 검색엔진 최적화(Search Engine Optimization)에서 적절한 단어수는 필수 요소입니다.\n\n블로그 포스트의 경우 300-600단어가 적절하며, 상품 설명은 50-150단어 정도가 좋습니다. 메타 디스크립션은 20-25단어로 제한하는 것이 효과적입니다.\n\n키워드 밀도는 1-3% 사이를 유지하고, 자연스러운 문장 구조를 만들어야 합니다. 사용자 경험(UX)과 검색엔진 모두를 고려한 콘텐츠가 성공적인 결과를 가져다 줍니다.",
        
        "텍스트 분석과 데이터 마이닝의 중요성\n\n현대 디지털 시대에서 텍스트 데이터 분석은 비즈니스 인텔리전스의 핵심 요소가 되었습니다. 소셜미디어, 고객 리뷰, 뉴스 기사 등 다양한 텍스트 소스에서 유의미한 인사이트를 추출하는 것이 경쟁 우위를 결정합니다.\n\n자연어 처리(NLP) 기술과 머신러닝 알고리즘을 활용하여 감성 분석, 토픽 모델링, 개체명 인식 등을 수행할 수 있습니다. 이러한 기술들은 마케팅 전략 수립, 고객 서비스 개선, 리스크 관리 등 다양한 영역에서 활용되고 있습니다."
    ];
    
    const randomIndex = Math.floor(Math.random() * samples.length);
    const textInput = document.getElementById('textInput');
    
    if (textInput) {
        textInput.value = samples[randomIndex];
        updateWordCounters();
        textInput.focus();
    }
}

// Copy word count results
function copyWordCount() {
    const textInput = document.getElementById('textInput');
    if (!textInput || !textInput.value.trim()) {
        showNotification('복사할 텍스트가 없습니다.', 'error');
        return;
    }
    
    const text = textInput.value;
    const stats = getWordStatistics(text);
    
    const result = `단어수 분석 결과
==================

총 단어수: ${formatNumber(stats.total)}
- 한글 단어: ${formatNumber(stats.korean)}
- 영어 단어: ${formatNumber(stats.english)}
- 숫자: ${formatNumber(stats.numbers)}
- 고유 단어: ${formatNumber(stats.unique)}

단어 길이 분석:
- 평균 길이: ${stats.averageLength.toFixed(1)}글자
- 최단 단어: ${stats.shortestWord}
- 최장 단어: ${stats.longestWord}

예상 시간:
- 읽기 시간: ${stats.readingTime}
- 발표 시간: ${stats.speakingTime}`;

    copyToClipboard(result)
        .then(() => {
            showNotification('단어수 분석 결과가 클립보드에 복사되었습니다.', 'success');
        })
        .catch(() => {
            showNotification('복사에 실패했습니다.', 'error');
        });
}

// Export word statistics
function exportWordStats(format) {
    const textInput = document.getElementById('textInput');
    if (!textInput || !textInput.value.trim()) {
        showNotification('내보낼 텍스트가 없습니다.', 'error');
        return;
    }
    
    const text = textInput.value;
    const stats = getWordStatistics(text);
    const timestamp = new Date().toLocaleString('ko-KR');
    
    let content = '';
    let filename = '';
    let mimeType = '';
    
    switch (format) {
        case 'txt':
            content = `단어수 분석 결과
===================
분석 시간: ${timestamp}

기본 통계:
- 총 단어수: ${formatNumber(stats.total)}
- 한글 단어: ${formatNumber(stats.korean)}
- 영어 단어: ${formatNumber(stats.english)}
- 숫자: ${formatNumber(stats.numbers)}
- 고유 단어: ${formatNumber(stats.unique)}

단어 길이 분석:
- 평균 길이: ${stats.averageLength.toFixed(1)}글자
- 최단 단어: ${stats.shortestWord}
- 최장 단어: ${stats.longestWord}

예상 시간:
- 읽기 시간: ${stats.readingTime}
- 발표 시간: ${stats.speakingTime}

빈도 높은 단어:
${stats.frequentWords.map(item => `- ${item.word}: ${item.count}회`).join('\n')}

분석 대상 텍스트:
==================
${text}`;
            filename = `word-analysis-${new Date().toISOString().slice(0, 10)}.txt`;
            mimeType = 'text/plain';
            break;
            
        case 'csv':
            content = `항목,값
분석시간,"${timestamp}"
총단어수,${stats.total}
한글단어,${stats.korean}
영어단어,${stats.english}
숫자,${stats.numbers}
고유단어,${stats.unique}
평균길이,${stats.averageLength.toFixed(1)}
최단단어,"${stats.shortestWord}"
최장단어,"${stats.longestWord}"
읽기시간,"${stats.readingTime}"
발표시간,"${stats.speakingTime}"

빈도높은단어
단어,횟수
${stats.frequentWords.map(item => `"${item.word}",${item.count}`).join('\n')}`;
            filename = `word-analysis-${new Date().toISOString().slice(0, 10)}.csv`;
            mimeType = 'text/csv';
            break;
            
        case 'json':
            const data = {
                timestamp,
                analysis: 'word_count',
                statistics: stats,
                originalText: text
            };
            content = JSON.stringify(data, null, 2);
            filename = `word-analysis-${new Date().toISOString().slice(0, 10)}.json`;
            mimeType = 'application/json';
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

// Word density analysis
function analyzeWordDensity(text, targetWord, caseSensitive = false) {
    if (!text.trim() || !targetWord.trim()) return 0;
    
    const stats = getWordStatistics(text, { caseSensitive });
    if (stats.total === 0) return 0;
    
    const searchWord = caseSensitive ? targetWord : targetWord.toLowerCase();
    const textToSearch = caseSensitive ? text : text.toLowerCase();
    
    // Count occurrences of target word
    const regex = new RegExp(`\\b${searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    const matches = textToSearch.match(regex);
    const count = matches ? matches.length : 0;
    
    return (count / stats.total) * 100;
}

// Real-time word analysis with debouncing
const debouncedWordUpdate = debounce(updateWordCounters, 100);

// Initialize word counter page
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    if (textInput) {
        textInput.addEventListener('input', debouncedWordUpdate);
        
        // Load saved text
        loadSavedText();
        updateWordCounters();
    }
    
    // Add keyboard shortcuts for word counter
    document.addEventListener('keydown', function(e) {
        // Ctrl+W to show word statistics
        if (e.ctrlKey && e.key === 'w') {
            e.preventDefault();
            copyWordCount();
        }
        
        // Ctrl+Shift+W to export word stats
        if (e.ctrlKey && e.shiftKey && e.key === 'W') {
            e.preventDefault();
            exportWordStats('txt');
        }
    });
});

// Export functions for global access
window.WordCounter = {
    updateWordCounters,
    getWordStatistics,
    loadWordSample,
    copyWordCount,
    exportWordStats,
    analyzeWordDensity
};