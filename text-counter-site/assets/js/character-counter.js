// Character Counter Specific Functions

// Character counter update function
function updateCharacterCounters() {
    const textInput = document.getElementById('textInput');
    if (!textInput) return;
    
    const text = textInput.value;
    const includeSpaces = document.getElementById('includeSpaces')?.checked ?? true;
    const includeLineBreaks = document.getElementById('includeLineBreaks')?.checked ?? true;
    const includePunctuation = document.getElementById('includePunctuation')?.checked ?? true;
    
    const stats = getCharacterStatistics(text, {
        includeSpaces,
        includeLineBreaks,
        includePunctuation
    });
    
    // Update main counter
    updateElement('totalCharacters', formatNumber(stats.total));
    
    // Update detailed stats
    updateElement('charactersWithSpaces', formatNumber(stats.withSpaces));
    updateElement('charactersWithoutSpaces', formatNumber(stats.withoutSpaces));
    updateElement('koreanChars', formatNumber(stats.korean));
    updateElement('englishChars', formatNumber(stats.english));
    updateElement('numberChars', formatNumber(stats.numbers));
    updateElement('specialChars', formatNumber(stats.special));
    updateElement('spaceChars', formatNumber(stats.spaces));
    updateElement('lineBreakChars', formatNumber(stats.lineBreaks));
    
    // Update distribution chart
    updateDistributionChart(stats);
}

