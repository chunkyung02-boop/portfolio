/* 웹 포트폴리오 내용 파일
   - 이 파일만 고치면 화면에 반영됩니다. index.html 은 건드리지 않아도 됩니다.
   - 빈 문자열("")이나 빈 목록([])은 화면에서 자동으로 숨겨집니다.
   - draft: true 인 동안에는 빈 칸 자리에 "무엇을 쓸지" 안내가 보입니다. 공개 전에 false 로 바꾸세요.
   - 이미지는 assets 폴더에 넣고 "assets/파일이름.jpg" 로 적습니다.

   구성 원칙 (포트폴리오 제작 강의 기준)
   - 분량: 메인 1개(자세히) + 서브 1개(핵심 과정) + 기타 2개(요약)
   - 프로젝트 첫머리 5줄: 한 줄 정의 / 기간·팀·역할 / 기술 태그 / 성과① 구축 / 성과② 개선(숫자 1개 이상)
   - 한 줄 정의는 기술 이름보다 "해결한 문제"를 먼저
   - 성과 문장의 끝은 "한 일 → 확인한 변화"로
   - keywords 는 프로젝트마다 겹치지 않게 (역량의 폭이 보이도록)
   - 메인은 지원 공고 기준으로 고르고, 공고가 바뀌면 메인도 바꿉니다

   프로젝트 뷰어 (그리드 카드를 누르면 열리는 PDF 같은 창)
   - 첫 장은 항상 썸네일(그리드 카드 그림)이 자동으로 들어갑니다. 카드를 누르면 그 그림이 먼저 보이고, 다음 장부터 내용이 나옵니다.
   - 프로젝트마다 pages 를 적으면 그 장들이 그대로 나옵니다. 없으면 아래 항목들로 장을 자동으로 만듭니다.
   - 분량 목표: 메인 10장, 서브 3~4장, 기타 2~4장
   - 한 장 형식: { title: "제목", lead: "핵심 한 문장", text: "설명", rows: [["항목", "내용"]],
                   nums: [{ value: "91.2%", label: "설명" }], image: "assets/파일.jpg" }
     예) pages: [{ title: "Overview", lead: "...", image: "assets/main_01.jpg" }, { title: "Problem", ... }] */
