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
  Menu,
  MenuItem,
  Divider,
  Container,
  Chip,
  ListItemIcon,
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
  KeyboardArrowDown,
  LocalOffer,
  Notifications,
  Store,
} from "@mui/icons-material";
import { ShoppingBag } from "lucide-react";
import { categories } from "@/lib/mockData";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [categoriesAnchor, setCategoriesAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);

  const profileMenuOpen = Boolean(profileAnchor);
  const categoriesMenuOpen = Boolean(categoriesAnchor);
  const notificationsMenuOpen = Boolean(notificationsAnchor);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Sale", href: "/sale", badge: "Hot" },
  ];

  // Mock notifications
  const notifications = [
    { id: 1, text: "Your order #1234 has been shipped", time: "2 hours ago", read: false },
    { id: 2, text: "New sale: Up to 50% off on selected items", time: "5 hours ago", read: false },
    { id: 3, text: "Your wishlist item is back in stock", time: "1 day ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const drawer = (
    <Box sx={{ width: 280, height: "100%" }}>
      {/* Drawer Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ShoppingBag className="w-6 h-6" />
          <Typography variant="h6" fontWeight="bold">
            SHOPDEE
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* User Info - Mobile */}
      <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderBottom: "1px solid #e0e0e0" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <AccountCircle sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              John Doe
            </Typography>
            <Typography variant="caption" color="text.secondary">
              john@example.com
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{ py: 1.5 }}
            >
              <ListItemText primary={item.label} />
              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  color="error"
                  sx={{ height: 18, fontSize: "0.65rem", py: 0.25 }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Categories in Mobile Menu */}
        <ListItem>
          <ListItemText
            primary="Categories"
            primaryTypographyProps={{ variant: "caption", color: "text.secondary" }}
          />
        </ListItem>
        {categories.map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton
              component={Link}
              href={`/category/${category.id}`}
              onClick={handleDrawerToggle}
              sx={{ pl: 3 }}
            >
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Account Actions */}
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/profile" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/orders" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/settings" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleDrawerToggle} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <Logout color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Promo Banner */}
      <Box
        sx={{
          bgcolor: "black",
          color: "white",
          py: 0.75,
          textAlign: "center",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.75,
              fontSize: { xs: "0.75rem", sm: "0.875rem" }
            }}
          >
            <LocalOffer sx={{ fontSize: 16 }} />
            <span>Free Shipping on Orders Over ฿1,000 • Use Code: FREESHIP</span>
          </Typography>
        </Container>
      </Box>

      {/* Main Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "black",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 1, px: { xs: 0, sm: 2 } }}>
            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ShoppingBag className="w-7 h-7" />
                <Typography
                  variant="h5"
                  component="div"
                  fontWeight="bold"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    letterSpacing: "-0.5px",
                  }}
                >
                  SHOPDEE
                </Typography>
              </Box>
            </Link>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, flexGrow: 1, ml: 6 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: "black",
                    textTransform: "none",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    px: 2,
                    "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
                    position: "relative",
                  }}
                  endIcon={
                    item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        color="error"
                        sx={{ height: 16, fontSize: "0.6rem", fontWeight: "bold", py: 0.25 }}
                      />
                    )
                  }
                >
                  {item.label}
                </Button>
              ))}

              {/* Categories Dropdown */}
              <Button
                onClick={(e) => setCategoriesAnchor(e.currentTarget)}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  px: 2,
                  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
                }}
              >
                Categories
              </Button>
            </Box>

            {/* Right Icons */}
            <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
              {/* Notifications - Desktop Only */}
              <IconButton
                color="inherit"
                onClick={(e) => setNotificationsAnchor(e.currentTarget)}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Badge badgeContent={unreadCount} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              {/* Cart */}
              <IconButton color="inherit" component={Link} href="/cart">
                <Badge badgeContent={2} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {/* User Profile - Desktop Only */}
              <IconButton
                color="inherit"
                onClick={(e) => setProfileAnchor(e.currentTarget)}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <Person />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Categories Mega Menu */}
      <Menu
        anchorEl={categoriesAnchor}
        open={categoriesMenuOpen}
        onClose={() => setCategoriesAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 250,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 1, display: "block" }}>
            SHOP BY CATEGORY
          </Typography>
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              component={Link}
              href={`/category/${category.id}`}
              onClick={() => setCategoriesAnchor(null)}
              sx={{
                borderRadius: 1,
                mx: 1,
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Store sx={{ mr: 2, fontSize: 20, color: "text.secondary" }} />
              {category.name}
            </MenuItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <MenuItem
            component={Link}
            href="/explore"
            onClick={() => setCategoriesAnchor(null)}
            sx={{
              borderRadius: 1,
              mx: 1,
              color: "primary.main",
              fontWeight: 600,
            }}
          >
            View All Products
          </MenuItem>
        </Box>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={notificationsMenuOpen}
        onClose={() => setNotificationsAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 360,
              maxHeight: 400,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Notifications
          </Typography>
        </Box>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsAnchor(null)}
              sx={{
                py: 1.5,
                px: 2,
                borderBottom: "1px solid #f5f5f5",
                bgcolor: notification.read ? "transparent" : "rgba(25, 118, 210, 0.04)",
                "&:hover": {
                  bgcolor: notification.read ? "rgba(0,0,0,0.04)" : "rgba(25, 118, 210, 0.08)",
                },
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {notification.text}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          </Box>
        )}
        <Box sx={{ p: 1.5, textAlign: "center", borderTop: "1px solid #e0e0e0" }}>
          <Button
            size="small"
            component={Link}
            href="/notifications"
            onClick={() => setNotificationsAnchor(null)}
            sx={{ textTransform: "none" }}
          >
            View All Notifications
          </Button>
        </Box>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchor}
        open={profileMenuOpen}
        onClose={() => setProfileAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 220,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* User Info */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="subtitle2" fontWeight="bold">
            John Doe
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            john@example.com
          </Typography>
        </Box>

        {/* Menu Items */}
        <MenuItem
          component={Link}
          href="/profile"
          onClick={() => setProfileAnchor(null)}
          sx={{ py: 1.5 }}
        >
          <AccountCircle sx={{ mr: 2 }} fontSize="small" />
          My Profile
        </MenuItem>
        <MenuItem
          component={Link}
          href="/orders"
          onClick={() => setProfileAnchor(null)}
          sx={{ py: 1.5 }}
        >
          <Receipt sx={{ mr: 2 }} fontSize="small" />
          My Orders
        </MenuItem>
        <MenuItem
          component={Link}
          href="/wishlist"
          onClick={() => setProfileAnchor(null)}
          sx={{ py: 1.5 }}
        >
          <Favorite sx={{ mr: 2 }} fontSize="small" />
          Wishlist
        </MenuItem>
        <MenuItem
          component={Link}
          href="/settings"
          onClick={() => setProfileAnchor(null)}
          sx={{ py: 1.5 }}
        >
          <Settings sx={{ mr: 2 }} fontSize="small" />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => setProfileAnchor(null)}
          sx={{ py: 1.5, color: "error.main" }}
        >
          <Logout sx={{ mr: 2 }} fontSize="small" />
          Logout
        </MenuItem>
      </Menu>

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
