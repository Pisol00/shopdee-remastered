"use client";
import Link from "next/link";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  Person,
  Menu as MenuIcon,
  Close as CloseIcon,
  AccountCircle,
  Settings,
  Logout,
  Receipt,
} from "@mui/icons-material";
import { Search, ShoppingBag, Package } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const profileMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          SHOPDEE
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} href={item.href} onClick={handleDrawerToggle}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "white", color: "black", boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShoppingBag className="w-6 h-6" />
              <Typography
                variant="h6"
                component="div"
                fontWeight="bold"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                SHOPDEE
              </Typography>
            </Box>
          </Link>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, flexGrow: 1, ml: 4 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                sx={{
                  color: "black",
                  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Search Bar - Desktop */}
          <Box sx={{ display: { xs: "none", md: "block" }, flexGrow: 1, maxWidth: 400, mx: 2 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search for products..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-5 h-5 text-gray-400" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 50 },
              }}
            />
          </Box>

          {/* Right Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* Search Icon - Mobile */}
            <IconButton
              color="inherit"
              onClick={() => setSearchOpen(!searchOpen)}
              sx={{ display: { md: "none" } }}
            >
              <Search className="w-5 h-5" />
            </IconButton>

            {/* Wishlist */}
            <IconButton color="inherit" component={Link} href="/wishlist">
              <Badge badgeContent={3} color="error">
                <Favorite />
              </Badge>
            </IconButton>

            {/* Cart */}
            <IconButton color="inherit" component={Link} href="/cart">
              <Badge badgeContent={2} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* User Profile */}
            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
              aria-controls={profileMenuOpen ? 'profile-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={profileMenuOpen ? 'true' : undefined}
            >
              <Person />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Profile Dropdown Menu */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={profileMenuOpen}
          onClose={handleProfileMenuClose}
          slotProps={{
            paper: {
              'aria-labelledby': 'profile-button',
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          sx={{ mt: 1 }}
        >
          {/* User Info */}
          <Box sx={{ px: 2, py: 1.5, minWidth: 200 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              john@example.com
            </Typography>
          </Box>
          <Divider />

          {/* Menu Items */}
          <MenuItem component={Link} href="/profile" onClick={handleProfileMenuClose}>
            <AccountCircle sx={{ mr: 2 }} fontSize="small" />
            My Profile
          </MenuItem>
          <MenuItem component={Link} href="/orders" onClick={handleProfileMenuClose}>
            <Receipt sx={{ mr: 2 }} fontSize="small" />
            My Orders
          </MenuItem>
          <MenuItem component={Link} href="/wishlist" onClick={handleProfileMenuClose}>
            <Favorite sx={{ mr: 2 }} fontSize="small" />
            Wishlist
          </MenuItem>
          <MenuItem component={Link} href="/settings" onClick={handleProfileMenuClose}>
            <Settings sx={{ mr: 2 }} fontSize="small" />
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose} sx={{ color: 'error.main' }}>
            <Logout sx={{ mr: 2 }} fontSize="small" />
            Logout
          </MenuItem>
        </Menu>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <Box sx={{ px: 2, pb: 2, display: { md: "none" } }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search for products..."
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-5 h-5 text-gray-400" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 50 },
              }}
            />
          </Box>
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
