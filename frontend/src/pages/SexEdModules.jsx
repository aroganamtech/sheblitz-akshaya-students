/**
 * SexEdModules.jsx  —  Enhanced Edition
 *
 * NEW FEATURES (v3):
 *  1. Legal Protection Rules  — Rape / POCSO / Child Abuse laws (India + global)
 *  2. Good Touch / Bad Touch  — Animated AI-narrated lesson for children
 *  3. Content Guard           — Detects 18+ reel/video playing & auto-skips it
 *  4. Parent Alert Email      — Sends notification email to parent when blocked content is accessed
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, LinearProgress,
  Chip, Collapse, Button, Fade, alpha, useTheme, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  Stepper, Step, StepLabel, Alert, Snackbar,
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
import TouchAppIcon           from '@mui/icons-material/TouchApp';
import SendIcon               from '@mui/icons-material/Send';
import CloseIcon              from '@mui/icons-material/Close';

// ═══════════════════════════════════════════════════════════════
//  DATA — 6 Modules · 36 Topics
// ═══════════════════════════════════════════════════════════════
const MODULES = [
  {
    id: 1, icon: '🫀', color: '#FF6B9D', bg: '#FFF0F6',
    title: 'The Human Body', subtitle: 'Biology & Development',
    description: 'Understand how your body works — from anatomy to life cycles.',
    minAge: 10,
    topics: [
      { title: 'Sexual Anatomy',            icon: '🔬', minAge: 10, content: 'Clear, non-shameful information about internal and external reproductive organs. Knowing your body is the foundation of all health literacy.' },
      { title: 'Puberty & Life Cycles',     icon: '🌱', minAge: 10, content: 'Hormonal changes, physical growth, and emotional shifts during teen years — and later transitions like menopause and andropause.' },
      { title: 'Menstruation',              icon: '📅', minAge: 10, content: 'Tracking cycles, managing periods effectively, and identifying health issues like PCOS, endometriosis, and irregular bleeding.' },
      { title: 'Reproduction & Fertility',  icon: '🧬', minAge: 13, content: 'How pregnancy happens, how to track ovulation, what affects fertility, and the basics of assisted reproduction technologies.' },
      { title: 'Hormones & Health',         icon: '⚗️', minAge: 13, content: 'Estrogen, testosterone, and other hormones — how they shape mood, energy, body composition, and long-term physical health.' },
      { title: 'Prenatal Care & Pregnancy', icon: '🤱', minAge: 16, content: 'Stages of fetal development, nutrition and care during pregnancy, and what to expect through each trimester.' },
    ],
  },
  {
    id: 2, icon: '🛡️', color: '#4ECDC4', bg: '#F0FFFE',
    title: 'Sexual Health & Safety', subtitle: 'Protection & Medical Well-being',
    description: 'Tools and knowledge to protect your physical health.',
    minAge: 12,
    topics: [
      { title: 'Contraception',             icon: '💊', minAge: 16, content: 'The pill, IUDs, implants, condoms, patches, and emergency contraception — effectiveness, side effects, and how to choose the right method.' },
      { title: 'STIs & HIV/AIDS',           icon: '🔴', minAge: 14, content: 'Prevention, testing, and treatment of sexually transmitted infections. STI testing is routine self-care, not something to be ashamed of.' },
      { title: 'Sexual Healthcare',         icon: '🏥', minAge: 13, content: 'When to see a gynecologist or urologist, how to perform self-exams, and what regular screenings like Pap smears involve.' },
      { title: 'Safe Digital Habits',       icon: '📱', minAge: 12, content: 'Navigating privacy and safety on dating apps, social media, and messaging. Understanding digital consent and protecting personal data.' },
      { title: 'Substance Use & Sex',       icon: '⚠️', minAge: 16, content: 'How alcohol and drugs affect decision-making, consent, and sexual health. Recognizing coercion and staying safe.' },
      { title: 'Sexual Pain & Dysfunction', icon: '💬', minAge: 18, content: 'Conditions like vaginismus, erectile dysfunction, and low libido — medical issues with real solutions, not causes for shame.' },
    ],
  },
  {
    id: 3, icon: '💚', color: '#7B61FF', bg: '#F5F0FF',
    title: 'Relationships & Emotions', subtitle: 'Mind, Heart & Connection',
    description: 'Sexuality is as much about the mind and heart as the body.',
    minAge: 11,
    topics: [
      { title: 'Consent',                          icon: '✅', minAge: 11, content: 'Consent must be clear, enthusiastic, ongoing, and freely given. It can be withdrawn at any time. Respecting boundaries is non-negotiable.' },
      { title: 'Healthy vs. Toxic Relationships',  icon: '🚦', minAge: 11, content: 'Green flags: respect, trust, equality. Red flags: control, jealousy, manipulation, and abuse. Learning to spot the difference early.' },
      { title: 'Communication Skills',             icon: '🗣️', minAge: 12, content: 'How to talk to a partner about your needs, limits, and protection. Scripts for difficult conversations and active listening.' },
      { title: 'Self-Esteem & Body Image',         icon: '🌟', minAge: 10, content: 'Building a positive relationship with your body amid unrealistic media standards. Recognizing social media\'s impact on self-perception.' },
      { title: 'Breakups & Heartbreak',            icon: '💔', minAge: 12, content: 'Processing grief after a relationship ends, recognizing unhealthy coping, and rebuilding confidence and identity.' },
      { title: 'Online Relationships',             icon: '🌐', minAge: 14, content: 'Navigating connections formed digitally — setting boundaries, maintaining trust, and identifying red flags.' },
    ],
  },
  {
    id: 4, icon: '🌍', color: '#F7B731', bg: '#FFFBF0',
    title: 'Values, Rights & Culture', subtitle: 'How We Fit into the World',
    description: 'Understand your rights and the social context of sexuality.',
    minAge: 11,
    topics: [
      { title: 'Sexual Rights',                    icon: '⚖️',  minAge: 11, content: 'You have the right to bodily autonomy, to be free from violence, and to make informed choices without coercion.' },
      { title: 'Gender Identity & Equality',       icon: '🏳️‍🌈', minAge: 11, content: 'The difference between biological sex, gender identity, and expression. Challenging stereotypes and understanding the spectrum.' },
      { title: 'Sexual Orientation & LGBTQ+',     icon: '🌈',  minAge: 11, content: 'Respecting diverse orientations — gay, lesbian, bisexual, asexual, pansexual. History, culture, and equal rights.' },
      { title: 'Media Literacy',                   icon: '🎬',  minAge: 12, content: 'Distinguishing real life from how sex and bodies are portrayed in media. Critical thinking about unrealistic standards.' },
      { title: 'Cultural & Religious Perspectives',icon: '🕌',  minAge: 12, content: 'How different cultures and religions approach sexuality. Respecting diversity while upholding universal human rights.' },
      { title: 'Sexual Violence & Trauma',         icon: '🆘',  minAge: 13, content: 'Understanding sexual assault, coercion, and harassment. Resources for survivors and trauma-informed approaches to healing.' },
    ],
  },
  {
    id: 5, icon: '✨', color: '#FF8C42', bg: '#FFF8F3',
    title: 'Sexual Wellness & Pleasure', subtitle: 'Positive Dimensions of Health',
    description: 'Sexual health includes well-being, not just avoiding harm.',
    minAge: 14,
    topics: [
      { title: 'Sexual Response Cycle',    icon: '💫', minAge: 16, content: 'How the body responds to arousal: desire, excitement, plateau, orgasm, and resolution. Understanding these stages normalizes experiences.' },
      { title: 'De-stigmatizing Pleasure', icon: '🌸', minAge: 16, content: 'Sexual health is not just about avoiding problems — personal satisfaction and well-being are legitimate, healthy goals.' },
      { title: 'Common Myths Debunked',   icon: '🚫', minAge: 14, content: 'Tackling misinformation: virginity myths, size myths, normal body standards, and what genuinely healthy sexuality looks like.' },
      { title: 'Self-Exploration',         icon: '🔍', minAge: 16, content: 'Normalizing self-exploration as a healthy, private part of sexuality. Addressing shame and understanding personal boundaries.' },
      { title: 'Sexual Compatibility',     icon: '💞', minAge: 18, content: 'How partners communicate about desires, mismatched libidos, and navigate differences with respect and honesty.' },
      { title: 'Aging & Sexuality',        icon: '🌅', minAge: 16, content: 'How sexuality evolves from young adulthood through later life. Addressing misconceptions and celebrating intimacy at every age.' },
    ],
  },
  {
    id: 6, icon: '🧠', color: '#26C6DA', bg: '#F0FDFF',
    title: 'Mental Health & Sexuality', subtitle: 'Mind–Body Connection',
    description: 'The psychological dimensions of sexual well-being.',
    minAge: 14,
    topics: [
      { title: 'Sexual Anxiety',              icon: '😰', minAge: 14, content: 'Performance anxiety, body shame, and fear of intimacy. How mental health shapes sexual experience — and where to find support.' },
      { title: 'Trauma & Intimacy',           icon: '🤝', minAge: 14, content: 'How past trauma can affect relationships and intimacy. Healing through trauma-informed therapy and compassionate care.' },
      { title: 'Pornography & Mental Health', icon: '💻', minAge: 16, content: 'How pornography shapes expectations and relationships. Recognizing compulsive patterns and building healthier habits.' },
      { title: 'Compulsive Sexual Behavior',  icon: '🔄', minAge: 18, content: 'When sexual behavior causes distress. Distinguishing healthy sexuality from compulsive patterns that need professional support.' },
      { title: 'Mindfulness & Intimacy',      icon: '🧘', minAge: 14, content: 'How mindfulness practices improve sexual well-being — reducing pressure and increasing presence, connection, and pleasure.' },
      { title: 'Therapy & Support',           icon: '🛋️', minAge: 14, content: 'When and how to seek professional help: therapists, sex therapists, counselors, and trusted healthcare providers.' },
    ],
  },
];

// ─── Legal Rules Data ────────────────────────────────────────────────────────
const LEGAL_RULES = [
  {
    category: 'Rape Laws (India)',
    icon: '⚖️', color: '#E53935', bg: '#FFF5F5',
    laws: [
      { title: 'IPC Section 375 & 376', desc: 'Rape is defined as non-consensual sexual intercourse. Punishment: 7 years to life imprisonment, or death in extreme cases.' },
      { title: 'Criminal Law Amendment Act 2013', desc: 'After Nirbhaya case — expanded definition of rape, mandatory minimum 7-year sentence, fast-track courts for trial within 2 months.' },
      { title: 'Marital Rape', desc: 'Non-consensual sex within marriage is recognized as rape when wife is under 18. Advocacy continues for full marital rape criminalization.' },
      { title: 'Gang Rape (Section 376D)', desc: 'Rape by two or more persons carries minimum 20 years rigorous imprisonment, extendable to life.' },
    ],
  },
  {
    category: 'POCSO Act (Child Protection)',
    icon: '🧒', color: '#7B61FF', bg: '#F5F0FF',
    laws: [
      { title: 'Protection of Children from Sexual Offences Act 2012', desc: 'Protects children under 18 from sexual abuse, harassment, and pornography. Gender-neutral law covering both boys and girls.' },
      { title: 'Penetrative Sexual Assault (Sec 4)', desc: 'Minimum 10 years imprisonment, up to life. Aggravated cases (by authority figures) carry 20 years to life.' },
      { title: 'Sexual Harassment of Children (Sec 11)', desc: 'Showing pornography, stalking, exposing genitals to a child — punishable by up to 3 years imprisonment.' },
      { title: 'Mandatory Reporting', desc: 'Any person (teacher, doctor, neighbor) who knows of child abuse MUST report to police within 24 hours. Failure is itself a crime (Sec 21).' },
      { title: 'Child Pornography (Sec 13-15)', desc: 'Using, storing, distributing sexual images of children carries up to 5 years imprisonment. Zero tolerance.' },
    ],
  },
  {
    category: 'Child Abuse Rules',
    icon: '🛡️', color: '#4ECDC4', bg: '#F0FFFE',
    laws: [
      { title: 'What Counts as Child Abuse', desc: 'Physical abuse, emotional abuse, neglect, and sexual abuse — all are criminal offences under IPC and POCSO. Children have the right to safety.' },
      { title: 'Reporting Child Abuse', desc: 'Call CHILDLINE: 1098 (24/7, free). Call Women Helpline: 181. File FIR at nearest police station. Police cannot refuse to register.' },
      { title: 'Child Cannot Consent', desc: 'By law, a child under 18 CANNOT consent to sexual activity. Any sexual contact with a minor is a crime, even if the child says "yes".' },
      { title: 'Online Child Abuse', desc: 'Grooming children online, sending explicit messages, video exploitation — all are criminal offences under IT Act and POCSO.' },
      { title: 'Rights of the Survivor', desc: 'Survivor is entitled to free legal aid, medical examination (within 24 hrs), special court trial, compensation, and identity protection.' },
    ],
  },
  {
    category: 'Global Standards',
    icon: '🌍', color: '#F7B731', bg: '#FFFBF0',
    laws: [
      { title: 'UN Convention on Rights of the Child', desc: 'Article 34: Protects children from all sexual exploitation and abuse worldwide. Ratified by 196 countries.' },
      { title: 'WHO Definition of Sexual Violence', desc: 'Any sexual act, attempt, or coercion against a person\'s will. Includes psychological coercion — not just physical force.' },
      { title: 'Age of Consent (International)', desc: 'Varies by country (14–18 years). In India it is 18. Any sexual activity below the age of consent is statutory rape.' },
    ],
  },
];

// ─── Good Touch / Bad Touch Lesson Steps ────────────────────────────────────
const TOUCH_STEPS = [
  {
    id: 1,
    title: '🟢 What is a GOOD Touch?',
    color: '#4ECDC4',
    icon: '🤗',
    body: 'A good touch makes you feel SAFE, HAPPY, and COMFORTABLE. Examples: A hug from mom or dad when you want it. A high-five from a friend. A doctor checking your ears during a check-up.',
    visual: ['🤗 Family hugs', '✋ High-fives', '🩺 Doctor check-ups', '🤝 Handshakes'],
    safe: true,
  },
  {
    id: 2,
    title: '🔴 What is a BAD Touch?',
    color: '#FF6B9D',
    icon: '🚫',
    body: 'A bad touch makes you feel SCARED, CONFUSED, or UNCOMFORTABLE. Your private parts are covered by your swimsuit/underwear. NOBODY should touch those parts except a doctor with your parent present.',
    visual: ['🚫 Private parts', '😨 Any touch that hurts', '😣 Any touch that confuses you', '🙅 Any touch you don\'t want'],
    safe: false,
  },
  {
    id: 3,
    title: '🗣️ What Should You DO?',
    color: '#7B61FF',
    icon: '💪',
    body: 'If anyone gives you a bad touch: SAY NO loudly. RUN AWAY if you can. TELL a trusted adult right away — mom, dad, teacher, or any adult you trust. YOU will NEVER be in trouble for telling.',
    visual: ['🗣️ Say NO!', '🏃 Run away', '📣 Tell an adult', '✅ You are BRAVE'],
    safe: true,
  },
  {
    id: 4,
    title: '🤫 Secrets vs Surprises',
    color: '#FF8C42',
    icon: '🤫',
    body: 'GOOD surprises (like birthday gifts) make everyone happy and are told soon. BAD secrets make you feel scared or sad inside. If an adult asks you to keep a touch SECRET — that is a warning sign. Always tell a trusted person.',
    visual: ['🎁 Surprise = OK', '🤫 Secret touch = NOT OK', '😟 Scared feeling = Tell someone', '💛 You are not alone'],
    safe: false,
  },
  {
    id: 5,
    title: '📱 Online Safety Too!',
    color: '#26C6DA',
    icon: '📱',
    body: 'Bad touch can happen online too! If someone online asks for your photo, asks to meet alone, or makes you feel uncomfortable — STOP and TELL a parent right away. Block that person immediately.',
    visual: ['📵 No private photos', '🚫 No secret meetings', '👨‍👩‍👧 Tell parents', '🔒 Block & report'],
    safe: true,
  },
];

// ─── Simulated 18+ Content (Reel Guard Demo) ────────────────────────────────
const DEMO_REELS = [
  { id: 1, title: '🌸 Nature Walk Vlog', safe: true,  thumbnail: '🌳', creator: '@nature_girl', likes: '12K' },
  { id: 2, title: '🍳 Easy Breakfast Recipe', safe: true,  thumbnail: '🍳', creator: '@cooking_mom', likes: '8.4K' },
  { id: 3, title: '⚠️ Adult Content', safe: false, thumbnail: '🔞', creator: '@restricted', likes: '—' },
  { id: 4, title: '💃 Dance Challenge', safe: true,  thumbnail: '🎵', creator: '@dance_kids', likes: '34K' },
  { id: 5, title: '🚨 Explicit Video', safe: false, thumbnail: '🔞', creator: '@blocked', likes: '—' },
  { id: 6, title: '📚 Study With Me', safe: true,  thumbnail: '📖', creator: '@student_life', likes: '5.2K' },
];

// ─── Keyframe injection ──────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById('sexed-keyframes')) return;
  const s = document.createElement('style');
  s.id = 'sexed-keyframes';
  s.textContent = `
    @keyframes sexed-fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes sexed-warnPop  { 0%{transform:scale(0.65);opacity:0} 65%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }
    @keyframes sexed-wiggle   { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-14deg)} 75%{transform:rotate(14deg)} }
    @keyframes sexed-shake    { 0%,100%{transform:translateX(0)} 25%,75%{transform:translateX(-8px)} 50%{transform:translateX(8px)} }
    @keyframes sexed-glowPulse{ 0%,100%{box-shadow:0 0 0 0 rgba(78,205,196,0.5)} 50%{box-shadow:0 0 0 18px rgba(78,205,196,0)} }
    @keyframes sexed-toastIn  { from{opacity:0;transform:translateX(110px)} to{opacity:1;transform:translateX(0)} }
    @keyframes sexed-spin     { to{transform:rotate(360deg)} }
    @keyframes sexed-blink    { 0%,100%{opacity:1} 50%{opacity:0.3} }
    @keyframes sexed-slideIn  { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
    .sexed-mc { transition: transform 0.26s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.26s ease !important; }
    .sexed-mc:hover { transform: translateY(-7px) !important; box-shadow: 0 18px 44px rgba(0,0,0,0.13) !important; }
  `;
  document.head.appendChild(s);
};

// ═══════════════════════════════════════════════════════════════
//  SHARED SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════
function CountdownRing({ remaining, total = 5, size = 80, color = '#f44336' }) {
  const r    = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={6} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={circ} strokeDashoffset={circ - (circ * remaining / total)}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
    </svg>
  );
}

function AgeBadge({ userAge, minAge }) {
  const ok = userAge >= minAge;
  return (
    <Chip
      icon={ok ? <CheckCircleOutlineIcon sx={{ fontSize: 14 }} /> : <LockIcon sx={{ fontSize: 13 }} />}
      label={`${minAge}+`} size="small"
      sx={{
        height: 22, fontSize: '0.72rem', fontWeight: 700,
        bgcolor: ok ? alpha('#4ECDC4', 0.13) : alpha('#f44336', 0.13),
        color:   ok ? '#2bb5ac'             : '#e05555',
        border:  `1px solid ${ok ? alpha('#4ECDC4', 0.38) : alpha('#f44336', 0.38)}`,
        '& .MuiChip-icon': { color: 'inherit' },
      }}
    />
  );
}

function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 4000); return () => clearTimeout(t); }, [onDone]);
  const palette = { success: ['#0d2b1e','#4ECDC4'], warn: ['#2b1c06','#F7B731'], info: ['#0d1424','#7B61FF'], error: ['#2b0606','#f44336'] };
  const [bg, border] = palette[type] || palette.info;
  const icons = { success: '✅', warn: '⚠️', info: 'ℹ️', error: '🚨' };
  return (
    <Box sx={{
      position: 'fixed', top: 18, right: 18, zIndex: 2000,
      bgcolor: bg, border: `1.5px solid ${border}`,
      color: '#fff', borderRadius: 3, p: '13px 18px',
      fontSize: '0.85rem', maxWidth: 330,
      boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
      animation: 'sexed-toastIn 0.3s ease',
      display: 'flex', alignItems: 'center', gap: 1.5,
    }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>{icons[type]}</span>
      <span>{msg}</span>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════
//  AGE GATE
// ═══════════════════════════════════════════════════════════════
function AgeGate({ onVerify, parentEmail, setParentEmail }) {
  const [dob, setDob]     = useState({ day: '', month: '', year: '' });
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailStep, setEmailStep] = useState(false);

  useEffect(() => { injectStyles(); }, []);

  const verify = () => {
    const { day, month, year } = dob;
    if (!day || !month || !year || String(year).length < 4) {
      setError('Please fill in all three fields with a complete date.');
      setShake(true); setTimeout(() => setShake(false), 620);
      return;
    }
    const birth = new Date(`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`);
    if (isNaN(birth.getTime())) { setError('That doesn\'t look like a valid date.'); return; }
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
    if (age < 5 || age > 115) { setError('Please enter a real date of birth.'); return; }
    if (age < 18 && !parentEmail) { setEmailStep(true); return; }
    setLoading(true);
    setTimeout(() => onVerify(age), 700);
  };

  const submitEmail = () => {
    if (!parentEmail || !parentEmail.includes('@')) { setError('Please enter a valid parent email address.'); return; }
    setLoading(true);
    const { day, month, year } = dob;
    const birth = new Date(`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
    setTimeout(() => onVerify(age), 700);
  };

  const setField = (k, v, max) => { setError(''); setDob(p => ({ ...p, [k]: v.slice(0, max) })); };

  const tiers = [
    { age: 10, label: 'Basic content', color: '#4ECDC4' },
    { age: 13, label: 'Most modules',  color: '#7B61FF' },
    { age: 16, label: 'Advanced',      color: '#FF8C42' },
    { age: 18, label: 'All content',   color: '#FF6B9D' },
  ];

  return (
    <Box sx={{
      minHeight: '80vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', px: 2,
      background: 'linear-gradient(145deg,#080515,#13092a,#071820)',
    }}>
      {/* Background orbs */}
      {[['#FF6B9D','15%','20%'],['#4ECDC4','80%','75%'],['#7B61FF','55%','15%']].map(([c,x,y],i)=>(
        <Box key={i} sx={{ position:'fixed', width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle,${c}16 0%,transparent 70%)`, left:x, top:y, transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:0 }} />
      ))}

      <Box sx={{
        position:'relative', zIndex:1,
        bgcolor:'rgba(255,255,255,0.04)', backdropFilter:'blur(28px)',
        border:'1px solid rgba(255,255,255,0.11)', borderRadius:5,
        p:{ xs:4, md:6 }, maxWidth:440, width:'100%', textAlign:'center',
        animation:'sexed-fadeUp 0.55s ease',
      }}>
        <Box sx={{ width:72, height:72, background:'linear-gradient(135deg,#4ECDC4,#7B61FF)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.1rem', mx:'auto', mb:3, boxShadow:'0 0 0 12px rgba(78,205,196,0.12)' }}>🌿</Box>

        {!emailStep ? (
          <>
            <Typography variant="h5" sx={{ color:'#fff', fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>Age Verification</Typography>
            <Typography sx={{ color:'rgba(255,255,255,0.5)', fontSize:'0.88rem', lineHeight:1.75, mb:4 }}>
              This platform delivers sexual education content.<br />
              Some modules are age-gated for your protection.<br />
              <Box component="strong" sx={{ color:'rgba(255,255,255,0.75)' }}>Enter your date of birth to continue.</Box>
            </Typography>

            {/* DOB inputs */}
            <Box sx={{ display:'grid', gridTemplateColumns:'1fr 1fr 1.5fr', gap:1.2, mb:2, animation: shake ? 'sexed-shake 0.6s ease' : 'none' }}>
              {[{k:'day',ph:'DD',mx:2},{k:'month',ph:'MM',mx:2},{k:'year',ph:'YYYY',mx:4}].map(f=>(
                <Box key={f.k}>
                  <Box component="input" type="number" placeholder={f.ph} value={dob[f.k]}
                    onChange={e => setField(f.k, e.target.value, f.mx)}
                    onKeyDown={e => e.key === 'Enter' && verify()}
                    sx={{ width:'100%', bgcolor:'rgba(255,255,255,0.08)', border:'1.5px solid rgba(255,255,255,0.16)', borderRadius:2, p:'15px 8px', color:'#fff', fontSize:'1.1rem', textAlign:'center', outline:'none', fontFamily:'inherit', '&:focus':{borderColor:'rgba(78,205,196,0.65)'}, WebkitAppearance:'none', MozAppearance:'textfield' }}
                  />
                  <Typography sx={{ color:'rgba(255,255,255,0.3)', fontSize:'0.68rem', textTransform:'uppercase', letterSpacing:0.5, mt:0.4 }}>{f.ph}</Typography>
                </Box>
              ))}
            </Box>

            {error && <Alert severity="error" sx={{ mb:2, bgcolor:'rgba(211,47,47,0.15)', color:'#ff8888', border:'1px solid rgba(211,47,47,0.3)', fontSize:'0.82rem' }}>{error}</Alert>}

            <Button fullWidth variant="contained" onClick={verify} disabled={loading}
              sx={{ py:1.8, borderRadius:99, background:'linear-gradient(135deg,#4ECDC4,#26C6DA)', animation: loading ? 'none' : 'sexed-glowPulse 2.2s infinite', fontFamily:'"Playfair Display",serif', fontSize:'1rem', fontWeight:700, textTransform:'none', boxShadow:'none', '&:hover':{ boxShadow:'none', opacity:0.9 } }}>
              {loading ? 'Verifying…' : 'Verify Age & Enter →'}
            </Button>

            <Box sx={{ mt:3, display:'flex', justifyContent:'center', gap:1, flexWrap:'wrap' }}>
              {tiers.map(t=>(
                <Chip key={t.age} label={`${t.age}+: ${t.label}`} size="small"
                  sx={{ bgcolor:`${t.color}18`, border:`1px solid ${t.color}40`, color:'rgba(255,255,255,0.6)', fontSize:'0.7rem' }} />
              ))}
            </Box>
            <Typography sx={{ color:'rgba(255,255,255,0.22)', fontSize:'0.72rem', mt:2.5, lineHeight:1.6 }}>
              Your date of birth is used only for age verification and is never stored.
            </Typography>
          </>
        ) : (
          <>
            <Box sx={{ fontSize:'2.4rem', mb:1 }}>📧</Box>
            <Typography variant="h6" sx={{ color:'#fff', fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>Parent / Guardian Email</Typography>
            <Typography sx={{ color:'rgba(255,255,255,0.55)', fontSize:'0.85rem', lineHeight:1.75, mb:3 }}>
              Since you are under 18, we'll send your parent/guardian an email whenever age-restricted content is accessed. This keeps you safe!
            </Typography>
            <TextField
              fullWidth
              label="Parent's Email Address"
              type="email"
              value={parentEmail}
              onChange={e => { setError(''); setParentEmail(e.target.value); }}
              sx={{ mb:2, '& .MuiInputBase-root':{ bgcolor:'rgba(255,255,255,0.08)', borderRadius:2, color:'#fff' }, '& .MuiInputLabel-root':{ color:'rgba(255,255,255,0.5)' }, '& .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(255,255,255,0.16)' } }}
            />
            {error && <Alert severity="error" sx={{ mb:2, bgcolor:'rgba(211,47,47,0.15)', color:'#ff8888', border:'1px solid rgba(211,47,47,0.3)', fontSize:'0.82rem' }}>{error}</Alert>}
            <Box sx={{ display:'flex', gap:1.5 }}>
              <Button variant="outlined" onClick={() => setEmailStep(false)}
                sx={{ flex:1, borderRadius:99, textTransform:'none', borderColor:'rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.7)' }}>← Back</Button>
              <Button variant="contained" onClick={submitEmail} disabled={loading}
                sx={{ flex:2, py:1.5, borderRadius:99, background:'linear-gradient(135deg,#4ECDC4,#26C6DA)', textTransform:'none', fontWeight:700, boxShadow:'none' }}>
                {loading ? 'Setting up…' : 'Save & Continue →'}
              </Button>
            </Box>
            <Typography sx={{ color:'rgba(255,255,255,0.3)', fontSize:'0.7rem', mt:2 }}>We'll only email your parent when blocked content is attempted.</Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════
//  BLOCKED OVERLAY (auto-close + parent alert)
// ═══════════════════════════════════════════════════════════════
function BlockedOverlay({ topic, userAge, parentEmail, onClose, onEmailSent }) {
  const [count, setCount] = useState(5);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCount(c => { if (c <= 1) { clearInterval(t); onClose(); return 0; } return c - 1; });
    }, 1000);
    // Simulate parent email
    if (parentEmail) {
      setTimeout(() => { setEmailSent(true); onEmailSent && onEmailSent(topic.title); }, 1200);
    }
    return () => clearInterval(t);
  }, [onClose, parentEmail, topic.title, onEmailSent]);

  return (
    <Box sx={{
      position:'fixed', inset:0, zIndex:1400,
      bgcolor:'rgba(0,0,0,0.93)', backdropFilter:'blur(16px)',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:'inherit', p:2,
    }}>
      {/* Red glow blob */}
      <Box sx={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(244,67,54,0.16) 0%,transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }} />

      <Box sx={{
        position:'relative',
        background:'linear-gradient(150deg,#1c0404,#2a0808)',
        border:'2px solid rgba(244,67,54,0.65)', borderRadius:5,
        p:{ xs:4, md:6 }, maxWidth:480, width:'100%', textAlign:'center',
        boxShadow:'0 0 100px rgba(244,67,54,0.25)',
        animation:'sexed-warnPop 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <Typography sx={{ fontSize:'4.5rem', mb:2, animation:'sexed-wiggle 0.5s ease 0.6s 2' }}>🚫</Typography>

        <Chip label="ACCESS BLOCKED" sx={{ bgcolor:'#f44336', color:'#fff', fontWeight:800, letterSpacing:2, mb:2, fontSize:'0.72rem' }} />

        <Typography variant="h6" sx={{ color:'#fff', fontFamily:'"Playfair Display",serif', mb:1 }}>"{topic.title}"</Typography>

        <Box sx={{ bgcolor:'rgba(244,67,54,0.12)', border:'1px solid rgba(244,67,54,0.28)', borderRadius:3, p:2.5, mb:3 }}>
          <Typography sx={{ color:'rgba(255,255,255,0.88)', fontSize:'0.88rem', lineHeight:1.85 }}>
            This topic is restricted to ages <Box component="strong" sx={{ color:'#ffaa55' }}>{topic.minAge}+</Box>.<br />
            Your verified age is <Box component="strong" sx={{ color:'#4ECDC4' }}>{userAge} years old</Box>.<br />
            <Box component="span" sx={{ color:'rgba(255,255,255,0.5)', fontSize:'0.8rem' }}>Content automatically closed for your protection.</Box>
          </Typography>
        </Box>

        {/* Parent email notification */}
        {parentEmail && (
          <Box sx={{ bgcolor: emailSent ? 'rgba(78,205,196,0.12)' : 'rgba(255,165,0,0.1)', border:`1px solid ${emailSent ? 'rgba(78,205,196,0.35)' : 'rgba(255,165,0,0.3)'}`, borderRadius:2.5, p:1.8, mb:2.5, display:'flex', alignItems:'center', gap:1.5 }}>
            <EmailIcon sx={{ color: emailSent ? '#4ECDC4' : '#FFA500', flexShrink:0 }} />
            <Typography sx={{ color:'rgba(255,255,255,0.8)', fontSize:'0.82rem', textAlign:'left' }}>
              {emailSent
                ? `✅ Your parent (${parentEmail}) has been notified of this access attempt.`
                : `⏳ Sending notification to your parent (${parentEmail})…`}
            </Typography>
          </Box>
        )}

        {/* Countdown ring */}
        <Box sx={{ position:'relative', width:84, height:84, mx:'auto', mb:1.5 }}>
          <CountdownRing remaining={count} total={5} size={84} />
          <Box sx={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'1.6rem', fontWeight:800, fontFamily:'"Playfair Display",serif' }}>{count}</Box>
        </Box>

        <Typography sx={{ color:'rgba(255,255,255,0.38)', fontSize:'0.82rem', mb:3 }}>
          Closing in {count} second{count !== 1 ? 's' : ''}…
        </Typography>

        <Button variant="outlined" onClick={onClose}
          sx={{ borderRadius:99, borderColor:'rgba(255,255,255,0.22)', color:'rgba(255,255,255,0.7)', textTransform:'none', '&:hover':{ borderColor:'rgba(255,255,255,0.45)', bgcolor:'rgba(255,255,255,0.08)' } }}>
          ← Return to Module
        </Button>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════
//  LEGAL RULES SECTION
// ═══════════════════════════════════════════════════════════════
function LegalRulesSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <Box sx={{ animation:'sexed-fadeUp 0.4s ease' }}>
      <Box sx={{ textAlign:'center', mb:5 }}>
        <Box sx={{ display:'inline-flex', alignItems:'center', gap:1.5, bgcolor:'rgba(229,57,53,0.1)', border:'1px solid rgba(229,57,53,0.3)', borderRadius:99, px:2.5, py:1, mb:2 }}>
          <GavelIcon sx={{ color:'#E53935', fontSize:20 }} />
          <Typography sx={{ color:'#E53935', fontWeight:700, fontSize:'0.85rem', letterSpacing:0.5 }}>LEGAL PROTECTION</Typography>
        </Box>
        <Typography variant="h4" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>Know Your Rights & the Law</Typography>
        <Typography color="text.secondary" sx={{ fontSize:'0.92rem', maxWidth:550, mx:'auto', lineHeight:1.7 }}>
          Understanding legal protections helps you recognize abuse, report it, and seek justice. The law is on your side.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {LEGAL_RULES.map((cat, ci) => (
          <Grid item xs={12} md={6} key={ci}>
            <Card sx={{ border:`2px solid ${alpha(cat.color, 0.25)}`, boxShadow:`0 4px 20px ${alpha(cat.color, 0.1)}`, overflow:'hidden' }}>
              {/* Category header */}
              <Box sx={{ bgcolor: alpha(cat.color, 0.08), borderBottom:`1px solid ${alpha(cat.color, 0.2)}`, p:2.5, display:'flex', alignItems:'center', gap:1.5 }}>
                <Typography sx={{ fontSize:'1.8rem' }}>{cat.icon}</Typography>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700, color:cat.color }}>{cat.category}</Typography>
                  <Typography sx={{ fontSize:'0.75rem', color:'text.secondary' }}>{cat.laws.length} laws / rules</Typography>
                </Box>
              </Box>

              <CardContent sx={{ p:0 }}>
                {cat.laws.map((law, li) => (
                  <Box key={li} sx={{ borderBottom: li < cat.laws.length-1 ? '1px solid' : 'none', borderColor:'divider' }}>
                    <Box
                      onClick={() => setExpanded(expanded === `${ci}-${li}` ? null : `${ci}-${li}`)}
                      sx={{ px:2.5, py:1.8, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', gap:1, '&:hover':{ bgcolor: alpha(cat.color, 0.04) }, transition:'background 0.2s' }}
                    >
                      <Box sx={{ display:'flex', alignItems:'center', gap:1.2, flex:1 }}>
                        <Box sx={{ width:8, height:8, borderRadius:'50%', bgcolor:cat.color, flexShrink:0 }} />
                        <Typography sx={{ fontWeight:600, fontSize:'0.88rem' }}>{law.title}</Typography>
                      </Box>
                      <Typography sx={{ color:'text.disabled', fontSize:'1rem', flexShrink:0 }}>
                        {expanded === `${ci}-${li}` ? '▲' : '▼'}
                      </Typography>
                    </Box>
                    <Collapse in={expanded === `${ci}-${li}`}>
                      <Box sx={{ px:3, pb:2.5, pt:0.5, bgcolor: alpha(cat.color, 0.03) }}>
                        <Typography color="text.secondary" sx={{ fontSize:'0.85rem', lineHeight:1.8 }}>{law.desc}</Typography>
                      </Box>
                    </Collapse>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Emergency contacts */}
      <Box sx={{ mt:4, p:3, borderRadius:4, background:'linear-gradient(135deg,rgba(229,57,53,0.1),rgba(123,97,255,0.1))', border:'1px solid rgba(229,57,53,0.2)' }}>
        <Typography variant="h6" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700, mb:2, display:'flex', alignItems:'center', gap:1 }}>
          <WarningAmberIcon sx={{ color:'#E53935' }} /> Emergency Help Lines (India)
        </Typography>
        <Grid container spacing={2}>
          {[
            ['1098','CHILDLINE (24/7, Free)','#4ECDC4'],
            ['181','Women Helpline','#FF6B9D'],
            ['100','Police Emergency','#F7B731'],
            ['112','National Emergency','#7B61FF'],
          ].map(([num,label,color])=>(
            <Grid item xs={6} sm={3} key={num}>
              <Box sx={{ textAlign:'center', p:2, borderRadius:3, bgcolor: alpha(color, 0.1), border:`1px solid ${alpha(color, 0.3)}` }}>
                <Typography sx={{ fontSize:'1.7rem', fontWeight:800, color, fontFamily:'"Playfair Display",serif' }}>{num}</Typography>
                <Typography sx={{ fontSize:'0.75rem', color:'text.secondary', mt:0.3, lineHeight:1.4 }}>{label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════
//  GOOD TOUCH / BAD TOUCH AI VIDEO LESSON
// ═══════════════════════════════════════════════════════════════
function GoodBadTouchLesson({ userAge }) {
  const [step, setStep]       = useState(0);
  const [playing, setPlaying] = useState(false);
  const [done, setDone]       = useState(false);
  const intervalRef           = useRef(null);
  const current               = TOUCH_STEPS[step];

  const startLesson = () => { setPlaying(true); setStep(0); setDone(false); };

  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setStep(prev => {
        if (prev >= TOUCH_STEPS.length - 1) {
          clearInterval(intervalRef.current);
          setPlaying(false);
          setDone(true);
          return prev;
        }
        return prev + 1;
      });
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  return (
    <Box sx={{ animation:'sexed-fadeUp 0.4s ease' }}>
      <Box sx={{ textAlign:'center', mb:5 }}>
        <Box sx={{ display:'inline-flex', alignItems:'center', gap:1.5, bgcolor:'rgba(78,205,196,0.1)', border:'1px solid rgba(78,205,196,0.3)', borderRadius:99, px:2.5, py:1, mb:2 }}>
          <ChildCareIcon sx={{ color:'#4ECDC4', fontSize:20 }} />
          <Typography sx={{ color:'#4ECDC4', fontWeight:700, fontSize:'0.85rem', letterSpacing:0.5 }}>CHILD SAFETY LESSON</Typography>
        </Box>
        <Typography variant="h4" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>Good Touch vs. Bad Touch</Typography>
        <Typography color="text.secondary" sx={{ fontSize:'0.92rem', maxWidth:500, mx:'auto', lineHeight:1.7 }}>
          An AI-powered interactive lesson to teach children about body safety in a safe, friendly way.
        </Typography>
      </Box>

      {!playing && !done && (
        <Box sx={{ textAlign:'center', py:6, px:2 }}>
          <Box sx={{ fontSize:'5rem', mb:3 }}>🎬</Box>
          <Typography variant="h5" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700, mb:1.5 }}>Start the Safety Lesson</Typography>
          <Typography color="text.secondary" sx={{ mb:4, fontSize:'0.9rem' }}>
            A gentle, child-friendly 5-step animated lesson.<br />
            Recommended for ages 5–12 years old.
          </Typography>
          <Button variant="contained" size="large" startIcon={<PlayCircleIcon />}
            onClick={startLesson}
            sx={{ borderRadius:99, px:5, py:1.8, background:'linear-gradient(135deg,#4ECDC4,#26C6DA)', fontWeight:700, fontSize:'1rem', textTransform:'none', boxShadow:'0 8px 24px rgba(78,205,196,0.4)' }}>
            Start AI Lesson
          </Button>
        </Box>
      )}

      {(playing || done) && (
        <Box>
          {/* Progress stepper */}
          <Stepper activeStep={step} alternativeLabel sx={{ mb:4 }}>
            {TOUCH_STEPS.map((s, i) => (
              <Step key={i} completed={i < step || done}>
                <StepLabel sx={{ '& .MuiStepLabel-label':{ fontSize:'0.72rem' } }}>{s.icon}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Lesson card */}
          <Card sx={{
            maxWidth:640, mx:'auto', mb:4,
            border:`3px solid ${alpha(current.color, 0.5)}`,
            boxShadow:`0 12px 48px ${alpha(current.color, 0.25)}`,
            animation:'sexed-slideIn 0.4s ease', overflow:'hidden',
          }}>
            {/* Video-style top bar */}
            <Box sx={{ bgcolor: current.color, px:3, py:1.5, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
                <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor:'rgba(255,255,255,0.5)' }} />
                <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor:'rgba(255,255,255,0.5)' }} />
                <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor:'rgba(255,255,255,0.5)' }} />
              </Box>
              <Typography sx={{ color:'#fff', fontWeight:700, fontSize:'0.8rem' }}>
                {playing && <Box component="span" sx={{ animation:'sexed-blink 1s infinite', mr:1 }}>🔴</Box>}
                {playing ? 'LIVE AI LESSON' : 'LESSON COMPLETE'}
              </Typography>
              <Typography sx={{ color:'rgba(255,255,255,0.7)', fontSize:'0.75rem' }}>Step {step+1}/{TOUCH_STEPS.length}</Typography>
            </Box>

            <CardContent sx={{ p:{ xs:3, md:4 } }}>
              {/* Big emoji */}
              <Box sx={{ fontSize:'5rem', textAlign:'center', mb:2 }}>{current.icon}</Box>

              <Typography variant="h5" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, textAlign:'center', mb:2.5, color:current.color }}>
                {current.title}
              </Typography>

              <Box sx={{ bgcolor: alpha(current.color, 0.07), border:`1px solid ${alpha(current.color, 0.2)}`, borderRadius:3, p:2.5, mb:3 }}>
                <Typography sx={{ fontSize:'0.95rem', lineHeight:1.9, color:'text.primary' }}>{current.body}</Typography>
              </Box>

              {/* Visual examples */}
              <Grid container spacing={1.5}>
                {current.visual.map((v, i) => (
                  <Grid item xs={6} key={i}>
                    <Box sx={{ textAlign:'center', p:1.5, borderRadius:2.5, bgcolor: current.safe ? alpha('#4ECDC4', 0.1) : alpha('#FF6B9D', 0.1), border:`1px solid ${current.safe ? alpha('#4ECDC4', 0.25) : alpha('#FF6B9D', 0.25)}` }}>
                      <Typography sx={{ fontSize:'0.83rem', fontWeight:600, color: current.safe ? '#2bb5ac' : '#d44' }}>{v}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Progress bar (auto-advance) */}
              {playing && (
                <Box sx={{ mt:3 }}>
                  <LinearProgress
                    sx={{ height:5, borderRadius:99, bgcolor: alpha(current.color, 0.15), '& .MuiLinearProgress-bar':{ bgcolor:current.color, animation:'sexed-progress 5s linear' } }}
                  />
                  <Typography sx={{ color:'text.disabled', fontSize:'0.75rem', textAlign:'center', mt:1 }}>Next slide in 5 seconds…</Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <Box sx={{ display:'flex', justifyContent:'center', gap:2, flexWrap:'wrap', mb:4 }}>
            <Button variant="outlined" disabled={step === 0} onClick={() => setStep(s => s - 1)} sx={{ borderRadius:99, textTransform:'none' }}>← Previous</Button>
            {!done ? (
              <Button variant="contained" onClick={() => { if (step < TOUCH_STEPS.length-1) { setStep(s=>s+1); } else { setPlaying(false); setDone(true); } }}
                sx={{ borderRadius:99, textTransform:'none', bgcolor:current.color, '&:hover':{ bgcolor:current.color, opacity:0.85 } }}>
                {step < TOUCH_STEPS.length-1 ? 'Next →' : 'Finish ✓'}
              </Button>
            ) : (
              <Button variant="contained" startIcon={<PlayCircleIcon />} onClick={startLesson}
                sx={{ borderRadius:99, textTransform:'none', background:'linear-gradient(135deg,#4ECDC4,#26C6DA)' }}>
                Watch Again
              </Button>
            )}
          </Box>

          {done && (
            <Box sx={{ textAlign:'center', p:4, borderRadius:4, background:'linear-gradient(135deg,rgba(78,205,196,0.1),rgba(123,97,255,0.1))', border:'1px solid rgba(78,205,196,0.25)' }}>
              <Typography sx={{ fontSize:'2.5rem', mb:1 }}>🎉</Typography>
              <Typography variant="h5" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>Great job! Lesson Complete</Typography>
              <Typography color="text.secondary" sx={{ fontSize:'0.9rem', lineHeight:1.7 }}>
                Remember: Your body belongs to YOU. Say NO to bad touches. Tell a trusted adult. You are BRAVE and SAFE! 💛
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CONTENT GUARD — Reel / Video Simulator
// ═══════════════════════════════════════════════════════════════
function ContentGuard({ userAge, parentEmail, onEmailSent }) {
  const [activeReel, setActiveReel] = useState(null);
  const [guarded, setGuarded]       = useState(null); // reel that was blocked
  const [count, setCount]           = useState(3);
  const [guardActive, setGuardActive] = useState(false);
  const timerRef = useRef(null);

  const playReel = (reel) => {
    if (!reel.safe && userAge < 18) {
      // Immediately block
      setGuarded(reel);
      setGuardActive(true);
      setCount(3);
      onEmailSent && onEmailSent(`Attempted to watch: "${reel.title}"`);
      timerRef.current = setInterval(() => {
        setCount(c => {
          if (c <= 1) { clearInterval(timerRef.current); setGuardActive(false); setGuarded(null); setActiveReel(null); return 3; }
          return c - 1;
        });
      }, 1000);
    } else {
      setActiveReel(reel);
      setGuarded(null);
    }
  };

  return (
    <Box sx={{ animation:'sexed-fadeUp 0.4s ease' }}>
      <Box sx={{ textAlign:'center', mb:5 }}>
        <Box sx={{ display:'inline-flex', alignItems:'center', gap:1.5, bgcolor:'rgba(123,97,255,0.1)', border:'1px solid rgba(123,97,255,0.3)', borderRadius:99, px:2.5, py:1, mb:2 }}>
          <BlockIcon sx={{ color:'#7B61FF', fontSize:20 }} />
          <Typography sx={{ color:'#7B61FF', fontWeight:700, fontSize:'0.85rem', letterSpacing:0.5 }}>CONTENT GUARD</Typography>
        </Box>
        <Typography variant="h4" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>Social Media Content Guard</Typography>
        <Typography color="text.secondary" sx={{ fontSize:'0.92rem', maxWidth:540, mx:'auto', lineHeight:1.7 }}>
          Simulates scrolling reels on Instagram/YouTube. When a child scrolls to an 18+ video, it is <strong>automatically detected and skipped</strong> — just like a real content guardian would work.
        </Typography>
      </Box>

      <Box sx={{ display:'flex', gap:3, flexWrap:'wrap' }}>
        {/* Reel feed */}
        <Box sx={{ flex:1, minWidth:260 }}>
          <Typography variant="subtitle2" sx={{ mb:2, fontWeight:700, display:'flex', alignItems:'center', gap:1 }}>
            📱 Scrolling Reels Feed
            <Chip label={`Age ${userAge}`} size="small" sx={{ bgcolor:alpha('#7B61FF',0.12), color:'#7B61FF', border:`1px solid ${alpha('#7B61FF',0.3)}`, fontSize:'0.7rem' }} />
          </Typography>
          <Box sx={{ display:'flex', flexDirection:'column', gap:1.5 }}>
            {DEMO_REELS.map(reel => (
              <Box key={reel.id}
                onClick={() => playReel(reel)}
                sx={{
                  display:'flex', alignItems:'center', gap:2, p:2, borderRadius:3, cursor:'pointer',
                  border:`2px solid ${!reel.safe && userAge < 18 ? alpha('#f44336',0.3) : alpha('#7B61FF',0.15)}`,
                  bgcolor: !reel.safe && userAge < 18 ? alpha('#f44336',0.05) : activeReel?.id === reel.id ? alpha('#7B61FF',0.08) : 'background.paper',
                  transition:'all 0.2s',
                  '&:hover':{ borderColor: !reel.safe && userAge < 18 ? '#f44336' : '#7B61FF', bgcolor: alpha('#7B61FF',0.06) },
                }}>
                <Box sx={{ width:52, height:52, borderRadius:2.5, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', bgcolor: !reel.safe ? alpha('#f44336',0.1) : alpha('#4ECDC4',0.1), flexShrink:0 }}>{reel.thumbnail}</Box>
                <Box sx={{ flex:1 }}>
                  <Typography sx={{ fontWeight:600, fontSize:'0.88rem', color: !reel.safe && userAge < 18 ? '#e05555' : 'text.primary' }}>{reel.title}</Typography>
                  <Typography sx={{ fontSize:'0.75rem', color:'text.secondary' }}>{reel.creator} · ❤️ {reel.likes}</Typography>
                </Box>
                {!reel.safe && userAge < 18 ? (
                  <Chip icon={<BlockIcon />} label="Blocked" size="small" sx={{ bgcolor:alpha('#f44336',0.12), color:'#f44336', border:`1px solid ${alpha('#f44336',0.3)}`, fontSize:'0.7rem', '& .MuiChip-icon':{ color:'#f44336' } }} />
                ) : (
                  <PlayCircleIcon sx={{ color: activeReel?.id === reel.id ? '#7B61FF' : 'text.disabled', fontSize:28 }} />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Player panel */}
        <Box sx={{ flex:1, minWidth:260 }}>
          <Typography variant="subtitle2" sx={{ mb:2, fontWeight:700 }}>📺 Player</Typography>

          {/* Guard triggered */}
          {guardActive && guarded && (
            <Box sx={{ borderRadius:4, overflow:'hidden', border:'2px solid rgba(244,67,54,0.6)', animation:'sexed-warnPop 0.4s ease' }}>
              <Box sx={{ bgcolor:'#f44336', px:2.5, py:1.5, display:'flex', alignItems:'center', gap:1 }}>
                <BlockIcon sx={{ color:'#fff', fontSize:20 }} />
                <Typography sx={{ color:'#fff', fontWeight:700, fontSize:'0.85rem' }}>🚨 CONTENT GUARD ACTIVATED</Typography>
              </Box>
              <Box sx={{ bgcolor:'rgba(244,67,54,0.08)', p:3, textAlign:'center' }}>
                <Typography sx={{ fontSize:'3rem', mb:1 }}>🚫</Typography>
                <Typography sx={{ fontWeight:700, mb:0.5, color:'error.main' }}>18+ Video Detected & Skipped!</Typography>
                <Typography color="text.secondary" sx={{ fontSize:'0.83rem', mb:2 }}>"{guarded.title}" is not appropriate for your age ({userAge}).</Typography>
                <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap:1, mb:2 }}>
                  <CountdownRing remaining={count} total={3} size={60} color="#f44336" />
                  <Typography sx={{ fontWeight:700, color:'error.main' }}>Auto-skipping in {count}s</Typography>
                </Box>
                {parentEmail && (
                  <Box sx={{ bgcolor:alpha('#4ECDC4',0.1), border:`1px solid ${alpha('#4ECDC4',0.3)}`, borderRadius:2, p:1.5, display:'flex', alignItems:'center', gap:1 }}>
                    <EmailIcon sx={{ color:'#4ECDC4', fontSize:18 }} />
                    <Typography sx={{ fontSize:'0.78rem', color:'text.secondary' }}>Parent notified at {parentEmail}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {/* Active safe reel */}
          {activeReel && !guardActive && (
            <Box sx={{ borderRadius:4, overflow:'hidden', border:`2px solid ${alpha('#4ECDC4',0.4)}`, animation:'sexed-slideIn 0.3s ease' }}>
              <Box sx={{ bgcolor:'#4ECDC4', px:2.5, py:1.5, display:'flex', alignItems:'center', gap:1 }}>
                <CheckCircleIcon sx={{ color:'#fff', fontSize:20 }} />
                <Typography sx={{ color:'#fff', fontWeight:700, fontSize:'0.85rem' }}>✅ Safe Content — Playing</Typography>
              </Box>
              <Box sx={{ p:3, textAlign:'center' }}>
                <Box sx={{ fontSize:'5rem', mb:2, animation:'sexed-blink 2s infinite' }}>{activeReel.thumbnail}</Box>
                <Typography variant="h6" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700, mb:0.5 }}>{activeReel.title}</Typography>
                <Typography color="text.secondary" sx={{ fontSize:'0.83rem', mb:2 }}>{activeReel.creator} · ❤️ {activeReel.likes}</Typography>
                <LinearProgress sx={{ borderRadius:99, height:4, bgcolor:alpha('#4ECDC4',0.15), '& .MuiLinearProgress-bar':{ bgcolor:'#4ECDC4' } }} />
                <Typography sx={{ color:'text.disabled', fontSize:'0.75rem', mt:1 }}>Playing… ▶</Typography>
              </Box>
            </Box>
          )}

          {!activeReel && !guardActive && (
            <Box sx={{ borderRadius:4, border:'2px dashed', borderColor:'divider', p:5, textAlign:'center' }}>
              <Typography sx={{ fontSize:'2.5rem', mb:1.5 }}>📱</Typography>
              <Typography color="text.secondary" sx={{ fontSize:'0.88rem' }}>Click a reel on the left to play it.<br/>18+ content will be automatically blocked.</Typography>
            </Box>
          )}

          {/* Info box */}
          <Box sx={{ mt:2.5, p:2, borderRadius:3, bgcolor:alpha('#F7B731',0.08), border:`1px solid ${alpha('#F7B731',0.25)}` }}>
            <Typography sx={{ fontWeight:700, fontSize:'0.82rem', mb:0.8, color:'#c8961c', display:'flex', alignItems:'center', gap:0.8 }}>
              💡 How Content Guard Works
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize:'0.78rem', lineHeight:1.75 }}>
              Just like when your child scrolls Instagram reels and an adult video auto-plays — this system <strong>detects it instantly</strong> and skips to the next safe video, then sends a notification to the parent's email so they are aware.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PARENT EMAIL ALERT PANEL
// ═══════════════════════════════════════════════════════════════
function ParentAlertPanel({ parentEmail, setParentEmail, alerts }) {
  const [input, setInput]   = useState(parentEmail || '');
  const [saved, setSaved]   = useState(!!parentEmail);
  const [sending, setSending] = useState(false);

  const save = () => {
    if (!input.includes('@')) return;
    setParentEmail(input);
    setSaved(true);
    setSending(true);
    setTimeout(() => setSending(false), 1500);
  };

  return (
    <Box sx={{ animation:'sexed-fadeUp 0.4s ease' }}>
      <Box sx={{ textAlign:'center', mb:5 }}>
        <Box sx={{ display:'inline-flex', alignItems:'center', gap:1.5, bgcolor:'rgba(255,107,157,0.1)', border:'1px solid rgba(255,107,157,0.3)', borderRadius:99, px:2.5, py:1, mb:2 }}>
          <EmailIcon sx={{ color:'#FF6B9D', fontSize:20 }} />
          <Typography sx={{ color:'#FF6B9D', fontWeight:700, fontSize:'0.85rem', letterSpacing:0.5 }}>PARENT ALERT SYSTEM</Typography>
        </Box>
        <Typography variant="h4" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, mb:1 }}>Parent Notification Center</Typography>
        <Typography color="text.secondary" sx={{ fontSize:'0.92rem', maxWidth:520, mx:'auto', lineHeight:1.7 }}>
          Whenever a child tries to access age-restricted content, an automatic email is sent to the registered parent or guardian.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Email setup */}
        <Grid item xs={12} md={5}>
          <Card sx={{ border:`2px solid ${alpha('#FF6B9D',0.25)}`, boxShadow:`0 4px 24px ${alpha('#FF6B9D',0.1)}`, p:3 }}>
            <Box sx={{ display:'flex', alignItems:'center', gap:1.2, mb:3 }}>
              <EmailIcon sx={{ color:'#FF6B9D' }} />
              <Typography variant="subtitle1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700 }}>Parent Email Setup</Typography>
            </Box>

            <TextField fullWidth label="Parent / Guardian Email" type="email"
              value={input} onChange={e => { setInput(e.target.value); setSaved(false); }}
              sx={{ mb:2 }} size="small"
            />

            <Button fullWidth variant="contained" startIcon={saved ? <CheckCircleIcon /> : <SendIcon />}
              onClick={save}
              disabled={!input.includes('@')}
              sx={{ borderRadius:99, textTransform:'none', fontWeight:700, py:1.4, bgcolor: saved ? '#4ECDC4' : '#FF6B9D', '&:hover':{ bgcolor: saved ? '#3dbdb5' : '#e05590' }, boxShadow:'none' }}>
              {sending ? 'Sending confirmation…' : saved ? '✅ Email Saved & Active' : 'Save Parent Email'}
            </Button>

            {saved && (
              <Alert severity="success" sx={{ mt:2, fontSize:'0.82rem' }}>
                Alerts will be sent to <strong>{input}</strong> whenever restricted content is attempted.
              </Alert>
            )}

            {/* What triggers an alert */}
            <Box sx={{ mt:3 }}>
              <Typography sx={{ fontWeight:700, fontSize:'0.82rem', mb:1.5, color:'text.secondary' }}>📬 What triggers an email?</Typography>
              {['Clicking an age-restricted education topic','Attempting to watch a blocked reel/video','Trying to access an 18+ module','Multiple blocked attempts in one session'].map((item,i)=>(
                <Box key={i} sx={{ display:'flex', alignItems:'flex-start', gap:1, mb:1 }}>
                  <Box sx={{ width:6, height:6, borderRadius:'50%', bgcolor:'#FF6B9D', mt:0.8, flexShrink:0 }} />
                  <Typography sx={{ fontSize:'0.82rem', color:'text.secondary', lineHeight:1.6 }}>{item}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Alert log */}
        <Grid item xs={12} md={7}>
          <Card sx={{ border:`2px solid ${alpha('#7B61FF',0.2)}`, p:3, height:'100%' }}>
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mb:3, flexWrap:'wrap', gap:1 }}>
              <Box sx={{ display:'flex', alignItems:'center', gap:1.2 }}>
                <WarningAmberIcon sx={{ color:'#7B61FF' }} />
                <Typography variant="subtitle1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700 }}>Alert Log</Typography>
              </Box>
              <Chip label={`${alerts.length} alerts`} size="small"
                sx={{ bgcolor:alpha('#7B61FF',0.12), color:'#7B61FF', border:`1px solid ${alpha('#7B61FF',0.3)}`, fontWeight:700 }} />
            </Box>

            {alerts.length === 0 ? (
              <Box sx={{ textAlign:'center', py:5 }}>
                <Typography sx={{ fontSize:'2.5rem', mb:1.5 }}>📭</Typography>
                <Typography color="text.secondary" sx={{ fontSize:'0.88rem' }}>No alerts yet. Alerts appear here when restricted content is accessed.</Typography>
              </Box>
            ) : (
              <Box sx={{ display:'flex', flexDirection:'column', gap:1.5, maxHeight:340, overflowY:'auto', pr:0.5 }}>
                {alerts.map((a, i) => (
                  <Box key={i} sx={{ display:'flex', gap:2, p:2, borderRadius:2.5, bgcolor: alpha('#7B61FF', 0.05), border:`1px solid ${alpha('#7B61FF',0.15)}`, animation:'sexed-slideIn 0.3s ease' }}>
                    <Box sx={{ fontSize:'1.5rem', flexShrink:0 }}>{a.icon}</Box>
                    <Box sx={{ flex:1 }}>
                      <Typography sx={{ fontWeight:600, fontSize:'0.85rem' }}>{a.message}</Typography>
                      <Typography sx={{ fontSize:'0.75rem', color:'text.secondary', mt:0.3 }}>{a.time}</Typography>
                      {parentEmail && <Typography sx={{ fontSize:'0.72rem', color:'#4ECDC4', mt:0.3 }}>📧 Email sent to {parentEmail}</Typography>}
                    </Box>
                    <Chip label="Blocked" size="small" sx={{ bgcolor:alpha('#f44336',0.1), color:'#f44336', border:`1px solid ${alpha('#f44336',0.25)}`, fontSize:'0.68rem', alignSelf:'flex-start' }} />
                  </Box>
                ))}
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ═══════════════════════════════════════════════════════════════
export default function SexEdModules({ onBack }) {
  const muiTheme = useTheme();
  useEffect(() => { injectStyles(); }, []);

  const [userAge,       setUserAge]      = useState(null);
  const [parentEmail,   setParentEmail]  = useState('');
  const [activeModule,  setActiveModule] = useState(null);
  const [activeTopic,   setActiveTopic]  = useState(null);
  const [completed,     setCompleted]    = useState({});
  const [blocked,       setBlocked]      = useState(null);
  const [toast,         setToast]        = useState(null);
  const [currentPage,   setCurrentPage]  = useState('modules'); // 'modules'|'legal'|'touch'|'guard'|'parent'
  const [parentAlerts,  setParentAlerts] = useState([]);

  const showToast = (msg, type = 'info') => setToast({ msg, type });

  // Add to parent alert log
  const logAlert = useCallback((message, icon = '🚨') => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setParentAlerts(prev => [{ message, icon, time }, ...prev].slice(0, 20));
  }, []);

  const handleTopicClick = useCallback((topic, idx, mod) => {
    if (userAge < topic.minAge) {
      setBlocked({ topic, color: mod.color });
      setActiveTopic(null);
      logAlert(`Tried to access "${topic.title}" (requires ${topic.minAge}+)`);
      return;
    }
    setActiveTopic(p => p === idx ? null : idx);
  }, [userAge, logAlert]);

  const handleModuleClick = (mod) => {
    if (userAge < mod.minAge) {
      showToast(`Module requires age ${mod.minAge}+. Your verified age is ${userAge}.`, 'warn');
      logAlert(`Tried to access module "${mod.title}" (requires ${mod.minAge}+)`, '⚠️');
      return;
    }
    setActiveModule(mod);
    setActiveTopic(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleComplete = (modId, idx) => {
    const key = `${modId}-${idx}`;
    const wasDone = completed[key];
    setCompleted(p => ({ ...p, [key]: !p[key] }));
    if (!wasDone) showToast('Great work! Topic marked complete 🎉', 'success');
  };

  const getProgress = (mod) =>
    Math.round((mod.topics.filter((_, i) => completed[`${mod.id}-${i}`]).length / mod.topics.length) * 100);

  const totalTopics = MODULES.reduce((a, m) => a + m.topics.length, 0);
  const totalDone   = Object.values(completed).filter(Boolean).length;
  const overall     = Math.round((totalDone / totalTopics) * 100);

  const ageGroup = !userAge ? null : userAge < 13 ? 'child' : userAge < 18 ? 'teen' : 'adult';
  const ageColor = { child: '#4ECDC4', teen: '#F7B731', adult: '#FF6B9D' };
  const ageLabel = { child: 'Child · Under 13', teen: 'Teen · 13–17', adult: 'Adult · 18+' };

  // ── AGE GATE ──────────────────────────────────────────────────
  if (!userAge) return <AgeGate onVerify={setUserAge} parentEmail={parentEmail} setParentEmail={setParentEmail} />;

  // ── NAV ITEMS ─────────────────────────────────────────────────
  const NAV = [
    { id:'modules', icon:'📚', label:'Modules' },
    { id:'legal',   icon:'⚖️', label:'Legal Rules' },
    { id:'touch',   icon:'🤗', label:'Good/Bad Touch' },
    { id:'guard',   icon:'📱', label:'Content Guard' },
    { id:'parent',  icon:'📧', label:'Parent Alerts', badge: parentAlerts.length },
  ];

  return (
    <Box sx={{ animation:'sexed-fadeUp 0.4s ease' }}>
      {/* Blocked overlay */}
      {blocked && (
        <BlockedOverlay
          topic={blocked.topic}
          userAge={userAge}
          parentEmail={parentEmail}
          onClose={() => setBlocked(null)}
          onEmailSent={(msg) => logAlert(msg)}
        />
      )}

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <Box sx={{
        background:'linear-gradient(135deg,#1e0e4a 0%,#0d4a45 100%)',
        color:'#fff', px:{ xs:2, md:4 }, py:{ xs:4.5, md:6 },
        textAlign:'center', position:'relative', overflow:'hidden',
        borderRadius:{ xs:0, md:'0 0 32px 32px' },
      }}>
        {[['#FF6B9D','10%','80%'],['#4ECDC4','88%','20%'],['#7B61FF','50%','110%']].map(([c,x,y],i)=>(
          <Box key={i} sx={{ position:'absolute', width:250, height:250, borderRadius:'50%', background:`radial-gradient(circle,${c}14 0%,transparent 70%)`, left:x, top:y, transform:'translate(-50%,-50%)', pointerEvents:'none' }} />
        ))}

        {/* Age chip */}
        <Box sx={{ position:'absolute', top:12, right:12, zIndex:2, bgcolor:'rgba(255,255,255,0.08)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.16)', borderRadius:99, px:1.8, py:0.7, display:'flex', alignItems:'center', gap:1, fontSize:'0.78rem' }}>
          <Box sx={{ width:8, height:8, borderRadius:'50%', bgcolor: ageColor[ageGroup], boxShadow:`0 0 8px ${ageColor[ageGroup]}` }} />
          <span style={{ color:'rgba(255,255,255,0.85)' }}>Age {userAge} · {ageLabel[ageGroup]}</span>
          <Box component="button" onClick={()=>{setUserAge(null);setActiveModule(null);setActiveTopic(null);setCurrentPage('modules');}}
            sx={{ bgcolor:'rgba(255,255,255,0.13)', border:'none', borderRadius:1, color:'rgba(255,255,255,0.7)', fontSize:'0.7rem', cursor:'pointer', px:1.2, py:0.3, '&:hover':{ bgcolor:'rgba(255,255,255,0.22)' } }}>
            Change
          </Box>
        </Box>

        <Box sx={{ position:'relative', zIndex:1 }}>
          <Typography sx={{ fontSize:'2.8rem', mb:0.8 }}>🌿</Typography>
          <Typography variant="h3" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, fontSize:{ xs:'1.6rem', md:'2.4rem' }, letterSpacing:'-0.4px', mb:1 }}>
            Comprehensive Sexual Education
          </Typography>
          <Typography sx={{ opacity:0.72, fontSize:'0.92rem', maxWidth:500, mx:'auto', lineHeight:1.65 }}>
            Evidence-based · Shame-free · Age-appropriate · 6 Modules · {totalTopics} Topics
          </Typography>

          {/* Overall progress */}
          <Box sx={{ maxWidth:360, mx:'auto', mt:3 }}>
            <Box sx={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', mb:0.8, opacity:0.8 }}>
              <span>Overall Progress</span>
              <span>{totalDone}/{totalTopics} · {overall}%</span>
            </Box>
            <LinearProgress variant="determinate" value={overall}
              sx={{ height:8, borderRadius:99, bgcolor:'rgba(255,255,255,0.18)', '& .MuiLinearProgress-bar':{ background:'linear-gradient(90deg,#FFD700,#FF8C42)', borderRadius:99 } }}
            />
          </Box>
        </Box>
      </Box>

      {/* ── TOP NAV TABS ───────────────────────────────────────── */}
      <Box sx={{ bgcolor:'background.paper', borderBottom:'1px solid', borderColor:'divider', position:'sticky', top:{ xs:56, md:64 }, zIndex:100, boxShadow:'0 2px 12px rgba(0,0,0,0.08)' }}>
        <Box sx={{ maxWidth:1120, mx:'auto', display:'flex', overflowX:'auto', px:1, '&::-webkit-scrollbar':{ height:3 } }}>
          {NAV.map(n => (
            <Box key={n.id}
              onClick={() => { setCurrentPage(n.id); setActiveModule(null); setActiveTopic(null); window.scrollTo({ top:0, behavior:'smooth' }); }}
              sx={{
                display:'flex', alignItems:'center', gap:0.8, px:2.5, py:2, cursor:'pointer', whiteSpace:'nowrap',
                borderBottom:`3px solid ${currentPage === n.id ? '#7B61FF' : 'transparent'}`,
                color: currentPage === n.id ? '#7B61FF' : 'text.secondary',
                fontWeight: currentPage === n.id ? 700 : 500,
                fontSize:'0.85rem', transition:'all 0.2s', position:'relative',
                '&:hover':{ color:'#7B61FF', bgcolor: alpha('#7B61FF',0.04) },
              }}>
              <span>{n.icon}</span>
              <span>{n.label}</span>
              {n.badge > 0 && (
                <Box sx={{ position:'absolute', top:8, right:6, bgcolor:'#f44336', color:'#fff', borderRadius:99, width:18, height:18, fontSize:'0.65rem', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800 }}>{n.badge}</Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── CONTENT AREA ───────────────────────────────────────── */}
      <Box sx={{ maxWidth:1120, mx:'auto', px:{ xs:1.5, md:3 }, py:5 }}>

        {/* Back breadcrumb */}
        {(activeModule || onBack) && currentPage === 'modules' && (
          <Box sx={{ mb:3 }}>
            {activeModule ? (
              <Button startIcon={<ArrowBackIcon />} onClick={()=>{setActiveModule(null);setActiveTopic(null);window.scrollTo({top:0,behavior:'smooth'});}}
                sx={{ borderRadius:99, textTransform:'none', fontWeight:600 }}>All Modules</Button>
            ) : onBack && (
              <Button startIcon={<ArrowBackIcon />} onClick={onBack}
                sx={{ borderRadius:99, textTransform:'none', fontWeight:600 }}>Back to Home</Button>
            )}
          </Box>
        )}

        {/* ── MODULES TAB ────────────────────────────────────── */}
        {currentPage === 'modules' && !activeModule && (
          <Box sx={{ animation:'sexed-fadeUp 0.4s ease' }}>
            <Typography color="text.secondary" sx={{ textAlign:'center', mb:4, fontSize:'0.9rem', lineHeight:1.7 }}>
              Select a module to explore topics and track your learning progress.<br />
              <Box component="strong" sx={{ color:'error.main' }}>🔒 Age-restricted topics are automatically blocked</Box> to protect younger learners.
            </Typography>
            <Grid container spacing={2.5}>
              {MODULES.map(mod => {
                const locked     = userAge < mod.minAge;
                const prog       = getProgress(mod);
                const accessible = mod.topics.filter(t => userAge >= t.minAge).length;
                return (
                  <Grid item xs={12} sm={6} lg={4} key={mod.id}>
                    <Card className="sexed-mc"
                      sx={{ height:'100%', cursor:'pointer', position:'relative', overflow:'hidden', opacity: locked ? 0.62 : 1, border:`2px solid ${locked ? alpha('#f44336',0.12) : alpha(mod.color,0.18)}`, bgcolor: locked ? alpha(muiTheme.palette.background.paper,0.6) : 'background.paper', boxShadow: locked ? 'none' : `0 4px 22px ${alpha(mod.color,0.1)}`, '&:hover':{ borderColor: locked ? undefined : mod.color } }}
                      onClick={() => handleModuleClick(mod)}>
                      <Box sx={{ position:'absolute', top:0, right:0, width:68, height:68, background:`${mod.color}0e`, borderRadius:'0 16px 0 68px', pointerEvents:'none' }} />
                      {locked && <Box sx={{ position:'absolute', top:12, right:12, bgcolor:'rgba(244,67,54,0.88)', borderRadius:'50%', width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.85rem' }}>🔒</Box>}
                      <CardContent sx={{ p:3 }}>
                        <Typography sx={{ fontSize:'2rem', mb:1.2 }}>{mod.icon}</Typography>
                        <Typography variant="h6" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:700, color: locked ? 'text.disabled' : 'text.primary', mb:0.3 }}>{mod.title}</Typography>
                        <Typography sx={{ fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, color: locked ? 'text.disabled' : mod.color, mb:0.8 }}>{mod.subtitle}</Typography>
                        <Typography color="text.secondary" sx={{ fontSize:'0.83rem', lineHeight:1.65, mb:2 }}>{mod.description}</Typography>
                        <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:1 }}>
                          <AgeBadge userAge={userAge} minAge={mod.minAge} />
                          <Typography sx={{ fontSize:'0.75rem', color:'text.disabled' }}>{locked ? `Requires ${mod.minAge}+` : `${accessible}/${mod.topics.length} accessible`}</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={prog}
                          sx={{ height:5, borderRadius:99, mb:1.8, bgcolor:alpha(mod.color,0.13), '& .MuiLinearProgress-bar':{ bgcolor:mod.color, borderRadius:99 } }} />
                        <Box sx={{ display:'flex', flexWrap:'wrap', gap:0.6 }}>
                          {mod.topics.slice(0,3).map((t,i)=>(
                            <Chip key={i} label={`${userAge < t.minAge ? '🔒' : t.icon} ${t.title}`} size="small"
                              sx={{ fontSize:'0.68rem', height:22, bgcolor: userAge >= t.minAge ? alpha(mod.color,0.1) : alpha('#f44336',0.08), color: userAge >= t.minAge ? mod.color : '#e08888', border:`1px solid ${userAge >= t.minAge ? alpha(mod.color,0.22) : alpha('#f44336',0.18)}` }} />
                          ))}
                          {mod.topics.length > 3 && <Chip label={`+${mod.topics.length-3} more`} size="small" sx={{ fontSize:'0.68rem', height:22, bgcolor:'action.hover', color:'text.disabled' }} />}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* ── TOPIC DETAIL ────────────────────────────────────── */}
        {currentPage === 'modules' && activeModule && (
          <Fade in timeout={350}>
            <Box>
              <Card sx={{ mb:3, border:`2px solid ${alpha(activeModule.color,0.28)}`, boxShadow:`0 10px 40px ${alpha(activeModule.color,0.14)}`, overflow:'hidden', position:'relative' }}>
                <Box sx={{ position:'absolute', top:0, right:0, width:180, height:180, background:`radial-gradient(circle,${activeModule.color}0e 0%,transparent 70%)`, pointerEvents:'none' }} />
                <CardContent sx={{ p:{ xs:3, md:4 } }}>
                  <Box sx={{ display:'flex', gap:2.5, flexWrap:'wrap', alignItems:'flex-start' }}>
                    <Typography sx={{ fontSize:'3rem' }}>{activeModule.icon}</Typography>
                    <Box sx={{ flex:1, minWidth:200 }}>
                      <Typography variant="h5" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, mb:0.4 }}>{activeModule.title}</Typography>
                      <Typography sx={{ fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, color:activeModule.color, mb:1 }}>{activeModule.subtitle}</Typography>
                      <Typography color="text.secondary" sx={{ fontSize:'0.9rem', lineHeight:1.75, mb:1.5 }}>{activeModule.description}</Typography>
                      <Box sx={{ display:'flex', gap:1, flexWrap:'wrap', alignItems:'center' }}>
                        <Chip label={`${activeModule.topics.length} Topics`} size="small" sx={{ bgcolor:alpha(activeModule.color,0.12), color:activeModule.color, fontWeight:700, border:`1px solid ${alpha(activeModule.color,0.28)}` }} />
                        <AgeBadge userAge={userAge} minAge={activeModule.minAge} />
                        <Typography sx={{ color:'text.disabled', fontSize:'0.8rem' }}>{getProgress(activeModule)}% complete</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Parental control notice */}
              <Alert severity="error" icon={<ShieldIcon />} sx={{ mb:3, fontSize:'0.83rem', bgcolor:alpha('#f44336',0.05), border:`1px solid ${alpha('#f44336',0.2)}` }}>
                <strong>Parental Control Active —</strong> Clicking a 🔒 locked topic triggers an auto-close block screen with countdown, and sends a notification to the registered parent email.
              </Alert>

              <Grid container spacing={2}>
                {activeModule.topics.map((topic, idx) => {
                  const key    = `${activeModule.id}-${idx}`;
                  const isDone = !!completed[key];
                  const isOpen = activeTopic === idx;
                  const locked = userAge < topic.minAge;
                  return (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Card sx={{ border:`2px solid ${locked ? alpha('#f44336',0.16) : isDone ? activeModule.color : alpha(muiTheme.palette.divider,1)}`, boxShadow: isDone ? `0 5px 22px ${alpha(activeModule.color,0.2)}` : 'none', opacity: locked ? 0.75 : 1, overflow:'hidden' }}>
                        <Box sx={{ px:2.5, py:2, cursor:'pointer', '&:hover':{ bgcolor: alpha(activeModule.color,0.03) } }} onClick={() => handleTopicClick(topic,idx,activeModule)}>
                          <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:1 }}>
                            <Box sx={{ flex:1 }}>
                              <Typography sx={{ fontSize:'1.6rem' }}>{locked ? '🔒' : topic.icon}</Typography>
                              <Typography sx={{ fontWeight:700, fontSize:'0.9rem', color: locked ? 'text.disabled' : 'text.primary', fontFamily:'"Playfair Display",serif', mt:0.8, mb:0.5 }}>{topic.title}</Typography>
                              <AgeBadge userAge={userAge} minAge={topic.minAge} />
                            </Box>
                            <Box sx={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:0.8, flexShrink:0 }}>
                              {!locked ? (
                                <>
                                  <Box component="button"
                                    onClick={e=>{e.stopPropagation();toggleComplete(activeModule.id,idx);}}
                                    sx={{ width:26, height:26, borderRadius:'50%', border:`2px solid ${isDone ? activeModule.color : muiTheme.palette.divider}`, bgcolor: isDone ? activeModule.color : 'background.paper', color: isDone ? '#fff' : 'text.disabled', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.85rem', transition:'all 0.2s' }}>✓</Box>
                                  <Typography sx={{ color:'text.disabled', fontSize:'0.95rem', transition:'transform 0.25s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</Typography>
                                </>
                              ) : (
                                <Typography sx={{ fontSize:'1.4rem', animation:'sexed-wiggle 2s ease 1s infinite' }}>🔒</Typography>
                              )}
                            </Box>
                          </Box>
                          {locked && (
                            <Box sx={{ mt:1.2, bgcolor:alpha('#f44336',0.07), border:`1px solid ${alpha('#f44336',0.18)}`, borderRadius:2, p:1.2 }}>
                              <Typography sx={{ fontSize:'0.78rem', color:'error.light' }}>⚠️ Age {topic.minAge}+ required · Your age: {userAge} · Parent will be notified</Typography>
                            </Box>
                          )}
                        </Box>
                        <Collapse in={isOpen && !locked}>
                          <Box sx={{ px:2.5, pb:2.5, borderTop:`1px solid ${alpha(activeModule.color,0.15)}` }}>
                            <Typography color="text.secondary" sx={{ fontSize:'0.875rem', lineHeight:1.85, mt:1.8 }}>{topic.content}</Typography>
                            {!isDone ? (
                              <Button variant="contained" size="small" onClick={()=>toggleComplete(activeModule.id,idx)}
                                sx={{ mt:2, borderRadius:99, textTransform:'none', fontWeight:700, bgcolor:activeModule.color, '&:hover':{ bgcolor:activeModule.color, opacity:0.85 }, boxShadow:`0 4px 14px ${alpha(activeModule.color,0.4)}` }}>
                                ✓ Mark as Complete
                              </Button>
                            ) : (
                              <Typography sx={{ color:activeModule.color, fontSize:'0.83rem', mt:1.5, fontWeight:700 }}>✅ Completed!</Typography>
                            )}
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

        {/* ── LEGAL RULES TAB ─────────────────────────────────── */}
        {currentPage === 'legal' && <LegalRulesSection />}

        {/* ── GOOD/BAD TOUCH TAB ──────────────────────────────── */}
        {currentPage === 'touch' && <GoodBadTouchLesson userAge={userAge} />}

        {/* ── CONTENT GUARD TAB ───────────────────────────────── */}
        {currentPage === 'guard' && (
          <ContentGuard
            userAge={userAge}
            parentEmail={parentEmail}
            onEmailSent={(msg) => { logAlert(msg, '📱'); showToast('Parent notified about blocked content 📧', 'warn'); }}
          />
        )}

        {/* ── PARENT ALERTS TAB ───────────────────────────────── */}
        {currentPage === 'parent' && (
          <ParentAlertPanel
            parentEmail={parentEmail}
            setParentEmail={setParentEmail}
            alerts={parentAlerts}
          />
        )}
      </Box>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <Box sx={{ textAlign:'center', py:3.5, px:2, color:'text.disabled', fontSize:'0.78rem', borderTop:'1px solid', borderColor:'divider', bgcolor:'background.paper', lineHeight:1.9 }}>
        <Typography sx={{ fontSize:'0.8rem', color:'text.secondary', mb:0.5 }}>🌿 <strong>Comprehensive Sexual Education</strong> — Evidence-based · Inclusive · Shame-free</Typography>
        <Typography sx={{ fontSize:'0.75rem' }}>Always consult a qualified healthcare professional for personal medical advice.</Typography>
        <Typography sx={{ fontSize:'0.75rem' }}>🔒 Parental controls active · 🛡️ POCSO & Rape Laws enforced · 📧 Parent alert system enabled</Typography>
      </Box>
    </Box>
  );
}
