# 원티드 프리온보딩 프론트엔드 - 선발 과제

## 지원자의 성명 : `김영채`

## 프로젝트의 실행 방법

```
$ git clone https://github.com/0chae01/wanted-pre-onboarding-frontend.git
$ cd wanted-pre-onboarding-frontend
$ npm install
$ npm start
```

## 배포 링크

https://wanted-pre-onboarding-frontend-0chae01.vercel.app

## 데모 영상

### :: 1. 로그인 / 회원가입

https://github.com/0chae01/wanted-pre-onboarding-frontend/assets/124250465/8d3d621d-a00c-43f3-a6e3-9b348619af65

### :: 2. TODO LIST

https://github.com/0chae01/wanted-pre-onboarding-frontend/assets/124250465/a26a484a-1c91-4026-82c4-c15df177b382

## 사용 기술 스택

<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
	<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
	<img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat&logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/styledComponents-DB7093?style=flat&logo=styledComponents&logoColor=white" />
</div>

## 프로젝트 구조

```
├── public
│   ├── favicon.ico
│   ├── images
│   │   ├── coffeebreak.png
│   │   └── error.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── Router.tsx
│   ├── apis
│   │   ├── auth.ts
│   │   └── todo.ts
│   ├── components
│   │   └── Header.tsx
│   ├── constants
│   │   └── path.ts
│   ├── pages
│   │   ├── Main.tsx
│   │   ├── NotFound.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── Todo.tsx
│   ├── routes
│   │   ├── PrivateRoute.tsx
│   │   └── PublicRoute.tsx
│   ├── styles
│   │   ├── Auth.styled.ts
│   │   ├── NotFound.styled.ts
│   │   └── Todo.styled.ts
│   └── types
│       └── todoItem.ts
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## 과제 목록

### :: 1. 로그인 / 회원가입

- [x] `/signup` 경로에 회원가입 기능을 개발해주세요
- [x] `/signin` 경로에 로그인 기능을 개발해주세요
- [x] 페이지 안에 이메일 input, 비밀번호 input, 제출 button이 포함된 형태로 구성해주세요
  - [x] 이메일 input에 `data-testid="email-input"` 속성을 부여해주세요
  - [x] 패스워드 input에 `data-testid="password-input"` 속성을 부여해주세요
  - [x] 회원가입 페이지에는 회원가입 button에 `data-testid="signup-button"` 속성을 부여해주세요
  - [x] 로그인 페이지에는 로그인 button에 `data-testid="signin-button"` 속성을 부여해주세요
- [x] 두 페이지의 UI는 동일해도 무방합니다.
- [x] 회원가입과 로그인 페이지의 버튼에 부여되는 test-id가 다른 것에 유의해주세요

#### Assignment 1

- [x] 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요
  - [x] 이메일 조건: `@` 포함
  - [x] 비밀번호 조건: 8자 이상
  - [x] 이메일과 비밀번호의 유효성 검사 조건은 별도의 추가 조건 부여 없이 위의 조건대로만 진행해주세요 (e.g. 비밀번호 유효성 검사에 특수문자 포함 등의 새로운 조건을 추가하는 행위, 비밀번호 확인 조건을 추가하는 행위 등은 지양해주세요)
- [x] 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성을 부여해주세요
- [x] 보안 상 실제 사용하고 계신 이메일과 패스워드말고 테스트용 이메일, 패스워드 사용을 권장드립니다.

#### Assignment 2

- [x] 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동해주세요

#### Assignment 3

- [x] 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 `/todo` 경로로 이동해주세요
  - [x] 로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.
  - [x] 응답받은 JWT는 로컬 스토리지에 저장해주세요

#### Assignment 4

- [x] 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
  - [x] 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트 시켜주세요
  - [x] 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/signin` 경로로 리다이렉트 시켜주세요

### :: 2. TODO LIST

#### Assignment 5

- [x] `/todo`경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
- [x] 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.
- [x] TODO의 완료 여부는 `<input type="checkbox" />`를 통해 표현해주세요
- [x] TODO는 `<li>` tag를 이용해 감싸주세요

#### Assignment 6

- [x] 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요
  - [x] TODO 입력 input에는 `data-testid="new-todo-input"` 속성을 부여해주세요
  - [x] TODO 추가 button에는 `data-testid="new-todo-add-button"` 속성을 부여해주세요
- [x] 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요
- [x] TODO를 추가 한 뒤 새로고침을 해도 추가한 TODO가 목록에 보여야 합니다.

#### Assignment 7

- [x] TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.

#### Assignment 8

