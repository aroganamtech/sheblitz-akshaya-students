    /**
     * SexEdModules.jsx — Single Page Edition
     *
     * Everything lives on ONE scrollable webpage:
     *  § 1  Hero header + age chip + overall progress
     *  § 2  6 Education Modules (expandable topics, age-gate, progress)
     *  § 3  Legal Protection Rules (Rape Laws, POCSO, Child Abuse, Global)
     *  § 4  Good Touch / Bad Touch — animated step-by-step AI video lesson
     *  § 5  Content Guard — live reel simulator with auto-skip
     *  § 6  Parent Alert — email setup + live alert log
     */

    import { useState, useEffect, useCallback, useRef } from 'react';
    import {
      Box, Typography, Grid, Card, CardContent, LinearProgress,
      Chip, Collapse, Button, Fade, alpha, useTheme, TextField,
      Stepper, Step, StepLabel, Alert,
    } from '@mui/material';
    import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
    import LockIcon               from '@mui/icons-material/Lock';
    import ArrowBackIcon          from '@mui/icons-material/ArrowBack';
    import ShieldIcon             from '@mui/icons-material/Shield';
    import GavelIcon              from '@mui/icons-material/Gavel';
    import PlayCircleIcon         from '@mui/icons-material/PlayCircle';
    import EmailIcon              from '@mui/icons-material/Email';
    import ChildCareIcon          from '@mui/icons-material/ChildCare';
    import BlockIcon              from '@mui/icons-material/Block';
    import CheckCircleIcon        from '@mui/icons-material/CheckCircle';
    import WarningAmberIcon       from '@mui/icons-material/WarningAmber';
    import SendIcon               from '@mui/icons-material/Send';
    import ExpandMoreIcon         from '@mui/icons-material/ExpandMore';
    import ExpandLessIcon         from '@mui/icons-material/ExpandLess';

    // ═══════════════════════════════════════════════════
    //  KEYFRAMES (injected once)
    // ═══════════════════════════════════════════════════
    const injectStyles = () => {
      if (document.getElementById('sexed-styles')) return;
      const s = document.createElement('style');
      s.id = 'sexed-styles';
      s.textContent = `
        @keyframes se-up    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes se-pop   { 0%{transform:scale(0.6);opacity:0} 65%{transform:scale(1.07)} 100%{transform:scale(1);opacity:1} }
        @keyframes se-shake { 0%,100%{transform:translateX(0)} 25%,75%{transform:translateX(-8px)} 50%{transform:translateX(8px)} }
        @keyframes se-blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes se-glow  { 0%,100%{box-shadow:0 0 0 0 rgba(78,205,196,0.5)} 50%{box-shadow:0 0 0 16px rgba(78,205,196,0)} }
        @keyframes se-spin  { to{transform:rotate(360deg)} }
        @keyframes se-toast { from{opacity:0;transform:translateX(100px)} to{opacity:1;transform:translateX(0)} }
        @keyframes se-wiggle{ 0%,100%{transform:rotate(0)} 25%{transform:rotate(-13deg)} 75%{transform:rotate(13deg)} }
        @keyframes se-slide { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        .se-card:hover { transform:translateY(-5px) !important; box-shadow:0 14px 40px rgba(0,0,0,0.12) !important; }
        .se-card { transition:transform 0.24s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.24s ease !important; }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }
        input[type=number] { -moz-appearance:textfield; }
      `;
      document.head.appendChild(s);
    };

    // ═══════════════════════════════════════════════════
    //  DATA
    // ═══════════════════════════════════════════════════
    const MODULES = [
      { id:1, icon:'🫀', color:'#FF6B9D', bg:'#FFF0F6', title:'The Human Body',          subtitle:'Biology & Development',       desc:'Understand how your body works — from anatomy to life cycles.',          minAge:10, topics:[
        { title:'Sexual Anatomy',            icon:'🔬', minAge:10, content:'Clear, non-shameful information about internal and external reproductive organs. Knowing your body is the foundation of all health literacy.' },
        { title:'Puberty & Life Cycles',     icon:'🌱', minAge:10, content:'Hormonal changes, physical growth, and emotional shifts during teen years — and later transitions like menopause and andropause.' },
        { title:'Menstruation',              icon:'📅', minAge:10, content:'Tracking cycles, managing periods effectively, and identifying health issues like PCOS, endometriosis, and irregular bleeding.' },
        { title:'Reproduction & Fertility',  icon:'🧬', minAge:13, content:'How pregnancy happens, how to track ovulation, what affects fertility, and the basics of assisted reproduction technologies.' },
        { title:'Hormones & Health',         icon:'⚗️', minAge:13, content:'Estrogen, testosterone, and other hormones — how they shape mood, energy, body composition, and long-term physical health.' },
        { title:'Prenatal Care & Pregnancy', icon:'🤱', minAge:16, content:'Stages of fetal development, nutrition and care during pregnancy, and what to expect through each trimester.' },
      ]},
      { id:2, icon:'🛡️', color:'#4ECDC4', bg:'#F0FFFE', title:'Sexual Health & Safety',  subtitle:'Protection & Medical Well-being', desc:'Tools and knowledge to protect your physical health.',                  minAge:12, topics:[
        { title:'Contraception',             icon:'💊', minAge:16, content:'The pill, IUDs, implants, condoms, patches, and emergency contraception — effectiveness, side effects, and how to choose the right method.' },
        { title:'STIs & HIV/AIDS',           icon:'🔴', minAge:14, content:'Prevention, testing, and treatment of sexually transmitted infections. STI testing is routine self-care, not something to be ashamed of.' },
        { title:'Sexual Healthcare',         icon:'🏥', minAge:13, content:'When to see a gynecologist or urologist, how to perform self-exams, and what regular screenings like Pap smears involve.' },
        { title:'Safe Digital Habits',       icon:'📱', minAge:12, content:'Navigating privacy and safety on dating apps, social media, and messaging. Understanding digital consent and protecting personal data.' },
        { title:'Substance Use & Sex',       icon:'⚠️', minAge:16, content:'How alcohol and drugs affect decision-making, consent, and sexual health. Recognizing coercion and staying safe.' },
        { title:'Sexual Pain & Dysfunction', icon:'💬', minAge:18, content:'Conditions like vaginismus, erectile dysfunction, and low libido — medical issues with real solutions, not causes for shame.' },
      ]},
      { id:3, icon:'💚', color:'#7B61FF', bg:'#F5F0FF', title:'Relationships & Emotions', subtitle:'Mind, Heart & Connection',     desc:'Sexuality is as much about the mind and heart as the body.',           minAge:11, topics:[
        { title:'Consent',                          icon:'✅', minAge:11, content:'Consent must be clear, enthusiastic, ongoing, and freely given. It can be withdrawn at any time. Respecting boundaries is non-negotiable.' },
        { title:'Healthy vs. Toxic Relationships',  icon:'🚦', minAge:11, content:'Green flags: respect, trust, equality. Red flags: control, jealousy, manipulation, and abuse. Learning to spot the difference early.' },
        { title:'Communication Skills',             icon:'🗣️', minAge:12, content:'How to talk to a partner about your needs, limits, and protection. Scripts for difficult conversations and active listening.' },
        { title:'Self-Esteem & Body Image',         icon:'🌟', minAge:10, content:"Building a positive relationship with your body amid unrealistic media standards. Recognizing social media's impact on self-perception." },
        { title:'Breakups & Heartbreak',            icon:'💔', minAge:12, content:'Processing grief after a relationship ends, recognizing unhealthy coping, and rebuilding confidence and identity.' },
        { title:'Online Relationships',             icon:'🌐', minAge:14, content:'Navigating connections formed digitally — setting boundaries, maintaining trust, and identifying red flags.' },
      ]},
      { id:4, icon:'🌍', color:'#F7B731', bg:'#FFFBF0', title:'Values, Rights & Culture', subtitle:'How We Fit into the World',    desc:'Understand your rights and the social context of sexuality.',          minAge:11, topics:[
        { title:'Sexual Rights',                    icon:'⚖️',  minAge:11, content:'You have the right to bodily autonomy, to be free from violence, and to make informed choices without coercion.' },
        { title:'Gender Identity & Equality',       icon:'🏳️‍🌈', minAge:11, content:'The difference between biological sex, gender identity, and expression. Challenging stereotypes and understanding the spectrum.' },
        { title:'Sexual Orientation & LGBTQ+',     icon:'🌈',  minAge:11, content:'Respecting diverse orientations — gay, lesbian, bisexual, asexual, pansexual. History, culture, and equal rights.' },
        { title:'Media Literacy',                   icon:'🎬',  minAge:12, content:'Distinguishing real life from how sex and bodies are portrayed in media. Critical thinking about unrealistic standards.' },
        { title:'Cultural & Religious Perspectives',icon:'🕌',  minAge:12, content:'How different cultures and religions approach sexuality. Respecting diversity while upholding universal human rights.' },
        { title:'Sexual Violence & Trauma',         icon:'🆘',  minAge:13, content:'Understanding sexual assault, coercion, and harassment. Resources for survivors and trauma-informed approaches to healing.' },
      ]},
      { id:5, icon:'✨', color:'#FF8C42', bg:'#FFF8F3', title:'Sexual Wellness & Pleasure',subtitle:'Positive Dimensions of Health', desc:'Sexual health includes well-being, not just avoiding harm.',           minAge:14, topics:[
        { title:'Sexual Response Cycle',    icon:'💫', minAge:16, content:'How the body responds to arousal: desire, excitement, plateau, orgasm, and resolution. Understanding these stages normalizes experiences.' },
        { title:'De-stigmatizing Pleasure', icon:'🌸', minAge:16, content:'Sexual health is not just about avoiding problems — personal satisfaction and well-being are legitimate, healthy goals.' },
        { title:'Common Myths Debunked',   icon:'🚫', minAge:14, content:'Tackling misinformation: virginity myths, size myths, normal body standards, and what genuinely healthy sexuality looks like.' },
        { title:'Self-Exploration',         icon:'🔍', minAge:16, content:'Normalizing self-exploration as a healthy, private part of sexuality. Addressing shame and understanding personal boundaries.' },
        { title:'Sexual Compatibility',     icon:'💞', minAge:18, content:'How partners communicate about desires, mismatched libidos, and navigate differences with respect and honesty.' },
        { title:'Aging & Sexuality',        icon:'🌅', minAge:16, content:'How sexuality evolves from young adulthood through later life. Addressing misconceptions and celebrating intimacy at every age.' },
      ]},
      { id:6, icon:'🧠', color:'#26C6DA', bg:'#F0FDFF', title:'Mental Health & Sexuality', subtitle:'Mind–Body Connection',         desc:'The psychological dimensions of sexual well-being.',                  minAge:14, topics:[
        { title:'Sexual Anxiety',              icon:'😰', minAge:14, content:'Performance anxiety, body shame, and fear of intimacy. How mental health shapes sexual experience — and where to find support.' },
        { title:'Trauma & Intimacy',           icon:'🤝', minAge:14, content:'How past trauma can affect relationships and intimacy. Healing through trauma-informed therapy and compassionate care.' },
        { title:'Pornography & Mental Health', icon:'💻', minAge:16, content:'How pornography shapes expectations and relationships. Recognizing compulsive patterns and building healthier habits.' },
        { title:'Compulsive Sexual Behavior',  icon:'🔄', minAge:18, content:'When sexual behavior causes distress. Distinguishing healthy sexuality from compulsive patterns that need professional support.' },
        { title:'Mindfulness & Intimacy',      icon:'🧘', minAge:14, content:'How mindfulness practices improve sexual well-being — reducing pressure and increasing presence, connection, and pleasure.' },
        { title:'Therapy & Support',           icon:'🛋️', minAge:14, content:'When and how to seek professional help: therapists, sex therapists, counselors, and trusted healthcare providers.' },
      ]},
    ];

    const LEGAL = [
      { cat:'Rape Laws (India)', icon:'⚖️', color:'#E53935', items:[
        { title:'IPC Section 375 & 376', desc:'Rape is non-consensual sexual intercourse. Punishment: 7 years to life imprisonment, or death in extreme cases.' },
        { title:'Criminal Law Amendment Act 2013', desc:'Post-Nirbhaya: expanded definition of rape, mandatory minimum 7-year sentence, fast-track courts, trial within 2 months.' },
        { title:'Gang Rape — Section 376D', desc:'Rape by two or more persons carries minimum 20 years rigorous imprisonment, extendable to life imprisonment.' },
        { title:'Acid Attack — Section 326A', desc:'Throws or administers acid: minimum 10 years, extendable to life. Victim entitled to free medical treatment.' },
      ]},
      { cat:'POCSO Act 2012', icon:'🧒', color:'#7B61FF', items:[
        { title:'Protection of Children from Sexual Offences', desc:'Protects all children under 18 from sexual abuse, harassment, and pornography. Gender-neutral — covers boys and girls equally.' },
        { title:'Penetrative Sexual Assault (Sec 4)', desc:'Minimum 10 years to life imprisonment. Aggravated cases (by authority figures, on children under 12) carry 20 years to life.' },
        { title:'Sexual Harassment of Children (Sec 11)', desc:'Showing pornography, stalking, or exposing genitals to a child — up to 3 years imprisonment + fine.' },
        { title:'Mandatory Reporting (Sec 19 & 21)', desc:'Anyone who knows of child abuse MUST report to police within 24 hours. Failure to report is itself a criminal offence.' },
        { title:'Child Pornography (Sec 13–15)', desc:'Using, storing, or distributing sexual images of children — up to 5 years imprisonment. Absolute zero tolerance.' },
      ]},
      { cat:'Child Abuse Rules', icon:'🛡️', color:'#4ECDC4', items:[
        { title:'What Counts as Child Abuse', desc:'Physical, emotional, sexual abuse and neglect are all criminal offences under IPC and POCSO. Children have a legal right to safety.' },
        { title:'How to Report', desc:'Call CHILDLINE 1098 (24/7, free). Call Women Helpline 181. File FIR at police station. Police CANNOT refuse to register the complaint.' },
        { title:'A Child Cannot Consent', desc:'By law, a child under 18 CANNOT consent to sexual activity. Any sexual contact with a minor is a crime regardless of what the child says.' },
        { title:'Online Child Abuse', desc:'Grooming online, sending explicit messages, video exploitation — all criminal under IT Act 2000 and POCSO Act 2012.' },
      ]},
      { cat:'Global Standards', icon:'🌍', color:'#F7B731', items:[
        { title:'UN Convention on Rights of the Child', desc:'Article 34 protects children from all sexual exploitation and abuse worldwide. Ratified by 196 countries.' },
        { title:'WHO Definition of Sexual Violence', desc:'Any sexual act or coercion against a person\'s will — including psychological coercion, not just physical force.' },
        { title:'Age of Consent', desc:'Varies globally (14–18 years). In India it is 18. Any sexual activity below the age of consent is statutory rape under law.' },
      ]},
    ];

    const TOUCH_STEPS = [
      { icon:'🤗', title:'What is a GOOD Touch?',   color:'#4ECDC4', safe:true,
        body:'A good touch makes you feel SAFE, HAPPY, and LOVED. Examples: a hug from mum or dad when you want it, a high-five from a friend, a doctor checking your ears during a check-up with your parent present.',
        examples:['🤗 Family hugs','✋ High-fives','🩺 Doctor visits','🤝 Handshakes'] },
      { icon:'🚫', title:'What is a BAD Touch?',    color:'#FF6B9D', safe:false,
        body:'A bad touch makes you feel SCARED, CONFUSED, or UNCOMFORTABLE. Your private parts are covered by your swimsuit. NOBODY should touch those parts — except a doctor with your parent present.',
        examples:['🚫 Private areas','😨 Painful touch','😣 Confusing touch','🙅 Unwanted touch'] },
      { icon:'💪', title:'What Should You DO?',      color:'#7B61FF', safe:true,
        body:'If anyone touches you in a bad way: SAY NO loudly! RUN AWAY if you can. TELL a trusted adult right away — mum, dad, teacher, or any adult you trust. YOU will NEVER be in trouble for telling.',
        examples:['🗣️ Shout NO!','🏃 Run away','📣 Tell an adult','✅ You are brave!'] },
      { icon:'🤫', title:'Secrets vs Surprises',    color:'#FF8C42', safe:false,
        body:'GOOD surprises (like birthday gifts) make everyone happy and get shared soon. BAD secrets make you feel scared or sad inside. If an adult tells you to keep a touch SECRET — that is always a warning sign. Tell someone you trust.',
        examples:['🎁 Surprise = OK','🤫 Secret touch = NOT OK','😟 Scared = Tell someone','💛 You are not alone'] },
      { icon:'📱', title:'Online Safety Too!',       color:'#26C6DA', safe:true,
        body:'Bad touch can happen online too! If someone asks for your photo, asks to meet you alone, or makes you feel uncomfortable — STOP, close the app, and tell a parent or teacher RIGHT AWAY.',
        examples:['📵 No private photos','🚫 No secret meetings','👨‍👩‍👧 Tell parents','🔒 Block & report'] },
    ];

    const DEMO_REELS = [
      { id:1, title:'🌸 Nature Walk Vlog',      thumb:'🌳', creator:'@nature_girl',  likes:'12K', safe:true  },
      { id:2, title:'🍳 Easy Breakfast Recipe', thumb:'🍳', creator:'@cooking_mom',  likes:'8.4K',safe:true  },
      { id:3, title:'⚠️ Adult Content',          thumb:'🔞', creator:'@restricted',  likes:'—',   safe:false },
      { id:4, title:'💃 Dance Challenge',        thumb:'🎵', creator:'@dance_kids',  likes:'34K', safe:true  },
      { id:5, title:'🚨 Explicit Video',         thumb:'🔞', creator:'@blocked',     likes:'—',   safe:false },
      { id:6, title:'📚 Study With Me',          thumb:'📖', creator:'@student_life',likes:'5.2K',safe:true  },
    ];

    // ═══════════════════════════════════════════════════
    //  TINY SHARED HELPERS
    // ═══════════════════════════════════════════════════
    function SectionTitle({ icon, badge, badgeColor='#7B61FF', title, sub }) {
      return (
        <Box sx={{ textAlign:'center', mb:5 }}>
          <Box sx={{ display:'inline-flex', alignItems:'center', gap:1.2, bgcolor:`${badgeColor}18`, border:`1px solid ${badgeColor}44`, borderRadius:99, px:2.5, py:0.9, mb:2 }}>
            <Typography sx={{ fontSize:'1.1rem' }}>{icon}</Typography>
            <Typography sx={{ color:badgeColor, fontWeight:700, fontSize:'0.8rem', letterSpacing:0.6, textTransform:'uppercase' }}>{badge}</Typography>
          </Box>
          <Typography variant="h4" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>{title}</Typography>
          {sub && <Typography color="text.secondary" sx={{ fontSize:'0.92rem', maxWidth:540, mx:'auto', lineHeight:1.7 }}>{sub}</Typography>}
        </Box>
      );
    }

    function AgeBadge({ userAge, minAge }) {
      const ok = userAge >= minAge;
      return (
        <Chip
          icon={ok ? <CheckCircleOutlineIcon sx={{ fontSize:14 }}/> : <LockIcon sx={{ fontSize:13 }}/>}
          label={`${minAge}+`} size="small"
          sx={{ height:22, fontSize:'0.72rem', fontWeight:700,
            bgcolor: ok ? alpha('#4ECDC4',0.13) : alpha('#f44336',0.13),
            color:   ok ? '#2bb5ac'            : '#e05555',
            border:  `1px solid ${ok ? alpha('#4ECDC4',0.38) : alpha('#f44336',0.38)}`,
            '& .MuiChip-icon':{ color:'inherit' } }}
        />
      );
    }

    function CountdownRing({ remaining, total=5, size=76, color='#f44336' }) {
      const r=size/2-5, circ=2*Math.PI*r;
      return (
        <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={5}/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
            strokeDasharray={circ} strokeDashoffset={circ-(circ*remaining/total)}
            strokeLinecap="round" style={{ transition:'stroke-dashoffset 1s linear' }}/>
        </svg>
      );
    }

    function Toast({ msg, type, onDone }) {
      useEffect(()=>{ const t=setTimeout(onDone,4000); return ()=>clearTimeout(t); },[onDone]);
      const cfg = { success:['#0d2b1e','#4ECDC4','✅'], warn:['#2b1c06','#F7B731','⚠️'], error:['#2b0606','#f44336','🚨'], info:['#0d1424','#7B61FF','ℹ️'] };
      const [bg,border,icn] = cfg[type]||cfg.info;
      return (
        <Box sx={{ position:'fixed', top:18, right:18, zIndex:2000, bgcolor:bg, border:`1.5px solid ${border}`, color:'#fff', borderRadius:3, p:'12px 18px', fontSize:'0.84rem', maxWidth:320, boxShadow:'0 10px 28px rgba(0,0,0,0.3)', animation:'se-toast 0.3s ease', display:'flex', alignItems:'center', gap:1.5 }}>
          <span style={{ fontSize:17, flexShrink:0 }}>{icn}</span><span>{msg}</span>
        </Box>
      );
    }

    // ═══════════════════════════════════════════════════
    //  AGE GATE  (full screen)
    // ═══════════════════════════════════════════════════
    function AgeGate({ onVerify, parentEmail, setParentEmail }) {
      const [dob,setDob]       = useState({day:'',month:'',year:''});
      const [err,setErr]       = useState('');
      const [shake,setShake]   = useState(false);
      const [loading,setLoading]=useState(false);
      const [step,setStep]     = useState(0); // 0=dob, 1=parent email

      useEffect(()=>{ injectStyles(); },[]);

      const calcAge = () => {
        const {day,month,year}=dob;
        if(!day||!month||!year||String(year).length<4) return null;
        const b=new Date(`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`);
        if(isNaN(b.getTime())) return null;
        const n=new Date(); let age=n.getFullYear()-b.getFullYear();
        if(n.getMonth()<b.getMonth()||(n.getMonth()===b.getMonth()&&n.getDate()<b.getDate())) age--;
        return (age>=5&&age<=115)?age:null;
      };

      const next = () => {
        const age=calcAge();
        if(!age){ setErr('Please enter a valid date of birth.'); setShake(true); setTimeout(()=>setShake(false),620); return; }
        if(age<18){ setStep(1); return; }
        setLoading(true); setTimeout(()=>onVerify(age),700);
      };

      const finish = () => {
        if(!parentEmail||!parentEmail.includes('@')){ setErr('Please enter a valid parent email.'); return; }
        const age=calcAge(); setLoading(true); setTimeout(()=>onVerify(age),700);
      };

      const setF=(k,v,mx)=>{ setErr(''); setDob(p=>({...p,[k]:v.slice(0,mx)})); };

      return (
        <Box sx={{ minHeight:'85vh', display:'flex', alignItems:'center', justifyContent:'center', px:2, background:'linear-gradient(145deg,#080515,#13092a,#071820)', position:'relative', overflow:'hidden' }}>
          {[['#FF6B9D','15%','20%'],['#4ECDC4','80%','75%'],['#7B61FF','55%','15%']].map(([c,x,y],i)=>(
            <Box key={i} sx={{ position:'absolute', width:280, height:280, borderRadius:'50%', background:`radial-gradient(circle,${c}16 0%,transparent 70%)`, left:x, top:y, transform:'translate(-50%,-50%)', pointerEvents:'none' }}/>
          ))}
          <Box sx={{ position:'relative', zIndex:1, bgcolor:'rgba(255,255,255,0.045)', backdropFilter:'blur(26px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:5, p:{xs:4,md:6}, maxWidth:430, width:'100%', textAlign:'center', animation:'se-up 0.5s ease' }}>
            <Box sx={{ width:68, height:68, background:'linear-gradient(135deg,#4ECDC4,#7B61FF)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', mx:'auto', mb:3, boxShadow:'0 0 0 10px rgba(78,205,196,0.12)' }}>🌿</Box>

            {step===0 ? (
              <>
                <Typography variant="h5" sx={{ color:'#fff', fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>Age Verification</Typography>
                <Typography sx={{ color:'rgba(255,255,255,0.5)', fontSize:'0.87rem', lineHeight:1.75, mb:3.5 }}>
                  This platform delivers age-appropriate sexual education.<br/>
                  <Box component="strong" sx={{ color:'rgba(255,255,255,0.78)' }}>Enter your date of birth to continue.</Box>
                </Typography>
                <Box sx={{ display:'grid', gridTemplateColumns:'1fr 1fr 1.5fr', gap:1.2, mb:err?0:2, animation:shake?'se-shake 0.6s ease':'none' }}>
                  {[{k:'day',ph:'DD',mx:2},{k:'month',ph:'MM',mx:2},{k:'year',ph:'YYYY',mx:4}].map(f=>(
                    <Box key={f.k}>
                      <Box component="input" type="number" placeholder={f.ph} value={dob[f.k]}
                        onChange={e=>setF(f.k,e.target.value,f.mx)} onKeyDown={e=>e.key==='Enter'&&next()}
                        sx={{ width:'100%', bgcolor:'rgba(255,255,255,0.08)', border:'1.5px solid rgba(255,255,255,0.14)', borderRadius:2, p:'14px 6px', color:'#fff', fontSize:'1.1rem', textAlign:'center', outline:'none', fontFamily:'inherit', transition:'border-color 0.2s', '&:focus':{borderColor:'rgba(78,205,196,0.6)'} }}/>
                      <Typography sx={{ color:'rgba(255,255,255,0.28)', fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:0.4, mt:0.4 }}>{f.ph}</Typography>
                    </Box>
                  ))}
                </Box>
                {err&&<Alert severity="error" sx={{ mb:2, mt:1.5, bgcolor:'rgba(211,47,47,0.15)', color:'#ff9090', border:'1px solid rgba(211,47,47,0.3)', fontSize:'0.8rem' }}>{err}</Alert>}
                <Button fullWidth variant="contained" onClick={next} disabled={loading}
                  sx={{ py:1.7, borderRadius:99, background:'linear-gradient(135deg,#4ECDC4,#26C6DA)', animation:loading?'none':'se-glow 2s infinite', textTransform:'none', fontFamily:'"Playfair Display",serif', fontSize:'1rem', fontWeight:700, boxShadow:'none','&:hover':{boxShadow:'none',opacity:0.9} }}>
                  {loading?'Verifying…':'Continue →'}
                </Button>
                <Box sx={{ mt:3, display:'flex', justifyContent:'center', gap:0.8, flexWrap:'wrap' }}>
                  {[['10+','Basic','#4ECDC4'],['13+','Most','#7B61FF'],['16+','Advanced','#FF8C42'],['18+','All','#FF6B9D']].map(([a,l,c])=>(
                    <Chip key={a} label={`${a} ${l}`} size="small" sx={{ bgcolor:`${c}18`, border:`1px solid ${c}44`, color:'rgba(255,255,255,0.6)', fontSize:'0.68rem' }}/>
                  ))}
                </Box>
              </>
            ) : (
              <>
                <Typography sx={{ fontSize:'2.2rem', mb:1 }}>📧</Typography>
                <Typography variant="h6" sx={{ color:'#fff', fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>Parent / Guardian Email</Typography>
                <Typography sx={{ color:'rgba(255,255,255,0.5)', fontSize:'0.85rem', lineHeight:1.75, mb:3 }}>
                  Since you are under 18, we'll notify your parent whenever age-restricted content is attempted.
                </Typography>
                <TextField fullWidth size="small" label="Parent's Email" type="email" value={parentEmail}
                  onChange={e=>{setErr('');setParentEmail(e.target.value);}}
                  sx={{ mb:2, '& .MuiInputBase-root':{bgcolor:'rgba(255,255,255,0.08)',color:'#fff',borderRadius:2}, '& .MuiInputLabel-root':{color:'rgba(255,255,255,0.45)'}, '& .MuiOutlinedInput-notchedOutline':{borderColor:'rgba(255,255,255,0.14)'} }}/>
                {err&&<Alert severity="error" sx={{ mb:2, bgcolor:'rgba(211,47,47,0.15)', color:'#ff9090', border:'1px solid rgba(211,47,47,0.3)', fontSize:'0.8rem' }}>{err}</Alert>}
                <Box sx={{ display:'flex', gap:1.5 }}>
                  <Button variant="outlined" onClick={()=>setStep(0)}
                    sx={{ flex:1, borderRadius:99, textTransform:'none', borderColor:'rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.7)' }}>← Back</Button>
                  <Button variant="contained" onClick={finish} disabled={loading}
                    sx={{ flex:2, py:1.5, borderRadius:99, background:'linear-gradient(135deg,#4ECDC4,#26C6DA)', textTransform:'none', fontWeight:700, boxShadow:'none' }}>
                    {loading?'Setting up…':'Save & Enter →'}
                  </Button>
                </Box>
                <Typography sx={{ color:'rgba(255,255,255,0.28)', fontSize:'0.7rem', mt:2 }}>Emails are only sent when restricted content is accessed.</Typography>
              </>
            )}
          </Box>
        </Box>
      );
    }

    // ═══════════════════════════════════════════════════
    //  BLOCKED OVERLAY
    // ═══════════════════════════════════════════════════
    function BlockedOverlay({ topic, userAge, parentEmail, onClose, onLog }) {
      const [count,setCount]=useState(5);
      const [sent,setSent]  =useState(false);
      useEffect(()=>{
        const t=setInterval(()=>setCount(c=>{ if(c<=1){clearInterval(t);onClose();return 0;} return c-1; }),1000);
        if(parentEmail) setTimeout(()=>{ setSent(true); onLog&&onLog(`Tried to access "${topic.title}" (age ${topic.minAge}+)`,'🔒'); },1200);
        return ()=>clearInterval(t);
      },[onClose,parentEmail,topic,onLog]);
      return (
        <Box sx={{ position:'fixed', inset:0, zIndex:1400, bgcolor:'rgba(0,0,0,0.93)', backdropFilter:'blur(14px)', display:'flex', alignItems:'center', justifyContent:'center', p:2 }}>
          <Box sx={{ position:'absolute', width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle,rgba(244,67,54,0.14) 0%,transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }}/>
          <Box sx={{ position:'relative', background:'linear-gradient(150deg,#1c0404,#2a0808)', border:'2px solid rgba(244,67,54,0.6)', borderRadius:5, p:{xs:4,md:5.5}, maxWidth:460, width:'100%', textAlign:'center', boxShadow:'0 0 80px rgba(244,67,54,0.22)', animation:'se-pop 0.45s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <Typography sx={{ fontSize:'4.2rem', mb:1.5, display:'block', animation:'se-wiggle 0.5s ease 0.6s 2' }}>🚫</Typography>
            <Chip label="ACCESS BLOCKED" sx={{ bgcolor:'#f44336', color:'#fff', fontWeight:800, letterSpacing:2, mb:2, fontSize:'0.7rem' }}/>
            <Typography variant="h6" sx={{ color:'#fff', fontFamily:'"Playfair Display",serif', mb:1 }}>"{topic.title}"</Typography>
            <Box sx={{ bgcolor:'rgba(244,67,54,0.12)', border:'1px solid rgba(244,67,54,0.28)', borderRadius:3, p:2.2, mb:2.5 }}>
              <Typography sx={{ color:'rgba(255,255,255,0.88)', fontSize:'0.87rem', lineHeight:1.85 }}>
                Restricted to ages <Box component="strong" sx={{ color:'#ffaa55' }}>{topic.minAge}+</Box>.{' '}
                Your verified age is <Box component="strong" sx={{ color:'#4ECDC4' }}>{userAge}</Box>.
              </Typography>
            </Box>
            {parentEmail&&(
              <Box sx={{ bgcolor:sent?alpha('#4ECDC4',0.12):alpha('#FFA500',0.1), border:`1px solid ${sent?alpha('#4ECDC4',0.35):alpha('#FFA500',0.3)}`, borderRadius:2.5, p:1.6, mb:2.5, display:'flex', alignItems:'center', gap:1.2 }}>
                <EmailIcon sx={{ color:sent?'#4ECDC4':'#FFA500', fontSize:18 }}/>
                <Typography sx={{ color:'rgba(255,255,255,0.8)', fontSize:'0.8rem', textAlign:'left' }}>
                  {sent?`✅ Parent notified at ${parentEmail}`:`⏳ Notifying ${parentEmail}…`}
                </Typography>
              </Box>
            )}
            <Box sx={{ position:'relative', width:76, height:76, mx:'auto', mb:1.5 }}>
              <CountdownRing remaining={count} total={5} size={76}/>
              <Box sx={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'1.5rem', fontWeight:800, fontFamily:'"Playfair Display",serif' }}>{count}</Box>
            </Box>
            <Typography sx={{ color:'rgba(255,255,255,0.38)', fontSize:'0.8rem', mb:2.5 }}>Closing in {count}s…</Typography>
            <Button variant="outlined" onClick={onClose}
              sx={{ borderRadius:99, borderColor:'rgba(255,255,255,0.22)', color:'rgba(255,255,255,0.7)', textTransform:'none','&:hover':{borderColor:'rgba(255,255,255,0.44)',bgcolor:'rgba(255,255,255,0.07)'} }}>
              ← Go Back
            </Button>
          </Box>
        </Box>
      );
    }

    // ═══════════════════════════════════════════════════
    //  MAIN PAGE
    // ═══════════════════════════════════════════════════
    export default function SexEdModules({ onBack }) {
      const theme = useTheme();
      useEffect(()=>{ injectStyles(); },[]);

      // ── state ──
      const [userAge,      setUserAge]     = useState(null);
      const [parentEmail,  setParentEmail] = useState('');
      const [activeModule, setActiveModule]= useState(null);  // which module card is open
      const [activeTopic,  setActiveTopic] = useState(null);
      const [completed,    setCompleted]   = useState({});
      const [blocked,      setBlocked]     = useState(null);
      const [toast,        setToast]       = useState(null);
      const [alerts,       setAlerts]      = useState([]);
      // legal accordion
      const [legalOpen, setLegalOpen]      = useState(null);
      // touch lesson
      const [touchStep,  setTouchStep]     = useState(0);
      const [touchPlay,  setTouchPlay]     = useState(false);
      const [touchDone,  setTouchDone]     = useState(false);
      const touchTimer = useRef(null);
      // reel guard
      const [activeReel,  setActiveReel]   = useState(null);
      const [guardActive, setGuardActive]  = useState(false);
      const [guardReel,   setGuardReel]    = useState(null);
      const [guardCount,  setGuardCount]   = useState(3);
      const guardTimer = useRef(null);
      // parent email panel
      const [emailInput,  setEmailInput]   = useState('');
      const [emailSaved,  setEmailSaved]   = useState(false);

      const showToast=(msg,type='info')=>setToast({msg,type});

      const logAlert=useCallback((message,icon='🚨')=>{
        const time=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
        setAlerts(p=>[{message,icon,time},...p].slice(0,30));
      },[]);

      // ── topic click ──
      const handleTopicClick=useCallback((topic,idx,mod)=>{
        if(userAge<topic.minAge){
          setBlocked({topic,color:mod.color});
          setActiveTopic(null);
          return;
        }
        setActiveTopic(p=>p===idx?null:idx);
      },[userAge]);

      // ── module click ──
      const handleModuleClick=(mod)=>{
        if(userAge<mod.minAge){ showToast(`Module requires age ${mod.minAge}+. You are ${userAge}.`,'warn'); logAlert(`Tried to open module "${mod.title}" (${mod.minAge}+)`,'⚠️'); return; }
        setActiveModule(p=>p?.id===mod.id?null:mod);
        setActiveTopic(null);
      };

      const toggleComplete=(modId,idx)=>{
        const key=`${modId}-${idx}`;
        const was=completed[key];
        setCompleted(p=>({...p,[key]:!p[key]}));
        if(!was) showToast('Topic marked complete 🎉','success');
      };

      const getProgress=mod=>Math.round((mod.topics.filter((_,i)=>completed[`${mod.id}-${i}`]).length/mod.topics.length)*100);

      const totalTopics=MODULES.reduce((a,m)=>a+m.topics.length,0);
      const totalDone  =Object.values(completed).filter(Boolean).length;
      const overall    =Math.round((totalDone/totalTopics)*100);

      const ageGroup=!userAge?null:userAge<13?'child':userAge<18?'teen':'adult';
      const ageColor={child:'#4ECDC4',teen:'#F7B731',adult:'#FF6B9D'};
      const ageLabel={child:'Child · Under 13',teen:'Teen · 13–17',adult:'Adult · 18+'};

      // ── touch lesson auto-advance ──
      useEffect(()=>{
        if(!touchPlay) return;
        touchTimer.current=setInterval(()=>{
          setTouchStep(p=>{
            if(p>=TOUCH_STEPS.length-1){ clearInterval(touchTimer.current); setTouchPlay(false); setTouchDone(true); return p; }
            return p+1;
          });
        },5000);
        return ()=>clearInterval(touchTimer.current);
      },[touchPlay]);

      const startLesson=()=>{ setTouchPlay(true); setTouchStep(0); setTouchDone(false); };

      // ── reel guard ──
      const playReel=(reel)=>{
        if(!reel.safe&&userAge<18){
          setGuardReel(reel); setGuardActive(true); setGuardCount(3); setActiveReel(null);
          logAlert(`Content Guard blocked "${reel.title}"`, '📱');
          if(parentEmail) showToast(`Parent notified about blocked reel 📧`,'warn');
          guardTimer.current=setInterval(()=>{
            setGuardCount(c=>{ if(c<=1){ clearInterval(guardTimer.current); setGuardActive(false); setGuardReel(null); setActiveReel(null); return 3; } return c-1; });
          },1000);
        } else { setActiveReel(reel); setGuardReel(null); setGuardActive(false); }
      };

      // ── age gate ──
      if(!userAge) return <AgeGate onVerify={setUserAge} parentEmail={parentEmail} setParentEmail={setParentEmail}/>;

      const cur=TOUCH_STEPS[touchStep];

      return (
        <Box>
          {blocked&&<BlockedOverlay topic={blocked.topic} userAge={userAge} parentEmail={parentEmail} onClose={()=>setBlocked(null)} onLog={logAlert}/>}
          {toast&&<Toast msg={toast.msg} type={toast.type} onDone={()=>setToast(null)}/>}

          {/* ══════════ HERO HEADER ══════════════════════════════════ */}
          <Box sx={{ background:'linear-gradient(135deg,#1e0e4a 0%,#0d4a45 100%)', color:'#fff', px:{xs:2,md:4}, py:{xs:5,md:7}, textAlign:'center', position:'relative', overflow:'hidden', borderRadius:{xs:0,md:'0 0 36px 36px'} }}>
            {[['#FF6B9D','10%','80%'],['#4ECDC4','88%','20%'],['#7B61FF','50%','110%']].map(([c,x,y],i)=>(
              <Box key={i} sx={{ position:'absolute', width:260, height:260, borderRadius:'50%', background:`radial-gradient(circle,${c}14 0%,transparent 70%)`, left:x, top:y, transform:'translate(-50%,-50%)', pointerEvents:'none' }}/>
            ))}
            {/* age chip */}
            <Box sx={{ position:'absolute', top:14, right:14, zIndex:2, bgcolor:'rgba(255,255,255,0.08)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.16)', borderRadius:99, px:2, py:0.8, display:'flex', alignItems:'center', gap:1.2, fontSize:'0.78rem' }}>
              <Box sx={{ width:8, height:8, borderRadius:'50%', bgcolor:ageColor[ageGroup], boxShadow:`0 0 7px ${ageColor[ageGroup]}` }}/>
              <span style={{color:'rgba(255,255,255,0.85)'}}>Age {userAge} · {ageLabel[ageGroup]}</span>
              <Box component="button" onClick={()=>{setUserAge(null);setActiveModule(null);setActiveTopic(null);}} sx={{ bgcolor:'rgba(255,255,255,0.13)', border:'none', borderRadius:1, color:'rgba(255,255,255,0.7)', fontSize:'0.7rem', cursor:'pointer', px:1.2, py:0.3,'&:hover':{bgcolor:'rgba(255,255,255,0.22)'} }}>Change</Box>
            </Box>
            <Box sx={{ position:'relative', zIndex:1 }}>
              <Typography sx={{ fontSize:'2.8rem', mb:0.8 }}>🌿</Typography>
              <Typography variant="h3" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, fontSize:{xs:'1.6rem',md:'2.4rem'} }}>Comprehensive Sexual Education</Typography>
              <Typography sx={{ mt:1, opacity:0.72, fontSize:'0.92rem', maxWidth:500, mx:'auto', lineHeight:1.65 }}>
                Evidence-based · Shame-free · Age-appropriate · {totalTopics} Topics
              </Typography>
              <Box sx={{ maxWidth:360, mx:'auto', mt:3.5 }}>
                <Box sx={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', mb:0.8, opacity:0.8 }}>
                  <span>Overall Progress</span><span>{totalDone}/{totalTopics} · {overall}%</span>
                </Box>
                <LinearProgress variant="determinate" value={overall} sx={{ height:8, borderRadius:99, bgcolor:'rgba(255,255,255,0.18)','& .MuiLinearProgress-bar':{background:'linear-gradient(90deg,#FFD700,#FF8C42)',borderRadius:99} }}/>
              </Box>
            </Box>
          </Box>

          {/* ══ MAIN CONTENT — single scrollable page ═══════════════ */}
          <Box sx={{ maxWidth:1120, mx:'auto', px:{xs:1.5,md:3} }}>

            {/* ── back button ── */}
            {(activeModule||onBack)&&(
              <Box sx={{ pt:3, pb:1 }}>
                {activeModule
                  ? <Button startIcon={<ArrowBackIcon/>} onClick={()=>{setActiveModule(null);setActiveTopic(null);}} sx={{ borderRadius:99, textTransform:'none', fontWeight:600 }}>All Modules</Button>
                  : onBack&&<Button startIcon={<ArrowBackIcon/>} onClick={onBack} sx={{ borderRadius:99, textTransform:'none', fontWeight:600 }}>Back to Home</Button>}
              </Box>
            )}

            {/* ════════════════════════════════════════════════════════
                §1  EDUCATION MODULES
            ════════════════════════════════════════════════════════ */}
            <Box sx={{ pt:6, pb:4 }}>
              <SectionTitle icon="📚" badge="Education Modules" badgeColor="#7B61FF"
                title="6 Learning Modules"
                sub="Select any module to expand it and explore topics. Age-restricted topics are automatically blocked."/>

              {!activeModule&&(
                <Grid container spacing={2.5} sx={{ animation:'se-up 0.4s ease' }}>
                  {MODULES.map(mod=>{
                    const locked=userAge<mod.minAge, prog=getProgress(mod);
                    const accessible=mod.topics.filter(t=>userAge>=t.minAge).length;
                    return (
                      <Grid item xs={12} sm={6} lg={4} key={mod.id}>
                        <Card className="se-card"
                          onClick={()=>handleModuleClick(mod)}
                          sx={{ height:'100%', cursor:'pointer', position:'relative', overflow:'hidden', opacity:locked?0.6:1, border:`2px solid ${locked?alpha('#f44336',0.12):alpha(mod.color,0.2)}`, boxShadow:locked?'none':`0 4px 22px ${alpha(mod.color,0.1)}`,'&:hover':{borderColor:locked?undefined:mod.color} }}>
                          <Box sx={{ position:'absolute', top:0, right:0, width:66, height:66, background:`${mod.color}0e`, borderRadius:'0 14px 0 66px', pointerEvents:'none' }}/>
                          {locked&&<Box sx={{ position:'absolute', top:11, right:11, bgcolor:'rgba(244,67,54,0.88)', borderRadius:'50%', width:25, height:25, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.82rem' }}>🔒</Box>}
                          <CardContent sx={{ p:3 }}>
                            <Typography sx={{ fontSize:'2rem', mb:1.2 }}>{mod.icon}</Typography>
                            <Typography variant="h6" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700, color:locked?'text.disabled':'text.primary', mb:0.3 }}>{mod.title}</Typography>
                            <Typography sx={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, color:locked?'text.disabled':mod.color, mb:0.8 }}>{mod.subtitle}</Typography>
                            <Typography color="text.secondary" sx={{ fontSize:'0.82rem', lineHeight:1.65, mb:2 }}>{mod.desc}</Typography>
                            <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:1 }}>
                              <AgeBadge userAge={userAge} minAge={mod.minAge}/>
                              <Typography sx={{ fontSize:'0.74rem', color:'text.disabled' }}>{locked?`Requires ${mod.minAge}+`:`${accessible}/${mod.topics.length} accessible`}</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={prog} sx={{ height:5, borderRadius:99, mb:1.8, bgcolor:alpha(mod.color,0.13),'& .MuiLinearProgress-bar':{bgcolor:mod.color,borderRadius:99} }}/>
                            <Box sx={{ display:'flex', flexWrap:'wrap', gap:0.6 }}>
                              {mod.topics.slice(0,3).map((t,i)=>(
                                <Chip key={i} label={`${userAge<t.minAge?'🔒':t.icon} ${t.title}`} size="small"
                                  sx={{ fontSize:'0.66rem', height:21, bgcolor:userAge>=t.minAge?alpha(mod.color,0.1):alpha('#f44336',0.08), color:userAge>=t.minAge?mod.color:'#e08888', border:`1px solid ${userAge>=t.minAge?alpha(mod.color,0.22):alpha('#f44336',0.18)}` }}/>
                              ))}
                              {mod.topics.length>3&&<Chip label={`+${mod.topics.length-3}`} size="small" sx={{ fontSize:'0.66rem', height:21, bgcolor:'action.hover', color:'text.disabled' }}/>}
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              )}

              {/* ── expanded module topics ── */}
              {activeModule&&(
                <Fade in timeout={320}>
                  <Box>
                    <Card sx={{ mb:3, border:`2px solid ${alpha(activeModule.color,0.28)}`, boxShadow:`0 10px 36px ${alpha(activeModule.color,0.14)}`, overflow:'hidden', position:'relative' }}>
                      <Box sx={{ position:'absolute', top:0, right:0, width:160, height:160, background:`radial-gradient(circle,${activeModule.color}0d 0%,transparent 70%)`, pointerEvents:'none' }}/>
                      <CardContent sx={{ p:{xs:3,md:4} }}>
                        <Box sx={{ display:'flex', gap:2, flexWrap:'wrap', alignItems:'flex-start' }}>
                          <Typography sx={{ fontSize:'3rem' }}>{activeModule.icon}</Typography>
                          <Box sx={{ flex:1, minWidth:200 }}>
                            <Typography variant="h5" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, mb:0.4 }}>{activeModule.title}</Typography>
                            <Typography sx={{ fontSize:'0.74rem', fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, color:activeModule.color, mb:1 }}>{activeModule.subtitle}</Typography>
                            <Typography color="text.secondary" sx={{ fontSize:'0.88rem', lineHeight:1.75, mb:1.5 }}>{activeModule.desc}</Typography>
                            <Box sx={{ display:'flex', gap:1, flexWrap:'wrap', alignItems:'center' }}>
                              <Chip label={`${activeModule.topics.length} Topics`} size="small" sx={{ bgcolor:alpha(activeModule.color,0.12), color:activeModule.color, fontWeight:700, border:`1px solid ${alpha(activeModule.color,0.28)}` }}/>
                              <AgeBadge userAge={userAge} minAge={activeModule.minAge}/>
                              <Typography sx={{ color:'text.disabled', fontSize:'0.78rem' }}>{getProgress(activeModule)}% complete</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>

                    <Alert severity="error" icon={<ShieldIcon/>} sx={{ mb:3, fontSize:'0.82rem', bgcolor:alpha('#f44336',0.05), border:`1px solid ${alpha('#f44336',0.18)}` }}>
                      <strong>Parental Control Active —</strong> Locked topics auto-block with countdown and send a parent email notification.
                    </Alert>

                    <Grid container spacing={2}>
                      {activeModule.topics.map((topic,idx)=>{
                        const key=`${activeModule.id}-${idx}`, isDone=!!completed[key], isOpen=activeTopic===idx, locked=userAge<topic.minAge;
                        return (
                          <Grid item xs={12} sm={6} key={idx}>
                            <Card sx={{ border:`2px solid ${locked?alpha('#f44336',0.16):isDone?activeModule.color:alpha(theme.palette.divider,1)}`, boxShadow:isDone?`0 5px 20px ${alpha(activeModule.color,0.2)}`:'none', opacity:locked?0.75:1, overflow:'hidden' }}>
                              <Box sx={{ px:2.5, py:2, cursor:'pointer','&:hover':{bgcolor:alpha(activeModule.color,0.03)} }} onClick={()=>handleTopicClick(topic,idx,activeModule)}>
                                <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:1 }}>
                                  <Box sx={{ flex:1 }}>
                                    <Typography sx={{ fontSize:'1.5rem' }}>{locked?'🔒':topic.icon}</Typography>
                                    <Typography sx={{ fontWeight:700, fontSize:'0.88rem', color:locked?'text.disabled':'text.primary', fontFamily:'"Playfair Display",serif', mt:0.8, mb:0.5 }}>{topic.title}</Typography>
                                    <AgeBadge userAge={userAge} minAge={topic.minAge}/>
                                  </Box>
                                  <Box sx={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:0.8, flexShrink:0 }}>
                                    {!locked?(
                                      <>
                                        <Box component="button" onClick={e=>{e.stopPropagation();toggleComplete(activeModule.id,idx);}}
                                          sx={{ width:26, height:26, borderRadius:'50%', border:`2px solid ${isDone?activeModule.color:theme.palette.divider}`, bgcolor:isDone?activeModule.color:'background.paper', color:isDone?'#fff':'text.disabled', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.85rem', transition:'all 0.2s' }}>✓</Box>
                                        <Typography sx={{ color:'text.disabled', fontSize:'0.95rem', transition:'transform 0.25s', transform:isOpen?'rotate(180deg)':'none' }}>▾</Typography>
                                      </>
                                    ):(
                                      <Typography sx={{ fontSize:'1.35rem', animation:'se-wiggle 2s ease 1s infinite' }}>🔒</Typography>
                                    )}
                                  </Box>
                                </Box>
                                {locked&&(
                                  <Box sx={{ mt:1.2, bgcolor:alpha('#f44336',0.07), border:`1px solid ${alpha('#f44336',0.17)}`, borderRadius:2, p:1.1 }}>
                                    <Typography sx={{ fontSize:'0.77rem', color:'error.light' }}>⚠️ Age {topic.minAge}+ required · Your age: {userAge} · Parent will be notified on click</Typography>
                                  </Box>
                                )}
                              </Box>
                              <Collapse in={isOpen&&!locked}>
                                <Box sx={{ px:2.5, pb:2.5, borderTop:`1px solid ${alpha(activeModule.color,0.14)}` }}>
                                  <Typography color="text.secondary" sx={{ fontSize:'0.87rem', lineHeight:1.85, mt:1.8 }}>{topic.content}</Typography>
                                  {!isDone
                                    ? <Button variant="contained" size="small" onClick={()=>toggleComplete(activeModule.id,idx)} sx={{ mt:1.8, borderRadius:99, textTransform:'none', fontWeight:700, bgcolor:activeModule.color,'&:hover':{bgcolor:activeModule.color,opacity:0.85}, boxShadow:`0 4px 12px ${alpha(activeModule.color,0.4)}` }}>✓ Mark Complete</Button>
                                    : <Typography sx={{ color:activeModule.color, fontSize:'0.82rem', mt:1.5, fontWeight:700 }}>✅ Completed!</Typography>}
                                </Box>
                              </Collapse>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Fade>
              )}
            </Box>

            {/* ════════════════════════════════════════════════════════
                §2  LEGAL RULES
            ════════════════════════════════════════════════════════ */}
            <Box component="section" sx={{ py:6, borderTop:'1px solid', borderColor:'divider' }}>
              <SectionTitle icon="⚖️" badge="Legal Protection" badgeColor="#E53935"
                title="Know Your Rights & the Law"
                sub="Understanding legal protections helps you recognize abuse, report it, and seek justice. The law is on your side."/>

              <Grid container spacing={3}>
                {LEGAL.map((cat,ci)=>(
                  <Grid item xs={12} md={6} key={ci}>
                    <Card sx={{ border:`2px solid ${alpha(cat.color,0.22)}`, boxShadow:`0 4px 18px ${alpha(cat.color,0.09)}`, overflow:'hidden', height:'100%' }}>
                      <Box sx={{ bgcolor:alpha(cat.color,0.07), borderBottom:`1px solid ${alpha(cat.color,0.18)}`, p:2.5, display:'flex', alignItems:'center', gap:1.5 }}>
                        <Typography sx={{ fontSize:'1.7rem' }}>{cat.icon}</Typography>
                        <Box>
                          <Typography sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700, color:cat.color }}>{cat.cat}</Typography>
                          <Typography sx={{ fontSize:'0.74rem', color:'text.secondary' }}>{cat.items.length} rules</Typography>
                        </Box>
                      </Box>
                      {cat.items.map((item,li)=>(
                        <Box key={li} sx={{ borderBottom:li<cat.items.length-1?'1px solid':'none', borderColor:'divider' }}>
                          <Box onClick={()=>setLegalOpen(legalOpen===`${ci}-${li}`?null:`${ci}-${li}`)}
                            sx={{ px:2.5, py:1.8, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', gap:1,'&:hover':{bgcolor:alpha(cat.color,0.04)}, transition:'background 0.2s' }}>
                            <Box sx={{ display:'flex', alignItems:'center', gap:1.2 }}>
                              <Box sx={{ width:7, height:7, borderRadius:'50%', bgcolor:cat.color, flexShrink:0 }}/>
                              <Typography sx={{ fontWeight:600, fontSize:'0.87rem' }}>{item.title}</Typography>
                            </Box>
                            {legalOpen===`${ci}-${li}`?<ExpandLessIcon sx={{ color:'text.disabled', fontSize:18 }}/>:<ExpandMoreIcon sx={{ color:'text.disabled', fontSize:18 }}/>}
                          </Box>
                          <Collapse in={legalOpen===`${ci}-${li}`}>
                            <Box sx={{ px:3, pb:2.5, pt:0.5, bgcolor:alpha(cat.color,0.03) }}>
                              <Typography color="text.secondary" sx={{ fontSize:'0.84rem', lineHeight:1.82 }}>{item.desc}</Typography>
                            </Box>
                          </Collapse>
                        </Box>
                      ))}
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Emergency helplines */}
              <Box sx={{ mt:4, p:3, borderRadius:4, background:`linear-gradient(135deg,${alpha('#E53935',0.07)},${alpha('#7B61FF',0.07)})`, border:'1px solid', borderColor:alpha('#E53935',0.18) }}>
                <Typography variant="h6" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700, mb:2.5, display:'flex', alignItems:'center', gap:1 }}>
                  <WarningAmberIcon sx={{ color:'#E53935' }}/> Emergency Help Lines — India
                </Typography>
                <Grid container spacing={2}>
                  {[['1098','CHILDLINE\n24/7 Free','#4ECDC4'],['181','Women\nHelpline','#FF6B9D'],['100','Police\nEmergency','#F7B731'],['112','National\nEmergency','#7B61FF']].map(([num,lbl,col])=>(
                    <Grid item xs={6} sm={3} key={num}>
                      <Box sx={{ textAlign:'center', p:2, borderRadius:3, bgcolor:alpha(col,0.1), border:`1px solid ${alpha(col,0.28)}` }}>
                        <Typography sx={{ fontSize:'1.65rem', fontWeight:800, color:col, fontFamily:'"Playfair Display",serif' }}>{num}</Typography>
                        <Typography sx={{ fontSize:'0.72rem', color:'text.secondary', mt:0.3, lineHeight:1.4, whiteSpace:'pre' }}>{lbl}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>

            {/* ════════════════════════════════════════════════════════
                §3  GOOD TOUCH / BAD TOUCH  (AI Video Lesson)
            ════════════════════════════════════════════════════════ */}
            <Box component="section" sx={{ py:6, borderTop:'1px solid', borderColor:'divider' }}>
              <SectionTitle icon="🤗" badge="Child Safety Lesson" badgeColor="#4ECDC4"
                title="Good Touch vs. Bad Touch"
                sub="An interactive AI-narrated video lesson that teaches children body safety in a gentle, friendly way."/>

              {!touchPlay&&!touchDone&&(
                <Box sx={{ textAlign:'center', py:5 }}>
                  <Box sx={{ fontSize:'4.5rem', mb:2.5 }}>🎬</Box>
                  <Typography variant="h5" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700, mb:1.5 }}>Start the Safety Lesson</Typography>
                  <Typography color="text.secondary" sx={{ mb:4, fontSize:'0.9rem' }}>A gentle 5-step animated lesson. Recommended for ages 5–12.</Typography>
                  <Button variant="contained" size="large" startIcon={<PlayCircleIcon/>} onClick={startLesson}
                    sx={{ borderRadius:99, px:5, py:1.8, background:'linear-gradient(135deg,#4ECDC4,#26C6DA)', fontWeight:700, fontSize:'1rem', textTransform:'none', boxShadow:'0 8px 24px rgba(78,205,196,0.4)' }}>
                    ▶ Start AI Lesson
                  </Button>
                </Box>
              )}

              {(touchPlay||touchDone)&&(
                <Box>
                  <Stepper activeStep={touchStep} alternativeLabel sx={{ mb:4 }}>
                    {TOUCH_STEPS.map((s,i)=>(
                      <Step key={i} completed={i<touchStep||touchDone}>
                        <StepLabel sx={{ '& .MuiStepLabel-label':{fontSize:'0.7rem'} }}>{s.icon}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <Card sx={{ maxWidth:620, mx:'auto', mb:4, border:`3px solid ${alpha(cur.color,0.5)}`, boxShadow:`0 12px 48px ${alpha(cur.color,0.22)}`, animation:'se-slide 0.38s ease', overflow:'hidden' }}>
                    <Box sx={{ bgcolor:cur.color, px:3, py:1.4, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <Box sx={{ display:'flex', gap:0.8 }}>
                        {[0.5,0.5,0.5].map((_,i)=><Box key={i} sx={{ width:9, height:9, borderRadius:'50%', bgcolor:`rgba(255,255,255,${_})` }}/>)}
                      </Box>
                      <Typography sx={{ color:'#fff', fontWeight:700, fontSize:'0.78rem' }}>
                        {touchPlay&&<Box component="span" sx={{ animation:'se-blink 1s infinite', mr:0.8 }}>🔴</Box>}
                        {touchPlay?'AI LESSON LIVE':'LESSON COMPLETE'}
                      </Typography>
                      <Typography sx={{ color:'rgba(255,255,255,0.7)', fontSize:'0.72rem' }}>Step {touchStep+1}/{TOUCH_STEPS.length}</Typography>
                    </Box>
                    <CardContent sx={{ p:{xs:3,md:4} }}>
                      <Typography sx={{ fontSize:'4.5rem', textAlign:'center', mb:1.5 }}>{cur.icon}</Typography>
                      <Typography variant="h5" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, textAlign:'center', mb:2.5, color:cur.color }}>{cur.title}</Typography>
                      <Box sx={{ bgcolor:alpha(cur.color,0.07), border:`1px solid ${alpha(cur.color,0.2)}`, borderRadius:3, p:2.5, mb:3 }}>
                        <Typography sx={{ fontSize:'0.95rem', lineHeight:1.9 }}>{cur.body}</Typography>
                      </Box>
                      <Grid container spacing={1.5}>
                        {cur.examples.map((ex,i)=>(
                          <Grid item xs={6} key={i}>
                            <Box sx={{ textAlign:'center', p:1.5, borderRadius:2.5, bgcolor:cur.safe?alpha('#4ECDC4',0.09):alpha('#FF6B9D',0.09), border:`1px solid ${cur.safe?alpha('#4ECDC4',0.24):alpha('#FF6B9D',0.24)}` }}>
                              <Typography sx={{ fontSize:'0.82rem', fontWeight:600, color:cur.safe?'#2bb5ac':'#d44' }}>{ex}</Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                      {touchPlay&&(
                        <Box sx={{ mt:3 }}>
                          <LinearProgress sx={{ height:4, borderRadius:99, bgcolor:alpha(cur.color,0.14),'& .MuiLinearProgress-bar':{bgcolor:cur.color} }}/>
                          <Typography sx={{ color:'text.disabled', fontSize:'0.73rem', textAlign:'center', mt:0.8 }}>Auto-advancing in 5 seconds…</Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>

                  <Box sx={{ display:'flex', justifyContent:'center', gap:2, flexWrap:'wrap', mb:4 }}>
                    <Button variant="outlined" disabled={touchStep===0} onClick={()=>setTouchStep(s=>s-1)} sx={{ borderRadius:99, textTransform:'none' }}>← Prev</Button>
                    {!touchDone
                      ? <Button variant="contained" onClick={()=>{ if(touchStep<TOUCH_STEPS.length-1) setTouchStep(s=>s+1); else{setTouchPlay(false);setTouchDone(true);} }} sx={{ borderRadius:99, textTransform:'none', bgcolor:cur.color,'&:hover':{bgcolor:cur.color,opacity:0.85} }}>
                          {touchStep<TOUCH_STEPS.length-1?'Next →':'Finish ✓'}
                        </Button>
                      : <Button variant="contained" startIcon={<PlayCircleIcon/>} onClick={startLesson} sx={{ borderRadius:99, textTransform:'none', background:'linear-gradient(135deg,#4ECDC4,#26C6DA)' }}>Watch Again</Button>}
                  </Box>

                  {touchDone&&(
                    <Box sx={{ textAlign:'center', p:4, borderRadius:4, background:`linear-gradient(135deg,${alpha('#4ECDC4',0.08)},${alpha('#7B61FF',0.08)})`, border:`1px solid ${alpha('#4ECDC4',0.22)}` }}>
                      <Typography sx={{ fontSize:'2.5rem', mb:1 }}>🎉</Typography>
                      <Typography variant="h5" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>Lesson Complete!</Typography>
                      <Typography color="text.secondary" sx={{ fontSize:'0.9rem', lineHeight:1.7 }}>
                        Remember: Your body belongs to YOU. Say NO to bad touches.<br/>Tell a trusted adult. You are BRAVE and SAFE! 💛
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            {/* ════════════════════════════════════════════════════════
                §4  CONTENT GUARD  (Reel Simulator)
            ════════════════════════════════════════════════════════ */}
            <Box component="section" sx={{ py:6, borderTop:'1px solid', borderColor:'divider' }}>
              <SectionTitle icon="📱" badge="Content Guard" badgeColor="#7B61FF"
                title="Social Media Content Guard"
                sub={`Simulates an Instagram/YouTube reel feed. When a child (age ${userAge < 18 ? userAge : 'under 18'}) scrolls to an 18+ video, it is instantly detected and auto-skipped — with a parent notification.`}/>

              <Grid container spacing={3}>
                {/* Feed */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight:700, mb:2, display:'flex', alignItems:'center', gap:1 }}>
                    📲 Scrolling Feed
                    <Chip label={`Age ${userAge}`} size="small" sx={{ bgcolor:alpha('#7B61FF',0.12), color:'#7B61FF', border:`1px solid ${alpha('#7B61FF',0.3)}`, fontSize:'0.7rem' }}/>
                  </Typography>
                  <Box sx={{ display:'flex', flexDirection:'column', gap:1.5 }}>
                    {DEMO_REELS.map(reel=>(
                      <Box key={reel.id} onClick={()=>playReel(reel)}
                        sx={{ display:'flex', alignItems:'center', gap:2, p:1.8, borderRadius:3, cursor:'pointer',
                          border:`2px solid ${!reel.safe&&userAge<18?alpha('#f44336',0.3):activeReel?.id===reel.id?alpha('#4ECDC4',0.5):alpha('#7B61FF',0.14)}`,
                          bgcolor:!reel.safe&&userAge<18?alpha('#f44336',0.04):activeReel?.id===reel.id?alpha('#4ECDC4',0.06):'background.paper',
                          transition:'all 0.18s','&:hover':{borderColor:!reel.safe&&userAge<18?'#f44336':'#7B61FF',bgcolor:alpha('#7B61FF',0.04)} }}>
                        <Box sx={{ width:50, height:50, borderRadius:2.5, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.7rem', bgcolor:!reel.safe?alpha('#f44336',0.1):alpha('#4ECDC4',0.1), flexShrink:0 }}>{reel.thumb}</Box>
                        <Box sx={{ flex:1 }}>
                          <Typography sx={{ fontWeight:600, fontSize:'0.87rem', color:!reel.safe&&userAge<18?'error.main':'text.primary' }}>{reel.title}</Typography>
                          <Typography sx={{ fontSize:'0.74rem', color:'text.secondary' }}>{reel.creator} · ❤️ {reel.likes}</Typography>
                        </Box>
                        {!reel.safe&&userAge<18
                          ? <Chip icon={<BlockIcon/>} label="Blocked" size="small" sx={{ bgcolor:alpha('#f44336',0.12), color:'#f44336', border:`1px solid ${alpha('#f44336',0.3)}`, fontSize:'0.68rem','& .MuiChip-icon':{color:'#f44336',fontSize:14} }}/>
                          : <PlayCircleIcon sx={{ color:activeReel?.id===reel.id?'#4ECDC4':'text.disabled', fontSize:26 }}/>}
                      </Box>
                    ))}
                  </Box>
                </Grid>

                {/* Player */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight:700, mb:2 }}>📺 Player</Typography>

                  {guardActive&&guardReel&&(
                    <Box sx={{ borderRadius:4, overflow:'hidden', border:'2px solid rgba(244,67,54,0.6)', animation:'se-pop 0.38s ease' }}>
                      <Box sx={{ bgcolor:'#f44336', px:2.5, py:1.4, display:'flex', alignItems:'center', gap:1 }}>
                        <BlockIcon sx={{ color:'#fff', fontSize:19 }}/>
                        <Typography sx={{ color:'#fff', fontWeight:700, fontSize:'0.83rem' }}>🚨 CONTENT GUARD ACTIVATED</Typography>
                      </Box>
                      <Box sx={{ p:3.5, textAlign:'center' }}>
                        <Typography sx={{ fontSize:'3rem', mb:1 }}>🚫</Typography>
                        <Typography sx={{ fontWeight:700, color:'error.main', mb:0.5 }}>18+ Video Detected & Skipped!</Typography>
                        <Typography color="text.secondary" sx={{ fontSize:'0.82rem', mb:2 }}>"{guardReel.title}" is not appropriate for age {userAge}.</Typography>
                        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap:1.5, mb:2 }}>
                          <CountdownRing remaining={guardCount} total={3} size={60} color="#f44336"/>
                          <Typography sx={{ fontWeight:700, color:'error.main' }}>Auto-skipping in {guardCount}s</Typography>
                        </Box>
                        {parentEmail&&(
                          <Box sx={{ bgcolor:alpha('#4ECDC4',0.1), border:`1px solid ${alpha('#4ECDC4',0.3)}`, borderRadius:2, p:1.4, display:'flex', alignItems:'center', gap:1 }}>
                            <EmailIcon sx={{ color:'#4ECDC4', fontSize:17 }}/>
                            <Typography sx={{ fontSize:'0.78rem', color:'text.secondary' }}>Parent notified at {parentEmail}</Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}

                  {activeReel&&!guardActive&&(
                    <Box sx={{ borderRadius:4, overflow:'hidden', border:`2px solid ${alpha('#4ECDC4',0.45)}`, animation:'se-slide 0.28s ease' }}>
                      <Box sx={{ bgcolor:'#4ECDC4', px:2.5, py:1.4, display:'flex', alignItems:'center', gap:1 }}>
                        <CheckCircleIcon sx={{ color:'#fff', fontSize:19 }}/>
                        <Typography sx={{ color:'#fff', fontWeight:700, fontSize:'0.83rem' }}>✅ Safe Content Playing</Typography>
                      </Box>
                      <Box sx={{ p:3.5, textAlign:'center' }}>
                        <Box sx={{ fontSize:'4.5rem', mb:1.5, animation:'se-blink 2s infinite' }}>{activeReel.thumb}</Box>
                        <Typography variant="h6" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700, mb:0.4 }}>{activeReel.title}</Typography>
                        <Typography color="text.secondary" sx={{ fontSize:'0.82rem', mb:2 }}>{activeReel.creator} · ❤️ {activeReel.likes}</Typography>
                        <LinearProgress sx={{ borderRadius:99, height:4, bgcolor:alpha('#4ECDC4',0.15),'& .MuiLinearProgress-bar':{bgcolor:'#4ECDC4'} }}/>
                        <Typography sx={{ color:'text.disabled', fontSize:'0.72rem', mt:0.8 }}>Playing ▶</Typography>
                      </Box>
                    </Box>
                  )}

                  {!activeReel&&!guardActive&&(
                    <Box sx={{ borderRadius:4, border:'2px dashed', borderColor:'divider', p:5, textAlign:'center' }}>
                      <Typography sx={{ fontSize:'2.2rem', mb:1.5 }}>📱</Typography>
                      <Typography color="text.secondary" sx={{ fontSize:'0.87rem' }}>Tap a reel on the left to play it.<br/>18+ content is automatically blocked.</Typography>
                    </Box>
                  )}

                  <Box sx={{ mt:2.5, p:2.2, borderRadius:3, bgcolor:alpha('#F7B731',0.07), border:`1px solid ${alpha('#F7B731',0.22)}` }}>
                    <Typography sx={{ fontWeight:700, fontSize:'0.8rem', mb:0.8, color:'#b87e0a', display:'flex', alignItems:'center', gap:0.7 }}>💡 How it Works in Real Life</Typography>
                    <Typography color="text.secondary" sx={{ fontSize:'0.77rem', lineHeight:1.75 }}>
                      When a child scrolls Instagram or YouTube and an adult video auto-plays, this system <strong>detects it instantly</strong> and skips to the next safe video, then sends a silent notification to the parent's email.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* ════════════════════════════════════════════════════════
                §5  PARENT ALERT CENTER
            ════════════════════════════════════════════════════════ */}
            <Box component="section" sx={{ py:6, borderTop:'1px solid', borderColor:'divider' }}>
              <SectionTitle icon="📧" badge="Parent Alert System" badgeColor="#FF6B9D"
                title="Parent Notification Center"
                sub="Every time a child attempts to access restricted content, an automatic email is dispatched to the registered parent or guardian."/>

              <Grid container spacing={3}>
                {/* Email setup card */}
                <Grid item xs={12} md={5}>
                  <Card sx={{ border:`2px solid ${alpha('#FF6B9D',0.22)}`, boxShadow:`0 4px 22px ${alpha('#FF6B9D',0.09)}`, p:3, height:'100%' }}>
                    <Box sx={{ display:'flex', alignItems:'center', gap:1.2, mb:3 }}>
                      <EmailIcon sx={{ color:'#FF6B9D' }}/>
                      <Typography variant="subtitle1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700 }}>Parent Email Setup</Typography>
                    </Box>
                    <TextField fullWidth size="small" label="Parent / Guardian Email" type="email"
                      value={emailInput||parentEmail}
                      onChange={e=>{setEmailInput(e.target.value);setEmailSaved(false);}} sx={{ mb:2 }}/>
                    <Button fullWidth variant="contained" startIcon={emailSaved?<CheckCircleIcon/>:<SendIcon/>}
                      onClick={()=>{ if(!(emailInput||parentEmail).includes('@')) return; setParentEmail(emailInput||parentEmail); setEmailSaved(true); showToast('Parent email saved! Alerts are now active 📧','success'); }}
                      disabled={!(emailInput||parentEmail).includes('@')}
                      sx={{ borderRadius:99, textTransform:'none', fontWeight:700, py:1.4, bgcolor:emailSaved?'#4ECDC4':'#FF6B9D','&:hover':{bgcolor:emailSaved?'#3dbdb5':'#e05590'}, boxShadow:'none' }}>
                      {emailSaved?'✅ Email Saved & Active':'Save Parent Email'}
                    </Button>
                    {emailSaved&&<Alert severity="success" sx={{ mt:2, fontSize:'0.8rem' }}>Alerts will be sent to <strong>{parentEmail}</strong></Alert>}

                    <Box sx={{ mt:3 }}>
                      <Typography sx={{ fontWeight:700, fontSize:'0.8rem', mb:1.5, color:'text.secondary' }}>📬 What triggers a parent email?</Typography>
                      {['Clicking an age-restricted education topic','Attempting to watch a blocked reel/video','Trying to open a locked module','Multiple blocked attempts in one session'].map((item,i)=>(
                        <Box key={i} sx={{ display:'flex', alignItems:'flex-start', gap:1, mb:1 }}>
                          <Box sx={{ width:5, height:5, borderRadius:'50%', bgcolor:'#FF6B9D', mt:0.9, flexShrink:0 }}/>
                          <Typography sx={{ fontSize:'0.81rem', color:'text.secondary', lineHeight:1.6 }}>{item}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Card>
                </Grid>

                {/* Alert log */}
                <Grid item xs={12} md={7}>
                  <Card sx={{ border:`2px solid ${alpha('#7B61FF',0.18)}`, p:3, height:'100%' }}>
                    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mb:3, flexWrap:'wrap', gap:1 }}>
                      <Box sx={{ display:'flex', alignItems:'center', gap:1.2 }}>
                        <WarningAmberIcon sx={{ color:'#7B61FF' }}/>
                        <Typography variant="subtitle1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700 }}>Live Alert Log</Typography>
                      </Box>
                      <Box sx={{ display:'flex', gap:1 }}>
                        <Chip label={`${alerts.length} alerts`} size="small" sx={{ bgcolor:alpha('#7B61FF',0.12), color:'#7B61FF', border:`1px solid ${alpha('#7B61FF',0.3)}`, fontWeight:700 }}/>
                        {alerts.length>0&&<Button size="small" onClick={()=>setAlerts([])} sx={{ fontSize:'0.72rem', color:'text.disabled', textTransform:'none' }}>Clear</Button>}
                      </Box>
                    </Box>

                    {alerts.length===0?(
                      <Box sx={{ textAlign:'center', py:5 }}>
                        <Typography sx={{ fontSize:'2.4rem', mb:1.5 }}>📭</Typography>
                        <Typography color="text.secondary" sx={{ fontSize:'0.87rem' }}>No alerts yet. Try tapping a blocked topic or reel above!</Typography>
                      </Box>
                    ):(
                      <Box sx={{ display:'flex', flexDirection:'column', gap:1.5, maxHeight:360, overflowY:'auto', pr:0.5 }}>
                        {alerts.map((a,i)=>(
                          <Box key={i} sx={{ display:'flex', gap:2, p:2, borderRadius:2.5, bgcolor:alpha('#7B61FF',0.04), border:`1px solid ${alpha('#7B61FF',0.14)}`, animation:'se-slide 0.3s ease' }}>
                            <Typography sx={{ fontSize:'1.4rem', flexShrink:0 }}>{a.icon}</Typography>
                            <Box sx={{ flex:1 }}>
                              <Typography sx={{ fontWeight:600, fontSize:'0.84rem' }}>{a.message}</Typography>
                              <Typography sx={{ fontSize:'0.74rem', color:'text.secondary', mt:0.3 }}>{a.time}</Typography>
                              {parentEmail&&<Typography sx={{ fontSize:'0.7rem', color:'#4ECDC4', mt:0.3 }}>📧 Email sent to {parentEmail}</Typography>}
                            </Box>
                            <Chip label="Blocked" size="small" sx={{ bgcolor:alpha('#f44336',0.1), color:'#f44336', border:`1px solid ${alpha('#f44336',0.25)}`, fontSize:'0.67rem', alignSelf:'flex-start' }}/>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </Box>

          </Box>{/* end maxWidth wrapper */}

          {/* ══ FOOTER ════════════════════════════════════════════════ */}
          <Box sx={{ textAlign:'center', py:3.5, px:2, color:'text.disabled', fontSize:'0.77rem', borderTop:'1px solid', borderColor:'divider', bgcolor:'background.paper', lineHeight:2, mt:4 }}>
            <Typography sx={{ fontSize:'0.8rem', color:'text.secondary', mb:0.4 }}>🌿 <strong>Comprehensive Sexual Education</strong> — Evidence-based · Inclusive · Shame-free</Typography>
            <Typography sx={{ fontSize:'0.74rem' }}>Always consult a qualified healthcare professional for personal medical advice.</Typography>
            <Typography sx={{ fontSize:'0.74rem' }}>🔒 Parental controls active · ⚖️ POCSO & Rape Laws · 📧 Parent alert system · 🛡️ Content Guard enabled</Typography>
          </Box>
        </Box>
      );
    }