window.PORTFOLIO = {
  draft: true,

  /* ---------- 기본 정보 ---------- */
  name: "Kyungmin Jeon",
  nameKo: "전경민",
  role: "Product Engineer",
  headline: "시각 감각으로 설계하는 AI 프로덕트",
  intro: "사용자가 막히는 순간을 찾아 AI로 빠르게 만들고, 직접 써 보며 사용 경험을 고치는 프로덕트 엔지니어입니다.",
  deckUrl: "https://chunkyung02-boop.github.io/portfolio/portfolio-deck.pdf",   // 포트폴리오 PDF (27장)
  resumeUrl: "resume.pdf",        // 이력서 PDF (공개용, 전화번호 제외)
  heroLines: ["Designed with a trained eye", "Built end to end with AI"],   // 첫 화면 큰 글자 두 줄
  // 작업물 목록. 첫 화면의 띠, 프로젝트 그리드, 어두운 구간의 구에 같은 이미지들이 쓰입니다 (8장 권장).
  // src 이미지 / title 이름 / group 소속 프로젝트 / desc 마우스를 올리면 보이는 한 줄 설명 / href 누르면 이동할 구간
  gallery: [
    { src: "assets/kucanto_18.jpg", title: "Kucanto 성능 개선", group: "Kucanto", desc: "1,459문제 시험지로 로컬 판정 91.2%를 확보한 과정.", href: "#kucanto" },
    { src: "assets/cg_thumb.jpg", title: "CG 합성", group: "시각 작업", desc: "실사와 CG의 빛, 색, 경계를 맞춘 2년의 작업.", href: "#visual" },
    { src: "assets/tiniping_40.jpg", title: "티니핑 판별 정확도", group: "티니핑 판별기", desc: "사진 한 장으로 68종을 판별, 정확도 98.8%.", href: "#tiniping" },
    { src: "assets/kucanto_13.jpg", title: "Kucanto 모델 선정", group: "Kucanto", desc: "로컬 모델 15종을 같은 조건으로 비교해 고른 근거.", href: "#kucanto" },
    { src: "assets/tiniping_41.jpg", title: "티니핑 실전 테스트", group: "티니핑 판별기", desc: "바로 답한 사진의 정확도 99.84%.", href: "#tiniping" },
    { src: "assets/rookies_certificate.jpg", title: "Rookie Awards Rank A", group: "시각 작업", desc: "Rookie Awards 2026 Visual Effects 부문 Industry Ranking.", href: "#visual" },
    { src: "assets/kucanto_31.jpg", title: "Kucanto 담당 역할", group: "Kucanto", desc: "AI 활용 개발, 평가 설계, 발표 제작을 맡았습니다.", href: "#kucanto" },
    { src: "assets/tiniping_35.jpg", title: "티니핑 구조와 재학습", group: "티니핑 판별기", desc: "수집부터 재학습 자동화까지 이어지는 구조.", href: "#tiniping" }
  ],

  /* ---------- 소개 ---------- */
  about: {
    statement: "화면의 완성도를 보는 눈과, AI로 끝까지 만들어 내는 방식을 함께 가진 사람입니다.",
    points: [
      { term: "보는 눈", desc: "CG 합성 작업 2년. 한 프레임 안에서 빛, 색, 경계가 어긋난 곳을 찾아 맞추는 일을 했습니다. Rookie Awards 2026 Visual Effects 부문 Rank A." },
      { term: "만드는 방식", desc: "발표 자료와 웹 서비스를 모두 AI로 제작했습니다. 직접 맡은 일은 기획 원문 작성, 시험 데이터와 평가 기준 설계, 결과 검수입니다." },
      { term: "향하는 곳", desc: "고객이 고르는 순간을 돕는 AI 경험을 설계하려 합니다." }
    ]
  },

  /* ---------- 메인 프로젝트 (자세히, PDF 기준 10장 분량) ---------- */
  main: {
    id: "main",
    title: "E-commerce Trend Agent",
    status: "진행 예정",
    oneLine: "",          // 한 줄 정의: 누구의 어떤 문제를 무엇으로 푸는가
    period: "",           // 예: "2026.11 ~ 12"
    team: "",             // 예: "개인" 또는 "팀 3명"
    role: "",             // 팀이면 내가 맡은 범위를 반드시
    tags: ["AI Agent", "RAG", "트렌드 리서치"],     // 공고에 나온 기술을 앞에
    keywords: ["에이전트 설계", "기획 자동화", "근거 기반 추천"],
    built: "",            // 성과① 구축: [대상/문제]를 [핵심 기술·설계]로 [구현]해 [달성 상태]
    improved: "",         // 성과② 개선: [문제]를 [조치]로 해결해 [지표] 달성 (숫자 1개 이상)
    links: [],            // 데모 화면이나 서비스 링크. 예: [{ label: "데모", url: "https://..." }]
    chapters: [
      {
        name: "Overview",
        guide: "결론과 성과를 먼저. 기본 정보(기간, 팀, 역할), 서비스 소개와 핵심 기능, 기술 스택, 핵심 성과. 데모 화면이나 서비스 링크를 꼭 넣기.",
        claim: "",          // 이 장에서 전하려는 한 문장
        body: "",
        items: [],          // 예: [{ label: "핵심 기능", text: "..." }]
        image: "", caption: ""
      },
      {
        name: "Planning",
        guide: "왜 에이전트여야 하는가. 대상과 문제(요구사항), 해결 방법(기능 목록), AI와 사람의 경계, 일하는 방식. 목표 지표를 여기서 정하고 수행 과업에서 결과로 답하기.",
        claim: "", body: "", items: [], image: "", caption: ""
      },
      {
        name: "Design",
        guide: "대안 → 선택 이유 → 포기한 것(트레이드오프). 에이전트 구조, 상태와 기억, 도구와 데이터, 통제 장치, 설계 의도.",
        claim: "",
        body: "트렌드를 읽고, 기획전 초안을 만들고, 고객의 코디 질문에 답하는 세 개의 층으로 구성합니다.",
        layers: ["트렌드 리서치", "기획전 초안 자동화", "코디 챗봇"],     // 겹친 판 도식으로 그려집니다
        items: [
          { label: "트렌드 리서치", text: "AI가 패션 트렌드 자료를 모아 요약합니다." },
          { label: "기획전 초안 자동화", text: "리서치 결과로 기획전 구성과 문구 초안을 만드는 에이전트입니다." },
          { label: "코디 챗봇", text: "상품 정보를 검색해 근거와 함께 코디를 제안합니다 (RAG)." }
        ],
        image: "", caption: ""
      },
      {
        name: "Execution",
        guide: "세 가지를 나눠 쓰기. 핵심 구현(기술과 방식의 고민, 작업 과정) / 문제 해결(현상 → 발견과 분석 → 해결 → 결과, 숫자) / 평가와 검증(평가 문제 묶음, 지표, 방식).",
        claim: "", body: "",
        items: [],          // 예: [{ label: "문제 해결", text: "현상 → 원인 → 해결 → 결과" }]
        results: [],        // 예: [{ value: "0.62 → 0.81", label: "검색 정확도 (평가 질문 40개)" }]
        image: "", caption: ""
      },
      {
        name: "Retrospective",
        guide: "목표를 얼마나 달성했는지, 효율이 난 지점, 한계와 다음에 고칠 것.",
        claim: "", body: "", items: [], image: "", caption: ""
      }
    ]
  },

  /* ---------- 서브 프로젝트 (핵심 과정, 각 3~4장 분량) ---------- */
  subs: [{
    id: "kucanto",
    title: "Kucanto",
    oneLine: "요리하는 동안 손을 쓸 수 없는 사람에게, 재료 확인부터 조리까지 말로 안내하는 AI 요리 코치",
    period: "2026.10.16 ~ 11.02",
    team: "팀 2명",
    role: "AI 활용 개발, 평가 설계, 발표 제작",
    tags: ["VLM", "LLM", "FastAPI", "프롬프트 버전 관리"],
    keywords: ["평가 설계", "모델 선정", "비용 절감"],
    built: "재료 판정, 대체 재료 안내, 조리 단계 진행을 로컬 모델 우선 구조로 구현해 말로 진행하는 요리 안내 서비스를 완성",
    improved: "1,459문제 시험지로 모델 15종을 비교해 로컬 판정 91.2%를 확보하고, API 재확인 호출을 589번에서 61번으로 줄임",
    links: [],
    process: [
      { step: "문제", text: "정확한 API 모델은 비용과 속도, 사진 외부 전송이 걸리고 로컬 모델만 쓰면 정확도가 걱정이었습니다." },
      { step: "조치", text: "정답지를 먼저 쓴 1,459문제 시험지를 만들고 로컬 모델 15종을 같은 조건으로 비교했습니다. 로컬이 먼저 판정하고 어려운 것만 API가 재확인하게 했습니다." },
      { step: "결과", text: "로컬 판정 91.2%. API 재확인 호출 589번에서 61번으로 감소." }
    ],
    results: [
      { value: "91.2%", label: "로컬 모델 재료 판정 (1,459문제)" },
      { value: "589 → 61", label: "API 재확인 호출 횟수" },
      { value: "15종", label: "로컬 모델 비교" }
    ],
    image: "assets/kucanto_18.jpg",
    caption: "성능 개선 발표 장표"
  }, {
    id: "tiniping",
    title: "Tiniping Classifier",
    oneLine: "닮은 캐릭터가 많아 이름을 찾기 어려운 문제를, 사진 한 장으로 68종을 판별해 해결",
    period: "2026.09.09 ~ 09.30",
    team: "팀 2명",
    role: "AI 활용 개발, 디자인",
    tags: ["PyTorch", "SigLIP2", "Docker", "Supabase"],
    keywords: ["데이터 수집", "모델 학습", "재학습 자동화"],
    built: "데이터 수집부터 학습, 서버, 배포, 재학습 자동화까지 한 흐름으로 구현해 실제 쓸 수 있는 판별 서비스를 완성",
    improved: "정확도 98.8% (1,360장), 사진 1장 응답 37ms 달성",
    links: [{ label: "GitHub", url: "https://github.com/chunkyung02-boop/tinyping-character-recognition" }],
    process: [
      { step: "문제", text: "닮은 캐릭터가 많아 사진만으로 이름을 찾기 어려웠습니다." },
      { step: "조치", text: "데이터 수집부터 학습, 서버, 배포, 재학습 자동화까지 한 흐름으로 만들었습니다." },
      { step: "결과", text: "정확도 98.8%. 바로 답한 사진의 정확도 99.84%. 사진 1장 응답 37ms." }
    ],
    results: [
      { value: "98.8%", label: "정확도 (1,360장)" },
      { value: "99.84%", label: "바로 답한 사진의 정확도" },
      { value: "37ms", label: "사진 1장 응답 시간" }
    ],
    image: "assets/tiniping_40.jpg",
    caption: "성능 발표 장표"
  }],

  /* ---------- 기타 프로젝트 (요약, 각 1~2장 분량) ----------
     프로젝트 그리드는 메인 1(크게) + 서브 2(중간) + 기타 2(작게) 로 그려집니다.
     기타가 2개보다 적으면 아래 '시각 작업'이 기타 칸을 채웁니다. */
  others: [
    {
      id: "nolda",
      title: "NOLDA",
      oneLine: "조건을 매번 입력해야 하는 여가 추천의 불편을, 취향을 읽어 코스를 짜 주는 웹앱으로 해결",
      period: "2026.08 ~ 09.19",
      team: "팀 3명",
      role: "프론트엔드, 취향 분석 연동",
      tags: ["React", "TypeScript", "PWA", "TMAP"],
      keywords: ["프론트엔드", "취향 분석", "배포 운영"],
      built: "사진과 유튜브 기록으로 취향을 읽고 실제 도보 경로로 연결하는 마포구 여가 코스 추천 웹앱을 배포",
      improved: "",       // 숫자가 들어간 개선 성과를 채우세요 (예: 응답 시간, 사용자 테스트 결과)
      links: [{ label: "배포된 앱", url: "https://nolda-space.vercel.app/" }],
      image: "",
      caption: ""
    },
    {
      id: "design-editor",
      title: "Design Editor",
      oneLine: "AI가 만든 HTML을 프롬프트 없이 직접 고치기 위한 피그마형 디자인 편집기",
      period: "2026.11 ~",
      team: "개인",
      role: "기획, AI 활용 개발",
      tags: ["React", "TypeScript", "Vite", "Zustand"],
      keywords: ["편집 도구", "파일 변환", "무한 캔버스"],
      built: "HTML, PDF, PPTX, 이미지를 열어 글자를 수정 가능한 요소로 바꾸고 다시 저장하는 무한 캔버스 편집기를 구현",   // 확인 필요: 2026-11-06 기준 메모로 작성
      improved: "",       // 숫자가 들어간 개선 성과를 채우세요 (예: 수정 한 번에 드는 시간, 줄인 프롬프트 횟수)
      links: [],
      image: "",
      caption: ""
    }
  ],

  /* ---------- 시각 작업 ---------- */
  visual: {
    title: "CG Compositing & Award",
    desc: "2년간 CG 합성 작업을 했습니다. 실사와 CG의 빛, 색, 경계를 맞춰 한 장면으로 만드는 일입니다.",
    award: { rank: "Rank A", name: "Rookie Awards 2026", field: "Visual Effects 부문 Industry Ranking" },
    image: "assets/cg_thumb.jpg",
    imageAlt: "CG 합성 작업 대표 장면",
    awardImage: "assets/rookies_certificate.jpg",      // 상장 이미지
    awardImageAlt: "Rookie Awards 2026 Rank A 증서",
    links: [
      { label: "수상 작품", url: "https://www.therookies.co/entries/48224" },
      { label: "작업 영상", url: "" }          // 유튜브 릴 주소
    ]
  },

  /* ---------- 이력 ---------- */
  career: [
    { period: "2026 ~", title: "POTENUP AI 4기", desc: "AI 에이전트 트랙. Kucanto · 티니핑 판별기 · NOLDA 프로젝트." },
    { period: "2024 – 2026", title: "CG 합성", desc: "CG 공부와 합성 작업 2년. Rookie Awards 2026 Rank A." },
    { period: "2024", title: "패션 브랜드 인턴", desc: "" },
    { period: "2024", title: "광고 영업·마케팅 인턴", desc: "" },
    { period: "2022 – 2024", title: "군 복무", desc: "" },
    { period: "2021 – 2022", title: "패션 브랜드 오프라인 매장 관리", desc: "" }
  ],
  skills: [
    { group: "AI 제작", items: ["Claude Code", "프롬프트 설계", "평가 기준 설계", "RAG"] },
    { group: "디자인", items: ["Figma", "HTML/CSS", "발표 디자인", "CG 합성"] },
    { group: "개발", items: ["Python", "FastAPI", "React", "PyTorch"] }
  ],

  /* ---------- 연락 ---------- */
  contact: {
    message: "현장에서 AI 경험을 설계할 자리를 찾고 있습니다.",
    email: "chunkyung02@gmail.com",
    links: [
      { label: "GitHub", url: "https://github.com/chunkyung02-boop" },
      { label: "Rookies", url: "https://www.therookies.co/entries/48224" }
    ]
  }
};
