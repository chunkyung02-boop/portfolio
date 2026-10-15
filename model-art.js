/* 모델 도감 그림 — 카드마다 '이 모델이 하는 일'을 한 장으로 보여 주는 그림 (id → SVG 안쪽 내용).
   그림판 크기 240×120 · 선은 흰색. 새 카드에 그림이 없으면 이모지가 대신 나와요.
   자주 쓰는 속성 : T = 글자 · F = 반투명 흰 채움 · D = 점선 */
(() => {
const T = 'fill="#fff" stroke="none" font-size="11" text-anchor="middle"';
const F = 'fill="rgba(255,255,255,.28)"';
const S = 'fill="#fff" stroke="none"';
const D = 'stroke-dasharray="4 4"';
const tree = (x, y, s = 1) => `<path d="M${x} ${y}l${14 * s} ${22 * s}h${-28 * s}z" ${F}/><path d="M${x} ${y + 22 * s}v${9 * s}"/>`;
const arrow = (x, y) => `<path d="M${x} ${y}h18m-6 -6l6 6l-6 6"/>`;
const dots = (pts, r = 4) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" ${S}/>`).join('');

window.MODEL_ART = {
 /* 질문을 따라 내려가는 나무 */
 'decision-tree': `<rect x="88" y="8" width="64" height="24" rx="6" ${F}/><text x="120" y="24" ${T}>나이 &gt; 30?</text>
  <path d="M104 32L64 54M136 32l40 22"/><text x="72" y="42" ${T}>예</text><text x="172" y="42" ${T}>아니오</text>
  <rect x="32" y="54" width="64" height="24" rx="6" ${F}/><text x="64" y="70" ${T}>소득 &gt; 3천?</text>
  <circle cx="176" cy="68" r="14" ${S} opacity=".9"/><text x="176" y="72" fill="#2b2550" stroke="none" font-size="11" text-anchor="middle">거절</text>
  <path d="M50 78L36 96M78 78l14 18"/>
  <circle cx="32" cy="106" r="11" ${S} opacity=".9"/><text x="32" y="110" fill="#2b2550" stroke="none" font-size="10" text-anchor="middle">승인</text>
  <circle cx="96" cy="106" r="11" ${S} opacity=".9"/><text x="96" y="110" fill="#2b2550" stroke="none" font-size="10" text-anchor="middle">거절</text>`,

 /* 나무 여러 그루의 다수결 */
 'random-forest': `${tree(30, 22)}${tree(74, 22)}${tree(118, 22)}
  <text x="30" y="72" ${T}>A</text><text x="74" y="72" ${T}>A</text><text x="118" y="72" ${T}>B</text>
  <path d="M16 80h116" ${D}/><text x="74" y="98" ${T}>다수결 2 : 1</text>
  ${arrow(150, 56)}<circle cx="204" cy="56" r="24" ${S} opacity=".92"/><text x="204" y="64" fill="#2b2550" stroke="none" font-size="24" text-anchor="middle">A</text>`,

 /* 앞 나무의 오답을 다음 나무가 줄여 감 */
 'catboost': `${tree(34, 12, .8)}${tree(112, 12, .8)}${tree(190, 12, .8)}${arrow(60, 26)}${arrow(138, 26)}
  <rect x="18" y="52" width="32" height="46" ${F}/><rect x="96" y="72" width="32" height="26" ${F}/><rect x="174" y="88" width="32" height="10" ${F}/>
  <path d="M10 98h212"/><text x="34" y="112" ${T}>오답 많음</text><text x="112" y="112" ${T}>줄어듦</text><text x="190" y="112" ${T}>거의 없음</text>`,

 /* 표 → 번개처럼 빠르게 → 확률 */
 'lightgbm': `<rect x="12" y="24" width="84" height="72" rx="6" ${F}/><path d="M12 42h84M12 60h84M12 78h84M40 24v72M68 24v72"/>
  <path d="M124 22l-16 40h14l-8 36l26 -46h-15l9 -30z" ${S}/>
  <path d="M158 84a34 34 0 0 1 68 0"/><path d="M192 84l18 -22" stroke-width="3"/><circle cx="192" cy="84" r="4" ${S}/>
  <text x="192" y="104" ${T} font-size="13">확률 0.87</text>`,

 /* 평점표의 빈칸(?) 채우기 */
 'svd': `<rect x="20" y="14" width="120" height="92" rx="6" ${F}/><path d="M20 37h120M20 60h120M20 83h120M50 14v92M80 14v92M110 14v92"/>
  <text x="35" y="30" ${T}>5</text><text x="95" y="30" ${T}>3</text><text x="65" y="53" ${T}>4</text><text x="125" y="53" ${T}>1</text>
  <text x="35" y="76" ${T}>2</text><text x="95" y="99" ${T}>5</text><text x="125" y="99" ${T}>4</text>
  <rect x="82" y="62" width="26" height="19" rx="4" ${S}/><text x="95" y="76" fill="#2b2550" stroke="none" font-size="13" text-anchor="middle">?</text>
  ${arrow(150, 60)}<text x="204" y="56" ${T} font-size="22">4.2</text><text x="204" y="74" ${T}>예상 평점</text>`,

 /* 손글씨 숫자 → 7 */
 'lenet5': `<rect x="18" y="14" width="92" height="92" rx="6" fill="rgba(0,0,0,.35)"/>
  <path d="M38 34h46l-24 54" stroke-width="9"/>
  <path d="M18 37h92M18 60h92M18 83h92M41 14v92M64 14v92M87 14v92" stroke-width="1" opacity=".35"/>
  ${arrow(124, 60)}<circle cx="194" cy="60" r="30" ${S} opacity=".92"/><text x="194" y="73" fill="#2b2550" stroke="none" font-size="36" text-anchor="middle">7</text>`,

 /* 층을 깊게 쌓고 마지막 층만 교체 */
 'vgg16': `<rect x="14" y="16" width="22" height="88" rx="4" ${F}/><rect x="44" y="26" width="22" height="68" rx="4" ${F}/><rect x="74" y="36" width="22" height="48" rx="4" ${F}/>
  <rect x="104" y="44" width="22" height="32" rx="4" ${F}/><rect x="134" y="50" width="22" height="20" rx="4" ${F}/>
  <text x="85" y="114" ${T}>미리 학습된 층 (얼림 ❄)</text>
  <rect x="176" y="30" width="50" height="60" rx="8" ${S}/><text x="201" y="56" fill="#2b2550" stroke="none" font-size="11" text-anchor="middle">마지막 층</text>
  <text x="201" y="74" fill="#2b2550" stroke="none" font-size="12" text-anchor="middle">교체</text><path d="M158 60h14"/>`,

 /* 지름길 연결 (Skip Connection) */
 'resnet34': `<rect x="16" y="58" width="36" height="34" rx="6" ${F}/><rect x="72" y="58" width="36" height="34" rx="6" ${F}/><rect x="132" y="58" width="36" height="34" rx="6" ${F}/><rect x="188" y="58" width="36" height="34" rx="6" ${F}/>
  <path d="M52 75h20M108 75h24M168 75h20"/>
  <path d="M34 58C34 18 150 18 150 58" stroke-width="3"/><path d="M144 50l6 8l6 -8" stroke-width="3"/>
  <path d="M90 58C90 30 206 30 206 58" ${D}/>
  <text x="92" y="16" ${T}>지름길 (건너뛰어 더하기)</text><text x="120" y="110" ${T}>층을 깊게 쌓아도 학습이 된다</text>`,

 /* 글 → 좌표, 뜻이 비슷하면 가깝다 */
 'embedding-3-small': `<rect x="10" y="18" width="78" height="22" rx="11" ${F}/><text x="49" y="33" ${T}>회의록 정리</text>
  <rect x="10" y="49" width="78" height="22" rx="11" ${F}/><text x="49" y="64" ${T}>미팅 요약</text>
  <rect x="10" y="80" width="78" height="22" rx="11" ${F}/><text x="49" y="95" ${T}>점심 메뉴</text>
  <path d="M112 12v96h118" opacity=".7"/>
  ${dots([[150, 40], [166, 50]], 6)}<path d="M150 40l16 10"/><circle cx="158" cy="45" r="20" ${D}/><text x="196" y="36" ${T}>뜻이 가까움</text>
  ${dots([[206, 88]], 6)}<text x="206" y="74" ${T}>멀다</text>`,

 /* 찾아낸 기록을 읽고 답변 쓰기 */
 'gpt-5-6-luna': `<rect x="12" y="40" width="40" height="52" rx="5" ${F}/><rect x="22" y="30" width="40" height="52" rx="5" ${F}/><rect x="32" y="20" width="40" height="52" rx="5" ${F}/>
  <path d="M40 34h24M40 44h24M40 54h16"/><text x="42" y="108" ${T}>과거 기록</text>
  ${arrow(86, 56)}
  <path d="M120 22h104a8 8 0 0 1 8 8v48a8 8 0 0 1 -8 8h-70l-16 14v-14h-18a8 8 0 0 1 -8 -8v-48a8 8 0 0 1 8 -8z" ${S} opacity=".92"/>
  <path d="M128 40h88M128 54h88M128 68h52" stroke="#2b2550" stroke-width="3"/><text x="196" y="108" ${T}>근거 있는 답변</text>`,

 /* 후보 장소 안에서 코스 짜기 */
 'gpt-5-mini': `<path d="M34 86C70 96 78 44 112 48S160 92 204 40" ${D} stroke-width="3"/>
  ${[[34, 86, 1], [112, 48, 2], [204, 40, 3]].map(([x, y, n]) => `<path d="M${x} ${y}c-16 -18 -14 -34 0 -34s16 16 0 34z" ${S}/><text x="${x}" y="${y - 16}" fill="#2b2550" stroke="none" font-size="12" text-anchor="middle">${n}</text>`).join('')}
  ${dots([[70, 30], [150, 96], [176, 78]], 4)}
  <text x="34" y="106" ${T}>카페</text><text x="112" y="70" ${T}>전시</text><text x="204" y="62" ${T}>맛집</text>
  <text x="120" y="16" ${T}>후보 안에서만 골라 순서 짜기</text>`,

 /* 사진 한 장 → 이름 + 확신도 */
 'siglip2-tiniping': `<rect x="14" y="12" width="96" height="96" rx="10" ${F}/>
  <circle cx="62" cy="66" r="26" ${S} opacity=".95"/><path d="M42 50l-6 -22l20 12M82 50l6 -22l-20 12" ${S} opacity=".95"/>
  <circle cx="53" cy="62" r="4" fill="#2b2550" stroke="none"/><circle cx="71" cy="62" r="4" fill="#2b2550" stroke="none"/><path d="M55 74q7 6 14 0" stroke="#2b2550"/>
  ${arrow(120, 60)}
  <rect x="148" y="30" width="82" height="26" rx="13" ${S}/><text x="189" y="48" fill="#2b2550" stroke="none" font-size="13" text-anchor="middle">이름 98%</text>
  <rect x="148" y="64" width="82" height="8" rx="4" ${F}/><rect x="148" y="64" width="80" height="8" rx="4" ${S}/>
  <rect x="148" y="80" width="82" height="8" rx="4" ${F}/><rect x="148" y="80" width="10" height="8" rx="4" ${S}/>`,

 /* 가장 가까운 5장이 투표 */
 'lda-knn': `${dots([[40, 30], [56, 22], [58, 42], [34, 48]], 5)}
  <g opacity=".55">${dots([[190, 84], [206, 96], [176, 100], [204, 72]], 5)}</g>
  <circle cx="122" cy="62" r="38" ${D}/>
  ${dots([[104, 44], [140, 46], [98, 72], [146, 76], [120, 92]], 5)}
  <path d="M122 50l4 8l9 1l-7 6l2 9l-8 -5l-8 5l2 -9l-7 -6l9 -1z" ${S}/>
  <text x="122" y="16" ${T}>가까운 5장이 투표</text><text x="40" y="70" ${T}>다른 캐릭터</text>`,

 /* 상품 설명 → 태그 */
 'gemini-flash-lite': `<rect x="14" y="20" width="84" height="80" rx="8" ${F}/><rect x="24" y="30" width="64" height="34" rx="5" ${S} opacity=".85"/>
  <path d="M24 76h64M24 88h40"/>
  ${arrow(108, 60)}
  ${[['#피규어', 24], ['#3기', 54], ['#선물', 84]].map(([t, y]) => `<path d="M140 ${y}h76a6 6 0 0 1 6 6v10a6 6 0 0 1 -6 6h-76l-10 -11z" ${S} opacity=".92"/><text x="180" y="${y + 15}" fill="#2b2550" stroke="none" font-size="11" text-anchor="middle">${t}</text>`).join('')}`,

 /* 사진 속 물건마다 상자 + 이름 + 신뢰도 */
 'yolo26n': `<path d="M6 104h228" opacity=".6"/>
  <circle cx="64" cy="34" r="9" ${S}/><path d="M64 43v30M64 52l-14 12M64 52l14 10M64 73l-12 28M64 73l12 28" stroke-width="3"/>
  <rect x="38" y="20" width="52" height="86" rx="3" stroke-width="2.5"/><rect x="38" y="6" width="68" height="14" ${S}/><text x="72" y="17" fill="#2b2550" stroke="none" font-size="10" text-anchor="middle">person 0.75</text>
  <circle cx="148" cy="88" r="15"/><circle cx="204" cy="88" r="15"/><path d="M148 88l16 -26h26l14 26M164 62l14 26h-30M190 62l-6 -10h10M160 54h10" />
  <rect x="126" y="44" width="100" height="62" rx="3" stroke-width="2.5"/><rect x="126" y="30" width="72" height="14" ${S}/><text x="162" y="41" fill="#2b2550" stroke="none" font-size="10" text-anchor="middle">bicycle 0.89</text>`,

 /* 개 · 고양이만 찾는 내 탐지기 */
 'yolo26n-catdog': `<circle cx="64" cy="66" r="24" ${S} opacity=".95"/><path d="M44 50q-14 4 -8 30q8 -2 10 -16zM84 50q14 4 8 30q-8 -2 -10 -16z" ${S}/>
  <circle cx="56" cy="62" r="3.5" fill="#2b2550" stroke="none"/><circle cx="72" cy="62" r="3.5" fill="#2b2550" stroke="none"/><ellipse cx="64" cy="72" rx="5" ry="3.5" fill="#2b2550" stroke="none"/>
  <rect x="26" y="34" width="76" height="68" rx="3" stroke-width="2.5"/><rect x="26" y="20" width="56" height="14" ${S}/><text x="54" y="31" fill="#2b2550" stroke="none" font-size="10" text-anchor="middle">dog 0.71</text>
  <circle cx="178" cy="68" r="22" ${S} opacity=".95"/><path d="M160 56l-2 -22l18 12M196 56l2 -22l-18 12" ${S}/>
  <circle cx="170" cy="66" r="3.5" fill="#2b2550" stroke="none"/><circle cx="186" cy="66" r="3.5" fill="#2b2550" stroke="none"/><path d="M174 76q4 4 8 0" stroke="#2b2550"/>
  <rect x="142" y="34" width="72" height="68" rx="3" stroke-width="2.5" ${D}/><rect x="142" y="20" width="30" height="14" ${S}/><text x="157" y="31" fill="#2b2550" stroke="none" font-size="10" text-anchor="middle">cat ?</text>`
};
})();

