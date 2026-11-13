/* 작업물 장면 (three.js)
   같은 천 카드들이 세 장면에 쓰인다.
   1) 첫 화면: 카드들이 한 줄 리본으로 이어져 용수철처럼 한 바퀴 돌며 올라간다.
      왼쪽 아래에서 들어와 → 뒤쪽으로 오른쪽까지 → 카메라 앞을 크게 스치며 왼쪽으로 → 위에서 오른쪽 멀리로 빠진다.
      리본이 빠지는 동안 큰 글자도 좌우로 갈라져 나가고, 화면이 완전히 빈다.
   2) 프로젝트: 빈 화면 위로 썸네일 카드가 사방에서 날아와 그리드에 붙는다.
   3) 소개: 큰 문장 뒤에서 구를 이루어 천천히 돈다.
   좌표계는 화면 픽셀과 같다 (가운데가 원점, 글자는 깊이 0). 글자보다 앞에 온 카드는 글자 위에, 뒤에 있는 카드는 글자 아래에 그린다. */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const works = (window.__works || []).filter(w => w.src);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('gl');
const front = document.getElementById('glFront');
const heroEl = document.getElementById('hero');
const footEl = document.querySelector('.hero .foot');
const indexEl = document.getElementById('index');
const aboutEl = document.getElementById('about');
const anchorEl = document.getElementById('sphereAnchor');
const lns = [...document.querySelectorAll('.hero .ln')];
const cellEls = [...document.querySelectorAll('.cell .ph[data-sheet]')];      // 그리드 칸 (이미지가 없는 칸 포함)

let renderer;
try {
  if (!works.length || !canvas) throw new Error('no works');
  renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
} catch (e) { document.documentElement.classList.add('nogl'); }
if (renderer) start();

