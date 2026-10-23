import {LESSONS} from "./lessons.js";
/* ---------- Curriculum content (Social Studies, Grades 1–6, Maldives) ---------- */
const STRANDS = {
  culture: {name:"Culture and Identity", c:"--s-culture"},
  place:   {name:"People, Places and Environment", c:"--s-place"},
  econ:    {name:"The Economic World", c:"--s-econ"},
  time:    {name:"Time, Continuity and Change", c:"--s-time"},
  citizen: {name:"Active Citizenship", c:"--s-citizen"},
  inquiry: {name:"Investigating and Communicating", c:"--s-inquiry"}
};


const GRADE_THEMES = {1:"Me and my school",2:"My family and island",3:"Our country and sea",4:"Our atolls and way of life",5:"Our nation’s story",6:"The Maldives in the world"};
const BADGES = [
  {id:"first", icon:"🐚", name:"First Splash", how:"Finish your first lesson"},
  {id:"perfect", icon:"🎯", name:"Perfect Catch", how:"Get every question right in a quiz"},
  {id:"three", icon:"🏝️", name:"Island Hopper", how:"Finish 3 lessons"},
  {id:"allstrands", icon:"🧭", name:"Six Strands", how:"Finish a lesson in every strand"},
  {id:"grade", icon:"🏅", name:"Grade Champion", how:"Finish every lesson in one grade"},
  {id:"daily3", icon:"🤿", name:"Daily Diver", how:"Finish 3 daily challenges"},
  {id:"collector", icon:"🪸", name:"Reef Keeper", how:"Own 6 things in your reef"},
  {id:"stars25", icon:"🐠", name:"Star Collector", how:"Earn 25 stars"},
  {id:"streak3", icon:"🌊", name:"Three-Day Tide", how:"Learn on 3 days in a row"},
  {id:"ks1", icon:"⛵", name:"Key Stage 1 Navigator", how:"Finish every Grade 1, 2 and 3 lesson"},
  {id:"ks2", icon:"🚢", name:"Key Stage 2 Navigator", how:"Finish every Grade 4, 5 and 6 lesson"}
];
const SHOP = [
  {id:"fish1", icon:"🐟", name:"Blue fish", cost:0, layer:"sea"},
  {id:"shell", icon:"🐚", name:"Cowrie shell", cost:2, layer:"floor"},
  {id:"weed", icon:"🌿", name:"Sea grass", cost:3, layer:"floor"},
  {id:"fish2", icon:"🐠", name:"Reef fish", cost:3, layer:"sea"},
  {id:"crab", icon:"🦀", name:"Hermit crab", cost:4, layer:"floor"},
  {id:"puffer", icon:"🐡", name:"Pufferfish", cost:5, layer:"sea"},
  {id:"coral", icon:"🪸", name:"Coral", cost:6, layer:"floor"},
  {id:"shrimp", icon:"🦐", name:"Cleaner shrimp", cost:6, layer:"floor"},
  {id:"octo", icon:"🐙", name:"Octopus", cost:10, layer:"sea"},
  {id:"turtle", icon:"🐢", name:"Green turtle", cost:12, layer:"sea"},
  {id:"dolphin", icon:"🐬", name:"Spinner dolphin", cost:15, layer:"sea"},
  {id:"shark", icon:"🦈", name:"Reef shark", cost:20, layer:"sea"},
  {id:"dhoni", icon:"⛵", name:"Dhoni on top", cost:25, layer:"surface"},
  {id:"whale", icon:"🐋", name:"Whale shark friend", cost:35, layer:"sea"}
];
/* schematic map of the Maldives: lat/lon, not to scale east–west */
const MAP = {lon0:72.5, lon1:73.9, lat0:7.3, lat1:-0.9};
const ATOLLS = [[6.95,72.95,.25,.2],[6.4,73.05,.45,.9],[5.85,73.35,.35,.5],[5.6,72.95,.35,.45],[5.1,73.0,.35,.35],[5.35,73.5,.22,.22],[4.4,73.45,.32,.55],[3.95,73.45,.22,.3],[3.85,72.85,.35,.65],[3.5,73.55,.28,.3],[2.95,73.55,.18,.35],[3.2,72.95,.22,.3],[2.8,72.9,.22,.3],[2.35,73.1,.35,.4],[1.9,73.4,.25,.3],[0.5,73.22,.55,.6],[-0.3,73.42,.07,.07],[-0.63,73.15,.2,.15]];
const PLACES = {"Haa Alif":[6.95,72.95],"Thulhaadhoo":[5.03,72.85],"Malé":[4.175,73.51],"Ari Atoll":[3.85,72.85],"Laamu":[1.9,73.4],"Huvadhoo":[0.5,73.22],"Fuvahmulah":[-0.3,73.42],"Addu City":[-0.63,73.15]};
const mx = lon => (lon-MAP.lon0)/(MAP.lon1-MAP.lon0)*100;
const my = lat => (MAP.lat0-lat)/(MAP.lat0-MAP.lat1)*100;
const IMG = {beach:"/assets/beach.webp", dolphin:"/assets/dolphin.webp"};
for(let i=1;i<=18;i++){ const id = "avatar-" + String(i).padStart(2,"0"); IMG[id] = "/assets/avatars/" + id + ".webp"; }
for(const g of ["turtle","turtle2","crab","dolphin","coconut","starfish"]) IMG["guide-" + g] = "/assets/guides/guide-" + g + ".webp";
IMG["scene-beach"] = IMG.beach; IMG["scene-lagoon"] = "/assets/scene-lagoon.webp"; IMG["scene-reef"] = "/assets/scene-reef.webp";
const AVATARS = Array.from({length:18}, (_,i) => "avatar-" + String(i+1).padStart(2,"0"));
function avHTML(a, size){ return `<span class="av ${size||""}" aria-hidden="true">${IMG[a] ? `<img src="${IMG[a]}" alt="">` : esc(a||"🙂")}</span>`; }
const PASS = 0.6; // a lesson counts as finished at 60% or better
const REVIEW_GAPS = [1,3,7]; // days until a missed question comes back

/* ---------- State & saving ---------- */
const LS_KEY = "raajje-explorers-v1";
let store = {children:[], active:null, grade:null, teacherClasses:[], updatedAt:0};
let DB = null, myId = null; // shared classes stay off in the website version; Atollingo handles classes
const classCache = {}; // class code -> class doc data, fetched once per session for homework

function normChild(c){
  return Object.assign({progress:{}, activity:[], misses:[], review:{}, owned:["fish1"], spent:0, bonus:0, dailyDone:null, dailyCount:0, allowed:null, classCode:null, grade:null}, c);
}
function normStore(s){
  s = Object.assign({children:[], active:null, grade:null, teacherClasses:[], updatedAt:0}, s);
  s.children = s.children.map(normChild);
  return s;
}
function lsRead(){ try{ const r = localStorage.getItem(LS_KEY); return r ? JSON.parse(r) : null; }catch{ return null; } }
function lsWrite(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(store)); }catch{ /* optional: the app keeps working without it */ } }
function save(){
  store.updatedAt = Date.now();
  lsWrite();
}
/* ---------- Atollingo hub connection ----------
   On social.atollingo.com the app can borrow the learner chosen at atollingo.com and send
   finished lessons back as stars, through the hub's /bridge page (exact-origin messages). */
const HUB = "https://atollingo.com";
const hubCapable = () => typeof location !== "undefined" && location.hostname === "social.atollingo.com";
let hubFrame = null, hubWin = null;
const hub = {status:"off", profile:null, msg:""};
function hubTarget(){ return hubWin && !hubWin.closed ? hubWin : hubFrame && hubFrame.contentWindow; }
function hubRequest(action, activity){
  return new Promise((resolve, reject) => {
    const target = hubTarget();
    if(!target) return reject(Error("Not connected to Atollingo yet."));
    const requestId = crypto.randomUUID();
    const timer = setTimeout(() => { removeEventListener("message", receive); reject(Error("Atollingo didn’t answer. Your progress is kept here.")); }, 12000);
    function receive(e){
      if(e.origin !== HUB || e.source !== target || !e.data || e.data.channel !== "atollingo-v1" || e.data.requestId !== requestId) return;
      clearTimeout(timer); removeEventListener("message", receive);
      if(e.data.error) reject(Error(e.data.error)); else resolve(e.data);
    }
    addEventListener("message", receive);
    target.postMessage({channel:"atollingo-v1", requestId, action, activity}, HUB);
  });
}
function ensureFrame(){
  return new Promise(res => {
    if(hubFrame) return res();
    hubFrame = document.createElement("iframe");
    hubFrame.hidden = true; hubFrame.title = "Atollingo progress connection"; hubFrame.src = HUB + "/bridge";
    hubFrame.onload = () => res();
    document.body.appendChild(hubFrame);
  });
}
async function connectHub(silent){
  if(!hubCapable()) return;
  if(!silent){ hub.status = "connecting"; hub.msg = "Connecting to Atollingo…"; render(); }
  try{
    await ensureFrame();
    const d = await hubRequest("read");
    if(!d.profile){ hub.status = "nolearner"; hub.msg = "Choose your learner at atollingo.com first, then connect again."; if(!silent) render(); return; }
    hub.profile = d.profile; hub.status = "on"; hub.msg = "Connected to Atollingo as " + d.profile.displayName;
    let c = store.children.find(k => k.hubId === d.profile.studentId);
    if(!silent){
      if(!c){
        c = normChild({id:"k"+Date.now().toString(36), name:String(d.profile.displayName).slice(0,20), avatar:/^avatar-(0[1-9]|1[0-8])$/.test(d.profile.avatarId) ? d.profile.avatarId : "avatar-01", hubId:d.profile.studentId, createdAt:Date.now()});
        store.children.push(c);
      }
      store.active = c.id; store.grade = null; save();
    }
    await flushHub();
    if(!silent) go("pickGrade");
  }catch(e){ hub.status = "error"; hub.msg = e.message; if(!silent) render(); }
}
function openHubWindow(){
  hubWin = window.open(HUB + "/connect", "atollingo-progress-connection", "popup,width=560,height=640");
  hub.msg = hubWin ? "In the Atollingo window, wait for “Ready”, then choose Connect again here." : "Your browser blocked the Atollingo window. Allow pop-ups for this site and try again.";
  render();
}
/* stars for Atollingo use the hub's 1–3 scale */
const hubStars = (score, total) => { const p = score/total; return p < .6 ? 1 : p <= .8 ? 2 : 3; };
function queueHub(c, id, starsEarned){ if(c.hubId) c.hubQueue = (c.hubQueue||[]).filter(x => x.id !== id).concat({id, starsEarned}); }
async function flushHub(){
  if(hub.status !== "on" || !hub.profile) return;
  const c = store.children.find(k => k.hubId === hub.profile.studentId);
  if(!c || !(c.hubQueue||[]).length) return;
  for(const a of c.hubQueue.slice()){
    try{ await hubRequest("external", Object.assign({}, a, {studentId:c.hubId})); c.hubQueue = c.hubQueue.filter(x => x.id !== a.id); }
    catch{ hub.msg = "Stars will reach Atollingo next time you connect."; break; }
  }
  save();
}
function hubPanelHTML(){
  if(!hubCapable()) return "";
  const busy = hub.status === "connecting";
  return `<section class="panel hubpanel"><p class="eyebrow">Already learning on Atollingo?</p><h2>Use my Atollingo learner</h2>
    <p class="note">Uses the learner you chose at atollingo.com. Finished lessons add stars to your Atollingo hub.</p>
    <div class="row"><button class="btn" id="hubConnect" type="button" ${busy ? "disabled" : ""}>${hub.status === "on" ? "Connect again" : "Connect to Atollingo"}</button>
    ${["nolearner","error"].includes(hub.status) ? `<button class="btn alt" id="hubWindow" type="button">Open Atollingo window</button><a href="${HUB}/" target="_blank" rel="noopener">Choose a learner at atollingo.com ↗</a>` : ""}</div>
    ${hub.msg ? `<p role="status" class="${hub.status === "error" || hub.status === "nolearner" ? "err" : "note"}">${esc(hub.msg)}</p>` : ""}</section>`;
}

async function loadClass(code){
  if(!DB || !code || classCache[code] !== undefined) return;
  classCache[code] = null;
  try{ const s = await DB.doc("classes/"+code).get(); classCache[code] = s.exists ? s.data() : false; }catch{ classCache[code] = false; }
  if(view.name === "home") render();
}

/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const kid = () => store.children.find(c => c.id === store.active) || null;
const lessonById = id => LESSONS.find(l => l.id === id);
const gradeLessons = g => LESSONS.filter(l => l.grade === g);
const dayKey = d => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const today = () => dayKey(new Date());
const addDays = n => { const d = new Date(); d.setDate(d.getDate()+n); return dayKey(d); };
const shuffle = a => { const b = a.slice(); for(let i=b.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [b[i],b[j]]=[b[j],b[i]]; } return b; };
const stageFor = g => (+g <= 3 ? 1 : 2);
const qById = qid => { const l = lessonById(qid.split(":")[0]); return l ? l.quiz.find(q => q.qid === qid) : null; };
function lessonStars(c){ return Object.entries(c.progress).reduce((s,[id,p]) => s + (lessonById(id) ? (p.best||0) : 0), 0); }
const earnedStars = c => lessonStars(c) + (c.bonus||0);
const balance = c => earnedStars(c) - (c.spent||0);
function isDone(c,l){ const p = c.progress[l.id]; return !!p && p.best/l.quiz.length >= PASS; }
function avgScore(c){ const a = LESSONS.filter(l => c.progress[l.id]); return a.length ? Math.round(a.reduce((s,l) => s + c.progress[l.id].best/l.quiz.length, 0)/a.length*100) : null; }
const allowedGrades = c => (c.allowed && c.allowed.length ? c.allowed : [1,2,3,4,5,6]);
const dueReviews = c => Object.entries(c.review).filter(([qid,r]) => r.due <= today() && qById(qid)).map(([qid]) => qid);
const gradeComplete = (c,g) => gradeLessons(g).every(l => isDone(c,l));
function streak(c){
  const days = new Set(c.activity.map(a => a.day));
  let n = 0; const d = new Date();
  if(!days.has(today())) d.setDate(d.getDate()-1);
  while(days.has(dayKey(d))){ n++; d.setDate(d.getDate()-1); }
  return n;
}
function earned(c){
  const done = LESSONS.filter(l => isDone(c,l)), got = new Set();
  if(done.length >= 1) got.add("first");
  if(Object.entries(c.progress).some(([id,p]) => { const l = lessonById(id); return l && p.best === l.quiz.length; })) got.add("perfect");
  if(done.length >= 3) got.add("three");
  if(Object.keys(STRANDS).every(s => done.some(l => l.strand === s))) got.add("allstrands");
  if([1,2,3,4,5,6].some(g => gradeComplete(c,g))) got.add("grade");
  if((c.dailyCount||0) >= 3) got.add("daily3");
  if(c.owned.length >= 6) got.add("collector");
  if(earnedStars(c) >= 25) got.add("stars25");
  if(streak(c) >= 3) got.add("streak3");
  if([1,2,3].every(g => gradeComplete(c,g))) got.add("ks1");
  if([4,5,6].every(g => gradeComplete(c,g))) got.add("ks2");
  return got;
}
function starRow(n, total){ let s = ""; for(let i=0;i<total;i++) s += `<span class="${i<n?"on":"off"}">★</span>`; return `<span class="stars" aria-label="${n} of ${total} stars">${s}</span>`; }
function when(ts){
  const d = new Date(ts), now = new Date(), y = new Date(now); y.setDate(now.getDate()-1);
  const t = d.toLocaleTimeString([], {hour:"numeric", minute:"2-digit"});
  if(d.toDateString() === now.toDateString()) return "Today " + t;
  if(d.toDateString() === y.toDateString()) return "Yesterday " + t;
  return d.toLocaleDateString([], {day:"numeric", month:"short"});
}
const mins = secs => Math.round((secs||0)/60);

