import { MBTIResult } from './mbtiCalculator';
import { mbtiTypes } from '@/data/mbtiData';

/**
 * 클래스명을 조건부로 결합하는 유틸리티 함수
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * 숫자를 퍼센트 형식으로 포맷하는 함수
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * 지연 함수 (애니메이션 등에 사용)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * 로컬 스토리지에 데이터 저장
 */
export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

/**
 * 로컬 스토리지에서 데이터 불러오기
 */
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

/**
 * SNS 공유 기능
 */
export interface ShareOptions {
  title: string;
  text: string;
  url: string;
  hashtags?: string[];
}

export const shareToTwitter = ({ title, text, url, hashtags = [] }: ShareOptions): void => {
  const hashtagsString = hashtags.length > 0 ? ` ${hashtags.map(tag => `#${tag}`).join(' ')}` : '';
  const tweetText = encodeURIComponent(`${text}${hashtagsString}`);
  const shareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
};

export const shareToFacebook = ({ url }: Pick<ShareOptions, 'url'>): void => {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
};

export const shareToKakao = ({ title, text, url }: ShareOptions): void => {
  // 카카오 SDK가 로드되어 있는 경우에만 실행
  if (typeof window !== 'undefined' && (window as any).Kakao) {
    (window as any).Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: text,
        imageUrl: `${url}/og-image.png`, // OG 이미지 경로
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '결과 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  } else {
    // 카카오 SDK가 없는 경우 링크 복사로 대체
    copyToClipboard(url);
    alert('링크가 클립보드에 복사되었습니다!');
  }
};

export const shareViaNativeAPI = async ({ title, text, url }: ShareOptions): Promise<void> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    // 네이티브 공유 API가 지원되지 않는 경우 링크 복사
    copyToClipboard(url);
    alert('링크가 클립보드에 복사되었습니다!');
  }
};

/**
 * 클립보드에 텍스트 복사
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 폴백: 임시 textarea 생성하여 복사
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

/**
 * MBTI 결과 공유용 텍스트 생성
 */
export const generateShareText = (result: MBTIResult): ShareOptions => {
  const mbtiType = mbtiTypes[result.type];
  const title = `나의 MBTI 유형: ${result.type} - ${mbtiType?.name || ''}`;
  const text = `나는 ${result.type} (${mbtiType?.nickname || ''}) 유형이에요! 
확실성: ${result.certainty}%

특징: ${mbtiType?.description || ''}

나도 MBTI 테스트 해보기 👇`;

  return {
    title,
    text,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    hashtags: ['MBTI', 'personality', '성격테스트', result.type]
  };
};

/**
 * 결과 이미지 생성 (Canvas 사용)
 */
export const generateResultImage = async (result: MBTIResult): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    canvas.width = 800;
    canvas.height = 600;

    // 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, mbtiTypes[result.type]?.color || '#6366f1');
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 텍스트 설정
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    
    // MBTI 유형
    ctx.fillText(result.type, canvas.width / 2, 150);
    
    // 유형 이름
    ctx.font = '32px Arial';
    ctx.fillText(mbtiTypes[result.type]?.name || '', canvas.width / 2, 200);
    
    // 확실성
    ctx.font = '24px Arial';
    ctx.fillText(`확실성: ${result.certainty}%`, canvas.width / 2, 250);

    // 차원별 점수
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    const startY = 320;
    const lineHeight = 40;
    
    ctx.fillText(`외향성(E): ${result.percentages.EI.E}% | 내향성(I): ${result.percentages.EI.I}%`, 50, startY);
    ctx.fillText(`감각(S): ${result.percentages.SN.S}% | 직관(N): ${result.percentages.SN.N}%`, 50, startY + lineHeight);
    ctx.fillText(`사고(T): ${result.percentages.TF.T}% | 감정(F): ${result.percentages.TF.F}%`, 50, startY + lineHeight * 2);
    ctx.fillText(`판단(J): ${result.percentages.JP.J}% | 인식(P): ${result.percentages.JP.P}%`, 50, startY + lineHeight * 3);

    // 하단 텍스트
    ctx.textAlign = 'center';
    ctx.font = '18px Arial';
    ctx.fillText('MBTI 성격 분석 결과', canvas.width / 2, canvas.height - 50);

    // 이미지 데이터 URL 반환
    resolve(canvas.toDataURL('image/png'));
  });
};

/**
 * 이미지 다운로드
 */
export const downloadImage = (dataUrl: string, filename: string = 'mbti-result.png'): void => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 통계 관련 함수들
 */
export interface TestStatistics {
  totalTests: number;
  typeDistribution: Record<string, number>;
  averageCertainty: number;
  completionRate: number;
  lastUpdated: string;
}

export const updateStatistics = (result: MBTIResult): void => {
  const stats = loadFromLocalStorage<TestStatistics>('mbti-statistics', {
    totalTests: 0,
    typeDistribution: {},
    averageCertainty: 0,
    completionRate: 0,
    lastUpdated: new Date().toISOString()
  });

  stats.totalTests += 1;
  stats.typeDistribution[result.type] = (stats.typeDistribution[result.type] || 0) + 1;
  
  // 평균 확실성 계산 (간단한 이동평균)
  stats.averageCertainty = Math.round(
    (stats.averageCertainty * (stats.totalTests - 1) + result.certainty) / stats.totalTests
  );
  
  stats.completionRate = 100; // 완료된 테스트만 기록되므로
  stats.lastUpdated = new Date().toISOString();

  saveToLocalStorage('mbti-statistics', stats);
};

export const getStatistics = (): TestStatistics => {
  return loadFromLocalStorage<TestStatistics>('mbti-statistics', {
    totalTests: 0,
    typeDistribution: {},
    averageCertainty: 0,
    completionRate: 0,
    lastUpdated: new Date().toISOString()
  });
};

/**
 * 가장 인기 있는 MBTI 유형 반환
 */
export const getMostPopularType = (): string | null => {
  const stats = getStatistics();
  const distribution = stats.typeDistribution;
  
  if (Object.keys(distribution).length === 0) return null;
  
  return Object.entries(distribution).reduce((a, b) => 
    distribution[a[0]] > distribution[b[0]] ? a : b
  )[0];
};

/**
 * 날짜 포맷팅
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * 애니메이션 이징 함수들
 */
export const easeInOut = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const easeOut = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

/**
 * 반응형 디바이스 감지
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * 스크롤 위치 감지
 */
export const getScrollPercentage = (): number => {
  if (typeof window === 'undefined') return 0;
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
};

/**
 * 요소가 뷰포트에 있는지 확인
 */
export const isElementInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};