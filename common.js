// 메뉴/페이지를 data.js 내용으로 자동 생성
const PAGES = { portfolio: "portfolio.html", experience: "experience.html", models: "models.html", more: "more.html" };
const current = document.body.dataset.page;

// 3-A) Archive: 다크 모드 · 글마다 펼쳐 보는 기록 (Dev Archive 내보내기)
function escA(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function brA(s) { return escA(s).replace(/\n/g, "<br>"); }
function arcBlockHTML(b) {
  if (b.t === "field") return `<div class="af"><b>${escA(b.label)}</b><p>${brA(b.text)}</p></div>`;
  if (b.t === "p") return `<p class="ap">${brA(b.text)}</p>`;
  if (b.t === "ol" || b.t === "ul") {
    let li = "";
    for (const t of b.items) li += `<li>${brA(t)}</li>`;
    return `<${b.t} class="al-list">${li}</${b.t}>`;
  }
  if (b.t === "table") {
    let th = "";
    for (const h of b.head) th += `<th>${brA(h)}</th>`;
    let tr = "";
    for (const r of b.rows) {
      let td = "";
      for (const cell of r) td += `<td>${brA(cell)}</td>`;
      tr += `<tr>${td}</tr>`;
    }
    return `<div class="at-wrap"><table class="at"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
  }
  if (b.t === "loop") {
    let dl = "";
    for (const [k, v] of b.pairs) dl += `<div><dt>${escA(k)}</dt><dd>${brA(v)}</dd></div>`;
    return `<div class="aloop"><span>${escA(b.label)}</span><dl>${dl}</dl></div>`;
  }
  return "";
}
function archiveHTML(sec) {
  let rows = "";
  let n = 1;
  for (const it of sec.items) {
    let body = it.note ? `<p class="anote">${escA(it.note)}</p>` : "";
    for (const s of it.sections) {
      let inner = "";
      for (const b of s.blocks) inner += arcBlockHTML(b);
      body += `<section class="asec"><h4>${escA(s.title)}</h4><div>${inner}</div></section>`;
    }
    let tags = "";
    for (const t of it.tags) tags += `<span>#${escA(t)}</span>`;
    rows += `
      <article class="arc reveal" id="${it.id}">
        <button class="arc-head" type="button" aria-expanded="false">
          <span class="arc-meta"><i>${String(n).padStart(2, "0")}</i><span>${escA(it.date)}</span><span>${escA(it.type)}</span><em>${escA(it.status)}</em></span>
          <span class="arc-main"><h3>${escA(it.title)}</h3><p>${brA(it.summary)}</p><span class="arc-tags">${tags}</span></span>
          <span class="arc-plus" aria-hidden="true"></span>
        </button>
        <div class="arc-body"><div class="arc-body-in">${body}</div></div>
      </article>`;
    n += 1;
  }
  return `
    <section class="page-head wrap">
      <p class="eyebrow reveal">${sec.eyebrow}</p>
      <h1 class="mask"><span>${sec.label}</span></h1>
      <p class="reveal">${sec.desc}</p>
    </section>
    <section class="wrap arcs">${rows}</section>`;
}

const sec = current === "project" ? DATA.portfolio : DATA[current];   // 홈이면 undefined, 프로젝트 상세는 포트폴리오 정보 사용

// 0) 배경: 대각선 색 띠 + 색 속에 섞인 필름 입자 (그레이니 그라데이션)
//    캔버스에 색 번짐을 그린 뒤, 픽셀마다 밝기를 조금씩 무작위로 흔들어 '자글자글한' 질감을 만듦
//    페이지마다 색이 달라서 이동하면 배경이 바뀜
const bandColors = sec ? sec.aurora : PROFILE.aurora;
document.body.insertAdjacentHTML("afterbegin", `<div class="bg"><canvas class="bg-canvas"></canvas></div>`);

const GRAIN = 16;   // 입자 세기 (0 = 없음 · 30 이상 = 거칠게)

function drawBackground() {
  const canvas = document.querySelector(".bg-canvas");
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  // 바탕 미색
  ctx.fillStyle = "#fbfaf8";
  ctx.fillRect(0, 0, w, h);

  // 비스듬한 색 띠 2개 (위쪽 옅은 띠 + 가운데 진한 띠) — 흐리게 번지도록 blur
  const bands = [
    { y: -0.05, height: 0.38, angle: -10, alpha: 0.32 },
    { y: 0.22, height: 0.56, angle: -16, alpha: 0.7 },   // alpha = 색 진하기 (낮을수록 밝음)
  ];
  ctx.filter = "blur(55px) saturate(1.3)";   // 번지게 + 채도 30% 올려 맑게
  for (const b of bands) {
    ctx.save();
    ctx.globalAlpha = b.alpha;
    ctx.translate(w / 2, h * (b.y + b.height / 2));
    ctx.rotate(b.angle * Math.PI / 180);
    const bw = w * 1.7;
    const bh = h * b.height;
    const g = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
    let ci = 0;
    for (const color of bandColors) {
      g.addColorStop(ci / (bandColors.length - 1), color);
      ci += 1;
    }
    ctx.fillStyle = g;
    ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
    ctx.restore();
  }
  ctx.filter = "none";

  // 필름 입자: 레퍼런스처럼 진한 색일수록 입자가 강하고, 밝은 곳은 약하게
  const img = ctx.getImageData(0, 0, w, h);
  const px = img.data;
  for (let i = 0; i < px.length; i += 4) {
    const light = (px[i] + px[i + 1] + px[i + 2]) / 765;          // 0(어두움) ~ 1(밝음)
    const amount = GRAIN * (0.25 + 0.75 * (1 - light) * 1.6);     // 밝을수록 약하게
    const n = (Math.random() + Math.random() - 1) * amount;       // 가운데 값이 많은 고운 입자
    px[i] += n;
    px[i + 1] += n;
    px[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
}
drawBackground();

// 창 크기가 바뀌면 다시 그리기 (잠깐 멈췄을 때 한 번만)
let resizeTimer = 0;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(drawBackground, 200);
});

// 1) 상단 메뉴 + 호버 시 펼쳐지는 미리보기 목록 (모든 페이지에서 위치·크기 동일)
let nav = "";
for (const [key, url] of Object.entries(PAGES)) {
  const s = DATA[key];
  let list = "";
  if (s.groupOrder) {
    // 모델처럼 항목이 많으면 그룹 이름만 (예: Vision 15)
    for (const g of s.groupOrder) {
      let count = 0;
      for (const it of s.items) {
        if (it.group === g) count += 1;
      }
      list += `<li><a href="${url}#g-${g}">${g} <span class="count">${count}</span></a></li>`;
    }
  } else {
    for (const it of s.items) {
      // 포트폴리오는 프로젝트 상세 페이지로, 나머지는 해당 위치로
      const href = key === "portfolio" ? `project.html?id=${it.id}` : `${url}#${it.id}`;
      list += `<li><a href="${href}">${it.title}</a></li>`;
    }
  }
  nav += `
    <li class="nav-item ${current === key || (current === "project" && key === "portfolio") ? "active" : ""}">
      <a class="nav-link" href="${url}">${s.label}<i class="nav-bar"></i></a>
      <div class="dropdown"><div><ul>${list}</ul></div></div>
    </li>`;
}
// 오른쪽 끝 칸: GitHub · Email (레퍼런스의 도시 목록 자리)
let contact = "";
for (const [label, url] of PROFILE.buttons.slice(1)) contact += `<a href="${url}" target="_blank">${label}</a>`;

document.getElementById("header").innerHTML = `
  <div class="header-inner">
    <a class="logo" href="index.html">${PROFILE.nameEn}</a>
    <ul class="nav">${nav}</ul>
    <div class="contact">${contact}</div>
  </div>`;

document.getElementById("footer").innerHTML = `
  <div class="wrap">© 2026 ${PROFILE.name} · <a href="mailto:${PROFILE.email}">${PROFILE.email}</a> · <a href="${PROFILE.github}" target="_blank">GitHub</a></div>`;

// 2-0) 모델 이미지 타일 (모두 같은 스타일의 선 그림 — model-art.js)
function tileHTML(it, n) {
  const num = String(n).padStart(2, "0");
  const art = (window.MODEL_ART || {})[it.dex];
  const visual = art
    ? `<svg viewBox="0 0 240 120" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${art}</svg>`
    : "";

  // 큰 숫자 2개
  let keys = "";
  for (const [k, v] of it.key || []) keys += `<div><strong>${v}</strong><span>${k}</span></div>`;

  // 펼치면 보이는 설명 · 사용처 · 한계 (+ 사진 출처)
  let rows = "";
  for (const k of ["설명", "사용처", "한계"]) {
    if (it.card && it.card[k]) rows += `<div class="spec"><dt>${k}</dt><dd>${it.card[k]}</dd></div>`;
  }

  return `
    <article class="tile reveal" id="${it.id}" data-how="${it.period || ""}">
      <div class="tile-img">${visual}</div>
      <div class="tile-meta"><span class="num">${num}</span><span>${it.period || ""}</span></div>
      <h3>${it.title}</h3>
      <p class="summary">${it.summary || ""}</p>
      <div class="tile-key">${keys}</div>
      <details><summary>자세히</summary><dl class="specs">${rows}</dl></details>
    </article>`;
}

// 2) 항목 한 줄(행) 그리기 — 박스 없이 텍스트 + 얇은 구분선
//    왼쪽: 번호·제목·기간 / 오른쪽: 내용 (데이터 종류에 따라 3가지)
function rowHTML(it, n) {
  const num = String(n).padStart(2, "0");

  let body = "";
  if (it.lines) {
    // 경험·+α: 한 줄씩 나열
    let lis = "";
    for (const line of it.lines) lis += `<li>${line}</li>`;
    body = `<ul class="lines">${lis}</ul>`;
  } else if (it.card) {
    // 모델 카드: 항목명 | 값
    let rows = "";
    for (const [k, v] of Object.entries(it.card)) rows += `<div class="spec"><dt>${k}</dt><dd>${v}</dd></div>`;
    body = `<p class="summary">${it.summary || ""}</p><dl class="specs">${rows}</dl>`;
  } else {
    // 포트폴리오: 요약 + 한 줄씩 + 사용 기술
    let lis = "";
    for (const d of it.details || []) lis += `<li>${d}</li>`;
    body = `<p class="summary">${it.summary || ""}</p><ul class="lines">${lis}</ul>`;
    if (it.link) body += `<a class="more-link" href="${it.link}" target="_blank">View project ↗</a>`;
  }

  const stack = (it.tags || []).join(" / ");

  return `
    <article class="row reveal" id="${it.id}" data-how="${it.period || ""}">
      <div class="row-meta">
        <span class="num">${num}</span>
        <h3>${it.title}</h3>
        ${it.period ? `<span class="period">${it.period}</span>` : ""}
        ${stack ? `<span class="stack">${stack}</span>` : ""}
      </div>
      <div class="row-body">${body}</div>
    </article>`;
}

// 2-1) 포트폴리오 한 줄: 왼쪽 정사각형 썸네일 + 오른쪽 3줄 (설명 · 문제 · 해결)
function projRowHTML(it, n) {
  const num = String(n).padStart(2, "0");
  let tags = "";
  for (const t of it.tags || []) {
    tags += `<span>${t}</span>`;
  }

  return `
    <article class="proj reveal" id="${it.id}">
      <a class="proj-img" href="project.html?id=${it.id}">
        <img src="${it.thumb}" alt="${it.title}" loading="lazy" style="object-position:${it.thumbPos || "center"}">
      </a>
      <div class="proj-info">
        <p class="proj-num">Project ${num} · ${it.period || ""}</p>
        <h3><a href="project.html?id=${it.id}">${it.title}</a></h3>
        <p class="proj-sum">${it.summary || ""}</p>
        <dl class="proj-lines">
          <dt>Problem</dt><dd>${it.problemLine || ""}</dd>
          <dt>Solution</dt><dd>${it.solveLine || ""}</dd>
        </dl>
        <div class="proj-foot">
          <div class="proj-tags">${tags}</div>
          <a class="proj-more" href="project.html?id=${it.id}">자세히 보기 →</a>
        </div>
      </div>
    </article>`;
}

// 2-2) 프로젝트 상세 페이지 (project.html?id=nolda)
//      목차(DETAIL[id]) 순서대로 섹션을 만들고, 맨 위에 Contents 목록을 붙임

// 섹션 하나의 본문 — type 별로 시각화 방식이 다름
function blockBody(b, it, d) {
  const lead = b.lead ? `<p class="lead-text reveal">${b.lead}</p>` : "";

  // 개요: 기간 · 팀 · 역할 · 기술 4칸
  if (b.type === "overview") {
    const overview = [["기간", it.period], ["팀", d.team], ["내 역할", d.role], ["기술", (it.tags || []).join(" / ")]];
    let ov = "";
    for (const [k, v] of overview) ov += `<div><span>${k}</span><b>${v || "—"}</b></div>`;
    return `<div class="strip reveal">${ov}</div>`;
  }

  // 문단: key 가 있으면 detail 의 그 값을 씀
  if (b.type === "text") {
    return `<p class="lead-text reveal">${b.key ? d[b.key] || "" : b.text || ""}</p>`;
  }

  // 항목 목록: 번호 + 한 줄씩
  if (b.type === "list") {
    let rows = "";
    let n = 1;
    for (const t of b.items) {
      rows += `<li><span class="num">${String(n).padStart(2, "0")}</span>${t}</li>`;
      n += 1;
    }
    return `${lead}<ol class="vlist reveal">${rows}</ol>`;
  }

  // 사진 여러 장: cols 칸 격자, 누르면 원본
  if (b.type === "images") {
    let cells = "";
    for (const [src, cap] of b.items) {
      // .mp4 는 GIF처럼 소리 없이 자동 반복 재생 (GIF보다 용량이 약 1/10)
      const media = src.endsWith(".mp4")
        ? `<video src="${src}" poster="${src.replace(".mp4", ".jpg")}" autoplay muted loop playsinline preload="metadata"></video>`
        : `<img src="${src}" alt="${cap || ""}" loading="lazy">`;
      cells += `<figure><a href="${src}" target="_blank">${media}</a>${cap ? `<figcaption>${cap}</figcaption>` : ""}</figure>`;
    }
    return `<div class="vimgs reveal ${b.ratio ? "fixed" : ""}" style="--cols:${b.cols || 3};--ratio:${b.ratio || "auto"}">${cells}</div>`;   // ratio: 같은 줄 사진 높이 맞춤 (예: "1/1")
  }

  // 왼쪽 그림 + 오른쪽 내용 여러 개
  if (b.type === "split") {
    let right = "";
    for (const r of b.right) right += blockHTML(r, it, d);
    return `<div class="vsplit"><div>${blockHTML(b.left, it, d)}</div><div class="vsplit-right">${right}</div></div>`;
  }

  // 영상: 누르면 재생 (자동 재생 없음)
  if (b.type === "video") {
    return `<figure class="vvideo reveal"><video src="${b.src}" poster="${b.poster || ""}" controls preload="none" playsinline></video>${b.caption ? `<figcaption>${b.caption}</figcaption>` : ""}</figure>`;
  }

  // 큰 숫자 띠
  if (b.type === "stats" || b.type === "results") {
    const items = b.type === "results" ? d.results || [] : b.items;
    let cells = "";
    for (const [value, label] of items) cells += `<div><b>${value}</b><span>${label}</span></div>`;
    return `${lead}<div class="strip big reveal">${cells}</div>`;
  }

  // 단계 흐름: 가로 선 위 점 + 번호 + 제목 + 설명
  if (b.type === "flow") {
    let steps = "";
    let n = 1;
    for (const [title, desc] of b.steps) {
      steps += `<li><i></i><span class="num">${String(n).padStart(2, "0")}</span><b>${title}</b><p>${desc}</p></li>`;
      n += 1;
    }
    return `${lead}<ol class="vflow reveal" style="--n:${b.steps.length}">${steps}</ol>`;
  }

  // 막대 그래프: 라벨 | 막대 | 값  (강조 항목은 진한 색)
  if (b.type === "bars") {
    let rows = "";
    const min = b.min || 0;   // 차이가 작을 때 눈금 시작점을 올려 확대 (예: 80~100%)
    for (const [label, value, note, hi] of b.items) {
      const w = Math.max((value - min) / (b.max - min) * 100, 1.5);
      const shown = b.digits != null ? value.toFixed(b.digits) : value.toLocaleString("ko-KR");
      rows += `
        <div class="vbar ${hi ? "hi" : ""}">
          <span class="vbar-label">${label}</span>
          <div class="vbar-track"><i style="width:${w}%"></i></div>
          <span class="vbar-value"><b>${shown}${b.unit}</b>${note ? `<em>${note}</em>` : ""}</span>
        </div>`;
    }
    const scale = min ? `<p class="vbar-scale">눈금 ${min}~${b.max}${b.unit} 확대</p>` : "";
    return `${lead}<div class="vbars reveal">${rows}</div>${scale}`;
  }

  // 비교표: highlight 번째 열을 강조
  if (b.type === "table") {
    let head = "";
    let col = 0;
    for (const h of b.head) {
      head += `<th class="${col === b.highlight ? "hi" : ""}">${h}</th>`;
      col += 1;
    }
    let rows = "";
    for (const r of b.rows) {
      let cells = "";
      let c = 0;
      for (const v of r) {
        const tag = c === 0 ? "th" : "td";
        cells += `<${tag} class="${c === b.highlight ? "hi" : ""}">${v}</${tag}>`;
        c += 1;
      }
      rows += `<tr>${cells}</tr>`;
    }
    return `${lead}<div class="vtable-wrap reveal"><table class="vtable"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  // 대시보드: 왼쪽 실제 화면 캡처(누르면 원본) + 오른쪽 핵심 기능 번호 목록
  if (b.type === "dashboard") {
    let shots = "";
    for (const sh of b.shots) {
      let points = "";
      let n = 1;
      for (const pt of sh.points) {
        points += `<li><span class="num">${String(n).padStart(2, "0")}</span>${pt}</li>`;
        n += 1;
      }
      shots += `
        <div class="vdash reveal">
          <a class="vdash-img" href="${sh.src}" target="_blank"><img src="${sh.src}" alt="${sh.title}" loading="lazy"><span>크게 보기 +</span></a>
          <div class="vdash-info"><h4>${sh.title}</h4><ol>${points}</ol></div>
        </div>`;
    }
    return `${lead}${shots}`;
  }

  // 구조도: 층(layer)마다 이름 + 구성 요소, 층 사이는 ↓  (image 가 있으면 실제 구조도 이미지를 먼저 보여 줌)
  if (b.type === "arch") {
    let layers = "";
    for (const [name, nodes] of b.layers) {
      let cells = "";
      for (const node of nodes) cells += `<span>${node}</span>`;
      layers += `<div class="layer"><em>${name}</em><div class="nodes">${cells}</div></div>`;
    }
    const img = b.image ? `<a class="varch-img reveal" href="${b.image}" target="_blank"><img src="${b.image}" alt="아키텍처" loading="lazy"></a>` : "";
    return `${lead}${img}<div class="varch reveal">${layers}</div>`;
  }

  // 판정 규칙: 입력 두 갈래 → 조건 → 예 / 아니오
  if (b.type === "branch") {
    let inputs = "";
    for (const [k, v] of b.inputs) inputs += `<div><em>${k}</em><span>${v}</span></div>`;
    return `${lead}
      <div class="vbranch reveal">
        <div class="vb-inputs">${inputs}</div>
        <div class="vb-cond"><em>IF</em>${b.cond}</div>
        <div class="vb-out">
          <div class="yes"><em>YES</em>${b.yes}</div>
          <div class="no"><em>NO</em>${b.no}</div>
        </div>
      </div>`;
  }

  // 고민 사례: 문제 → 고민 → 해결 → 결과
  if (b.type === "stories") {
    let stories = "";
    let sn = 1;
    for (const st of d.stories || []) {
      const steps = [["문제", st.problem], ["고민", st.think], ["해결", st.solve], ["결과", st.result]];
      let rows = "";
      for (const [k, v] of steps) rows += `<div class="spec"><dt>${k}</dt><dd>${v}</dd></div>`;
      stories += `
        <div class="story reveal">
          <span class="num">${String(sn).padStart(2, "0")}</span>
          <h4>${st.title}</h4>
          <dl class="specs">${rows}</dl>
        </div>`;
      sn += 1;
    }
    return stories;
  }

  // 링크: 둥근 버튼, 주소가 비어 있으면 '준비 중'
  if (b.type === "links") {
    let links = "";
    for (const [label, url] of d.links || []) {
      links += url
        ? `<a class="pill" href="${url}" target="_blank">${label} <span>↗</span></a>`
        : `<span class="pill off">${label} <span>준비 중</span></span>`;
    }
    return `<div class="pills reveal">${links}</div>`;
  }
  return "";
}

// 섹션 안의 블록 하나 = 작은 제목(title) + 본문
function blockHTML(b, it, d) {
  const title = b.title ? `<p class="blk-title">${b.title}</p>` : "";
  return `<div class="blk">${title}${blockBody(b, it, d)}</div>`;
}

// A안: 왼쪽 고정 단계 목록 + 오른쪽 단계별 본문 (DETAIL[id].steps 가 있을 때)
function stepsHTML(steps, it, d) {
  const total = String(steps.length).padStart(2, "0");
  let nav = "";
  let body = "";
  let idx = 1;
  for (const st of steps) {
    const no = String(idx).padStart(2, "0");
    nav += `<li><a href="#step-${idx}" data-step="${idx}"><span>${no}</span>${st.label}</a></li>`;

    let blocks = "";
    for (const b of st.blocks || []) blocks += blockHTML(b, it, d);

    let trio = "";
    for (const [k, v] of st.trio || []) trio += `<div><span class="lab">${k}</span><p>${v}</p></div>`;

    body += `
      <section class="step" id="step-${idx}" data-step="${idx}">
        <div class="step-head reveal"><h2>${st.label}</h2><span class="num">STEP ${no} / ${total}</span></div>
        ${st.take ? `<p class="step-take reveal">${st.take}</p>` : ""}
        ${blocks}
        ${trio ? `<div class="step-trio reveal">${trio}</div>` : ""}
      </section>`;
    idx += 1;
  }
  return `
    <div class="wrap steps-wrap">
      <nav class="step-nav"><p class="lab">Project Flow</p><ol>${nav}</ol></nav>
      <div class="step-main">${body}</div>
    </div>`;
}

function projectHTML(it, n, prev, next) {
  const d = it.detail || {};
  const num = String(n).padStart(2, "0");
  const detail = DETAIL[it.id] || [];
  const blocks = detail.steps ? [] : detail;

  // 목차 + 섹션
  let toc = "";
  let sections = "";
  let idx = 1;
  for (const b of blocks) {
    const no = String(idx).padStart(2, "0");
    const sid = `s-${idx}`;
    toc += `<li><a href="#${sid}"><span class="num">${no}</span>${b.label}</a></li>`;
    sections += `
      <section class="wrap detail-row" id="${sid}">
        <h2 class="group-title reveal"><span class="num">${no}</span>${b.label}</h2>
        <div class="detail-body">${blockHTML(b, it, d)}</div>
      </section>`;
    idx += 1;
  }

  return `
    <section class="page-head wrap">
      <p class="eyebrow reveal">Project ${num}</p>
      <h1 class="mask"><span>${it.title}</span></h1>
      <p class="reveal">${it.summary || ""}</p>
    </section>
    <figure class="wrap detail-cover reveal"><img src="${it.thumb}" alt="${it.title}"></figure>
    ${detail.steps ? `
    <section class="wrap detail-row">
      <h2 class="group-title reveal">Overview</h2>
      <div class="detail-body">${blockBody({ type: "overview" }, it, d)}</div>
    </section>
    ${stepsHTML(detail.steps, it, d)}` : `
    <section class="wrap detail-row">
      <h2 class="group-title reveal">Contents</h2>
      <ol class="toc reveal">${toc}</ol>
    </section>
    ${sections}`}
    <nav class="wrap pager">
      ${prev ? `<a href="project.html?id=${prev.id}">← ${prev.title}</a>` : "<span></span>"}
      <a href="portfolio.html">▸ All projects</a>
      ${next ? `<a href="project.html?id=${next.id}">${next.title} →</a>` : "<span></span>"}
    </nav>`;
}

// 3) 상세 페이지 내용
const main = document.getElementById("main");
if (current === "project") {
  const pid = new URLSearchParams(location.search).get("id");
  const list = DATA.portfolio.items;
  let i = 0;
  let found = -1;
  for (const it of list) {
    if (it.id === pid) found = i;
    i += 1;
  }
  if (found < 0) found = 0;   // 주소가 틀리면 첫 프로젝트
  const it = list[found];
  document.title = `${it.title} | Portfolio`;
  main.innerHTML = projectHTML(it, found + 1, list[found - 1], list[found + 1]);
} else if (current === "archive") {
  main.innerHTML = archiveHTML(sec);
  const arcs = document.querySelectorAll(".arc");
  for (const el of arcs) {
    el.querySelector(".arc-head").addEventListener("click", () => {
      const open = el.classList.toggle("open");
      el.querySelector(".arc-head").setAttribute("aria-expanded", open);
    });
  }
  const hashEl = location.hash ? document.querySelector(location.hash) : null;
  const first = hashEl && hashEl.classList.contains("arc") ? hashEl : arcs[0];
  if (first) {
    first.classList.add("open");
    first.querySelector(".arc-head").setAttribute("aria-expanded", "true");
  }
} else if (sec) {
  let body = "";

  if (current === "portfolio") {
    // 프로젝트 목록: 한 줄에 썸네일 + 설명
    let rows = "";
    let n = 1;
    for (const it of sec.items) {
      rows += projRowHTML(it, n);
      n += 1;
    }
    body = `<section class="wrap projs">${rows}</section>`;
  } else if (sec.groupOrder) {
    // 모델 카드: 위에 필터(All / Vision / LLM …), 아래 분야별로 묶기
    let filters = `<button class="on" data-f="all">All</button>`;
    for (const g of sec.groupOrder) filters += `<button data-f="${g}">${g}</button>`;
    body += `<div class="wrap filters reveal">${filters}</div>`;
    for (const g of sec.groupOrder) {
      let rows = "";
      let n = 1;
      for (const it of sec.items) {
        if (it.group !== g) continue;
        // visualGroups 에 든 분야는 이미지 타일, 나머지는 글자 목록
        rows += (sec.visualGroups || []).includes(g) ? tileHTML(it, n) : rowHTML(it, n);
        n += 1;
      }
      const isVisual = (sec.visualGroups || []).includes(g);
      if (rows) body += `<section class="wrap list group" id="g-${g}"><h2 class="group-title reveal">${g}</h2>${isVisual ? `<div class="tiles">${rows}</div>` : rows}</section>`;
    }
  } else {
    // 경험·+α: 텍스트 행
    let rows = "";
    let n = 1;
    for (const it of sec.items) {
      rows += rowHTML(it, n);
      n += 1;
    }
    body = `<section class="wrap list">${rows}</section>`;
  }

  main.innerHTML = `
    <section class="page-head wrap">
      ${sec.eyebrow ? `<p class="eyebrow reveal">${sec.eyebrow}</p>` : ""}
      <h1 class="mask"><span>${sec.label}</span></h1>
      <p class="reveal">${sec.desc}</p>
    </section>
    ${body}`;
}

// 4) 홈 화면: 계단식 큰 제목 + 둥근 버튼 1개 + 맨 아래 십자선 숫자 띠
if (current === "home") {
  // 제목을 줄마다 나눠서 계단처럼 들여쓰기
  let lines = "";
  let li = 0;
  for (const line of PROFILE.headline.split("<br>")) {
    lines += `<span class="mask hl hl-${li}"><span>${line}</span></span>`;
    li += 1;
  }
  let statsHTML = `<div class="stat-lead"><b>${PROFILE.nameEn}</b><span>${PROFILE.role}</span></div>`;
  for (const [value, label] of PROFILE.stats) statsHTML += `<div><b>${value}</b><span>${label}</span></div>`;
  // 오른쪽 빈 칸: GitHub · Email 만 (기본 링크)
  const ghText = PROFILE.github.split("/").pop();
  statsHTML += `<a class="strip-link" href="${PROFILE.github}" target="_blank" rel="noopener"><b>GitHub</b><span>${ghText}</span></a>`;
  statsHTML += `<a class="strip-link" href="mailto:${PROFILE.email}"><b>Email</b><span>${PROFILE.email}</span></a>`;
  const [btnLabel, btnUrl] = PROFILE.buttons[0];

  main.innerHTML = `
    <section class="hero">
      <div class="hero-center">
        <h1 class="hero-title">${lines}</h1>
        <a class="pill reveal" href="${btnUrl}" target="_blank">${btnLabel} <span>↗</span></a>
      </div>
      <div class="hero-strip reveal">
        <i class="mark x">x</i><i class="mark y">y</i><i class="cross"></i>
        ${statsHTML}
      </div>
      <i class="vline"></i>
    </section>`;
}

// 5) 모션: 화면에 보이는 순간 아래→위로 서서히 등장 (순서대로 살짝씩 늦게)
const items = document.querySelectorAll(".reveal");
let idx = 0;
for (const el of items) {
  el.style.transitionDelay = `${0.35 + (idx % 3) * 0.12}s`;
  idx += 1;
}
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.15 });
for (const el of items) io.observe(el);

// 메뉴 목록에서 항목(#id)을 눌러 들어왔으면 그 카드 강조
if (location.hash) {
  const target = document.querySelector(location.hash);
  if (target) {
    target.classList.add("in");
    // 내용을 스크립트로 그리기 때문에 브라우저 기본 이동이 안 될 때가 있어 직접 이동
    setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 300);
  }
}

// 5-1) 프로젝트 상세 A안: 화면 가운데를 지나는 단계를 왼쪽 목록에 표시
const stepEls = document.querySelectorAll(".step");
if (stepEls.length) {
  const navLinks = document.querySelectorAll(".step-nav a");
  const navList = document.querySelector(".step-nav ol");
  const markStep = (n) => {
    for (const a of navLinks) {
      const k = Number(a.dataset.step);
      a.parentElement.classList.toggle("on", k === n);
      a.parentElement.classList.toggle("done", k < n);
    }
    // 진행 선: 지금 단계 점까지 진하게
    const cur = navLinks[n - 1];
    if (cur) navList.style.setProperty("--prog", `${cur.parentElement.offsetTop + 15}px`);
  };
  const stepIO = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) markStep(Number(e.target.dataset.step));
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  for (const el of stepEls) stepIO.observe(el);
  markStep(1);
}

// 6) 조금이라도 스크롤하면 메뉴 바를 불투명하게 — 본문 글자가 메뉴 밑으로 겹쳐 보이지 않게 (상세 페이지만)
if (sec) {
  const onScroll = () => document.body.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll);
  onScroll();   // 새로고침해서 중간부터 시작할 때도 적용
}

// 7) 모델 카드 필터: All 이면 전부, 분야를 누르면 그 분야만
for (const btn of document.querySelectorAll(".filters button")) {
  btn.addEventListener("click", () => {
    const f = btn.dataset.f;
    for (const b of document.querySelectorAll(".filters button")) b.classList.toggle("on", b === btn);
    for (const group of document.querySelectorAll(".group")) {
      group.hidden = f !== "all" && group.id !== `g-${f}`;
      if (!group.hidden) {
        for (const el of group.querySelectorAll(".reveal")) el.classList.add("in");
      }
    }
  });
}

// 8) 이미지 크게 보기: 상세 페이지의 사진을 누르면 새 창 대신 모달로 열기 (Esc · 바깥 클릭 · × 로 닫기)
const zoomLinks = document.querySelectorAll(".vimgs figure a, .vdash-img, .varch-img");
if (zoomLinks.length) {
  const modal = document.createElement("div");
  modal.className = "zoom";
  modal.innerHTML = `<button class="zoom-close" aria-label="닫기">×</button><figure><img alt=""><video muted loop playsinline></video><figcaption></figcaption></figure>`;
  document.body.appendChild(modal);
  const zImg = modal.querySelector("img");
  const zVid = modal.querySelector("video");
  const zCap = modal.querySelector("figcaption");

  const closeZoom = () => {
    modal.classList.remove("open");
    zVid.pause();
    document.body.style.overflow = "";
  };
  for (const a of zoomLinks) {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const img = a.querySelector("img");
      const cap = a.parentElement.querySelector("figcaption");
      const href = a.getAttribute("href");
      const isVideo = href.endsWith(".mp4");   // 툴 애니메이션은 모달에서도 영상으로
      zImg.hidden = isVideo;
      zVid.hidden = !isVideo;
      if (isVideo) {
        zVid.src = href;
        zVid.play();
      } else {
        zImg.src = href;
      }
      zImg.alt = img ? img.alt : "";
      zCap.textContent = cap ? cap.textContent : img ? img.alt : "";
      modal.classList.add("open");
      modal.scrollTop = 0;
      document.body.style.overflow = "hidden";   // 뒤 페이지는 스크롤 안 되게
    });
  }
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("zoom-close")) closeZoom();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeZoom();
  });
}

// 9) 라이트 ↔ 다크 이동할 때만 전환을 천천히 (Archive 로 들어가거나 나올 때)
window.addEventListener("pageswap", (e) => {
  if (!e.viewTransition || !e.activation || !e.activation.entry) return;
  const to = new URL(e.activation.entry.url).pathname;
  if (to.endsWith("archive.html") !== (current === "archive")) e.viewTransition.types.add("theme");
});
