(function(){
 var M=function(a){return a.map(function(n){return ['murphy',n];});};
 var V=function(a){return a.map(function(n){return ['vocab',n];});};
 var B=function(a){return a.map(function(n){return ['bizvocab',n];});};
 var rg=function(a){var r=[];for(var i=a[0];i<=a[1];i++)r.push(i);return r;};
 var g={
  1:{k:'g',refs:M([1,2,3,4,7,8,9,10]),note:'Present simple, continuous, perfect və hal felləri.'},
  4:{k:'g',refs:M([5,6,13,14,15,16,18,61]),note:'Past simple, continuous, perfect, used to, would.'},
  7:{k:'g',refs:M(rg([19,25])),note:'Gələcək zaman formaları və when/if sonrası present.'},
  10:{k:'g',refs:M([69,70,71,72,73,87,88,91]),note:'Artikl, sayılan/sayılmayan isimlər, miqdar sözləri.'},
  13:{k:'g',refs:M([38,39,40,114,115]),note:'Şərt cümlələri, unless, in case, as long as.'},
  16:{k:'g',refs:M([102,103,105,106,107,108]),note:'Müqayisə, so/such, enough/too.'},
  19:{k:'g',refs:M(rg([26,37])),note:'Modal fellər: bacarıq, icazə, məsləhət, ehtimal, məcburiyyət.'},
  23:{k:'g',refs:M([42,43,44,46]),note:'Passiv və have something done.'},
  26:{k:'g',refs:M(rg([53,60])),note:'-ing forması və infinitiv.'},
  29:{k:'g',refs:M(rg([49,52])),note:'Suallar, question tags, dolayı suallar.'},
  32:{k:'g',refs:M([47,48]),note:'Dolayı nitq.'},
  35:{k:'g',refs:M(rg([92,97])),note:'Nisbi budaq cümlələr və participle ifadələr.'},
  38:{k:'g',refs:M([39,40,41,113]),note:'Qeyri-real keçmiş, wish, əksliyin ifadəsi.'},
  41:{k:'g',refs:M([81,83]),note:'Sahiblik. İnversiya (Not only … did …, Never have I …, Rarely does …): inkar mənalı zərf cümlənin əvvəlinə keçəndə köməkçi fel subyektdən əvvəl gəlir: “Never have I seen such a film.”, “Not only did she win, but she also broke the record.”'}
 };
 var v={
  2:V([31,32]),5:V([18,21,19]),8:V([33,34,35]),11:V([37,36,35]),14:V([10,38,13]),17:V([39]),20:V([28,29,30]),
  24:V([22]),27:V([14,15]),30:V([6,24]),33:V([40]),36:V([19,20,21]),39:V([27,41]),42:V([16,17]).concat(B([1,3,5]))
 };
 var D={};
 Object.keys(g).forEach(function(n){D[n]=g[n];});
 Object.keys(v).forEach(function(n){D[n]={k:'v',refs:v[n],note:'Bu mövzunun lüğəti aşağıdakı dərslərdə verilib.'};});
 var rv={3:[1,2],6:[4,5],9:[7,8],12:[10,11],15:[13,14],18:[16,17],21:[19,20],25:[23,24],28:[26,27],31:[29,30],34:[32,33],37:[35,36],40:[38,39],43:[41,42]};
 Object.keys(rv).forEach(function(n){var r=[];rv[n].forEach(function(x){r=r.concat(D[x].refs);});D[n]={k:'r',refs:r,note:'Təkrar: yuxarıdakı iki bölmənin dərslərindən qarışıq test.'};});
 var all=[];Object.keys(D).forEach(function(n){if(D[n].k==='g'||D[n].k==='v')all=all.concat(D[n].refs);});
 var half1=[],half2=[];Object.keys(D).forEach(function(n){n=+n;if(D[n].k==='g'||D[n].k==='v')(n<=21?half1:half2).push.apply(n<=21?half1:half2,D[n].refs);});
 D[22]={k:'t',refs:half1,note:'Progress Test 1: 1–14 vahidlərin qarışıq testi.'};
 D[44]={k:'t',refs:half2,note:'Progress Test 2: 15–28 vahidlərin qarışıq testi.'};
 D[45]={k:'x',refs:M([53,54,56,57,58,62]),note:'Düzgün olmayan fellər: ən çox işlənənlər aşağıdakı cədvəldədir. Fel modelləri üçün dərslərə bax.',irregular:true};
 D[46]={k:'x',refs:V([1,2,3,4]),note:'Lüğət öyrənmə üsulları və lüğətdən istifadə.'};
 D[47]={k:'x',refs:M(rg([137,145])).concat(V(rg([89,94]))),note:'Phrasal verb-lər və fel + ön söz ifadələri.'};
 D[48]={k:'x',refs:V([89,91,94,98,79]),note:'Sabit ifadələr və birləşmələr.'};
 D[49]={k:'x',refs:V(rg([70,73])).concat(M([62,129,130,131])),note:'Söz yaradılması və ön söz modelləri.'};
 D[50]={k:'x',refs:V([101]),note:'Amerika və Britaniya ingiliscəsi.'};
 D[51]={k:'t',refs:all,note:'Revision tests 1–7: bütün mövzulardan qarışıq test.'};
 D[52]={k:'k',refs:[],note:'Cavab açarı ayrıca saxlanmır: hər məşqdə cavab yoxlanılır və düzgün cavab göstərilir.'};
 D[53]={k:'k',refs:[],note:'Hər dərsin məşqlərində cavablar “Yoxla” düyməsi ilə yoxlanılır.'};
 window.DESTB2=D;
 window.IRREGULAR=[
  ['be','was/were','been','olmaq'],['become','became','become','olmaq (halına gəlmək)'],['begin','began','begun','başlamaq'],['break','broke','broken','sındırmaq'],
  ['bring','brought','brought','gətirmək'],['build','built','built','tikmək'],['buy','bought','bought','almaq'],['catch','caught','caught','tutmaq'],
  ['choose','chose','chosen','seçmək'],['come','came','come','gəlmək'],['cost','cost','cost','başa gəlmək'],['cut','cut','cut','kəsmək'],
  ['do','did','done','etmək'],['drink','drank','drunk','içmək'],['drive','drove','driven','sürmək'],['eat','ate','eaten','yemək'],
  ['fall','fell','fallen','düşmək'],['feel','felt','felt','hiss etmək'],['find','found','found','tapmaq'],['fly','flew','flown','uçmaq'],
  ['forget','forgot','forgotten','unutmaq'],['get','got','got','almaq, olmaq'],['give','gave','given','vermək'],['go','went','gone/been','getmək'],
  ['grow','grew','grown','böyümək'],['have','had','had','sahib olmaq'],['hear','heard','heard','eşitmək'],['hide','hid','hidden','gizlənmək'],
  ['hold','held','held','tutmaq'],['keep','kept','kept','saxlamaq'],['know','knew','known','bilmək'],['leave','left','left','tərk etmək'],
  ['lend','lent','lent','borc vermək'],['let','let','let','icazə vermək'],['lose','lost','lost','itirmək'],['make','made','made','etmək, hazırlamaq'],
  ['mean','meant','meant','demək istəmək'],['meet','met','met','görüşmək'],['pay','paid','paid','ödəmək'],['put','put','put','qoymaq'],
  ['read','read','read','oxumaq'],['ride','rode','ridden','minmək'],['ring','rang','rung','zəng çalmaq'],['rise','rose','risen','qalxmaq'],
  ['run','ran','run','qaçmaq'],['say','said','said','demək'],['see','saw','seen','görmək'],['sell','sold','sold','satmaq'],
  ['send','sent','sent','göndərmək'],['set','set','set','qurmaq'],['shut','shut','shut','bağlamaq'],['sing','sang','sung','oxumaq (mahnı)'],
  ['sit','sat','sat','oturmaq'],['sleep','slept','slept','yatmaq'],['speak','spoke','spoken','danışmaq'],['spend','spent','spent','xərcləmək'],
  ['stand','stood','stood','dayanmaq'],['steal','stole','stolen','oğurlamaq'],['swim','swam','swum','üzmək'],['take','took','taken','götürmək'],
  ['teach','taught','taught','öyrətmək'],['tell','told','told','demək, danışmaq'],['think','thought','thought','düşünmək'],['throw','threw','thrown','atmaq'],
  ['understand','understood','understood','başa düşmək'],['wake','woke','woken','oyanmaq'],['wear','wore','worn','geyinmək'],['win','won','won','qazanmaq'],['write','wrote','written','yazmaq']
 ];
})();