const canSpeak = (() => { try{ return "speechSynthesis" in window && typeof SpeechSynthesisUtterance === "function"; }catch{ return false; } })();
function speak(text){ try{ speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.rate = .9; u.lang = "en-GB"; speechSynthesis.speak(u); }catch{ /* optional: the app keeps working without it */ } }
function stopSpeak(){ try{ speechSynthesis.cancel(); }catch{ /* optional: the app keeps working without it */ } }

/* ---------- Views ---------- */
let view = {name:"profiles"};
let classUnsubs = [], classLive = {code:null, doc:null, students:[]};
function go(name, data){
  stopSpeak();
  if(name !== "grown" || !(data && data.classCode)) closeClass();
  view = Object.assign({name}, data||{}); render(); window.scrollTo(0,0);
}

const NAV = [["home","🏝️","Home"],["lessons","📚","Lessons"],["daily","🎯","Challenge"],["shop","🐠","Reef"],["badges","🏅","Badges"]];
function renderBar(){
  const c = kid(), inApp = c && store.grade && !["grown","gate","profiles","pickGrade"].includes(view.name);
  $("#barKid").innerHTML = inApp
    ? `<button class="chip" id="switchKid" type="button" title="Log out and switch explorer">${avHTML(c.avatar,"s")} <span class="nm">${esc(c.name)}</span></button><span class="chip stars" title="Stars to spend in your reef">⭐ ${balance(c)}</span>`
    : "";
  const sw = $("#switchKid"); if(sw) sw.onclick = () => go("profiles");
  const bn = $("#bottomnav");
  if(!inApp){ bn.innerHTML = ""; return; }
  const here = view.name === "result" || view.name === "cert" ? "" : view.name;
  const dailyOpen = c.dailyDone !== today();
  bn.innerHTML = `<div class="bn-inner">${NAV.map(([k,ic,t]) => `<button type="button" data-nav="${k}" ${here===k ? 'aria-current="page"' : ""}><span class="ic" aria-hidden="true">${ic}${k==="daily" && dailyOpen ? '<i class="dot"></i>' : ""}</span><span>${t}</span></button>`).join("")}</div>`;
  bn.querySelectorAll("[data-nav]").forEach(b => b.onclick = () => { const k = b.dataset.nav; if(k === "daily"){ if(c.dailyDone === today()) go("home"); else startDaily(); } else go(k); });
}
/* lesson and quiz screens swap the bottom nav for their own controls */
function setControls(html){ $("#bottomnav").innerHTML = `<div class="bn-inner controls">${html}</div>`; }
function render(){
  renderBar();
  const V = {profiles:vProfiles, pickGrade:vPickGrade, home:vHome, lessons:vLessons, lesson:vLesson, quiz:vQuiz, result:vResult, badges:vBadges, shop:vShop, cert:vCert, gate:vGate, grown:vGrown}[view.name] || vProfiles;
  V($("#app"));
}

function vProfiles(app){
  const kids = store.children;
  app.innerHTML = `
  <section class="island-welcome compact" style="background-image:url(${IMG.beach})">
    <div class="island-copy">
      <p class="eyebrow">Welcome to Raajje Explorers</p>
      <h1>${kids.length ? "Who is exploring<br><em>today?</em>" : "Little explorers.<br><em>Big discoveries.</em>"}</h1>
      <p>Social Studies for Grades 1 to 6: our culture, islands, history and how our country works.</p>
    </div>
    <img class="greeter" src="${IMG.dolphin}" alt="A friendly dolphin welcomes you" width="130" height="130">
  </section>
  <div class="welcome-grid">
    <section class="panel">
      <p class="eyebrow">${kids.length ? "Your explorers" : "Small steps, every day"}</p>
      <h2>${kids.length ? "Choose your profile" : "How it works"}</h2>
      ${kids.length ? `<div class="kids">${kids.map(k => `
        <button class="kid-card" type="button" data-kid="${k.id}">${avHTML(k.avatar,"l")}<b>${esc(k.name)}</b><span>⭐ ${earnedStars(k)} stars${k.hubId ? " · Atollingo" : ""}</span></button>`).join("")}</div>`
      : `<ul class="plan-list">
          <li><div class="pl"><b>Add an explorer</b><small>A first name and a picture. No email needed.</small></div><span class="step-number">01</span></li>
          <li><div class="pl"><b>Pick a grade</b><small>Choose any grade from 1 to 6 each time you log in.</small></div><span class="step-number">02</span></li>
          <li><div class="pl"><b>Learn, quiz and collect</b><small>Short lessons, then a quiz. Stars build your own reef.</small></div><span class="step-number">03</span></li>
        </ul>`}
    </section>
    <form class="panel" id="addKid" novalidate>
      <p class="eyebrow">Save your progress</p>
      <h2>${kids.length ? "Add another explorer" : "Make learning your own"}</h2>
      <label>Your name<input type="text" id="kidName" maxlength="20" autocomplete="off" placeholder="e.g. Aisha"></label>
      <div><p style="font-weight:700;margin-bottom:8px" id="avLbl">Choose your picture</p>
        <div class="avatar-picker" role="group" aria-labelledby="avLbl">${AVATARS.map((a,i) => `<button type="button" data-av="${a}" aria-pressed="${i===0}" aria-label="Picture ${i+1}"><img src="${IMG[a]}" alt=""></button>`).join("")}</div></div>
      <p class="err" id="kidErr" hidden>Type a first name to continue.</p>
      <button class="btn" type="submit">Create my explorer →</button>
      <p class="note">Progress stays in this browser. No email needed.</p>
    </form>
  </div>
  ${hubPanelHTML()}`;
  let av = AVATARS[0];
  const hc2 = $("#hubConnect"); if(hc2) hc2.onclick = () => connectHub(false);
  const hw2 = $("#hubWindow"); if(hw2) hw2.onclick = openHubWindow;
  app.querySelectorAll("[data-av]").forEach(b => b.onclick = () => { av = b.dataset.av; app.querySelectorAll("[data-av]").forEach(x => x.setAttribute("aria-pressed", x===b)); });
  app.querySelectorAll("[data-kid]").forEach(b => b.onclick = () => { store.active = b.dataset.kid; store.grade = null; save(); go("pickGrade"); });
  $("#addKid").onsubmit = e => {
    e.preventDefault();
    const name = $("#kidName").value.trim();
    if(!name){ $("#kidErr").hidden = false; $("#kidName").focus(); return; }
    const c = normChild({id:"k"+Date.now().toString(36), name, avatar:av, createdAt:Date.now()});
    store.children.push(c); store.active = c.id; store.grade = null; save(); go("pickGrade");
  };
}

function vPickGrade(app){
  const c = kid(); if(!c) return go("profiles");
  const grades = allowedGrades(c);
  app.innerHTML = `
    <section class="pick">
      <div class="row">${avHTML(c.avatar,"l")}<p class="eyebrow">Logged in as ${esc(c.name)}</p></div>
      <h1 id="pickLbl">Which grade do you want to explore today?</h1>
      <p class="lead">You can pick a different grade every time you log in.</p>
      <div class="grades big" role="radiogroup" aria-labelledby="pickLbl">${grades.map(g => { const n = gradeLessons(g).filter(l => isDone(c,l)).length, t = gradeLessons(g).length; return `
        <button type="button" role="radio" aria-checked="false" data-g="${g}">
          <span class="g">${g}</span><span class="gt">Grade ${g}</span><span class="ks">${GRADE_THEMES[g]}</span>
          <span class="ks">${n ? n+" of "+t+" finished" : "Key Stage "+stageFor(g)}</span>
        </button>`; }).join("")}</div>
      ${grades.length < 6 ? `<p class="note">A grown-up has chosen which grades you can open.</p>` : ""}
      <button class="link" id="notMe" type="button">Not ${esc(c.name)}? Switch explorer</button>
    </section>`;
  app.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { store.grade = +b.dataset.g; c.grade = store.grade; save(); go("home"); });
  $("#notMe").onclick = () => go("profiles");
}

function reefHTML(c){
  const got = earned(c);
  let html = `<span class="wave" aria-hidden="true"></span>`;
  let sea = 0, floor = 0;
  c.owned.forEach(id => {
    const it = SHOP.find(s => s.id === id); if(!it) return;
    if(it.layer === "surface") html += `<span class="item" style="left:62%;top:-4px;font-size:34px" aria-hidden="true">${it.icon}</span>`;
    else if(it.layer === "floor"){ html += `<span class="item" style="left:${8 + (floor*17)%84}%;bottom:${10 + (floor%2)*6}px;font-size:28px;z-index:2" aria-hidden="true">${it.icon}</span>`; floor++; }
    else { const big = ["whale","shark","dolphin","turtle"].includes(id); html += `<span class="item sea" style="left:${6 + (sea*29)%80}%;top:${30 + (sea*37)%70}px;font-size:${big?34:24}px;animation-delay:-${sea*1.3}s" aria-hidden="true">${it.icon}</span>`; sea++; }
  });
  [...got].forEach((b,i) => html += `<span class="coral" style="left:${4 + i*8.6}%" aria-hidden="true">${i%2 ? "🌿" : "🪸"}</span>`);
  html += `<span class="caption">${esc(c.name)}’s reef</span>`;
  return html;
}

function vHome(app){
  const c = kid(); if(!c) return go("profiles");
  if(!store.grade || !allowedGrades(c).includes(store.grade)) return go("pickGrade");
  const g = store.grade, list = gradeLessons(g), gDone = list.filter(l => isDone(c,l)).length;
  const due = dueReviews(c).length, dailyDone = c.dailyDone === today(), got = earned(c);
  if(c.classCode) loadClass(c.classCode);
  const cls = c.classCode ? classCache[c.classCode] : null;
  const hw = cls && Array.isArray(cls.assignments) ? cls.assignments.map(lessonById).filter(Boolean) : [];
  const next = list.find(l => !isDone(c,l));
  const plan = [
    next ? {b:next.pic+" "+next.title, s:"Next lesson · "+STRANDS[next.strand].name, act:() => go("lesson", {id:next.id, i:0, t0:Date.now()})}
         : {b:"Every Grade "+g+" lesson finished", s:"Pick another grade next time you log in", done:true},
    dailyDone ? {b:"Daily challenge done", s:"A new one is ready tomorrow", done:true}
              : {b:"🎯 Daily challenge", s:due ? `5 questions · ${due} to review · up to 7 bonus stars` : "5 mixed questions · up to 7 bonus stars", act:startDaily},
    {b:"📚 All Grade "+g+" lessons", s:`${gDone} of ${list.length} finished`, act:() => go("lessons")}
  ];
  app.innerHTML = `
    <section class="island-welcome compact" style="background-image:url(${IMG.beach})">
      <div class="island-copy">
        <p class="eyebrow">Your learning island · Grade ${g}</p>
        <h1>Hello ${esc(c.name)}! <em>Where shall we sail?</em></h1>
        <div class="gradebar" aria-label="${gDone} of ${list.length} lessons finished"><i style="width:${gDone/list.length*100}%"></i></div>
        <p>${GRADE_THEMES[g]} · ${gDone} of ${list.length} lessons finished</p>
      </div>
      ${avHTML(c.avatar,"xl greeter")}
    </section>
    ${gradeComplete(c,g) ? `<div class="certbar"><b>You finished every Grade ${g} lesson! 🏅</b><button class="btn small coral" id="toCert" type="button">See my certificate</button></div>` : ""}
    ${hw.length ? `<div class="strip"><h2>Homework · ${esc(cls.name || "your class")}</h2><div class="items">${hw.map(l => `<button class="hw ${isDone(c,l)?"done":""}" type="button" data-lesson="${l.id}">${isDone(c,l) ? "✓ " : ""}${esc(l.title)} · Grade ${l.grade}</button>`).join("")}</div></div>` : ""}
    <div class="dashboard-grid">
      <section class="panel"><p class="eyebrow">Small steps, every day</p><h2>Today’s learning plan</h2>
        <ul class="plan-list">${plan.map((p,i) => `<li class="${p.done?"done":""}"><button type="button" data-plan="${i}" ${p.act?"":"disabled"}><b>${p.done ? "✓ " : ""}${esc(p.b)}</b><small>${esc(p.s)}</small></button><span class="step-number">0${i+1}</span></li>`).join("")}</ul>
      </section>
      <section class="panel reward-panel"><div class="row" style="justify-content:space-between"><h2>⭐ ${earnedStars(c)} stars</h2><button class="link" id="toBadges" type="button">Badges · ${got.size}/${BADGES.length} →</button></div>
        <button class="reef-btn" id="toReef" type="button" aria-label="Open the reef shop"><span class="reef small" role="img" aria-label="${esc(c.name)}’s reef">${reefHTML(c)}</span></button>
        ${got.size ? `<div class="badges-row">${BADGES.filter(b => got.has(b.id)).slice(-3).map(b => `<span>${b.icon} ${esc(b.name)}</span>`).join("")}</div>` : `<p class="note">Finish a lesson to win your first badge.</p>`}
      </section>
    </div>`;
  app.querySelectorAll("[data-lesson]").forEach(b => b.onclick = () => go("lesson", {id:b.dataset.lesson, i:0, t0:Date.now()}));
  app.querySelectorAll("[data-plan]").forEach(b => b.onclick = () => { const p = plan[+b.dataset.plan]; if(p.act) p.act(); });
  $("#toBadges").onclick = () => go("badges");
  $("#toReef").onclick = () => go("shop");
  const ce = $("#toCert"); if(ce) ce.onclick = () => go("cert", {grade:g});
}