// Get character statistics with options
function getCharacterStatistics(text, options = {}) {
    const {
        includeSpaces = true,
        includeLineBreaks = true,
        includePunctuation = true
    } = options;
    
    if (!text) {
        return {
            total: 0,
            withSpaces: 0,
            withoutSpaces: 0,
            korean: 0,
            english: 0,
            numbers: 0,
            special: 0,
            spaces: 0,
            lineBreaks: 0
        };
    }
    
    // Basic counts
    const withSpaces = text.length;
    const withoutSpaces = text.replace(/\s/g, '').length;
    
    // Character type counts
    const korean = (text.match(/[가-힣]/g) || []).length;
    const english = (text.match(/[a-zA-Z]/g) || []).length;
    const numbers = (text.match(/\d/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const lineBreaks = (text.match(/\n/g) || []).length;
    
    // Special characters (punctuation and symbols)
    let special = 0;
    if (includePunctuation) {
        special = (text.match(/[^가-힣a-zA-Z0-9\s]/g) || []).length;
    } else {
        special = (text.match(/[^\w\s가-힣]/g) || []).length;
    }
    
    // Calculate total based on options
    let total = korean + english + numbers;
    
    if (includeSpaces) {
        total += spaces;
    }
    
    if (includeLineBreaks) {
        total += lineBreaks;
    }
    
    if (includePunctuation) {
        total += special;
    }
    
    return {
        total,
        withSpaces,
        withoutSpaces,
        korean,
        english,
        numbers,
        special,
        spaces,
        lineBreaks
    };
}

// Update distribution chart
function updateDistributionChart(stats) {
    const total = stats.withSpaces;
    
    if (total === 0) {
        // Reset all bars
        document.getElementById('koreanBar').style.width = '0%';
        document.getElementById('englishBar').style.width = '0%';
        document.getElementById('numberBar').style.width = '0%';
        document.getElementById('specialBar').style.width = '0%';
        document.getElementById('spaceBar').style.width = '0%';
        return;
    }
    
    // Calculate percentages
    const koreanPercent = (stats.korean / total) * 100;
    const englishPercent = (stats.english / total) * 100;
    const numberPercent = (stats.numbers / total) * 100;
    const specialPercent = (stats.special / total) * 100;
    const spacePercent = ((stats.spaces + stats.lineBreaks) / total) * 100;
    
    // Update bars
    document.getElementById('koreanBar').style.width = koreanPercent + '%';
    document.getElementById('englishBar').style.width = englishPercent + '%';
    document.getElementById('numberBar').style.width = numberPercent + '%';
    document.getElementById('specialBar').style.width = specialPercent + '%';
    document.getElementById('spaceBar').style.width = spacePercent + '%';
    
    // Add tooltips (optional)
    const bars = [
        { id: 'koreanBar', label: '한글', percent: koreanPercent },
        { id: 'englishBar', label: '영어', percent: englishPercent },
        { id: 'numberBar', label: '숫자', percent: numberPercent },
        { id: 'specialBar', label: '특수문자', percent: specialPercent },
        { id: 'spaceBar', label: '공백/줄바꿈', percent: spacePercent }
    ];
    
    bars.forEach(bar => {
        const element = document.getElementById(bar.id);
        if (element && bar.percent > 0) {
            element.title = `${bar.label}: ${bar.percent.toFixed(1)}%`;
        }
    });
}

// Load character-specific sample text
function loadCharacterSample() {
    const samples = [
        "글자수 세기 테스트입니다.\n\n이 텍스트는 한글과 영어(English), 숫자(123), 특수문자(!@#)가 포함되어 있습니다. 글자수 분석 도구의 정확성을 테스트하기 위한 샘플 텍스트입니다.\n\n총 글자수와 각 언어별 구성을 확인해보세요. This sample text contains Korean, English, numbers (456), and special characters (&*%).",
        
        "문자 카운터 정확도 검증\n\n한국어: 안녕하세요! 반갑습니다.\nEnglish: Hello! Nice to meet you.\n숫자: 2024년 10월 27일\n특수문자: @#$%^&*()_+-=[]{}|;':\",./<>?\n\n이 텍스트로 다양한 문자 유형의 정확한 카운팅을 확인할 수 있습니다.",
        
        "🎉 이모지와 다양한 문자 테스트 🎉\n\n한글: 가나다라마바사아자차카타파하\nEnglish: ABCDEFGHIJKLMNOPQRSTUVWXYZ\nNumbers: 0123456789\nSymbols: !@#$%^&*()_+-=\nEmojis: 😀😃😄😁😆😅😂🤣😊😇\n\n각 문자 유형별로 정확히 분류되는지 확인해보세요!"
    ];
    
    const randomIndex = Math.floor(Math.random() * samples.length);
    const textInput = document.getElementById('textInput');
    
    if (textInput) {
        textInput.value = samples[randomIndex];
        updateCharacterCounters();
        textInput.focus();
    }
}

// Copy character count results
function copyCharacterCount() {
    const textInput = document.getElementById('textInput');
    if (!textInput || !textInput.value.trim()) {
        showNotification('복사할 텍스트가 없습니다.', 'error');
        return;
    }
    
    const text = textInput.value;
    const stats = getCharacterStatistics(text);
    
    const result = `글자수 분석 결과
==================

총 글자수: ${formatNumber(stats.total)}
공백 포함: ${formatNumber(stats.withSpaces)}
공백 제외: ${formatNumber(stats.withoutSpaces)}

언어별 구성:
- 한글: ${formatNumber(stats.korean)}
- 영어: ${formatNumber(stats.english)}
- 숫자: ${formatNumber(stats.numbers)}
- 특수문자: ${formatNumber(stats.special)}
- 공백: ${formatNumber(stats.spaces)}
- 줄바꿈: ${formatNumber(stats.lineBreaks)}`;

    copyToClipboard(result)
        .then(() => {
            showNotification('글자수 분석 결과가 클립보드에 복사되었습니다.', 'success');
        })
        .catch(() => {
            showNotification('복사에 실패했습니다.', 'error');
        });
}

// Export character statistics
function exportCharacterStats(format) {
    const textInput = document.getElementById('textInput');
    if (!textInput || !textInput.value.trim()) {
        showNotification('내보낼 텍스트가 없습니다.', 'error');
        return;
    }
    
    const text = textInput.value;
    const stats = getCharacterStatistics(text);
    const timestamp = new Date().toLocaleString('ko-KR');
    
    let content = '';
    let filename = '';
    let mimeType = '';
    
    switch (format) {
        case 'txt':
            content = `글자수 분석 결과
===================
분석 시간: ${timestamp}

총 글자수: ${formatNumber(stats.total)}
공백 포함: ${formatNumber(stats.withSpaces)}
공백 제외: ${formatNumber(stats.withoutSpaces)}

언어별 구성:
- 한글 글자: ${formatNumber(stats.korean)}
- 영어 글자: ${formatNumber(stats.english)}
- 숫자: ${formatNumber(stats.numbers)}
- 특수문자: ${formatNumber(stats.special)}
- 공백: ${formatNumber(stats.spaces)}
- 줄바꿈: ${formatNumber(stats.lineBreaks)}

분석 대상 텍스트:
==================
${text}`;
            filename = `character-analysis-${new Date().toISOString().slice(0, 10)}.txt`;
            mimeType = 'text/plain';
            break;
            
        case 'csv':
            content = `항목,값
분석시간,"${timestamp}"
총글자수,${stats.total}
공백포함,${stats.withSpaces}
공백제외,${stats.withoutSpaces}
한글글자,${stats.korean}
영어글자,${stats.english}
숫자,${stats.numbers}
특수문자,${stats.special}
공백,${stats.spaces}
줄바꿈,${stats.lineBreaks}`;
            filename = `character-analysis-${new Date().toISOString().slice(0, 10)}.csv`;
            mimeType = 'text/csv';
            break;
            
        case 'json':
            const data = {
                timestamp,
                analysis: 'character_count',
                statistics: stats,
                originalText: text
            };
            content = JSON.stringify(data, null, 2);
            filename = `character-analysis-${new Date().toISOString().slice(0, 10)}.json`;
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

// Character input validation and formatting
function validateCharacterInput() {
    const textInput = document.getElementById('textInput');
    if (!textInput) return;
    
    const text = textInput.value;
    const maxLength = 1000000; // 1 million characters limit
    
    if (text.length > maxLength) {
        showNotification(`텍스트가 너무 깁니다. 최대 ${formatNumber(maxLength)}자까지 입력 가능합니다.`, 'warning');
        textInput.value = text.substring(0, maxLength);
        updateCharacterCounters();
    }
}

// Real-time character analysis with debouncing
const debouncedCharacterUpdate = debounce(updateCharacterCounters, 50);

// Initialize character counter page
document.addEventListener('DOMContentLoaded', function() {
    // Add input validation
    const textInput = document.getElementById('textInput');
    if (textInput) {
        textInput.addEventListener('input', function() {
            validateCharacterInput();
            debouncedCharacterUpdate();
        });
        
        // Load saved text
        loadSavedText();
        updateCharacterCounters();
    }
    
    // Add keyboard shortcuts specific to character counter
    document.addEventListener('keydown', function(e) {
        // Ctrl+D to download character stats
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            exportCharacterStats('txt');
        }
        
        // Ctrl+Shift+C to copy character count
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            copyCharacterCount();
        }
    });
});

// Character analysis utilities
function getCharacterByUnicodeRange(text) {
    const ranges = {
        korean: /[가-힣]/g,
        english: /[a-zA-Z]/g,
        numbers: /\d/g,
        spaces: / /g,
        lineBreaks: /\n/g,
        tabs: /\t/g,
        punctuation: /[.,;:!?]/g,
        symbols: /[^가-힣a-zA-Z0-9\s.,;:!?]/g
    };
    
    const result = {};
    Object.keys(ranges).forEach(key => {
        const matches = text.match(ranges[key]);
        result[key] = matches ? matches.length : 0;
    });
    
    return result;
}

// Character frequency analysis
function analyzeCharacterFrequency(text) {
    const frequency = {};
    
    for (let char of text) {
        frequency[char] = (frequency[char] || 0) + 1;
    }
    
    // Sort by frequency
    const sorted = Object.entries(frequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 20); // Top 20 most frequent characters
    
    return sorted;
}

// Export functions for global access
window.CharacterCounter = {
    updateCharacterCounters,
    getCharacterStatistics,
    loadCharacterSample,
    copyCharacterCount,
    exportCharacterStats,
    analyzeCharacterFrequency
};