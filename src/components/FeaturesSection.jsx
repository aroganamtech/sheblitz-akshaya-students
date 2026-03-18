import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Stack, Chip, alpha } from '@mui/material';
import { PINK, VIOLET } from '../theme/theme';

const features = [
  {
    icon: '◈',
    title: 'Career Path Explorer',
    description: 'Quiz-based path finder that adapts to your life stage, schedule, and skills.',
    color: PINK[400],
    tags: ['Quiz', 'Personalized'],
  },
  {
    icon: '◉',
    title: 'Business & Startup Hub',
    description: 'Validate your idea, find funding, and connect with women-led incubators.',
    color: VIOLET[400],
    tags: ['Funding', 'Mentorship'],
  },
  {
    icon: '◎',
    title: 'Mentor Matchmaking',
    description: 'Get matched 1:1 with mentors in your exact domain and life situation.',
    color: '#E8A0FF',
    tags: ['1:1 Sessions', 'Free'],
  },
  {
    icon: '◍',
    title: 'Skill Gap Analyzer',
    description: 'Know exactly what to learn next. Mapped to real job requirements.',
    color: PINK[300],
    tags: ['Learning', 'Courses'],
  },
  {
    icon: '◐',
    title: 'Community Forums',
    description: 'Peer circles grouped by career stage. Real talk, real support.',
    color: VIOLET[300],
    tags: ['Community', 'Peer support'],
  },
  {
    icon: '◑',
    title: 'Return-to-Work Kit',
    description: 'Tailored resources for women returning after a break or maternity leave.',
    color: '#FF6B9D',
    tags: ['Returners', 'Flexible'],
  },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 }, maxWidth: 1200, mx: 'auto' }}>
      <Stack alignItems="center" textAlign="center" mb={8}>
        <Typography variant="overline" sx={{ color: VIOLET[300], mb: 1 }}>
          Everything you need
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, maxWidth: 540 }}>
          Built for every stage of your journey
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, maxWidth: 480 }}>
          Whether you're just starting or scaling up, the career module has a path for you.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {features.map((f, i) => (
          <Grid item xs={12} sm={6} md={4} key={f.title}>
            <Card sx={{
              height: '100%',
              animationDelay: `${i * 0.1}s`,
              background: alpha('#1A0F2E', 0.7),
            }}>
              <CardContent sx={{ p: '24px !important' }}>
                <Box sx={{
                  width: 48, height: 48, borderRadius: '14px',
                  background: alpha(f.color, 0.15),
                  border: `1px solid ${alpha(f.color, 0.3)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', color: f.color, mb: 2,
                }}>
                  {f.icon}
                </Box>
                <Typography variant="h6" sx={{ fontSize: '1rem', mb: 1 }}>
                  {f.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.65 }}>
                  {f.description}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {f.tags.map(t => (
                    <Chip
                      key={t} label={t} size="small"
                      sx={{
                        fontSize: '0.68rem', height: 22,
                        background: alpha(f.color, 0.1),
                        color: f.color,
                        border: `1px solid ${alpha(f.color, 0.2)}`,
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