/* ── 포트폴리오에서 새로 그린 그림 (Vision 9종) — 위와 같은 규칙 ── */
(() => {
const T = 'fill="#fff" stroke="none" font-size="11" text-anchor="middle"';
const F = 'fill="rgba(255,255,255,.28)"';
const S = 'fill="#fff" stroke="none"';
const D = 'stroke-dasharray="4 4"';
const arrow = (x, y) => `<path d="M${x} ${y}h18m-6 -6l6 6l-6 6"/>`;
const blob = (dx = 0, dy = 0, extra = '') => `<path d="M${40 + dx} ${92 + dy}c-6 -20 2 -40 16 -44c4 -14 22 -16 28 -4c14 2 20 22 12 34c6 10 0 18 -10 16z" ${extra}/>`;
const face = (x, y) => `<circle cx="${x}" cy="${y}" r="22" ${F}/><circle cx="${x - 8}" cy="${y - 4}" r="2.5" ${S}/><circle cx="${x + 8}" cy="${y - 4}" r="2.5" ${S}/><path d="M${x - 8} ${y + 8}q8 6 16 0"/>`;
const bar = (x, y, w, full, label) => `<rect x="${x}" y="${y}" width="${full}" height="8" rx="4" ${F}/><rect x="${x}" y="${y}" width="${w}" height="8" rx="4" ${S}/><text x="${x - 6}" y="${y + 8}" fill="#fff" stroke="none" font-size="10" text-anchor="end">${label}</text>`;

Object.assign(window.MODEL_ART, {
 /* 물건을 모양대로 오려 내기 */
 'yolo26n-seg': `<rect x="12" y="14" width="104" height="92" rx="6" ${F}/>${blob(0, 0, 'fill="rgba(255,255,255,.55)"')}
  <text x="64" y="30" ${T}>사진</text>${arrow(124, 60)}
  ${blob(130, 0, 'fill="#fff" stroke="none"')}<text x="196" y="112" ${T}>모양 그대로</text>`,

 /* 종류 상관없이 전부 오려 내기 */
 'fastsam-s': `<rect x="12" y="12" width="216" height="96" rx="6" ${F}/>
  <path d="M24 96c0 -30 30 -40 40 -20s-10 30 -40 20z" fill="rgba(255,255,255,.5)"/>
  <rect x="78" y="24" width="40" height="34" rx="4" fill="rgba(255,255,255,.5)"/>
  <circle cx="148" cy="70" r="20" fill="rgba(255,255,255,.5)"/>
  <path d="M182 30l30 8l-6 30l-28 -6z" fill="rgba(255,255,255,.5)"/>
  <rect x="90" y="72" width="30" height="24" rx="3" fill="rgba(255,255,255,.5)"/>
  <text x="120" y="118" ${T}>보이는 건 전부 조각으로</text>`,

 /* 글로 말하면 그것만 */
 'sam3': `<rect x="10" y="44" width="70" height="30" rx="15" ${S}/><text x="45" y="64" fill="#2b2550" stroke="none" font-size="12" text-anchor="middle">“고양이”</text>
  ${arrow(88, 59)}
  <rect x="116" y="12" width="114" height="96" rx="6" ${F}/>
  <path d="M136 92c-4 -18 4 -30 14 -32l-2 -14l10 10h10l10 -10l-2 14c10 2 18 14 14 32z" fill="#fff" stroke="none"/>
  <rect x="196" y="26" width="24" height="30" rx="3" ${D}/><circle cx="214" cy="86" r="10" ${D}/>
  <text x="208" y="118" ${T}>나머지는 무시</text>`,

 /* 사진 ↔ 글 비교, 합이 1 (softmax) */
 'clip': `<rect x="12" y="24" width="72" height="72" rx="6" ${F}/><path d="M24 84l18 -24l14 16l10 -10l14 18z" ${S} opacity=".9"/><circle cx="64" cy="42" r="7" ${S}/>
  ${arrow(92, 60)}
  ${bar(170, 34, 34, 60, '앉아 있다')}${bar(170, 56, 18, 60, '서 있다')}${bar(170, 78, 8, 60, '누워 있다')}
  <text x="176" y="108" ${T}>세 개 합 = 1</text>`,

 /* 사진 ↔ 글, 하나씩 따로 판단 (sigmoid) */
 'siglip2-zeroshot': `<rect x="12" y="24" width="72" height="72" rx="6" ${F}/><path d="M24 84l18 -24l14 16l10 -10l14 18z" ${S} opacity=".9"/><circle cx="64" cy="42" r="7" ${S}/>
  ${arrow(92, 60)}
  ${bar(170, 34, 52, 60, '고양이')}${bar(170, 56, 44, 60, '실내')}${bar(170, 78, 6, 60, '자동차')}
  <text x="176" y="108" ${T}>하나씩 예 / 아니오</text>`,

 /* 손 관절 21점 — 손 모양 위에 관절 점 */
 'mediapipe-hand': `<g stroke="rgba(255,255,255,.22)" stroke-width="15">
   <path d="M104 64L98 24M120 60V18M136 62l6 -38M150 72l12 -30M106 92L80 66"/></g>
  <path d="M100 64h52l-2 30q-4 16 -26 16q-20 0 -24 -16z" fill="rgba(255,255,255,.22)" stroke="none"/>
  <path d="M124 104L106 92L84 70M124 104L104 64L100 44L98 26M124 104L120 60V40V20M124 104L136 62L139 44L142 26M124 104L150 72L156 56L161 42"/>
  ${[[124,104],[106,92],[95,81],[84,70],[104,64],[101,45],[98,26],[120,60],[120,40],[120,20],[136,62],[139,44],[142,26],[150,72],[156,56],[161,42],[113,90],[132,90]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3.5" ${S}/>`).join('')}
  <text x="44" y="52" ${T}>21점</text><text x="44" y="68" ${T}>좌표</text><text x="204" y="112" ${T}>x · y · z</text>`,

 /* 사진 속 글자 찾기 — 기울면 약함 */
 'easyocr': `<g transform="rotate(-8 70 60)"><rect x="18" y="34" width="104" height="52" rx="4" ${F}/><text x="70" y="66" ${T} font-size="18">WIFI 5G</text>
  <rect x="26" y="46" width="88" height="28" ${D}/></g>
  ${arrow(136, 60)}<rect x="164" y="42" width="66" height="36" rx="18" ${S}/><text x="197" y="64" fill="#2b2550" stroke="none" font-size="12" text-anchor="middle">“WIFI 5G”</text>
  <text x="197" y="100" ${T}>기울면 흔들림</text>`,

 /* 회전 보정 + 문서 구조 나누기 */
 'paddleocr-ppocrv5': `<rect x="20" y="10" width="80" height="100" rx="4" ${F}/>
  <rect x="28" y="18" width="64" height="12" ${S}/><path d="M28 40h64M28 48h64M28 56h46"/><rect x="28" y="66" width="64" height="34" ${D}/>
  <path d="M28 77h64M28 88h64M50 66v34M72 66v34" opacity=".6"/>
  ${arrow(110, 60)}
  <text x="186" y="30" ${T}>제목</text><text x="186" y="52" ${T}>본문</text><text x="186" y="88" ${T}>표</text>
  <path d="M150 26h14M150 48h14M150 84h14"/>`,

 /* 얼굴 → 숫자 → 같은 사람? */
 'deepface-arcface': `${face(34, 38)}${face(34, 86)}
  <path d="M60 38h18M60 86h18"/>
  <rect x="80" y="27" width="78" height="22" rx="4" ${F}/><text x="119" y="42" ${T} font-size="10">0.12 · 0.83 · …</text>
  <rect x="80" y="75" width="78" height="22" rx="4" ${F}/><text x="119" y="90" ${T} font-size="10">0.15 · 0.80 · …</text>
  <path d="M158 38l14 16M158 86l14 -16"/>
  <circle cx="200" cy="62" r="28" ${S} opacity=".95"/><text x="200" y="60" fill="#2b2550" stroke="none" font-size="11" text-anchor="middle">거리 0.57</text><text x="200" y="74" fill="#2b2550" stroke="none" font-size="11" text-anchor="middle">같은 사람</text>
  <text x="119" y="116" ${T}>얼굴 → 숫자 512개로 비교</text>`,
});
})();

/* ── 포트폴리오에서 새로 그린 그림 (Audio 5종 · LLM 1종) ── */
(() => {
const T = 'fill="#fff" stroke="none" font-size="11" text-anchor="middle"';
const F = 'fill="rgba(255,255,255,.28)"';
const S = 'fill="#fff" stroke="none"';
const K = 'fill="#2b2550" stroke="none" font-size="11" text-anchor="middle"';
const arrow = (x, y) => `<path d="M${x} ${y}h18m-6 -6l6 6l-6 6"/>`;
// 소리 파형 (막대 높이 목록)
const wave = (x, y, hs = [8, 18, 30, 14, 24, 36, 20, 10, 26, 16, 8]) => hs.map((h, i) => `<path d="M${x + i * 7} ${y - h / 2}v${h}" stroke-width="3"/>`).join('');
const lines = (x, y, n, w = 70) => Array.from({ length: n }, (_, i) => `<path d="M${x} ${y + i * 14}h${i === n - 1 ? w * .6 : w}"/>`).join('');
const speaker = (x, y) => `<path d="M${x} ${y - 10}h10l14 -12v44l-14 -12h-10z" ${S}/><path d="M${x + 32} ${y - 8}q8 8 0 16M${x + 40} ${y - 16}q16 16 0 32"/>`;

Object.assign(window.MODEL_ART, {
 /* 목소리 → 글자 (내 PC에서) */
 'whisper-small': `${wave(14, 60)}${arrow(96, 60)}
  <rect x="126" y="34" width="102" height="52" rx="6" ${F}/>${lines(136, 50, 3, 80)}
  <text x="50" y="104" ${T}>목소리</text><text x="177" y="104" ${T}>글자 · 내 PC에서</text>`,

 /* 목소리 → 시간표가 붙은 글자 */
 'faster-whisper-large-v3': `${wave(14, 60)}${arrow(96, 60)}
  <rect x="126" y="22" width="102" height="76" rx="6" ${F}/>
  <text x="146" y="42" ${T} font-size="9">00:01</text><path d="M164 39h52"/>
  <text x="146" y="62" ${T} font-size="9">00:04</text><path d="M164 59h44"/>
  <text x="146" y="82" ${T} font-size="9">00:07</text><path d="M164 79h50"/>
  <text x="177" y="114" ${T}>시간표까지 받아 적기</text>`,

 /* 목소리 → 클라우드 API → 글자 */
 'gpt-4o-mini-transcribe': `${wave(10, 60, [8, 20, 30, 16, 26, 12, 6])}${arrow(62, 60)}
  <path d="M100 76a14 14 0 0 1 2 -28a20 20 0 0 1 38 -4a14 14 0 0 1 4 32z" ${S}/><text x="122" y="68" ${K}>API</text>
  ${arrow(152, 60)}<rect x="180" y="40" width="50" height="40" rx="6" ${F}/>${lines(188, 54, 2, 34)}
  <text x="122" y="104" ${T}>보내면 글자로 돌려줌</text>`,

 /* 글자 → 원하는 말투의 목소리 */
 'gpt-4o-mini-tts': `<path d="M14 30h80a6 6 0 0 1 6 6v36a6 6 0 0 1 -6 6h-56l-12 12v-12h-12a6 6 0 0 1 -6 -6v-36a6 6 0 0 1 6 -6z" ${F}/>${lines(26, 46, 2, 60)}
  ${arrow(110, 56)}${speaker(144, 56)}
  <rect x="160" y="88" width="60" height="20" rx="10" ${S}/><text x="190" y="102" ${K}>말투 지정</text>`,

 /* 내 GPU에서 목소리 고르기 · 만들기 · 따라 하기 */
 'qwen3-tts-1.7b': `<rect x="14" y="40" width="56" height="40" rx="6" ${F}/>${lines(22, 54, 2, 40)}
  ${arrow(78, 60)}
  <rect x="106" y="38" width="44" height="44" rx="4" ${S}/><text x="128" y="64" ${K} font-size="12">GPU</text>
  <path d="M114 38v-8M128 38v-8M142 38v-8M114 82v8M128 82v8M142 82v8"/>
  ${arrow(158, 60)}${wave(184, 60, [10, 22, 34, 18, 28, 12])}
  <text x="128" y="112" ${T}>고르기 · 만들기 · 따라 하기</text>`,

 /* 음성 비서의 대답 (질문 → 대답) */
 'gpt-5-4-nano': `<rect x="20" y="30" width="18" height="30" rx="9" ${S}/><path d="M14 50a15 15 0 0 0 30 0M29 65v10M21 75h16"/>
  ${arrow(54, 50)}
  <path d="M86 22h80a6 6 0 0 1 6 6v20a6 6 0 0 1 -6 6h-80a6 6 0 0 1 -6 -6v-20a6 6 0 0 1 6 -6z" ${F}/><text x="126" y="42" ${T}>오늘 날씨 어때?</text>
  <path d="M146 64h80a6 6 0 0 1 6 6v20a6 6 0 0 1 -6 6h-80a6 6 0 0 1 -6 -6v-20a6 6 0 0 1 6 -6z" ${S}/><text x="186" y="84" ${K}>맑고 22도예요</text>
  <text x="60" y="108" ${T}>짧고 빠른 대답</text>`,
});
})();
