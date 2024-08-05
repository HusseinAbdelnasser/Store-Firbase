import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import WindowIcon from "@mui/icons-material/Window";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import {
  SportsEsportsOutlined,
  ElectricBikeOutlined,
  LaptopChromebookOutlined,
  MenuBookOutlined,
  Close,
} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Links from "./Links";


const Header3 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Drawer
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const theme = useTheme();
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 5,
      }}
    >

      <Box>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            width: 222,
            // @ts-ignore
            bgcolor: theme.palette.myColor.main,
            color: theme.palette.text.secondary,
          }}
        >
          <WindowIcon />
          <Typography
            sx={{
              padding: "0",
              textTransform: "captalize",
              mx: 1,
            }}
          >
            Categories
          </Typography>
          <Box flexGrow={1} />
          <KeyboardArrowRightOutlinedIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            ".MuiPaper-root": {
              width: 220,
              // @ts-ignore
              bgcolor: theme.palette.myColor.main,
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SportsEsportsOutlined />
            </ListItemIcon>
            <ListItemText>Bikes</ListItemText>

         </MenuItem>
         <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ElectricBikeOutlined />
            </ListItemIcon>
            <ListItemText>Electronics</ListItemText>

         </MenuItem>
         <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <MenuBookOutlined />
            </ListItemIcon>
            <ListItemText>Books</ListItemText>

         </MenuItem>
         <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LaptopChromebookOutlined />
            </ListItemIcon>
            <ListItemText>Games</ListItemText>
         </MenuItem>
        </Menu>

      </Box>

        {useMediaQuery("(min-width:1200px)") && (
          <Stack gap={4} direction={"row"} alignItems={"center"}>
            <Links title={"Home"} />
            <Links title={"Mega Menu"} />
            <Links title={"Full Screen Menu"} />
            <Links title={"pages"} />
            <Links title={"User Account"} />
            <Links title={"Vendor Account"} />
          </Stack>
        )}

        {useMediaQuery('(max-width: 1200px)') && (
          <IconButton onClick={toggleDrawer("top", true)}>
           <MenuIcon />
         </IconButton>
        )}
        
        <Drawer
          anchor={"top"}
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
          sx={{ 
            ".MuiPaper-root.css-1sozasi-MuiPaper-root-MuiDrawer-paper" :{
              height: "100%",
            },
          }}
        >

          <Box sx={{width: 444, mx: "auto", mt: 6, position: "relative", pt: 10}}>
            <IconButton 
            sx={{
                position:"absolute",
                top: 0,
                right: 0,
                ":hover": {color: "red", rotate: "180deg", transition:"0.3s"}
              }} 
              onClick={toggleDrawer("top", false)}> 
              <Close />
            </IconButton>

              
            {[
              { mainLink: "Home", subLinks: ["Link 1", "Link 2", "Link 3"] },
              { mainLink: "Mega menu", subLinks: ["Link 1", "Link 2", "Link 3"] },
              {
                mainLink: "full screen menu",
                subLinks: ["Link 1", "Link 2", "Link 3"],
              },
              { mainLink: "pages", subLinks: ["Link 1", "Link 2", "Link 3"] },
              {
                mainLink: "user account",
                subLinks: ["Link 1", "Link 2", "Link 3"],
              },
              {
                mainLink: "vendor account",
                subLinks: ["Link 1", "Link 2", "Link 3"],
              },
            ].map((item) => {
              return (
                <Accordion
                  key={item.mainLink}
                  elevation={0}
                  sx={{ bgcolor: "initial" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{item.mainLink}</Typography>
                  </AccordionSummary>

                  <List sx={{ py: 0, my: 0 }}>
                    {item.subLinks.map((link) => {
                      return (
                        <ListItem key={link} sx={{ py: 0, my: 0 }}>
                          <ListItemButton>
                            <ListItemText primary={link} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Accordion>
              );
            })}
          </Box>
          
       </Drawer>
      
    </Container>
  );
};

export default Header3;
