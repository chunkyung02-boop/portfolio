// ★ 내용 수정은 이 파일만 고치면 됩니다 (메뉴 미리보기 + 상세 페이지에 자동 반영)
const PROFILE = {
  name: "전경민",
  role: "AI Service Developer",
  nameEn: "Gyeongmin Jeon",
  introEn: "Aspiring AI engineer building services<br>with Python, deep learning and AI agents.",
  intro: "파이썬과 딥러닝으로 문제를 풀고, AI Agent로 서비스를 만드는 것을 목표로 공부하고 있습니다.",
  aurora: ["#5b7cf0", "#a18cf0", "#f29ac0", "#f7b08a", "#f08c5a"],   // 홈 배경 색 (왼→오른쪽 순서) — 반대색(파랑↔주황)이 바로 붙지 않게 사이에 다리 색을 넣음
  // 홈 화면 (더미)
  headline: "From Data<br>to Deployed<br>AI Services",   // <br> 마다 한 줄, 줄마다 계단식으로 들여쓰기
  stats: [
    ["3", "End-to-end AI projects"],
  ],
  buttons: [
    ["Resume", "resume.pdf"],
    ["GitHub", "https://github.com/chunkyung02-boop"],
    ["Email", "mailto:chunkyung02@gmail.com"],
  ],
  email: "chunkyung02@gmail.com",
  github: "https://github.com/chunkyung02-boop",
  blog: "https://chunkyung02-boop.github.io/dev-archive/",   // 홈 하단 띠의 Blog 링크 (Dev Archive)
};

