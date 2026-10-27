window.GRAMMAR = [
{u:'1, 3, 4', t:'Present continuous və Present simple', rule:[
 'Present continuous = am/is/are + V-ing: indi baş verən, müvəqqəti və dəyişən vəziyyətlər. I’m working today. / Prices are rising.',
 'Present simple: vərdiş, daimi hal, ümumi həqiqət. She works in a bank. / Water boils at 100°C.',
 'Hal bildirən fellər (know, understand, like, want, need, believe, seem, belong, prefer) adətən continuous işlənmir: I understand (NOT I’m understanding).',
 'have = sahib olmaq (simple) / have = “etmək” (lunch, a shower, a good time) continuous ola bilər.'],
 q:[
 ['Please be quiet. The baby ___.',['sleeps','is sleeping','sleep','has slept'],1,'İndi baş verir → present continuous.'],
 ['She ___ coffee. She hates it.',['doesn’t drink','isn’t drinking','don’t drink','not drinks'],0,'Ümumi vərdiş → present simple, 3-cü şəxs: doesn’t.'],
 ['I ___ what you mean.',['am understanding','understand','understanding','have understand'],1,'understand – hal feli, continuous olmur.'],
 ['Why ___ you ___ at me like that?',['do / look','are / looking','did / look','have / looked'],1,'İndi baxır → are you looking.'],
 ['The sun ___ in the east.',['is rising','rise','rises','has risen'],2,'Təbii həqiqət → present simple (rises).']]},
{u:'5, 6', t:'Past simple və Past continuous', rule:[
 'Past simple (V2): bitmiş keçmiş hərəkət. I lived in Baku in 2019.',
 'Past continuous (was/were + V-ing): keçmişdə müəyyən anda davam edən hərəkət. At 8 pm I was cooking.',
 'Uzun hərəkət (continuous) + qısa hərəkət (simple): I was cooking when the phone rang.',
 'while + continuous, when + simple: While I was waiting, I read a book.'],
 q:[
 ['When I arrived, they ___ dinner.',['had','were having','have','are having'],1,'Gəlişim zamanı davam edirdi → were having.'],
 ['She was reading when the phone ___.',['rang','was ringing','rings','had rung'],0,'Qısa, kəsən hərəkət → past simple.'],
 ['I ___ my finger while I was cooking dinner.',['cut','was cutting','cutting','have cut'],0,'Qısa, kəsən hərəkət → past simple (cut); uzun fon hərəkəti → was cooking.'],
 ['I ___ in Baku in 2019.',['was living','lived','live','have lived'],1,'Bitmiş dövr + dəqiq il → past simple.'],
 ['What ___ you ___ at 9 o’clock last night?',['did / do','were / doing','have / done','are / doing'],1,'Müəyyən anda davam edən hərəkət → were you doing.']]},
{u:'7, 8', t:'Present perfect', rule:[
 'have/has + V3. İndiyə qədər təsir edən keçmiş hadisə: I’ve lost my key (indi də yoxdur).',
 'Təcrübə: Have you ever been to China? · I have never eaten sushi.',
 'just (indicə), already (artıq), yet (hələ – sual/inkar): I’ve just had lunch. / Has it stopped raining yet?',
 'gone to = ora gedib (orada və ya yoldadır); been to = gedib qayıdıb.'],
 q:[
 ['Have you ___ been to Paris?',['ever','yet','already','since'],0,'Təcrübə sualı: Have you ever …?'],
 ['James isn’t here. He’s ___ to Italy.',['been','gone','went','go'],1,'gone to = hələ orada/yolda.'],
 ['I ___ my homework yet.',['didn’t finish','haven’t finished','don’t finish','hadn’t finished'],1,'yet + inkar → present perfect.'],
 ['‘Are you hungry?’ ‘No, I ___ lunch.’',['just had','’ve just had','am just having','just have'],1,'just + present perfect: I’ve just had.'],
 ['Elnur has ___ out. He’ll be back soon.',['just gone','been','went','going'],0,'just gone out – indicə çıxıb.']]},
{u:'9, 10', t:'Present perfect continuous və simple', rule:[
 'have/has been + V-ing: davam edən və ya yenicə bitmiş hərəkət (nəticəsi görünür). Her eyes are red. She’s been crying.',
 'Sual How long …? → continuous: How long have you been learning English?',
 'Say/miqdar (how many, three times) → simple: I’ve read this book three times.',
 'Tamamlanmış nəticə → simple: Elnur has written ten emails.'],
 q:[
 ['Her eyes are red. She ___.',['has cried','has been crying','is crying','cried'],1,'Yeni bitmiş proses, nəticəsi görünür.'],
 ['How long ___ you ___ English?',['have / learned','have / been learning','did / learn','are / learning'],1,'How long + davam edən proses.'],
 ['I ___ this book three times.',['have been reading','have read','am reading','was reading'],1,'Say göstərilir → present perfect simple.'],
 ['Elnur ___ ten emails this morning.',['has been writing','has written','is writing','wrote'],1,'Tamamlanmış say: has written.']]},
{u:'11, 12', t:'for və since', rule:[
 'for + müddət: for ten years, for two hours.',
 'since + başlanğıc nöqtəsi: since 2015, since Monday, since I was a child.',
 'How long ilə: I’ve lived here for 5 years / since 2020.'],
 q:[
 ['I’ve lived here ___ 2015.',['for','since','from','during'],1,'Başlanğıc nöqtəsi (il) → since.'],
 ['They’ve been married ___ five years.',['since','for','from','during'],1,'Müddət → for.'],
 ['She hasn’t called ___ Monday.',['for','since','in','at'],1,'Başlanğıc nöqtəsi → since.']]},
{u:'13, 14', t:'Present perfect vs Past simple', rule:[
 'Bitmiş, dəqiq vaxt göstərilirsə → past simple: yesterday, last week, in 2010, ago, when …?',
 'Vaxt göstərilmirsə və indiyə əlaqə varsa → present perfect.',
 'Present perfect ilə dəqiq keçmiş vaxt işlənmir: I saw him yesterday (NOT I’ve seen him yesterday).'],
 q:[
 ['I ___ him yesterday.',['have seen','saw','have been seeing','see'],1,'yesterday → past simple.'],
 ['We ___ to Spain last summer.',['have been','went','have gone','go'],1,'last summer → past simple.'],
 ['I ___ my wallet. Can you help me find it?',['lost','have lost','was losing','had lost'],1,'İndi də tapılmayıb – indiki nəticə: have lost.'],
 ['When ___ you ___ this book?',['have / bought','did / buy','do / buy','are / buying'],1,'When …? → past simple.']]},
{u:'15, 16', t:'Past perfect', rule:[
 'had + V3: keçmişdə başqa bir keçmiş hadisədən əvvəl olmuş hərəkət.',
 'When I arrived, the film had already started. (əvvəl film başlayıb, sonra mən gəlmişəm)',
 'had been + V-ing: o ana qədər davam edən proses: She was tired because she had been working all day.'],
 q:[
 ['When I arrived, the film ___ already ___.',['has / started','had / started','was / starting','did / start'],1,'Daha əvvəl baş vermiş hadisə → past perfect.'],
 ['She was tired because she ___ all day.',['worked','had been working','has worked','was working'],1,'Yorğunluğun səbəbi – əvvəlki davam edən proses.'],
 ['I had never ___ sushi before I went to Japan.',['eat','ate','eaten','eating'],2,'had never + V3 (eaten).']]},
{u:'18, 61', t:'used to və be/get used to', rule:[
 'used to + V: keçmiş vərdiş/hal (indi yoxdur). I used to smoke.',
 'Sual/inkar: Did you use to…? / I didn’t use to…',
 'be/get used to + V-ing (isim): alışmış olmaq / alışmaq. I’m used to getting up early. She’s getting used to living in a big city.'],
 q:[
 ['I ___ smoke, but I gave up.',['am used to','used to','use to','was used to'],1,'Keçmiş vərdiş → used to + V.'],
 ['I’m not used to ___ up early.',['get','getting','got','gets'],1,'be used to + V-ing.'],
 ['Did you ___ play football when you were a child?',['used to','use to','be used to','using to'],1,'Did … use to (did-dan sonra “d” düşür).']]},
{u:'19, 20, 23', t:'Gələcək zaman: present continuous, going to, will', rule:[
 'Present continuous: razılaşdırılmış plan. I’m seeing the dentist at 5 tomorrow.',
 'be going to: niyyət və ya gözə görünən əlamətə əsasən proqnoz. Look at those clouds! It’s going to rain.',
 'will: ani qərar, təklif, fikir/proqnoz (I think …). “The phone’s ringing.” “I’ll get it.”',
 'Əvvəlcədən qərar verilib → going to: I’ve decided: I’m going to buy a car.'],
 q:[
 ['Look at those clouds! It ___ rain.',['will','is going to','is raining','rains'],1,'Gözə görünən əlamət → going to.'],
 ['‘The phone’s ringing.’ ‘I ___ get it.’',['will','am going to','am getting','get'],0,'Ani qərar → will.'],
 ['We ___ to the cinema tonight – I’ve booked the tickets.',['will go','are going','go','will be going'],1,'Hazırlanmış plan → present continuous / going to.'],
 ['I think it ___ rain tomorrow.',['is raining','will','is going','rains'],1,'I think + proqnoz → will.']]},
{u:'24, 25', t:'will be doing, will have done; when/if sonrası zaman', rule:[
 'will be doing: gələcəkdə müəyyən anda davam edən hərəkət. This time tomorrow I’ll be lying on a beach.',
 'will have done: gələcəkdə müəyyən vaxta qədər tamamlanmış. By 2030 I’ll have finished my degree.',
 'when, if, before, after, as soon as, until, unless + PRESENT (gələcək mənada): I’ll call you when I arrive (NOT when I’ll arrive).'],
 q:[
 ['This time tomorrow I ___ on a beach.',['will lie','will be lying','will have lain','lie'],1,'Gələcəkdə müəyyən anda davam edən hərəkət.'],
 ['By the time you arrive, we ___ dinner.',['will finish','will have finished','are finishing','finish'],1,'By the time … → will have + V3.'],
 ['I’ll call you when I ___.',['will arrive','arrive','arrived','am going to arrive'],1,'when-dən sonra present simple.'],
 ['If it ___ tomorrow, we’ll stay home.',['will rain','rains','rained','is going to rain'],1,'if + present simple.']]},
{u:'26, 27', t:'can, could, be able to', rule:[
 'can/could: bacarıq. I could swim when I was five. (ümumi keçmiş qabiliyyət)',
 'Konkret bir dəfəlik uğur: was/were able to və ya managed to (could yox): The fire spread but everyone was able to escape.',
 'could have + V3: keçmişdə imkan var idi, amma etmədi. You could have told me!'],
 q:[
 ['I ___ swim when I was five.',['can','could','am able to','will be able to'],1,'Keçmiş ümumi bacarıq → could.'],
 ['The fire spread quickly, but everyone ___ escape.',['could','was able to','can','is able to'],1,'Konkret hadisə → was able to.'],
 ['You ___ have told me! (You didn’t, and I was upset.)',['can','could','must','would'],1,'could have + V3 – imkan var idi, etmədi.']]},
{u:'28, 29, 30', t:'must, can’t, may, might (ehtimal/çıxarış)', rule:[
 'must be = əminəm ki … (müsbət çıxarış). He must be at home – his car is outside.',
 'can’t be = mümkün deyil, əminəm ki … yox. She can’t be tired – she slept 10 hours.',
 'may/might be = ola bilər (30–50%). It might rain.',
 'Keçmiş: must have + V3, can’t have + V3, might have + V3. They must have missed the bus.'],
 q:[
 ['He ___ be at home; his car is outside.',['must','can’t','might not','shouldn’t'],0,'Əmin müsbət çıxarış → must.'],
 ['She ___ be tired – she has just slept ten hours.',['must','can’t','may','should'],1,'Mümkün deyil → can’t.'],
 ['They’re not here. They ___ have missed the bus.',['must','can’t','could be','would'],0,'Keçmiş çıxarış → must have + V3.'],
 ['I’m not sure, but it ___ rain later.',['must','can’t','might','has to'],2,'Qeyri-müəyyən ehtimal → might.']]},
{u:'31, 32', t:'have to, must, mustn’t, needn’t', rule:[
 'have to: qayda/xarici məcburiyyət; must: danışanın şəxsi qərarı. I have to wear a uniform (qayda).',
 'mustn’t = qadağan. You mustn’t park here.',
 'don’t have to / needn’t = lazım deyil (qadağa yox). You don’t have to come.',
 'Keçmiş: had to. Yesterday I had to get up early.'],
 q:[
 ['You ___ park here – it’s forbidden.',['don’t have to','mustn’t','needn’t','can’t to'],1,'Qadağa → mustn’t.'],
 ['You ___ come if you don’t want to.',['mustn’t','don’t have to','can’t','shouldn’t to'],1,'Məcburiyyət yoxdur → don’t have to.'],
 ['Yesterday I ___ get up very early.',['must','had to','have to','has to'],1,'Keçmiş məcburiyyət → had to.']]},
{u:'33–35', t:'should, had better, it’s time', rule:[
 'should + V: məsləhət. You should see a doctor.',
 'should have + V3: keçmişdə etməli idin, amma etmədin. You should have told me.',
 'had better + V (to yox): It’s cold – you’d better take your coat.',
 'It’s time + keçmiş zaman (hal-hazırı bildirir): It’s time we went home.'],
 q:[
 ['You look terrible. You ___ see a doctor.',['should','would to','have','must to'],0,'Məsləhət → should.'],
 ['You’d better ___ your coat. It’s cold.',['to take','taking','take','took'],2,'had better + V (to yox).'],
 ['It’s time we ___ home.',['go','went','going','will go'],1,'It’s time + past simple.'],
 ['You ___ told me earlier! Now it’s too late.',['should have','should','must','would'],0,'Keçmişə tənqid → should have + V3.']]},
{u:'38–41', t:'Şərt cümlələri və wish', rule:[
 '1-ci tip: If + present, will + V. If it rains, we will stay home.',
 '2-ci tip: If + past, would + V (indiki qeyri-real). If I were rich, I’d travel the world.',
 '3-cü tip: If + had V3, would have V3 (keçmiş qeyri-real). If I had studied, I would have passed.',
 'wish + past = indiki təəssüf (I wish I had more time). wish + had V3 = keçmişə təəssüf (I wish I hadn’t eaten so much).'],
 q:[
 ['If I ___ rich, I’d travel the world.',['am','was been','were','will be'],2,'2-ci tip: If I were …'],
 ['If it rains, we ___ at home.',['would stay','will stay','stay would','stayed'],1,'1-ci tip: will + V.'],
 ['If I had studied harder, I ___ the exam.',['would pass','will pass','would have passed','passed'],2,'3-cü tip: would have + V3.'],
 ['I wish I ___ more free time.',['have','had','would have','will have'],1,'Hal-hazıra təəssüf: wish + past simple.'],
 ['I wish I ___ so much last night.',['didn’t eat','hadn’t eaten','don’t eat','wouldn’t eat'],1,'Keçmişə təəssüf: wish + had V3.']]},
{u:'42–46', t:'Passive (məchul növ) və have something done', rule:[
 'Passive = be + V3. Present: is/are done; past: was/were done; future: will be done; present perfect: has been done; continuous: is being done.',
 'Əsas: hərəkətin icraçısı bilinmir və ya vacib deyil. The window was broken (by a boy).',
 'It is said that … / He is said to be … = deyilir ki …; he is supposed to …',
 'have something done: başqasına etdirmək. I had my hair cut. We’re having the house painted.'],
 q:[
 ['The window ___ by a boy yesterday.',['broke','was broken','is broken','has broken'],1,'Keçmiş passive: was broken.'],
 ['English ___ all over the world.',['speaks','is spoken','spoken','is speaking'],1,'Present passive.'],
 ['The house ___ at the moment.',['is painting','is being painted','paints','has painted'],1,'Present continuous passive: is being painted.'],
 ['I ___ my hair cut yesterday.',['cut','had','have','was'],1,'have something done (past): had my hair cut.'],
 ['The report ___ by Friday.',['will finish','will be finished','finished','is finishing'],1,'Future passive.']]},
{u:'47, 48', t:'Reported speech (dolayı nitq)', rule:[
 'Zaman bir pillə geri gedir: am → was, will → would, can → could, present perfect → past perfect.',
 'say (to) / tell somebody: He said he was tired. He told me he was tired.',
 'Dolayı sualda normal söz sırası, do/does yoxdur: She asked where I lived. / He asked if I was ready.',
 'now → then, today → that day, tomorrow → the next day, here → there.'],
 q:[
 ['‘I am tired,’ she said. → She said she ___ tired.',['is','was','will be','has been'],1,'am → was.'],
 ['‘I’ll call you tomorrow.’ → He said he ___ call me the next day.',['will','would','shall','can'],1,'will → would.'],
 ['‘Where do you live?’ → He asked me where I ___.',['do live','lived','did live','live'],1,'Dolayı sual: lived (do yoxdur).'],
 ['She ___ me that she was busy.',['said','told','spoke','asked'],1,'told + obyekt.']]},
{u:'49–52', t:'Suallar və question tags', rule:[
 'Dolayı sual: Do you know where the station is? (is stansiya – düz söz sırası)',
 'Question tag: müsbət cümlə → mənfi tag; mənfi → müsbət. She’s late, isn’t she? / You don’t smoke, do you?',
 'Köməkçi fel eyni qalır: You have finished, haven’t you? / They went, didn’t they?',
 'I think so / I hope so / I don’t think so.'],
 q:[
 ['Do you know where ___?',['is the station','the station is','does the station','the station does'],1,'Dolayı sualda düz sıra: the station is.'],
 ['She’s late, ___?',['is she','isn’t she','doesn’t she','wasn’t she'],1,'Müsbət cümlə → mənfi tag.'],
 ['You don’t smoke, ___?',['don’t you','do you','are you','did you'],1,'Mənfi cümlə → müsbət tag.'],
 ['They went home, ___?',['didn’t they','don’t they','weren’t they','haven’t they'],0,'went (past simple) → didn’t they.']]},
{u:'53–58', t:'Verb + -ing / to + V', rule:[
 '+ -ing: enjoy, avoid, suggest, finish, mind, keep, practise, risk, imagine, deny, consider, admit. I enjoy listening to music.',
 '+ to V: decide, want, hope, plan, manage, refuse, promise, agree, afford, learn, offer. She decided to go abroad.',
 'remember/forget/stop/try fərqli məna verir: I remember locking the door (etmişəm) / Remember to lock the door (unutma). He stopped smoking (tərk etdi) / He stopped to smoke (siqaret üçün dayandı).',
 'preposition + -ing: I’m looking forward to seeing you. She’s good at singing.'],
 q:[
 ['I enjoy ___ to music.',['to listen','listening','listen','listened'],1,'enjoy + -ing.'],
 ['She decided ___ abroad.',['going','to go','go','went'],1,'decide + to V.'],
 ['He avoided ___ the question.',['to answer','answering','answer','answered'],1,'avoid + -ing.'],
 ['I’m looking forward to ___ you.',['see','seeing','to see','saw'],1,'look forward to + -ing (to = prepozisiya).'],
 ['Remember ___ the door when you leave! (a reminder)',['locking','to lock','lock','locked'],1,'remember + to V = unutma, etməyi yadda saxla.'],
 ['She suggested ___ a taxi.',['to take','taking','take','took'],1,'suggest + -ing.']]},
{u:'69–72', t:'Artikllər və sayıla bilən/bilməyən isimlər', rule:[
 'a/an: ilk dəfə, bir (sayıla bilən təkdə). He’s an engineer. · the: artıq məlum, tək-tək (the sun).',
 'Sayılmayan isimlər cəm olmur: advice, information, news, luggage, furniture, money, weather, traffic. I need some advice. (NOT advices)',
 'much + sayılmayan, many + sayılan: How much money? / How many people?',
 'Ümumi mənada artiklsiz: I love music. Dogs are loyal.'],
 q:[
 ['I need some ___.',['advices','advice','an advice','advise'],1,'advice – sayılmayan.'],
 ['___ sun rises in the east.',['A','The','—','An'],1,'Unikal şey → the.'],
 ['He’s ___ engineer.',['a','an','the','—'],1,'Sait səslə başlayan söz → an.'],
 ['How ___ money do you have?',['many','much','few','a lot'],1,'money – sayılmayan → much.'],
 ['She gave me ___ useful information.',['a','some','an','many'],1,'information sayılmayan → some.']]},
{u:'92–97', t:'Relative clauses (nisbi budaq cümlələr)', rule:[
 'who/that – şəxs; which/that – əşya; whose – mənsubiyyət; where – yer.',
 'Təyin edici (vacib məlumat) – vergülsüz, that ola bilər: The man who lives next door is a doctor.',
 'Əlavə məlumat – vergüllə, that işlənmir: My brother, who lives in Canada, is a teacher.',
 'Obyekt əvəzliyi buraxıla bilər: The book (that) I read was boring.'],
 q:[
 ['The man ___ lives next door is a doctor.',['which','who','whose','where'],1,'Şəxs, subyekt → who/that.'],
 ['That’s the girl ___ father is a pilot.',['who','which','whose','that'],2,'Mənsubiyyət → whose.'],
 ['My brother, ___ lives in Canada, is a teacher.',['that','who','which','whose'],1,'Vergüllü əlavə məlumat – that olmaz, şəxs → who.'],
 ['That is the place ___ we first met.',['which','where','who','whose'],1,'Yer → where.']]},
{u:'98, 99', t:'-ing və -ed sifətlər', rule:[
 '-ing sifət: şeyi/təsiri təsvir edir. The film was boring.',
 '-ed sifət: hissi/halı təsvir edir. I was bored.',
 'interesting / interested, exciting / excited, tiring / tired, surprising / surprised, shocking / shocked.'],
 q:[
 ['The film was ___.',['bored','boring','bore','boredom'],1,'Şeyi təsvir edir → boring.'],
 ['I’m ___ in history.',['interesting','interested','interest','interests'],1,'Hissi təsvir edir → interested.'],
 ['She was ___ by the news.',['shocking','shocked','shock','shocks'],1,'Hissi təsvir edir → shocked.']]},
{u:'105–108', t:'Comparative və superlative', rule:[
 'Qısa sifət: taller than, the tallest. Uzun sifət: more expensive than, the most expensive.',
 'as … as = bərabərlik; not as … as = daha az. He’s not as tall as me.',
 'Düzgün olmayan: good–better–best, bad–worse–worst, far–further–furthest.',
 'The + comparative, the + comparative: The more you practise, the better you get.'],
 q:[
 ['She’s ___ than her sister.',['tall','taller','more tall','the tallest'],1,'Qısa sifət → taller.'],
 ['This is ___ expensive hotel in town.',['more','the most','most','the more'],1,'Superlative: the most expensive.'],
 ['He’s not as ___ as me.',['taller','tall','the tallest','more tall'],1,'as + sifət + as.'],
 ['The ___ you practise, the better you get.',['more','most','much','many'],0,'The more …, the better …']]},
{u:'113–115, 119', t:'although, in spite of, in case, unless, during/for/while', rule:[
 'although/though/even though + cümlə; in spite of / despite + isim və ya -ing. Although it was raining, we went out. / In spite of the rain, …',
 'in case = ehtiyat üçün (indiki zaman): Take an umbrella in case it rains.',
 'unless = if … not; as long as / provided = yalnız əgər.',
 'during + isim (during the film); for + müddət (for two hours); while + cümlə (while I was waiting).'],
 q:[
 ['___ it was raining, we went out.',['Despite','Although','In spite','During'],1,'Cümlə gəlir → although.'],
 ['She went to work ___ she was ill.',['despite','in spite','even though','however'],2,'Cümlə gəlir → even though.'],
 ['Take an umbrella ___ it rains.',['if','in case','unless','during'],1,'in case = ehtiyat üçün.'],
 ['I won’t go ___ you come with me.',['if','unless','in case','while'],1,'unless = if … not.'],
 ['I fell asleep ___ the film.',['while','during','for','since'],1,'during + isim.']]},
{u:'121–128', t:'Zaman və yer prepozisiyaları', rule:[
 'at: dəqiq vaxt (at 5 o’clock, at night, at the weekend); on: gün/tarix (on Monday, on 5 May); in: ay, il, fəsil, günün hissəsi (in July, in 2020, in the morning).',
 'at the bus stop (nöqtə), in a room/city (daxil), on the wall/floor (səth).',
 'in a taxi / car; on a bus / train / plane.',
 'in time = vaxtında çatmaq (gec qalmadan), on time = cədvələ uyğun; at the end of = sonunda, in the end = nəhayət.'],
 q:[
 ['The meeting starts ___ 5 o’clock.',['in','on','at','by'],2,'Dəqiq saat → at.'],
 ['My birthday is ___ 12 May.',['in','at','on','by'],2,'Tarix → on.'],
 ['We met ___ July.',['at','on','in','by'],2,'Ay → in.'],
 ['I go to work ___ bus.',['on','in','by','with'],2,'Nəqliyyat vasitəsi ilə → by bus.'],
 ['I’ll wait for you ___ the bus stop.',['in','at','on','to'],1,'Nöqtə → at.']]},
{u:'129–136', t:'Prepozisiya birləşmələri', rule:[
 'Sifət + prepozisiya: afraid of, good at, interested in, keen on, responsible for, similar to, different from/to, proud of, worried about.',
 'Fel + prepozisiya: depend on, listen to, look for, wait for, apologise for, accuse somebody of, insist on, rely on, suffer from, succeed in.',
 'İsim + prepozisiya: reason for, cause of, increase in, need for, difference between.'],
 q:[
 ['She is afraid ___ spiders.',['from','of','for','at'],1,'afraid of.'],
 ['It depends ___ the weather.',['of','on','from','to'],1,'depend on.'],
 ['I’m not very good ___ maths.',['in','at','on','for'],1,'good at.'],
 ['He accused me ___ stealing his phone.',['for','of','about','with'],1,'accuse somebody of.'],
 ['We’re looking forward ___ the holidays.',['for','to','at','on'],1,'look forward to.']]},
{u:'137–145', t:'Phrasal verbs', rule:[
 'give up = əl çəkmək · look after = baxmaq · put off = təxirə salmaq · turn down = rədd etmək · carry on = davam etmək',
 'run out of = qurtarmaq · come up with = (fikir) tapmaq · get on with = yola getmək/davam etmək · take off = havaya qalxmaq / çıxarmaq · set up = qurmaq',
 'Ayrılan: put the meeting off / put off the meeting; əvəzlik hər zaman ortada: put it off.',
 'Ayrılmayan: look after (the children), run out of (money).'],
 q:[
 ['He decided to ___ smoking for his health.',['give up','give in','give out','give off'],0,'give up = əl çəkmək.'],
 ['We’ve ___ of milk. Can you buy some?',['run out','run off','run up','run away'],0,'run out of = qurtarmaq.'],
 ['She ___ with a brilliant idea.',['came up','came across','came out','came off'],0,'come up with = (fikir) tapmaq.'],
 ['They had to ___ the meeting because of the storm.',['put off','put out','put in','put on'],0,'put off = təxirə salmaq.'],
 ['Who ___ the children while you are at work?',['looks after','looks up','looks out','looks for'],0,'look after = baxmaq.']]}
];

