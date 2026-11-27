window.PORTFOLIO_CASES = {
  "mono": [
    {
      "title": "MoNO · 패션 트렌드 조사",
      "lead": "SNS와 무신사 스냅의 착장 사진을 모아, 이전 기간보다 자주 보이는 특징과 관심의 변화를 조사합니다.",
      "image": "assets/mono-home-v3.jpg",
      "rows": [
        [
          "기여",
          "개인 · 수집부터 대시보드까지 기획·설계·구현"
        ],
        [
          "현황",
          "수집 · 개발자 대시보드 · 트렌드 매거진 구현"
        ]
      ],
      "links": [
        {
          "label": "공개 데모",
          "url": "mono-demo.html"
        },
        {
          "label": "GitHub",
          "url": "https://github.com/chunkyung02-boop/MoNO"
        }
      ]
    },
    {
      "title": "개발자 대시보드",
      "lead": "실행 단계를 따라가며 실패한 위치와 소요 시간, 호출 수, 비용을 확인합니다. 이후 원인과 다음 조치를 확인합니다.",
      "image": "assets/mono-developer-v3.jpg",
      "rows": [
        [
          "확인 순서",
          "실행 선택 → 단계별 상태 → 오류 원인 확인"
        ]
      ],
      "links": []
    },
    {
      "title": "데이터 수집 대시보드",
      "lead": "자동 실행 일정과 출처별 상태를 확인합니다. 한 출처가 막히면 실패를 기록하고 다른 출처는 계속 수집합니다.",
      "image": "assets/mono-collect-v3.jpg",
      "rows": [
        [
          "운영 기준",
          "게시물 ID·해시로 중복 제거 · 인증 요청 시 사람 확인"
        ],
        [
          "확인한 실적",
          "2026-11-27 기준 6개 출처에서 정제 통과 2,768건"
        ]
      ],
      "links": []
    },
    {
      "title": "트렌드 매거진",
      "lead": "착장 사진의 품목·색·핏을 바탕으로 후보를 조사해 출처와 분석 근거를 매거진으로 정리합니다.",
      "image": "assets/mono-magazine-v3.jpg",
      "rows": [
        [
          "사용 흐름",
          "매거진 생성 → 편집 → PDF 저장"
        ],
        [
          "해석 범위",
          "착장 비율과 검색·리뷰는 관심의 단서. 구매 수요는 별도 확인"
        ]
      ],
      "links": []
    },
    {
      "title": "MD 에이전트",
      "lead": "수집 현황·착장 자료·트렌드 리포트 조회를 한 대화 화면에서 시작합니다.",
      "image": "assets/mono-agent-v3.jpg",
      "rows": [
        [
          "실행 확인",
          "변경을 수반하는 작업은 실행 전 확인"
        ],
        [
          "구현 예정",
          "승인된 트렌드로 기획전 문구와 디자인 초안을 만드는 CRA"
        ]
      ],
      "links": []
    }
  ],
  "kucanto": [
    {
      "title": "쿠칸토 · 음성 AI 요리 코치",
      "lead": "레시피를 선택하면 재료를 확인하고 조리 단계를 음성으로 안내합니다.",
      "image": "assets/kucanto-home-v3.jpg",
      "rows": [
        [
          "기여",
          "2인 팀 · 재료 판정, 음성·화면 개선, 모델 비교"
        ],
        [
          "출발점",
          "요리 영상 16편 댓글 4,049건에서 사람이 검수한 대체 재료 질문 87건"
        ]
      ],
      "links": []
    },
    {
      "title": "재료 확인과 단계 안내",
      "lead": "음성과 카메라로 재료를 확인합니다. 확신이 낮으면 다시 비추도록 안내하고, 대체 재료는 규칙표에서 찾습니다.",
      "image": "assets/kucanto-step-v3.jpg",
      "rows": [
        [
          "설계",
          "조리 진행 순서는 코드가 유지하고, AI는 판정과 설명을 맡음"
        ]
      ],
      "links": []
    },
    {
      "title": "재료 판정 결과",
      "lead": "같은 410문항에서 정답률이 86%에서 92%로 개선됐습니다. 전체 1,459문항에서는 91.2%였습니다.",
      "image": "assets/kucanto_13.jpg",
      "rows": [
        [
          "사진 외부 전송",
          "API 호출 589회 → 61회"
        ],
        [
          "한계",
          "실사용자 완주율은 별도 측정하지 않음"
        ]
      ],
      "links": []
    }
  ],
  "tiniping": [
    {
      "title": "티니핑 판별기 · 사진 검색",
      "lead": "캐릭터 이름을 모를 때 장난감 사진으로 68종 중 이름을 찾습니다.",
      "image": "assets/tiniping_mockup.webp",
      "rows": [
        [
          "기여",
          "2인 팀 · 모델 선정·학습·평가, 자동 재학습"
        ],
        [
          "판정",
          "두 분류 결과가 다르면 이름 후보 3개 표시"
        ]
      ],
      "links": []
    },
    {
      "title": "장난감 사진 검증",
      "lead": "별도 장난감 사진 800장으로 확인했고, 정확도는 94.0%였습니다.",
      "image": "assets/tiniping_41.jpg",
      "rows": [
        [
          "오답 확정",
          "4,000회 중 1회"
        ],
        [
          "실사용자",
          "10명, 50회 과업 중 47회 성공"
        ]
      ],
      "links": [
        {
          "label": "프로젝트 코드",
          "url": "https://github.com/chunkyung02-boop/tinyping-character-recognition"
        }
      ]
    }
  ],
  "nolda": [
    {
      "title": "NOLDA · 취향 기반 여가 추천",
      "lead": "매번 조건을 고르는 대신 카드 내역과 사진으로 취향을 추정해 나들이 코스를 제안하는 시연용 서비스입니다.",
      "image": "assets/nolda_mockup.webp",
      "rows": [
        [
          "기여",
          "3인 팀 · 서비스 기획 및 UI/UX"
        ],
        [
          "범위",
          "서울 마포구 프로토타입"
        ]
      ],
      "links": []
    },
    {
      "title": "추천 설계의 변화",
      "lead": "반복 소비를 취향으로 오인한 사례를 확인했습니다. 평소와 다른 소비를 참고하고, 카드 내역 화면을 OCR로 읽는 방식을 시도했습니다.",
      "image": "assets/nolda-home-v3.jpg",
      "rows": [
        [
          "시연",
          "홈에서 지도와 추천 코스를 확인"
        ],
        [
          "한계",
          "카드 데이터 직접 연동과 추천 로직의 서비스 검증은 미완료"
        ]
      ],
      "links": []
    }
  ],
  "design-editor": [
    {
      "title": "Design Editor · 문서 편집기",
      "lead": "이력서 HTML과 PDF를 열어 글자 덩어리를 편집 가능한 요소로 나누는 개인 프로젝트입니다.",
      "image": "assets/editor.webp",
      "rows": [
        [
          "기술",
          "React · TypeScript · Vite · pdf.js"
        ],
        [
          "확인",
          "HTML 3쪽 72개, PDF 3쪽 75개 요소 분리"
        ]
      ],
      "links": []
    },
    {
      "title": "이미지에서 편집 요소 추출",
      "lead": "이미지 속 글자·그림·배경을 분리해 레이어 목록에서 확인하는 기능을 시험했습니다.",
      "image": "assets/editor.webp",
      "rows": [
        [
          "검증 범위",
          "이미지 1장으로 분리 동작 확인"
        ],
        [
          "남은 작업",
          "PPTX 표·차트 처리 및 PowerPoint 호환성 확인"
        ]
      ],
      "links": []
    }
  ]
};
window.PORTFOLIO_COVERS = {"mono": "assets/mono-home-v3.jpg", "kucanto": "assets/kucanto-home-v3.jpg", "tiniping": "assets/tiniping_mockup.webp", "nolda": "assets/nolda_mockup.webp", "design-editor": "assets/editor.webp"};