const DATA = {
  portfolio: {
    label: "Portfolio",
    aurora: ["#e97aa6", "#f59a95", "#f7b07e", "#f3cf6e"],
    eyebrow: "From Problem to Deployed MVP",
    desc: "튜토리얼을 따라 한 학습 과제가 아닙니다.<br>문제 정의부터 모델링, 실제 사용 가능한 MVP 구현과 배포까지 직접 완주한 AI 프로젝트입니다.",
    // thumb: 포스터 이미지 (프로젝트 대표 화면 캡처로 교체 추천, 세로 2:3 비율이 가장 예쁨)
    // 출처: claud_project/Project/프로젝트 라이브러리 데이터.js · 01.NOLDA/nolda/README.md
    items: [
      {
        id: "nolda",
        title: "NOLDA 놀다",
        thumb: "images/nolda_app.png",        // 앱 홈 화면 (frontend/dist 로컬 실행 캡처)
        period: "2026.08 – 09.19 · 팀 프로젝트",
        tags: ["FastAPI", "React", "GPT-5 mini", "Supabase", "Vercel · Render"],
        summary: "사진·유튜브 기록으로 취향을 읽고, 고른 시간에 딱 맞는 마포구 여가 코스를 AI가 짜 주는 웹앱",
        problemLine: "뭘 할지 고르는 데 오래 걸리고, 조건을 매번 직접 골라야 하는 추천 앱만 있음",   // 목록용 문제 정의 1줄
        solveLine: "취향 가중치를 코드로 직접 계산(사진 0.6 : 유튜브 0.4)하고, TMAP 실제 도보 경로로 코스 4개 생성",   // 목록용 문제 해결 1줄
        // 썸네일에 마우스를 올리면 보이는 시각화 — bar(%) · compare(전→후) · split(비율) · num(큰 숫자)
        viz: [
          { type: "split", label: "취향 가중치", a: 0.6, b: 0.4, aLabel: "사진", bLabel: "유튜브" },
          { type: "num", value: "4개", label: "AI 추천 코스" },
          { type: "num", value: "10~15초", label: "코스 생성 시간" },
        ],
        details: [
          "사진 : 유튜브 취향을 0.6 : 0.4로 합산 — 근거가 적으면 그만큼 깎기",
          "GPT-5 mini로 실제 장소 후보 안에서 코스 4개 생성 (약 10~15초)",
          "네이버 지도 핀 + TMAP 실제 도보 경로",
          "카카오·구글 로그인 30일 유지 · Vercel + Render 배포",
        ],
        detail: {
          team: "3명",
          role: "프론트엔드 · 취향 분석 연동",
          problem: "여가를 즐기고 싶어도 무엇을 할지 고르는 데 시간이 오래 걸립니다. 조건을 매번 직접 고르는 기존 서비스 대신, 내 기록을 AI가 읽고 알아서 코스를 짜 주면 어떨까에서 시작했습니다.",
          stories: [
            { title: "조건을 매번 클릭하는 방식은 차별점이 없다", problem: "필터를 고르는 추천 앱은 이미 많음", think: "사용자가 입력하지 않아도 취향을 알 방법은?", solve: "사진 · 유튜브 기록을 AI가 분석해 취향을 추정", result: "서비스 방향 확정 — ‘알아서 추천’" },
            { title: "유튜브 기록으로 취향을 알 수 있을까?", problem: "프롬프트에 ‘6:4’라고 적기만 하니 사진 2장이 유튜브 200개를 이김", think: "비율을 AI에게 맡기지 말고 직접 계산해야 하나?", solve: "근거 수만큼 가중치를 깎아 코드로 합산", result: "사진 0.6 : 유튜브 0.4가 의도대로 반영" },
            { title: "직선거리 말고 실제로 걷는 길로", problem: "지도에 직선으로 이어져 실제 이동 시간과 다름", think: "도보 경로 API를 쓰면 비용 · 속도는?", solve: "TMAP 보행자 경로를 구간별로 실시간 조회", result: "코스마다 실제 도보 거리 · 시간 표시" },
          ],
          results: [["4개", "AI 추천 코스 (약 10~15초)"], ["10개", "마포구 실제 장소 기본 코스"], ["30일", "로그인 유지 (카카오 · 구글)"]],
          arch: "",
          links: [["배포된 앱", "https://frontend-sigma-one-39.vercel.app/"], ["GitHub", "https://github.com/nolda-app/nolda"], ["최종 발표", ""]],
        },
        link: "",   // Vercel 배포 주소가 현재 404 (DEPLOYMENT_NOT_FOUND) — 재배포 후 주소 넣기
      },
      {
        id: "tiniping",
        title: "티니핑 판별기",
        thumb: "images/tiniping_deck.jpg",    // 최종 발표 HTML 첫 장
        thumbPos: "95% center",                // 정사각형으로 자를 때 오른쪽(제목 글씨) 쪽을 보여줌
        period: "2026.09.09 – 09.30 · 팀 프로젝트",
        tags: ["SigLIP 2", "LDA · kNN", "FastAPI", "Docker", "Supabase"],
        summary: "사진 한 장으로 티니핑 68종의 이름을 찾아 주는 서비스 — 확실할 때만 답합니다",
        problemLine: "155종이 넘는 티니핑, 이름을 모르면 검색조차 할 수 없음",   // 목록용 문제 정의 1줄
        solveLine: "SigLIP 2 미세조정 + 확실할 때만 답하는 구조로 68종 정확도 98.8%",   // 목록용 문제 해결 1줄
        viz: [
          { type: "bar", label: "68종 정확도", value: 98.8 },
          { type: "bar", label: "확실할 때만 답한 정확도", value: 99.84 },
          { type: "compare", label: "사진 1장 수집 시간", from: 30, to: 0.6, unit: "초" },
        ],
        details: [
          "68종 정확도 98.8% · 바로 답한 93%의 정확도 99.84%",
          "수집 툴 직접 제작 — 사진 1장 30초 → 0.6초",
          "서버 4개 도커화 (docker compose 한 줄) · 서버 처리 37ms",
          "사용자 피드백으로 캐글 GPU 자동 재학습 한 바퀴 21분",
        ],
        detail: {
          team: "2명 (장준 · 전경민)",
          role: "데이터 수집 툴 · 모델 학습 · 서버 · 대시보드",
          problem: "티니핑은 155종이 넘어 아이가 가진 장난감의 이름조차 모르는 경우가 많습니다. 지식iN · 카페 · 블로그의 ‘이름이 뭐예요?’ 질문 877건을 모아 보니, 티니핑의 질문 비율은 포켓몬의 2배였습니다. 이름을 모르면 검색조차 할 수 없다는 것이 출발점입니다.",
          stories: [
            { title: "캡처하고 저장하는 과정이 너무 번거롭다", problem: "사진 1장 모으는 데 30초", think: "팀원도 쓸 수 있는 자동화 툴을 만들 수 있을까?", solve: "수집 방식 5번 개선 — 캡처 툴 → 유튜브 자동 수집 → 검색 API", result: "1장당 30초 → 0.6초" },
            { title: "모델은 무엇을 기준으로 고를까?", problem: "애니 · 장난감 · 굿즈로 그림체가 제각각", think: "그림체가 바뀌어도 버티는 모델은?", solve: "CLIP · SigLIP 등 논문 4편 비교 → SigLIP 2 미세조정", result: "68종 정확도 98.8%" },
            { title: "정답을 언제 말해야 할까?", problem: "헷갈리는 사진에도 자신 있게 오답을 냄", think: "틀릴 바엔 후보를 보여 주는 게 낫지 않을까?", solve: "DL 확신도 0.6 이상 + ML 의견 일치일 때만 바로 답", result: "바로 답한 93%의 정확도 99.84%" },
          ],
          results: [["98.8%", "68종 정확도 (시험 1,360장)"], ["99.84%", "바로 답할 때 정확도 (사진의 93%)"], ["21분", "자동 재학습 한 바퀴"], ["37ms", "서버 처리 시간 (느린 5%도 122ms)"]],
          arch: "",
          links: [["시연 영상", ""], ["최종 발표", ""], ["GitHub", ""]],
        },
        link: "",
      },
      {
        id: "supra",
        title: "SUPRA",
        thumb: "images/supra.svg",
        period: "2026.09 – 진행 중 · 개인 프로젝트",
        tags: ["Next.js", "Supabase", "OpenAI", "임베딩 검색"],
        summary: "일하는 과정을 기록해 두면, 비슷한 과거 업무를 찾아 AI가 답해 주는 업무 파트너",
        problemLine: "결과물은 남지만 왜 그렇게 결정했는지, 일한 과정은 사라짐",   // 목록용 문제 정의 1줄
        solveLine: "업무 맥락을 임베딩으로 저장하고, 비슷한 과거 업무 5개를 찾아 AI가 답변",   // 목록용 문제 해결 1줄
        viz: [
          { type: "num", value: "9개", label: "기획 완료 항목" },
          { type: "num", value: "Top 5", label: "비슷한 과거 업무 검색" },
          { type: "num", value: "1,536", label: "임베딩 차원" },
        ],
        details: [
          "업무 기록(맥락 · 결정 · 결과)을 Supabase에 임베딩과 함께 저장",
          "text-embedding-3-small로 비슷한 과거 업무 5개 검색",
          "찾은 기록을 근거로 AI 답변 · 인수인계 글 생성",
        ],
        detail: {
          team: "1명 (개인)",
          role: "기획 · 개발 전체",
          problem: "결과물은 남는데, 왜 그렇게 결정했는지 같은 일하는 과정은 사라집니다. 사람이 바뀌거나 시간이 지나면 같은 고민을 처음부터 다시 하게 됩니다.",
          stories: [
            { title: "결과물은 남는데 과정은 사라진다", problem: "업무 맥락이 기록되지 않음", think: "AI가 과정을 기억하게 하려면 어떤 흐름이 필요할까?", solve: "Observe → Understand → Remember → Assist → Challenge → Transfer 흐름 설계", result: "MVP 기획안 완성 (9개 항목)" },
            { title: "처음부터 모든 도구를 관찰할 수는 없다", problem: "기능 범위가 너무 넓음", think: "가장 먼저 증명할 가치는?", solve: "성공 기준 6개로 ‘업무 맥락 기억 · 재활용’부터 검증", result: "MVP 범위 확정" },
          ],
          results: [["9개", "기획 완료 항목"], ["5개", "비슷한 과거 업무 검색"], ["9/5", "첫 프로토타입"]],
          arch: "",
          links: [["MVP 기획안", ""]],
        },
        link: "",
      },
    ],
  },

  experience: {
    label: "Experience",
    eyebrow: "06 Groups · AI 개발자 양성 과정",
    aurora: ["#a9cf6a", "#4fb89a", "#58b6dc", "#7d9ff0"],
    desc: "AI 개발자 양성 과정에서 배우고 프로젝트에 써 본 것들",
    // 그룹(카테고리)마다 한 줄씩. lines 에 문장만 추가하면 됩니다
    items: [
      {
        id: "data-analysis",
        title: "데이터 분석",
        period: "2026.07 – 08",
        lines: [
          "NumPy · Pandas로 결측치 · 이상치 정제와 집계",
          "따릉이 데이터 분석 · 확증적 데이터 분석(CDA)",
          "텍스트 분석 — 키워드 · 장바구니 · LDA 토픽 · 벡터화",
          "데이터 수집 — OpenAPI · BeautifulSoup · Selenium",
          "청년 여가소비 분석 팀 프로젝트 → NOLDA의 출발점",
        ],
      },
      {
        id: "ml",
        title: "머신러닝",
        period: "2026.08",
        lines: [
          "분류 모델 TOP 3 비교 — Decision Tree · Random Forest · CatBoost",
          "추천 시스템 — SVD (RMSE 0.91)",
          "ML 경진대회 — LightGBM 직접 학습 (9만 줄)",
        ],
      },
      {
        id: "dl",
        title: "딥러닝",
        period: "2026.08 – 09",
        lines: [
          "CNN 기초 — LeNet-5 손글씨 인식 (정확도 98%)",
          "전이학습 — VGG16 · ResNet34 (얼굴 3종 분류)",
          "PyTorch 학습 루프 직접 구현 · TensorBoard 기록",
        ],
      },
      {
        id: "dl-apply",
        title: "딥러닝 활용",
        period: "2026.10",
        lines: [
          "객체 탐지 · 세그멘테이션 — YOLO26n · FastSAM · SAM3",
          "이미지 + 글 — CLIP · SigLIP 2 제로샷 분류 · 검색",
          "MediaPipe 손동작 인식 · OCR(EasyOCR · PaddleOCR) · DeepFace",
          "음성 — Whisper STT · Qwen3-TTS · LLM API 음성 비서",
        ],
      },
      {
        id: "deploy",
        title: "서버 · 배포",
        period: "2026.09",
        lines: [
          "FastAPI로 추론 서버 · WAS 구성 (티니핑)",
          "Docker로 앱 · 추론 · 대시보드 3개 서버 포장",
          "Vercel(프론트) + Render(백엔드) 배포 (NOLDA)",
          "Supabase DB · 권한 규칙(RLS) · 스토리지",
          "캐글 무료 GPU로 자동 재학습 파이프라인",
        ],
      },
      {
        id: "collab",
        title: "협업",
        period: "2026.09",
        lines: [
          "Git 브랜치 · PR로 팀 저장소 협업 (NOLDA)",
          "팀원과 수집 툴 · 설명서 공유 (티니핑)",
          "중간 · 최종 발표 피드백 반영",
        ],
      },
    ],
  },

  models: {
    label: "Model Cards",
    eyebrow: "31 Models · 4 Fields",
    aurora: ["#5aa6e8", "#6f7ef0", "#9a72e8", "#d585d8"],
    desc: "직접 학습하거나 서비스에 붙여 써 본 모델 31종을 분야별로 정리했습니다",
    groupOrder: ["Vision", "LLM", "Audio", "ML"],
    visualGroups: ["Vision", "LLM", "Audio", "ML"],   // 이미지 타일로 보여 줄 분야 (빼면 글자 목록)
    // 06.model-dex/모델 도감 데이터.js 에서 가져옴 (직접 학습 → 가져다 씀 → 수업 실습 순)
    // dex = 그림·사진 찾는 이름 (model-art.js · model-photo.js) · key = 카드에 크게 보일 숫자 2개
    items: [
      {
        "id": "m-lightgbm",
        "group": "ML",
        "title": "LightGBM",
        "period": "직접 학습",
        "tags": [
          "표 데이터"
        ],
        "summary": "가볍고 빠른 부스팅",
        "card": {
          "설명": "CatBoost와 같은 부스팅 계열인데 더 가볍고 빠르다. 대회에서 '예/아니오' 맞히기에 썼다.",
          "사용처": "ML 경진대회 (python/ml_competition)",
          "핵심 수치": "학습 9만 줄 · 정답 비율 10.7%",
          "한계": "정답이 10%뿐이라 '정확도'로 보면 속는다. 그래서 AUC로 평가했다."
        },
        "dex": "lightgbm",
        "key": [
          [
            "학습",
            "9만 줄"
          ],
          [
            "정답 비율",
            "10.7%"
          ]
        ]
      },
      {
        "id": "m-resnet34",
        "group": "Vision",
        "title": "ResNet34",
        "period": "직접 학습",
        "tags": [
          "이미지 분류"
        ],
        "summary": "지름길로 깊게 쌓은 분류기",
        "card": {
          "설명": "내 사진 폴더로 3종류 얼굴을 구분하게 가르치고, FastAPI 서버로 만들어 결과를 Supabase에 저장했다.",
          "사용처": "딥러닝 수업 · 실습 얼굴분류 / 추론 서버",
          "핵심 수치": "클래스 3종 · 학습 20 에폭",
          "한계": "학습한 3종 밖의 얼굴도 억지로 셋 중 하나로 답한다."
        },
        "dex": "resnet34",
        "key": [
          [
            "클래스",
            "3종"
          ],
          [
            "학습",
            "20 에폭"
          ]
        ]
      },
      {
        "id": "m-siglip2-tiniping",
        "group": "Vision",
        "title": "티니핑 판별기",
        "period": "직접 학습",
        "tags": [
          "이미지 분류"
        ],
        "summary": "사진 한 장으로 이름 맞히기",
        "card": {
          "설명": "구글이 만든 '사진 이해 모델'에 티니핑 사진을 보여 주며 68종 이름을 가르쳤다.",
          "사용처": "티니핑 판별기 · 추론 서버 (서비스 중 v004)",
          "핵심 수치": "정확도 98.8% · 서버 처리 37ms",
          "한계": "장난감 · 흔들린 사진에 약하다. 안 배운 캐릭터는 모른다."
        },
        "dex": "siglip2-tiniping",
        "key": [
          [
            "정확도",
            "98.8%"
          ],
          [
            "응답",
            "37ms"
          ]
        ]
      },
      {
        "id": "m-lda-knn",
        "group": "ML",
        "title": "LDA → NCA + kNN",
        "period": "직접 학습",
        "tags": [
          "추천",
          "표 데이터"
        ],
        "summary": "가까운 5장이 투표한다",
        "card": {
          "설명": "판별기가 뽑은 특징 768개를 64개로 줄여 캐릭터끼리 잘 갈리게 한 뒤, 가장 가까운 사진 5장이 투표한다.",
          "사용처": "티니핑 판별기 · 닮은 티니핑 추천 · 답 2차 확인",
          "핵심 수치": "정확도 97.76% · 차원 768→64",
          "한계": "새 캐릭터에는 효과가 없다."
        },
        "dex": "lda-knn",
        "key": [
          [
            "정확도",
            "97.76%"
          ],
          [
            "차원",
            "768→64"
          ]
        ]
      },
      {
        "id": "m-yolo26n-catdog",
        "group": "Vision",
        "title": "내 개 · 고양이 탐지기",
        "period": "직접 학습",
        "tags": [
          "객체 탐지"
        ],
        "summary": "개·고양이만 찾는 내 탐지기",
        "card": {
          "설명": "YOLO26n에 내가 직접 상자를 그린 사진을 보여 주며 개와 고양이만 찾도록 다시 가르쳤다.",
          "사용처": "딥러닝 활용 수업 · 01_Object_Detection",
          "핵심 수치": "mAP50 0.544 · 신뢰도 0.71",
          "한계": "사진이 14장뿐이라 절반쯤 놓친다 (재현율 0.47). 검증도 4장이라 점수 자체를 믿기 어렵다."
        },
        "dex": "yolo26n-catdog",
        "key": [
          [
            "mAP50",
            "0.544"
          ],
          [
            "신뢰도",
            "0.71"
          ]
        ]
      },
      {
        "id": "m-embedding-3-small",
        "group": "LLM",
        "title": "text-embedding-3-small",
        "period": "가져다 씀",
        "tags": [
          "임베딩"
        ],
        "summary": "글을 좌표로 바꾼다",
        "card": {
          "설명": "글을 숫자 좌표로 바꿔 준다. 뜻이 비슷한 글은 좌표도 가깝다.",
          "사용처": "SUPRA · 비슷한 과거 업무 찾기",
          "핵심 수치": "차원 1,536 · 검색 Top 5",
          "한계": "유료 API. 글이 바깥(OpenAI)으로 나간다."
        },
        "dex": "embedding-3-small",
        "key": [
          [
            "차원",
            "1,536"
          ],
          [
            "검색",
            "Top 5"
          ]
        ]
      },
      {
        "id": "m-gpt-5-6-luna",
        "group": "LLM",
        "title": "GPT-5.6 Luna",
        "period": "가져다 씀",
        "tags": [
          "LLM"
        ],
        "summary": "기록을 읽고 답을 쓴다",
        "card": {
          "설명": "찾아낸 과거 업무 기록을 읽고, 그걸 근거로 답변과 인수인계 글을 써 준다.",
          "사용처": "SUPRA · AI 답변 · 인수인계 글",
          "핵심 수치": "역할 답변 생성 · 짝꿍 임베딩",
          "한계": "유료 API. 근거 기록이 부실하면 답도 부실하다."
        },
        "dex": "gpt-5-6-luna",
        "key": [
          [
            "역할",
            "답변 생성"
          ],
          [
            "짝꿍",
            "임베딩"
          ]
        ]
      },
      {
        "id": "m-gpt-5-mini",
        "group": "LLM",
        "title": "GPT-5 mini",
        "period": "가져다 씀",
        "tags": [
          "LLM"
        ],
        "summary": "후보 안에서 코스를 짠다",
        "card": {
          "설명": "마포구 실제 장소 후보 안에서만 골라 놀거리 코스를 짜 준다.",
          "사용처": "NOLDA · AI 코스 추천 · 취향 분석",
          "핵심 수치": "응답 14.5초 · 추론 minimal",
          "한계": "풀어 두면 없는 장소를 지어낸다. 생각을 많이 시키면 느려진다."
        },
        "dex": "gpt-5-mini",
        "key": [
          [
            "응답",
            "14.5초"
          ],
          [
            "추론",
            "minimal"
          ]
        ]
      },
      {
        "id": "m-gemini-flash-lite",
        "group": "LLM",
        "title": "Gemini 3.5 Flash-Lite",
        "period": "가져다 씀",
        "tags": [
          "LLM"
        ],
        "summary": "상품에 태그를 붙인다",
        "card": {
          "설명": "쇼핑몰 상품 설명을 읽고 어떤 티니핑 상품인지 태그를 붙여 준다.",
          "사용처": "티니핑 판별기 · 상품 추천 태그",
          "핵심 수치": "비용 무료 · 예비 2개",
          "한계": "사용량이 몰리면 503 오류가 난다. 그래서 예비 모델로 차례로 넘어가게 했다."
        },
        "dex": "gemini-flash-lite",
        "key": [
          [
            "비용",
            "무료"
          ],
          [
            "예비",
            "2개"
          ]
        ]
      },
      {
        "id": "m-yolo26n",
        "group": "Vision",
        "title": "YOLO26n",
        "period": "가져다 씀",
        "tags": [
          "객체 탐지"
        ],
        "summary": "사진 속 물건을 상자로 찾는다",
        "card": {
          "설명": "사진 한 장에서 물건이 '무엇'이고 '어디에' 있는지 네모 상자로 한 번에 찾아 준다.",
          "사용처": "딥러닝 활용 수업 · 01_Object_Detection",
          "핵심 수치": "속도 61ms · 신뢰도 0.89",
          "한계": "배운 80종만 안다. 겹친 사람은 신뢰도가 0.28까지 떨어졌다."
        },
        "dex": "yolo26n",
        "key": [
          [
            "속도",
            "61ms"
          ],
          [
            "신뢰도",
            "0.89"
          ]
        ]
      },
      {
        "id": "m-yolo26n-seg",
        "group": "Vision",
        "title": "YOLO26n-seg",
        "period": "가져다 씀",
        "tags": [
          "객체 탐지",
          "세그멘테이션"
        ],
        "summary": "물건을 모양대로 오려 낸다",
        "card": {
          "설명": "YOLO가 네모 상자만 그리던 걸, 물건의 실제 모양(윤곽)대로 오려 주는 버전.",
          "사용처": "딥러닝 활용 수업 · 02_Segmentation",
          "핵심 수치": "속도 31.8ms · 찾은 것 6개",
          "한계": "80종에 없는 물건은 모른다"
        },
        "dex": "yolo26n-seg",
        "key": [
          [
            "속도",
            "31.8ms"
          ],
          [
            "찾은 것",
            "6개"
          ]
        ]
      },
      {
        "id": "m-fastsam-s",
        "group": "Vision",
        "title": "FastSAM-s",
        "period": "가져다 씀",
        "tags": [
          "세그멘테이션"
        ],
        "summary": "종류 상관없이 다 오려 낸다",
        "card": {
          "설명": "종류를 미리 몰라도 사진 속 모든 물건을 일단 다 오려 내고, 글로 \"사람\"이라고 말하면 그것만 골라 준다.",
          "사용처": "딥러닝 활용 수업 · 02_Segmentation",
          "핵심 수치": "속도 85.8ms · 찾은 것 29개",
          "한계": "이름은 알려 주지 않는다 (전부 'object')"
        },
        "dex": "fastsam-s",
        "key": [
          [
            "속도",
            "85.8ms"
          ],
          [
            "찾은 것",
            "29개"
          ]
        ]
      },
      {
        "id": "m-sam3",
        "group": "Vision",
        "title": "SAM3",
        "period": "가져다 씀",
        "tags": [
          "세그멘테이션"
        ],
        "summary": "글로 말하면 그것만 오려 낸다",
        "card": {
          "설명": "\"a person\"처럼 글로 말하면, 사진에서 그 물건을 전부 찾아 모양대로 오려 준다.",
          "사용처": "딥러닝 활용 수업 · 02_Segmentation",
          "핵심 수치": "속도 616ms (GPU) · 찾은 것 6개",
          "한계": "토큰 발급과 사용 동의 절차가 필요하다"
        },
        "dex": "sam3",
        "key": [
          [
            "속도",
            "616ms (GPU)"
          ],
          [
            "찾은 것",
            "6개"
          ]
        ]
      },
      {
        "id": "m-clip",
        "group": "Vision",
        "title": "CLIP",
        "period": "가져다 씀",
        "tags": [
          "이미지 분류",
          "이미지 검색"
        ],
        "summary": "학습 없이 글로 분류·검색 (softmax)",
        "card": {
          "설명": "사진과 글을 같은 공간에 놓고 비교해서, 학습 없이도 글로 분류하거나 글로 사진을 찾아 준다.",
          "사용처": "딥러닝 활용 수업 · 03_CLIP",
          "핵심 수치": "분류 확률 0.52 (sitting) · 검색 유사도 0.28",
          "한계": "softmax라 '모르겠다'를 표현하지 못하고 항상 하나를 고른다"
        },
        "dex": "clip",
        "key": [
          [
            "분류 확률",
            "0.52 (sitting)"
          ],
          [
            "검색 유사도",
            "0.28"
          ]
        ]
      },
      {
        "id": "m-siglip2-zeroshot",
        "group": "Vision",
        "title": "SigLip2 (기본 모델)",
        "period": "가져다 씀",
        "tags": [
          "이미지 분류",
          "이미지 검색"
        ],
        "summary": "학습 없이 글로 분류·검색 (sigmoid)",
        "card": {
          "설명": "구글의 사진-글 짝 맞추기 모델을 파인튜닝 없이 그대로 써서, 글로 분류하거나 글로 사진을 찾아 준다.",
          "사용처": "딥러닝 활용 수업 · 03_1.SigLip",
          "핵심 수치": "검색 유사도 0.12 · 분류 sigmoid",
          "한계": "CLIP과 텍스트 입력 옵션이 달라 혼동하기 쉽다 (padding 방식)"
        },
        "dex": "siglip2-zeroshot",
        "key": [
          [
            "검색 유사도",
            "0.12"
          ],
          [
            "분류",
            "sigmoid"
          ]
        ]
      },
      {
        "id": "m-mediapipe-hand",
        "group": "Vision",
        "title": "MediaPipe Hand Landmarker",
        "period": "가져다 씀",
        "tags": [
          "손 좌표 감지"
        ],
        "summary": "손 관절 21점 좌표를 실시간으로 찾는다",
        "card": {
          "설명": "웹캠 속 손에서 관절 21곳의 위치를 점으로 찍어 주는 구글의 무료 모델.",
          "사용처": "딥러닝 활용 수업 · 04 MediaPipe 손동작 인식",
          "핵심 수치": "좌표 수 21개 (63 숫자) · 분류 정확도 1.00 (n=21)",
          "한계": "타임스탬프가 거꾸로 가면 오류가 난다 (LIVE_STREAM)"
        },
        "dex": "mediapipe-hand",
        "key": [
          [
            "좌표 수",
            "21개 (63 숫자)"
          ],
          [
            "분류 정확도",
            "1.00 (n=21)"
          ]
        ]
      },
      {
        "id": "m-easyocr",
        "group": "Vision",
        "title": "EasyOCR",
        "period": "가져다 씀",
        "tags": [
          "OCR (텍스트 추출)"
        ],
        "summary": "사진 속 글자를 찾아 읽지만 기울어지면 잘 못 읽는다",
        "card": {
          "설명": "사진 속 글자를 찾아서 읽어주는 모델. 한국어·영어 같은 여러 언어를 섞어 읽을 수 있다.",
          "사용처": "딥러닝 활용 수업 · 05 OCR 실습 1·2",
          "핵심 수치": "인식 영역 idcard 13개 · wifi(회전) 9개 · 최고 신뢰도 0.99 (idcard 제목)",
          "한계": "이미지가 기울어지거나 회전하면 신뢰도가 급격히 떨어진다(실측)"
        },
        "dex": "easyocr",
        "key": [
          [
            "인식 영역",
            "idcard 13개 · wifi(회전) 9개"
          ],
          [
            "최고 신뢰도",
            "0.99 (idcard 제목)"
          ]
        ]
      },
      {
        "id": "m-paddleocr-ppocrv5",
        "group": "Vision",
        "title": "PaddleOCR (PP-OCRv5)",
        "period": "가져다 씀",
        "tags": [
          "OCR (텍스트 추출)",
          "문서 구조 분석"
        ],
        "summary": "회전을 스스로 보정하고 PDF를 문서 구조까지 분석하는 OCR",
        "card": {
          "설명": "바이두가 만든 OCR 도구. 사진이 기울어져도 방향을 스스로 맞추고 글자를 읽는다. PP-StructureV3 기능을 쓰면 PDF를 제목·본문·표 단위로 나눠 markdown까지 만들어 준다.",
          "사용처": "딥러닝 활용 수업 · 05 OCR 실습 2·3",
          "핵심 수치": "기울어진 사진 신뢰도 0.99대 (EasyOCR 0.01~0.3) · PDF 처리 2쪽 → 블록 자동 분리",
          "한계": "설치가 복잡하다 — pyproject.toml에 전용 index-url(paddle 저장소) 지정 필요"
        },
        "dex": "paddleocr-ppocrv5",
        "key": [
          [
            "기울어진 사진 신뢰도",
            "0.99대 (EasyOCR 0.01~0.3)"
          ],
          [
            "PDF 처리",
            "2쪽 → 블록 자동 분리"
          ]
        ]
      },
      {
        "id": "m-deepface-arcface",
        "group": "Vision",
        "title": "DeepFace (RetinaFace + ArcFace)",
        "period": "가져다 씀",
        "tags": [
          "얼굴 인식",
          "얼굴 검증"
        ],
        "summary": "얼굴을 숫자로 바꿔 같은 사람인지 가린다",
        "card": {
          "설명": "사진에서 얼굴을 찾고(RetinaFace), 얼굴을 숫자로 바꿔 비교해(ArcFace) 같은 사람인지 알려주는 도구. 사진 한 장으로 얼굴 폴더에서 같은 사람을 찾을 수도 있다.",
          "사용처": "딥러닝 활용 수업 · 06 Deepface 실습",
          "핵심 수치": "동일인물 판별 distance 0.568 < 0.68 · DB 검색 15장 → 5장, 1.02초",
          "한계": "처음 실행 때 가중치 파일을 다운로드해 느리다"
        },
        "dex": "deepface-arcface",
        "key": [
          [
            "동일인물 판별",
            "distance 0.568 < 0.68"
          ],
          [
            "DB 검색",
            "15장 → 5장, 1.02초"
          ]
        ]
      },
      {
        "id": "m-whisper-small",
        "group": "Audio",
        "title": "Whisper small",
        "period": "가져다 씀",
        "tags": [
          "음성 인식(STT)"
        ],
        "summary": "목소리를 글자로 받아 적는 로컬 모델",
        "card": {
          "설명": "녹음된 목소리를 듣고 글자로 받아 적어 주는 모델. 내 컴퓨터에서 돌려서 API 요금이 들지 않는다.",
          "사용처": "딥러닝 활용 수업 · 07 STT/TTS 실습",
          "핵심 수치": "모델 small · 실행 로컬 (요금 없음)",
          "한계": "이번 짧은 녹음에선 다른 STT들과 서로 다른 문장이 나옴"
        },
        "dex": "whisper-small",
        "key": [
          [
            "모델",
            "small"
          ],
          [
            "실행",
            "로컬 (요금 없음)"
          ]
        ]
      },
      {
        "id": "m-faster-whisper-large-v3",
        "group": "Audio",
        "title": "Faster-Whisper large-v3",
        "period": "가져다 씀",
        "tags": [
          "음성 인식(STT)"
        ],
        "summary": "시간표까지 붙여 받아 적는 빠른 Whisper",
        "card": {
          "설명": "Whisper를 더 빠르고 가볍게 돌리도록 다시 만든 버전. 말이 몇 초~몇 초에 나왔는지 시간표까지 알려준다.",
          "사용처": "딥러닝 활용 수업 · 07 STT/TTS 실습",
          "핵심 수치": "언어 감지 ko 0.36 · 정밀도 float16",
          "한계": "이번 녹음은 1초로 짧아 언어 감지 확률이 0.36으로 낮았다"
        },
        "dex": "faster-whisper-large-v3",
        "key": [
          [
            "언어 감지",
            "ko 0.36"
          ],
          [
            "정밀도",
            "float16"
          ]
        ]
      },
      {
        "id": "m-gpt-4o-mini-transcribe",
        "group": "Audio",
        "title": "gpt-4o-mini-transcribe",
        "period": "가져다 씀",
        "tags": [
          "음성 인식(STT)"
        ],
        "summary": "음성을 보내면 글자로 돌려주는 API",
        "card": {
          "설명": "음성 파일을 OpenAI 서버에 보내면 글자로 바꿔서 돌려주는 API.",
          "사용처": "딥러닝 활용 수업 · 07 STT/TTS 실습",
          "핵심 수치": "방식 클라우드 API · 언어 ko 지정",
          "한계": "사용량만큼 요금이 든다 (일반 원리)"
        },
        "dex": "gpt-4o-mini-transcribe",
        "key": [
          [
            "방식",
            "클라우드 API"
          ],
          [
            "언어",
            "ko 지정"
          ]
        ]
      },
      {
        "id": "m-gpt-4o-mini-tts",
        "group": "Audio",
        "title": "gpt-4o-mini-tts",
        "period": "가져다 씀",
        "tags": [
          "음성 합성(TTS)"
        ],
        "summary": "글자를 원하는 말투의 목소리로 읽어준다",
        "card": {
          "설명": "글자를 넣으면 사람 목소리로 읽어 주는 API. 목소리 종류(voice)와 말투 지시(instructions)·속도(speed)를 바꿀 수 있다.",
          "사용처": "딥러닝 활용 수업 · 07 STT/TTS 실습",
          "핵심 수치": "목소리 alloy · 속도 1.8배",
          "한계": "요금이 든다 (일반 원리)"
        },
        "dex": "gpt-4o-mini-tts",
        "key": [
          [
            "목소리",
            "alloy"
          ],
          [
            "속도",
            "1.8배"
          ]
        ]
      },
      {
        "id": "m-qwen3-tts-1.7b",
        "group": "Audio",
        "title": "Qwen3-TTS 12Hz 1.7B",
        "period": "가져다 씀",
        "tags": [
          "음성 합성(TTS)",
          "목소리 복제"
        ],
        "summary": "내 GPU에서 목소리를 고르고·만들고·따라 한다",
        "card": {
          "설명": "내 컴퓨터 GPU에서 돌리는 목소리 만들기 모델. 정해진 성우 목소리로 읽기, 글로 설명한 목소리 만들기, 녹음 하나로 목소리 따라 하기 3가지가 있다.",
          "사용처": "딥러닝 활용 수업 · 07 STT/TTS 실습",
          "핵심 수치": "크기 1.7B · 모드 3가지",
          "한계": "GPU 필요, 1.7B라 무겁다"
        },
        "dex": "qwen3-tts-1.7b",
        "key": [
          [
            "크기",
            "1.7B"
          ],
          [
            "모드",
            "3가지"
          ]
        ]
      },
      {
        "id": "m-gpt-5-4-nano",
        "group": "LLM",
        "title": "GPT-5.4 nano",
        "period": "가져다 씀",
        "tags": [
          "대화(LLM)"
        ],
        "summary": "음성 비서의 대답을 만드는 작은 GPT",
        "card": {
          "설명": "말을 걸면 답을 써 주는 작은 GPT. 인공지능 스피커에서 STT로 받은 글에 답하고, 그 답을 TTS가 읽는다.",
          "사용처": "딥러닝 활용 수업 · 07 STT/TTS 실습",
          "핵심 수치": "모델 gpt-5.4-nano · API Responses",
          "한계": "요금 발생 (일반 원리)"
        },
        "dex": "gpt-5-4-nano",
        "key": [
          [
            "모델",
            "gpt-5.4-nano"
          ],
          [
            "API",
            "Responses"
          ]
        ]
      },
      {
        "id": "m-decision-tree",
        "group": "ML",
        "title": "Decision Tree",
        "period": "수업 실습",
        "tags": [
          "표 데이터"
        ],
        "summary": "질문을 따라가며 답을 고른다",
        "card": {
          "설명": "스무고개처럼 '예/아니오' 질문을 차례로 던져서 답을 고르는 모델.",
          "사용처": "머신러닝 수업 · 분류 모델 TOP 3",
          "핵심 수치": "종류 분류·회귀 · 전처리 거의 없음",
          "한계": "나무 한 그루라 정확도가 낮을 수 있고, 깊어지면 학습 데이터만 외운다 (과적합)."
        },
        "dex": "decision-tree",
        "key": [
          [
            "종류",
            "분류·회귀"
          ],
          [
            "전처리",
            "거의 없음"
          ]
        ]
      },
      {
        "id": "m-random-forest",
        "group": "ML",
        "title": "Random Forest",
        "period": "수업 실습",
        "tags": [
          "표 데이터"
        ],
        "summary": "나무 여러 그루의 다수결",
        "card": {
          "설명": "데이터를 조금씩 다르게 뽑아 나무를 여러 그루 키우고, 다수결로 답을 정한다.",
          "사용처": "머신러닝 수업 · 분류 모델 TOP 3",
          "핵심 수치": "방식 배깅 · 튜닝 쉬움",
          "한계": "나무가 많아 느리고, 왜 그 답인지 설명하기 어렵다."
        },
        "dex": "random-forest",
        "key": [
          [
            "방식",
            "배깅"
          ],
          [
            "튜닝",
            "쉬움"
          ]
        ]
      },
      {
        "id": "m-catboost",
        "group": "ML",
        "title": "CatBoost",
        "period": "수업 실습",
        "tags": [
          "표 데이터"
        ],
        "summary": "틀린 문제를 이어서 고친다",
        "card": {
          "설명": "앞 나무가 틀린 문제를 다음 나무가 이어서 고치는 방식. 글자로 된 칸(범주형)을 알아서 처리한다.",
          "사용처": "머신러닝 수업 · 분류 모델 TOP 3",
          "핵심 수치": "방식 부스팅 · 범주형 자동 처리",
          "한계": "학습이 오래 걸리고, 설정을 잘못하면 과적합된다."
        },
        "dex": "catboost",
        "key": [
          [
            "방식",
            "부스팅"
          ],
          [
            "범주형",
            "자동 처리"
          ]
        ]
      },
      {
        "id": "m-svd",
        "group": "ML",
        "title": "SVD",
        "period": "수업 실습",
        "tags": [
          "추천"
        ],
        "summary": "평점표의 빈칸을 채운다",
        "card": {
          "설명": "사람 × 영화 평점표의 빈칸을 채워서 '이 사람이 이 영화에 몇 점 줄까'를 예측한다.",
          "사용처": "머신러닝 수업 · 추천 시스템",
          "핵심 수치": "RMSE 0.91 · 도구 Surprise",
          "한계": "평점 기록이 없는 새 사용자 · 새 영화는 예측하지 못한다."
        },
        "dex": "svd",
        "key": [
          [
            "RMSE",
            "0.91"
          ],
          [
            "도구",
            "Surprise"
          ]
        ]
      },
      {
        "id": "m-lenet5",
        "group": "Vision",
        "title": "LeNet-5",
        "period": "수업 실습",
        "tags": [
          "이미지 분류"
        ],
        "summary": "손글씨 숫자를 읽는 첫 CNN",
        "card": {
          "설명": "손글씨 숫자 사진을 보고 0~9 중 무엇인지 맞히는, 가장 오래된 사진용 신경망.",
          "사용처": "딥러닝 수업 · CNN과 LeNet5",
          "핵심 수치": "정확도 98% · 학습 10 에폭",
          "한계": "작고 단순한 흑백 사진에만 통한다."
        },
        "dex": "lenet5",
        "key": [
          [
            "정확도",
            "98%"
          ],
          [
            "학습",
            "10 에폭"
          ]
        ]
      },
      {
        "id": "m-vgg16",
        "group": "Vision",
        "title": "VGG16",
        "period": "수업 실습",
        "tags": [
          "이미지 분류"
        ],
        "summary": "남의 모델에 마지막 층만 교체",
        "card": {
          "설명": "남이 큰 데이터로 미리 가르친 모델을 가져와서, 마지막 층만 내 문제(10종)에 맞게 바꿔 다시 가르쳤다.",
          "사용처": "딥러닝 수업 · 전이학습",
          "핵심 수치": "클래스 10종 · 파라미터 1.38억",
          "한계": "모델이 크고 무겁다."
        },
        "dex": "vgg16",
        "key": [
          [
            "클래스",
            "10종"
          ],
          [
            "파라미터",
            "1.38억"
          ]
        ]
      }
    ],
  },

  more: {
    label: "+ Alpha",
    eyebrow: "Tools & Etc",
    aurora: ["#f2c95c", "#f59a6a", "#ec7aa4", "#c483e0"],
    desc: "직접 만들어 쓰는 도구와 그 밖의 기록",
    items: [
      {
        id: "tool",
        title: "Tool",
        lines: [
          "수집 툴 (캡처 저장기) — 사진 1장 수집 30초 → 0.6초, 팀원과 공유",
          "프로젝트 라이브러리 — 프로젝트별 자료 · 서버 · 고민 기록을 한 화면에",
          "모델 도감 — 다뤄 본 AI 모델 31종 카드",
          "디자인 템플릿 도감 — 만든 화면에서 뽑은 색 · 글꼴 · CSS",
          "이력서 작업대 — 이력서를 항목별로 쓰고 다듬는 화면",
          "Claude Pet — Claude Code 작업 상태를 보여 주는 데스크톱 펫 (Electron)",
        ],
      },
      {
        id: "etc",
        title: "Etc",
        lines: [
          "LLM으로 발표 자료 만들기 — 5일 · 31 → 53장 · 피드백 5회 · HTML 1파일",
          "Remotion으로 홍보 영상 2종 — 사용자용 · 상세판 (티니핑)",
        ],
      },
    ],
  },
};

