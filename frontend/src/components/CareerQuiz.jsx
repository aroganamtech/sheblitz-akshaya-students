import React, { useState } from 'react';
import {
  Box, Typography, Button, Stack, LinearProgress,
  Card, CardContent, Chip, alpha, Fade
} from '@mui/material';
import { PINK, VIOLET } from '../theme/theme';

const questions = [
  {
    id: 1,
    question: 'What is your current life stage?',
    hint: 'This helps us suggest paths that fit your schedule',
    options: [
      { id: 'student', label: 'Student / Fresher',      sub: 'Just starting out' },
      { id: 'working', label: 'Working professional',   sub: 'Looking to grow or switch' },
      { id: 'returner',label: 'Career returner',        sub: 'After a break / maternity' },
      { id: 'home',    label: 'Homemaker exploring work',sub: 'Entering the workforce' },
      { id: 'founder', label: 'Entrepreneur',           sub: 'Building something of my own' },
    ],
  },
  {
    id: 2,
    question: 'How much time can you invest daily?',
    hint: "Be honest — we'll find paths that fit your actual life",
    options: [
      { id: '15min',  label: '15–30 minutes',   sub: 'Micro-learning only' },
      { id: '1hr',    label: '1–2 hours',        sub: 'Steady progress' },
      { id: '3hr',    label: '3–4 hours',        sub: 'Focused sprint' },
      { id: 'full',   label: 'Full time',        sub: 'All in' },
    ],
  },
  {
    id: 3,
    question: 'What are your strongest skills?',
    hint: 'Select all that apply',
    options: [
      { id: 'comm',     label: 'Communication',     sub: 'Writing, speaking, presenting' },
      { id: 'creative', label: 'Creative & visual',  sub: 'Design, art, aesthetics' },
      { id: 'analytical',label: 'Analytical',        sub: 'Data, logic, problem-solving' },
      { id: 'people',   label: 'People skills',      sub: 'Empathy, leadership, care' },
      { id: 'tech',     label: 'Technical',          sub: 'Coding, tools, systems' },
      { id: 'business', label: 'Business sense',     sub: 'Sales, strategy, finance' },
    ],
  },
  {
    id: 4,
    question: 'What income are you aiming for?',
    hint: 'In the next 12–18 months',
    options: [
      { id: 'entry',  label: '₹2–5 LPA',   sub: 'Getting started' },
      { id: 'mid',    label: '₹5–10 LPA',  sub: 'Solid foundation' },
      { id: 'growth', label: '₹10–20 LPA', sub: 'Strong growth' },
      { id: 'top',    label: '₹20 LPA+',   sub: 'Top of market' },
    ],
  },
  {
    id: 5,
    question: 'What kind of work suits you best?',
    hint: 'Your ideal working environment',
    options: [
      { id: 'remote',  label: 'Remote / from home', sub: 'Work anywhere' },
      { id: 'hybrid',  label: 'Hybrid',             sub: 'Best of both worlds' },
      { id: 'office',  label: 'Office / in-person',  sub: 'I love a team around me' },
      { id: 'freelance',label: 'Freelance / own hours',sub: 'Full flexibility' },
    ],
  },
];

export default function CareerQuiz({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState([]);
  const [visible, setVisible] = useState(true);

  const q = questions[step];
  const isMulti = q.id === 3;
  const progress = ((step) / questions.length) * 100;

  const handleSelect = (id) => {
    if (isMulti) {
      setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else {
      setSelected([id]);
    }
  };

  const handleNext = () => {
    if (!selected.length) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setVisible(false);
    setTimeout(() => {
      if (step + 1 < questions.length) {
        setAnswers(newAnswers);
        setStep(s => s + 1);
        setSelected([]);
        setVisible(true);
      } else {
        onComplete(newAnswers);
      }
    }, 250);
  };

  return (
    <Box sx={{ maxWidth: 680, mx: 'auto', px: { xs: 2, md: 0 } }}>
      {/* Progress */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
          Question {step + 1} of {questions.length}
        </Typography>
        <Typography variant="overline" sx={{
          color: PINK[300], fontSize: '0.7rem',
          background: `linear-gradient(90deg, ${PINK[300]}, ${VIOLET[300]})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {Math.round(progress)}% complete
        </Typography>
      </Stack>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 4 }} />

      <Fade in={visible} timeout={300}>
        <Box>
          <Typography variant="h3" sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            mb: 0.75, color: 'text.primary',
          }}>
            {q.question}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5 }}>
            {q.hint} {isMulti && <Chip label="Multi-select" size="small" color="secondary" sx={{ ml: 1, fontSize: '0.65rem', height: 20 }} />}
          </Typography>

          <Stack spacing={1.5}>
            {q.options.map(opt => {
              const isOn = selected.includes(opt.id);
              return (
                <Card
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  sx={{
                    cursor: 'pointer',
                    border: isOn
                      ? `1.5px solid ${PINK[400]}`
                      : `1px solid ${alpha(VIOLET[400], 0.18)}`,
                    background: isOn
                      ? `linear-gradient(135deg, ${alpha(PINK[500], 0.12)}, ${alpha(VIOLET[500], 0.12)})`
                      : alpha('#1A0F2E', 0.6),
                    boxShadow: isOn ? `0 0 24px ${alpha(PINK[500], 0.2)}` : 'none',
                    transform: isOn ? 'translateX(6px)' : 'translateX(0)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: isOn ? 'translateX(6px)' : 'translateX(4px)',
                      borderColor: isOn ? PINK[400] : alpha(VIOLET[300], 0.4),
                    },
                  }}
                >
                  <CardContent sx={{ py: '14px !important', px: '20px !important' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: isOn ? PINK[200] : 'text.primary' }}>
                          {opt.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                          {opt.sub}
                        </Typography>
                      </Box>
                      <Box sx={{
                        width: 22, height: 22, borderRadius: isMulti ? '6px' : '50%',
                        border: `2px solid ${isOn ? PINK[400] : alpha(VIOLET[300], 0.35)}`,
                        background: isOn ? `linear-gradient(135deg, ${PINK[400]}, ${VIOLET[500]})` : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.2s',
                      }}>
                        {isOn && (
                          <Box component="span" sx={{
                            width: 6, height: 6, borderRadius: '50%', background: '#fff',
                          }} />
                        )}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4}>
            <Button
              variant="text"
              disabled={step === 0}
              onClick={() => { setStep(s => s - 1); setSelected([]); }}
              sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              ← Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!selected.length}
              sx={{ minWidth: 140 }}
            >
              {step + 1 === questions.length ? 'See my matches →' : 'Next →'}
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Box>
  );
}
