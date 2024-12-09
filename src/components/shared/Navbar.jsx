import * as React from 'react';
import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAppStore } from '../../appStore'; 
import MuiAppBar from '@mui/material/AppBar';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth-service";
import useAuth from "../../hooks/useAuth";


import { createTheme,ThemeProvider } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Label } from '@mui/icons-material';
const theme = createTheme({
  palette: {
    primary: {
      main: '#0E8388',
      },
    },});
const AppBar = styled(MuiAppBar, {
})(({ theme}) => ({
  zIndex: theme.zIndex.drawer + 1,
}));





export default function Navbar() {
    
  // const {username,status} =useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const updateOpen =useAppStore((state)=>state.updateOpen);
  const dopen =useAppStore((state)=>state.dopen);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {navigate("/profile")}} >Profile</MenuItem>
      <MenuItem onClick={() => {
        AuthService.logout()
          //  this.props.router.navigate("/afficherPatients");
          navigate("/SeConnecter");
          window.location.reload();
         
      }
}>Se déconnecter</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
     
      <MenuItem onClick={() => {navigate("/profile")}}>Profile</MenuItem>
      <MenuItem onClick={() => {
         AuthService.logout();
          
            //  this.props.router.navigate("/afficherPatients");
            navigate("/SeConnecter");
            window.location.reload();
         
      }}>Se déconnecter</MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="fixed" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={()=>updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={() => {navigate("/")}}

            >
          TN Stroke
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
         
            

           
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </ThemeProvider>
  );
}