window.WORDFORM = [
 ['concentrate','concentration','isim'],['succeed','success / successful / successfully','isim, sifət, zərf'],['effect','effective / effectively','sifət, zərf'],['solve','solution(s)','isim'],
 ['patient','patience','isim'],['care','careful / carefully / careless','sifət, zərf'],['punish','punishment','isim'],['advantage','disadvantage','mənfi prefiks'],
 ['product','producer / production / productive','isim, sifət'],['ill','illness','isim'],['science','scientist / scientific','isim, sifət'],['add','addition / additional','isim, sifət'],['press','pressure','isim'],['spice','spicy','sifət'],
 ['happy','unhappy / happiness / happily','prefiks, isim, zərf'],['employ','employer / employee / employment / unemployed','isim, sifət'],['possible','impossible / possibility','prefiks, isim'],['responsible','irresponsible / responsibility','prefiks, isim'],
 ['decide','decision / decisive','isim, sifət'],['create','creation / creative / creativity / creator','isim, sifət'],['differ','difference / different / differently','isim, sifət, zərf'],['argue','argument / argumentative','isim, sifət'],
 ['active','activity / inactive / actively','isim, prefiks'],['fame','famous / infamous','sifət'],['danger','dangerous / endanger','sifət, fel'],['health','healthy / unhealthy / healthily','sifət, zərf'],
 ['choose','choice / chosen','isim'],['believe','belief / believable / unbelievable','isim, sifət'],['compete','competition / competitor / competitive','isim, sifət'],['inform','information / informative / informal','isim, sifət'],
 ['educate','education / educational / educated','isim, sifət'],['music','musician / musical','isim, sifət'],['friend','friendship / friendly / unfriendly','isim, sifət'],['know','knowledge / knowledgeable','isim, sifət'],
 ['organise','organisation / organiser / disorganised','isim, sifət'],['popular','popularity / unpopular','isim, prefiks'],['strong','strength / strengthen','isim, fel'],['long','length / lengthen','isim, fel']
];