const STRAND_SHORT = {culture:"Culture", place:"Places", econ:"Economy", time:"Time", citizen:"Citizenship", inquiry:"Investigating"};
function vLessons(app){
  const c = kid(); if(!c) return go("profiles");
  if(!store.grade) return go("pickGrade");
  const g = store.grade, all = gradeLessons(g), f = view.strand || "all";
  const list = f === "all" ? all : all.filter(l => l.strand === f);
  const gDone = all.filter(l => isDone(c,l)).length;
  app.innerHTML = `
    <div class="section-title"><h2>Grade ${g} lessons</h2><span class="note">${GRADE_THEMES[g]} · ${gDone} of ${all.length} finished</span></div>
    <div class="tabs chips" role="tablist" aria-label="Strand">${[["all","All"]].concat(Object.keys(STRANDS).map(k => [k, STRAND_SHORT[k]])).map(([k,t]) => `<button role="tab" type="button" data-strand="${k}" aria-selected="${f===k}">${t}</button>`).join("")}</div>
    <div class="lesson-grid">${list.map(l => { const p = c.progress[l.id], k = l.strand; return `
      <button class="island-app" type="button" data-lesson="${l.id}" style="--accent:var(--s-${k});--wash:var(--w-${k})">
        <span class="island-pic" aria-hidden="true">${l.pic}${isDone(c,l) ? `<span class="tick">✓</span>` : ""}</span>
        <span class="island-copy-sm"><span class="strand-tag">${STRAND_SHORT[k]}</span><strong>${esc(l.title)}</strong><span class="d">${esc(l.blurb)}</span>${starRow(p ? p.best : 0, l.quiz.length)}</span>
      </button>`; }).join("")}</div>`;
  app.querySelectorAll("[data-strand]").forEach(b => b.onclick = () => { view.strand = b.dataset.strand; render(); });
  app.querySelectorAll("[data-lesson]").forEach(b => b.onclick = () => go("lesson", {id:b.dataset.lesson, i:0, t0:Date.now()}));
}

/* ---------- Lesson visuals: mascots, scenes and interactive diagrams ---------- */
/* each strand has a mascot guide from the Atollingo family */
const GUIDES = {culture:["coconut","Coconut"], place:["dolphin","Dolphin"], econ:["crab","Crab"], time:["turtle","Turtle"], citizen:["starfish","Starfish"], inquiry:["turtle2","Turtle"]};
const SCENES = ["beach","lagoon","reef"];
const guideImg = k => IMG["guide-" + (GUIDES[k] || GUIDES.place)[0]];

/* which visual goes with which lesson page: "lessonId#pageIndex" */
const VIZ = {
  "g1-me#3":{t:"compare", cols:[["Different","🧒🏽 Our faces","🎵 Our voices","⚽ Our favourite things"],["The same","🍚 We all need food","❤️ We all need love","🤝 We all need friends"]]},
  "g1-places#0":{t:"tiles", items:[["🍳","Kitchen","We cook here."],["🛏️","Bedroom","We sleep here."],["🚿","Bathroom","We wash here."],["🛋️","Living room","We sit together."]]},
  "g1-places#1":{t:"tiles", items:[["🏫","Classroom","We learn here."],["📚","Library","We borrow books."],["🛝","Playground","We play here."],["🍱","Canteen","We eat here."]]},
  "g1-needs#1":{t:"compare", cols:[["Needs","🍚 Food","💧 Water","👕 Clothes","🏠 A home"],["Wants","🧸 Toys","🍭 Sweets","🎮 Games","🚲 A new bicycle"]]},
  "g1-day#0":{t:"day"},
  "g1-day#3":{t:"flow", loop:true, steps:[["☀️","Sunday"],["📘","Monday"],["📗","Tuesday"],["📙","Wednesday"],["📕","Thursday"],["🕌","Friday"],["🏖️","Saturday"]]},
  "g1-kind#2":{t:"tiles", items:[["🙏","Please","When we ask for something."],["😊","Thank you","When someone helps us."],["💬","Shukuriyyaa","Thank you in Dhivehi."],["🤗","Sorry","When we make a mistake."]]},
  "g1-senses#0":{t:"tiles", items:[["👀","Seeing","I see the blue sea."],["👂","Hearing","I hear the waves."],["👃","Smelling","I smell the fish curry."],["👅","Tasting","I taste a sweet mango."],["✋","Touching","I touch the soft sand."]]},
  "g1-feelings#0":{t:"tiles", items:[["😊","Happy","Smile and share it!"],["😢","Sad","It’s OK to cry. Talk to someone."],["😠","Angry","Stop. Take a deep breath."],["😨","Scared","Tell a grown-up you trust."]]},
  "g1-weather#0":{t:"tiles", items:[["☀️","Sunny","Wear a hat and drink water."],["🌧️","Rainy","Take an umbrella."],["💨","Windy","Big waves on the sea."],["⛈️","Stormy","Stay inside. No swimming."]]},
  "g1-helpers#0":{t:"tiles", items:[["👩‍🏫","Teacher","Helps us learn."],["🧑‍💼","Principal","Looks after the school."],["🧹","Cleaner","Keeps school clean."],["💂","Guard","Keeps the gate safe."]]},
  "g1-growing#0":{t:"flow", steps:[["👶","Baby"],["🧒","Toddler"],["🎒","School child"],["🧑","Grown-up"]]},
  "g2-family#1":{t:"family"},
  "g2-family#4":{t:"thaana", words:[["ދިވެހި","Dhivehi"],["ރާއްޖެ","Raajje (the Maldives)"]]},
  "g2-island#0":{t:"map", places:[], note:"Each oval is an atoll: a ring of reef with many small islands."},
  "g2-island#2":{t:"island"},
  "g2-jobs#0":{t:"tiles", items:[["🎣","Fisherman","Catches tuna at sea."],["🧑‍🌾","Farmer","Grows bananas and chillies."],["👩‍🏫","Teacher","Helps us learn."],["🧑‍⚕️","Doctor","Looks after sick people."],["🏪","Shopkeeper","Sells things we use."]]},
  "g2-then#0":{t:"compare", cols:[["Long ago","⛵ Sail dhoni","🪔 Oil lamp","🌴 Palm-leaf roof","🐚 Games with shells"],["Now","🚤 Dhoni with an engine","💡 Electric light","🏠 Metal or concrete roof","📱 Games on tablets"]]},
  "g2-rules#1":{t:"tiles", items:[["🦺","Life jacket","Wear one on every boat."],["🧑‍🤝‍🧑","Swim with an adult","Never swim alone."],["🌊","Reef edge","Stay away from strong currents."],["⛑️","Helmet","Wear one on a motorbike."]]},
  "g2-questions#0":{t:"tiles", items:[["🧑","Who?","Asks about a person."],["📦","What?","Asks about a thing."],["📍","Where?","Asks about a place."],["⏰","When?","Asks about a time."],["💭","Why?","Asks for a reason."],["🔧","How?","Asks about the way."]]},
  "g2-food#0":{t:"tiles", items:[["🐟","Mas huni","Tuna, coconut, onion, chilli."],["🫓","Roshi","A flat bread."],["🍛","Mas riha","Fish curry with rice."],["🥟","Hedhikaa","Snacks with tea."]]},
  "g2-coconut#0":{t:"parts", center:"🌴", parts:[["🍃 Leaves","Dried leaves (cadjan) made roofs and fences."],["🥥 Fruit","Coconut water to drink, coconut milk for curry."],["🪢 Husk","Twisted into strong coir rope."],["🪵 Trunk","Wood for building traditional dhonis."]]},
  "g2-shop#2":{t:"money"},
  "g2-months#0":{t:"flow", loop:true, steps:[["❄️","Jan"],["💌","Feb"],["🌱","Mar"],["🌤️","Apr"],["🌺","May"],["🌧️","Jun"],["🌊","Jul"],["🇲🇻","Aug"],["🍂","Sep"],["🎃","Oct"],["🌙","Nov"],["🎆","Dec"]]},
  "g3-celebrate#3":{t:"tiles", items:[["🇲🇻","Independence Day","26 July · since 1965"],["🛡️","National Day","1 Rabi’ al-Awwal (Islamic calendar)"],["🏛️","Republic Day","11 November · since 1968"]]},
  "g3-sea#0":{t:"tiles", items:[["🐢","Sea turtle","Protected by law."],["🦈","Reef shark","Shark fishing banned since 2010."],["🐠","Reef fish","Thousands of kinds live on reefs."],["🐙","Octopus","Hides in coral holes."]]},
  "g3-market#0":{t:"flow", steps:[["🎣","Caught at sea"],["⚓","Landed at the harbour"],["🏪","Sold at the market"],["🍛","Cooked at home"]]},
  "g3-market#3":{t:"money"},
  "g3-longago#0":{t:"timeline", events:[[1153,"Islam","The Maldives embraces Islam."],[1658,"Hukuru Miskiy","The Old Friday Mosque is built of coral stone."],[1965,"Independence","Full independence on 26 July."]]},
  "g3-symbols#0":{t:"flag"},
  "g3-maps#0":{t:"map", places:["Haa Alif","Malé","Addu City"], note:"A map shows islands from above, like a bird."},
  "g3-maps#3":{t:"compass"},
  "g3-community#1":{t:"tiles", items:[["⚓","Harbour","Keeping it working."],["🛣️","Roads","Fixing island roads."],["🗑️","Waste","Collecting rubbish."],["🗳️","Elected","Chosen by island people."]]},
  "g3-waste#2":{t:"flow", loop:true, steps:[["📉","Reduce","Use less."],["🔁","Reuse","Use again."],["♻️","Recycle","Make into something new."]]},
  "g3-transport#0":{t:"tiles", items:[["⛵","Dhoni","Traditional boat."],["🚤","Speedboat","Fast between islands."],["⛴️","Ferry","Fixed routes and times."],["🛩️","Seaplane","Lands on water."]]},
  "g3-transport#4":{t:"map", places:["Malé"], note:"The Sinamalé Bridge joins Malé to Hulhulé, next door."},
  "g3-heroes#0":{t:"timeline", events:[[1153,"Abu al-Barakat","Helps bring Islam, according to tradition."],[1558,"Ali Rasgefaanu","Dies fighting Portuguese invaders in Malé."],[1573,"Muhammad Thakurufaanu","Frees the Maldives from Portuguese rule."]]},
  "g4-traditions#2":{t:"map", places:["Thulhaadhoo"], note:"Thulhaadhoo in Baa Atoll is famous for lacquer work."},
  "g4-atolls#0":{t:"map", places:["Haa Alif","Malé","Addu City"], note:"About 1,190 islands in 26 natural atolls."},
  "g4-atolls#3":{t:"map", places:["Huvadhoo","Fuvahmulah","Addu City"], note:"The Equator runs between Huvadhoo and Fuvahmulah."},
  "g4-atolls#4":{t:"sealevel"},
  "g4-goods#3":{t:"compare", cols:[["Imports (come in)","🍚 Rice","⛽ Fuel","🧱 Building materials","💊 Medicine"],["Exports (go out)","🐟 Tuna","🐠 Other fish","",""]]},
  "g4-timelines#0":{t:"timeline", events:[[1153,"Islam","The Maldives embraces Islam."],[1573,"Freedom","Bodu Thakurufaanu frees the country."],[1965,"Independence","26 July."],[1968,"Republic","11 November."]]},
  "g4-rights#2":{t:"tiles", items:[["🎒","Education","Going to school."],["🩺","Health","Care when sick."],["⚽","Play","Time to play and rest."],["🛡️","Safety","Protection from harm."],["🗣️","Be heard","Your views matter."]]},
  "g4-sources#1":{t:"compare", cols:[["Fact (can be checked)","🏙️ Malé is the capital.","📅 A week has seven days.","🌊 The Maldives is in the Indian Ocean."],["Opinion (what someone thinks)","😋 Garudhiya is the best food.","⚽ Football is the best sport.","🏙️ Malé is the best city."]]},
  "g4-islam#1":{t:"day"},
  "g4-atollform#0":{t:"atoll"},
  "g4-farming#1":{t:"tiles", items:[["🍌","Bananas",""],["🥭","Papaya",""],["🌶️","Chillies",""],["🍉","Watermelon",""],["🍈","Breadfruit",""]]},
  "g4-water#1":{t:"groundwater"},
  "g5-thaana#3":{t:"thaana", letters:true},
  "g5-weather#1":{t:"monsoon"},
  "g5-tourism#2":{t:"timeline", events:[[1972,"First resort","Tourism begins."],[2009,"Guesthouses","Local islands welcome visitors (around this time)."]]},
  "g5-history#0":{t:"timeline", events:[[1153,"Islam","Embraced in 1153."],[1343,"Ibn Battuta","Lives here as a judge in the 1340s."],[1573,"Freedom","Bodu Thakurufaanu frees the country."],[1965,"Independence","26 July."],[1968,"Republic","11 November."]]},
  "g5-government#0":{t:"branches"},
  "g5-graphs#0":{t:"scale"},
  "g5-graphs#3":{t:"graph"},
  "g5-sultans#1":{t:"tiles", items:[["👑","Theemuge","An early royal dynasty."],["👑","Hilaaly","A royal dynasty."],["👑","Utheemu","Began with Muhammad Thakurufaanu."],["👑","Huraa","The last dynasty, until 1968."]]},
  "g5-dialects#1":{t:"map", places:["Huvadhoo","Fuvahmulah","Addu City"], note:"These southern atolls have their own ways of speaking Dhivehi."},
  "g5-energy#1":{t:"flow", steps:[["🚢","Fuel arrives by ship"],["🏭","Power station"],["⚡","Electricity"],["🏠","Homes and schools"]]},
  "g5-energy#3":{t:"compare", cols:[["Diesel","⛽ Must be imported","💸 Costs a lot","🌫️ Pollutes the air"],["Solar","☀️ Sunshine all year","💰 Free once panels are up","🌿 Clean"]]},
  "g5-media#1":{t:"timeline", events:[[1962,"Radio","Radio broadcasting begins."],[1978,"Television","TVM starts."],[2000,"Internet","News moves online (2000s)."]]},
  "g6-world#2":{t:"timeline", events:[[1965,"United Nations","Joins in September 1965."],[1985,"SAARC","A founding member."]]},
  "g6-climate#1":{t:"sealevel"},
  "g6-climate#2":{t:"compare", cols:[["Healthy coral","🪸 Bright colours","🐠 Full of fish","🌡️ Water not too warm"],["Bleached coral","🤍 Turns white","🐟 Fish leave","🔥 Water too warm"]]},
  "g6-money#1":{t:"budget"},
  "g6-modern#0":{t:"timeline", events:[[1932,"Constitution","The first written constitution."],[1953,"First republic","Mohamed Amin Didi is President."],[1965,"Independence","26 July."],[1968,"Second republic","11 November."],[2008,"New constitution","First multi-party election."]]},
  "g6-democracy#1":{t:"branches"},
  "g6-project#0":{t:"flow", steps:[["❓","Ask a question"],["📋","Plan"],["🔎","Collect"],["🧠","Analyse"],["🎤","Present"]]},
  "g6-protect#1":{t:"map", places:["Addu City"], note:"Gan, in Addu Atoll, had a British air base from 1957 to 1976."},
  "g6-protect#3":{t:"timeline", events:[[1887,"Protectorate","Britain handles foreign affairs."],[1957,"Gan air base","The RAF base opens."],[1965,"Independence","Signed in Colombo, 26 July."],[1976,"Last forces leave","Gan closes."]]},
  "g6-ocean#2":{t:"ratio"},
  "g6-trade#1":{t:"compare", cols:[["Imports","🍚 Food","⛽ Fuel","🚗 Cars","💊 Medicine"],["Exports","🐟 Tuna","","",""]]},
  "g6-global#1":{t:"sdg"}
};

