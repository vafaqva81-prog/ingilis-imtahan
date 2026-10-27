(function(){
'use strict';
var app=document.getElementById('app');
var BOOKS=window.BOOKS,EXAM=(window.EXAM&&window.EXAM.tests)||[],PUB=!!window.PUBLIC,GRAM=window.GRAMMAR,DECKS=window.DECKS,WF=window.WORDFORM;

/* ---------- storage ---------- */
var P={done:{},exam:{},quiz:{},cards:{}};
try{var s=localStorage.getItem('b2prep');if(s)P=Object.assign(P,JSON.parse(s));}catch(e){}
function save(){try{var _d=new Date().toISOString().slice(0,10);(P.days=P.days||{})[_d]=1;}catch(e){}try{localStorage.setItem('b2prep',JSON.stringify(P));}catch(e){}}

/* ---------- helpers ---------- */
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function norm(s){return s.toLowerCase().replace(/[’‘`]/g,"'").replace(/n't\b/g,' not').replace(/[^a-z0-9' ]/g,' ').replace(/'/g,'').replace(/\s+/g,' ').trim();}
function pad(n){return ('00'+n).slice(-3);}
function pageUrl(b,n){return b.dir+'/'+pad(n)+'.webp';}
function bookById(id){return BOOKS.filter(function(b){return b.id===id;})[0];}
function pct(a,b){return b?Math.round(100*a/b):0;}
function h(html){app.innerHTML=html;window.scrollTo(0,0);}

/* ---------- router ---------- */
function route(){
  app.style.removeProperty('--h');
  if(!EXAM.length){var ea=document.querySelector('#nav a[data-k="exam"]');if(ea){ea.setAttribute('href','#/practice');ea.dataset.k='practice';var sp=ea.querySelector('span');if(sp)sp.textContent='Sınaq';}}
  var r=location.hash.replace(/^#\/?/,'').split('/');
  var k=r[0]||'home';
  Array.prototype.forEach.call(document.querySelectorAll('#nav a'),function(a){a.classList.toggle('on',a.dataset.k===({lesson:'books',learn:'tools',help:'tools',verbs:'tools',phrases:'tools',phrasal:'tools',dict:'tools',practice:(EXAM.length?'exam':'practice'),sources:'tools',dictation:'tools',mock:'tools',writing:'tools',cards:'tools',wordform:'tools',strategy:'tools'}[k]||k));});
  ({home:home,exam:exam,learn:learn,books:books,lesson:lesson,help:help,verbs:verbs,cards:cards,wordform:wordform,strategy:strategy,progress:progress,tools:tools,phrases:phrases,phrasal:phrasal,dict:dictionary,practice:practice,sources:sources,dictation:dictation,mock:mock,writing:writing}[k]||home)(r.slice(1));
}
window.addEventListener('hashchange',route);

/* ---------- home ---------- */
function streak(){var d=new Date(),n=0,days=P.days||{};function k(x){return x.toISOString().slice(0,10);}
  if(!days[k(d)])d.setDate(d.getDate()-1);
  while(days[k(d)]){n++;d.setDate(d.getDate()-1);}return n;}
function totals(){
  var tot=0,done=0;
  BOOKS.forEach(function(b){b.units.forEach(function(u){tot++;if(P.done[b.id+':'+u.n])done++;});});
  var ex=0,exm=0;EXAM.forEach(function(t){t.parts.forEach(function(p){var r=P.exam[t.id+':'+p.id];if(r){ex+=r.score;exm+=r.max;}});});
  return {tot:tot,done:done,ex:ex,exm:exm};
}
function tools(){
  var L=[['help','Başla','Layihə haqqında','Nədir, necə istifadə etməli və həftəlik plan.'],['learn','Öyrən','Qrammatika quiz','Qaydalar və mini testlər.'],['verbs','Fellər','Düzgün və düzgün olmayan fellər','Cədvəl, axtarış və modellər.'],['sources','İmtahan proqramı','Mövzular və rəsmi mənbələr','Proqram cədvəli, Cambridge, British Council və Oxford keçidləri.'],['practice','Sınaq imtahanı','Qapalı tipli suallar','Oxuyub-anlama, qrammatika, lüğət və koqnitiv bacarıqlar.'],['dict','Lüğət','Bütün sözlər, axtarışla','Ümumi, biznes və əlavə sözlər: tərcümə, nümunə, səs.'],['phrases','Danışıq','Qısa cümlələr + səslənmə','Yanıma gəl, mənimlə danış… dinlə və təkrarla.'],['phrasal','Phrasal verbs','60 vacib birləşmə + səs','give up, look for, turn on… nümunə və tərcümə.'],['dictation','Dinlə və yaz','Diktant','Cümləni dinlə, ingiliscə yaz, yoxla.'],['mock','Qarışıq test','20 sual, 15 dəqiqə','Qrammatika üzrə vaxtlı test və səhvlərin izahı.'],['writing','Yazı bələdçisi','E-poçt, esse, rəy','Plan, nümunə mətn və bağlayıcı sözlər.'],['cards','Kartlar','Flashcard','Sözləri kartla təkrarla.'],['wordform','Söz yaradılması','Kökdən doğru forma','Şəkilçilər və məşq cədvəli.'],['strategy','Strategiya','İmtahan taktikası','7 hissə üçün məsləhətlər.']];
  h('<h1>Alətlər</h1><p class="sub">Əsas dərslərdən əlavə köməkçi bölmələr.</p><div class="grid">'+L.map(function(x){return '<a class="card" href="#/'+x[0]+'"><div class="k">'+x[1]+'</div><h3>'+x[2]+'</h3><p style="margin:0">'+x[3]+'</p></a>';}).join('')+'</div>');
}
function home(){
  var t=totals();
  var bk=BOOKS.map(function(b){var d=b.units.filter(function(u){return P.done[b.id+':'+u.n];}).length;
    return '<a class="card" href="#/books/'+b.id+'"><div class="k">Kurs</div><h3>'+esc(b.title)+'</h3><div class="sub" style="margin:0 0 8px;font-size:13px">'+esc(b.sub)+'</div><div class="bar"><i style="width:'+pct(d,b.units.length)+'%"></i></div><div style="font-size:13px;color:var(--mut);margin-top:4px">'+d+' / '+b.units.length+' vahid</div></a>';}).join('');
    h('<div class="hero"><span class="star">✦</span><h1>Bu gün nə öyrənirik?</h1><p>Bir dərs öyrən, bir məşq et. Hər kiçik addım imtahana yaxınlaşdırır.</p><div class="stats"><div class="stat"><b>'+t.done+'</b><span>öyrənilən vahid</span></div><div class="stat"><b>'+pct(t.done,t.tot)+'%</b><span>ümumi irəliləyiş</span></div><div class="stat"><b>'+streak()+'</b><span>gün ardıcıl</span></div>'+(t.exm?'<div class="stat"><b>'+t.ex+'/'+t.exm+'</b><span>imtahan balı</span></div>':'')+'</div><a class="btn pri go" href="#/books/murphy">Davam et →</a></div>'+
   '<div class="grid">'+
   '<a class="card" href="#/help"><div class="k">Başla</div><h3>Layihə haqqında</h3><p style="margin:0;color:var(--mut)">Nədir və necə istifadə etməli. 8 həftəlik plan.</p></a>'+
   (EXAM.length?'<a class="card" href="#/exam"><div class="k">Əsas hədəf</div><h3>İmtahan məşqi</h3><p style="margin:0;color:var(--mut)">Nümunə 2 test: Part 1–4 interaktiv, cavab açarı və izahla.</p></a>':'')+
   '<a class="card" href="#/learn"><div class="k">Öyrən</div><h3>Qrammatika dərsləri</h3><p style="margin:0;color:var(--mut)">'+GRAM.length+' mövzu: qayda (Azərbaycanca) + mini test.</p></a>'+
   '<a class="card" href="#/strategy"><div class="k">Oxu</div><h3>İmtahan strategiyası</h3><p style="margin:0;color:var(--mut)">7 hissənin hər biri üçün taktika.</p></a>'+
   '<a class="card" href="#/progress"><div class="k">İrəliləyiş</div><h3>'+t.done+' / '+t.tot+' vahid</h3><p style="margin:0;color:var(--mut)">İmtahan balı: '+(t.exm?t.ex+' / '+t.exm:'hələ yoxdur')+'</p></a>'+
   '</div><h2>Kurslar</h2><div class="grid">'+bk+'</div>');
}

/* ---------- exam ---------- */
function exam(a){
  if(!EXAM.length){location.hash='#/';return;}
  if(!a[0]){
    h('<h1>İmtahan məşqi</h1><p class="sub">B2 First · Reading &amp; Use of English. 7 hissə, 52 sual, 75 dəqiqə. Aşağıdakı testlər sizin hazırlanıb.</p>'+
      EXAM.map(function(t){
        return '<h2>'+esc(t.title)+'</h2><p class="sub" style="margin:-6px 0 10px">'+esc(t.src)+'</p><div class="grid">'+t.parts.map(function(p){
          var r=P.exam[t.id+':'+p.id];
          return '<a class="card" href="#/exam/'+t.id+'/'+p.id+'"><div class="k">Sual '+esc(p.q)+'</div><h3>'+esc(p.title)+'</h3>'+(r?'<span class="pill ok">'+r.score+' / '+r.max+'</span>':(p.type==='note'?'<span class="pill">oxu / açar</span>':'<span class="pill">başla</span>'))+'</a>';}).join('')+'</div>';}).join('')+
      '<div class="note">Skrinşotlarda bəzi hissələr natamamdır (Part 5–7 üçün suallar və ya mətnlər yoxdur), buna görə onlar yalnız oxu/açar kimi verilib.</div>');
    return;
  }
  var t=EXAM.filter(function(x){return x.id===a[0];})[0];var p=t&&t.parts.filter(function(x){return x.id===a[1];})[0];
  if(!p){location.hash='#/exam';return;}
  var i=t.parts.indexOf(p),nx=t.parts[i+1];
  var head='<div class="crumbs"><a href="#/exam">İmtahan</a> › '+esc(t.title)+'</div><h1>'+esc(p.title)+'</h1><p class="sub">Sual '+esc(p.q)+' · '+esc(p.instr||'')+'</p>';
  if(p.type==='note'){
    h(head+'<div class="note">'+esc(p.note)+'</div><div class="card"><p style="margin:0">'+esc(p.key)+'</p></div>'+(nx?'<p><a class="btn" href="#/exam/'+t.id+'/'+nx.id+'">Növbəti →</a></p>':''));return;}
  var body='';
  if(p.type==='kt'){
    body=p.items.map(function(it){return '<div class="kt" data-n="'+it.n+'"><b>'+it.n+'</b> '+esc(it.first)+'<br><span class="kw">'+esc(it.kw)+'</span><br>'+esc(it.pre)+' <input type="text" autocomplete="off" spellcheck="false" data-n="'+it.n+'"> '+esc(it.post)+'<span class="fb"></span></div>';}).join('');
  }else{
    var tx=esc(p.text).replace(/\{(\d+)\}/g,function(m,n){
      var g=p.gaps.filter(function(x){return x.n==n;})[0];var inner;
      if(p.type==='mcq')inner='<select data-n="'+n+'"><option value="">—</option>'+g.o.map(function(o,k){return '<option value="'+k+'">'+'ABCD'[k]+') '+esc(o)+'</option>';}).join('')+'</select>';
      else inner='<input type="text" autocomplete="off" spellcheck="false" data-n="'+n+'">'+(g.kw?' <b style="font-size:12px">('+esc(g.kw)+')</b>':'');
      return '<span class="gap" data-n="'+n+'"><span class="n">'+n+'</span>'+inner+'<span class="fb"></span></span>';});
    body='<div class="passage">'+(p.head?'<h3 style="font-size:18px">'+esc(p.head)+'</h3>':'')+tx.split('\n\n').map(function(x){return '<p>'+x+'</p>';}).join('')+'</div>';
  }
  var prev=P.exam[t.id+':'+p.id];
  h(head+body+'<div class="row" style="margin-top:14px"><button class="btn pri" id="chk">Yoxla</button><button class="btn" id="rst">Təmizlə</button><span id="sc" class="score">'+(prev?prev.score+' / '+prev.max:'')+'</span></div>'+(nx?'<p><a class="btn" href="#/exam/'+t.id+'/'+nx.id+'">Növbəti hissə →</a></p>':'<p><a class="btn" href="#/exam">← Siyahı</a></p>'));
  var items=p.type==='kt'?p.items:p.gaps;
  document.getElementById('chk').onclick=function(){
    var score=0;
    items.forEach(function(g){
      var box=app.querySelector((p.type==='kt'?'.kt':'.gap')+'[data-n="'+g.n+'"]');var f=box.querySelector('.fb');var ok=false,show;
      if(p.type==='mcq'){var v=box.querySelector('select').value;ok=v!==''&&+v===g.a;show='ABCD'[g.a]+') '+g.o[g.a];}
      else{var v2=norm(box.querySelector('input').value);ok=g.a.some(function(x){return norm(x)===v2;});show=g.a[0];}
      if(ok)score++;
      box.classList.toggle('ok',ok);box.classList.toggle('bad',!ok);
      f.innerHTML=(ok?'<b class="ok">✓</b> ':'<b class="bad">✗</b> Düzgün: <b>'+esc(show)+'</b> — ')+esc(g.why||'');
    });
    document.getElementById('sc').textContent=score+' / '+items.length;
    var k=t.id+':'+p.id;var o=P.exam[k];if(!o||score>=o.score){P.exam[k]={score:score,max:items.length};save();}
  };
  document.getElementById('rst').onclick=function(){exam(a);};
}

/* ---------- learn (grammar) ---------- */
function learn(a){
  if(a[0]==null){
    h('<h1>Qrammatika dərsləri</h1><p class="sub">Mövzu üzrə qısa xülasə və mini testlər. Tam dərslər üçün “Öyrən” bölməsinə bax.</p><div class="grid">'+GRAM.map(function(g,i){var r=P.quiz[i];
      return '<a class="card" href="#/learn/'+i+'"><div class="k">Dərs '+esc(g.u)+'</div><h3>'+esc(g.t)+'</h3>'+(r?'<span class="pill ok">'+r.score+' / '+r.max+'</span>':'<span class="pill">'+g.q.length+' sual</span>')+'</a>';}).join('')+'</div>');return;}
  var i=+a[0],g=GRAM[i];if(!g){location.hash='#/learn';return;}
  h('<div class="crumbs"><a href="#/learn">Qrammatika</a></div><h1>'+esc(g.t)+'</h1><p class="sub">Dərs: '+esc(g.u)+'</p>'+
    '<div class="card rule"><ul style="margin:0;padding-left:20px">'+g.rule.map(function(r){return '<li>'+esc(r)+'</li>';}).join('')+'</ul></div>'+
    '<h2>Mini test</h2><div id="qs">'+g.q.map(function(q,k){return '<div class="q" data-k="'+k+'"><div>'+(k+1)+'. '+esc(q[0])+'</div><div class="opts">'+q[1].map(function(o,j){return '<button class="opt" data-j="'+j+'">'+esc(o)+'</button>';}).join('')+'</div><span class="fb"></span></div>';}).join('')+'</div>'+
    '<div class="row"><span class="score" id="sc"></span></div><p class="row">'+(i>0?'<a class="btn" href="#/learn/'+(i-1)+'">← Əvvəlki</a>':'')+(i<GRAM.length-1?'<a class="btn" href="#/learn/'+(i+1)+'">Növbəti →</a>':'')+'</p>');
  var answered=0,score=0;
  Array.prototype.forEach.call(app.querySelectorAll('.q'),function(box){
    box.addEventListener('click',function(e){
      var b=e.target.closest('.opt');if(!b||box.dataset.done)return;box.dataset.done=1;
      var q=g.q[+box.dataset.k],j=+b.dataset.j,ok=j===q[2];
      b.classList.add(ok?'ok':'bad');if(!ok)box.querySelectorAll('.opt')[q[2]].classList.add('ok');
      box.querySelector('.fb').innerHTML=(ok?'<b class="ok">✓</b> ':'<b class="bad">✗</b> ')+esc(q[3]);
      answered++;if(ok)score++;
      document.getElementById('sc').textContent=score+' / '+g.q.length;
      if(answered===g.q.length){var o=P.quiz[i];if(!o||score>=o.score){P.quiz[i]={score:score,max:g.q.length};save();}}
    });
  });
}

/* ---------- books ---------- */
function books(a){
  if(!a[0]){
    h('<h1>Kurslar</h1><p class="sub">Bütün 4 kurs: dərslər və “öyrəndim” işarəsi.</p><div class="grid">'+BOOKS.map(function(b){var d=b.units.filter(function(u){return P.done[b.id+':'+u.n];}).length;
      return '<a class="card" href="#/books/'+b.id+'"><div class="k">Kurs</div><h3>'+esc(b.title)+'</h3><div class="sub" style="margin:0 0 8px;font-size:13px">'+esc(b.sub)+'</div><div class="bar"><i style="width:'+pct(d,b.units.length)+'%"></i></div><div style="font-size:13px;color:var(--mut);margin-top:4px">'+d+' / '+b.units.length+'</div></a>';}).join('')+'</div>');return;}
  var b=bookById(a[0]);if(!b){location.hash='#/books';return;}
  if(!a[1]){
    var secs=[],last=null;
    b.units.forEach(function(u){if(u.s!==last){secs.push({s:u.s,u:[]});last=u.s;}secs[secs.length-1].u.push(u);});
    var d=b.units.filter(function(u){return P.done[b.id+':'+u.n];}).length;
    h('<div class="crumbs"><a href="#/books">Kurslar</a></div><h1>'+esc(b.title)+'</h1><p class="sub">'+esc(b.sub)+' · '+d+' / '+b.units.length+' öyrənilib</p>'+
      '<input class="search" id="f" placeholder="Axtar: mövzu və ya nömrə…">'+
      secs.map(function(s){return '<div class="sec"><h2>'+esc(s.s)+'</h2><div class="units">'+s.u.map(unitLink(b)).join('')+'</div></div>';}).join('')+
      (!PUB&&b.extra.length?'<div class="sec"><h2>Əlavə hissələr</h2><div class="units">'+b.extra.map(function(x,k){return '<a class="unit" href="#/books/'+b.id+'/x'+k+'"><b>·</b><span class="t">'+esc(x.t)+'</span><span class="pill">'+(x.p[1]-x.p[0]+1)+' səh.</span></a>';}).join('')+'</div></div>':''));
    document.getElementById('f').oninput=function(){var q=this.value.toLowerCase();Array.prototype.forEach.call(app.querySelectorAll('.unit'),function(el){el.style.display=el.textContent.toLowerCase().indexOf(q)>-1?'':'none';});};
    return;
  }
  if(PUB){location.hash='#/lesson/'+b.id+'/'+a[1];return;}
  var ex=/^x(\d+)$/.exec(a[1]),u,idx,list;
  if(ex){u=b.extra[+ex[1]];if(!u){location.hash='#/books/'+b.id;return;}u={n:'x'+ex[1],t:u.t,p:u.p,extra:1};}
  else{idx=+a[1]-1;u=b.units[idx];if(!u){location.hash='#/books/'+b.id;return;}}
  var imgs='';var cap=(u.p[1]-u.p[0]>15)?u.p[0]+15:u.p[1];
  for(var n=u.p[0];n<=u.p[1];n++)imgs+='<img loading="lazy" src="'+pageUrl(b,n)+'" alt="'+esc(b.title)+' – səhifə '+n+'">';
  var key='';
  if(!u.extra){
    if(b.keyType==='text'&&u.key&&u.key.length){key='<div class="key"><div class="row"><b>Cavab açarı (Key to exercises)</b><button class="btn sm" id="tk">Göstər</button></div><div id="kb" hidden>'+u.key.map(function(k){return '<div style="margin-top:8px"><b>'+esc(k.id)+'</b><pre>'+esc(k.a)+'</pre></div>';}).join('')+'</div></div>';}
    else if(u.kp){var ki='';for(var m=u.kp[0];m<=Math.min(u.kp[1],u.kp[0]+1);m++)ki+='<img loading="lazy" src="'+pageUrl(b,m)+'" alt="Cavab açarı səhifə '+m+'">';
      key='<div class="key"><div class="row"><b>Cavab açarı</b><button class="btn sm" id="tk">Göstər</button></div><div id="kb" class="pages" hidden style="margin-top:8px">'+ki+'<p style="font-size:13px;color:var(--mut)">Vahid açarı bu səhifənin yarısında ola bilər – “Unit '+u.n+'” başlığını axtar.</p></div></div>';}
    else if(b.extra.length){var ai=b.extra.map(function(x){return x.t;}).indexOf('Answer key');if(ai>-1)key='<div class="key"><a href="#/books/'+b.id+'/x'+ai+'">Cavab açarı bölməsinə keç →</a> (vahid '+u.n+' üçün cavabları orada axtar)</div>';}
  }
  var isDone=!u.extra&&P.done[b.id+':'+u.n];
  var nav=u.extra?'':'<div class="sticky"><div class="row">'+(idx>0?'<a class="btn" href="#/books/'+b.id+'/'+idx+'">← '+idx+'</a>':'')+'</div><button class="btn '+(isDone?'':'pri')+'" id="dn">'+(isDone?'✓ Öyrənildi (geri al)':'Öyrəndim ✓')+'</button><div class="row">'+(idx<b.units.length-1?'<a class="btn" href="#/books/'+b.id+'/'+(idx+2)+'">'+(idx+2)+' →</a>':'')+'</div></div>';
  h('<div class="crumbs"><a href="#/books">Kurslar</a> › <a href="#/books/'+b.id+'">'+esc(b.title)+'</a></div><h1>'+(u.extra?'':u.n+'. ')+esc(u.t)+'</h1><p class="sub">Səhifələr '+u.p[0]+'–'+u.p[1]+(cap<u.p[1]?'':'')+'</p>'+key+'<div class="pages">'+imgs+'</div>'+nav);
  var tk=document.getElementById('tk');if(tk)tk.onclick=function(){var kb=document.getElementById('kb');kb.hidden=!kb.hidden;tk.textContent=kb.hidden?'Göstər':'Gizlət';};
  var dn=document.getElementById('dn');if(dn)dn.onclick=function(){var k=b.id+':'+u.n;if(P.done[k])delete P.done[k];else P.done[k]=1;save();var on=!!P.done[k];dn.textContent=on?'✓ Öyrənildi (geri al)':'Öyrəndim ✓';dn.classList.toggle('pri',!on);};
}
var HUES=[215,150,28,285,350,180,45,320,100,250];
function hueOf(n){return HUES[(+n||0)%HUES.length];}
function hasLesson(b,n){return (window.LESSON_IDS[b.id]||[]).indexOf(n)>-1;}
function unitLink(b){return function(u){var d=P.done[b.id+':'+u.n];var ls=hasLesson(b,u.n);return '<a class="unit'+(d?' done':'')+'" style="--h:'+hueOf(u.n)+'" href="#/'+(ls?'lesson/'+b.id:'books/'+b.id)+'/'+u.n+'"><b>'+u.n+'</b><span class="t">'+esc(u.t)+'</span>'+(ls?'<span class="pill ok">dərs</span>':'')+'<span class="chk"></span></a>';};}

/* ---------- lessons (self-contained unit pages) ---------- */
function lesson(a){
  var b=bookById(a[0]),n=+a[1];
  if(!b||!hasLesson(b,n)){location.hash=b?'#/books/'+b.id+'/'+n:'#/books';return;}
  if(b.id==='destb2')return destLesson(b,n);
  if(lstore(b)[n])return drawLesson(b,n);
  h('<p class="sub">Yüklənir…</p>');
  var s=document.createElement('script');s.src='data/'+b.id+'/u'+pad(n)+'.js';
  s.onload=function(){drawLesson(b,n);};s.onerror=function(){location.hash='#/books/'+b.id+'/'+n;};
  document.head.appendChild(s);
}
function lstore(b){return b.id==='murphy'?(window.LESSONS=window.LESSONS||{}):(window['L_'+b.id]=window['L_'+b.id]||{});}
function drawLesson(b,n){
  var L=lstore(b)[n],lang=P.lang||'az',ids=window.LESSON_IDS[b.id],ix=ids.indexOf(n);
  var vocab=!!L.groups;
  function tx(o){return (lang!=='en'?'<p>'+o.az.map(esc).join('</p><p>')+'</p>':'')+(lang!=='az'?'<p class="en">'+o.en.map(esc).join('</p><p class="en">')+'</p>':'');}
  function one(o){return lang==='en'?esc(o.en):lang==='az'?esc(o.az):esc(o.en)+'<br><span class="mut">'+esc(o.az)+'</span>';}
  var done=P.done[b.id+':'+n];
  var html='<div class="crumbs"><a href="#/books">Kurslar</a> › <a href="#/books/'+b.id+'">'+esc(b.title)+'</a></div>'+
   '<div class="row" style="justify-content:space-between"><h1>'+n+'. '+esc(L.title)+'</h1><div class="row seg" id="lg">'+[['az','AZ'],['both','AZ+EN'],['en','EN']].map(function(x){return '<button class="btn sm'+(lang===x[0]?' pri':'')+'" data-l="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div></div>'+
   '<div class="card lead">'+one(L.lead)+'</div>'+
   (vocab?vocabBody(L,lang):grammarBody(L,lang,tx))+
   '<h2>Məşqlər</h2>'+L.exercises.map(function(ex,xi){return '<div class="card ex" data-xi="'+xi+'"><h3>'+esc(ex.id)+' · '+(lang==='en'?esc(ex.instr.en):esc(ex.instr.az))+'</h3>'+ex.items.map(function(it,k){
      var q=esc(it.q);
      if(ex.type==='fill')q=q.replace('___','<input type="text" autocomplete="off" spellcheck="false" data-k="'+k+'">');
      else q=q+'<div class="opts">'+it.o.map(function(o,j){return '<button class="opt" data-k="'+k+'" data-j="'+j+'">'+esc(o)+'</button>';}).join('')+'</div>';
      return '<div class="it" data-k="'+k+'">'+(k+1)+'. '+q+'<span class="fb"></span></div>';}).join('')+
      (ex.type==='fill'?'<div class="row"><button class="btn pri chk">Yoxla</button><span class="score"></span></div>':'<div class="row"><span class="score"></span></div>')+'</div>';}).join('')+
   '<div class="sticky"><div class="row">'+(ix>0?'<a class="btn" href="#/lesson/'+b.id+'/'+ids[ix-1]+'">← '+ids[ix-1]+'</a>':'')+'</div><button class="btn '+(done?'':'pri')+'" id="dn">'+(done?'✓ Öyrənildi (geri al)':'Öyrəndim ✓')+'</button><div class="row">'+(ix<ids.length-1?'<a class="btn" href="#/lesson/'+b.id+'/'+ids[ix+1]+'">'+ids[ix+1]+' →</a>':'')+'</div></div>';
  h(html);
  app.style.setProperty('--h',hueOf(n));
  wireLesson(b,n,L);
}
function vocabBody(L,lang){
  return '<div class="row" style="margin:14px 0 4px"><button class="btn sm" id="hz">Tərcüməni gizlət (özünü yoxla)</button></div>'+
   L.groups.map(function(g){return '<h2>'+(lang==='en'?esc(g.h.en):esc(g.h.az))+'</h2><table class="vt"><thead><tr><th>English</th><th>Azərbaycanca</th><th>Nümunə</th></tr></thead><tbody>'+g.words.map(function(w){return '<tr><td><b>'+esc(w[0])+'</b></td><td class="az">'+esc(w[1])+'</td><td>'+esc(w[2]||'')+'</td></tr>';}).join('')+'</tbody></table>';}).join('')+
   (L.tips&&L.tips.length?'<h2>Qeydlər</h2><div class="card"><ul class="rule" style="margin:0;padding-left:20px">'+L.tips.map(function(t){return '<li>'+esc(t)+'</li>';}).join('')+'</ul></div>':'');
}
function grammarBody(L,lang,tx){
  return ''+
   '<h2>Sxem</h2><table class="scheme"><thead><tr><th>'+esc(L.scheme.head)+'</th><th>Formula</th><th>Nümunə</th></tr></thead><tbody>'+L.scheme.rows.map(function(r){return '<tr><td><b>'+esc(r[0])+'</b></td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td></tr>';}).join('')+'</tbody></table>'+(L.scheme.spelling?'<p class="sub" style="margin-top:8px">'+esc(L.scheme.spelling)+'</p>':'')+
   L.sections.map(function(s){return '<h2>'+esc(s.id)+' · '+(lang==='en'?esc(s.h.en):esc(s.h.az))+'</h2><div class="card">'+tx(s)+'<ul class="exl">'+s.ex.map(function(e){return '<li>'+(lang==='az'?esc(e[1])+'<br><span class="mut enf">'+esc(e[0])+'</span>':lang==='en'?'<span class="enf">'+esc(e[0])+'</span>':'<b class="enf">'+esc(e[0])+'</b><br><span class="mut">'+esc(e[1])+'</span>')+'</li>';}).join('')+'</ul>'+
     (s.deep?'<button class="btn sm dp">Dərindən öyrən ▾</button><div class="deep" hidden>'+tx(s.deep)+'</div>':'')+'</div>';}).join('')+
   '<h2>Tipik səhvlər</h2><table><thead><tr><th>Səhv</th><th>Düzgün</th><th>Niyə</th></tr></thead><tbody>'+L.traps.map(function(t){return '<tr><td style="color:var(--bad)">'+esc(t[0])+'</td><td style="color:var(--ok)"><b>'+esc(t[1])+'</b></td><td>'+esc(t[2])+'</td></tr>';}).join('')+'</tbody></table>';
}
function wireLesson(b,n,L){
  var hz=document.getElementById('hz');if(hz)hz.onclick=function(){var on=document.body.classList.toggle('hideaz');hz.textContent=on?'Tərcüməni göstər':'Tərcüməni gizlət (özünü yoxla)';};
  Array.prototype.forEach.call(document.querySelectorAll('#lg button'),function(bt){bt.onclick=function(){P.lang=bt.dataset.l;save();drawLesson(b,n);};});
  Array.prototype.forEach.call(document.querySelectorAll('.dp'),function(bt){bt.onclick=function(){var d=bt.nextSibling;d.hidden=!d.hidden;bt.textContent=d.hidden?'Dərindən öyrən ▾':'Daha az ▴';};});
  var dn=document.getElementById('dn');dn.onclick=function(){var k=b.id+':'+n;if(P.done[k])delete P.done[k];else P.done[k]=1;save();var on=!!P.done[k];dn.textContent=on?'✓ Öyrənildi (geri al)':'Öyrəndim ✓';dn.classList.toggle('pri',!on);};
  Array.prototype.forEach.call(document.querySelectorAll('.ex'),function(box){
    var ex=L.exercises[+box.dataset.xi];
    if(ex.type==='fill'){
      box.querySelector('.chk').onclick=function(){var sc=0;ex.items.forEach(function(it,k){var el=box.querySelector('.it[data-k="'+k+'"]'),v=norm(el.querySelector('input').value);var ok=it.a.some(function(x){return norm(x)===v;});if(ok)sc++;
        el.classList.toggle('okr',ok);el.classList.toggle('badr',!ok);el.querySelector('.fb').innerHTML=ok?' <b class="ok">✓</b>':' <b class="bad">✗</b> Düzgün: <b>'+esc(it.a[0])+'</b>'+(it.note?' <span class="mut">('+esc(it.note)+')</span>':'');});
        box.querySelector('.score').textContent=sc+' / '+ex.items.length;};
    }else{
      var sc2=0,an=0;
      box.addEventListener('click',function(e){var bt=e.target.closest('.opt');if(!bt)return;var k=+bt.dataset.k,el=box.querySelector('.it[data-k="'+k+'"]');if(el.dataset.d)return;el.dataset.d=1;
        var ok=+bt.dataset.j===ex.items[k].a;bt.classList.add(ok?'ok':'bad');if(!ok)el.querySelectorAll('.opt')[ex.items[k].a].classList.add('ok');if(ok)sc2++;an++;
        box.querySelector('.score').textContent=sc2+' / '+ex.items.length;});
    }
  });
}

/* ---------- flashcards ---------- */
function cards(a){
  if(!a[0]){
    h('<h1>Flashcard-lar</h1><p class="sub">Kartı çevir, sonra “Bildim” / “Təkrar” seç. Bilmədiklərin tez-tez qayıdır.</p><div class="grid">'+DECKS.map(function(d){var m=P.cards[d.id]||{};var kn=Object.keys(m).filter(function(k){return m[k]>=2;}).length;
      return '<a class="card" href="#/cards/'+d.id+'"><div class="k">'+d.cards.length+' kart</div><h3>'+esc(d.title)+'</h3><div class="bar"><i style="width:'+pct(kn,d.cards.length)+'%"></i></div><div style="font-size:13px;color:var(--mut);margin-top:4px">'+kn+' öyrənilib</div></a>';}).join('')+'</div>');return;}
  var d=DECKS.filter(function(x){return x.id===a[0];})[0];if(!d){location.hash='#/cards';return;}
  var m=P.cards[d.id]=P.cards[d.id]||{};
  function pick(){var w=d.cards.map(function(c,i){return {i:i,w:Math.max(1,4-(m[i]||0)*1.5)};});var tot=w.reduce(function(s,x){return s+x.w;},0),r=Math.random()*tot;for(var k=0;k<w.length;k++){r-=w[k].w;if(r<=0)return w[k].i;}return 0;}
  var cur=pick(),shown=false;
  function draw(){var c=d.cards[cur];var kn=Object.keys(m).filter(function(k){return m[k]>=2;}).length;
    h('<div class="crumbs"><a href="#/cards">Kartlar</a> › '+esc(d.title)+'</div><div class="row" style="justify-content:space-between"><span class="pill">'+kn+' / '+d.cards.length+' öyrənilib</span></div><div class="card flash" id="fl" style="margin-top:12px">'+esc(c[0])+(shown?'<small>'+esc(c[1])+'</small>':'<small>(çevirmək üçün toxun)</small>')+'</div><div class="row" style="margin-top:12px;justify-content:center"><button class="btn" id="ag">Təkrar</button><button class="btn pri" id="ok">Bildim</button></div>');
    document.getElementById('fl').onclick=function(){shown=!shown;draw();};
    function nxt(v){m[cur]=Math.max(0,Math.min(3,(m[cur]||0)+v));save();var p;do{p=pick();}while(p===cur&&d.cards.length>1);cur=p;shown=false;draw();}
    document.getElementById('ag').onclick=function(){m[cur]=0;nxt(0);};document.getElementById('ok').onclick=function(){nxt(1);};}
  draw();
}

/* ---------- word formation ---------- */
function wordform(){
  h('<h1>Söz yaradılması (Part 3)</h1><p class="sub">Kökdən doğru forma: əvvəl boşluğun nə olduğuna bax (isim, sifət, zərf, fel), sonra prefiks/suffiks. Kökü gör, cavabı özün yaz, sonra yoxla.</p><input class="search" id="f" placeholder="Axtar…"><table><thead><tr><th>Kök</th><th>Törəmələr</th><th>Növ</th></tr></thead><tbody id="tb">'+
   WF.map(function(r){return '<tr><td><button class="spk-b sm" data-w="'+esc(r[0]+' ; '+r[1].replace(/\(s\)/g,''))+'" aria-label="Dinlə">🔊</button> <b class="enf">'+esc(r[0])+'</b></td><td class="rv enf"><button class="btn sm sh">göstər</button><span hidden>'+esc(r[1])+'</span></td><td>'+esc(r[2])+'</td></tr>';}).join('')+'</tbody></table>'+
   '<h2>Qaydalar</h2><div class="card"><ul class="rule" style="margin:0;padding-left:20px"><li>Boşluqdan əvvəl <i>a/the/ sifət</i> → isim; <i>is/are/was + sözdən əvvəl</i> → sifət; feldən sonra zərf (-ly).</li><li>Mənfi məna: un-, in-, im-, dis-, ir-, il- (impossible, unhappy, disadvantage, irresponsible).</li><li>Cəm: səhv etməmək üçün isimin sayıla bilən olub-olmadığına bax (solutions, scientists).</li><li>İsim suffiksləri: -tion, -ment, -ness, -ity, -ance/-ence, -er/-or/-ist (şəxs).</li><li>Sifət suffiksləri: -ful, -less, -ous, -ive, -al, -able, -y, -ic.</li></ul></div>');
  app.querySelectorAll('.sh').forEach(function(b){b.onclick=function(){b.hidden=true;b.nextSibling.hidden=false;};});
  app.querySelectorAll('.spk-b[data-w]').forEach(function(b){b.onclick=function(){var p=b.dataset.w.split(' ; ');speakEn([p[0]].concat(p[1].split(' / ')),b);};});
  document.getElementById('f').oninput=function(){var q=this.value.toLowerCase();document.querySelectorAll('#tb tr').forEach(function(tr){tr.style.display=tr.textContent.toLowerCase().indexOf(q)>-1?'':'none';});};
}


/* ---------- danışıq cümlələri + səsləndirmə ---------- */
function phrases(a){
  var cats=window.PHRASES,cur=a[0]||'all',fav=P.fav||(P.fav={}),q='';
  var synth=window.speechSynthesis;
  var rate=+(P.rate||0.9),acc=P.acc||'en-US',hide=!!P.phHide;
  function voice(){if(!synth)return null;var vs=synth.getVoices().filter(function(v){return v.lang&&v.lang.replace('_','-').toLowerCase().indexOf(acc.toLowerCase())===0;});return vs[0]||synth.getVoices().filter(function(v){return /^en/i.test(v.lang);})[0]||null;}
  function say(t,el){if(!synth){alert('Brauzer səsləndirməni dəstəkləmir.');return;}synth.cancel();var u=new SpeechSynthesisUtterance(t);u.lang=acc;u.rate=rate;var v=voice();if(v)u.voice=v;
    if(el){el.classList.add('spk');u.onend=u.onerror=function(){el.classList.remove('spk');};}synth.speak(u);}
  function list(){var out=[];cats.forEach(function(c){if(cur==='all'||cur===c.id||cur==='fav')c.p.forEach(function(p){if(cur==='fav'&&!fav[p[0]])return;if(q&&(p[0]+' '+p[1]).toLowerCase().indexOf(q)<0)return;out.push([c,p]);});});return out;}
  function draw(){
    var tabs=[['all','Hamısı'],['fav','★ Seçilmişlər']].concat(cats.map(function(c){return [c.id,c.i+' '+c.t];}));
    var items=list();
    var rows=items.map(function(x,i){var p=x[1];return '<div class="ph"><button class="spk-b" data-i="'+i+'" aria-label="Dinlə">🔊</button><div class="pt"><div class="pe enf">'+esc(p[0])+'</div><div class="pa'+(hide?' hid':'')+'">'+esc(p[1])+'</div></div><button class="fv'+(fav[p[0]]?' on':'')+'" data-f="'+i+'" aria-label="Seç">★</button></div>';}).join('')||'<p class="mut">Heç nə tapılmadı.</p>';
    h('<h1>Danışıq cümlələri</h1><p class="sub">Qısa gündəlik cümlələr: Azərbaycanca tərcümə və səsləndirmə. 🔊 bas, dinlə, ucadan təkrar et.</p>'+
      '<div class="row seg" style="flex-wrap:wrap">'+tabs.map(function(t){return '<a class="btn sm'+(cur===t[0]?' pri':'')+'" href="#/phrases/'+t[0]+'">'+t[1]+'</a>';}).join('')+'</div>'+
      '<div class="row" style="margin:12px 0"><input class="search" id="pq" placeholder="Axtar…" value="'+esc(q)+'"><button class="btn sm" id="ph">'+(hide?'Tərcüməni göstər':'Tərcüməni gizlət')+'</button><button class="btn sm" id="pall">▶ Hamısını oxu</button></div>'+
      '<div class="row" style="margin-bottom:12px;gap:10px;align-items:center"><span class="mut">Sürət</span><input type="range" id="pr" min="0.5" max="1.2" step="0.1" value="'+rate+'" style="max-width:160px"><select id="pacc" class="search" style="max-width:160px"><option value="en-US"'+(acc==='en-US'?' selected':'')+'>Amerikan</option><option value="en-GB"'+(acc==='en-GB'?' selected':'')+'>Britaniya</option></select></div>'+
      '<div class="card phl">'+rows+'</div>');
    Array.prototype.forEach.call(app.querySelectorAll('.spk-b'),function(b){b.onclick=function(){say(items[+b.dataset.i][1][0],b);};});
    Array.prototype.forEach.call(app.querySelectorAll('.fv'),function(b){b.onclick=function(){var k=items[+b.dataset.f][1][0];if(fav[k])delete fav[k];else fav[k]=1;save();draw();};});
    Array.prototype.forEach.call(app.querySelectorAll('.pa'),function(el){el.onclick=function(){el.classList.toggle('hid');};});
    var inp=document.getElementById('pq');inp.oninput=function(){q=this.value.toLowerCase();var pos=this.selectionStart;draw();var n=document.getElementById('pq');n.focus();n.setSelectionRange(pos,pos);};
    document.getElementById('ph').onclick=function(){hide=!hide;P.phHide=hide;save();draw();};
    document.getElementById('pr').onchange=function(){rate=+this.value;P.rate=rate;save();};
    document.getElementById('pacc').onchange=function(){acc=this.value;P.acc=acc;save();};
    document.getElementById('pall').onclick=function(){if(!synth)return;synth.cancel();items.forEach(function(x){var u=new SpeechSynthesisUtterance(x[1][0]);u.lang=acc;u.rate=rate;var v=voice();if(v)u.voice=v;synth.speak(u);});};
  }
  draw();
}


/* ---------- Phrasal verbs ---------- */
function phrasal(){
  var L=window.PHRASAL,q='',hide=false;
  function draw(){
    var items=L.filter(function(r){return !q||(r[0]+' '+r[1]+' '+r[2]).toLowerCase().indexOf(q)>-1;});
    h('<h1>Phrasal verbs</h1><p class="sub">Fel + ədat birləşmələri: '+L.length+' ən vacib birləşmə. Dinlə, nümunəni oxu, tərcüməni gizləyib yoxla.</p>'+
      '<div class="row" style="margin:12px 0"><input class="search" id="pvq" placeholder="Axtar…" value="'+esc(q)+'"><button class="btn sm" id="pvh">'+(hide?'Tərcüməni göstər':'Tərcüməni gizlət')+'</button></div>'+
      '<div class="card phl">'+items.map(function(r,i){return '<div class="ph"><button class="spk-b" data-i="'+i+'" aria-label="Dinlə">🔊</button><div class="pt"><div class="pe enf">'+esc(r[0])+' <span class="mut" style="font-weight:400;font-size:15px">— <span class="pa'+(hide?' hid':'')+'" style="display:inline">'+esc(r[1])+'</span></span></div><div class="enf">'+esc(r[2])+'</div><div class="pa'+(hide?' hid':'')+'">'+esc(r[3])+'</div></div></div>';}).join('')+'</div>');
    Array.prototype.forEach.call(app.querySelectorAll('.spk-b'),function(b){b.onclick=function(){var r=items[+b.dataset.i];speakEn([r[0],r[2]],b);};});
    Array.prototype.forEach.call(app.querySelectorAll('.pa'),function(el){el.onclick=function(){el.classList.toggle('hid');};});
    var inp=document.getElementById('pvq');inp.oninput=function(){q=this.value.toLowerCase();var pos=this.selectionStart;draw();var n=document.getElementById('pvq');n.focus();n.setSelectionRange(pos,pos);};
    document.getElementById('pvh').onclick=function(){hide=!hide;draw();};
  }
  draw();
}

/* ---------- Diktant (dinlə və yaz) ---------- */
function dictation(){
  var pool=[];window.PHRASES.forEach(function(c){c.p.forEach(function(p){pool.push(p);});});
  var cur=null,score=0,tried=0;
  function pick(){cur=pool[Math.floor(Math.random()*pool.length)];}
  function draw(msg){
    h('<h1>Dinlə və yaz</h1><p class="sub">Cümləni dinlə, eşitdiyini ingiliscə yaz. Tərcümə ipucu kimi altda durur.</p>'+
      '<div class="card" style="text-align:center"><button class="spk-b" id="dsp" style="width:72px;height:72px;font-size:30px" aria-label="Dinlə">🔊</button><p class="mut" id="dtr" style="margin:10px 0">İpucu: '+esc(cur[1])+'</p>'+
      '<input class="search" id="din" placeholder="Eşitdiyini yaz…" autocomplete="off" style="max-width:420px;width:100%"><div class="row" style="justify-content:center;margin-top:12px;gap:10px"><button class="btn pri" id="dok">Yoxla</button><button class="btn" id="dsl">Yavaş dinlə</button><button class="btn" id="dnx">Növbəti</button></div>'+
      '<div id="dfb" style="margin-top:12px;min-height:28px">'+(msg||'')+'</div><div class="mut">Xal: '+score+' / '+tried+'</div></div>');
    document.getElementById('dsp').onclick=function(){speakEn([cur[0]],this);};
    document.getElementById('dsl').onclick=function(){var o=P.rate;P.rate=0.6;speakEn([cur[0]],null);P.rate=o;};
    document.getElementById('dok').onclick=function(){var v=document.getElementById('din').value;if(!v.trim())return;tried++;var ok=norm(v)===norm(cur[0]);if(ok)score++;P.dict=P.dict||{ok:0,all:0};P.dict.all++;if(ok)P.dict.ok++;save();draw(ok?'<b class="ok">✓ Düzdür!</b>':'<b class="bad">✗</b> Düzgünü: <b class="enf">'+esc(cur[0])+'</b>');};
    document.getElementById('din').onkeydown=function(e){if(e.key==='Enter')document.getElementById('dok').click();};
    document.getElementById('dnx').onclick=function(){pick();draw();setTimeout(function(){speakEn([cur[0]],null);},150);};
  }
  pick();draw();
}

/* ---------- Vaxtlı qarışıq test ---------- */
function mock(){
  var all=[];window.GRAMMAR.forEach(function(g){g.q.forEach(function(q){all.push({t:g.t,q:q});});});
  for(var i=all.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=all[i];all[i]=all[j];all[j]=t;}
  var N=20,set=all.slice(0,N),ans=[],secs=15*60,tick=null,done=false;
  function fmt(s){return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2);}
  function finish(){if(done)return;done=true;clearInterval(tick);var sc=0,wrong=[];set.forEach(function(x,k){if(ans[k]===x.q[2])sc++;else wrong.push(k);});
    P.mock=P.mock||[];P.mock.push({d:new Date().toISOString().slice(0,10),s:sc,n:N});save();
    h('<h1>Nəticə: '+sc+' / '+N+'</h1><div class="bar" style="margin:12px 0"><i style="width:'+Math.round(sc/N*100)+'%"></i></div>'+
      (wrong.length?'<h2>Səhvlər</h2><div class="card">'+wrong.map(function(k){var x=set[k];return '<div style="margin-bottom:14px"><b>'+esc(x.q[0])+'</b><br>Sənin cavabın: <span class="bad">'+(ans[k]==null?'—':esc(x.q[1][ans[k]]))+'</span> · Düzgün: <b class="ok">'+esc(x.q[1][x.q[2]])+'</b><br><span class="mut">'+esc(x.q[3]||'')+' ('+esc(x.t)+')</span></div>';}).join('')+'</div>':'<p>Hamısı düzdür. Əla!</p>')+
      '<div class="row" style="margin-top:14px"><a class="btn pri" href="#/mock" id="again">Yenidən</a><a class="btn" href="#/tools">Alətlər</a></div>');
    document.getElementById('again').onclick=function(e){e.preventDefault();mock();};}
  function draw(){
    h('<h1>Qarışıq test</h1><p class="sub">Qrammatika mövzularından '+N+' sual, 15 dəqiqə. Cavabları seç, sonda "Bitir" bas.</p><div class="card" style="position:sticky;top:8px;z-index:3"><b id="mt">⏱ '+fmt(secs)+'</b> · <span id="mc">0 / '+N+' cavablandı</span></div>'+
      set.map(function(x,k){return '<div class="q" data-k="'+k+'" style="padding:14px 16px;margin:12px 0"><b>'+(k+1)+'. '+esc(x.q[0])+'</b><div class="opts" style="margin-top:8px">'+x.q[1].map(function(o,j){return '<button class="opt" data-j="'+j+'">'+esc(o)+'</button>';}).join(' ')+'</div></div>';}).join('')+
      '<button class="btn pri" id="mfin">Bitir</button>');
    app.addEventListener('click',function hnd(e){var b=e.target.closest&&e.target.closest('.opt');if(!b||done)return;var box=b.closest('.q'),k=+box.dataset.k;ans[k]=+b.dataset.j;box.querySelectorAll('.opt').forEach(function(o){o.classList.remove('on');o.style.outline='';});b.style.outline='3px solid var(--a2)';document.getElementById('mc').textContent=ans.filter(function(a){return a!=null;}).length+' / '+N+' cavablandı';});
    document.getElementById('mfin').onclick=finish;
    tick=setInterval(function(){secs--;var el=document.getElementById('mt');if(!el||done){clearInterval(tick);return;}el.textContent='⏱ '+fmt(secs);if(secs<=0)finish();},1000);
  }
  draw();
}

/* ---------- Yazı bələdçisi ---------- */
function writing(){
  h('<h1>Yazı bələdçisi</h1><p class="sub">B2 səviyyəsində e-poçt, esse və rəy yazmaq üçün qısa plan, nümunə mətn və bağlayıcı sözlər.</p>'+
    window.WRITING.map(function(w){return '<h2>'+esc(w.t)+'</h2><div class="card"><b>Plan</b><ul style="margin:6px 0 12px;padding-left:20px">'+w.tips.map(function(t){return '<li>'+esc(t)+'</li>';}).join('')+'</ul><b>Nümunə</b><p class="enf" style="white-space:pre-line;margin-top:6px">'+esc(w.sample)+'</p><button class="btn sm" data-w="'+esc(w.sample.replace(/\n/g,' '))+'">🔊 Dinlə</button></div>';}).join('')+
    '<h2>Bağlayıcı sözlər</h2><div class="card"><table><thead><tr><th>Məqsəd</th><th>Sözlər</th></tr></thead><tbody>'+window.LINKERS.map(function(l){return '<tr><td><b>'+esc(l[0])+'</b></td><td class="enf">'+esc(l[1])+'</td></tr>';}).join('')+'</tbody></table></div>'+
    '<h2>Özün yaz</h2><div class="card"><p>Mövzu seç və 120–150 söz yaz. Yazdıqlarını bu sətirdə saxlayır.</p><textarea id="wt" class="search" rows="9" style="width:100%" placeholder="Burada yaz…"></textarea><div class="mut" id="wc">0 söz</div></div>');
  Array.prototype.forEach.call(app.querySelectorAll('button[data-w]'),function(b){b.onclick=function(){speakEn([b.dataset.w],b);};});
  var ta=document.getElementById('wt');ta.value=P.draft||'';
  function cnt(){var n=(ta.value.trim().match(/\S+/g)||[]).length;document.getElementById('wc').textContent=n+' söz';}
  cnt();ta.oninput=function(){P.draft=ta.value;save();cnt();};
}


/* ---------- Lüğət (bütün sözlər, axtarışla) ---------- */
function dictionary(){
  var D=window.DICT||[],q='',src='all',shown=80,hide=false,STEP=80;
  var names={v:'Ümumi',b:'Biznes',x:'Əlavə'};
  function cnt(s){return D.filter(function(r){return s==='all'||r[3]===s;}).length;}
  function filt(){var s=q.trim().toLowerCase();return D.filter(function(r){if(src!=='all'&&r[3]!==src)return false;return !s||r[0].toLowerCase().indexOf(s)>-1||r[1].toLowerCase().indexOf(s)>-1;});}
  function draw(keep){
    var list=filt(),part=list.slice(0,shown);
    h('<h1>Lüğət</h1><p class="sub">'+D.length+' söz və ifadə: ingiliscə və ya Azərbaycanca axtar, 🔊 ilə dinlə. Dərsdən gələn sözlərin yanında həmin dərsə keçid var.</p>'+
      '<input class="search" id="dq" placeholder="Axtar: məs. budget, borc, take off…" value="'+esc(q)+'" style="width:100%">'+
      '<div class="row seg" style="margin:10px 0;flex-wrap:wrap">'+[['all','Hamısı'],['v','Ümumi'],['b','Biznes'],['x','Əlavə']].map(function(t){return '<a class="btn sm'+(src===t[0]?' pri':'')+'" data-s="'+t[0]+'" href="#/dict">'+t[1]+' ('+cnt(t[0])+')</a>';}).join('')+'<button class="btn sm" id="dh">'+(hide?'Tərcüməni göstər':'Tərcüməni gizlət')+'</button></div>'+
      '<div class="mut" style="margin-bottom:8px">'+list.length+' nəticə</div>'+
      '<div class="card phl">'+(part.map(function(r,i){var link=r[3]==='v'?'#/lesson/vocab/'+r[4]:r[3]==='b'?'#/lesson/bizvocab/'+r[4]:'';
        return '<div class="ph"><button class="spk-b" data-i="'+i+'" aria-label="Dinlə">🔊</button><div class="pt"><div class="pe enf">'+esc(r[0])+'</div><div class="pa'+(hide?' hid':'')+'">'+esc(r[1])+'</div>'+(r[2]?'<div class="mut enf" style="font-size:14px">'+esc(r[2])+'</div>':'')+'<div class="mut" style="font-size:12px">'+names[r[3]]+(r[5]?' · '+esc(r[5]):'')+(link?' · <a href="'+link+'">dərs '+r[4]+'</a>':'')+'</div></div></div>';}).join('')||'<p class="mut">Heç nə tapılmadı.</p>')+'</div>'+
      (list.length>shown?'<div style="text-align:center;margin:14px 0"><button class="btn" id="dmore">Daha çox göstər ('+(list.length-shown)+')</button></div>':''));
    Array.prototype.forEach.call(app.querySelectorAll('.spk-b'),function(b){b.onclick=function(){var r=part[+b.dataset.i];speakEn(r[2]?[r[0],r[2]]:[r[0]],b);};});
    Array.prototype.forEach.call(app.querySelectorAll('.pa'),function(el){el.onclick=function(){el.classList.toggle('hid');};});
    Array.prototype.forEach.call(app.querySelectorAll('[data-s]'),function(a){a.onclick=function(e){e.preventDefault();src=a.dataset.s;shown=STEP;draw();};});
    var inp=document.getElementById('dq');inp.oninput=function(){q=this.value;shown=STEP;var pos=this.selectionStart;draw();var n=document.getElementById('dq');n.focus();n.setSelectionRange(pos,pos);};
    document.getElementById('dh').onclick=function(){hide=!hide;draw();};
    var mo=document.getElementById('dmore');if(mo)mo.onclick=function(){shown+=STEP;draw();};
  }
  draw();
}


/* ---------- Sınaq imtahanı (qapalı tipli suallar) ---------- */
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function vocabQuestions(n){
  var D=(window.DICT||[]).filter(function(r){return r[0].indexOf(' ')<0&&r[0].indexOf('/')<0&&r[1].length<34&&r[1].indexOf('/')<0&&r[1].indexOf(',')<0;});
  var pick=shuffle(D).slice(0,n);
  return pick.map(function(r){var wrong=shuffle(D.filter(function(x){return x[1]!==r[1];})).slice(0,3).map(function(x){return x[1];});
    var opts=shuffle([r[1]].concat(wrong));return ['“'+r[0]+'” sözünün mənası hansıdır?',opts,opts.indexOf(r[1]),r[0]+' = '+r[1]];});
}
function runQuiz(cfg){
  var blocks=cfg.blocks,flat=[];blocks.forEach(function(b){b.q.forEach(function(q){flat.push(q);});});
  var N=flat.length,ans=[],secs=(cfg.minutes||0)*60,tick=null,done=false;
  function fmt(s){return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2);}
  function finish(){if(done)return;done=true;clearInterval(tick);var sc=0,wrong=[];flat.forEach(function(q,k){if(ans[k]===q[2])sc++;else wrong.push(k);});
    P.practice=P.practice||[];P.practice.push({d:new Date().toISOString().slice(0,10),t:cfg.title,s:sc,n:N});save();
    h('<h1>Nəticə: '+sc+' / '+N+'</h1><p class="sub">'+esc(cfg.title)+'</p><div class="bar" style="margin:12px 0"><i style="width:'+Math.round(sc/N*100)+'%"></i></div>'+
      (wrong.length?'<h2>Səhvlər və izah</h2><div class="card">'+wrong.map(function(k){var q=flat[k];return '<div style="margin-bottom:14px"><b>'+esc(q[0])+'</b><br>Sənin cavabın: <span class="bad">'+(ans[k]==null?'—':esc(q[1][ans[k]]))+'</span> · Düzgün: <b class="ok">'+esc(q[1][q[2]])+'</b><br><span class="mut">'+esc(q[3]||'')+'</span></div>';}).join('')+'</div>':'<p>Hamısı düzdür. Əla!</p>')+
      '<div class="row" style="margin-top:14px"><button class="btn pri" id="again">Yenidən</button><a class="btn" href="#/practice">Sınaq menyusu</a></div>');
    document.getElementById('again').onclick=function(){cfg.again();};}
  var qi=0;
  h('<h1>'+esc(cfg.title)+'</h1><div class="card" style="position:sticky;top:8px;z-index:3"><b id="mt">'+(secs?'⏱ '+fmt(secs):'Vaxt məhdudiyyəti yoxdur')+'</b> · <span id="mc">0 / '+N+' cavablandı</span></div>'+
    blocks.map(function(b){return (b.h?'<h2>'+esc(b.h)+'</h2>':'')+(b.text?'<div class="card"><p class="enf" style="margin:0">'+esc(b.text)+'</p></div>':'')+b.q.map(function(q){var k=qi++;return '<div class="q" data-k="'+k+'" style="padding:14px 16px;margin:12px 0"><b>'+(k+1)+'. '+esc(q[0])+'</b><div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:8px">'+q[1].map(function(o,j){return '<button class="opt" data-j="'+j+'">'+esc(o)+'</button>';}).join('')+'</div></div>';}).join('');}).join('')+
    '<button class="btn pri" id="mfin">Bitir</button>');
  app.onclick=function(e){var b=e.target.closest&&e.target.closest('.opt');if(!b||done)return;var box=b.closest('.q'),k=+box.dataset.k;ans[k]=+b.dataset.j;box.querySelectorAll('.opt').forEach(function(o){o.style.outline='';});b.style.outline='3px solid var(--a2)';document.getElementById('mc').textContent=ans.filter(function(a){return a!=null;}).length+' / '+N+' cavablandı';};
  document.getElementById('mfin').onclick=function(){app.onclick=null;finish();};
  if(secs)tick=setInterval(function(){secs--;var el=document.getElementById('mt');if(!el||done){clearInterval(tick);return;}el.textContent='⏱ '+fmt(secs);if(secs<=0){app.onclick=null;finish();}},1000);
}
function practice(a){
  var PR=window.PRACTICE,sec=a[0]||'';
  var cogKeys=Object.keys(PR.cognitive);
  function start(){practice(a);}
  if(sec==='reading')return runQuiz({title:'Oxuyub-anlama',minutes:25,again:start,blocks:shuffle(PR.reading).map(function(r){return {h:r.title,text:r.text,q:r.q};})});
  if(sec==='grammar')return mock();
  if(sec==='vocab')return runQuiz({title:'Lüğət bazası',minutes:10,again:start,blocks:[{q:vocabQuestions(25)}]});
  if(sec==='cog'){var k=a[1];var set=PR.cognitive[k];if(!set)return practice([]);return runQuiz({title:set.t,minutes:10,again:start,blocks:[{q:shuffle(set.q)}]});}
  if(sec==='cogall'){var all=[];cogKeys.forEach(function(k){all=all.concat(shuffle(PR.cognitive[k].q).slice(0,5));});return runQuiz({title:'Koqnitiv bacarıqlar (qarışıq)',minutes:30,again:start,blocks:[{q:shuffle(all)}]});}
  if(sec==='full'){
    var g=[];window.GRAMMAR.forEach(function(x){x.q.forEach(function(q){g.push(q);});});
    var c=[];cogKeys.forEach(function(k){c=c.concat(shuffle(PR.cognitive[k].q).slice(0,3));});
    return runQuiz({title:'Tam sınaq imtahanı',minutes:60,again:start,blocks:[
      {h:'1. Oxuyub-anlama',text:'',q:[]}].concat(shuffle(PR.reading).slice(0,2).map(function(r){return {h:r.title,text:r.text,q:r.q};})).concat([
      {h:'2. Qrammatika',q:shuffle(g).slice(0,12)},{h:'3. Lüğət',q:vocabQuestions(12)},{h:'4. Koqnitiv bacarıqlar',q:shuffle(c).slice(0,15)}])});
  }
  var cards=[['reading','Oxuyub-anlama','10 mətn, 40 sual','Mətni oxu, qapalı tipli suallara cavab ver.'],['grammar','Qrammatika','20 sual, 15 dəqiqə','Dilin qrammatik qaydaları üzrə test.'],['vocab','Lüğət bazası','25 sual','Söz mənası seçimi (lüğətdən avtomatik yığılır).'],
    ['cogall','Koqnitiv bacarıqlar','Qarışıq, 30 dəqiqə','Bütün 5 mövzudan: təfəkkür, kəmiyyət, məkan, verbal, mexaniki.'],['full','Tam sınaq','60 dəqiqə','Bütün hissələrdən qarışıq imtahan.']];
  var cog=cogKeys.map(function(k){return [k,PR.cognitive[k].t,PR.cognitive[k].q.length+' sual','Yalnız bu mövzu üzrə məşq.'];});
  h('<h1>Sınaq imtahanı</h1><p class="sub">İmtahan proqramındakı mövzulara uyğun qapalı tipli suallar (öz yazdığımız sual bankı). Real imtahan suallarını bilmirik; bunlar məşq üçündür.</p>'+
    '<h2>İngilis dili</h2><div class="grid">'+cards.map(function(c){return '<a class="card" href="#/practice/'+c[0]+'"><div class="k">'+c[1]+'</div><h3>'+c[2]+'</h3><p style="margin:0">'+c[3]+'</p></a>';}).join('')+'</div>'+
    '<h2>Koqnitiv bacarıqlar (mövzu üzrə)</h2><div class="grid">'+cog.map(function(c){return '<a class="card" href="#/practice/cog/'+c[0]+'"><div class="k">'+c[2]+'</div><h3>'+c[1]+'</h3><p style="margin:0">'+c[3]+'</p></a>';}).join('')+'</div>'+
    ((P.practice&&P.practice.length)?'<h2>Son nəticələr</h2><div class="card">'+P.practice.slice(-6).reverse().map(function(r){return '<div>'+esc(r.d)+' · '+esc(r.t)+': <b>'+r.s+' / '+r.n+'</b></div>';}).join('')+'</div>':''));
}


/* ---------- Rəsmi mənbələr və imtahan proqramı ---------- */
function sources(){
  var L=[
   ['Oxuyub-anlama','Cambridge English: B2 First nümunə testləri','https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/preparation/'],
   ['Oxuyub-anlama','British Council LearnEnglish: B2 Reading','https://learnenglish.britishcouncil.org/free-resources/reading/b2'],
   ['Qrammatika','British Council LearnEnglish: B1–B2 Grammar','https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2'],
   ['Lüğət','British Council LearnEnglish: B1–B2 Vocabulary','https://learnenglish.britishcouncil.org/free-resources/vocabulary/b1-b2'],
   ['Lüğət','Oxford Learner’s Dictionaries','https://www.oxfordlearnersdictionaries.com/']];
  h('<h1>İmtahan proqramı və mənbələr</h1><p class="sub">Funksional bacarıqların test qiymətləndirməsi üzrə imtahan proqramı: ingilis dili və koqnitiv bacarıqlar, qapalı tipli test tapşırıqları.</p>'+
    '<div class="card"><table><thead><tr><th>Blok</th><th>Mövzu</th><th>Saytda</th></tr></thead><tbody>'+
    '<tr><td rowspan="3"><b>İngilis dili</b></td><td>Oxuyub-anlama</td><td><a href="#/practice/reading">10 mətn, 40 sual</a></td></tr>'+
    '<tr><td>Dilin qrammatik qaydaları</td><td><a href="#/books">145 dərs + 53 B2 bölməsi</a>, <a href="#/practice/grammar">qrammatika testi</a></td></tr>'+
    '<tr><td>Lüğət bazası</td><td><a href="#/dict">Lüğət</a>, <a href="#/practice/vocab">lüğət testi</a></td></tr>'+
    '<tr><td rowspan="5"><b>Koqnitiv bacarıqlar</b></td><td>Axıcı təfəkkür</td><td><a href="#/practice/cog/series">Ədədi və hərfi sıralar</a></td></tr>'+
    '<tr><td>Vizual-məkan bacarıqları</td><td><a href="#/practice/cog/spatial">Məkan tapşırıqları</a></td></tr>'+
    '<tr><td>Kəmiyyət təfəkkürü</td><td><a href="#/practice/cog/quant">Kəmiyyət tapşırıqları</a></td></tr>'+
    '<tr><td>Verbal mühakimə</td><td><a href="#/practice/cog/verbal">Analogiya, məntiq</a></td></tr>'+
    '<tr><td>Mexaniki mühakimə</td><td><a href="#/practice/cog/mechanical">Mexanika tapşırıqları</a></td></tr></tbody></table></div>'+
    '<h2>Rəsmi mənbələr</h2><div class="card">'+L.map(function(x){return '<div class="ph"><div class="pt"><div class="pe">'+esc(x[1])+'</div><div class="mut" style="font-size:13px">'+esc(x[0])+'</div></div><a class="btn sm" href="'+x[2]+'" target="_blank" rel="noopener">Aç ↗</a></div>';}).join('')+'</div>'+
    '<p class="mut" style="margin-top:12px">Qeyd: koqnitiv bacarıqlar üçün proqramda ədəbiyyat göstərilməyib, həmin tapşırıqlar məntiq nəzəriyyələrinə əsaslanır.</p>');
}

/* ---------- strategy ---------- */
function strategy(){
  var parts=[
   ['Part 1 · Multiple-choice cloze (1–8)','Mətni tam oxu, sonra hər boşluğa 4 variantı sına. Əsasən collocation və phrasal verb yoxlanır (give a performance, help out, gain experience). Şübhə varsa sözlə yanaşı gələn sözlərə bax.'],
   ['Part 2 · Open cloze (9–16)','Hər boşluğa yalnız 1 söz. Qrammatika sözləri: prepozisiya, artikl, əvəzlik, bağlayıcı, köməkçi fel (which/that, up, or, like, so, are, fact, what). Cavab imla ilə düzgün yazılmalıdır.'],
   ['Part 3 · Word formation (17–24)','Boşluqdan əvvəl-sonra sözlərə bax: nə lazımdır – isim, sifət, zərf? Cəm və mənfi məna yoxla (disadvantage, solutions, scientists). Kökü olduğu kimi yazma.'],
   ['Part 4 · Key word transformation (25–30)','Verilmiş sözü dəyişmə, 2–5 söz yaz (contractions bir söz sayılır). Tez-tez: passive, reported speech, conditionals, so/such … that, wish, would rather, accuse of. Hər sual 2 balla qiymətləndirilir (hissə-hissə).'],
   ['Part 5 · Reading, multiple choice (31–36)','Əvvəl sualları oxu, sonra mətnə bax. Suallar mətn ardıcıllığı ilə gedir. Yanlış variantlar çox vaxt mətndəki sözləri təkrarlayır – məna uyğunluğuna bax.'],
   ['Part 6 · Gapped text (37–42)','Cümlənin əvvəlindəki və sonundakı əlaqələndiricilərə (this, however, in this way, so) və əvəzliklərə (he, they, it) diqqət et. Artıq bir cümlə var.'],
   ['Part 7 · Multiple matching (43–52)','Əvvəl 10 sualı oxu, sonra 4 mətnə sürətli bax. Eyni mətn bir neçə dəfə seçilə bilər. Sözün özünə yox, mənaya (paraphrase) uyğun gəl.']];
  h('<h1>İmtahan strategiyası</h1><p class="sub">B2 First (FCE) Reading &amp; Use of English: 7 hissə, 52 sual, 75 dəqiqə.</p><div class="card"><b>Vaxt bölgüsü (təxmini):</b> Part 1–3 ≈ 20 dəq · Part 4 ≈ 10 dəq · Part 5–7 ≈ 40 dəq · yoxlama ≈ 5 dəq. Cavab vərəqinə yazmağı unutma; boş buraxma, ehtimal et.</div>'+parts.map(function(p){return '<h2>'+esc(p[0])+'</h2><div class="card">'+esc(p[1])+'</div>';}).join(''));
}

/* ---------- progress ---------- */
function progress(){
  var t=totals();
  var exrows=EXAM.map(function(x){return '<tr><td>'+esc(x.title)+'</td>'+['p1','p2','p3','p4'].map(function(id){var r=P.exam[x.id+':'+id];return '<td>'+(r?r.score+' / '+r.max:'—')+'</td>';}).join('')+'</tr>';}).join('');
  var qd=Object.keys(P.quiz).length;
  h('<h1>İrəliləyiş</h1><p class="sub">Məlumat yalnız bu brauzerdə saxlanır.</p><div class="grid"><div class="card"><div class="k">Öyrənilən vahidlər</div><h3>'+t.done+' / '+t.tot+'</h3><div class="bar"><i style="width:'+pct(t.done,t.tot)+'%"></i></div></div><div class="card"><div class="k">İmtahan bal (ən yaxşı)</div><h3>'+(t.exm?t.ex+' / '+t.exm:'—')+'</h3></div><div class="card"><div class="k">Qrammatika mini testləri</div><h3>'+qd+' / '+GRAM.length+'</h3></div></div>'+
   '<h2>İmtahan nəticələri</h2><table><thead><tr><th>Test</th><th>Part 1</th><th>Part 2</th><th>Part 3</th><th>Part 4</th></tr></thead><tbody>'+exrows+'</tbody></table>'+
   '<h2>Kurslar</h2><table><tbody>'+BOOKS.map(function(b){var d=b.units.filter(function(u){return P.done[b.id+':'+u.n];}).length;return '<tr><td>'+esc(b.title)+'</td><td>'+d+' / '+b.units.length+'</td></tr>';}).join('')+'</tbody></table>'+
   '<p style="margin-top:20px"><button class="btn" id="rs">Hamısını sıfırla</button></p>');
  document.getElementById('rs').onclick=function(){if(confirm('Bütün irəliləyiş silinsin?')){P={done:{},exam:{},quiz:{},cards:{}};save();progress();}};
}


/* ---------- ümumi səsləndirmə ---------- */
function speakEn(list,el){
  var syn=window.speechSynthesis;if(!syn){alert('Brauzer səsləndirməni dəstəkləmir.');return;}
  syn.cancel();var acc=(P&&P.acc)||'en-US',rate=+((P&&P.rate)||0.9);
  var vs=syn.getVoices().filter(function(v){return v.lang&&v.lang.replace('_','-').toLowerCase().indexOf(acc.toLowerCase())===0;});
  var voice=vs[0]||syn.getVoices().filter(function(v){return /^en/i.test(v.lang);})[0]||null;
  if(el)el.classList.add('spk');
  [].concat(list).forEach(function(t,i,arr){var u=new SpeechSynthesisUtterance(t);u.lang=acc;u.rate=rate;if(voice)u.voice=voice;if(i===arr.length-1)u.onend=u.onerror=function(){if(el)el.classList.remove('spk');};syn.speak(u);});
}

/* ---------- fellər ---------- */
function verbPattern(r){var a=r[0],b=r[1].split(' / ')[0],c=r[2].split(' / ')[0];if(a===b&&b===c)return 'aaa';if(a===c&&a!==b)return 'aba';if(b===c)return 'abb';return 'abc';}
function verbs(a){
  var tab=a[0]==='regular'?'regular':'irregular';
  var names={aaa:'A–A–A (üç forma eyni)',aba:'A–B–A (1-ci və 3-cü eyni)',abb:'A–B–B (2-ci və 3-cü eyni)',abc:'A–B–C (hamısı fərqli)'};
  var head='<h1>Fellər</h1><p class="sub">Düzgün (düzgün) və düzgün olmayan (düzgün olmayan) fellərin siyahısı.</p><div class="row seg"><a class="btn'+(tab==='irregular'?' pri':'')+'" href="#/verbs/irregular">Düzgün olmayan ('+window.IRREGULAR2.length+')</a><a class="btn'+(tab==='regular'?' pri':'')+'" href="#/verbs/regular">Düzgün ('+window.REGULAR.length+')</a></div>';
  function hideBtn(){document.getElementById('vh').onclick=function(){var on=document.body.classList.toggle('hideaz');this.textContent=on?'Tərcüməni göstər':'Tərcüməni gizlət';};}
  if(tab==='irregular'){
    var rows=window.IRREGULAR2.map(function(r){var p=verbPattern(r);return '<tr class="vp vp-'+p+'" data-p="'+p+'"><td><b>'+esc(r[0])+'</b></td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td><td class="az">'+esc(r[3])+'</td></tr>';}).join('');
    h(head+'<div class="card" style="margin-top:12px">Rəng modeli: '+Object.keys(names).map(function(k){return '<span class="pill vp-'+k+'" style="margin-right:6px">'+names[k]+'</span>';}).join('')+'<br><span class="mut">Eyni modelli felləri bir yerdə öyrənmək asandır: məsələn A–B–B: bring–brought–brought, buy–bought–bought.</span></div>'+
     '<div class="row" style="margin:12px 0"><input class="search" id="vf" placeholder="Axtar: ingiliscə və ya Azərbaycanca…"><button class="btn sm" id="vh">Tərcüməni gizlət</button><select id="vs" class="search" style="max-width:240px"><option value="">Bütün modellər</option>'+Object.keys(names).map(function(k){return '<option value="'+k+'">'+names[k]+'</option>';}).join('')+'</select></div>'+
     '<table class="vt" id="vt"><thead><tr><th>Infinitive</th><th>Past simple</th><th>Past participle</th><th>Azərbaycanca</th></tr></thead><tbody>'+rows+'</tbody></table>');
    var flt=function(){var q=document.getElementById('vf').value.toLowerCase(),p=document.getElementById('vs').value;document.querySelectorAll('#vt tbody tr').forEach(function(tr){tr.style.display=(!p||tr.dataset.p===p)&&tr.textContent.toLowerCase().indexOf(q)>-1?'':'none';});};
    document.getElementById('vf').oninput=flt;document.getElementById('vs').onchange=flt;hideBtn();
  }else{
    var rr=window.REGULAR.map(function(r){var w=r[0],pa;
      if(/e$/.test(w))pa=w+'d';else if(/[^aeiou]y$/.test(w))pa=w.slice(0,-1)+'ied';else if(/^(stop|plan|prefer)$/.test(w))pa=w+w.slice(-1)+'ed';else if(w==='travel')pa='travelled';else pa=w+'ed';
      return '<tr><td><b>'+esc(w)+'</b></td><td>'+esc(pa)+'</td><td>'+esc(pa)+'</td><td class="az">'+esc(r[1])+'</td></tr>';}).join('');
    h(head+'<h2>Düzgün fellər: qayda</h2><div class="card"><ul class="rule" style="margin:0;padding-left:20px"><li>Past simple və past participle üçün felə <b>-ed</b> əlavə olunur: work → worked → worked.</li><li>-e ilə bitirsə yalnız <b>-d</b>: live → lived; love → loved.</li><li>Samit + y ilə bitirsə y → i + ed: study → studied; try → tried. (Sait + y dəyişmir: play → played.)</li><li>Qısa sözlərdə (samit-sait-samit) son samit ikiləşir: stop → stopped; plan → planned. İki hecalıda vurğu sonuncudadırsa: prefer → preferred.</li><li>Britaniyada -l ilə bitən feldə l ikiləşir: travel → travelled.</li></ul></div>'+
     '<h2>-ed necə oxunur</h2><div class="card"><table><thead><tr><th>Səs</th><th>Nə vaxt</th><th>Nümunə</th></tr></thead><tbody><tr><td><b>/t/</b></td><td>kar samitdən sonra (p, k, f, s, sh, ch)</td><td>worked, helped, washed, watched</td></tr><tr><td><b>/d/</b></td><td>cingiltili samit və saitdən sonra</td><td>played, called, opened, cleaned</td></tr><tr><td><b>/ɪd/</b></td><td>t və d ilə bitən fellərdən sonra</td><td>wanted, needed, started, decided</td></tr></tbody></table></div>'+
     '<div class="row" style="margin:14px 0"><input class="search" id="vf" placeholder="Axtar…"><button class="btn sm" id="vh">Tərcüməni gizlət</button></div>'+
     '<table class="vt" id="vt"><thead><tr><th>Infinitive</th><th>Past simple</th><th>Past participle</th><th>Azərbaycanca</th></tr></thead><tbody>'+rr+'</tbody></table>');
    document.getElementById('vf').oninput=function(){var q=this.value.toLowerCase();document.querySelectorAll('#vt tbody tr').forEach(function(tr){tr.style.display=tr.textContent.toLowerCase().indexOf(q)>-1?'':'none';});};
    hideBtn();
  }
}

/* ---------- istifadə qaydası ---------- */
function help(){
  var steps=[['1','Dərsi aç','Kurslar → kurs seç → vahid seç. “dərs” işarəsi olanlar tam hazırdır.'],
   ['2','Azərbaycanca oxu','Lead və hər bölmənin AZ izahını oxu. İngiliscə də lazımdırsa yuxarıdakı AZ+EN və ya EN düyməsini bas.'],
   ['3','Sxemə bax','Cədvəl formanı göstərir: nə vaxt hansı quruluş işlənir.'],
   ['4','Nümunələri oxu','Hər nümunənin tərcüməsi altında yazılıb. Ucadan oxu.'],
   ['5','“Dərindən öyrən”','İstisnalar və təfərrüatlar üçün düyməni bas. Hələ ehtiyac yoxdursa keç.'],
   ['6','Tipik səhvlərə bax','Cədvəl imtahanda ən çox düşülən səhvləri göstərir.'],
   ['7','Məşqləri et','Boşluqlara yaz, “Yoxla” bas. Test suallarında variantı seç. Səhv olanda düzgün cavab və izah çıxır.'],
   ['8','“Öyrəndim ✓”','Aşağıdakı düyməni bas. Vahid yaşıl olur və İrəliləyişdə sayılır.']];
  var plan=[['1–2-ci həftə','Qrammatika 1–37 (zamanlar, modallar)','Gündə 2 dərs + məşqlər. Hər 6 dərsdən sonra Qrammatika bölməsində mini test.'],
   ['3–4-cü həftə','Qrammatika 38–68 (şərt, passiv, dolayı nitq, -ing/to)','Gündə 2 dərs. Dolayı nitq və şərt cümlələri imtahan Part 4 üçün vacibdir.'],
   ['5–6-cı həftə','Qrammatika 69–145 + Vocabulary 1–50','Gündə 1 qrammatika + 1 lüğət dərsi. Lüğətdə “tərcüməni gizlət”dən istifadə et.'],
   ['7-ci həftə','Vocabulary 51–101 + Söz yaradılması','Hər gün Söz yaradılması cədvəlindən 10 kök yoxla (Part 3).'],
   ['8-ci həftə','İmtahan məşqi + təkrar','İmtahan bölməsində 2 testi həll et. Kurslar → B2 hazırlıq kursu-də Review və Progress Test bölmələrində qarışıq test yarat.']];
  h('<h1>Layihə haqqında</h1><p class="sub">Bu nədir və necə istifadə etməli.</p>'+
   '<div class="card"><h3 style="margin-top:0">Layihə nədir?</h3><p>İngilis dilini sıfırdan B2 səviyyəsinə qədər öyrənmək və <b>Cambridge B2 First</b> imtahanına hazırlaşmaq üçün sayt. Dörd kursun mövzuları Azərbaycanca izah olunur, hər dərsdə sxem, nümunə, tipik səhvlər və yoxlanan məşqlər var.</p><ul style="margin:0;padding-left:20px"><li><b>Qrammatika:</b> 145 vahid (əsas kurs) + 53 bölmə (B2 hazırlıq kursu)</li><li><b>Lüğət:</b> 101 ümumi + 66 biznes vahidi</li><li><b>Köməkçi:</b> fellər cədvəli, kartlar, söz yaradılması, imtahan strategiyası</li><li><b>İrəliləyiş:</b> öyrəndiklərin brauzerdə saxlanır, internetsiz də işləyir</li></ul></div>'+
   '<div class="card" style="margin-top:14px"><h3 style="margin-top:0">Necə başlamalı? (3 addım)</h3><ol style="margin:0;padding-left:20px"><li><b>Öyrən</b> bölməsindən kurs və vahid seç (məsələn, Qrammatika 1).</li><li>Dərsi oxu, məşqləri et, sonda <b>Öyrəndim ✓</b> bas.</li><li>Hər gün 1–2 dərs et, həftədə bir <b>İmtahan</b> bölməsində test həll et.</li></ol></div>'+
   '<h2>Saytın hissələri</h2><div class="grid">'+
   '<a class="card" href="#/books"><div class="k">Əsas</div><h3>Kurslar</h3><p style="margin:0;color:var(--mut)">Dörd kursun bütün dərsləri. Ən çox burada işləyəcəksən.</p></a>'+
   '<a class="card" href="#/learn"><div class="k">Sürətli</div><h3>Qrammatika</h3><p style="margin:0;color:var(--mut)">27 mövzunun qısa xülasəsi və mini testlər. Tez təkrar üçün.</p></a>'+
   '<a class="card" href="#/cards"><div class="k">Yadda saxla</div><h3>Kartlar</h3><p style="margin:0;color:var(--mut)">Kartı çevir, “Bildim” və ya “Təkrar” seç. Bilmədiklərin tez-tez qayıdır.</p></a>'+
   '<a class="card" href="#/wordform"><div class="k">Part 3</div><h3>Söz yaradılması</h3><p style="margin:0;color:var(--mut)">Kök sözlər və törəmələri. Əvvəl özün yaz, sonra “göstər” bas.</p></a>'+
   (EXAM.length?'<a class="card" href="#/exam"><div class="k">Hədəf</div><h3>İmtahan</h3><p style="margin:0;color:var(--mut)">Nümunə testlərin Part 1–4 hissələri. Yoxla düyməsi izah göstərir.</p></a>':'')+
   '<a class="card" href="#/strategy"><div class="k">Taktika</div><h3>Strategiya</h3><p style="margin:0;color:var(--mut)">İmtahanın 7 hissəsi və vaxt bölgüsü.</p></a>'+
   '<a class="card" href="#/progress"><div class="k">Nəticə</div><h3>İrəliləyiş</h3><p style="margin:0;color:var(--mut)">Neçə vahid öyrənilib, test nəticələri.</p></a></div>'+
   '<h2>Bir dərsi necə öyrənmək</h2><div class="card"><ol style="margin:0;padding-left:20px">'+steps.map(function(x){return '<li style="margin:8px 0"><b>'+x[1]+'.</b> '+x[2]+'</li>';}).join('')+'</ol></div>'+
   '<h2>Lüğət dərsi necə işləyir</h2><div class="card"><ul class="rule" style="margin:0;padding-left:20px"><li>Cədvəldə söz, Azərbaycanca mənası və nümunə var.</li><li>“Tərcüməni gizlət” düyməsini bas: tərcümə bulanıq olur. Sözə baxıb mənanı de, sonra siçanı üzərinə gətir və yoxla.</li><li>Sonda 2 məşq var: boşluq doldurma və test.</li></ul></div>'+
   '<h2>Təkrar və qarışıq test</h2><div class="card"><ul class="rule" style="margin:0;padding-left:20px"><li>Kurslar → B2 hazırlıq kursu → “Review” və “Progress Test” bölmələrində <b>Test yarat</b> düyməsi var: 12 qarışıq sual verir, hər dəfə fərqli.</li><li>Kartlar bölməsində hər dəstədən gündə 10 dəqiqə işlə.</li></ul></div>'+
   '<h2>8 həftəlik plan (gündə ~45 dəqiqə)</h2><div class="card"><table><thead><tr><th>Müddət</th><th>Nə</th><th>Necə</th></tr></thead><tbody>'+plan.map(function(x){return '<tr><td><b>'+x[0]+'</b></td><td>'+x[1]+'</td><td>'+x[2]+'</td></tr>';}).join('')+'</tbody></table></div>'+
   '<h2>Vacib qeydlər</h2><div class="card"><ul class="rule" style="margin:0;padding-left:20px"><li>İrəliləyiş yalnız bu brauzerdə saxlanılır. Başqa brauzer və ya cihazda sıfırdan başlayır.</li><li>Brauzerin saytın məlumatlarını silməsi irəliləyişi də silir.</li><li>Məşqdə cavab ingiliscə qısaltma ilə də qəbul olunur (məsələn isn’t və is not).</li><li>Səhv cavab verəndə düzgün cavab göstərilir, ona görə təkrar edib yadda saxla.</li><li>Telefonda da işləyir; yuxarıdakı menyu aşağı sətirə keçir.</li></ul></div>');
}

/* ---------- B2 hazırlıq kursu: istinadlar və qarışıq testlər ---------- */
function loadLesson(bk,n,cb){
  var b=bookById(bk),st=lstore(b);
  if(st[n])return cb(st[n]);
  var s=document.createElement('script');s.src='data/'+bk+'/u'+pad(n)+'.js';
  s.onload=function(){cb(st[n]);};s.onerror=function(){cb(null);};document.head.appendChild(s);
}
function destLesson(b,n){
  var D=window.DESTB2[n],u=b.units[n-1];if(!D){location.hash='#/books/'+b.id;return;}
  var ids=window.LESSON_IDS.destb2,ix=ids.indexOf(n);
  var done=P.done[b.id+':'+n];
  var links=D.refs.map(function(r){var bk=bookById(r[0]),t=bk.units[r[1]-1].t;return '<a class="unit" href="#/lesson/'+r[0]+'/'+r[1]+'"><b>'+r[1]+'</b><span class="t">'+esc(t)+'</span><span class="pill">'+esc(bk.title.split(' ')[0])+'</span></a>';}).join('');
  var quiz=(D.k==='r'||D.k==='t')?'<h2>Qarışıq test</h2><div id="mix" class="card"><button class="btn pri" id="mk">Test yarat (12 sual)</button></div>':'';
  var irr=D.irregular?'<h2>Düzgün olmayan fellər</h2><input class="search" id="fi" placeholder="Axtar…"><table class="vt" id="it"><thead><tr><th>Infinitive</th><th>Past simple</th><th>Past participle</th><th>Azərbaycanca</th></tr></thead><tbody>'+window.IRREGULAR.map(function(r){return '<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td>'+r[2]+'</td><td class="az">'+r[3]+'</td></tr>';}).join('')+'</tbody></table>':'';
  h('<div class="crumbs"><a href="#/books">Kurslar</a> › <a href="#/books/'+b.id+'">'+esc(b.title)+'</a></div><h1>'+esc(u.t)+'</h1><div class="card lead">'+esc(D.note)+'</div>'+(links?'<h2>Dərslər</h2><div class="units">'+links+'</div>':'')+irr+quiz+
    '<div class="sticky"><div class="row">'+(ix>0?'<a class="btn" href="#/lesson/'+b.id+'/'+ids[ix-1]+'">← '+ids[ix-1]+'</a>':'')+'</div><button class="btn '+(done?'':'pri')+'" id="dn">'+(done?'✓ Öyrənildi (geri al)':'Öyrəndim ✓')+'</button><div class="row">'+(ix<ids.length-1?'<a class="btn" href="#/lesson/'+b.id+'/'+ids[ix+1]+'">'+ids[ix+1]+' →</a>':'')+'</div></div>');
  app.style.setProperty('--h',hueOf(n));
  var dn=document.getElementById('dn');dn.onclick=function(){var k=b.id+':'+n;if(P.done[k])delete P.done[k];else P.done[k]=1;save();var on=!!P.done[k];dn.textContent=on?'✓ Öyrənildi (geri al)':'Öyrəndim ✓';dn.classList.toggle('pri',!on);};
  var fi=document.getElementById('fi');if(fi)fi.oninput=function(){var q=this.value.toLowerCase();document.querySelectorAll('#it tbody tr').forEach(function(tr){tr.style.display=tr.textContent.toLowerCase().indexOf(q)>-1?'':'none';});};
  var mk=document.getElementById('mk');if(mk)mk.onclick=function(){buildMix(D.refs);};
}
function buildMix(refs){
  var box=document.getElementById('mix');box.innerHTML='<span class="sub">Yüklənir…</span>';
  var pool=[],left=refs.length;
  if(!left){box.innerHTML='Sual yoxdur.';return;}
  refs.forEach(function(r){loadLesson(r[0],r[1],function(L){if(L)L.exercises.forEach(function(ex){if(ex.type==='mcq')ex.items.forEach(function(it){if(it.q.replace(/_/g,'').trim().length>3)pool.push(it);});});if(--left===0)show();});});
  function show(){
    for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=pool[i];pool[i]=pool[j];pool[j]=t;}
    var items=pool.slice(0,12),sc=0,an=0;
    box.innerHTML=items.map(function(it,k){return '<div class="it" data-k="'+k+'" style="margin:10px 0">'+(k+1)+'. '+esc(it.q)+'<div class="opts">'+it.o.map(function(o,j){return '<button class="opt" data-k="'+k+'" data-j="'+j+'">'+esc(o)+'</button>';}).join('')+'</div></div>';}).join('')+'<div class="row"><span class="score" id="ms"></span><button class="btn" id="mn">Yeni test</button></div>';
    box.onclick=function(e){var bt=e.target.closest('.opt');if(!bt)return;var k=+bt.dataset.k,el=box.querySelector('.it[data-k="'+k+'"]');if(el.dataset.d)return;el.dataset.d=1;var ok=+bt.dataset.j===items[k].a;bt.classList.add(ok?'ok':'bad');if(!ok)el.querySelectorAll('.opt')[items[k].a].classList.add('ok');if(ok)sc++;an++;document.getElementById('ms').textContent=sc+' / '+items.length;};
    document.getElementById('mn').onclick=function(){buildMix(refs);};
  }
}

(function(){
  var PAL=[['cream','#f1ac4b'],['sea','#3b9be8'],['rose','#f2709c'],['forest','#6fb64b'],['sunset','#f2603c'],['lavender','#8b6cf0'],['night','#1f242e'],['mocha','#3a2c24']];
  var AZF=[['Nunito','Nunito'],['Manrope','Manrope'],['Montserrat','Montserrat'],['Merriweather','Merriweather'],['Lora','Lora'],['DM Sans','DM Sans']];
  var ENF=[['Lora','Lora (serif)'],['Merriweather','Merriweather'],['Playfair Display','Playfair Display'],['Cormorant Garamond','Cormorant'],['Nunito','Nunito'],['Montserrat','Montserrat'],['Georgia','Georgia']];
  var SZ=[['0.9','A−'],['1','A'],['1.12','A+'],['1.25','A++']];
  var S={};try{S=JSON.parse(localStorage.getItem('look')||'{}');}catch(e){}
  var root=document.documentElement,pal=document.getElementById('pal'),m=document.getElementById('palmenu');
  function put(){try{localStorage.setItem('look',JSON.stringify(S));}catch(e){}}
  function apply(){
    if(S.pal&&S.pal!=='cream')root.dataset.pal=S.pal;else delete root.dataset.pal;
    root.style.setProperty('--fs',S.fs||'1');
    root.style.setProperty('--font-az',"'"+(S.az||'Nunito')+"',system-ui,sans-serif");
    root.style.setProperty('--font-en',"'"+(S.en||'Lora')+"',Georgia,serif");
  }
  apply();
  if(pal){
    function opts(L,c){return L.map(function(x){return '<option value="'+x[0]+'"'+(c===x[0]?' selected':'')+'>'+x[1]+'</option>';}).join('');}
    function draw(){var c=S.pal||'cream';
      m.innerHTML='<div><label>Rəng</label><div class="row2">'+PAL.map(function(x){return '<i data-p="'+x[0]+'" class="'+(c===x[0]?'on':'')+'" style="background:'+x[1]+'"></i>';}).join('')+'</div></div>'+
       '<div><label>Hərf ölçüsü</label><div class="sz">'+SZ.map(function(x){return '<button data-s="'+x[0]+'" class="'+((S.fs||'1')===x[0]?'on':'')+'">'+x[1]+'</button>';}).join('')+'</div></div>'+
       '<div><label>Şrift (Azərbaycanca)</label><select id="fAz">'+opts(AZF,S.az||'Nunito')+'</select></div>'+
       '<div><label>Şrift (İngiliscə)</label><select id="fEn">'+opts(ENF,S.en||'Lora')+'</select></div>';}
    draw();
    pal.firstElementChild.onclick=function(e){e.stopPropagation();pal.classList.toggle('open');};
    m.onclick=function(e){e.stopPropagation();var d=e.target.dataset||{};if(d.p){S.pal=d.p;}else if(d.s){S.fs=d.s;}else return;put();apply();draw();};
    m.onchange=function(e){if(e.target.id==='fAz')S.az=e.target.value;else if(e.target.id==='fEn')S.en=e.target.value;else return;put();apply();};
    document.addEventListener('click',function(){pal.classList.remove('open');});
  }
  /* hərəkətli fon: mövzuya uyğun sözlər */
  var DEF=['A','B','C','Ə','ş','ç','ğ','ABC','Aa','the','is','are','to','-ing','-ed','?','!','"…"','✎','✓','will','have','done','a / an','Past','Q&A','B2','1','2','3'];
  var TOP=[
   [/present continuous|continuous/,['am','is','are','-ing','now','right now','at the moment','Look!','Listen!','temporary']],
   [/present simple|simple present/,['do','does','-s','always','usually','often','never','every day','habit']],
   [/past continuous/,['was','were','-ing','while','when','at 8 o\'clock','yesterday']],
   [/past simple|past tense/,['did','-ed','went','yesterday','ago','last week','V2','was','were']],
   [/for and since|how long/,['for','since','how long','ages','two hours','2010','a week','years','months']],
   [/present perfect/,['have','has','V3','already','just','yet','ever','never','for','since']],
   [/past perfect/,['had','V3','before','after','by the time','already']],
   [/future|will|going to/,['will','won\'t','going to','tomorrow','soon','next week','maybe','probably']],
   [/modal|can|could|must|should|may|might|have to/,['can','could','must','should','may','might','have to','need to','ought to','+ V1']],
   [/passive/,['be + V3','is done','was made','by','been','being','passive']],
   [/conditional|if |wish/,['if','would','unless','when','were','wish','I\'d','then']],
   [/reported|indirect/,['said','told','asked','that','had','then','the next day']],
   [/relative|who|which|that/,['who','which','that','whose','where','whom','relative']],
   [/article|a\/an|\bthe\b/,['a','an','the','—','one','some','any']],
   [/compar|superlative|than/,['-er','-est','more','most','than','as…as','the best','better','worse']],
   [/preposition|in on at|\bat\b/,['in','on','at','to','for','from','with','by','about','under','between']],
   [/gerund|infinitive|-ing|\bto\b/,['-ing','to + V','enjoy','want','decide','avoid','stop','remember','try']],
   [/question|auxiliary/,['do','does','did','Wh-','What?','Where?','When?','Why?','Who?','How?']],
   [/plural|countable|uncountable|some|any|much|many/,['some','any','much','many','a lot of','few','little','-s','-es']],
   [/pronoun|possessive|reflexive/,['I','you','he','she','it','we','they','my','your','myself','mine']],
   [/phrasal/,['give up','look for','turn on','take off','get on','put off','come back','run out of']],
   [/word formation|prefix|suffix/,['un-','dis-','-tion','-ment','-ness','-ful','-less','-able','-ly']],
   [/business|office|meeting|finance/,['deal','profit','budget','invoice','sales','client','market','contract','deadline']]
  ];
  var bg=document.createElement('div');bg.className='bgsym';bg.setAttribute('aria-hidden','true');
  document.body.insertBefore(bg,document.body.firstChild);
  var curKey='';
  function build(list){
    bg.innerHTML='';var n=window.innerWidth<720?16:30;
    for(var k=0;k<n;k++){var s=document.createElement('span');s.textContent=list[k%list.length];
      s.style.left=(Math.random()*92)+'%';s.style.fontSize=(20+Math.random()*40)+'px';
      s.style.animationDuration=(22+Math.random()*30)+'s';s.style.animationDelay=(-Math.random()*40)+'s';
      s.style.setProperty('--o',(0.12+Math.random()*0.14).toFixed(2));s.style.setProperty('--dx',(Math.random()*160-80)+'px');
      s.style.setProperty('--r0',(Math.random()*40-20)+'deg');s.style.setProperty('--r1',(Math.random()*80-40)+'deg');s.style.setProperty('--t',(Math.random()*90)+'vh');
      bg.appendChild(s);}
  }
  function topicWords(){
    var app=document.getElementById('app'),h1=app.querySelector('h1');if(!h1||!app.querySelector('.crumbs'))return DEF;
    var t=h1.textContent.toLowerCase(),out=[];
    TOP.forEach(function(r){if(r[0].test(t))out=out.concat(r[1]);});
    var vt=app.querySelectorAll('.vt td:first-child');
    if(vt.length&&!out.length){Array.prototype.forEach.call(vt,function(td,i){if(i<14)out.push(td.textContent.trim());});}
    if(!out.length){var seen={},stop=/^(the|a|an|is|are|was|were|and|but|for|you|your|his|her|its|our|their|this|that|with|from|have|has|had|not|its)$/;
      Array.prototype.forEach.call(app.querySelectorAll('.enf,.scheme td'),function(el,i){if(i>40)return;(el.textContent.match(/[A-Za-z]{3,9}/g)||[]).forEach(function(w){w=w.toLowerCase();if(!seen[w]&&!stop.test(w)&&out.length<18){seen[w]=1;out.push(w);}});});}
    var tt=h1.textContent.replace(/^\d+\.\s*/,'').replace(/\(.*\)/,'').trim();
    return out.length?out:DEF;
  }
  var tmr=null;
  function refresh(){var w=topicWords(),key=w.join('|');if(key===curKey)return;curKey=key;build(w);}
  build(DEF);curKey=DEF.join('|');
  new MutationObserver(function(){clearTimeout(tmr);tmr=setTimeout(refresh,250);}).observe(document.getElementById('app'),{childList:true});
  /* hər yerdə 🔊: lüğət cədvəlləri, nümunə cümlələr, sxem, fel cədvəli, kartlar */
  function mk(txt){var b=document.createElement('button');b.type='button';b.className='spk-b sm';b.setAttribute('aria-label','Dinlə');b.textContent='🔊';b.dataset.say=txt;return b;}
  function clean(s){return String(s||'').replace(/\s+/g,' ').replace(/[🔊★]/g,'').trim();}
  function addTo(el,txt,before){txt=clean(txt);if(!el||el.dataset.spk||!txt)return;el.dataset.spk='1';var b=mk(txt);if(before){el.insertBefore(b,el.firstChild);}else{el.appendChild(b);}}
  function enhance(){
    var A=document.getElementById('app');if(!A)return;
    Array.prototype.forEach.call(A.querySelectorAll('.vt tbody tr'),function(tr){
      var td=tr.children;if(tr.dataset.spk)return;tr.dataset.spk='1';
      if(tr.classList.contains('vp')){addTo(td[0],td[0].textContent+'. '+td[1].textContent.split(' / ')[0]+'. '+td[2].textContent.split(' / ')[0],true);return;}
      if(td[0]){var w=clean(td[0].textContent);if(w){var b=mk(w.split(' / ').join('. '));td[0].insertBefore(b,td[0].firstChild);}}
      if(td[2]&&clean(td[2].textContent)){td[2].appendChild(mk(td[2].textContent));}
    });
    Array.prototype.forEach.call(A.querySelectorAll('.exl li'),function(li){var e=li.querySelector('.enf');if(e&&!li.dataset.spk){li.dataset.spk='1';li.insertBefore(mk(e.textContent),li.firstChild);}});
    Array.prototype.forEach.call(A.querySelectorAll('.scheme tbody tr'),function(tr){var t=tr.children[2];if(t&&!t.dataset.spk){t.dataset.spk='1';t.appendChild(mk(t.textContent.replace(/·/g,'. ')));}});
    var fl=A.querySelector('#fl');if(fl&&!fl.dataset.spk&&fl.firstChild){fl.dataset.spk='1';var bt=mk(fl.firstChild.textContent);bt.style.cssText='display:block;margin:10px auto 0';fl.appendChild(bt);}
  }
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.spk-b[data-say]');if(!b)return;e.preventDefault();e.stopPropagation();speakEn([b.dataset.say],b);},true);
  new MutationObserver(function(){enhance();}).observe(document.getElementById('app'),{childList:true,subtree:true});
  enhance();

})();
route();
})();
