import React, { useState } from 'react';
import {
  Box, Typography, Stack, Card, CardContent, Button,
  Chip, LinearProgress, Divider, alpha, Checkbox
} from '@mui/material';
import { PINK, VIOLET } from '../theme/theme';

const phases = [
  {
    num: 1, label: 'Foundation', duration: 'Months 1–2',
    color: VIOLET[400], bg: alpha(VIOLET[500], 0.12),
    border: alpha(VIOLET[400], 0.35),
    tasks: [
      { id: 't1', text: 'Complete Google UX Design Certificate (Coursera — free audit)', tag: 'Free' },
      { id: 't2', text: 'Learn Figma — frames, auto-layout, components', tag: 'Free' },
      { id: 't3', text: 'Study 10 real apps — write a UX critique for each', tag: 'Practice' },
      { id: 't4', text: 'Read "Don\'t Make Me Think" by Steve Krug', tag: 'Book' },
    ],
    skills: ['UX principles', 'Figma basics', 'Design thinking', 'User research'],
  },
  {
    num: 2, label: 'Build', duration: 'Months 3–5',
    color: PINK[400], bg: alpha(PINK[500], 0.1),
    border: alpha(PINK[400], 0.3),
    tasks: [
      { id: 't5', text: 'Redesign an existing app — document the full case study', tag: 'Project 1' },
      { id: 't6', text: 'Design an app solving a real women\'s problem from scratch', tag: 'Project 2' },
      { id: 't7', text: 'Volunteer UX work for a local NGO or small business', tag: 'Project 3' },
      { id: 't8', text: 'Learn usability testing — conduct 5 user interviews', tag: 'Skill' },
      { id: 't9', text: 'Build your portfolio on Behance or Framer', tag: 'Portfolio' },
    ],
    skills: ['Case studies', 'Prototyping', 'User interviews', 'Information architecture'],
  },
  {
    num: 3, label: 'Launch', duration: 'Months 6–7',
    color: '#E8A0FF', bg: alpha('#C060FF', 0.1),
    border: alpha('#C060FF', 0.3),
    tasks: [
      { id: 't10', text: 'Polish portfolio to 3 strong case studies: problem → process → outcome', tag: 'Portfolio' },
      { id: 't11', text: 'Tailor resume — highlight empathy, research, Figma', tag: 'Resume' },
      { id: 't12', text: 'Apply to 5 roles/week — startups, agencies, remote-first companies', tag: 'Apply' },
      { id: 't13', text: 'Join UX communities: ADPList, Designer Hangout, LinkedIn UX groups', tag: 'Network' },
      { id: 't14', text: 'Practice design challenges on uxtools.co & Sharpen.design', tag: 'Practice' },
    ],
    skills: ['Portfolio writing', 'Interview prep', 'Design challenges', 'LinkedIn presence'],
  },
  {
    num: 4, label: 'Grow', duration: 'Month 9+',
    color: '#4FFFB0', bg: alpha('#00D68F', 0.08),
    border: alpha('#00D68F', 0.25),
    tasks: [
      { id: 't15', text: 'Specialize — Product Design, UX Research, or Design Systems', tag: 'Specialize' },
      { id: 't16', text: 'Learn basic HTML/CSS — opens 40% more job opportunities', tag: 'Upskill' },
      { id: 't17', text: 'Explore freelancing on Toptal, Contra, or direct client work', tag: 'Freelance' },
      { id: 't18', text: 'Mentor a junior designer — builds leadership credibility', tag: 'Mentor' },
    ],
    skills: ['Design systems', 'HTML/CSS basics', 'UX research', 'Leadership'],
  },
];

const salaryLevels = [
  { label: 'Junior (0–2 yrs)', range: '₹4–8 LPA',  pct: 33 },
  { label: 'Mid (2–5 yrs)',    range: '₹10–18 LPA', pct: 60 },
  { label: 'Senior (5+ yrs)', range: '₹20–40 LPA', pct: 80 },
  { label: 'Freelance',       range: '₹500–3K/hr', pct: 65 },
];