const vizEsc = s => esc(String(s));
function vizHTML(spec, key){
  const w = (inner, cap, cls) => `<figure class="viz ${cls||""}" data-key="${key}">${inner}${cap ? `<figcaption>${cap}</figcaption>` : ""}</figure>`;
  switch(spec.t){
  case "tiles": return w(`<div class="vz-tiles">${spec.items.map(([e,t,d],k) => `<button type="button" class="vz-tile" data-tile="${k}" aria-pressed="false"><span class="e" aria-hidden="true">${e}</span><b>${vizEsc(t)}</b>${d ? `<span class="d">${vizEsc(d)}</span>` : ""}</button>`).join("")}</div>`, "Tap a picture to look closer.");
  case "compare": return w(`<div class="vz-compare">${spec.cols.map(([h,...rows],k) => `<div class="col c${k}"><b>${vizEsc(h)}</b>${rows.filter(Boolean).map(r => `<span>${vizEsc(r)}</span>`).join("")}</div>`).join("")}</div>`);
  case "flow": return w(`<ol class="vz-flow ${spec.loop ? "loop" : ""}">${spec.steps.map(([e,t,d]) => `<li><span class="e" aria-hidden="true">${e}</span><b>${vizEsc(t)}</b>${d ? `<span class="d">${vizEsc(d)}</span>` : ""}</li>`).join("")}</ol>`, spec.loop ? "…and round again." : "");
  case "timeline": return w(`<div class="vz-timeline"><div class="line"></div>${spec.events.map(([y,t],k) => `<button type="button" class="ev" data-ev="${k}" aria-pressed="${k===0}" style="--p:${spec.events.length>1 ? k/(spec.events.length-1)*100 : 50}%"><i></i><b>${y}</b><span>${vizEsc(t)}</span></button>`).join("")}</div><p class="vz-detail" data-detail>${vizEsc(spec.events[0][0]+": "+spec.events[0][2])}</p>`, "Tap a date. Dates are evenly spaced, not to scale.", "wide");
  case "map": {
    let h = `<div class="mapbox vz-map" role="img" aria-label="Map of the Maldives${spec.places.length ? " showing "+spec.places.join(", ") : ""}">`;
    ATOLLS.forEach(([lat,lon,aw,ah]) => h += `<span class="atoll" style="left:${mx(lon)}%;top:${my(lat)}%;width:${aw/(MAP.lon1-MAP.lon0)*100}%;height:${ah/(MAP.lat0-MAP.lat1)*100}%"></span>`);
    h += `<span class="equator" style="top:${my(0)}%"><span>Equator</span></span><span class="compass" aria-hidden="true">▲<br>N</span>`;
    spec.places.forEach(n => { const [lat,lon] = PLACES[n]; h += `<span class="place right" style="left:${mx(lon)}%;top:${my(lat)}%"></span><span class="place-label ${mx(lon) > 55 ? "left" : ""}" style="left:${mx(lon)}%;top:${my(lat)}%">${vizEsc(n)}</span>`; });
    return w(h + `</div>`, vizEsc(spec.note || "") + " Map not to scale.");
  }
  case "island": {
    const parts = [["ocean","🌊 Deep ocean","Deep blue water, far from land."],["reef","🪸 Coral reef","Living coral that breaks the big waves."],["lagoon","🐠 Lagoon","Shallow, calm water inside the reef."],["beach","🏖️ Beach","Soft white sand made from broken coral."],["land","🌴 Island","Where we live: homes, mosque, school."]];
    return w(`<svg class="vz-svg" viewBox="0 0 400 150" role="img" aria-label="Side view of an island: ocean, reef, lagoon, beach and land">
      <rect class="sky" x="0" y="0" width="400" height="70"/>
      <rect class="p-ocean deep" data-part="ocean" x="0" y="70" width="400" height="80"/>
      <polygon class="p-reef" data-part="reef" points="110,150 125,74 150,72 165,150"/>
      <rect class="p-lagoon" data-part="lagoon" x="165" y="70" width="95" height="40"/>
      <polygon class="sand" points="150,150 165,110 260,110 280,72 400,72 400,150"/>
      <polygon class="p-beach" data-part="beach" points="260,110 280,70 315,64 300,110"/>
      <rect class="p-land" data-part="land" x="300" y="56" width="100" height="16" rx="4"/>
      <text x="345" y="50" font-size="26" text-anchor="middle">🌴🏠</text>
      <text x="40" y="60" font-size="20">⛵</text>
    </svg><div class="vz-chips">${parts.map(([k,t]) => `<button type="button" data-hl="${k}">${t}</button>`).join("")}</div><p class="vz-detail" data-detail>Tap a part of the island.</p>`, "", "island");
  }
  case "flag": return w(`<svg class="vz-svg flag" viewBox="0 0 300 200" role="img" aria-label="The flag of the Maldives">
      <rect data-part="red" x="0" y="0" width="300" height="200" fill="#d21034"/>
      <rect data-part="green" x="50" y="50" width="200" height="100" fill="#007e3a"/>
      <circle data-part="crescent" cx="142" cy="100" r="36" fill="#fff"/><circle cx="157" cy="100" r="31" fill="#007e3a"/>
    </svg><div class="vz-chips"><button type="button" data-say="Red: the courage of our national heroes.">🟥 Red</button><button type="button" data-say="Green: peace and progress.">🟩 Green</button><button type="button" data-say="White crescent: Islam.">🌙 Crescent</button></div><p class="vz-detail" data-detail>Tap a colour to find out what it means.</p>`);
  case "compass": return w(`<div class="vz-compass"><span class="rose" aria-hidden="true">🧭</span>${[["N","North","Towards Haa Alif, the top of the country."],["E","East","Where the sun rises."],["S","South","Towards Addu City, the bottom of the country."],["W","West","Where the sun sets."]].map(([k,t,d]) => `<button type="button" class="d-${k}" data-say="${t}: ${d}">${k}</button>`).join("")}</div><p class="vz-detail" data-detail>Tap N, E, S or W.</p>`);
  case "family": return w(`<div class="vz-family"><div class="gen">${["👴","👵","👴","👵"].map(e => `<span>${e}</span>`).join("")}<b>Grandparents</b></div><div class="gen">${["👨","👩"].map(e => `<span>${e}</span>`).join("")}<b>Parents</b></div><div class="gen me">${["🧒","👧","👦"].map(e => `<span>${e}</span>`).join("")}<b>Me, my brothers and sisters</b></div></div>`, "A family tree: the oldest people are at the top.");
  case "thaana":
    if(spec.letters){
      const L = [["ހ","haa"],["ށ","shaviyani"],["ނ","noonu"],["ރ","raa"],["ބ","baa"],["ޅ","lhaviyani"],["ކ","kaafu"],["އ","alifu"],["ވ","vaavu"]];
      return w(`<div class="vz-thaana letters" dir="rtl" lang="dv">${L.map(([c,n],k) => `<span><b>${c}</b><small dir="ltr" lang="en">${k+1} · ${n}</small></span>`).join("")}</div><p class="vz-rtl" aria-hidden="true">← read from right to left</p>`, "The first nine Thaana letters. They came from the Arabic numbers 1 to 9.");
    }
    return w(`<div class="vz-thaana">${spec.words.map(([d,e]) => `<div><b dir="rtl" lang="dv">${d}</b><span>${vizEsc(e)}</span></div>`).join("")}</div><p class="vz-rtl" aria-hidden="true">← Thaana is written from right to left</p>`);
  case "day": {
    const P = [["🌅","Early morning","Fajr prayer, before sunrise.",8,78],["☀️","Midday","Dhuhr prayer, sun high in the sky.",50,8],["🌤️","Afternoon","Asr prayer.",74,30],["🌇","Sunset","Maghrib prayer, as the sun sets.",92,78],["🌙","Night","Isha prayer.",50,20]];
    const days = JSON.stringify(P.map(p => p[1] + ": " + p[2])).replace(/"/g, "&quot;");
    return w(`<div class="vz-day" data-day="0" data-days="${days}"><div class="sky">${P.map(([e,,,x,y],k) => `<span class="sun s${k}" style="left:${x}%;top:${y}%" aria-hidden="true">${e}</span>`).join("")}<span class="ground"></span></div>
      <input type="range" min="0" max="4" value="0" aria-label="Time of day" data-dayslider>
      <p class="vz-detail" data-detail></p></div>`, "Slide to move through the day.");
  }
  case "money": return w(`<div class="vz-notes">${[[5,"#9a6fb0"],[10,"#c4553e"],[20,"#d68b2c"],[50,"#2c7d9a"],[100,"#3c8a52"],[500,"#b0476d"],[1000,"#6b6b2c"]].map(([v,c]) => `<span style="--c:${c}">${v}<small>MVR</small></span>`).join("")}</div>
    <div class="vz-change"><label>Price of the snack <input type="range" min="1" max="19" value="7" data-price></label><div class="row"><span>Pay with:</span><button type="button" data-pay="10">10</button><button type="button" data-pay="20">20</button></div><p class="vz-detail" data-detail>Price: 7 rufiyaa. Choose a note to pay with.</p></div>`, "Rufiyaa notes. 100 laari make 1 rufiyaa.");
  case "atoll": return w(`<div class="vz-atoll"><svg class="vz-svg" viewBox="0 0 300 140" role="img" aria-label="How an atoll forms" data-atollsvg></svg>
    <input type="range" min="1" max="4" value="1" aria-label="Stage" data-atollslider><p class="vz-detail" data-detail></p></div>`, "Slide through the four stages.", "wide");
  case "groundwater": return w(`<div class="vz-gw"><svg class="vz-svg" viewBox="0 0 300 150" role="img" aria-label="Fresh water floating under an island" data-gwsvg></svg>
    <label>How much water we pump <input type="range" min="0" max="100" value="20" data-gwslider></label><p class="vz-detail" data-detail></p></div>`, "Fresh water floats on top of salty sea water under the island.");
  case "sealevel": return w(`<div class="vz-sea"><svg class="vz-svg" viewBox="0 0 300 150" role="img" aria-label="Island and rising sea" data-seasvg></svg>
    <label>Sea level rise <input type="range" min="0" max="100" value="0" step="10" data-seaslider></label><p class="vz-detail" data-detail></p></div>`, "Most Maldivian land is less than 1 metre above the sea.");
  case "monsoon": return w(`<div class="vz-monsoon"><svg class="vz-svg" viewBox="0 0 200 260" role="img" aria-label="Monsoon winds over the Maldives" data-monsvg></svg>
    <div class="vz-chips"><button type="button" data-mon="iruvai" aria-pressed="true">🌤️ Iruvai</button><button type="button" data-mon="hulhangu" aria-pressed="false">🌧️ Hulhangu</button></div><p class="vz-detail" data-detail></p></div>`, "The two monsoons blow from opposite directions.");
  case "branches": return w(`<div class="vz-branches"><div class="roof">📜 The Constitution</div><div class="pillars">${[["🏛️","Executive","The President and ministers run the government."],["🗳️","Legislature","The People’s Majlis makes the laws."],["⚖️","Judiciary","The courts decide if laws were broken. The Supreme Court is the highest."]].map(([e,t,d]) => `<button type="button" data-say="${t}: ${d}"><span aria-hidden="true">${e}</span><b>${t}</b></button>`).join("")}</div></div><p class="vz-detail" data-detail>Tap a pillar.</p>`, "Power is shared so no one group has all of it.");
  case "scale": return w(`<div class="vz-scale"><div class="ruler" data-ruler></div><label>Distance on the map <input type="range" min="1" max="10" value="3" data-scaleslider></label><p class="vz-detail" data-detail></p></div>`, "On this map, 1 cm stands for 10 km.");
  case "graph": {
    const cats = [["🚶","Walk"],["🚲","Bicycle"],["🛵","Motorbike"],["🚌","Bus"]];
    return w(`<div class="vz-graph" data-graph="[3,2,2,1]"><div class="bars">${cats.map(([e,t],k) => `<div class="bar"><i data-bar="${k}"></i><span>${e}<br>${t}</span></div>`).join("")}</div><div class="vz-chips">${cats.map(([,t],k) => `<button type="button" data-vote="${k}">+1 ${t}</button>`).join("")}</div></div>`, "Example data: tap to add a vote and watch the graph change.");
  }
  case "budget": return w(`<div class="vz-budget"><p>Monthly pocket money: <b>500 rufiyaa</b></p>${[["food","🍱 Snacks",150],["fun","🎮 Fun",100],["gifts","🎁 Gifts",50]].map(([k,t,v]) => `<label>${t} <input type="range" min="0" max="250" step="25" value="${v}" data-bud="${k}"></label>`).join("")}<div class="track"><i data-saved></i></div><p class="vz-detail" data-detail></p></div>`, "A budget plans spending so you can save.");
  case "ratio": return w(`<div class="vz-ratio"><canvas width="300" height="150" data-ratio aria-label="About 3,000 squares of sea for every 1 square of land" role="img"></canvas></div>`, "For every 1 square of land (orange), the Maldives has about 3,000 squares of sea.");
  case "sdg": {
    const N = ["No poverty","Zero hunger","Good health and well-being","Quality education","Gender equality","Clean water and sanitation","Affordable and clean energy","Decent work and economic growth","Industry, innovation and infrastructure","Reduced inequalities","Sustainable cities and communities","Responsible consumption and production","Climate action","Life below water","Life on land","Peace, justice and strong institutions","Partnerships for the goals"];
    return w(`<div class="vz-sdg">${N.map((n,k) => `<button type="button" class="${[3,5,12,13].includes(k) ? "key" : ""}" style="--h:${k*21}" data-say="Goal ${k+1}: ${n}">${k+1}</button>`).join("")}</div><p class="vz-detail" data-detail>Tap a goal. Starred goals matter most for islands.</p>`, "The 17 Sustainable Development Goals.");
  }
  case "parts": return w(`<div class="vz-parts"><span class="center" aria-hidden="true">${spec.center}</span><div class="vz-chips">${spec.parts.map(([t,d]) => `<button type="button" data-say="${vizEsc(t)}: ${vizEsc(d)}">${vizEsc(t)}</button>`).join("")}</div></div><p class="vz-detail" data-detail>Tap a part.</p>`);
  }
  return "";
}

/* draw the moving diagrams */
function atollStage(n){
  const sea = 60, vol = [0, 20, 40, 62, 84][n];
  let s = `<rect class="sky" x="0" y="0" width="300" height="${sea}"/><rect class="deep" x="0" y="${sea}" width="300" height="${140-sea}"/>`;
  s += `<polygon class="rock" points="70,140 150,${vol} 230,140"/>`;
  if(n >= 2){
    const h = n === 2 ? sea+6 : sea-2;
    s += `<polygon class="coral" points="${n===2?"88,140 100,"+h+" 118,"+h+" 112,140":"40,140 58,"+h+" 82,"+h+" 76,140"}"/><polygon class="coral" points="${n===2?"188,140 182,"+h+" 200,"+h+" 212,140":"224,140 218,"+h+" 242,"+h+" 260,140"}"/>`;
  }
  if(n === 4) s += `<rect class="lagoon" x="82" y="${sea}" width="136" height="16"/><text x="70" y="${sea-4}" font-size="14" text-anchor="middle">🌴</text><text x="230" y="${sea-4}" font-size="14" text-anchor="middle">🌴</text>`;
  s += `<line class="sealine" x1="0" y1="${sea}" x2="300" y2="${sea}"/><text class="lbl" x="294" y="${sea-5}" text-anchor="end">sea level</text>`;
  return s;
}
const ATOLL_TEXT = ["", "1. A volcano rises out of the ocean.", "2. Corals grow around it in the warm shallow water.", "3. The volcano slowly sinks. The corals keep growing up towards the light.", "4. The volcano is gone. A ring of coral and sand islands surrounds a lagoon: an atoll!"];
function gwDraw(p){
  const lens = Math.max(6, 46 - p*0.4), salty = p > 70;
  return `<rect class="sky" x="0" y="0" width="300" height="60"/><rect class="deep" x="0" y="60" width="300" height="90"/>
    <rect class="sandfill" x="60" y="48" width="180" height="14" rx="6"/><text x="150" y="44" font-size="20" text-anchor="middle">🏠🌴🏠</text>
    <ellipse class="${salty ? "brackish" : "fresh"}" cx="150" cy="62" rx="${80 - p*0.3}" ry="${lens}"/>
    <rect x="${150 - 2}" y="40" width="4" height="${22 + lens*0.6}" class="pipe"/><text class="lbl" x="150" y="${70 + lens*0.5}" text-anchor="middle">${salty ? "salty!" : "fresh water"}</text>
    <text class="lbl" x="20" y="140">salty sea water</text>`;
}
function seaDraw(cm){
  const ground = 70, water = ground + 6 - cm*0.07;
  return `<rect class="sky" x="0" y="0" width="300" height="150"/>
    <polygon class="sandfill" points="40,150 70,${ground} 230,${ground} 260,150"/><text x="150" y="${ground-6}" font-size="22" text-anchor="middle">🏠🌴🏫🌴🏠</text>
    <rect class="deep seaw" x="0" y="${water}" width="300" height="${150-water}"/>
    <line class="sealine" x1="0" y1="${water}" x2="300" y2="${water}"/>`;
}
const SEA_TEXT = cm => cm === 0 ? "Today: the island is just above the sea." : cm < 50 ? `Sea up ${cm} cm: waves reach further onto the beach and wash sand away.` : cm < 100 ? `Sea up ${cm} cm: floods are common and fresh water turns salty.` : "Sea up 1 metre: much of the island could be under water.";
function monDraw(which){
  let s = `<rect class="deep" x="0" y="0" width="200" height="260"/>`;
  ATOLLS.forEach(([lat,lon,aw,ah]) => s += `<ellipse class="atollv" cx="${mx(lon)*2}" cy="${my(lat)*2.6}" rx="${aw/(MAP.lon1-MAP.lon0)*100}" ry="${ah/(MAP.lat0-MAP.lat1)*130}"/>`);
  const ne = which === "iruvai";
  [[30,40],[90,90],[40,150],[110,190],[60,230]].forEach(([x,y]) => {
    const dx = ne ? -30 : 30, dy = ne ? 22 : -22, x0 = ne ? x+40 : x, y0 = ne ? y-20 : y+10;
    s += `<line class="wind ${ne ? "dry" : "wet"}" x1="${x0}" y1="${y0}" x2="${x0+dx}" y2="${y0+dy}" marker-end="url(#arrowhead)"/>`;
  });
  s += `<defs><marker id="arrowhead" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 Z" class="arrowfill"/></marker></defs>`;
  s += `<text x="186" y="22" text-anchor="end" font-size="26">${ne ? "🌤️" : "🌧️"}</text>`;
  return s;
}
const MON_TEXT = {iruvai:"Iruvai, the northeast monsoon (about December to April): drier, calmer seas.", hulhangu:"Hulhangu, the southwest monsoon (about May to November): more rain, strong winds, rough seas."};

function bindViz(root){
  root.querySelectorAll(".viz").forEach(fig => {
    const detail = fig.querySelector("[data-detail]");
    const say = t => { if(detail) detail.textContent = t; };
    fig.querySelectorAll("[data-tile]").forEach(b => b.onclick = () => { fig.querySelectorAll("[data-tile]").forEach(x => x.setAttribute("aria-pressed", x===b)); if(canSpeak) speak(b.innerText.replace(/\n/g, ". ")); });
    fig.querySelectorAll("[data-say]").forEach(b => b.onclick = () => { say(b.dataset.say); fig.querySelectorAll("[data-say]").forEach(x => x.setAttribute("aria-pressed", x===b)); });
    fig.querySelectorAll("[data-ev]").forEach(b => b.onclick = () => {
      const spec = VIZ[fig.dataset.key]; const ev = spec.events[+b.dataset.ev];
      fig.querySelectorAll("[data-ev]").forEach(x => x.setAttribute("aria-pressed", x===b)); say(ev[0] + ": " + ev[2]);
    });
    fig.querySelectorAll("[data-hl]").forEach(b => b.onclick = () => {
      const k = b.dataset.hl, info = {ocean:"Deep blue water, far from land.", reef:"Living coral that breaks the big waves and protects the island.", lagoon:"Shallow, calm water between the reef and the beach.", beach:"Soft white sand made from broken coral.", land:"Where we live: homes, the mosque, the school."}[k];
      const svg = fig.querySelector("svg"); if(svg) svg.classList.add("hl-any");
      fig.querySelectorAll("[data-part]").forEach(p => p.classList.toggle("hl", p.dataset.part === k));
      fig.querySelectorAll("[data-hl]").forEach(x => x.setAttribute("aria-pressed", x===b)); say(b.textContent + ": " + info);
    });
    const ds = fig.querySelector("[data-dayslider]");
    if(ds){ const box = fig.querySelector(".vz-day"), txt = JSON.parse(box.dataset.days); const up = () => { box.dataset.day = ds.value; say(txt[+ds.value]); }; ds.oninput = up; up(); }
    const price = fig.querySelector("[data-price]");
    if(price){
      let p = 7; price.oninput = () => { p = +price.value; say(`Price: ${p} rufiyaa. Choose a note to pay with.`); };
      fig.querySelectorAll("[data-pay]").forEach(b => b.onclick = () => { const pay = +b.dataset.pay; say(pay < p ? `${pay} rufiyaa is not enough for ${p} rufiyaa.` : `You pay ${pay}. Your change is ${pay - p} rufiyaa.`); });
    }
    const as = fig.querySelector("[data-atollslider]");
    if(as){ const svg = fig.querySelector("[data-atollsvg]"); const up = () => { svg.innerHTML = atollStage(+as.value); say(ATOLL_TEXT[+as.value]); }; as.oninput = up; up(); }
    const gs = fig.querySelector("[data-gwslider]");
    if(gs){ const svg = fig.querySelector("[data-gwsvg]"); const up = () => { const v = +gs.value; svg.innerHTML = gwDraw(v); say(v > 70 ? "Too much pumping: sea water pushes in and the well turns salty." : v > 40 ? "The fresh water layer is getting thinner." : "A healthy layer of fresh water."); }; gs.oninput = up; up(); }
    const ss = fig.querySelector("[data-seaslider]");
    if(ss){ const svg = fig.querySelector("[data-seasvg]"); const up = () => { svg.innerHTML = seaDraw(+ss.value); say(SEA_TEXT(+ss.value)); }; ss.oninput = up; up(); }
    const ms = fig.querySelector("[data-monsvg]");
    if(ms){ const set = k => { ms.innerHTML = monDraw(k); say(MON_TEXT[k]); fig.querySelectorAll("[data-mon]").forEach(x => x.setAttribute("aria-pressed", x.dataset.mon===k)); }; fig.querySelectorAll("[data-mon]").forEach(b => b.onclick = () => set(b.dataset.mon)); set("iruvai"); }
    const sc = fig.querySelector("[data-scaleslider]");
    if(sc){ const ruler = fig.querySelector("[data-ruler]"); const up = () => { const v = +sc.value; ruler.style.setProperty("--w", v*10 + "%"); ruler.innerHTML = `<i></i><span>${v} cm</span>`; say(`${v} cm on the map = ${v*10} km in real life.`); }; sc.oninput = up; up(); }
    const gr = fig.querySelector("[data-graph]");
    if(gr){ const data = JSON.parse(gr.dataset.graph); const up = () => { const m = Math.max(...data, 5); gr.querySelectorAll("[data-bar]").forEach(i => { i.style.height = data[+i.dataset.bar]/m*100 + "%"; i.dataset.n = data[+i.dataset.bar]; }); }; fig.querySelectorAll("[data-vote]").forEach(b => b.onclick = () => { data[+b.dataset.vote]++; up(); }); up(); }
    const bud = fig.querySelectorAll("[data-bud]");
    if(bud.length){ const up = () => { const spent = [...bud].reduce((s,i) => s + +i.value, 0), saved = Math.max(0, 500 - spent); fig.querySelector("[data-saved]").style.width = saved/500*100 + "%"; say(spent > 500 ? `You planned ${spent} rufiyaa: that’s more than 500!` : `Spending ${spent} rufiyaa, saving ${saved} rufiyaa.`); }; bud.forEach(i => i.oninput = up); up(); }
    const rc = fig.querySelector("[data-ratio]");
    if(rc){
      const x = rc.getContext("2d"), cs = getComputedStyle(document.documentElement), cols = 75, rows = 40, cw = 300/cols, ch = 150/rows;
      x.fillStyle = cs.getPropertyValue("--water-bot").trim() || "#6ccfd6"; x.fillRect(0,0,300,150);
      x.strokeStyle = "rgba(255,255,255,.35)"; x.lineWidth = .5;
      for(let i=0;i<=cols;i++){ x.beginPath(); x.moveTo(i*cw,0); x.lineTo(i*cw,150); x.stroke(); }
      for(let j=0;j<=rows;j++){ x.beginPath(); x.moveTo(0,j*ch); x.lineTo(300,j*ch); x.stroke(); }
      x.fillStyle = "#e1702a"; x.fillRect(37*cw, 20*ch, cw, ch);
    }
  });
}

function vLesson(app){
  const l = lessonById(view.id), i = view.i, card = l.cards[i], s = STRANDS[l.strand];
  const last = i === l.cards.length - 1, key = l.id + "#" + i, spec = VIZ[key];
  const gname = GUIDES[l.strand][1], scene = SCENES[LESSONS.indexOf(l) % SCENES.length];
  app.innerHTML = `
    <div class="lesson-head">
      <ol class="learning-steps" aria-label="Lesson steps">${l.cards.map((_,k) => `<li class="${k===i ? "current" : k<i ? "past" : ""}" ${k===i ? 'aria-current="step"' : ""}>${k+1}<span class="lbl">. ${k===0 ? "Your goal" : "Learn"}</span></li>`).join("")}<li>${l.cards.length+1}<span class="lbl">. Quiz</span></li></ol>
    </div>
    <article class="page lesson-page ${spec ? "has-viz" : ""}">
      ${i===0 ? `<div class="scene" style="background-image:url(${IMG["scene-" + scene]})"><img class="guide" src="${guideImg(l.strand)}" alt="${gname}, your guide"><p class="bubble"><b>${gname}’s lesson</b>${esc(l.blurb)}</p></div>` : ""}
      <div class="lesson-body">
        <div class="lesson-text">
          <span class="eyebrow" style="color:var(${s.c})">${s.name} · Grade ${l.grade} · ${esc(l.title)}</span>
          <h2>${i===0 ? `<span class="pic" aria-hidden="true">${l.pic}</span> ` : ""}${esc(card.h)}</h2>
          <p class="txt">${esc(card.t)}</p>
          ${card.w ? `<p class="word"><img class="mini-guide" src="${guideImg(l.strand)}" alt="">${esc(card.w)}</p>` : ""}
        </div>
        ${spec ? vizHTML(spec, key) : i > 0 ? `<img class="side-guide" src="${guideImg(l.strand)}" alt="">` : ""}
      </div>
    </article>`;
  bindViz(app);
  setControls(`<button class="btn alt" id="back" type="button" aria-label="Close lesson">✕</button>
    <button class="btn alt" id="prev" type="button" ${i===0?"disabled":""}>← Back</button>
    ${canSpeak ? `<button class="btn alt" id="read" type="button" aria-label="Read to me">🔊</button>` : ""}
    <button class="btn grow ${last?"coral":""}" id="next" type="button">${last ? "Take the quiz →" : "Next →"}</button>`);
  $("#back").onclick = () => go("lessons");
  $("#prev").onclick = () => go("lesson", {id:l.id, i:i-1, t0:view.t0});
  $("#next").onclick = () => last ? startQuiz(l.id, view.t0) : go("lesson", {id:l.id, i:i+1, t0:view.t0});
  const r = $("#read"); if(r) r.onclick = () => speak(card.h + ". " + card.t + (card.w ? ". " + card.w : ""));
}

/* ---------- Questions (shared by lesson quizzes and the daily challenge) ---------- */
function prepQ(q){
  const s = {q, answered:false, ok:false, given:""};
  if(q.t === "mc") s.opts = shuffle(q.a);
  if(q.t === "order"){ s.pool = shuffle(q.items.map((_,k) => k)); if(s.pool.every((v,k) => v===k)) s.pool.reverse(); s.seq = []; }
  if(q.t === "sort"){ s.order = shuffle(q.items.map((_,k) => k)); s.assign = {}; }
  return s;
}
function startQuiz(id, t0){
  const l = lessonById(id);
  go("quiz", {mode:"lesson", id, t0:t0||Date.now(), qs:shuffle(l.quiz).map(prepQ), i:0, score:0});
}
function startDaily(){
  const c = kid();
  const due = shuffle(dueReviews(c)).map(qById);
  const doneLs = LESSONS.filter(l => isDone(c,l));
  const pool = (doneLs.length ? doneLs : gradeLessons(store.grade)).flatMap(l => l.quiz).filter(q => !due.includes(q));
  const qs = due.slice(0,3).concat(shuffle(pool)).slice(0,5);
  go("quiz", {mode:"daily", t0:Date.now(), qs:qs.map(prepQ), i:0, score:0});
}
function record(s, ok, given){
  const c = kid(), q = s.q;
  s.answered = true; s.ok = ok; s.given = given;
  if(ok) view.score++;
  const r = c.review[q.qid];
  if(!ok){
    c.review[q.qid] = {due:addDays(1), box:0};
    const right = q.t === "mc" ? q.a[0] : q.t === "map" ? q.place : q.t === "order" ? q.items.join(" → ") : q.items.map(([t,b]) => t+": "+q.bins[b]).join(", ");
    c.misses.unshift({at:Date.now(), qid:q.qid, q:q.q, given, right});
    c.misses = c.misses.slice(0,40);
  } else if(r){
    const box = r.box + 1;
    if(box >= REVIEW_GAPS.length) delete c.review[q.qid]; else c.review[q.qid] = {due:addDays(REVIEW_GAPS[box]), box};
  }
  render();
  const n = $("#next"); if(n) n.focus();
}
function feedbackHTML(s){
  const q = s.q;
  if(!s.answered) return "";
  let fix = "";
  if(!s.ok){
    if(q.t === "mc") fix = `The answer is “${esc(q.a[0])}”. `;
    if(q.t === "map") fix = `That was ${esc(s.given)}. The green dot is ${esc(q.place)}. `;
    if(q.t === "order") fix = `The right order is: ${q.items.map(esc).join(" → ")}. `;
    if(q.t === "sort") fix = `Check the rows in red to see the right group. `;
  }
  const fl = lessonById(q.qid.split(":")[0]);
  return `<div class="feedback ${s.ok?"ok":"no"}">${fl ? `<img class="fb-guide" src="${guideImg(fl.strand)}" alt="">` : ""}<p><b>${s.ok ? "Well done! ★" : "Not quite."}</b> ${fix}${q.w ? esc(q.w) : ""}${!s.ok ? " This question will come back in a daily challenge." : ""}</p></div>`;
}
function mapHTML(s){
  const q = s.q;
  let h = `<div class="mapbox" role="group" aria-label="Map of the Maldives">`;
  ATOLLS.forEach(([lat,lon,w,ht]) => h += `<span class="atoll" style="left:${mx(lon)}%;top:${my(lat)}%;width:${w/(MAP.lon1-MAP.lon0)*100}%;height:${ht/(MAP.lat0-MAP.lat1)*100}%"></span>`);
  h += `<span class="equator" style="top:${my(0)}%"><span>Equator</span></span><span class="compass" aria-hidden="true">▲<br>N</span>`;
  Object.entries(PLACES).forEach(([name,[lat,lon]],k) => {
    let cls = "place";
    if(s.answered){ if(name === q.place) cls += " right"; else if(name === s.given) cls += " wrong"; }
    h += `<button class="${cls}" type="button" data-place="${esc(name)}" style="left:${mx(lon)}%;top:${my(lat)}%" aria-label="${s.answered ? esc(name) : "Place "+(k+1)}" ${s.answered?"disabled":""}></button>`;
    if(s.answered) h += `<span class="place-label ${mx(lon) > 55 ? "left" : ""}" style="left:${mx(lon)}%;top:${my(lat)}%">${esc(name)}</span>`;
  });
  return h + `</div><p class="maptip">Map not to scale. Tap a dot.</p>`;
}
function questionHTML(s){
  const q = s.q;
  if(q.t === "mc") return `<div class="opts">${s.opts.map((o,k) => {
    let cls = "opt"; if(s.answered){ if(o===q.a[0]) cls += " right"; else if(o===s.given) cls += " wrong"; }
    return `<button class="${cls}" type="button" data-o="${k}" ${s.answered?"disabled":""}>${esc(o)}</button>`; }).join("")}</div>`;
  if(q.t === "map") return mapHTML(s);
  if(q.t === "order"){
    const placed = s.seq.map((k,pos) => `<li class="${s.answered ? (k===pos ? "right" : "wrong") : ""}">${esc(q.items[k])}</li>`).join("");
    const slots = s.answered ? "" : Array.from({length:q.items.length - s.seq.length}, () => `<li class="slot">Tap an item below</li>`).join("");
    return `<ol class="seq">${placed}${slots}</ol>
      ${s.answered ? "" : `<div class="pool">${s.pool.filter(k => !s.seq.includes(k)).map(k => `<button class="opt" type="button" data-ord="${k}">${esc(q.items[k])}</button>`).join("")}</div>
      <div class="row"><button class="btn alt small" id="undo" type="button" ${s.seq.length?"":"disabled"}>Undo</button><button class="btn small" id="check" type="button" ${s.seq.length===q.items.length?"":"disabled"}>Check my order</button></div>`}`;
  }
  if(q.t === "sort") return `<div class="sortrows">${s.order.map(k => {
      const [txt, bin] = q.items[k], a = s.assign[k];
      return `<div class="sortrow ${s.answered ? (a===bin ? "right" : "wrong") : ""}"><b>${esc(txt)}</b><div class="bins">${q.bins.map((bn,bi) => `<button type="button" data-item="${k}" data-bin="${bi}" aria-pressed="${a===bi}" ${s.answered?"disabled":""}>${esc(bn)}</button>`).join("")}</div></div>`; }).join("")}</div>
      ${s.answered ? "" : `<div class="row"><button class="btn small" id="check" type="button" ${Object.keys(s.assign).length===q.items.length?"":"disabled"}>Check my answers</button></div>`}`;
  return "";
}
const TYPE_LABEL = {mc:"Choose one", map:"Map", order:"Put in order", sort:"Sort into groups"};
function vQuiz(app){
  const s = view.qs[view.i], q = s.q, last = view.i === view.qs.length - 1;
  const title = view.mode === "daily" ? "Daily challenge" : "Quiz · " + esc(lessonById(view.id).title);
  const from = view.mode === "daily" ? lessonById(q.qid.split(":")[0]) : null;
  app.innerHTML = `
    <div class="lesson-head">
      <div class="progress" aria-label="Question ${view.i+1} of ${view.qs.length}"><i style="width:${(view.i+(s.answered?1:0))/view.qs.length*100}%"></i></div>
      <span class="eyebrow">Question ${view.i+1} of ${view.qs.length}</span>
    </div>
    <article class="page">
      <span class="eyebrow">${title}${from ? " · from “"+esc(from.title)+"”" : ""}</span>
      <span class="qtype">${TYPE_LABEL[q.t]}</span>
      <p class="q">${esc(q.q)}</p>
      ${questionHTML(s)}
      ${feedbackHTML(s)}
    </article>`;
  setControls(`<button class="btn alt" id="back" type="button" aria-label="Leave quiz">✕</button>
    ${canSpeak ? `<button class="btn alt" id="read" type="button" aria-label="Read to me" ${s.answered ? "disabled" : ""}>🔊</button>` : ""}
    <button class="btn grow ${last?"coral":""}" id="next" type="button" ${s.answered ? "" : "disabled"}>${s.answered ? (last ? "See my stars →" : "Next question →") : "Answer to continue"}</button>`);
  $("#back").onclick = () => go(view.mode === "daily" ? "home" : "lessons");
  app.querySelectorAll("[data-o]").forEach(b => b.onclick = () => { const pick = s.opts[+b.dataset.o]; record(s, pick === q.a[0], pick); });
  app.querySelectorAll("[data-place]").forEach(b => b.onclick = () => record(s, b.dataset.place === q.place, b.dataset.place));
  app.querySelectorAll("[data-ord]").forEach(b => b.onclick = () => { s.seq.push(+b.dataset.ord); render(); });
  app.querySelectorAll("[data-bin]").forEach(b => b.onclick = () => { s.assign[+b.dataset.item] = +b.dataset.bin; render(); });
  const u = $("#undo"); if(u) u.onclick = () => { s.seq.pop(); render(); };
  const ch = $("#check"); if(ch) ch.onclick = () => {
    if(q.t === "order") record(s, s.seq.every((k,pos) => k===pos), s.seq.map(k => q.items[k]).join(" → "));
    else record(s, q.items.every(([,bin],k) => s.assign[k]===bin), q.items.map(([t],k) => t+": "+q.bins[s.assign[k]]).join(", "));
  };
  const n = $("#next"); if(n) n.onclick = () => { if(!s.answered) return; if(last) finishQuiz(); else { view.i++; render(); window.scrollTo(0,0); } };
  const r = $("#read"); if(r) r.onclick = () => speak(q.q + (q.t === "mc" ? " " + s.opts.join(". Or, ") + "?" : ""));
}

function finishQuiz(){
  const c = kid(), score = view.score, total = view.qs.length;
  const secs = Math.min(1800, Math.round((Date.now() - (view.t0||Date.now()))/1000));
  const before = earned(c), beforeComplete = [1,2,3,4,5,6].filter(g => gradeComplete(c,g));
  let gained = 0;
  if(view.mode === "daily"){
    gained = score + (score === total ? 2 : 0);
    c.bonus = (c.bonus||0) + gained; c.dailyDone = today(); c.dailyCount = (c.dailyCount||0) + 1;
    c.activity.unshift({at:Date.now(), day:today(), kind:"daily", score, total, secs, gained});
    queueHub(c, "daily:" + today(), hubStars(score, total));
  } else {
    const l = lessonById(view.id), prev = c.progress[l.id] || {best:0, attempts:0};
    gained = Math.max(0, score - prev.best);
    const best = Math.max(prev.best, score);
    c.progress[l.id] = {best, attempts:prev.attempts+1, last:score, lastAt:Date.now(), passedAt: prev.passedAt || (best/l.quiz.length >= PASS ? Date.now() : null)};
    c.activity.unshift({at:Date.now(), day:today(), kind:"lesson", lesson:l.id, score, total, secs, gained});
    if(!prev.passedAt && c.progress[l.id].passedAt) queueHub(c, "lesson:" + l.id, hubStars(score, total));
  }
  c.activity = c.activity.slice(0, 120);
  const fresh = BADGES.filter(b => earned(c).has(b.id) && !before.has(b.id));
  const newCert = [1,2,3,4,5,6].find(g => gradeComplete(c,g) && !beforeComplete.includes(g)) || null;
  save(); flushHub();
  go("result", {mode:view.mode, id:view.id, score, total, gained, fresh, newCert});
}

function vResult(app){
  const pct = view.score / view.total, daily = view.mode === "daily";
  const msg = daily ? (pct === 1 ? "Perfect challenge! +2 bonus stars." : "Challenge complete!") : pct === 1 ? "Perfect! You know this lesson inside out." : pct >= PASS ? "Great work! This lesson is finished." : "Good try! Read the lesson again and have another go.";
  app.innerHTML = `
    <article class="page result">
      <span class="eyebrow">${daily ? "Daily challenge" : esc(lessonById(view.id).title)}</span>
      <div class="burst" aria-hidden="true">${Array.from({length:view.score}, (_,k) => `<span style="animation-delay:${k*.12}s;color:var(--sun)">★</span>`).join("")}</div>
      <div class="big">${view.score}/${view.total}</div>
      <h2>${msg}</h2>
      <p class="note">${view.gained ? `You earned ${view.gained} ${view.gained===1?"star":"stars"} to spend in the reef shop.` : daily ? "" : "Beat your best score to earn more stars."}</p>
      ${view.fresh.length ? `<div><p class="eyebrow" style="margin-bottom:8px">New badge${view.fresh.length>1?"s":""}!</p><div class="new-badges">${view.fresh.map(b => `<span class="badge-mini"><i>${b.icon}</i>${esc(b.name)}</span>`).join("")}</div></div>` : ""}
      ${view.newCert ? `<div class="certbar" style="margin:0"><b>You finished all of Grade ${view.newCert}!</b><button class="btn small coral" id="toCert" type="button">Get my certificate</button></div>` : ""}
      <div class="nav" style="justify-content:center">
        ${daily ? "" : `<button class="btn alt" id="again" type="button">Try again</button>`}
        <button class="btn alt" id="shop" type="button">Reef shop</button>
        <button class="btn" id="map" type="button">More lessons</button>
      </div>
    </article>`;
  const a = $("#again"); if(a) a.onclick = () => startQuiz(view.id);
  $("#map").onclick = () => go("lessons");
  $("#shop").onclick = () => go("shop");
  const ce = $("#toCert"); if(ce) ce.onclick = () => go("cert", {grade:view.newCert});
}

function vBadges(app){
  const c = kid(); if(!c) return go("profiles");
  const got = earned(c), certs = [1,2,3,4,5,6].filter(g => gradeComplete(c,g));
  app.innerHTML = `
    <h1 style="font-size:clamp(28px,5vw,40px);color:var(--deep)">${esc(c.name)}’s badges</h1>
    <p class="note">${got.size} of ${BADGES.length} collected · every badge adds a coral to your reef.</p>
    <section class="badges">${BADGES.map(b => `
      <div class="badge ${got.has(b.id)?"":"locked"}"><span class="medal" aria-hidden="true">${b.icon}</span><b>${esc(b.name)}</b><span>${got.has(b.id) ? "Collected" : esc(b.how)}</span></div>`).join("")}
    </section>
    ${certs.length ? `<div class="strip"><h2>Certificates</h2><div class="items">${certs.map(g => `<button class="hw done" type="button" data-cert="${g}">🏅 Grade ${g}</button>`).join("")}</div></div>` : ""}`;
  app.querySelectorAll("[data-cert]").forEach(b => b.onclick = () => go("cert", {grade:+b.dataset.cert}));
}

function vShop(app){
  const c = kid(); if(!c) return go("profiles");
  const bal = balance(c);
  app.innerHTML = `
    <section class="hello"><div><p class="eyebrow">Reef shop</p><h1>Spend your stars on sea friends</h1></div><span class="balance">★ ${bal} to spend</span></section>
    <div class="reef" role="img" aria-label="Your reef">${reefHTML(c)}</div>
    <p class="note" style="margin-top:8px">Earn stars from quizzes and the daily challenge. Everything you buy lives in your reef.</p>
    <section class="shop">${SHOP.map(it => { const own = c.owned.includes(it.id); return `
      <div class="shopitem ${own?"owned":""}"><span class="ic" aria-hidden="true">${it.icon}</span><b>${esc(it.name)}</b>
      ${own ? `<span class="note">In your reef</span>` : `<button class="btn small" type="button" data-buy="${it.id}" ${bal < it.cost ? "disabled" : ""}>★ ${it.cost}</button>`}</div>`; }).join("")}
    </section>`;
  app.querySelectorAll("[data-buy]").forEach(b => b.onclick = () => {
    const it = SHOP.find(s => s.id === b.dataset.buy);
    if(!it || balance(c) < it.cost || c.owned.includes(it.id)) return;
    c.spent = (c.spent||0) + it.cost; c.owned.push(it.id); save(); render();
  });
}

let downloadsApi = {save: async ({filename, data}) => {
  const url = URL.createObjectURL(data), a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return {status:"saved"};
}};
async function getDownloads(){ return downloadsApi; }
function vCert(app){
  const c = kid(); if(!c) return go("profiles");
  const g = view.grade, ok = gradeComplete(c,g);
  const done = Math.max(...gradeLessons(g).map(l => (c.progress[l.id]||{}).passedAt || 0));
  const date = new Date(done || Date.now()).toLocaleDateString([], {day:"numeric", month:"long", year:"numeric"});
  app.innerHTML = `
    <button class="link" id="back" type="button">← Back</button>
    ${ok ? `<div class="cert">
      <img src="${IMG.dolphin}" alt="" width="96" height="96">
      <p class="eyebrow">Atollingo · Raajje Explorers · Certificate of achievement</p>
      <p>This certifies that</p>
      <p class="who">${esc(c.name)}</p>
      <h1>finished Grade ${g} Social Studies</h1>
      <p>${GRADE_THEMES[g]} · all ${gradeLessons(g).length} lessons</p>
      <p class="note">${date}</p>
    </div>
    <div class="nav" style="justify-content:center"><button class="btn" id="saveCert" type="button" hidden>Save certificate</button></div>
    <p class="note" id="certMsg" style="text-align:center"></p>` : `<p class="panel">Finish every Grade ${g} lesson to get this certificate.</p>`}`;
  $("#back").onclick = () => go("home");
  if(!ok) return;
  getDownloads().then(d => { const b = $("#saveCert"); if(b && d) b.hidden = false; if(!d && $("#certMsg")) $("#certMsg").textContent = "Ask a grown-up to take a screenshot to keep it."; });
  $("#saveCert").onclick = async () => {
    const msg = $("#certMsg");
    try{
      const blob = await drawCert(c.name, g, date);
      const res = await downloadsApi.save({filename:`${c.name}-grade-${g}-certificate.png`, data:blob});
      msg.textContent = res && res.status === "saved" ? "Certificate saved." : "";
    }catch(e){ msg.textContent = e && e.code === "cancelled" ? "" : "The certificate couldn’t be saved. Try again, or take a screenshot."; }
  };
}
async function drawCert(name, g, date){
  try{ await document.fonts.ready; }catch{ /* optional: the app keeps working without it */ }
  const W = 1600, H = 1130, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const x = cv.getContext("2d");
  x.fillStyle = "#fffdf8"; x.fillRect(0,0,W,H);
  x.strokeStyle = "#f2b33d"; x.lineWidth = 18; x.strokeRect(40,40,W-80,H-80); x.lineWidth = 4; x.strokeRect(78,78,W-156,H-156);
  const grd = x.createRadialGradient(W/2,250,10,W/2,250,90); grd.addColorStop(0,"#f2b33d"); grd.addColorStop(.45,"#f2b33d"); grd.addColorStop(.46,"#086d75"); grd.addColorStop(.8,"#086d75"); grd.addColorStop(.81,"#bfe9e4"); grd.addColorStop(1,"#bfe9e4");
  x.fillStyle = grd; x.beginPath(); x.arc(W/2,250,90,0,Math.PI*2); x.fill();
  x.textAlign = "center"; x.fillStyle = "#46636e";
  x.font = "700 30px 'Trebuchet MS', Arial, sans-serif"; x.fillText("ATOLLINGO · RAAJJE EXPLORERS · CERTIFICATE OF ACHIEVEMENT", W/2, 400);
  x.font = "400 36px 'Trebuchet MS', Arial, sans-serif"; x.fillText("This certifies that", W/2, 470);
  x.fillStyle = "#b3422b"; x.font = "700 110px Georgia, serif"; x.fillText(name, W/2, 600);
  x.fillStyle = "#124b68"; x.font = "600 64px Georgia, serif"; x.fillText(`finished Grade ${g} Social Studies`, W/2, 710);
  x.fillStyle = "#123e52"; x.font = "400 36px 'Trebuchet MS', Arial, sans-serif"; x.fillText(`${GRADE_THEMES[g]} · all ${gradeLessons(g).length} lessons`, W/2, 790);
  x.fillStyle = "#46636e"; x.fillText(date, W/2, 870);
  return await new Promise(res => cv.toBlob(res, "image/png"));
}

/* ---------- Grown-ups (parents and teachers) ---------- */
function vGate(app){
  if(!view.a){ view.a = 6 + Math.floor(Math.random()*4); view.b = 6 + Math.floor(Math.random()*4); }
  app.innerHTML = `
    <form class="panel gate" id="gate" novalidate>
      <p class="eyebrow">For grown-ups</p>
      <h2>What is ${view.a} × ${view.b}?</h2>
      <p class="note">This keeps young explorers out of the ${view.tab === "teacher" ? "teachers’" : "parents’"} area.</p>
      <label>Answer<input type="number" id="gateAns" inputmode="numeric" autocomplete="off"></label>
      <p class="err" id="gateErr" hidden>That isn’t right. Try again.</p>
      <div class="nav" style="margin-top:0"><button class="btn alt" id="cancel" type="button">Cancel</button><button class="btn" type="submit">Open</button></div>
    </form>`;
  $("#gateAns").focus();
  $("#cancel").onclick = () => go(kid() ? "home" : "profiles");
  $("#gate").onsubmit = e => {
    e.preventDefault();
    if(+$("#gateAns").value === view.a*view.b) go("grown", {tab:view.tab||"parent", kidId: store.active || (store.children[0]||{}).id});
    else { $("#gateErr").hidden = false; $("#gateAns").select(); }
  };
}
function vGrown(app){
  const tab = view.tab || "parent";
  app.innerHTML = `
    <section class="dash-head">
      <div><p class="eyebrow">${tab === "parent" ? "For parents" : "For teachers"}</p><h1>${tab === "parent" ? "How your explorers are doing" : "Your classes"}</h1></div>
      <button class="btn alt small" id="exit" type="button">Back to the app</button>
    </section>
    <div class="gtabs" role="tablist"><button role="tab" type="button" aria-selected="${tab==="parent"}" data-tab="parent">Parents</button><button role="tab" type="button" aria-selected="${tab==="teacher"}" data-tab="teacher">Teachers</button></div>
    <div id="gbody"></div>`;
  $("#exit").onclick = () => go(kid() && store.grade ? "home" : "profiles");
  app.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => go("grown", {tab:b.dataset.tab, kidId:view.kidId}));
  (tab === "parent" ? vParent : vTeacher)($("#gbody"));
}

