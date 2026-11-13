/* 프로젝트 뷰어 (PDF처럼 넘겨 읽는 전체 화면 창)
   열기: 그리드 카드를 누르면 그 카드 자리에서 둥근 창이 열리며 화면 전체로 퍼진다.
         퍼지는 동안 창 가장자리가 렌즈처럼 휘고 가로 결이 번지며, 색 번짐 테두리가 따라간다.
         누른 카드가 그대로 첫 장(썸네일)이 된다. 정보와 내용은 그다음 장부터 넘겨 읽는다.
   읽기: 가운데 장이 크게, 양옆에 앞뒤 장이 비스듬히 놓인 어두운 방. ← → 키, 화살표, 아래 썸네일로 넘긴다. Esc 로 닫는다.
   내용: content.js 에서 프로젝트마다 pages 를 적으면 그대로 쓰고, 없으면 기존 항목으로 장을 자동으로 만든다. */
(function () {
  const D = window.PORTFOLIO;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const has = v => Array.isArray(v) ? v.length > 0 : !!(v && String(v).trim());
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const all = [D.main, ...[].concat(D.subs || []), ...(D.others || [])].filter(Boolean);
  const kindOf = p => p === D.main ? 'Main' : (D.subs || []).includes(p) ? 'Sub' : 'Other';
  const coverOf = p => p.image || (p.chapters || []).map(c => c.image).find(has) || '';

  /* ---------- 장 만들기 ---------- */
  /* 첫 장은 항상 썸네일(그리드 카드의 그림)이다. 누른 카드가 그대로 첫 장이 되고, 정보와 내용은 그다음 장부터 나온다.
     pages 를 직접 적었더라도 첫 장이 thumb 가 아니면 썸네일이 맨 앞에 자동으로 들어간다. */
  function autoPages(p) {
    const meta = [p.period, p.team, p.role].filter(has).join(' / ');
    const out = [{
      title: p.title, lead: p.oneLine || p.summary || '',
      rows: [['기간과 역할', meta], ['기술', (p.tags || []).join(', ')], ['구축 성과', p.built], ['개선 성과', p.improved]].filter(r => has(r[1]))
    }];
    (p.chapters || []).forEach(c => out.push({title: c.name, lead: c.claim, text: c.body, rows: (c.items || []).map(it => [it.label, it.text]), nums: c.results, image: c.image, hint: !has(c.claim) ? c.guide : ''}));
    (p.process || []).forEach(s => out.push({title: s.step, lead: s.text}));
    if (has(p.results) && !p.chapters) out.push({title: 'Results', nums: p.results, image: p.image || ''});
    return out;
  }
  function pagesOf(p) {
    const body = has(p.pages) ? p.pages : autoPages(p);
    return body[0] && body[0].thumb ? body : [{thumb: true, title: p.title, image: coverOf(p)}, ...body];
  }
  function pageHtml(pg, i, n, p) {
    if (pg.thumb) {                                    // 썸네일 장: 글 없이 그림만 꽉 채운다 (그림이 없으면 이름만 적힌 어두운 판)
      const face = has(pg.image) ? `<figure class="vp-img"><img src="${esc(pg.image)}" alt="${esc(p.title)}"></figure>` : `<div class="vp-img vp-blank"><b>${esc(p.title)}</b></div>`;
      return `<article class="vp is-thumb" data-i="${i}">${face}</article>`;
    }
    const body = `
      <div class="vp-txt">
        <span class="vp-no">${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}</span>
        <h3>${esc(pg.title)}</h3>
        ${has(pg.lead) ? `<p class="vp-lead">${esc(pg.lead)}</p>` : ''}
        ${has(pg.text) ? `<p>${esc(pg.text)}</p>` : ''}
        ${has(pg.rows) ? `<dl>${pg.rows.map(r => `<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join('')}</dl>` : ''}
        ${has(pg.nums) ? `<div class="vp-nums">${pg.nums.map(r => `<div><b>${esc(r.value)}</b><span>${esc(r.label)}</span></div>`).join('')}</div>` : ''}
        ${has(pg.hint) && D.draft ? `<p class="vp-hint">작성 안내: ${esc(pg.hint)}</p>` : ''}
      </div>`;
    const img = has(pg.image) ? `<figure class="vp-img"><img src="${esc(pg.image)}" alt="${esc(pg.title)}"></figure>` : '';
    return `<article class="vp ${img ? 'has-img' : ''}" data-i="${i}">${img}${body}</article>`;
  }

  /* ---------- 틀 ---------- */
  const root = document.createElement('div');
  root.id = 'viewer';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.hidden = true;
  root.innerHTML = `
    <div class="v-room">
      <div class="v-bg"></div><div class="v-ceil"></div><div class="v-floor"></div><div class="v-glow"></div>
      <header class="v-top">
        <div><span class="v-kind"></span><h2 class="v-title"></h2></div>
        <button class="v-close" type="button">Close</button>
      </header>
      <div class="v-stage"></div>
      <button class="v-arrow prev" type="button" aria-label="이전 장">←</button>
      <button class="v-arrow next" type="button" aria-label="다음 장">→</button>
      <nav class="v-thumbs"></nav>
    </div>
    <div class="v-rim" aria-hidden="true"></div>`;
  document.body.appendChild(root);

  /* 창 가장자리를 휘게 하는 SVG 필터: 렌즈 굴절 지도 + 가로 결 잡음 */
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.style.position = 'absolute';
  svg.innerHTML = `
    <filter id="vWarp" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
      <feImage id="vLens" preserveAspectRatio="none" x="0" y="0" width="100%" height="100%" result="lens"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.0012 0.035" numOctaves="2" seed="7" result="streak"/>
      <feComposite in="lens" in2="streak" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" result="map"/>
      <feDisplacementMap id="vDisp" in="SourceGraphic" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G"/>
    </filter>`;
  document.body.appendChild(svg);
  const disp = svg.querySelector('#vDisp'), lensImg = svg.querySelector('#vLens');
  /* 렌즈 지도: 가장자리로 갈수록 바깥으로 밀어 볼록 렌즈처럼 보이게 한다 (빨강 = 가로 이동, 초록 = 세로 이동) */
  (function makeLens() {
    const c = document.createElement('canvas'); c.width = 256; c.height = 256;
    const g = c.getContext('2d'), im = g.createImageData(256, 256);
    for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
      const nx = x / 255 * 2 - 1, ny = y / 255 * 2 - 1, r2 = Math.min(1, (nx * nx + ny * ny) / 2);
      const k = Math.pow(r2, 1.6);
      const o = (y * 256 + x) * 4;
      im.data[o] = 128 + nx * k * 127; im.data[o + 1] = 128 + ny * k * 127; im.data[o + 2] = 128; im.data[o + 3] = 255;
    }
    g.putImageData(im, 0, 0);
    lensImg.setAttribute('href', c.toDataURL());
  })();

  /* 입구 모양 마스크. 작은 캔버스에 그린 뒤 화면 크기로 늘려 쓴다 (늘리면서 더 부드러워진다) */
  const MW = 480, MH = 300;
  const mcv = document.createElement('canvas'); mcv.width = MW; mcv.height = MH;
  const mg = mcv.getContext('2d');
  function drawMask(x0, y0, x1, y1, bow, radius, feather) {
    mg.clearRect(0, 0, MW, MH);
    const sx = MW / innerWidth, sy = MH / innerHeight;
    const l = x0 * sx, t = y0 * sy, r = x1 * sx, b = y1 * sy;
    const bx = bow * sx, by = bow * sy;                          // 변이 바깥으로 부푸는 양
    const rx = Math.min(radius * sx, (r - l) / 2), ry = Math.min(radius * sy, (b - t) / 2);
    mg.filter = `blur(${feather.toFixed(2)}px)`;
    mg.fillStyle = '#fff';
    mg.beginPath();
    mg.moveTo(l + rx, t);
    mg.quadraticCurveTo((l + r) / 2, t - by * 2, r - rx, t);     // 위 변
    mg.quadraticCurveTo(r, t, r, t + ry);
    mg.quadraticCurveTo(r + bx * 2, (t + b) / 2, r, b - ry);     // 오른쪽 변
    mg.quadraticCurveTo(r, b, r - rx, b);
    mg.quadraticCurveTo((l + r) / 2, b + by * 2, l + rx, b);     // 아래 변
    mg.quadraticCurveTo(l, b, l, b - ry);
    mg.quadraticCurveTo(l - bx * 2, (t + b) / 2, l, t + ry);     // 왼쪽 변
    mg.quadraticCurveTo(l, t, l + rx, t);
    mg.closePath(); mg.fill();
    const url = `url(${mcv.toDataURL()})`;
    root.style.webkitMaskImage = url; root.style.maskImage = url;
  }
  function clearMask() { root.style.webkitMaskImage = ''; root.style.maskImage = ''; }

  const stage = root.querySelector('.v-stage'), thumbs = root.querySelector('.v-thumbs');
  const rim = root.querySelector('.v-rim'), room = root.querySelector('.v-room');
  let cur = 0, pages = [], fromEl = null, busy = false, project = null;

  function render() {
    const n = pages.length;
    const bgImg = pages.map(pg => pg.image).find(has) || coverOf(project);
    root.querySelector('.v-bg').style.backgroundImage = has(bgImg) ? `url("${bgImg}")` : '';
    stage.innerHTML = pages.map((pg, i) => pageHtml(pg, i, n, project)).join('');
    thumbs.innerHTML = pages.map((pg, i) => `<button type="button" data-i="${i}" aria-label="${i + 1}장">${String(i + 1).padStart(2, '0')}</button>`).join('');
    thumbs.querySelectorAll('button').forEach(b => b.onclick = () => go(+b.dataset.i));
    stage.querySelectorAll('.vp').forEach(el => el.addEventListener('click', () => { const i = +el.dataset.i; if (i !== cur) go(i); }));
    layout();
  }
  /* 가운데 장은 크게, 앞뒤 장은 양옆에 비스듬히 (어두운 방에 걸린 판처럼) */
  function layout() {
    stage.querySelectorAll('.vp').forEach(el => {
      const d = +el.dataset.i - cur, a = Math.abs(d);
      el.classList.toggle('cur', d === 0);
      el.style.transform = d === 0 ? 'translate(-50%,-50%)'
        : `translate(calc(-50% + ${Math.sign(d) * (62 + (a - 1) * 30)}vw), -50%) perspective(1600px) rotateY(${-Math.sign(d) * 32}deg) scale(.78)`;
      /* 옆 장은 비치지 않게 불투명한 채로 어둡게만 한다. 두 칸 이상 떨어진 장은 감춘다 */
      el.style.opacity = a > 1 ? 0 : 1;
      el.style.filter = a === 0 ? '' : 'brightness(.42) saturate(.7)';
      el.style.zIndex = 10 - a;
      el.style.pointerEvents = a > 1 ? 'none' : '';
    });
    thumbs.querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.i === cur));
    root.querySelector('.prev').disabled = cur === 0;
    root.querySelector('.next').disabled = cur === pages.length - 1;
  }
  function go(i) { cur = Math.max(0, Math.min(pages.length - 1, i)); layout(); }

  /* ---------- 여는 전환 ---------- */
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  function clipFor(r, k, radius) {
    const W = innerWidth, H = innerHeight;
    const t = r.top * (1 - k), l = r.left * (1 - k), b = (H - r.bottom) * (1 - k), rr = (W - r.right) * (1 - k);
    return `inset(${t}px ${rr}px ${b}px ${l}px round ${radius}px)`;
  }
  /* 열고 닫는 전환. 카드 → 볼록한 창 → 화면 전체. 창 안은 3D 전시장(viewer3d.js)이고,
     전시장 한가운데 판이 카드 그림 그대로라서 카드 자체가 창으로 바뀌어 보인다.
     처음(0)과 끝(1)에서 휘는 정도, 그늘, 굴절이 모두 0 이라 앞뒤로 끊기지 않는다. */
  const lerpRect = (a, b, k) => {
    const left = a.left + (b.left - a.left) * k, top = a.top + (b.top - a.top) * k;
    const width = a.width + (b.width - a.width) * k, height = a.height + (b.height - a.height) * k;
    return {left, top, width, height, right: left + width, bottom: top + height};
  };
  let fromR = null, finalR = null, use3d = false;
  function cardRect() {
    if (fromEl && fromEl.isConnected) { const b = fromEl.getBoundingClientRect(); if (b.width > 2) return b; }
    const W = innerWidth, H = innerHeight;
    return {left: W * .4, top: H * .4, right: W * .6, bottom: H * .6, width: W * .2, height: H * .2};
  }
  function applyAt(p) {
    const e = ease(p), W = innerWidth, H = innerHeight;
    /* 휘는 효과는 88% 전에 끝낸다. 그 뒤 12% 동안만 3D 판과 글로 된 장을 맞바꾸므로 두 장면이 정확히 같은 자리에서 겹친다 */
    const g = Math.min(1, e / .88);                                              // 창 크기와 판 위치는 88%에서 끝난다
    const bulge = Math.sin(g * Math.PI);
    const soft = bulge * bulge;                                                  // 휘는 정도, 그늘, 굴절은 이 값으로 아주 천천히 시작하고 천천히 끝난다 (처음과 끝에 테두리가 갑자기 생기지 않게)
    const r = fromR;
    /* 창: 카드 자리에서 화면 전체로 */
    const x0 = r.left * (1 - g), y0 = r.top * (1 - g);
    const x1 = r.right + (W - r.right) * g, y1 = r.bottom + (H - r.bottom) * g;
    const ins = 1.2 * (1 - g);                                                    // 창을 판보다 1px 안쪽에서 시작해 판 가장자리의 어두운 배경이 비치지 않게 한다
    const w = x1 - x0, h = y1 - y0;
    if (g >= .999) clearMask();                                                  // 완전히 퍼진 상태에서는 마스크 없이 (가장자리 흐림 띠가 생겨 깜빡이지 않게)
    else drawMask(x0 + ins, y0 + ins, x1 - ins, y1 - ins, Math.min(w, h) * .085 * soft, 7 * (1 - g) + Math.min(w, h) * .1 * soft, .3 + soft * 1.9);
    room.style.filter = !reduce && soft > .002 ? 'url(#vWarp)' : '';
    /* 렌즈 굴절과 안쪽 그늘: 창 크기에 맞춰, 도중에만 */
    lensImg.setAttribute('x', x0.toFixed(1)); lensImg.setAttribute('y', y0.toFixed(1));
    lensImg.setAttribute('width', Math.max(1, w).toFixed(1)); lensImg.setAttribute('height', Math.max(1, h).toFixed(1));
    disp.setAttribute('scale', (Math.min(w, h) * .2 * soft).toFixed(1));
    const hw = w / 2, hh = h / 2;
    rim.style.opacity = soft.toFixed(3);
    rim.style.background = `radial-gradient(ellipse ${(hw * 1.18).toFixed(0)}px ${(hh * 1.18).toFixed(0)}px at ${(x0 + hw).toFixed(0)}px ${(y0 + hh).toFixed(0)}px,transparent 62%,rgba(40,40,44,.16) 84%,rgba(40,40,44,.48) 100%)`;
    /* 창 안: 가운데 판이 카드 자리에서 가운데 장 자리로 (카메라가 뒤로 물러나며 공간이 드러난다) */
    const chrome = Math.max(0, (e - .88) / .12);
    room.style.setProperty('--chrome', chrome.toFixed(3));
    if (use3d) {
      window.__room.frame(lerpRect(r, finalR, g), g, performance.now() / 1000);
      window.__room.fadeSides(1 - chrome);
    }
    /* 글로 된 장들은 마지막에 같은 자리에서 겹쳐 나타난다 */
    stage.querySelectorAll('.vp').forEach(el => {
      const d = Math.abs(+el.dataset.i - cur);
      el.style.opacity = (d <= 1 ? 1 : 0) * chrome;
    });
  }
  function animate(open, done) {
    const dur = reduce ? 1 : 1500, t0 = performance.now();
    root.classList.add('anim');
    function step(now) {
      const p = Math.max(0, Math.min(1, (now - t0) / dur));
      applyAt(open ? p : 1 - p);
      if (p < 1) { requestAnimationFrame(step); return; }
      room.style.filter = ''; disp.setAttribute('scale', '0'); rim.style.opacity = 0; root.classList.remove('anim');
      if (open) { clearMask(); layout(); if (use3d) { window.__room.setPanels(false); window.__room.still(); } }
      done && done();
    }
    if (done === 'preview') { applyAt(open); return; }                          // 점검용: 진행도 하나로 멈춘 장면
    requestAnimationFrame(step);
  }
  /* 준비: 글로 된 장을 배치해 가운데 장 자리를 재고, 3D 전시장을 그 크기로 짓는다 */
  function prepare(p, el) {
    project = p; fromEl = el; pages = pagesOf(p); cur = 0;
    root.querySelector('.v-kind').textContent = kindOf(p);
    root.querySelector('.v-title').textContent = p.title;
    root.hidden = false;
    document.documentElement.classList.add('v-open');
    root.classList.add('anim');
    render();
    const curEl = stage.querySelector('.vp.cur');
    finalR = curEl.getBoundingClientRect();
    fromR = cardRect();
    use3d = !!(window.__room && window.__room.ready) && !reduce;
    root.classList.toggle('has3d', use3d);
    if (use3d) {
      if (!window.__room.canvas.isConnected) room.prepend(window.__room.canvas);
      window.__room.build({src: coverOf(p), title: p.title}, pages, finalR.width, finalR.height, curEl);
    }
    window.__scene && window.__scene.hide && window.__scene.hide(fromEl);         // 그리드의 그 카드는 창이 대신하므로 숨긴다
  }
  function open(p, el) {
    if (busy || !p) return;
    busy = true;
    prepare(p, el);
    applyAt(0);
    requestAnimationFrame(() => animate(true, () => { busy = false; root.querySelector('.v-close').focus({preventScroll: true}); }));
  }
  function close() {
    if (busy || root.hidden) return;
    busy = true;
    root.classList.add('anim');                                                 // 첫 장으로 돌아가는 CSS 움직임을 먼저 꺼 둔다 (켜 둔 채 끄면 장이 튄다)
    go(0);
    void root.offsetWidth;                                                      // 바뀐 배치를 바로 반영
    fromR = cardRect();
    if (use3d) { const c = stage.querySelector('.vp.cur'); if (c) finalR = c.getBoundingClientRect(); window.__room.setPanels(true); }
    requestAnimationFrame(() => animate(false, () => {
      /* 창이 카드 자리로 줄어들었다. 카드를 다시 보이게 한 뒤, 카드가 그려진 것을 확인하고(두 프레임 뒤) 창을 치운다 */
      window.__scene && window.__scene.hide && window.__scene.hide(null);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        root.hidden = true; clearMask(); busy = false;
        document.documentElement.classList.remove('v-open');
        /* 닫은 뒤 카드에 포커스를 되돌리지 않는다: 되돌리면 카드에 검은 테두리가 생기고 그 순간 화면이 버벅인다 */
      }));
    }));
  }

  /* 창 크기가 바뀌면 3D 공간을 새 크기로 다시 그린다 */
  addEventListener('resize', () => {
    if (root.hidden || busy || !use3d) return;
    const c = stage.querySelector('.vp.cur'); if (!c) return;
    const fr = c.getBoundingClientRect();
    window.__room.build({src: coverOf(project), title: project.title}, pages, fr.width, fr.height, c);
    window.__room.setPanels(false); window.__room.frame(fr, 1, 0);
  });
  root.querySelector('.v-close').onclick = close;
  root.querySelector('.prev').onclick = () => go(cur - 1);
  root.querySelector('.next').onclick = () => go(cur + 1);
  addEventListener('keydown', e => {
    if (root.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') go(cur + 1);
    else if (e.key === 'ArrowLeft') go(cur - 1);
    else if ([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown'].includes(e.key) && !e.target.closest('button')) e.preventDefault();   // 뒤 페이지가 키로 스크롤되지 않게
  });
  let wheelLock = 0;
  root.addEventListener('wheel', e => {
    e.preventDefault();
    const now = performance.now(); if (now < wheelLock) return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(d) < 8) return;
    wheelLock = now + 450; go(cur + Math.sign(d));
  }, {passive: false});
  root.addEventListener('touchmove', e => { if (e.touches.length === 1) e.preventDefault(); }, {passive: false});   // 뒤 페이지가 터치로 스크롤되지 않게
  let tx = null;
  root.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive: true});
  root.addEventListener('touchend', e => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 40) go(cur - Math.sign(dx)); tx = null; });

  /* 그리드 카드와 See full 버튼을 뷰어로 연결 */
  const byId = id => all.find(p => p.id === id);
  document.querySelectorAll('.cell').forEach(a => a.addEventListener('click', e => {
    const p = byId((a.getAttribute('href') || '').slice(1));
    if (!p) return;
    e.preventDefault(); open(p, a.querySelector('.ph'));
  }));
  const seeFull = document.getElementById('hovL');
  if (seeFull) seeFull.addEventListener('click', e => {
    const id = (seeFull.getAttribute('href') || '').slice(1), p = byId(id);
    if (!p) return;
    e.preventDefault();
    const cell = [...document.querySelectorAll('.cell')].find(a => a.getAttribute('href') === '#' + id);
    open(p, cell ? cell.querySelector('.ph') : seeFull);
  });
  window.__viewer = {
    open: id => open(byId(id), document.querySelector(`.cell[href="#${id}"] .ph`)), close, go,
    preview(id, p) {                                     // 점검용: 열리는 장면을 진행도 p(0~1)에서 멈춰 보여 준다
      prepare(byId(id), document.querySelector(`.cell[href="#${id}"] .ph`));
      room.style.filter = p > 0 && p < 1 ? 'url(#vWarp)' : '';
      animate(p, 'preview');
      if (p >= 1) { clearMask(); rim.style.opacity = 0; root.classList.remove('anim'); layout(); if (use3d) { window.__room.setPanels(false); window.__room.still(); } }
    }
  };
})();
