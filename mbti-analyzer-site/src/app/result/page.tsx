'use client';

import { useEffect, useState } from 'react';
import { MBTIResult } from '@/lib/mbtiCalculator';
import { mbtiTypes } from '@/data/mbtiData';
import { Button } from '@/components/ui/Button';
import { generateShareText, shareToTwitter, shareToFacebook, copyToClipboard } from '@/lib/utils';

export default function ResultPage() {
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedResult = localStorage.getItem('mbti-result');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
    setIsLoading(false);
  }, []);

  const handleShare = (platform: 'twitter' | 'facebook' | 'copy') => {
    if (!result) return;
    
    const shareData = generateShareText(result);
    
    switch (platform) {
      case 'twitter':
        shareToTwitter(shareData);
        break;
      case 'facebook':
        shareToFacebook(shareData);
        break;
      case 'copy':
        copyToClipboard(shareData.url);
        alert('링크가 복사되었습니다!');
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p>결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">결과를 찾을 수 없습니다</h2>
          <p className="mb-6">테스트를 다시 진행해주세요.</p>
          <Button onClick={() => window.location.href = '/'}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const mbtiType = mbtiTypes[result.type];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 결과 헤더 */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center text-6xl font-bold text-white"
                 style={{ backgroundColor: mbtiType.color }}>
              {result.type}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{mbtiType.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{mbtiType.nickname}</p>
            <div className="text-lg text-gray-700">
              확실성: <span className="font-bold text-2xl" style={{ color: mbtiType.color }}>
                {result.certainty}%
              </span>
            </div>
          </div>
        </div>

        {/* 성격 설명 */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">성격 특징</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {mbtiType.description}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-3">강점</h3>
              <ul className="space-y-2">
                {mbtiType.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-orange-600 mb-3">개선점</h3>
              <ul className="space-y-2">
                {mbtiType.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-orange-500 mr-2">!</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 차원별 점수 */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">상세 분석</h2>
          
          <div className="space-y-6">
            {[
              { dimension: 'EI', labels: ['외향성(E)', '내향성(I)'], values: [result.percentages.EI.E, result.percentages.EI.I] },
              { dimension: 'SN', labels: ['감각(S)', '직관(N)'], values: [result.percentages.SN.S, result.percentages.SN.N] },
              { dimension: 'TF', labels: ['사고(T)', '감정(F)'], values: [result.percentages.TF.T, result.percentages.TF.F] },
              { dimension: 'JP', labels: ['판단(J)', '인식(P)'], values: [result.percentages.JP.J, result.percentages.JP.P] }
            ].map(({ dimension, labels, values }) => (
              <div key={dimension}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{labels[0]}</span>
                  <span className="font-semibold">{labels[1]}</span>
                </div>
                <div className="flex h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${values[0]}%` }}
                  >
                    {values[0] > 15 && `${values[0]}%`}
                  </div>
                  <div 
                    className="bg-purple-500 flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${values[1]}%` }}
                  >
                    {values[1] > 15 && `${values[1]}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 추천 직업 */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">추천 직업</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {mbtiType.careers.map((career, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-3 text-center">
                <span className="text-gray-700 font-medium">{career}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 공유 버튼들 */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">결과 공유하기</h2>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="primary" 
              onClick={() => handleShare('twitter')}
              className="bg-blue-500 hover:bg-blue-600"
            >
              트위터 공유
            </Button>
            <Button 
              variant="primary" 
              onClick={() => handleShare('facebook')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              페이스북 공유
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleShare('copy')}
            >
              링크 복사
            </Button>
          </div>
        </div>

        {/* 다시 테스트하기 */}
        <div className="text-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => window.location.href = '/'}
            className="mr-4"
          >
            다시 테스트하기
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
}