function vParent(box){
  const kids = store.children;
  if(!kids.length){
    box.innerHTML = `<div class="panel" style="max-width:560px;margin-top:14px"><h2>No explorers yet</h2><p>Add a child on the start screen. Their lessons, quiz scores and badges will show up here.</p><div><button class="btn" id="toStart" type="button">Add an explorer</button></div></div>`;
    $("#toStart").onclick = () => go("profiles"); return;
  }
  const c = kids.find(k => k.id === view.kidId) || kids[0];
  const prog = c.progress, done = LESSONS.filter(l => isDone(c,l)), avg = avgScore(c);
  const totalSecs = c.activity.reduce((s,a) => s+(a.secs||0), 0);
  const wkStart = Date.now() - 7*864e5, wk = c.activity.filter(a => a.at > wkStart);
  const wkDays = [...Array(7)].map((_,k) => { const d = new Date(); d.setDate(d.getDate()-6+k); const key = dayKey(d); return {label:d.toLocaleDateString([], {weekday:"short"}), m:mins(c.activity.filter(a => a.day===key).reduce((s,a) => s+(a.secs||0),0))}; });
  const wkMax = Math.max(5, ...wkDays.map(d => d.m));
  const wkFinished = LESSONS.filter(l => (prog[l.id]||{}).passedAt > wkStart);
  const practise = LESSONS.filter(l => prog[l.id] && prog[l.id].best/l.quiz.length < PASS);
  const lastG = c.grade || null, nextUp = lastG ? gradeLessons(lastG).filter(l => !prog[l.id]) : [];
  const tg = view.tg || lastG || 1, allowed = allowedGrades(c), due = dueReviews(c).length;
  const strandRows = Object.entries(STRANDS).map(([k,s]) => {
    const ls = LESSONS.filter(l => l.strand === k), d = ls.filter(l => isDone(c,l)).length;
    return `<div class="barrow"><div class="top"><b>${s.name}</b><span>${d} of ${ls.length}</span></div><div class="track"><i style="width:${d/ls.length*100}%;background:var(${s.c})"></i></div></div>`;
  }).join("");
  const status = l => { const p = prog[l.id]; if(!p) return `<span class="pill none">Not started</span>`; const r = p.best/l.quiz.length; return r === 1 ? `<span class="pill good">Mastered</span>` : r >= PASS ? `<span class="pill good">Finished</span>` : `<span class="pill bad">Needs practice</span>`; };
  const cls = c.classCode ? classCache[c.classCode] : null;
  if(c.classCode) loadClass(c.classCode);
  const ps = view.ps || "overview";
  box.innerHTML = `
    <div class="kidtabs" role="tablist" aria-label="Child">${kids.map(k => `<button role="tab" type="button" aria-selected="${k.id===c.id}" data-k="${k.id}">${avHTML(k.avatar,"s")}${esc(k.name)}</button>`).join("")}</div>
    <div class="tabs chips" role="tablist" aria-label="Section" style="margin-top:12px">${[["overview","This week"],["progress","Progress"],["settings","Activity & settings"]].map(([k,t]) => `<button role="tab" type="button" data-ps="${k}" aria-selected="${ps===k}">${t}</button>`).join("")}</div>
    ${ps === "overview" ? `
    <section class="tiles">
      <div class="tile"><div class="n">${done.length}<small style="font-size:18px;color:var(--muted)">/${LESSONS.length}</small></div><div class="l">Lessons finished</div></div>
      <div class="tile"><div class="n">${avg===null ? "–" : avg+"%"}</div><div class="l">Average best score</div></div>
      <div class="tile"><div class="n">${mins(totalSecs)} min</div><div class="l">Time spent learning</div></div>
      <div class="tile"><div class="n">${streak(c)} ${streak(c)===1?"day":"days"}</div><div class="l">Learning streak</div></div>
    </section>
    <section class="grid2">
      <div class="panel"><h2>This week</h2>
        <div class="week" aria-label="Minutes learning each day this week">${wkDays.map(d => `<div><em>${d.m||""}</em><i style="height:${d.m/wkMax*80}px"></i><span>${d.label}</span></div>`).join("")}</div>
        <p>${wk.length ? `${esc(c.name)} did <b>${wk.filter(a => a.kind!=="daily").length} quizzes</b> and <b>${wk.filter(a => a.kind==="daily").length} daily challenges</b>, finished <b>${wkFinished.length} lesson${wkFinished.length===1?"":"s"}</b>, earned <b>★ ${wk.reduce((s,a) => s+(a.gained||0),0)}</b> and spent <b>${mins(wk.reduce((s,a) => s+(a.secs||0),0))} minutes</b> learning, on ${new Set(wk.map(a => a.day)).size} of the last 7 days.` : `No learning in the last 7 days yet.`}</p>
      </div>
      <div class="panel"><h2>What to do next</h2>
        ${due ? `<div class="tip"><b>${due} tricky question${due>1?"s are":" is"} due for review.</b> They’ll appear in today’s daily challenge.</div>` : ""}
        ${practise.length ? `<div class="tip"><b>Practise together:</b> ${practise.slice(0,4).map(l => esc(l.title)+" (Grade "+l.grade+")").join(", ")}. Read the lesson aloud, then retry the quiz.</div>` : ""}
        ${!lastG ? `<div class="tip">${esc(c.name)} hasn’t picked a grade yet. They choose one each time they log in.</div>` : nextUp.length ? `<div class="tip"><b>Up next in Grade ${lastG}</b> (chosen last time): ${esc(nextUp[0].title)}. Talk about it at home: ${esc(nextUp[0].blurb.toLowerCase())}</div>` : `<div class="tip"><b>Every Grade ${lastG} lesson has been tried.</b></div>`}
        <div><p class="eyebrow" style="margin-bottom:6px">Badges · ${earned(c).size} of ${BADGES.length} · ★ ${earnedStars(c)} earned, ${balance(c)} unspent</p>
          <div class="new-badges" style="justify-content:flex-start">${BADGES.filter(b => earned(c).has(b.id)).map(b => `<span class="badge-mini"><i>${b.icon}</i>${esc(b.name)}</span>`).join("") || `<span class="note">None yet.</span>`}</div></div>
      </div>
    </section>
    ` : ""}${ps === "progress" ? `
    <section class="grid2">
      <div class="panel"><h2>Questions to talk about</h2>
        ${c.misses.length ? `<ul class="misses">${c.misses.slice(0,8).map(m => { const l = lessonById((m.qid||"").split(":")[0]); return `<li><b>${esc(m.q)}</b><span>${esc(c.name)} answered: ${esc(m.given)}</span><span>Correct: ${esc(m.right)}</span><span class="meta">${l ? esc(l.title)+" · Grade "+l.grade+" · " : ""}${when(m.at)}</span></li>`; }).join("")}</ul>` : `<p class="note">No wrong answers yet. Missed questions show up here with ${esc(c.name)}’s answer.</p>`}
      </div>
      <div class="panel"><h2>Progress by strand</h2><div class="bars">${strandRows}</div>
        <p class="note">The six strands follow the National Institute of Education’s Social Studies syllabus for Key Stages 1 and 2.</p></div>
    </section>
    <section class="panel" style="margin-top:14px">
      <div class="grade-head" style="margin:0"><h2>Lessons</h2>
        <div class="tabs" role="tablist" aria-label="Grade" style="margin:0">${[1,2,3,4,5,6].map(g => { const n = gradeLessons(g).filter(l => isDone(c,l)).length; return `<button role="tab" type="button" aria-selected="${tg===g}" data-tg="${g}">Grade ${g}${n ? " · "+n+"/"+gradeLessons(g).length : ""}</button>`; }).join("")}</div></div>
      <div class="scroll"><table>
        <thead><tr><th>Grade ${tg} lesson</th><th>Best score</th><th>Tries</th><th>Last played</th><th>Status</th></tr></thead>
        <tbody>${gradeLessons(tg).map(l => { const p = prog[l.id]; return `<tr><td><b>${esc(l.title)}</b><br><span class="note">${STRANDS[l.strand].name}</span></td><td class="num">${p ? p.best+" / "+l.quiz.length : "–"}</td><td class="num">${p ? p.attempts : 0}</td><td class="num">${p ? when(p.lastAt) : "–"}</td><td>${status(l)}</td></tr>`; }).join("")}</tbody>
      </table></div>
    </section>
    ` : ""}${ps === "settings" ? `
    <section class="grid2">
      <div class="panel"><h2>Recent activity</h2>
        ${c.activity.length ? `<ul class="feed">${c.activity.slice(0,8).map(a => { const l = lessonById(a.lesson); return `<li><b>${a.kind==="daily" ? "Daily challenge" : l ? esc(l.title) : "Lesson"} · ${a.score}/${a.total}</b><span>${when(a.at)}${a.secs ? " · "+Math.max(1,mins(a.secs))+" min" : ""}</span></li>`; }).join("")}</ul>` : `<p class="note">No quizzes yet.</p>`}
      </div>
      <form class="panel" id="manage" novalidate><h2>Settings for ${esc(c.name)}</h2>
        <label>Name<input type="text" id="mName" maxlength="20" value="${esc(c.name)}"></label>
        <div><p style="font-weight:700;font-size:15px;margin-bottom:6px">Grades ${esc(c.name)} can open</p>
          <div class="toggles" role="group" aria-label="Allowed grades">${[1,2,3,4,5,6].map(g => `<button type="button" data-allow="${g}" aria-pressed="${allowed.includes(g)}">Grade ${g}</button>`).join("")}</div>
          <p class="note" style="margin-top:4px">At least one grade must stay on.</p></div>
        <div><p style="font-weight:700;font-size:15px;margin-bottom:6px">Class</p>
          ${c.classCode ? `<div class="row"><span>${cls ? "In <b>"+esc(cls.name)+"</b>" : cls === false ? "Class not found" : "Loading class…"} · code <b>${esc(c.classCode)}</b></span><button class="btn alt small" id="leaveClass" type="button">Leave class</button></div>`
          : DB ? `<div class="row"><input type="text" id="joinCode" maxlength="6" placeholder="Class code from the teacher" autocomplete="off" style="text-transform:uppercase"><button class="btn small" id="joinClass" type="button">Join</button></div><p class="err" id="joinErr" hidden></p>`
          : `<p class="note">Classes and homework are managed in the <a href="${HUB}/teacher" target="_blank" rel="noopener">Atollingo teacher space</a>.</p>`}</div>
        <div class="nav" style="margin-top:0"><button class="btn small" type="submit">Save name</button><button class="btn alt small" id="askRemove" type="button">Remove explorer</button></div>
        <div class="confirm" id="confirmBox" hidden><span>Remove ${esc(c.name)} and all their progress?</span><button class="btn coral small" id="doRemove" type="button">Remove</button><button class="btn alt small" id="noRemove" type="button">Keep</button></div>
        <p class="note" id="saved" hidden>Saved.</p>
        <p class="note">Progress is saved in this browser${c.hubId ? ". " + esc(c.name) + " is linked to an Atollingo learner, so finished lessons also add stars there" : ""}.</p>
      </form>
    </section>` : ""}`;
  box.querySelectorAll("[data-k]").forEach(b => b.onclick = () => go("grown", {tab:"parent", kidId:b.dataset.k, ps:view.ps}));
  box.querySelectorAll("[data-tg]").forEach(b => b.onclick = () => { view.tg = +b.dataset.tg; render(); });
  box.querySelectorAll("[data-ps]").forEach(b => b.onclick = () => { view.ps = b.dataset.ps; render(); });
  box.querySelectorAll("[data-allow]").forEach(b => b.onclick = () => {
    const g = +b.dataset.allow, cur = allowedGrades(c).slice();
    const next = cur.includes(g) ? cur.filter(x => x !== g) : cur.concat(g).sort();
    if(!next.length) return;
    c.allowed = next.length === 6 ? null : next;
    if(store.active === c.id && store.grade && !next.includes(store.grade)) store.grade = null;
    save(); render();
  });
  if(!$("#manage")) return;
  $("#manage").onsubmit = e => { e.preventDefault(); const n = $("#mName").value.trim(); if(n) c.name = n; save(); render(); $("#saved").hidden = false; };
  $("#askRemove").onclick = () => { $("#confirmBox").hidden = false; };
  $("#noRemove").onclick = () => { $("#confirmBox").hidden = true; };
  $("#doRemove").onclick = () => { store.children = store.children.filter(k => k.id !== c.id); if(store.active === c.id){ store.active = null; store.grade = null; } save(); go("grown", {tab:"parent"}); };
  const lc = $("#leaveClass"); if(lc) lc.onclick = async () => {
    const code = c.classCode; c.classCode = null; save(); render();
    try{ await DB.doc("classes/"+code+"/students/"+myId+"-"+c.id).delete(); }catch{ /* optional: the app keeps working without it */ }
  };
  const jc = $("#joinClass"); if(jc) jc.onclick = async () => {
    const code = $("#joinCode").value.trim().toUpperCase(), err = $("#joinErr");
    if(code.length !== 6){ err.textContent = "Class codes have 6 letters and numbers."; err.hidden = false; return; }
    jc.disabled = true;
    try{
      const s = await DB.doc("classes/"+code).get();
      if(!s.exists){ err.textContent = "No class has that code. Check it with the teacher."; err.hidden = false; jc.disabled = false; return; }
      classCache[code] = s.data(); c.classCode = code; save(); render();
    }catch{ err.textContent = "Couldn’t reach the class right now. Try again in a moment."; err.hidden = false; jc.disabled = false; }
  };
}

