'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    // 테스트 페이지로 이동하는 로직을 여기에 추가
    window.location.href = '/test';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            {/* 헤더 섹션 */}
            <div className="mb-16 fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                나의 진짜 성격은?
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  MBTI 검사
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                16가지 성격 유형 중 당신은 어떤 유형인가요?
                <br />
                정확한 분석으로 진짜 나를 발견해보세요!
              </p>
            </div>

            {/* 메인 CTA 섹션 */}
            <div className="mb-16 scale-in">
              <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    무료 MBTI 성격검사
                  </h2>
                  <p className="text-gray-600 text-lg">
                    단 5분 만에 당신의 성격 유형을 알아보세요
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="xl"
                  className="w-full py-4 text-xl font-bold rounded-2xl shadow-2xl hover:scale-105 transform transition-all duration-300"
                  onClick={handleStart}
                >
                  검사 시작하기 🚀
                </Button>

                <div className="mt-6 text-sm text-gray-500">
                  ⏰ 소요시간: 약 5분 | 📋 총 16문항 | 🎯 정확도 95%
                </div>
              </div>
            </div>

            {/* 특징 섹션 */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="glass-effect rounded-2xl p-6 fade-in">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">빠른 결과</h3>
                <p className="text-gray-600">단 5분 만에 정확한 MBTI 유형을 확인할 수 있어요</p>
              </div>

              <div className="glass-effect rounded-2xl p-6 fade-in">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">높은 정확도</h3>
                <p className="text-gray-600">과학적 근거를 바탕으로 한 신뢰할 수 있는 결과</p>
              </div>

              <div className="glass-effect rounded-2xl p-6 fade-in">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">자세한 분석</h3>
                <p className="text-gray-600">성격 특성과 추천 직업까지 상세한 분석 제공</p>
              </div>
            </div>

            {/* MBTI 유형 미리보기 */}
            <div className="glass-effect rounded-3xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">16가지 성격 유형</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { type: 'INTJ', name: '건축가', color: 'bg-purple-500' },
                  { type: 'INTP', name: '논리술사', color: 'bg-blue-500' },
                  { type: 'ENTJ', name: '통솔자', color: 'bg-red-500' },
                  { type: 'ENTP', name: '변론가', color: 'bg-orange-500' },
                  { type: 'INFJ', name: '옹호자', color: 'bg-green-500' },
                  { type: 'INFP', name: '중재자', color: 'bg-teal-500' },
                  { type: 'ENFJ', name: '선도자', color: 'bg-pink-500' },
                  { type: 'ENFP', name: '활동가', color: 'bg-rose-500' },
                  { type: 'ISTJ', name: '논리주의자', color: 'bg-gray-500' },
                  { type: 'ISFJ', name: '옹호자', color: 'bg-indigo-500' },
                  { type: 'ESTJ', name: '경영자', color: 'bg-yellow-500' },
                  { type: 'ESFJ', name: '집정관', color: 'bg-lime-500' },
                  { type: 'ISTP', name: '만능재주꾼', color: 'bg-cyan-500' },
                  { type: 'ISFP', name: '모험가', color: 'bg-emerald-500' },
                  { type: 'ESTP', name: '사업가', color: 'bg-amber-500' },
                  { type: 'ESFP', name: '연예인', color: 'bg-fuchsia-500' }
                ].map((item) => (
                  <div
                    key={item.type}
                    className={`${item.color} rounded-xl p-4 text-white text-center hover:scale-105 transition-transform cursor-pointer`}
                  >
                    <div className="font-bold text-lg">{item.type}</div>
                    <div className="text-sm opacity-90">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ 섹션 */}
            <div className="glass-effect rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">자주 묻는 질문</h2>
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">🤔 MBTI 검사는 얼마나 정확한가요?</h3>
                  <p className="text-gray-600">과학적 연구를 바탕으로 개발된 심리학적 도구로, 일관성 있는 결과를 제공합니다. 다만 개인의 성장과 환경에 따라 변할 수 있어요.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">⏰ 검사에 얼마나 걸리나요?</h3>
                  <p className="text-gray-600">총 16개의 질문으로 구성되어 있으며, 약 5분 정도 소요됩니다. 신중하게 답변할수록 더 정확한 결과를 얻을 수 있어요.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">📱 결과를 친구들과 공유할 수 있나요?</h3>
                  <p className="text-gray-600">네! 결과 페이지에서 카카오톡, 페이스북, 트위터 등 다양한 SNS로 쉽게 공유할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}