export default function RoadmapPage({ path, onBack }) {
  const [checked, setChecked] = useState({});
  const total = phases.reduce((a, p) => a + p.tasks.length, 0);
  const done  = Object.values(checked).filter(Boolean).length;

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <Box sx={{ maxWidth: 780, mx: 'auto', px: { xs: 2, md: 0 } }}>
      {/* Header */}
      <Button
        variant="text" onClick={onBack}
        sx={{ color: 'text.secondary', mb: 3, pl: 0, '&:hover': { color: 'text.primary' } }}
      >
        ← Back to results
      </Button>

      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'flex-start' }} mb={2}>
        <Box>
          <Typography variant="overline" sx={{ color: PINK[300] }}>Career roadmap</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, mt: 0.5 }}>
            {path?.title || 'UX / Product Designer'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Estimated 6–9 months · Remote-friendly · ₹6–18 LPA
          </Typography>
        </Box>
        <Chip
          label="92% match"
          sx={{
            mt: { xs: 1.5, sm: 0 },
            background: `linear-gradient(135deg, ${PINK[500]}, ${VIOLET[600]})`,
            color: '#fff', fontWeight: 700, px: 1,
          }}
        />
      </Stack>

      {/* Progress bar */}
      <Box sx={{
        p: 2.5, borderRadius: 3, mb: 4,
        background: alpha('#1A0F2E', 0.7),
        border: `1px solid ${alpha(VIOLET[400], 0.18)}`,
      }}>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Overall progress</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: PINK[300] }}>
            {done} / {total} tasks
          </Typography>
        </Stack>
        <LinearProgress variant="determinate" value={(done / total) * 100} />
      </Box>

      {/* Phases */}
      <Stack spacing={3} mb={5}>
        {phases.map((phase) => (
          <Card key={phase.num} sx={{
            border: `1px solid ${phase.border}`,
            background: phase.bg,
            '&:hover': { transform: 'none' },
          }}>
            <CardContent sx={{ p: '20px 24px !important' }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={2.5}>
                <Box sx={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: alpha(phase.color, 0.2),
                  border: `1.5px solid ${alpha(phase.color, 0.5)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: phase.color }}>
                    {phase.num}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontSize: '1rem', color: phase.color }}>
                    {phase.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {phase.duration}
                  </Typography>
                </Box>
                <Chip
                  label={`${phase.tasks.filter(t => checked[t.id]).length}/${phase.tasks.length} done`}
                  size="small"
                  sx={{ background: alpha(phase.color, 0.12), color: phase.color, fontSize: '0.7rem' }}
                />
              </Stack>

              <Stack spacing={0.5} mb={2.5}>
                {phase.tasks.map(task => (
                  <Stack
                    key={task.id}
                    direction="row" alignItems="flex-start" spacing={1.5}
                    onClick={() => toggle(task.id)}
                    sx={{
                      cursor: 'pointer', p: 1.5, borderRadius: 2,
                      transition: 'background 0.15s',
                      '&:hover': { background: alpha('#fff', 0.04) },
                    }}
                  >
                    <Box sx={{
                      width: 18, height: 18, borderRadius: '4px', mt: '2px',
                      border: `1.5px solid ${checked[task.id] ? phase.color : alpha('#fff', 0.2)}`,
                      background: checked[task.id] ? alpha(phase.color, 0.2) : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.2s',
                    }}>
                      {checked[task.id] && (
                        <svg width="10" height="10" viewBox="0 0 10 10">
                          <path d="M2 5l2 2 4-4" stroke={phase.color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        </svg>
                      )}
                    </Box>
                    <Typography variant="body2" sx={{
                      flex: 1, fontSize: '0.875rem',
                      color: checked[task.id] ? 'text.disabled' : 'text.primary',
                      textDecoration: checked[task.id] ? 'line-through' : 'none',
                      transition: 'all 0.2s',
                    }}>
                      {task.text}
                    </Typography>
                    <Chip label={task.tag} size="small" sx={{
                      fontSize: '0.65rem', height: 20, flexShrink: 0,
                      background: alpha(phase.color, 0.12), color: phase.color,
                    }} />
                  </Stack>
                ))}
              </Stack>

              <Box sx={{ pt: 2, borderTop: `1px solid ${alpha(phase.color, 0.15)}` }}>
                <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block', mb: 1 }}>
                  Skills you'll gain
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {phase.skills.map(s => (
                    <Chip key={s} label={s} size="small" sx={{
                      fontSize: '0.72rem', height: 22,
                      background: alpha(phase.color, 0.08),
                      color: alpha(phase.color, 0.85),
                      border: `1px solid ${alpha(phase.color, 0.2)}`,
                    }} />
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Salary progression */}
      <Card sx={{ mb: 4, '&:hover': { transform: 'none' } }}>
        <CardContent sx={{ p: '20px 24px !important' }}>
          <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2.5 }}>
            Salary progression
          </Typography>
          <Stack spacing={2}>
            {salaryLevels.map(lvl => (
              <Stack key={lvl.label} direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2" sx={{ color: 'text.secondary', width: 130, flexShrink: 0, fontSize: '0.8rem' }}>
                  {lvl.label}
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={lvl.pct}
                    sx={{
                      height: 8,
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${PINK[400]}, ${VIOLET[400]})`,
                      },
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: PINK[300], width: 85, textAlign: 'right', fontSize: '0.8rem' }}>
                  {lvl.range}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* CTA buttons */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button variant="contained" fullWidth sx={{ py: 1.5 }}>
          Find a mentor for this path →
        </Button>
        <Button variant="outlined" fullWidth sx={{ py: 1.5 }}>
          Browse free courses →
        </Button>
      </Stack>
    </Box>
  );
}
