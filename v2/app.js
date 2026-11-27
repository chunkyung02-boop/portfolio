// MONO 공개 시 이 항목에 cover(이미지 경로), oneLine(소개), links를 입력합니다.
const mono = {id:'mono', title:'MONO', status:'개발 중 · TRA 구현 완료', period:'2026.11 – 진행 중', team:'1인 프로젝트', role:'기획, 대시보드 UI/UX, 트렌드 리서치 에이전트(TRA) 구현', tags:['AI Agent','트렌드 리서치','모델 비교','비용 절감'], cover:'', oneLine:'트렌드 리서치부터 기획전 초안과 검수까지 잇는 패션 이커머스 AI MD 에이전트', links:[], results:[{value:'약 1/8',label:'정제 모델 비용 · 정확도가 거의 같은(색상 87~88%, 질감 58~60%) 모델을 골라 Sol 대비 절감'},{value:'0.19 vs 0.76 USD',label:'리포트 1건 비용 · 에이전트 1명 구조 vs 조사 worker 7명 구조 (각 1회 실행)'},{value:'0 / 82',label:'리포트 숫자 중 도구 결과에 없는 숫자 (에이전트 1명 구조, 1회)'}]};
const data = window.PORTFOLIO;
const visual = {id:'visual',title:'CG Compositing',cover:data.visual.image,oneLine:data.visual.desc,improved:Object.values(data.visual.award).join(' · '),image:data.visual.awardImage,links:data.visual.links};
const covers = {kucanto:'assets/01.webp',tiniping:'assets/tiniping_mockup.webp',nolda:'assets/nolda_mockup.webp','design-editor':'assets/editor.webp'};
const projects = [mono,...data.subs,...data.others,visual];
const byId = Object.fromEntries(projects.map(p=>[p.id,p]));
const $ = s => document.querySelector(s);
const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function artwork(p) {
  const src=p.cover || covers[p.id];
  if(src) return '<img class="art" alt="" src="'+escape(src)+'">';
  if(p.id==='mono') return '<span class="mono-art"><img src="assets/mono_white.png" alt=""></span>';
  return '<span class="typographic" aria-hidden="true">'+escape(p.title)+'</span>';
}
function links(items=[]) {
  return items.filter(x=>x.url).map(x=>'<a href="'+escape(x.url)+'" target="_blank" rel="noopener">'+escape(x.label)+' ↗</a>').join('');
}
function chips(items=[]) {return '<div class="chips">'+items.map(x=>'<span>'+escape(x)+'</span>').join('')+'</div>'}
function row(title,desc){return '<div class="row"><b>'+escape(title)+'</b><p>'+escape(desc)+'</p></div>'}
function label(p){return p.status || p.tags?.slice(0,3).join(' · ') || data.visual.award.name}
if ($('#projects')) {
$('#projects').innerHTML=projects.filter(p=>['design-editor','visual'].includes(p.id)).map(p=>'<button class="entry" data-id="'+escape(p.id)+'"><span class="figure">'+artwork(p)+'</span><span class="caption">'+escape(p.title)+'<span aria-hidden="true">↗</span></span><small>'+escape(label(p))+'</small></button>').join('');
$('#statement').textContent=data.about.statement;
$('#career').innerHTML=data.career.map(x=>'<div class="row"><b><span class="'+(/^2026\s*~/.test(x.period)?'career-current':'')+'">'+escape(x.period)+'</span> · '+escape(x.title)+'</b><p>'+escape(x.desc)+'</p></div>').join('');
$('#edu').innerHTML=data.education.map(x=>'<div class="row"><b>'+escape(x.period)+' · '+escape(x.title)+'</b><p>'+escape(x.desc)+(x.url?'<a class="verify" href="'+escape(x.url)+'" target="_blank" rel="noopener">확인 ↗</a>':'')+'</p></div>').join('');
$('#skills').innerHTML=chips(data.skills.flatMap(x=>x.items));
$('#message').textContent=data.contact.message;
$('#mail').textContent=data.contact.email;
$('#mail').href='mailto:'+data.contact.email;
$('#links').innerHTML=links(data.contact.links);
}
function renderProject(p){
  const pages=window.PORTFOLIO_CASES[p.id];
  if(pages){
    $('#detail').innerHTML='<h1>'+escape(p.title)+'</h1>'+pages.map(pg=>'<section class="case-detail"><h2>'+escape(pg.title)+'</h2><p>'+escape(pg.lead)+'</p>'+(pg.image?'<img class="evidence" src="'+escape(pg.image)+'" alt="'+escape(pg.title)+'">':'')+(pg.rows||[]).map(r=>row(r[0],r[1])).join('')+'<div class="links">'+links(pg.links)+'</div></section>').join('');
    return;
  }
  const sourceLinks=[...(p.links||[])];
  if(['tiniping','nolda'].includes(p.id))sourceLinks.push({label:'상세 기록',url:'https://chunkyung02-boop.github.io/portfolio/project.html?id='+p.id});
  const sections=[];
  if(p.period || p.role)sections.push(row([p.period,p.team].filter(Boolean).join(' · '),p.role));
  if(p.id==='mono'){
    sections.push(row('문제','트렌드 조사와 상품 선정이 따로 진행되면 처음 선택한 근거가 기획전까지 이어지기 어렵습니다.'));
    sections.push(row('트렌드 리서치','후보와 선별 근거를 정리하고 MD가 선택한 트렌드를 기획 단계로 넘깁니다.'));
    sections.push(row('기획전 초안','승인된 트렌드와 MD 조건으로 상품 후보와 카피를 구성합니다. 최종 승인은 담당자가 맡습니다.'));
    sections.push(row('설계','트렌드 리서치 → MD 승인 → 기획전 초안 → 최종 검수'));
    sections.push('<img class="evidence" src="assets/mono_campaign.webp" alt="MONO 기획전 설계 화면">');
    sections.push(row('현황','TRA 구현 완료 · 비용 절감·성능 개선 중 → 기획전 초안(CRA)으로 1차 완료, 이후 코디 챗봇(CCB)'));
    sections.push(row('검증','같은 표본으로 정확도와 비용을 비교해 모델을 고르고, 리포트의 모든 숫자는 코드가 근거와 대조합니다. 검증을 통과하지 못하면 모델 문장 대신 근거를 그대로 옮긴 기본 문장을 씁니다.'));
    sections.push(row('한계','구조 비교는 각 1회 실행이라 반복 검증은 아직이고, 금액은 토큰 사용량 기반 추정입니다.'));
  }
  if(p.results?.length) sections.push('<h3>주요 성과</h3>'+p.results.map(r=>row(r.value,r.label)).join(''));
  if(p.built)sections.push(row('구현',p.built));
  if(p.improved)sections.push(row('결과',p.improved));
  for(const step of p.process||[])sections.push(row(step.step,step.text));
  for(const chapter of p.chapters||[])if(chapter.body)sections.push(row(chapter.name,chapter.body));
  $('#detail').innerHTML='<h2 id="detail-title">'+escape(p.title)+'</h2><p>'+escape(p.oneLine||p.status)+'</p><div class="figure">'+artwork(p)+'</div>'+chips(p.tags)+sections.join('')+(p.image?'<img class="evidence" src="'+escape(p.image)+'" alt="'+escape(p.caption||data.visual.awardImageAlt)+'">':'')+'<div class="links">'+links(sourceLinks)+'</div>';
}
const projectPage = $('#project-page');
if (projectPage) {
  const id = new URLSearchParams(location.search).get('id');
  const project = Object.hasOwn(byId,id) ? byId[id] : null;
  if (project) {
    renderProject(project);
    document.title = project.title + ' · Kyungmin Jeon';
  } else {
    $('#detail').textContent = '프로젝트를 찾을 수 없습니다.';
  }
} else {
document.addEventListener('click',event=>{
  const entry=event.target.closest('[data-id]');
  const link=event.target.closest('a[href^="project.html?id="]');
  if(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const id=entry?.dataset.id || (link && new URL(link.href).searchParams.get('id'));
  if(window.__viewer && window.portfolioViewerProjects.some(p=>p.id===id)){
    event.preventDefault();
    window.__viewer.open(id,link||entry);
  }else if(entry){
    location.href='project.html?id='+encodeURIComponent(id);
  }
});
const reelOrder=['mono','tiniping','nolda','visual','kucanto'];
const belt=$('#belt');
const reelIds=[...reelOrder,...reelOrder,...reelOrder];
belt.removeAttribute('aria-hidden');
belt.innerHTML=reelIds.map((id,index)=>'<a class="slide" href="project.html?id='+id+'" tabindex="'+(index===0?'0':'-1')+'">'+artwork(byId[id])+'<b>'+escape(byId[id].title)+'</b></a>').join('');
const slides=[...belt.children];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
let phase=0,offset=0,lastTime=0,animation=0;
function playback(){
  $('#pause').textContent=paused?'▶':'Ⅱ';
  $('#pause').setAttribute('aria-label',paused?'카드 흐름 재생':'카드 흐름 일시정지');
  if(!paused && !animation) animation=requestAnimationFrame(moveCards);
}
$('#pause').onclick=()=>{paused=!paused;playback()};
reduced.addEventListener('change',()=>{paused=reduced.matches;playback();dock()});
function drawCards(){
  const width=reel.clientWidth;
  const cardWidth=Math.min(530,Math.max(215,width*.375))*cardScale;
  const step=cardWidth*1.52;
  const span=slides.length*step;
  slides.forEach((slide,index)=>{
    const x=((index*step-offset*step+span/2)%span+span)%span-span/2;
    const curve=Math.max(-1,Math.min(1,x/(width*.49)));
    const identity=index%reelOrder.length;
    const lean=[3.2,-2.4,1.6,-3.4,2.7][identity];
    const float=Math.sin(phase+identity*2.1);
    const z=-(Math.abs(curve)**2)*83;
    slide.style.width=cardWidth+'px';
    slide.style.transform='translate3d(calc(-50% + '+x+'px),calc(-50% + '+(float*6+Math.abs(curve)*cardWidth*.07)+'px),'+z+'px) rotateY('+(-curve*46+Math.sin(phase*.81+identity)*19)+'deg) rotateX('+Math.sin(phase*.7+identity)*3+'deg) rotateZ('+(lean*.42+float*1.25-curve)+'deg)';
    slide.style.zIndex=String(Math.round(200+z));
    const visible=Math.abs(x)<width*.68+cardWidth/2;
    slide.style.visibility=visible?'visible':'hidden';
    slide.tabIndex=visible?0:-1;
  });
}
function moveCards(time){
  animation=0;
  if(!paused && sequence.getBoundingClientRect().bottom>0 && !document.hidden){
    phase+=Math.min(lastTime?time-lastTime:0,40)*.00052;
    offset=(offset+Math.min(lastTime?time-lastTime:0,40)*.000178)%slides.length;
    drawCards();
  }
  lastTime=time;
  if(!paused) animation=requestAnimationFrame(moveCards);
}
belt.addEventListener('focusin',()=>{paused=true;playback()});
const screen=$('.screen'),sequence=$('.sequence'),reel=$('#reel'),target=$('.dock-target');
let cardScale=1;
function transitionProgress(scroll,start,end){
  const value=Math.min(1,Math.max(0,(scroll-start)/(end-start)));
  return reduced.matches?Number(value>.5):value*value*(3-2*value);
}
function dock(){
  const h=screen.clientHeight,w=screen.clientWidth;
  const scroll=-sequence.getBoundingClientRect().top/h;
  const t=transitionProgress(scroll,.08,.84);
  const travel=transitionProgress(scroll,.31,.85);
  const mix=(a,b)=>a+(b-a)*t;
  const width=mix(w,target.offsetWidth);
  const startTop=(w<700?.36:.405)*h;
  const height=mix(.46*h,target.offsetHeight);
  reel.style.width=width+'px';
  reel.style.height=height+'px';
  reel.style.left=((w-width)/2*(1-travel)+target.offsetLeft*travel)+'px';
  reel.style.top=(mix(startTop,target.offsetTop)-Math.sin(t*Math.PI)*h*.065)+'px';
  reel.style.borderRadius=(15*t)+'px';
  cardScale=mix(1,w<700?.86:1.31);
  drawCards();
  reel.style.setProperty('--border',t*.38);
  $('.hero-copy').style.opacity=1-transitionProgress(scroll,0,.4);
  $('.hero-copy').style.transform='translateY('+(-transitionProgress(scroll,0,.5)*h*.22)+'px)';
  $('.hero-copy').inert=t>.65;
  $('.dock-copy').style.opacity=transitionProgress(scroll,.32,.76);
  $('.dock-copy').classList.toggle('code-visible',t>.62);
  $('.dock-copy').style.transform='translateY('+((1-t)*28)+'px)';
}
let pending=false;
function sync(){if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;dock()})}}
addEventListener('scroll',sync,{passive:true});addEventListener('resize',sync);dock();playback();
window.portfolioViewerProjects=[mono,...data.subs,...data.others].map(p=>({
  ...p, viewerCover:window.PORTFOLIO_COVERS[p.id], pages:window.PORTFOLIO_CASES[p.id]
}));
function projectCell(p,kind){
  return '<a class="cell" href="#'+p.id+'"><span class="ph"><img src="'+p.viewerCover+'" alt=""></span><span class="ct"><i>'+kind+'</i>'+escape(p.title)+'</span><span class="cs">'+escape(p.period||p.status)+'</span></a>';
}
const [featured,...rest]=window.portfolioViewerProjects;
const subCount=data.subs.length;
$('#cases').innerHTML='<div class="pmain">'+projectCell(featured,'Main')+'</div><div class="pside"><div class="psub">'+rest.slice(0,subCount).map(p=>projectCell(p,'Sub')).join('')+'</div><div class="petc">'+rest.slice(subCount).map(p=>projectCell(p,'Other')).join('')+'</div></div>';
const dotGlyphs={
  '#':['01010','11111','01010','11111','01010'],
  '@':['01110','10001','10111','10101','01110'],
  '[':['111','100','100','100','111'],
  ']':['111','001','001','001','111'],
  '{':['001','010','100','010','001'],
  '}':['100','010','001','010','100'],
  '/':['00001','00010','00100','01000','10000']
};
function addGlyphs(target,glyphs){
  for(const glyph of glyphs){
    const mark=document.createElement('span');
    const rows=dotGlyphs[glyph];
    mark.className='pixel-mark';
    mark.style.setProperty('--cols',rows[0].length);
    for(const square of rows.join('')) mark.append(document.createElement(square==='1'?'b':'i'));
    target.append(mark);
  }
}
addGlyphs($('#hero-symbols'),['{','#','@','[',']','}','/']);
document.querySelectorAll('.about-title .g').forEach(el=>addGlyphs(el,[el.dataset.g]));
const measures=[['47/50회','티니핑 · 실사용자 10명 과업 성공률 94%'],['330 → 1건','티니핑 · 실사진 4,000건 중 오답 단정 (약 330건 → 1건)'],['86 → 92%','Kucanto · 재료 판정 정답률 (410문항, 전체 1,459문항 91.2%)'],['589 → 61','Kucanto · 같은 정확도로 줄인 AI 호출 (1,459문항)']];
$('#metrics').innerHTML=measures.map(([num,label])=>'<div><b>'+num+'</b><p>'+label+'</p></div>').join('');
const notes=[
 ['Kucanto','시험지부터 만들기','정답이 있는 1,459문제를 먼저 만들고, 로컬 모델 15종을 같은 조건에서 비교했습니다.','kucanto'],
 ['티니핑 판별기','애매하면 후보로 답하기','모델이 확신하기 어려운 사진은 캐릭터 후보 세 개를 보여줍니다. 바로 답한 사진에서 정확도는 99.84%였습니다.','tiniping'],
 ['NOLDA','취향 비율은 코드로 계산하기','사진 두 장이 유튜브 기록 수백 개보다 크게 반영되던 문제를 보고, 근거 수에 따라 가중치를 조정했습니다.','nolda'],
 ['CG 합성','빛과 경계 맞추기','실사 위에 CG가 자연스럽게 놓이도록 빛과 색을 맞췄습니다. Rookie Awards 2026 Visual Effects 부문에서 Rank A를 받았습니다.','visual']
];
$('#notes').innerHTML=notes.map(([label,title,desc,id])=>'<div class="note"><h3>'+title+'</h3><p>'+desc+'</p><button data-id="'+id+'" class="text-button">'+label+' 열기 ↗</button></div>').join('');
const video=$('.screening video');
const videoToggle=$('.video-toggle');
let manualPause=false;
videoToggle.onclick=()=>{
  manualPause=!video.paused;
  if(manualPause)video.pause();
  else video.play().catch(()=>{});
};
video.addEventListener('play',()=>{videoToggle.textContent='영상 일시정지'});
video.addEventListener('pause',()=>{videoToggle.textContent='영상 재생'});
const observeVideo = new IntersectionObserver(([entry])=>{
  if (!entry.isIntersecting) video.pause();
  else if (!reduced.matches && !manualPause) video.play().catch(()=>{});
},{threshold:.38});
observeVideo.observe(video);
reduced.addEventListener('change',()=>{if(reduced.matches)video.pause()});
const wipe=$('.pixel-wipe');
const columns=Array.from({length:24},(_,i)=>{
  const column=document.createElement('i');
  wipe.append(column);
  return {column,delay:((i*5)%12)/24};
});
const routes=$('.routes'), stage=$('.route-stage'), source=$('.decisions'), destination=$('.route-target');
const clamp=value=>Math.max(0,Math.min(1,value));
function scrollScenes(){
  const boundary=wipe.getBoundingClientRect();
  const fill=clamp((innerHeight*.94-boundary.top)/(boundary.height+innerHeight*.42));
  for(const {column,delay} of columns){
    const amount=clamp((fill-delay)/(1-.5));
    column.style.transform='scaleY('+amount+')';
  }
  // 고민 노트 섹션이 줄어들며 포트폴리오 PDF 칸으로 들어간다
  const h=Math.max(innerHeight,source.offsetHeight);
  stage.style.height=h+'px';
  stage.style.top=(innerHeight-h)+'px';
  routes.style.height=(h+innerHeight*.95)+'px';
  const raw=clamp((-routes.getBoundingClientRect().top-(h-innerHeight))/(innerHeight*.84));
  const t=transitionProgress(raw,.19,.71);
  const origin=stage.getBoundingClientRect(),dest=destination.getBoundingClientRect();
  const fit=Math.min(dest.width/source.offsetWidth,dest.height/source.offsetHeight);
  const left=dest.left-origin.left+(dest.width-source.offsetWidth*fit)/2;
  const top=dest.top-origin.top+(dest.height-source.offsetHeight*fit)/2;
  source.style.transform='translate('+(left*t)+'px,'+(top*t)+'px) scale('+(1+(fit-1)*t)+')';
  source.inert=t>.05;
  $('.routes-inner').style.opacity=clamp((t-.15)/.65);
  $('.routes-inner').inert=t<.6;
}
const head=$('.site-head');
const headState=()=>head.classList.toggle('scrolled',scrollY>12);
addEventListener('scroll',headState,{passive:true});headState();
addEventListener('scroll',scrollScenes,{passive:true});addEventListener('resize',scrollScenes);scrollScenes();
}
