'use client';

import { useState } from 'react';
import { questions, getRandomQuestions } from '@/data/questionData';
import { calculateMBTIResult } from '@/lib/mbtiCalculator';
import { Button } from '@/components/ui/Button';

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [testQuestions] = useState(() => getRandomQuestions(12));
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = {
      ...answers,
      [testQuestions[currentQuestion].id]: optionIndex
    };
    setAnswers(newAnswers);

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 테스트 완료
      setIsCompleted(true);
      const result = calculateMBTIResult(testQuestions, newAnswers);
      localStorage.setItem('mbti-result', JSON.stringify(result));
      window.location.href = '/result';
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">테스트 완료!</h2>
          <p>결과 페이지로 이동 중...</p>
        </div>
      </div>
    );
  }

  const question = testQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">MBTI 성격검사</h1>
          <div className="bg-white/20 rounded-full h-3 mb-4">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white/80">
            질문 {currentQuestion + 1} / {testQuestions.length}
          </p>
        </div>

        {/* 질문 카드 */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-6 text-left bg-gray-50 hover:bg-blue-50 rounded-2xl transition-all duration-200 border-2 border-transparent hover:border-blue-200"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* 네비게이션 */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={goBack}
              disabled={currentQuestion === 0}
            >
              이전 질문
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/'}
            >
              처음으로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}