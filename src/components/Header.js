import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  useScrollTrigger,
  Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = ['about', 'skills', 'projects', 'contact'];

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false); // close drawer after click
  };

  return (
    <HideOnScroll>
      <AppBar position="fixed" color="primary" elevation={4}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo / Name */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => scrollTo('hero')}
          >
            Ekalavya
          </Typography>

          {/* Desktop Nav */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navItems.map((item) => (
                <Button key={item} color="inherit" onClick={() => scrollTo(item)}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Button>
              ))}
            </Box>
          ) : (
            // Mobile Menu Icon
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 250, mt: 4 }}>
                  <List>
                    {navItems.map((item) => (
                      <ListItem key={item} disablePadding>
                        <ListItemButton onClick={() => scrollTo(item)}>
                          <ListItemText primary={item.charAt(0).toUpperCase() + item.slice(1)} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