- [x] TODO 우측에 수정버튼과 삭제 버튼을 만들어주세요
  - [x] 수정 버튼에는 `data-testid="modify-button"` 속성을 부여해주세요
  - [x] 삭제 버튼에는 `data-testid="delete-button"` 속성을 부여해주세요

#### Assignment 9

- [x] 투두 리스트의 삭제 기능을 구현해주세요
  - [x] 투두 리스트의 TODO 우측의 삭제버튼을 누르면 해당 아이템이 삭제되도록 해주세요

#### Assignment 10

- [x] 투두 리스트의 수정 기능을 구현해주세요

  - [x] TODO 우측의 수정 버튼을 누르면 수정모드가 활성화 되도록 해주세요
  - [x] 수정모드에서는 TODO의 내용을 변경할 수 있어야 합니다.
  - [x] 수정모드에서는 TODO의 내용이 input창 안에 입력된 형태로 변경해주세요
    - [x] 수정 input창에는 `data-testid="modify-input"` 속성을 부여해주세요
  - [x] 수정모드에서는 TODO의 우측에 제출버튼과 취소버튼이 표시되게 해주세요
    - [x] 제출버튼에는 `data-testid="submit-button"` 속성을 부여해주세요
    - [x] 취소버튼에는 `data-testid="cancel-button"` 속성을 부여해주세요
  - [x] 제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트 될 수 있도록 해주세요
  - [x] 취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드를 비활성화 해주세요

## 🧐 고민했던 점

### form 태그의 장점 활용

바닐라 JS 프로젝트와는 달리 리액트에서의 form 태그는 기존의 여러 역할이 무의미해지는 것 같다. 그럼에도 form태그를 사용하는 이유와 장점은 엔터 키의 활용이 아닐까 싶다. 로그인/회원가입 시, 투두 추가 시에는 form 태그를 활용해 유저가 문자 입력을 하다가 마우스 사용 없이 바로 엔터 키 만으로 다음 동작이 되도록 구현했다.

### todo 여러개를 동시 수정 가능하게 할 것인가

여러 개의 todo item들이 등록되어 있는 상황에서, 하나의 todo가 수정모드에 있을 때 다른 todo의 수정모드가 활성화 된다면 인풋이 많아진다. 이렇게 되면 유저 입장에서 어떤 todo를 수정중이였는지 혼동할 수 있을 것이다. 따라서 하나의 todo가 수정모드일 때 다른 todo를 수정하려고 하면 막고, 수정을 완료하라는 alert을 띄우는 방식으로 개발했다.

### 커밋은 작게

선발 과제의 평가 요소에 깃 활용 능력도 있었고, 평소에 하나의 커밋에 하나의 작업만 하는 습관이 아직 부족하다고 느꼈다. 따라서 이번 과제를 진행하면서는 하나의 작업을 마치면 커밋을 바로 하려고 노력했고, 목적이 분명히 드러나는 커밋메시지를 작성하는 데 집중했다.(그럼에도 불구하고 의식의 흐름대로 작업하고 *아맞다커밋!* 하는 순간이 꽤 있었다,,,)

### 최대한 간단하게 하려고 했다.

이번 과제를 가벼운 프로젝트로 만들고 싶었다. api 요청에는 axios 대신 별도의 설치가 필요 없는 fetch를 사용했고, 라이브러리 사용을 줄이려고 했다. 또한 pages 폴더 안에 대부분의 코드를 작성했다. components 폴더에는 Header만 따로 빼 두었다. 뒤에 나올 아쉬운 점에도 언급하겠지만, 이 부분이 이번 과제의 최대 실수였던 것 같다.

## 😵 아쉬운 점

### 컴포넌트 분리 및 상태관리

재사용 가능한 컴포넌트를 분리하지 않았기 때문에, 한 파일 내 코드 길이가 너무 길어졌다. 파일이 여러 개로 분리되지 않아서 상태관리에 어려움을 비교적 덜 느꼈다. 따라서 context API를 사용하지 않았다. 컴포넌트 분리를 더 효율적으로 했다면 상태관리에 대한 고민도 더 커졌을 것 같다. 컴포넌트를 분리하고, 컴포넌트 간 현재 로그인된 상태인지를 나타내는 상태를 context API로 공유했다면 하는 아쉬움이 남는다.
특히 로그인/회원가입의 경우 폼의 형태와 인풋 등 모든 레이아웃이 동일했는데, 단순히 스타일 코드 파일을 공유하는 데 그쳤다. 각 input과 버튼들을 컴포넌트화 했다면 더 좋은 코드가 되었을 것이다.