/* teacher view: classes live in the shared store; families join with the code */
function closeClass(){ classUnsubs.forEach(u => { try{ u(); }catch{ /* optional: the app keeps working without it */ } }); classUnsubs = []; classLive = {code:null, doc:null, students:[]}; }
function openClass(code){
  if(classLive.code === code) return;
  closeClass(); classLive.code = code;
  const rerender = () => { if(view.name === "grown" && view.classCode === code) render(); };
  classUnsubs.push(DB.doc("classes/"+code).onSnapshot(s => { classLive.doc = s.exists ? s.data() : false; rerender(); }, () => {}));
  classUnsubs.push(DB.collection("classes/"+code+"/students").onSnapshot(s => { classLive.students = s.docs.map(d => d.data()); rerender(); }, () => {}));
}
function newCode(){ const A = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; let s = ""; for(let i=0;i<6;i++) s += A[Math.floor(Math.random()*A.length)]; return s; }
function vTeacher(box){
  if(!DB){ box.innerHTML = `<div class="panel" style="margin-top:14px;max-width:640px"><h2>Classes live in the Atollingo teacher space</h2><p>Rosters, join codes, assignments and class reports are managed at Atollingo. When a child connects their Atollingo learner here, finished Social Studies lessons appear in their Atollingo progress.</p><div><a class="btn" href="${HUB}/teacher" target="_blank" rel="noopener">Open the teacher space ↗</a></div></div>`; return; }
  if(view.classCode) return vClass(box, view.classCode);
  const mine = store.teacherClasses;
  box.innerHTML = `
    <section class="grid2">
      <div class="panel"><h2>My classes</h2>
        ${mine.length ? `<div class="bars">${mine.map(k => `<div class="row" style="justify-content:space-between"><span><b>${esc(k.name)}</b> · code <b>${esc(k.code)}</b></span><button class="btn small" type="button" data-open="${k.code}">Open</button></div>`).join("")}</div>` : `<p class="note">No classes yet. Create one, then give the class code to families. They enter it in the Parents tab.</p>`}
      </div>
      <form class="panel" id="newClass" novalidate><h2>Create a class</h2>
        <label>Class name<input type="text" id="className" maxlength="40" placeholder="e.g. Grade 4 Blue, Thinadhoo School"></label>
        <p class="err" id="classErr" hidden></p>
        <button class="btn" type="submit">Create class</button>
        <p class="note">Families with access to this app can join using the code. Children’s names, stars and lesson scores will be shared with the class.</p>
      </form>
    </section>`;
  box.querySelectorAll("[data-open]").forEach(b => b.onclick = () => go("grown", {tab:"teacher", classCode:b.dataset.open}));
  $("#newClass").onsubmit = async e => {
    e.preventDefault();
    const name = $("#className").value.trim(), err = $("#classErr");
    if(!name){ err.textContent = "Give the class a name."; err.hidden = false; return; }
    try{
      let code = newCode();
      for(let k=0;k<4 && (await DB.doc("classes/"+code).get()).exists;k++) code = newCode();
      await DB.doc("classes/"+code).set({name, createdAt:Date.now(), teacher:myId, assignments:[]});
      store.teacherClasses.push({code, name}); save();
      go("grown", {tab:"teacher", classCode:code});
    }catch{ err.textContent = "Couldn’t create the class. Check your connection and try again."; err.hidden = false; }
  };
}
function vClass(box, code){
  openClass(code);
  const d = classLive.doc, st = classLive.students.slice().sort((a,b) => (a.name||"").localeCompare(b.name||""));
  const meta = store.teacherClasses.find(k => k.code === code) || {name:"Class"};
  const asg = d && Array.isArray(d.assignments) ? d.assignments : [];
  const pg = view.pg || 1;
  box.innerHTML = `
    <button class="link" id="allClasses" type="button" style="margin-top:12px">← All classes</button>
    <section class="dash-head" style="margin-top:6px"><div><h2 style="font-size:28px">${esc(d ? d.name : meta.name)}</h2><p class="note">Families join with this code in the Parents tab</p></div><span class="code">${esc(code)}</span></section>
    ${d === false ? `<p class="err">This class no longer exists.</p>` : ""}
    <section class="panel" style="margin-top:14px"><h2>Students · ${st.length}</h2>
      ${st.length ? `<div class="scroll"><table><thead><tr><th>Student</th><th>Stars</th><th>Lessons finished</th><th>Average</th><th>Homework</th><th>Last 7 days</th><th>Last active</th></tr></thead>
      <tbody>${st.map(s => { const hwDone = asg.filter(id => (s.done||[]).includes(id)).length; return `<tr><td><span class="row" style="gap:8px">${avHTML(s.avatar,"s")}<b>${esc(s.name||"Student")}</b></span></td><td class="num">★ ${s.stars||0}</td><td class="num">${(s.done||[]).length}</td><td class="num">${s.avg==null ? "–" : s.avg+"%"}</td><td class="num">${asg.length ? `<span class="pill ${hwDone===asg.length?"good":hwDone?"warn":"none"}">${hwDone}/${asg.length}</span>` : "–"}</td><td class="num">${s.minutes7||0} min</td><td class="num">${s.lastAt ? when(s.lastAt) : "–"}</td></tr>`; }).join("")}</tbody></table></div>`
      : `<p class="note">No students yet. When a family joins with code <b>${esc(code)}</b>, their child appears here.</p>`}
    </section>
    ${asg.length && st.length ? `<section class="panel" style="margin-top:14px"><h2>Homework results</h2><div class="scroll"><table><thead><tr><th>Lesson</th>${st.map(s => `<th>${esc(s.name||"")}</th>`).join("")}</tr></thead><tbody>${asg.map(id => { const l = lessonById(id); return l ? `<tr><td><b>${esc(l.title)}</b><br><span class="note">Grade ${l.grade}</span></td>${st.map(s => { const sc = (s.scores||{})[id]; return `<td class="num">${sc==null ? "–" : `<span class="pill ${sc>=PASS*100?"good":"bad"}">${sc}%</span>`}</td>`; }).join("")}</tr>` : ""; }).join("")}</tbody></table></div></section>` : ""}
    <section class="panel" style="margin-top:14px"><h2>Set homework</h2>
      <p class="note">Tap lessons to add or remove them. Students see homework on their home screen.</p>
      <div class="tabs" role="tablist" aria-label="Grade" style="margin:0">${[1,2,3,4,5,6].map(g => `<button role="tab" type="button" aria-selected="${pg===g}" data-pg="${g}">Grade ${g}</button>`).join("")}</div>
      <div class="lessonpick">${gradeLessons(pg).map(l => `<button type="button" data-asg="${l.id}" aria-pressed="${asg.includes(l.id)}">${l.pic} ${esc(l.title)}</button>`).join("")}</div>
      <p class="note">${asg.length ? `${asg.length} lesson${asg.length>1?"s":""} set: ${asg.map(id => esc((lessonById(id)||{}).title||"")).join(", ")}` : "No homework set."}</p>
    </section>
    <div class="row" style="margin-top:14px"><button class="btn alt small" id="forget" type="button">Remove from my list</button></div>`;
  $("#allClasses").onclick = () => go("grown", {tab:"teacher"});
  box.querySelectorAll("[data-pg]").forEach(b => b.onclick = () => { view.pg = +b.dataset.pg; render(); });
  box.querySelectorAll("[data-asg]").forEach(b => b.onclick = async () => {
    const id = b.dataset.asg, next = asg.includes(id) ? asg.filter(x => x !== id) : asg.concat(id);
    try{ await DB.doc("classes/"+code).update({assignments:next}); }catch{ /* optional: the app keeps working without it */ }
  });
  $("#forget").onclick = () => { store.teacherClasses = store.teacherClasses.filter(k => k.code !== code); save(); go("grown", {tab:"teacher"}); };
}

