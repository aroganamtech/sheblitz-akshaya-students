import React from 'react';
import { Box, Typography, Button, Stack, Chip, alpha } from '@mui/material';
import { PINK, VIOLET } from '../theme/theme';

const FloatingOrb = ({ size, color, top, left, right, bottom, opacity = 0.18, delay = 0 }) => (
  <Box sx={{
    position: 'absolute', width: size, height: size, borderRadius: '50%',
    background: color, filter: 'blur(60px)', opacity,
    top, left, right, bottom,
    animation: `floatOrb 8s ease-in-out ${delay}s infinite`,
    '@keyframes floatOrb': {
      '0%,100%': { transform: 'translateY(0px) scale(1)' },
      '50%': { transform: 'translateY(-24px) scale(1.05)' },
    },
    pointerEvents: 'none',
  }} />
);

const stats = [
  { value: '2.4M+', label: 'Women guided' },
  { value: '340+', label: 'Career paths' },
  { value: '92%', label: 'Placement rate' },
  { value: '₹8L', label: 'Avg first salary' },
];

export default function HeroSection({ onExplore }) {
  return (
    <Box sx={{
      position: 'relative', overflow: 'hidden',
      minHeight: { xs: 'auto', md: '92vh' },
      display: 'flex', alignItems: 'center',
      pt: { xs: 10, md: 6 }, pb: { xs: 8, md: 4 },
    }}>
      <FloatingOrb size={500} color={VIOLET[600]} top="-10%" left="-5%" opacity={0.22} delay={0} />
      <FloatingOrb size={400} color={PINK[500]}   top="20%" right="-8%" opacity={0.18} delay={2} />
      <FloatingOrb size={300} color={VIOLET[400]} bottom="5%" left="30%" opacity={0.14} delay={4} />

      {/* Grid texture overlay */}
      <Box sx={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(${alpha(VIOLET[400], 0.04)} 1px, transparent 1px),
          linear-gradient(90deg, ${alpha(VIOLET[400], 0.04)} 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 } }}>
        <Stack spacing={4} sx={{ maxWidth: 780 }}>

          <Box sx={{ display: 'inline-flex', width: 'fit-content' }}>
            <Chip
              label="✦  India's #1 Women's Career Platform"
              color="secondary"
              size="small"
              sx={{
                px: 1.5, py: 0.5, fontSize: '0.75rem', letterSpacing: '0.05em',
                background: alpha(VIOLET[500], 0.2),
                border: `1px solid ${alpha(VIOLET[300], 0.4)}`,
                color: VIOLET[200],
                animation: 'pulse 3s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%,100%': { boxShadow: `0 0 0 0 ${alpha(VIOLET[400], 0.3)}` },
                  '50%': { boxShadow: `0 0 0 8px ${alpha(VIOLET[400], 0)}` },
                },
              }}
            />
          </Box>

          <Typography variant="h1" sx={{
            fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5rem' },
            lineHeight: 1.08,
            color: 'text.primary',
            '& .accent': {
              background: `linear-gradient(135deg, ${PINK[300]} 0%, ${VIOLET[300]} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          }}>
            Your <span className="accent">career</span>,<br />
            your <span className="accent">rules.</span>
          </Typography>

          <Typography variant="body1" sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            color: 'text.secondary', maxWidth: 560, lineHeight: 1.8,
          }}>
            Discover career paths built around your life — your skills, your schedule,
            your ambitions. From first job to founder, we've got the roadmap.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} pt={1}>
            <Button variant="contained" size="large" onClick={onExplore} sx={{ fontSize: '1rem', px: 4, py: 1.5 }}>
              Explore career paths
            </Button>
            <Button variant="outlined" size="large" sx={{ fontSize: '1rem', px: 4, py: 1.5 }}>
              Watch success stories
            </Button>
          </Stack>

          {/* Stats row */}
          <Box sx={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2, pt: 4,
            borderTop: `1px solid ${alpha(VIOLET[400], 0.18)}`,
          }}>
            {stats.map(s => (
              <Box key={s.label}>
                <Typography sx={{
                  fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                  background: `linear-gradient(135deg, ${PINK[300]}, ${VIOLET[300]})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {s.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
