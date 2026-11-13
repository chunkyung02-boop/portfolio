/* 뷰어 창 안의 3D 공간 (three.js)
   어두운 전시장: 바닥, 천장의 조명 줄, 벽의 기둥, 벽에 걸린 작업물 판.
   한가운데 판은 누른 카드의 그림이다. 카메라가 그 판에 붙어 있다가(= 카드) 뒤로 물러나며 공간이 드러나고,
   마지막에는 판이 뷰어의 가운데 장 자리에 정확히 놓인다. 그래서 카드가 그대로 창이 되고 공간이 된다.
   좌표계는 화면 픽셀과 같다 (카메라 거리 camZ 에서 1 = 1px). */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.createElement('canvas');
canvas.className = 'v-gl';
let renderer;
try { renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: false}); } catch (e) { renderer = null; }

if (renderer) {
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  const BG = 0x101012;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);
  const FOV = 40;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 5, 40000);
  let W = 1, H = 1, camZ = 1;
  const world = new THREE.Group();
  scene.add(world);
  const loader = new THREE.TextureLoader();
  const disposables = [];
  const keep = o => { disposables.push(o); return o; };

  /* 그림을 판 비율에 맞춰 가득 채운(잘라 낸) 캔버스 텍스처로 만든다 */
  function coverTexture(src, w, h, title) {
    const cv = document.createElement('canvas');
    cv.width = 1024; cv.height = Math.round(1024 * h / w);
    const g = cv.getContext('2d');
    g.fillStyle = '#0F0F0F'; g.fillRect(0, 0, cv.width, cv.height);
    const tex = keep(new THREE.CanvasTexture(cv));
    tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const drawTitle = () => {
      if (!title) return;
      let fs = Math.round(cv.height * .085); g.fillStyle = '#E9E9EB';
      g.font = `500 ${fs}px Geist, Pretendard, sans-serif`;
      while (g.measureText(title).width > cv.width * .86 && fs > 20) { fs -= 3; g.font = `500 ${fs}px Geist, Pretendard, sans-serif`; }
      g.fillText(title, cv.width * .055, cv.height * .9);
    };
    if (src) {
      const paint = img => {
        const s = Math.max(cv.width / img.naturalWidth, cv.height / img.naturalHeight);
        const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
        g.drawImage(img, (cv.width - dw) / 2, (cv.height - dh) / 2, dw, dh);
        tex.needsUpdate = true;
      };
      /* 페이지에 이미 불러온 같은 그림이 있으면 바로 그린다 (첫 장면부터 카드 그림이 보이도록) */
      const ready = [...document.images].find(im => im.complete && im.naturalWidth && im.getAttribute('src') === src);
      if (ready) paint(ready);
      else { const img = new Image(); img.onload = () => paint(img); img.src = src; }
    } else { drawTitle(); }
    return tex;
  }
  /* 그림 원본을 자르지 않고 올린 텍스처. 판의 비율이 변해도 그때그때 cover 로 다시 잘라(repeat, offset) 보여 준다.
     그래서 판이 카드 비율(예: 1.4)에서 첫 장 비율(1.6)로 바뀌는 동안에도 그림이 찌그러지거나 빈 띠가 생기지 않는다 */
  function imageTexture(src, onReady) {
    const st = {tex: null, asp: 1.6, ready: false};
    /* 그림이 다 불러와진 뒤에 텍스처를 만든다 (빈 텍스처를 먼저 올리면 크기가 1칸으로 잡혀 나중 그림이 올라가지 않는다) */
    const apply = img => {
      const tex = keep(new THREE.Texture(img));
      tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy(); tex.needsUpdate = true;
      st.tex = tex; st.asp = img.naturalWidth / img.naturalHeight; st.ready = true;
      onReady && onReady(tex);
    };
    /* 주의: 화면에 놓인 <img> 를 그대로 올리면 안 된다. 그 요소의 width 는 화면에 보이는 크기라서, 실제 그림 크기와 달라 업로드가 어긋나 판이 까맣게 나온다.
       그래서 화면 밖의 별도 Image 를 쓰고, 미리 불러와 둔 것이 있으면 바로 쓴다 */
    const im = preloaded(src);
    if (im.complete && im.naturalWidth) apply(im); else im.addEventListener('load', () => apply(im), {once: true});
    return st;
  }
  const pre = new Map();
  function preloaded(src) {
    let im = pre.get(src);
    if (!im) { im = new Image(); im.decoding = 'async'; im.src = src; pre.set(src, im); }
    return im;
  }
  /* 그리드 카드 그림을 미리 받아 둔다 (카드를 누르는 순간 바로 쓸 수 있게) */
  document.querySelectorAll('.cell .ph img').forEach(el => { const src = el.getAttribute('src'); if (src) preloaded(src); });
  function cropTo(st, planeAsp) {
    const t = st.tex;
    if (planeAsp > st.asp) { t.repeat.set(1, st.asp / planeAsp); t.offset.set(0, (1 - t.repeat.y) / 2); }
    else { t.repeat.set(planeAsp / st.asp, 1); t.offset.set((1 - t.repeat.x) / 2, 0); }
  }
  /* 글자만 있는 장을 위한 밝은 종이 텍스처 */
  function paperTexture(title, w, h) {
    const cv = document.createElement('canvas'); cv.width = 1024; cv.height = Math.round(1024 * h / w);
    const g = cv.getContext('2d');
    g.fillStyle = '#F4F4F5'; g.fillRect(0, 0, cv.width, cv.height);
    g.fillStyle = '#0F0F0F'; g.font = `500 ${Math.round(cv.height * .07)}px Geist, Pretendard, sans-serif`;
    g.fillText(title || '', cv.width * .06, cv.height * .2);
    g.fillStyle = 'rgba(15,15,15,.12)';
    for (let i = 0; i < 6; i++) g.fillRect(cv.width * .06, cv.height * (.32 + i * .07), cv.width * (.5 - (i % 3) * .08), cv.height * .018);
    const tex = keep(new THREE.CanvasTexture(cv)); tex.colorSpace = THREE.NoColorSpace;
    return tex;
  }
  /* 바닥과 벽의 결 (반복되는 가는 선) */
  function linesTexture(vertical, bright) {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512;
    const g = cv.getContext('2d');
    g.fillStyle = '#121214'; g.fillRect(0, 0, 512, 512);
    g.fillStyle = `rgba(255,255,255,${bright})`;
    for (let i = 0; i < 8; i++) vertical ? g.fillRect(i * 64, 0, 2, 512) : g.fillRect(0, i * 64, 512, 2);
    const tex = keep(new THREE.CanvasTexture(cv));
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.colorSpace = THREE.NoColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tex;
  }
  const mat = (opts) => keep(new THREE.MeshBasicMaterial({fog: true, ...opts}));
  const plane = (w, h, m) => { const geo = keep(new THREE.PlaneGeometry(w, h)); return new THREE.Mesh(geo, m); };

  let center = null, centerSt = null, snap = null, sides = [], lights = [], fw = 1, fh = 1, built = false;

  /* 뷰어의 첫 장(글로 된 장)을 그대로 베낀 텍스처.
     실제 장의 각 요소 위치와 글꼴을 읽어 같은 자리에 그린다. 그래서 3D 판에서 글로 된 장으로 바뀌는 순간 모양이 같다 */
  function snapshotTexture(pageEl) {
    const pr = pageEl.getBoundingClientRect();
    const S = 2;                                                  // 선명하게 2배로 그린다
    const cv = document.createElement('canvas'); cv.width = Math.round(pr.width * S); cv.height = Math.round(pr.height * S);
    const g = cv.getContext('2d');
    g.scale(S, S);
    g.fillStyle = getComputedStyle(pageEl).backgroundColor || '#F4F4F5'; g.fillRect(0, 0, pr.width, pr.height);
    const tex = keep(new THREE.CanvasTexture(cv)); tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    /* 그림 칸 */
    const fig = pageEl.querySelector('.vp-img');
    if (fig) {
      const fr = fig.getBoundingClientRect(), x = fr.left - pr.left, y = fr.top - pr.top;
      g.fillStyle = getComputedStyle(fig).backgroundColor || '#0F0F0F'; g.fillRect(x, y, fr.width, fr.height);
      const im = fig.querySelector('img');
      const paint = img => {
        const s = Math.max(fr.width / img.naturalWidth, fr.height / img.naturalHeight);
        const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
        g.save(); g.beginPath(); g.rect(x, y, fr.width, fr.height); g.clip();
        g.drawImage(img, x + (fr.width - dw) / 2, y + (fr.height - dh) / 2, dw, dh); g.restore();
        tex.needsUpdate = true;
      };
      if (im) { if (im.complete && im.naturalWidth) paint(im); else im.addEventListener('load', () => paint(im), {once: true}); }
    }
    /* 글자: 글이 든 요소마다 같은 글꼴, 색, 줄 간격, 폭으로 줄을 나눠 그린다 */
    const drawText = el => {
      const cs = getComputedStyle(el), r = el.getBoundingClientRect();
      const text = el.textContent.trim(); if (!text || !r.width) return;
      g.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      g.fillStyle = cs.color; g.textBaseline = 'top';
      const fs = parseFloat(cs.fontSize), lh = parseFloat(cs.lineHeight) || fs * 1.5;
      const words = text.split(/(\s+)/); let line = '', y = r.top - pr.top + (lh - fs) / 2;
      const flush = () => { g.fillText(line.trim(), r.left - pr.left, y); y += lh; line = ''; };
      for (const w of words) {
        if (g.measureText(line + w).width > r.width + 1 && line.trim()) flush();
        line += w;
      }
      if (line.trim()) flush();
    };
    pageEl.querySelectorAll('.vp-txt > span, .vp-txt > h3, .vp-txt > p, .vp-txt dt, .vp-txt dd, .vp-nums b, .vp-nums span, .vp-blank b').forEach(drawText);
    /* 가는 구분선 */
    pageEl.querySelectorAll('.vp-txt dl').forEach(dl => {
      const r = dl.getBoundingClientRect(); g.fillStyle = 'rgba(15,15,15,.16)'; g.fillRect(r.left - pr.left, r.top - pr.top, r.width, 1);
    });
    return tex;
  }

  function clear() {
    world.clear();
    disposables.splice(0).forEach(o => o.dispose && o.dispose());
    sides = []; lights = []; center = null; centerSt = null; snap = null; built = false;
  }

  /* 공간 만들기. fw, fh = 뷰어 가운데 장의 크기(px) */
  function build(card, pages, finalW, finalH, pageEl) {
    clear();
    fw = finalW; fh = finalH;
    scene.fog = new THREE.Fog(BG, camZ * .9, camZ * 4.2);
    const floorY = -fh * .5 - H * .2, ceilY = fh * .5 + H * .32, wallX = W * 1.05, depth = camZ * 7;
    /* 바닥: 결이 깊이 방향으로 뻗어 원근이 보인다 */
    const ft = linesTexture(true, .07); ft.repeat.set(10, 14);
    const floor = plane(W * 3, depth, mat({map: ft}));
    floor.rotation.x = -Math.PI / 2; floor.position.set(0, floorY, -depth / 2 + camZ * 1.6);
    world.add(floor);
    /* 천장과 조명 줄 */
    const ceil = plane(W * 3, depth, mat({color: 0x0c0c0e}));
    ceil.rotation.x = Math.PI / 2; ceil.position.set(0, ceilY, -depth / 2 + camZ * 1.6);
    world.add(ceil);
    for (let i = 0; i < 9; i++) {
      for (const x of [-W * .42, 0, W * .42]) {
        const l = plane(W * .16, 10, mat({color: 0xf2f2f2}));
        l.rotation.x = Math.PI / 2; l.position.set(x, ceilY - 1, camZ * 1.2 - i * camZ * .7);
        world.add(l); lights.push(l);
      }
    }
    /* 양쪽 벽과 기둥 */
    const wt = linesTexture(false, .05); wt.repeat.set(10, 4);
    for (const sgn of [-1, 1]) {
      const wall = plane(depth, ceilY - floorY, mat({map: wt, color: 0x9a9a9e}));
      wall.rotation.y = -sgn * Math.PI / 2; wall.position.set(sgn * wallX, (ceilY + floorY) / 2, -depth / 2 + camZ * 1.6);
      world.add(wall);
      for (let i = 0; i < 8; i++) {
        const col = plane(W * .05, ceilY - floorY, mat({color: 0x1d1d20}));
        col.rotation.y = -sgn * Math.PI / 2; col.position.set(sgn * (wallX - 2), (ceilY + floorY) / 2, camZ * 1.2 - i * camZ * .8);
        world.add(col);
      }
    }
    /* 가운데 판 = 누른 카드 */
    if (card.src) {
      const cm = mat({color: 0x101012, fog: false});
      centerSt = imageTexture(card.src, tex => { cm.map = tex; cm.color.set(0xffffff); cm.needsUpdate = true; });
      center = plane(fw, fh, cm);
    }
    else center = plane(fw, fh, mat({map: coverTexture(null, fw, fh, card.title), fog: false}));
    world.add(center);
    /* 그 앞에 첫 장을 베낀 판을 겹쳐 두고, 창이 퍼지는 동안 서서히 드러낸다 (카드 → 첫 장) */
    if (pageEl && !pageEl.classList.contains('is-thumb')) {
      snap = plane(fw, fh, mat({map: snapshotTexture(pageEl), fog: false, transparent: true, opacity: 0}));
      snap.position.z = .5;
      world.add(snap);
    }
    /* 가운데 판 양옆 = 뷰어의 다음 장들 (다 열린 뒤에 같은 자리의 장으로 바뀐다) */
    pages.slice(1, 3).forEach((pg, k) => {
      const tex = pg.image ? coverTexture(pg.image, fw, fh) : paperTexture(pg.title, fw, fh);
      const m = plane(fw, fh, mat({map: tex, transparent: true, color: 0x6b6b6b}));   // 옆 장은 어둡게 (뷰어의 옆 장과 같은 밝기)
      const a = k + 1;
      m.position.set(W * .62, 0, -40 * a);
      m.rotation.y = -32 * Math.PI / 180;
      m.scale.setScalar(Math.max(.5, .78 - (a - 1) * .1));
      world.add(m); sides.push(m);
    });
    built = true;
  }

  function resize() {
    W = innerWidth; H = innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    renderer.setSize(W, H, false);
    camZ = H / 2 / Math.tan(FOV * Math.PI / 360);
    camera.aspect = W / H; camera.updateProjectionMatrix();
  }
  resize();
  addEventListener('resize', resize);

  /* 한 장면 그리기.
     rect = 가운데 판이 이 순간 화면에 차지할 자리 (카드 자리 → 가운데 장 자리)
     e = 열린 정도 0~1, t = 시간(초) */
  function frame(rect, e, t) {
    if (!built) return;
    const q = Math.max(.02, rect.width / fw);                    // 판이 작게 보일수록 카메라를 뒤로 뺀다
    const d = camZ / q;
    const cx = rect.left + rect.width / 2 - W / 2, cy = H / 2 - (rect.top + rect.height / 2);
    const bulge = Math.sin(e * Math.PI);
    camera.position.set(-cx * d / camZ, -cy * d / camZ, d);
    camera.rotation.set(0, 0, bulge * .045);                     // 들어가는 동안 살짝 기운다
    if (centerSt) {                                              // 판을 카드의 가로세로 비율로 그리고, 그림도 그 비율로 자른다
      const A = rect.width / rect.height;
      center.scale.y = (fw / fh) / A;
      if (centerSt.ready) cropTo(centerSt, A);
    }
    camera.updateMatrixWorld();
    if (snap) { const k = Math.min(1, Math.max(0, (e - .25) / .5)); snap.material.opacity = k * k * (3 - 2 * k); }
    renderer.render(scene, camera);
  }
  function fadeSides(a) { sides.forEach(m => { m.material.opacity = a; m.visible = a > .003; }); }
  /* 다 열린 뒤에는 판을 숨겨, 글로 된 장 뒤에 카드 그림이 비치지 않게 한다 (닫을 때 다시 보인다) */
  function setPanels(on) { if (center) center.visible = on; if (snap) snap.visible = on; sides.forEach(m => { m.visible = on; }); }
  function still() { if (built) renderer.render(scene, camera); }

  window.__room = {canvas, build, frame, fadeSides, setPanels, still, clear, ready: true, dbg: () => ({fix: () => { if (centerSt) { centerSt.tex.needsUpdate = true; } }, st: centerSt && {ready: centerSt.ready}, scaleY: center && center.scale.y, vis: center && center.visible})};
  document.dispatchEvent(new Event('room-ready'));
}
