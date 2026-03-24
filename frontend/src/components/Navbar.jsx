import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Stack,
  Box, IconButton, Drawer, List, ListItem, ListItemText,
  alpha, useMediaQuery, useTheme
} from '@mui/material';
import { PINK, VIOLET } from '../theme/theme';

const navLinks = ['Explore', 'Mentors', 'Community', 'Stories', 'Resources','SexEd','Health'];

export default function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? alpha('#0D0818', 0.88) : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${alpha(VIOLET[400], 0.18)}` : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 3, md: 6 }, py: 1 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => onNavigate('home')}>
            <Box sx={{
              width: 32, height: 32, borderRadius: '10px',
              background: `linear-gradient(135deg, ${PINK[400]}, ${VIOLET[500]})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 16px ${alpha(PINK[500], 0.4)}`,
            }}>
              <Typography sx={{ fontSize: '1rem', color: '#fff', fontWeight: 700, lineHeight: 1 }}>W</Typography>
            </Box>
            <Typography sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700, fontSize: '1.2rem',
              background: `linear-gradient(135deg, ${PINK[200]}, ${VIOLET[200]})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Wrise
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }} />

          {!isMobile && (
            <Stack direction="row" spacing={0.5} mr={3}>
              {navLinks.map(link => (
                <Button
                  key={link}
                  onClick={() => onNavigate(link.toLowerCase())}
                  sx={{
                    color: 'text.secondary', fontWeight: 400, fontSize: '0.875rem',
                    '&:hover': { color: 'text.primary', background: alpha(VIOLET[400], 0.08) },
                  }}
                >
                  {link}
                </Button>
              ))}
            </Stack>
          )}

          <Button
            variant="contained"
            size="small"
            onClick={() => onNavigate('quiz')}
            sx={{ fontSize: '0.8rem', px: 2.5, display: { xs: 'none', sm: 'flex' } }}
          >
            Get started
          </Button>

          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'text.primary', ml: 1 }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
                <rect y="4" width="22" height="2" rx="1"/>
                <rect y="10" width="16" height="2" rx="1"/>
                <rect y="16" width="20" height="2" rx="1"/>
              </svg>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right" open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { background: '#140D24', width: 260, pt: 2 } }}
      >
        <List>
          {navLinks.map(link => (
            <ListItem
              key={link} button
              onClick={() => { onNavigate(link.toLowerCase()); setDrawerOpen(false); }}
              sx={{ '&:hover': { background: alpha(VIOLET[400], 0.08) } }}
            >
              <ListItemText primary={link} primaryTypographyProps={{ color: 'text.primary' }} />
            </ListItem>
          ))}
          <ListItem sx={{ mt: 2, px: 2 }}>
            <Button variant="contained" fullWidth onClick={() => { onNavigate('quiz'); setDrawerOpen(false); }}>
              Get started
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
