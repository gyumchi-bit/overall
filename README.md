# MBTI 성격 분석 사이트

Next.js와 TypeScript로 개발된 모던한 MBTI 성격 검사 웹사이트입니다.

## 🚀 주요 기능

- **정확한 MBTI 검사**: 16개의 과학적 질문으로 구성된 성격 검사
- **상세한 결과 분석**: 16가지 MBTI 유형별 자세한 성격 분석
- **트렌디한 UI/UX**: 모던하고 반응형 디자인
- **SNS 공유**: 카카오톡, 페이스북, 트위터 공유 기능
- **통계 추적**: 로컬 스토리지를 활용한 검사 통계
- **모바일 최적화**: 모든 디바이스에서 완벽한 사용자 경험

## 🛠 기술 스택

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Data Storage**: Local Storage
- **Deployment**: Vercel (권장)

## 📁 프로젝트 구조

```
mbti-analyzer-site/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── globals.css        # 글로벌 스타일
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 홈페이지
│   │   ├── test/              # 검사 페이지
│   │   └── result/            # 결과 페이지
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   └── ui/               # 기본 UI 컴포넌트
│   ├── data/                 # 데이터 정의
│   │   ├── mbtiData.ts       # MBTI 유형 데이터
│   │   └── questionData.ts   # 검사 질문 데이터
│   ├── lib/                  # 유틸리티 함수
│   │   ├── mbtiCalculator.ts # MBTI 계산 로직
│   │   └── utils.ts          # 공통 유틸리티
│   ├── features/             # 기능별 컴포넌트
│   │   ├── test/            # 검사 관련 컴포넌트
│   │   └── result/          # 결과 관련 컴포넌트
│   └── assets/               # 정적 자산
│       ├── illustrations/    # 일러스트레이션
│       └── icons/           # 아이콘
├── public/                   # 정적 파일
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── README.md
```

## 🎯 핵심 기능 설명

### 1. MBTI 검사 시스템
- 각 차원(E/I, S/N, T/F, J/P)별로 균형있게 배치된 질문
- 가중치 기반 점수 계산 시스템
- 확실성 계산을 통한 결과 신뢰도 제공

### 2. 상세한 결과 분석
- 16가지 MBTI 유형별 상세한 설명
- 강점과 약점 분석
- 추천 직업군 제시
- 차원별 점수 시각화

### 3. 공유 기능
- SNS 공유 (트위터, 페이스북, 카카오톡)
- 링크 복사 기능
- 결과 이미지 생성 및 다운로드

### 4. 사용자 경험
- 반응형 디자인
- 로딩 애니메이션
- 프로그레스 바
- 직관적인 네비게이션

## 📋 설치 및 실행

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 방법

1. **의존성 설치**
```bash
npm install
```

2. **개발 서버 실행**
```bash
npm run dev
```

3. **빌드**
```bash
npm run build
```

4. **프로덕션 실행**
```bash
npm start
```

## 🌐 배포

### Vercel 배포 (권장)
1. [Vercel](https://vercel.com)에 계정 생성
2. GitHub 레포지토리 연결
3. 자동 배포 설정 완료

### 기타 플랫폼
- Netlify
- AWS Amplify
- Firebase Hosting

## 🎨 커스터마이징

### 1. MBTI 유형 데이터 수정
`src/data/mbtiData.ts` 파일에서 각 유형의 설명, 색상, 특성을 수정할 수 있습니다.

### 2. 질문 추가/수정
`src/data/questionData.ts` 파일에서 검사 질문을 추가하거나 수정할 수 있습니다.

### 3. 디자인 커스터마이징
- `tailwind.config.js`: Tailwind CSS 설정
- `src/app/globals.css`: 글로벌 스타일
- 각 컴포넌트의 className 수정

### 4. 공유 기능 설정
`src/lib/utils.ts`에서 SNS 공유 설정을 커스터마이징할 수 있습니다.

## 📱 주요 페이지

### 홈페이지 (`/`)
- 검사 소개 및 시작
- MBTI 유형 미리보기
- FAQ 섹션

### 검사 페이지 (`/test`)
- 단계별 질문 진행
- 프로그레스 바
- 이전 질문으로 돌아가기

### 결과 페이지 (`/result`)
- 상세한 MBTI 분석
- 차원별 점수 시각화
- 추천 직업 정보
- 공유 기능

## 🔧 개발 참고사항

### 타입 정의
- 모든 데이터 구조는 TypeScript 인터페이스로 정의
- 엄격한 타입 체크로 런타임 에러 방지

### 상태 관리
- React Hooks 기반 로컬 상태 관리
- 결과 데이터는 localStorage에 저장

### 성능 최적화
- Next.js App Router 활용
- 컴포넌트 지연 로딩
- 이미지 최적화

## 🤝 기여하기

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 라이선스

MIT License

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.

---

**⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!**