// ★ 프로젝트 상세 페이지 목차 — 위에서부터 순서대로 섹션이 생깁니다
//   type: overview(기간·팀·역할·기술) · text(문단) · list(항목) · stats(큰 숫자) · flow(단계 흐름)
//         bars(막대 그래프) · table(비교표) · arch(구조도) · branch(판정 규칙) · stories(고민 사례) · results · links
//   출처: NOLDA README · service-flow.md · 서비스 구성 기획안 · 청년 여가 데이터 분석 발표 / Tiniping 최종 발표 / SUPRA MVP 기획안
const DETAIL = {
  nolda: [
    { label: "Overview", type: "overview" },
    { label: "Background", type: "stats", lead: "청년 여가 데이터 분석 프로젝트에서 출발했습니다. 결론은 ‘청년은 놀고 싶지 않은 게 아니라, 놀 수 있는 조건이 부족하다’였습니다.",
      items: [["467 → 504만원", "39세 이하 가구 월소득 (2023 → 2025)"], ["7만원+", "적정 여가비와 실제 지출 격차 · 3년 연속"], ["운동 · 카페 · 산책", "퇴근 후 여가 키워드 상위 — 저비용 · 근거리"]] },
    { label: "Problem", type: "text", key: "problem" },
    { label: "Service Flow", type: "flow", lead: "질문에 답하지 않아도, 내 기록이 알아서 취향을 말해 주고, 그 코스를 실제로 걸을 수 있게 안내합니다.",
      steps: [["로그인", "카카오 · 구글, 또는 로그인 없이 둘러보기"], ["기록 연결", "유튜브 · 사진첩 중 고르고 카드 꽂기"], ["분석", "기록에서 취향 신호 추출"], ["취향 확인", "분석된 취향을 보고 직접 수정"], ["AI 코스 추천", "시간 · 인원 · 예산에 맞춘 코스 4개"], ["코스 시작", "지도 핀 + 실제 도보 경로"], ["길안내 · 완주", "도착 → 다음 장소 → 완주"]] },
    { label: "Differentiation", type: "table", highlight: 3,
      head: ["", "데이트팝", "솜씨당", "NOLDA"],
      rows: [["추천 대상", "장소 · 팝업 단건", "체험 클래스 단건", "활동 조합 코스 (타임라인)"], ["개인 조건", "위치 · 카테고리", "카테고리 · 날짜", "시간 · 인원 · 예산 · 동네 · 취향"], ["출력", "장소 리스트", "클래스 리스트", "시간순 코스 시나리오"], ["AI 활용", "없음", "없음", "기록 기반 취향 분석 + LLM 코스 설계"], ["핵심 질문", "어디 갈까?", "뭐 배울까?", "오늘 나에게 가능한 즐거움은?"]] },
    { label: "AI Course Pipeline", type: "flow", lead: "GPT가 지어내지 못하게, 실제 장소 후보 안에서만 코스를 짜고 서버가 다시 검증합니다. 응답은 약 10~15초.",
      steps: [["동네 선택", "고른 동네 4코스, 또는 취향에 맞는 동네 4곳"], ["후보 추출", "반경 안에서 종류별 장소 약 60~125곳"], ["GPT 코스 생성", "GPT-5 mini에 6개 요청 (장소는 p1, p2… 번호로만)"], ["서버 검증", "없는 장소 · 반복 · 같은 종류 3연속 · 도보 2km 초과 · 시간/예산 초과 탈락"], ["시간 맞춤", "머무는 시간 + 이동 = 고른 시간으로 정확히 조정"], ["최대 4개 반환", "통과가 4개 미만이면 1회 재요청"]] },
    { label: "Architecture", type: "arch",
      layers: [["Client", ["React + Vite PWA", "모바일 430px 기준", "네이버 지도 · 핀"]], ["Server", ["FastAPI", "POST /courses", "POST /walk/legs", "OAuth2 + JWT 30일"]], ["AI · Data", ["GPT-5 mini 코스 생성", "취향 분석 (사진 0.6 : 유튜브 0.4)", "네이버 검색 · TMAP 보행자 경로"]], ["Storage · Deploy", ["Supabase (Postgres)", "Vercel (프론트)", "Render (백엔드)"]]] },
    { label: "Challenges", type: "stories" },
    { label: "Results", type: "results" },
    { label: "Links", type: "links" },
  ],

  // 티니핑: A안 — 왼쪽 고정 단계 표시 + 단계별 본문 (steps 형식)
  //   단계 = { label(왼쪽 목록), take(핵심 한 문장), blocks(시각화 묶음, title 은 작은 제목), trio(3칸 요약) }
  //   blocks type 추가: images(사진 여러 장) · split(왼쪽 그림 + 오른쪽 내용) · video(영상)
  //   출처: Tiniping_최종_발표.html 발표 노트 · 발표 이미지(final_assets)
  tiniping: { steps: [
    { label: "문제 발견",
      take: "티니핑은 아이 <b>4명 중 1명</b>이 1순위로 고르는 캐릭터이고, 만든 회사 매출은 4년 만에 <b>3.7배</b>가 됐습니다.",
      blocks: [
        { type: "stats", items: [["122.7만 명", "극장판 ‘사랑의 하츄핑’ · 한국 애니 역대 2위 (KOBIS)"], ["26.8%", "만 3~9세 선호 캐릭터 1순위 (티니핑 16.8% + 하츄핑 10.0%)"], ["12.2%", "팝업 · 전시 캐릭터 상품 구매 1위"]] },
        { type: "bars", title: "SAMG엔터테인먼트 연결 매출", unit: "억원", max: 1412,
          items: [["2021년", 384], ["2025년", 1412, "4년 만에 3.7배 · 흑자 전환", true]] },
      ],
      trio: [["관찰", "캐릭터는 계속 늘고, 사는 사람도 늘고 있다"], ["질문", "그런데 사람들은 이 캐릭터들을 잘 알고 있을까?"], ["다음", "실제로 사람들이 무엇을 묻는지 확인"]] },

    { label: "문제 정의",
      take: "티니핑 질문글의 <b>83%</b>가 ‘이 핑 이름이 뭐예요?’였습니다. 이름을 모르면 <b>검색조차 할 수 없습니다.</b>",
      blocks: [
        { type: "bars", title: "브랜드 전체 글 중 이름 · 종류 질문 비율 (p<0.001)", unit: "%", max: 15, digits: 1,
          items: [["포켓몬", 6.1], ["티니핑", 11.4, "포켓몬의 약 2배", true]] },
        { type: "stats", items: [["728 / 877건", "질문글 중 ‘이름’을 묻는 글 (83%)"], ["155종", "1~6기 도감 캐릭터 수"], ["51.5%", "언급되는 이름 중 하츄핑 비율 (지니계수 0.685)"]] },
        { type: "images", title: "같은 하츄핑, 1기 ~ 6기 — 시즌마다 모습과 이름이 바뀜", cols: 6, ratio: "5/6",
          items: [["images/tiniping/hachu_1.jpg", "1기"], ["images/tiniping/hachu_2.jpg", "2기"], ["images/tiniping/hachu_3.jpg", "3기"], ["images/tiniping/hachu_4.jpg", "4기"], ["images/tiniping/hachu_5.jpg", "5기"], ["images/tiniping/hachu_6.jpg", "6기"]] },
        { type: "images", cols: 2,
          items: [["images/tiniping/ev_naver_ac.jpg", "네이버 자동완성 — ‘티니핑 종류’ · ‘티니핑 맞추기’"], ["images/tiniping/chars_all.jpg", "1~6기 155종 — 종류가 많고, 같은 캐릭터도 사진이 제각각"]] },
      ],
      trio: [["문제", "이름을 모르면 검색어를 만들 수 없다"], ["원인", "종류가 많고(155종), 시즌마다 모습이 바뀌고, 사진도 제각각"], ["정의", "글 대신 사진 한 장으로 이름을 알려 주자"]] },

    { label: "데이터 수집",
      take: "손으로 30초 걸리던 사진 1장 수집을, 직접 만든 툴로 <b>0.6초</b>까지 줄여 약 <b>3만 장</b>을 모았습니다.",
      blocks: [
        { type: "split", left: { type: "images", cols: 1, items: [["images/tiniping/tool_main.jpg", "직접 만든 ‘캡쳐 저장기’"]] },
          right: [
            { type: "bars", title: "사진 1장 수집 시간 (툴 5차 개선)", unit: "초", max: 30,
              items: [["손으로", 30], ["YOLO 추출기", 25], ["캡처 툴", 2], ["유튜브 자동 수집", 0.6, "약 50배", true]] },
          ] },
        { type: "images", title: "툴이 사진을 거르는 방법 — 실제 판정값으로 만든 애니메이션 (누르면 크게)", cols: 3,
          items: [["images/tiniping/video_tool.mp4", "① 영상: 1초마다 캡처 → YOLO로 물체 자르기 → CLIP으로 캐릭터 판별 (확률 0.85 · 닮음 0.88 이상만 통과)"], ["images/tiniping/search_tool.mp4", "② 검색: ‘{핑} 인형 후기’ 검색어로 네이버 API 수집 → 같은 기준으로 한 번 더 거름 · 68종 반복"], ["images/tiniping/dup_tool.mp4", "③ 중복: 12×12 사진 지문 차이 0.30 이하면 ‘_중복’ 폴더로 — 지우지 않아 되돌릴 수 있음"]] },
        { type: "bars", title: "모은 사진 → 실제로 쓴 사진", unit: "장", max: 29307,
          items: [["모은 사진", 29307, "약 3만 장"], ["정제 후 보관", 10165, "34.7%"], ["학습 · 시험 (68종)", 7062, "24.1%", true]] },
      ],
      trio: [["문제", "검색 · 확인 · 캡처 · 저장을 손으로 하면 1장에 30초"], ["한 일", "수집 툴 5차 개선 — 버튼 하나로 68종 반복 수집"], ["결과", "30초 → 0.6초 · 약 3만 장"]] },

    { label: "전처리 · EDA",
      take: "7천 장을 <b>5단계로 검수</b>하고, 모자란 캐릭터만 채워 사진 수 격차를 <b>3.4배 → 1.7배</b>로 줄였습니다.",
      blocks: [
        { type: "flow", title: "검수 5단계 — 컴퓨터가 이상한 사진을 골라 주고, 사람이 결정",
          steps: [["병합", "두 사람 폴더 → 68종 7,079장"], ["중복 제거", "16×16 지문이 같은 17장은 1장만"], ["이름표 검수", "같은 사진이 다른 폴더에 — 1쌍 확인"], ["품질 검수", "흐린 879장은 실제 환경이라 유지"], ["균등화", "모자란 캐릭터만 보강 → 100장 이상"]] },
        { type: "split", left: { type: "images", cols: 1, items: [["images/tiniping/eda_count.jpg", "캐릭터별 사진 수 (7,079장 · 68종)"]] },
          right: [
            { type: "stats", items: [["50 → 100장", "가장 적은 캐릭터"], ["3.4 → 1.7배", "최대 ÷ 최소 격차"], ["7 : 1 : 2", "캐릭터당 100장 · 학습 · 검증 · 시험"]] },
            { type: "list", title: "AI가 모은 데이터도 그대로 믿지 않음", items: ["모자란 사진은 AI 에이전트가 공식 영상 149편(약 20시간)에서 후보 30,682장을 모음", "5기 영상의 사람 ‘왕자’가 확신도 0.92~0.95로 왕자핑 관문을 통과하는 오류 발견", "기존 사진과의 닮음 0.85 관문을 새로 추가 → 사람 사진 모두 탈락, 1,970장만 투입"] },
          ] },
        { type: "images", title: "사진 53%가 정사각형이 아님 — 늘리면 찌그러져서, 비율은 그대로 두고 흰 여백으로 채움(Letterbox)", cols: 3, ratio: "1/1",
          items: [["images/tiniping/pad_src.jpg", "원본"], ["images/tiniping/pad_stretch.jpg", "그냥 늘리기 — 옆으로 찌그러짐"], ["images/tiniping/pad_box.jpg", "Letterbox — 학습 · 서비스 모두 같은 코드"]] },
        { type: "stats", title: "그림체", items: [["5,353 : 1,709", "애니 : 실사 사진 수"], ["7가지", "애니 장면 · 일러스트 · 손그림 · 피규어 · 봉제 · 포장 · 인형탈"], ["93.3%", "가장 약한 유형 — 상품 포장 (캐릭터가 작고 글자가 많음)"]] },
      ],
      trio: [["문제", "캐릭터별 사진 수 3.4배 차이 · 크기 · 비율 · 그림체가 제각각"], ["한 일", "5단계 검수 · 모자란 캐릭터만 보강 · Letterbox · AI 수집 데이터 재검증"], ["결과", "68종 × 100장 · 7:1:2 분할 · 중복 0"]] },

    { label: "모델 선정 · 이유",
      take: "EDA에서 나온 데이터 특징 3가지가 모델 조건이 됐고, 비교 실험과 논문 근거를 합쳐 <b>SigLIP 2</b>를 골랐습니다.",
      blocks: [
        { type: "table", title: "데이터 특징 → 모델 조건", highlight: 2,
          head: ["", "데이터 특징 (EDA)", "그래서 필요한 것"],
          rows: [["01", "그림체가 애니 · 실사, 7가지로 갈림", "그림체가 바뀌어도 같은 캐릭터로 알아보는 모델"], ["02", "캐릭터 평균 색이 대부분 분홍 · 보라", "색이 아니라 작은 장식 차이를 보는 특징"], ["03", "캐릭터당 학습 사진 70장뿐", "미리 배운 모델을 조금만 고쳐 쓰는 전이학습"]] },
        { type: "bars", title: "근거 1 · CLIP 논문 — 그림체가 바뀐 평가 데이터(ImageNet-R)", unit: "%", max: 100, digits: 1,
          items: [["사진으로만 배운 ResNet-101", 37.7, "원래 사진에선 76.2%"], ["이미지 + 글로 배운 CLIP", 88.9, "원래 사진에선 76.2%", true]] },
        { type: "bars", title: "근거 2 · 직접 비교 — 3종 150장, 5-Fold", unit: "%", min: 90, max: 100, digits: 1,
          items: [["SigLIP 2", 98.7, "± 2.7", true], ["ConvNeXt V2", 96.7, "± 3.7"], ["DINOv2-large", 94.0, "± 2.5 · 3.3배 무거움"]] },
        { type: "stats", title: "학습 방법", items: [["뒤 2 / 12 블록", "앞쪽 ‘보는 눈’은 그대로, 판단 부분만 학습 (15.3%)"], ["28에폭 · 26분", "검증 손실이 가장 낮은 모델 저장"], ["16 / 1,360장", "틀린 시험 사진 — 7장이 기수별 하츄핑"]] },
        { type: "images", cols: 2,
          items: [["images/tiniping/train_curve.jpg", "학습 곡선 — 5에폭 만에 빠르게 오르고 안정"], ["images/tiniping/tb_gc_anime.jpg", "GradCAM — 머리 장식 · 보석 · 왕관을 보고 구분"]] },
        { type: "bars", title: "성능 변화 — 캐릭터 23배 · 시험지 200배로 늘려도 정확도 유지", unit: "%", min: 90, max: 100, digits: 1,
          items: [["처음 · DINOv2 3종", 95.7], ["1차 · SigLIP 2 67종", 97.8], ["최종 · 68종 시험 1,360장", 98.8, "애니 99.5% · 장난감 96.5%", true]] },
        { type: "bars", title: "실제 서비스 경로 테스트 — 학습에 안 쓴 장난감 사진 800장", unit: "%", min: 80, max: 100, digits: 1,
          items: [["원본", 94.0], ["빛 반사", 92.1], ["흔들림", 85.8, "가장 약함"], ["어두움", 93.0], ["비스듬히", 94.0]] },
      ],
      trio: [["문제", "그림체가 제각각 · 색이 비슷함 · 캐릭터당 사진 70장"], ["한 일", "논문 근거 + 5-Fold 비교 → SigLIP 2, 뒤 2블록만 미세조정"], ["결과", "68종 98.8% · 4,000번 요청 중 틀린 답을 그대로 말한 건 1번"]] },

    { label: "서비스 설계",
      take: "틀릴 바엔 후보를 보여 주는 게 낫다고 판단해, <b>확실할 때만 이름을 답하는</b> 구조로 설계했습니다.",
      blocks: [
        { type: "branch", title: "판정 규칙 — DL과 ML 두 의견을 함께 봄",
          inputs: [["DL", "SigLIP 2가 68종 확률 → 가장 높은 값이 확신도"], ["ML", "LDA 64차원 → 가까운 학습 사진 5장이 투표 (kNN)"]],
          cond: "확신도 ≥ 0.6 이고 DL · ML 1등이 같다",
          yes: "바로 이름을 답함 — 사진의 93%, 정확도 99.84%",
          no: "후보 3개를 보여 줌 — ‘혹시 이 중에 있나요?’" },
        { type: "split", left: { type: "images", cols: 1, items: [["images/tiniping/conf_hist.jpg", "맞힌 사진 82%는 확신도 0.8 이상, 틀린 사진 81%는 0.4 아래"]] },
          right: [{ type: "list", title: "기준을 0.6으로 정한 이유", items: ["확신도가 낮으면 ‘잘 모르겠다’로 볼 수 있음", "0.6이면 사진의 93%는 바로 답하고, 그때 정확도 99.84%", "나머지는 후보 3개를 보여 줘서 오답을 단정하지 않음"] }] },
        { type: "images", title: "실제 앱 화면 — 찍으면 이름부터 장난감까지", cols: 4,
          items: [["images/tiniping/app_home.jpg", "홈 · 스캔"], ["images/tiniping/app_result.jpg", "결과 · 후보 · 닮은 핑"], ["images/tiniping/app_shop.jpg", "캐릭터 정보 · 추천 상품"], ["images/tiniping/app_dex.jpg", "도감 155종 · 컬렉션"]] },
        { type: "list", title: "추천 상품 연동", items: ["공식몰 ‘더 티니핑’ 공개 상품 1,289개를 WAS가 1시간마다 확인 (약 7초)", "새 상품만 Gemini가 어떤 캐릭터 상품인지 태그 — DB 이름 149개 중에서만 고르게 해 엉뚱한 이름 방지", "누르면 공식 샵으로 이동 (공식 제휴가 아닌 학습용 · 실서비스는 제휴 필요)"] },
        { type: "split", left: { type: "images", cols: 1, items: [["images/tiniping/tt_mock.jpg", "더 티니핑 앱에 ‘AI 사진 찾기’를 넣은 제안 시안"]] },
          right: [{ type: "table", title: "SAMG 제안 · 수익 구조", highlight: -1, head: ["수익원", "내용"],
            rows: [["구매 연결 수수료", "스캔 → 공식몰 구매 금액의 일부"], ["B2B API", "몰 · 앱에 ‘사진 검색’ 월 이용료 · 호출당 요금"], ["수요 데이터", "많이 찾는 캐릭터 · 헷갈리는 캐릭터 리포트"], ["다른 캐릭터로 확장", "같은 도커 구조 · 자동 재학습 재사용"]] }] },
      ],
      trio: [["문제", "헷갈리는 사진에도 자신 있게 오답을 냄"], ["한 일", "DL 확신도 0.6 + ML 의견 일치일 때만 바로 답 · 상품 추천 연결"], ["결과", "바로 답할 때 99.84% · 이름 → 공식 상품까지 한 번에"]] },

    { label: "아키텍처",
      take: "모든 요청은 <b>WAS 하나</b>로 들어오고, 추론 서버는 판별만 합니다. 서버 4개는 모두 도커 컨테이너라 <b>명령 한 줄</b>로 함께 켜집니다.",
      blocks: [
        { type: "images", cols: 1, items: [["images/tiniping/arch.jpg", "전체 아키텍처 — 사진 한 장이 답이 되기까지"]] },
        { type: "table", title: "서버별 역할", highlight: -1,
          head: ["서버", "포트", "역할", "핵심"],
          rows: [["WAS (API 서버)", ":8765", "모든 요청의 입구 · DB를 여는 유일한 서버", "요청 처리 · 추론 호출 · 로그 · 사용자 기록 · 사진 저장 · 도감 155종"], ["추론 서버", ":8010", "판별만 함", "SigLIP 2 68종 판별 + LDA · kNN 확인 · 처리 37ms (느린 5%도 122ms)"], ["재학습 서버", ":8030", "사용자 정답으로 스스로 다시 배움", "매일 03시 · Kaggle T4 약 21분 · 기준 3개 통과 시 무중단 교체"], ["관리자 대시보드", ":8501", "운영 · 모델 상태 확인", "WAS를 통해서만 데이터를 받음"], ["Supabase", "—", "DB + 사진 저장소", "logs · users · public 스키마 분리"], ["외부", "—", "상품 · 태그", "더티니핑 샵 1,289개 (1시간마다) · Gemini 무료 등급"]] },
        { type: "flow", title: "서비스 흐름 — 사진 한 장",
          steps: [["앱에서 촬영", "모바일 웹앱"], ["WAS 접수", "기록 번호 부여"], ["추론", "DL 판별 + ML 확인을 한 번에"], ["판정", "확신도 0.6 · 의견 일치"], ["결과 화면", "이름 · 닮은 핑 · 추천 상품"]] },
        { type: "flow", title: "재학습 흐름 — 사람 손이 한 번도 필요 없음",
          steps: [["시작", "매일 새벽 3시 또는 대시보드 버튼"], ["재료 요청", "WAS가 정답 사진을 필터 4가지로 거르고 6시간짜리 임시 링크 발급 · 30장 이상일 때만"], ["Kaggle 학습", "무료 T4 GPU 약 21분 — DB 비밀 키는 넘기지 않음"], ["채점", "같은 시험지로 지금 모델 vs 새 모델"], ["교체 판단", "기준 3개 중 하나라도 떨어지면 유지"], ["무중단 교체", "새 버전 폴더 저장 → 시험 5장 확인 → 한 줄로 교체"]] },
        { type: "split", left: { type: "images", cols: 1, items: [["images/tiniping/db_schema.jpg", "Supabase 스키마"]] },
          right: [
            { type: "table", title: "DB — 용도별로 스키마 분리", highlight: -1, head: ["스키마", "내용"],
              rows: [["logs", "서버 로그 · 재학습 기록"], ["users", "사용자 · 피드백 · 컬렉션 · 사진 · 관리자 검토"], ["public", "캐릭터 155종 · 상품 1,289개"]] },
            { type: "list", title: "도커", items: ["docker compose up 한 줄로 서버 4개가 함께 켜짐", "추론 서버 이미지 12.1GB (68종 모델 + ML 파일 포함) · 노트북 GPU 그대로 사용", "4개 이미지 모두 Docker Hub에 공개 — docker pull로 어디서든 같은 환경"] },
          ] },
      ],
      trio: [["문제", "코랩에서 사람이 재학습 · 모델 교체 중 서비스 중단"], ["한 일", "WAS 단일 입구 · 4개 서버 도커화 · Kaggle 자동 재학습 · 무중단 교체"], ["결과", "처리 37ms · 매일 자동 재학습 · 버튼 하나로 되돌리기"]] },

    { label: "대시보드",
      take: "서비스가 잘 도는지, 모델이 잘 맞히는지, 재학습이 제대로 되는지를 <b>한눈에 보는 운영 대시보드</b>를 직접 만들었습니다.",
      blocks: [
        { type: "dashboard",
          shots: [
            { src: "images/tiniping/dash_ops.jpg", title: "운영 — 서버 · 오류 · 데이터 · 이용자",
              points: ["서버 상태: 성공률 99.9% · 가장 느린 5% 응답 122ms를 목표와 비교", "서버 6곳을 한 줄씩 — WAS · 추론 · 재학습 · DB · 사진 저장소 · 상품 동기화", "시간대별 요청 · 오류 — 오류율 0.1% (849건 중 1건)", "많이 찍힌 캐릭터 · ‘틀려요’가 많은 캐릭터 → 다음에 보강할 사진이 여기서 보임", "이용자 수 · 새 이용자 · 1인당 판별 수"] },
            { src: "images/tiniping/dash_model.jpg", title: "모델 · 재학습",
              points: ["서비스 중 모델 v004 — 시험 98.82% · 바로 답할 때 99.84%", "실제 판별 품질: 확신도 분포 · 검토 퍼널 (바로 결과 82% · 후보 제시 18%)", "재학습 5단계가 자동으로 진행 — 확인 → 준비 → 새로 학습 → 채점 → 교체", "9/28 회차: 장난감 정확도 93.59 → 93.24로 떨어져 교체 보류 — 기준이 나쁜 모델을 막음", "버전 목록 · 버튼 하나로 이전 모델 되돌리기"] },
          ] },
      ],
      trio: [["문제", "서버 · 모델 상태를 확인하려면 로그를 직접 열어야 함"], ["한 일", "운영 화면 + 모델 · 재학습 화면 분리, WAS를 통해 실시간 집계"], ["결과", "보강할 캐릭터 · 교체 보류 같은 판단을 화면에서 바로"]] },

    { label: "시연 영상",
      take: "찍으면 <b>이름부터 장난감까지</b> — 도커로 띄운 실제 서비스입니다.",
      blocks: [
        { type: "video", src: "images/tiniping/demo.mp4", poster: "images/tiniping/video_poster.jpg", caption: "서비스 소개 영상 (49초)" },
        { type: "video", src: "images/tiniping/live.mp4", poster: "images/tiniping/live_poster.jpg", caption: "라이브 시연 — 앱에서 찍으면 2초 안에 대시보드에 요청이 쌓임 (32초)" },
        { type: "links", title: "Links" },
      ] },
  ] },

  supra: [
    { label: "Overview", type: "overview" },
    { label: "Problem", type: "text", key: "problem" },
    { label: "Lost Context", type: "list", lead: "개발이 끝나면 코드와 결과물은 남지만, 이런 정보는 사라집니다.",
      items: ["왜 이렇게 결정했는가?", "무엇을 시도했고 왜 실패했는가?", "이 문제를 예전에 어떻게 해결했는가?", "지금 작업은 과거의 어떤 경험과 연결되는가?"] },
    { label: "Core Flow", type: "flow", lead: "업무 과정 자체를 Work Memory로 쌓고, 필요한 순간에 먼저 꺼내 줍니다.",
      steps: [["Observe", "업무 활동 관찰"], ["Understand", "맥락 분석"], ["Remember", "Work Memory로 저장"], ["Assist", "비슷한 과거 경험 먼저 제안"], ["Challenge", "새 결정을 과거 근거로 검증"], ["Transfer", "인수인계 문서 생성"]] },
    { label: "Work Memory", type: "table", highlight: 0,
      head: ["요소", "의미", "예시 — 로그인 인증 오류"],
      rows: [["Context", "어떤 프로젝트 · 문제였나", "로그인 API 인증 오류"], ["Action", "무엇을 했나", "인증 로직 수정 → 실패"], ["Decision", "어떤 결정을 했나", "JWT 검증 방식 변경"], ["Reason", "왜 그렇게 결정했나", "기존 로직 수정으로 해결 안 됨"], ["Evidence", "어떤 근거를 썼나", "테스트 결과"], ["Outcome", "결과는 어땠나", "테스트 성공"]] },
    { label: "Differentiation", type: "table", highlight: 2,
      head: ["", "기존 AI", "SUPRA"],
      rows: [["시작", "사용자가 질문", "업무 맥락을 먼저 파악"], ["기억", "대화가 끝나면 사라짐", "Work Memory로 쌓임"], ["도움", "질문에 답함", "관련 경험을 먼저 제안"]] },
    { label: "Architecture", type: "arch",
      layers: [["Input", ["Work Observation (IDE · Terminal)", "AI Workspace"]], ["Analysis", ["Context Analysis"]], ["Memory", ["Work Memory — Supabase + 임베딩 (1,536차원)"]], ["Output", ["Assist", "Decision Check", "Handover"]]] },
    { label: "Roadmap", type: "flow",
      steps: [["Phase 1 · MVP", "AI Workspace + IDE + Terminal로 핵심 가치 검증"], ["Phase 2 · 도구 확장", "ChatGPT · Claude · Cursor · GitHub 연결"], ["Phase 3 · 업무 확장", "Browser · Figma · Notion · Slack"], ["Phase 4 · Living Work Memory", "개인 → 프로젝트 → 팀 → 조직 지식"]] },
    { label: "Success Criteria", type: "list", lead: "MVP의 질문은 하나 — ‘업무 과정을 이해하고, 기억하고, 다시 활용할 수 있는가?’",
      items: ["업무 활동을 수집할 수 있는가", "수집된 활동을 Work Memory로 만들 수 있는가", "과거 Work Memory를 현재 업무와 연결할 수 있는가", "질문하지 않아도 관련 경험을 제안할 수 있는가", "Work Memory로 Decision Check를 제공할 수 있는가", "Work Memory로 Handover를 생성할 수 있는가"] },
    { label: "Challenges", type: "stories" },
    { label: "Links", type: "links" },
  ],
};