function start() {
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;      // 이미지 색을 손대지 않고 그대로 낸다
  const fctx = front ? front.getContext('2d') : null;
  const scene = new THREE.Scene();
  const FOV = 40;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 14000);
  let W = 0, H = 0, camZ = 0, sheetW = 0, sheetH = 0, pitch = 0, band = 1;

  const SX = 20, SY = 10;                                        // 카드 한 장의 격자 수
  const vert = `
    varying vec2 vUv; varying vec3 vN;
    void main(){ vUv = uv; vN = normalMatrix * normal; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
  const frag = `
    uniform sampler2D map; uniform float alpha; uniform vec2 size; uniform float ready; uniform float tAsp;
    varying vec2 vUv; varying vec3 vN;
    void main(){
      vec2 p = (vUv - .5) * size; vec2 q = abs(p) - size * .5 + 6.0;          // 모서리를 둥글게
      if (length(max(q, 0.0)) - 6.0 > 0.0) discard;
      vec2 tuv = gl_FrontFacing ? vUv : vec2(1.0 - vUv.x, vUv.y);              // 뒷면에서도 글자가 뒤집히지 않게
      float rAsp = size.x / size.y;
      vec2 sc = rAsp > tAsp ? vec2(1.0, tAsp / rAsp) : vec2(rAsp / tAsp, 1.0); // 칸 비율이 달라도 찌그러지지 않게
      tuv = (tuv - .5) * sc + .5;
      vec3 c = mix(vec3(.80, .80, .82), texture2D(map, tuv).rgb, ready);
      float l = abs(dot(normalize(vN), normalize(vec3(.25, .35, 1.0))));       // 꺾인 면은 어둡게, 정면은 밝게
      c *= mix(.55, 1.03, pow(l, 1.3));
      gl_FragColor = vec4(c, alpha);
    }`;

  /* 리본은 카드 12장. 이미지가 모자라면 돌려 쓴다. 앞쪽 카드들은 그리드 칸의 주인이기도 하다 */
  const COUNT = Math.max(12, works.length);
  const loader = new THREE.TextureLoader();
  const texCache = {};
  function makeSheet(i) {
    const geo = new THREE.PlaneGeometry(1, 1, SX, SY);
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert, fragmentShader: frag, side: THREE.DoubleSide, transparent: true,
      uniforms: {map: {value: null}, alpha: {value: 0}, size: {value: new THREE.Vector2(300, 190)}, ready: {value: 0}, tAsp: {value: 1.6}}
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    scene.add(mesh);
    return {mesh, geo, mat, i, ribbon: true, cell: null, order: 0, fly: 0, z: 0, cx: 0, cy: 0, vx: 0, vy: 0, dent: 0, px: 0, py: 0, inited: false};
  }
  const setTex = (s, tex) => { const U = s.mat.uniforms; U.map.value = tex; U.ready.value = 1; U.tAsp.value = tex.image.width / tex.image.height; };
  const sheets = Array.from({length: COUNT}, (_, i) => {
    const s = makeSheet(i), w = works[i % works.length];
    s.src = w.src;
    if (!texCache[w.src]) texCache[w.src] = new Promise(res => loader.load(w.src, tex => { tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy(); res(tex); }, undefined, () => {}));
    texCache[w.src].then(tex => setTex(s, tex));
    return s;
  });
  /* 그리드 칸마다 카드 한 장을 짝지운다. 이미지가 있으면 리본의 같은 이미지 카드, 없으면 이름을 적은 어두운 카드를 새로 만든다 */
  function titleTexture(title, asp, cellH) {
    const cv = document.createElement('canvas'); cv.width = 1200; cv.height = Math.round(1200 / asp);
    const g = cv.getContext('2d');
    g.fillStyle = '#0F0F0F'; g.fillRect(0, 0, cv.width, cv.height);
    g.fillStyle = '#E9E9EB'; g.textBaseline = 'alphabetic';
    let fs = Math.round(cv.height * (cellH < 200 ? .17 : .075)); g.font = `500 ${fs}px Geist, Pretendard, sans-serif`;
    while (g.measureText(title).width > cv.width - 120 && fs > 28) { fs -= 4; g.font = `500 ${fs}px Geist, Pretendard, sans-serif`; }
    g.fillText(title, 56, cv.height - 56);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tex;
  }
  const taken = new Set();
  cellEls.forEach((el, k) => {
    let s = el.dataset.src ? sheets.find(x => x.src === el.dataset.src && !taken.has(x)) : null;
    if (!s) {
      s = makeSheet(sheets.length); s.ribbon = false; sheets.push(s);
      const r = el.getBoundingClientRect(), asp = r.width && r.height ? r.width / r.height : 1.6;
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => setTex(s, titleTexture(el.dataset.title || '', asp, r.height || 300)));
    }
    taken.add(s); s.cell = el; s.order = +el.dataset.order || k;
  });
  /* 칸마다 날아오는 출발 방향 (화면 밖 사방) */
  const sides = [[-1, -.35], [.15, -1], [1, -.5], [1, .55], [-.25, 1], [-1, .7], [.6, 1], [-.7, -1]];

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const smooth = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const outCubic = x => 1 - Math.pow(1 - clamp(x), 3);
  const pA = new THREE.Vector3(), pB = new THREE.Vector3(), tanV = new THREE.Vector3(), UPV = new THREE.Vector3(0, 1, 0);

  /* 용수철 길. 각도 180°(왼쪽 아래)에서 들어와 270°(뒤, 가운데) → 360°(오른쪽) → 450°(카메라 바로 앞) → 540°(왼쪽) → 그 뒤로는 위에서 오른쪽 멀리로 */
  const DEG = Math.PI / 180;
  function path(a, out) {
    const far = Math.max(a - 560, 0);                            // 한 바퀴를 돈 뒤에는 멀어진다
    return out.set(
      Math.cos(a * DEG) * W * .37 + far * W * .0026,
      -H * .55 + (a - 180) / 540 * H * 1.2,
      260 + Math.sin(a * DEG) * 560 - far * 9
    );
  }
  let arcTab = [];
  const A_MIN = -260, A_MAX = 860, A_STEP = 1;
  function buildArc() {
    arcTab = []; let len = 0; path(A_MIN, pA);
    for (let a = A_MIN; a <= A_MAX; a += A_STEP) { path(a, pB); len += pA.distanceTo(pB); arcTab.push(len); pA.copy(pB); }
    const zero = arcTab[(180 - A_MIN) / A_STEP];
    arcTab = arcTab.map(v => v - zero);                          // 길이 0 = 들어오는 지점(180°)
  }
  const arcOf = a => arcTab[Math.round((clamp(a, A_MIN, A_MAX) - A_MIN) / A_STEP)];
  function angAt(d) {
    let lo = 0, hi = arcTab.length - 1;
    if (d <= arcTab[0]) return A_MIN;
    if (d >= arcTab[hi]) return A_MAX;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (arcTab[m] < d) lo = m; else hi = m; }
    return A_MIN + (lo + (d - arcTab[lo]) / Math.max(arcTab[hi] - arcTab[lo], 1e-6)) * A_STEP;
  }
  const colP = Array.from({length: SX + 1}, () => new THREE.Vector3());
  const colN = Array.from({length: SX + 1}, () => new THREE.Vector3());
  const colB = Array.from({length: SX + 1}, () => new THREE.Vector3());

  function resize() {
    W = innerWidth; H = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H, false);
    if (front) { front.width = Math.round(W * dpr); front.height = Math.round(H * dpr); }
    camZ = H / 2 / Math.tan(FOV * Math.PI / 360);
    camera.aspect = W / H; camera.position.set(0, 0, camZ); camera.updateProjectionMatrix();
    sheetH = Math.min(Math.max(H * .15, 90), 170); sheetW = sheetH * 1.6;          // 원본처럼 작은 카드 여러 장
    pitch = sheetW * 1.03; band = COUNT * pitch;
    buildArc();
  }
  resize();
  addEventListener('resize', resize);

  let mx = -9999, my = -9999;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, {passive: true});
  addEventListener('pointerleave', () => { mx = my = -9999; });

  let hp = 0, gp = 0, first = true, raf = 0, prevNow = 0, introStart = -1, introDone = reduce, frontDirty = false, gridClock = -1;

  function drawPass(pred) {
    let any = false;
    for (const s of sheets) { s.mesh.visible = pred(s) && s.mat.uniforms.alpha.value > .003; any = any || s.mesh.visible; }
    renderer.clear();
    if (any) renderer.render(scene, camera);
    return any;
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const t = reduce ? 0 : now / 1000;
    const dt = Math.min(.5, Math.max(0, (now - prevNow) / 1000 || .016)); prevNow = Math.max(prevNow, now);        // 화면이 느리게 그려져도 같은 시간 안에 따라붙게 한다
    const hr = heroEl.getBoundingClientRect(), ir = indexEl.getBoundingClientRect();
    const ar = aboutEl ? aboutEl.getBoundingClientRect() : null;
    const hTarget = clamp(-hr.top / Math.max(hr.height - H, 1));
    const gTarget = reduce ? 1 : clamp((H * .9 - ir.top) / (H * .55));
    hp = first ? hTarget : hp + (hTarget - hp) * (1 - Math.exp(-dt * 7));
    gp = first ? gTarget : gp + (gTarget - gp) * (1 - Math.exp(-dt * 5));
    first = false;
    const sphereMode = !!ar && ar.top < H * 1.25 && ar.bottom > -H * .5;
    const gridNear = ir.top < H * 1.3 && ir.bottom > -H * .6;
    const heroNear = hr.bottom > -H * .2;
    const gridMode = !sphereMode && (gp > .001 || hr.bottom < H * .5);
    if (gridMode && gp > .12) gridClock = gridClock < 0 ? 0 : gridClock + dt;
    else if (!sphereMode && gp < .02) gridClock = -1;

    /* 큰 글자: 리본이 빠져나갈 때 좌우로 갈라져 나간다. 아래 소개 문구도 함께 사라진다 */
    const out = smooth((hp - .5) / .32);
    lns.forEach(l => { l.style.transform = `translate3d(${(-(+l.dataset.dir) * out * 95).toFixed(2)}vw,0,0)`; l.style.opacity = '1'; });
    if (footEl) footEl.style.opacity = (1 - smooth((hp - .3) / .3)).toFixed(2);

    if (!sphereMode && !gridNear && !heroNear) {
      if (canvas.dataset.clear !== '1') { renderer.clear(); if (fctx) fctx.clearRect(0, 0, front.width, front.height); canvas.dataset.clear = '1'; }
      return;
    }
    canvas.dataset.clear = '0';

    /* 리본 머리의 위치. 글자가 들어온 뒤(1.1초) 아래에서 올라와 멈추고, 스크롤하면 한 바퀴를 돌아 빠져나간다 */
    if (introStart < 0) { introStart = now; if (hp > .02) introDone = true; }
    const it = introDone ? 1 : clamp((now - introStart - 1100) / 2600);
    if (it >= 1) introDone = true;
    const rest = arcOf(372);                                                       // 멈춰 있을 때 머리는 오른쪽 끝
    const head = outCubic(it) * rest + smooth(hp / .72) * (arcOf(760) - rest + band);

    let sc = null;
    if (sphereMode) {
      const r = anchorEl.getBoundingClientRect();
      sc = {x: r.left + r.width / 2 - W / 2, y: H / 2 - (r.top + r.height / 2), R: Math.min(r.width, r.height) * .5};
    }

    for (const s of sheets) {
      const pos = s.geo.attributes.position, U = s.mat.uniforms;
      const rect = s.cell ? s.cell.getBoundingClientRect() : null;

      if (sphereMode) {
        /* ---------- 구: 두 줄로 나뉘어 문장 뒤에서 천천히 돈다 ---------- */
        if (!s.ribbon) { U.alpha.value = 0; s.z = -1; continue; }
        U.alpha.value = .4; U.size.value.set(sc.R * .7, sc.R * .7 * .625); s.z = -1;
        const row = s.i % 2 ? -1 : 1, per = Math.ceil(COUNT / 2);
        for (let iy = 0; iy <= SY; iy++) for (let ix = 0; ix <= SX; ix++) {
          const u = ix / SX - .5, v = .5 - iy / SY;
          const lon = (Math.floor(s.i / 2) / per) * Math.PI * 2 + (row > 0 ? 0 : Math.PI / per) + t * .14 + u * .7;
          const lat = row * .34 + v * .44;
          pos.setXYZ(iy * (SX + 1) + ix, sc.x + sc.R * Math.cos(lat) * Math.sin(lon), sc.y + sc.R * Math.sin(lat), sc.R * Math.cos(lat) * Math.cos(lon) - sc.R * .2);
        }
      } else if (gridMode) {
        /* ---------- 그리드: 사방에서 날아와 제 칸에 붙는다 ---------- */
        if (!rect || s.cell === hiddenCell) { U.alpha.value = 0; s.z = -1; continue; }
        const gx = rect.left + rect.width / 2 - W / 2, gy = H / 2 - (rect.top + rect.height / 2), gw = rect.width, gh = rect.height;
        if (!s.inited) { s.cx = gx; s.cy = gy; s.inited = true; }
        const nvx = (gx - s.cx) / Math.max(dt * 60, .2), nvy = (gy - s.cy) / Math.max(dt * 60, .2);
        s.vx += (nvx - s.vx) * .18; s.vy += (nvy - s.vy) * .18; s.cx = gx; s.cy = gy;
        const inside = mx > rect.left && mx < rect.right && my > rect.top && my < rect.bottom;
        s.dent += ((inside ? 1 : 0) - s.dent) * .1;
        if (inside) { s.px += ((mx - rect.left) / rect.width - .5 - s.px) * .2; s.py += (.5 - (my - rect.top) / rect.height - s.py) * .2; }
        /* 한 장씩 차례로 출발해 2.1초 동안 날아온다. 스크롤을 멈춰도 끝까지 들어온다 */
        const target = reduce ? 1 : clamp((gridClock - s.order * .24) / 2.1);
        s.fly = target;
        const e = 1 - Math.pow(1 - s.fly, 2.3);                                     // 처음엔 빠르고 끝에서 부드럽게
        const over = Math.sin(s.fly * Math.PI) * (1 - s.fly) * .22;                 // 제자리를 살짝 지나쳤다 돌아온다
        const away = 1 - e - over;
        const sd = sides[s.order % sides.length];
        const ox = sd[0] * W * .9 * away, oy = sd[1] * H * .9 * away, oz = 460 * (1 - e);
        const dirx = sd[0] >= 0 ? 1 : -1;
        const rz = dirx * .38 * (1 - e) + Math.sin(s.fly * Math.PI) * .06 * dirx, crz = Math.cos(rz), srz = Math.sin(rz);
        const ry = -dirx * 1.05 * (1 - e), cry = Math.cos(ry), sry = Math.sin(ry);   // 옆으로 돌아선 채 들어와 정면을 본다
        const swirl = Math.sin(s.fly * Math.PI) * 110;
        U.alpha.value = clamp(s.fly * 7); U.size.value.set(gw, gh); s.z = -1;
        const bvy = clamp(-s.vy * 2.2, -70, 70), bvx = clamp(s.vx * 2.2, -70, 70);
        for (let iy = 0; iy <= SY; iy++) for (let ix = 0; ix <= SX; ix++) {
          const u = ix / SX - .5, v = .5 - iy / SY;
          const lx0 = u * gw, ly0 = v * gh;
          const lx = lx0 * cry, lz = lx0 * sry;
          const wind = reduce ? 0 : Math.sin(u * 5.2 + t * 1.1 + s.order * 1.7) * Math.cos(v * 4.1 + t * .8 + s.order) * 3.5;
          const du = u - s.px, dv = v - s.py;
          const dent = -s.dent * 30 * Math.exp(-(du * du + dv * dv * .5) / .06) + s.dent * 8;
          const bend = bvy * (v * v * 4 - .35) + bvx * (u * u * 4 - .35);
          const flap = (1 - e) * (Math.sin(u * 3.4 + t * 6 + s.order) * 46 + Math.sin(v * 4 + t * 4.3) * 18);   // 날아오는 동안은 천처럼 펄럭이다가 붙으면서 잦아든다
          pos.setXYZ(iy * (SX + 1) + ix,
            gx + ox - sd[1] * swirl + lx * crz - ly0 * srz,
            gy + oy + sd[0] * swirl + lx * srz + ly0 * crz,
            oz + lz + wind + dent + bend + flap);
        }
      } else {
        /* ---------- 리본: 길이 기준으로 서로 붙여 놓고, 길의 방향과 굴곡을 따라 눕히고 휜다 ---------- */
        if (!s.ribbon) { U.alpha.value = 0; s.z = -1; continue; }
        const dS = head - (s.i + 1) * pitch;                                        // 이 카드 왼쪽 끝의 길이 위치
        const aC = angAt(dS + sheetW * .5);
        path(aC, pA); s.z = pA.z;
        U.alpha.value = (dS + sheetW < arcOf(60) ? 0 : 1) * clamp(1 - (aC - 690) / 70);   // 아직 안 들어온 카드는 숨기고, 멀리 가면 사라진다
        U.size.value.set(sheetW, sheetH);
        if (U.alpha.value <= .003) continue;
        for (let ix = 0; ix <= SX; ix++) {
          const dv = dS + (ix / SX) * sheetW;
          path(angAt(dv), colP[ix]); path(angAt(dv + 3), pB);
          tanV.copy(pB).sub(colP[ix]).normalize();
          colN[ix].copy(UPV).addScaledVector(tanV, -UPV.dot(tanV)).normalize();     // 길에 수직인 위쪽 = 카드의 세로 방향
          colB[ix].crossVectors(tanV, colN[ix]);                                    // 카드 면이 바라보는 방향
        }
        for (let iy = 0; iy <= SY; iy++) for (let ix = 0; ix <= SX; ix++) {
          const v = .5 - iy / SY, cp = colP[ix], cn = colN[ix], cb = colB[ix];
          const dv = dS + (ix / SX) * sheetW;
          /* 천의 결: 리본을 따라 흐르는 느린 물결 + 위아래 가장자리가 살짝 말리는 굴곡 */
          const wave = reduce ? 0 : Math.sin(dv * .0075 - t * 1.5) * 9 + Math.sin(dv * .019 + t * 1.1 + v * 2.2) * 3.5;
          const off = wave + (v * v * 4 - .33) * 7;
          pos.setXYZ(iy * (SX + 1) + ix, cp.x + cn.x * v * sheetH + cb.x * off, cp.y + cn.y * v * sheetH + cb.y * off, cp.z + cn.z * v * sheetH + cb.z * off);
        }
      }
      pos.needsUpdate = true;
      s.geo.computeVertexNormals();
      s.mesh.renderOrder = s.z;
    }

    /* 글자보다 앞에 온 카드는 글자 위 캔버스에, 나머지는 글자 아래 캔버스에 그린다 */
    if (fctx) {
      const anyFront = drawPass(s => s.z > 0);
      if (anyFront || frontDirty) { fctx.clearRect(0, 0, front.width, front.height); if (anyFront) fctx.drawImage(canvas, 0, 0, front.width, front.height); frontDirty = anyFront; }
      drawPass(s => s.z <= 0);
    } else {
      drawPass(() => true);
    }
  }
  let hiddenCell = null;                               // 뷰어 창이 대신하고 있는 그리드 칸
  window.__scene = {sheets, camera, THREE, step: frame, dbg: () => ({gridClock, gp, hp}), hide: el => { hiddenCell = el; }};            // 점검용
  raf = requestAnimationFrame(frame);
  document.addEventListener('visibilitychange', () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(frame); });
}
