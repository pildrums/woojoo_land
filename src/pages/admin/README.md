## 23.06.08
- 스타일드 컴포넌트 프로젝트 컬러 작업
- theme.ts, styled.d.ts 컬러 업데이트 작업

## 23.06.09
- 관리자 page 디자인용 임시 페이지 AdminPages.tsx 작업
- 관리자 page 폴더 AdminPages.tsx, HistoryPage.tsx, ProductsPage.tsx, UserListPage.tsx 파일 추가 작업
- 관리자 Components 폴더 AdminTemplate.tsx 파일 추가 작업
- 관리자 Components 폴더 AdminNav.tsx 파일 추가 작업
- App.tsx에 Route 추가 -> 관리자 디자인 테스트 페이지 메뉴
- 임시 관리자 페이지 이동 -> 'http://localhost:3000//admin'
- 개발중인 관리자 페이지 이동 -> 'http://localhost:3000//admins'

## 23.06.13
- 썸네일, 사용자, 메인배너, 상세이미지 대체 이미지 및 로고 이미지 업로드
- 헤더 영역 로고 삽입 작업 및 검색 창 디자인 부분 수정 작업

## 23.06.14
- 메인 header 로그인, 회원가입, 찜, 카트, 프로필 영역 스타일 수정 작업
- components 작업
  1. AdminHeader.tsx, AdminNav.tsx 스타일 작업
  2. AdminHistroyItem.tsx 거래내역 개별 아이템 대체 데이터 삽입 후 레이아웃 작업
  3. Button.tsx 관리자 페이지 사용 버튼 스타일 추가
- page 작업
  1. AdminPages.tsx 로고 추가 및 사이드바 스타일 작업
  2. HistroyPage.tsx 거래내역 조회 페이지 추가
  3. UserListPage.tsx 사용자 조회 페이지 추가

- public 작업
  1. 관리자 페이지용 로고 LogoAdmin.png, LogoAdmin.png 추가

## 23.06.15
- components 작업
  1. AdminTitle.tsx 관리자 페이지 상단 타이틀 재사용 컴포넌트 작업
  2. AdminUserItem.tsx 유저 아이템 임시 사용 데이터 레이아웃 및 스타일 작업
- page 작업
  1. UserListPage.tsx 유저 리스트 레이아웃 및 스타일 작업
- public 작업
  1. AdminUser.png 관리자 유저 이미지 추가

## 23.06.16
- adminAPI.ts 유저 목록 타입 추가
- 페이지네이션 라이브러리 추가 설치 `npm i react-js-pagination`
- components 작업
  1. AdminUserPaging.tsx 페이지네이션 설정 작업
  2. AdminUserItem.tsx 스타일 작업
- page 작업
  1. UserListPage.tsx 페이지네이션 사용 페이지 노출 기능 및 레이아웃 작업 + 기능 주석

## 23.06.19
- 관리자 페이지 유저 리스트 페이지네이션 스타일 작업
- 유저 페이지 주문조회 리스트 스타일 작업
- 이슈
  1. 관리자 페이지 유저 리스트 라이브러리 스타일드컴포넌트 적용 불가 오류 발견 -> 페이지네이션의 'div'로 감싸 스타일 적용 성공

## 23.06.20
- 동민님 기능 개발 임시 관리자 주문조회 및 제품 추가, 수정페이지 이미지 파일 추가 및 태그 입력창 작업
- page -> index.tsx 파일 정리 작업 진행

## 23.06.21
- 새로운 admins 관리자 페이지 제품 조회 페이지 작업

### 23.06.23
- 썸네일, 사용자, 메인배너, 상세이미지 대체 이미지 및 로고 이미지 업로드
- 헤더 영역 로고 삽입 작업 및 검색 창 디자인 부분 수정 작업
- 메인 타이틀용 폰트 파일 첨부 및 전역스타일 작업
- 관리자 페이지 상품 추가하기 기능 구현 작업
- 태그 전달 기능 구현 작업

### 23.06.25
- 수정, 삭제 버튼 실행 후 랜더링되지 않는 문제 해결
- 제품 리스트 페이지 -> 컴포넌트 admin 폴더로 이동 및 재작업
- 파일 선택 버튼 label 스파일 작업 및 파일명 표시 작업
- AdminProductItemEdit.tsx -> AdminProductItem.tsx 포함 작업 진행

### 23.06.26
- 메인 푸터 작업 완료
- 메인 배너이미지 3종 디자인 작업 완료 파일 업로드
- 전역스타일 나눔스퀘어폰트 메인 본문 폰트로 적용

### 23.06.27
- 서브메뉴 이미지 삽입 및 스타일 작업
- 프로젝트 전체 스크롤 제거 -> 스크롤 기능은 작동

### 23.06.28
- 메인 패키지 배너 이미지 업로드
- 메인 상품페이지 상세이미지 출력 코드 삽입
  
### 23.06.29
- 헤더 서브 태그 스타일 수정
- 관리자 페이지 로딩 애니메이션 추가
- 관리자 페이지 스타일 수정 작업
- 유저 리스트 더미 이미지 작업
- 헤더 스타일 레이아웃 수정 작업
- 메인 영역 스타일 수정 작업