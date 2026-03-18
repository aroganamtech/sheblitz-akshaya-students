import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, Button,
  Chip, LinearProgress, Divider, Grid, alpha
} from '@mui/material';
import { PINK, VIOLET } from '../theme/theme';

const careerPaths = [
  {
    id: 'ux',
    title: 'UX / Product Designer',
    match: 92,
    salary: '₹6–18 LPA',
    timeline: '6–9 months',
    remote: true,
    tags: ['Creative', 'User-centered', 'Remote-friendly'],
    skills: ['Figma', 'User Research', 'Prototyping', 'Wireframing'],
    description: 'Design digital experiences that delight users. High demand, great pay, fully remote-compatible.',
    color: PINK[400],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing Lead',
    match: 78,
    salary: '₹4–12 LPA',
    timeline: '3–4 months',
    remote: true,
    tags: ['Communication', 'Analytics', 'Flexible'],
    skills: ['SEO/SEM', 'Content Strategy', 'Social Media', 'Analytics'],
    description: 'Drive brand growth through digital channels. Fast entry, strong upward path.',
    color: VIOLET[400],
  },
  {
    id: 'hr',
    title: 'HR & People Operations',
    match: 71,
    salary: '₹3–9 LPA',
    timeline: '1–2 months',
    remote: false,
    tags: ['People skills', 'Empathy', 'Stable'],
    skills: ['Recruitment', 'HR policies', 'Culture building', 'Conflict resolution'],
    description: 'Shape company culture and support teams. Leverages your people instincts naturally.',
    color: '#B06FE8',
  },
  {
    id: 'data',
    title: 'Data Analyst',
    match: 65,
    salary: '₹5–15 LPA',
    timeline: '4–6 months',
    remote: true,
    tags: ['Analytical', 'High growth', 'Tech-adjacent'],
    skills: ['Excel / SQL', 'Python basics', 'Tableau', 'Statistics'],
    description: 'Turn raw data into business insights. One of the fastest-growing roles in India.',
    color: '#FF6B9D',
  },
];

function MatchBar({ value, color }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6, borderRadius: 3,
          background: alpha('#fff', 0.07),
          '& .MuiLinearProgress-bar': {
            background: `linear-gradient(90deg, ${color}, ${alpha(VIOLET[300], 0.8)})`,
          },
        }}
      />
    </Box>
  );
}

export default function CareerResults({ onSelectPath, onRetake }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 2, md: 0 } }}>
      <Stack spacing={0.5} mb={5}>
        <Typography variant="overline" sx={{ color: PINK[300], letterSpacing: '0.1em' }}>
          Your results
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
          4 paths matched for you
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Based on your skills, schedule, and goals. Click any path to explore the full roadmap.
        </Typography>
      </Stack>

      <Stack spacing={2.5}>
        {careerPaths.map((path, i) => (
          <Card
            key={path.id}
            onClick={() => setExpanded(expanded === path.id ? null : path.id)}
            sx={{
              cursor: 'pointer',
              border: i === 0
                ? `1.5px solid ${alpha(PINK[400], 0.6)}`
                : `1px solid ${alpha(VIOLET[400], 0.18)}`,
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {i === 0 && (
              <Chip
                label="✦ Best match"
                size="small"
                sx={{
                  position: 'absolute', top: -14, left: 20,
                  background: `linear-gradient(135deg, ${PINK[500]}, ${VIOLET[600]})`,
                  color: '#fff', fontWeight: 700, fontSize: '0.7rem',
                  boxShadow: `0 4px 16px ${alpha(PINK[500], 0.4)}`,
                }}
              />
            )}

            <CardContent sx={{ p: '20px 24px !important' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                {/* Match circle */}
                <Box sx={{
                  width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
                  background: `conic-gradient(${path.color} ${path.match * 3.6}deg, ${alpha('#fff', 0.07)} 0deg)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  <Box sx={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: alpha('#140D24', 0.95),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: path.color }}>
                      {path.match}%
                    </Typography>
                  </Box>
                </Box>

                {/* Main info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h5" sx={{ fontSize: '1.1rem', mb: 0.5 }}>
                    {path.title}
                  </Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                    <Typography variant="body2" sx={{ color: PINK[300], fontWeight: 600 }}>
                      {path.salary}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      · {path.timeline} to first role
                    </Typography>
                    {path.remote && (
                      <Chip label="Remote-friendly" size="small" color="secondary" sx={{ height: 20, fontSize: '0.68rem' }} />
                    )}
                  </Stack>
                </Box>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={(e) => { e.stopPropagation(); onSelectPath(path); }}
                  sx={{ flexShrink: 0, fontSize: '0.8rem', px: 2.5 }}
                >
                  View roadmap →
                </Button>
              </Stack>

              {/* Expanded section */}
              {expanded === path.id && (
                <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${alpha(VIOLET[400], 0.15)}` }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {path.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mb={2}>
                    {path.tags.map(t => (
                      <Chip key={t} label={t} size="small" color="primary" />
                    ))}
                  </Stack>
                  <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                    Key skills you'll build
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {path.skills.map(s => (
                      <Chip
                        key={s} label={s} size="small"
                        sx={{
                          background: alpha(path.color, 0.1),
                          color: path.color,
                          border: `1px solid ${alpha(path.color, 0.25)}`,
                          fontSize: '0.72rem',
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Stack direction="row" justifyContent="center" mt={5}>
        <Button variant="text" onClick={onRetake} sx={{ color: 'text.secondary' }}>
          ↺ Retake the quiz
        </Button>
      </Stack>
    </Box>
  );
}
