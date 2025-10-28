# GitHub API 설정 가이드

## 🔐 보안 설정 방법

### 1. GitHub Personal Access Token 생성

1. GitHub에 로그인 후 [Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) 페이지로 이동
2. "Generate new token" 클릭
3. 다음 권한 설정:
   - `gist` (Gist 생성/관리)
   - `repo` (저장소 접근, 필요한 경우)
   - `user:email` (이메일 확인)
   - `read:user` (사용자 정보 읽기)

### 2. 보안 주의사항

⚠️ **중요**: API 토큰은 절대 공개하지 마세요!

- 토큰은 로컬 브라우저에만 저장됩니다
- 서버로 전송되지 않습니다
- 암호화되어 localStorage에 보관됩니다
- 브라우저 종료 시 메모리에서 자동 삭제됩니다

### 3. 사용 가능한 기능

✅ **현재 지원되는 기능:**
- MBTI 테스트 결과를 GitHub Gist로 저장
- 진로 탐색 결과를 GitHub Gist로 저장
- 비공개 Gist로 개인 데이터 보호
- 결과 공유 및 백업

🔄 **계획된 기능:**
- 개인 저장소에 데이터 백업
- 테스트 히스토리 관리
- 설정 동기화
- 결과 비교 분석

### 4. 환경별 설정

#### 개발 환경
```javascript
// .env.local (권장하지 않음 - 클라이언트 사이드)
GITHUB_TOKEN=ghp_your_token_here
```

#### 프로덕션 환경
- 사용자가 직접 GitHub 설정 페이지에서 입력
- 각 사용자별 개별 토큰 관리
- 브라우저 로컬 스토리지에 암호화 저장

### 5. API 사용량 제한

GitHub API는 다음과 같은 제한이 있습니다:

- **인증된 요청**: 시간당 5,000회
- **Gist 생성**: 제한 없음 (일반적인 사용에서)
- **Rate Limit 확인**: 응답 헤더에서 확인 가능

### 6. 문제 해결

#### 토큰 오류
- 토큰 형식 확인: `ghp_` 또는 `github_pat_`로 시작
- 권한 설정 확인
- 토큰 만료일 확인

#### 저장 실패
- 네트워크 연결 확인
- API 사용량 제한 확인
- 토큰 권한 재확인

### 7. 보안 모범 사례

1. **토큰 주기적 교체**: 3-6개월마다 새 토큰 생성
2. **최소 권한 원칙**: 필요한 권한만 부여
3. **토큰 모니터링**: GitHub에서 토큰 사용 내역 확인
4. **즉시 무효화**: 토큰 노출 시 즉시 삭제

---

## 🛠️ 개발자 가이드

### API 클래스 사용법

```javascript
// GitHub API 설정 확인
const settings = SecureStorage.loadSecure('github_api_settings');
if (settings && settings.token) {
    // API 사용 가능
    const githubAPI = new GitHubAPIManager();
    
    // Gist 생성
    const gist = await githubAPI.createGist('제목', '내용', false);
    
    // 테스트 결과 저장
    const url = await githubAPI.saveTestResult('성격 테스트', result);
}
```

### 에러 핸들링

```javascript
try {
    await saveToGitHub();
} catch (error) {
    if (error.message.includes('rate limit')) {
        // API 사용량 초과
    } else if (error.message.includes('Unauthorized')) {
        // 인증 실패
    } else {
        // 기타 오류
    }
}
```