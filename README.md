### git 브랜치 전략(git flow 전략도입)
| 브랜치 이름 | 내용                                               |
| --------- | -----------------------------------------------------|
| main      | 배포브랜치                                             |
| develop   | 다음버전을 위한 개발브랜치                              |
| feature   | 하나의 기능을 개발하기 위한 브랜치                      |
| hotfix    | 배포된 버전에 문제가 생겼을 때 해결하는 브랜치           |  
### 커밋 메시지 구조

타입(스코프) : 주제(제목) // Header(헤더)

본문 // Body(바디)

바닥글 // Footer

#### 타입

| 타입 이름 | 내용                                                  |
| --------- | ----------------------------------------------------- |
| feat      | 새로운 기능에 대한 커밋                               |
| fix       | 버그 수정에 대한 커밋                                 |
| build     | 빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋 |
| chore     | 그 외 자잘한 수정에 대한 커밋                         |
| ci        | CI 관련 설정 수정에 대한 커밋                         |
| docs      | 문서 수정에 대한 커밋                                 |
| style     | 코드 스타일 혹은 포맷 등에 관한 커밋                  |
| refactor  | 코드 리팩토링에 대한 커밋                             |
| test      | 테스트 코드 수정에 대한 커밋                          |
| perf      | 성능 개선에 대한 커밋                                 |

- Body

  - Body는 Header에서 표현할 수 없는 상세한 내요
  - Header에서 충분히 표현할 수 있다면 생략 가능

- Footer

  - 바닥글로 어떤 이슈에서 왔는지 같은 참조 정보 추가
  - 특정 이슈 참조
  - 생략 가능

- 작성 예시

```
git commit -m "fix: Safari에서 모달을 띄웠을 때 스크롤 이슈 수정

모바일 사파리에서 Carousel 모달을 띄웠을 때,
모달 밖의 상하 스크롤이 움직이는 이슈 수정.
