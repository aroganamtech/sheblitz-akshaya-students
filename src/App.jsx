import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Container, alpha } from '@mui/material';
import { theme, PINK, VIOLET } from './theme/theme';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CareerQuiz from './components/CareerQuiz';
import CareerResults from './components/CareerResults';
import RoadmapPage from './components/RoadmapPage';

const PageWrapper = ({ children }) => (
  <Box sx={{ pt: { xs: 8, md: 10 }, minHeight: '100vh' }}>
    {children}
  </Box>
);

export default function App() {
  const [page, setPage] = useState('home');
  const [quizAnswers, setQuizAnswers] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar currentPage={page} onNavigate={navigate} />

      {page === 'home' && (
        <PageWrapper>
          <HeroSection onExplore={() => navigate('quiz')} />
          <FeaturesSection />
          {/* CTA banner */}
          <Box sx={{
            py: { xs: 8, md: 12 }, textAlign: 'center',
            px: 3,
          }}>
            <Box sx={{
              maxWidth: 700, mx: 'auto', p: { xs: 4, md: 6 },
              borderRadius: 5,
              background: `linear-gradient(135deg, ${alpha(PINK[600], 0.25)}, ${alpha(VIOLET[600], 0.25)})`,
              border: `1px solid ${alpha(PINK[400], 0.25)}`,
            }}>
              <Box sx={{
                fontSize: '2.5rem', mb: 2,
                background: `linear-gradient(135deg, ${PINK[300]}, ${VIOLET[300]})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontFamily: '"Playfair Display", serif', fontWeight: 700,
              }}>
                Ready to find your path?
              </Box>
              <Box sx={{ color: 'text.secondary', mb: 4, fontSize: '1.05rem' }}>
                Take the 3-minute quiz and get matched to career paths that fit your real life.
              </Box>
              <Box
                component="button"
                onClick={() => navigate('quiz')}
                sx={{
                  px: 5, py: 1.75,
                  background: `linear-gradient(135deg, ${PINK[400]}, ${VIOLET[500]})`,
                  color: '#fff', border: 'none', borderRadius: 50,
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '1rem', fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: `0 8px 32px ${alpha(PINK[500], 0.4)}`,
                  transition: 'all 0.25s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 40px ${alpha(PINK[400], 0.5)}`,
                  },
                }}
              >
                Start the career quiz →
              </Box>
            </Box>
          </Box>
        </PageWrapper>
      )}

      {page === 'quiz' && (
        <PageWrapper>
          <Container maxWidth="md" sx={{ py: 6 }}>
            <CareerQuiz
              onComplete={(answers) => {
                setQuizAnswers(answers);
                navigate('results');
              }}
            />
          </Container>
        </PageWrapper>
      )}

      {page === 'results' && (
        <PageWrapper>
          <Container maxWidth="lg" sx={{ py: 6 }}>
            <CareerResults
              answers={quizAnswers}
              onSelectPath={(path) => {
                setSelectedPath(path);
                navigate('roadmap');
              }}
              onRetake={() => navigate('quiz')}
            />
          </Container>
        </PageWrapper>
      )}

      {page === 'roadmap' && (
        <PageWrapper>
          <Container maxWidth="md" sx={{ py: 6 }}>
            <RoadmapPage
              path={selectedPath}
              onBack={() => navigate('results')}
            />
          </Container>
        </PageWrapper>
      )}
    </ThemeProvider>
  );
}