/* ---------- Boot ---------- */
$("#grownBtn").onclick = () => go("gate", {tab:"parent"});
$("#brand").onclick = () => go(kid() && store.grade ? "home" : "profiles");
const A11Y_KEY = "raajje-a11y";
function applyA11y(a){
  document.documentElement.style.setProperty("--base", (a.size||16) + "px");
  document.documentElement.classList.toggle("high-contrast", !!a.hc);
  $("#hc").setAttribute("aria-pressed", !!a.hc);
  document.querySelectorAll("[data-size]").forEach(b => b.setAttribute("aria-pressed", +b.dataset.size === (a.size||16)));
}
let a11y = {}; try{ a11y = JSON.parse(localStorage.getItem(A11Y_KEY)) || {}; }catch{ /* optional: the app keeps working without it */ }
applyA11y(a11y);
const setA11y = patch => { a11y = Object.assign({}, a11y, patch); try{ localStorage.setItem(A11Y_KEY, JSON.stringify(a11y)); }catch{ /* optional: the app keeps working without it */ } applyA11y(a11y); };
document.querySelectorAll("[data-size]").forEach(b => b.onclick = () => setA11y({size:+b.dataset.size}));
$("#hc").onclick = () => setA11y({hc:!a11y.hc});
const local = lsRead();
if(local && Array.isArray(local.children)) store = normStore(local);
if(store.active && !kid()) store.active = null;
go(store.active && store.grade ? "home" : "profiles");
if(store.children.some(k => k.hubId)) connectHub(true);
