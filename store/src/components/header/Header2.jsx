import {
  ExpandMore,
  Person2Outlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Container,
  IconButton,
  InputBase,
  Stack,
  Typography,
  Badge,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from '../../firbase/config';
// Search
const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #777",
  "&:hover": {
    border: "1px solid #333",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "266px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "330px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// Badge
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header2 = () => {
  const [value, loading, error] = useCollection(query(collection(db, "cart"), orderBy("id")));
  // Menu in Search
  const options = ["All Categories", "CAR", "Clothes", "Electronics"];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();

  const navigate = useNavigate();

  if(value){
    return (
      <Container sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
        <Stack alignItems={"center"}>
          <ShoppingCartOutlined />
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            variant="body2"
          >
            E-commerce
          </Typography>
        </Stack>
  
        <Search
          sx={{
            display: "flex",
            borderRadius: "22px",
            justifyContent: "space-between",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
          <List
            component="nav"
            aria-label="Device settings"
            sx={{
              // @ts-ignore
              bgcolor: theme.palette.myColor.main,
              borderBottomRightRadius: 22,
              borderTopRightRadius: 22,
              p: 0,
            }}
          >
            <ListItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
            >
              <ListItemText
                sx={{
                  width: 93,
                  textAlign: "center",
                  "&:hover": { cursor: "pointer" },
                }}
                secondary={options[selectedIndex]}
              />
              <ExpandMore sx={{ fontSize: "16px" }} />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                sx={{ fontSize: "13px" }}
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Search>
  
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
            <StyledBadge
              badgeContent={value.docs.length}
              color="primary"
              sx={{ mr: 1 }}
            >
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          <IconButton>
            <Person2Outlined />
          </IconButton>
        </Stack>
      </Container>
    );
  }

  
};

export default Header2;
