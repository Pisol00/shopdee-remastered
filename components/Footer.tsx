"use client";
import Link from "next/link";
import { Box, Container, Grid, Typography, TextField, Button, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube, Email, Phone, LocationOn, CreditCard, AccountBalance } from "@mui/icons-material";
import { ShoppingBag } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    shop: [
      { label: "All Products", href: "/explore" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Sale", href: "/sale" },
    ],
    customerService: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "FAQ", href: "/faq" },
    ],
    about: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: <Facebook />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram />, href: "https://instagram.com", label: "Instagram" },
    { icon: <YouTube />, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <Box component="footer" sx={{ bgcolor: "#1a1a1a", color: "white", pt: 6, pb: 3 }}>
      <Container maxWidth="xl">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Company Info */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <ShoppingBag className="w-7 h-7" />
              <Typography variant="h6" fontWeight="bold">
                SHOPDEE
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: "#b0b0b0", lineHeight: 1.7 }}>
              Your one-stop destination for fashion and lifestyle. Quality products at the best prices.
            </Typography>
            {/* Social Media */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    bgcolor: "#2d2d2d",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#404040",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links - Shop */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Shop
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {footerLinks.shop.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#b0b0b0",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Customer Service
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {footerLinks.customerService.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#b0b0b0",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* About */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              About
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {footerLinks.about.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#b0b0b0",
                      "&:hover": { color: "white" },
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#b0b0b0", lineHeight: 1.7 }}>
              Subscribe to get special offers, free giveaways, and updates.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <TextField
                size="small"
                placeholder="Your email"
                sx={{
                  flex: 1,
                  bgcolor: "#2d2d2d",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "#3d3d3d",
                    },
                    "&:hover fieldset": {
                      borderColor: "#4d4d4d",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5d5d5d",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#808080",
                    opacity: 1,
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "black",
                  px: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#f0f0f0",
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>

            {/* Contact Info */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone sx={{ fontSize: 18, color: "#b0b0b0" }} />
                <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                  +66 (0) 2-123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email sx={{ fontSize: 18, color: "#b0b0b0" }} />
                <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                  support@shopdee.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationOn sx={{ fontSize: 18, color: "#b0b0b0", mt: 0.2 }} />
                <Typography variant="body2" sx={{ color: "#b0b0b0", lineHeight: 1.6 }}>
                  123 Shopping Street, Bangkok, Thailand 10100
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "#2d2d2d", mb: 3 }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#808080", textAlign: { xs: "center", sm: "left" } }}>
            © {new Date().getFullYear()} SHOPDEE. All rights reserved.
          </Typography>

          {/* Payment Methods */}
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <Typography variant="body2" sx={{ color: "#808080", mr: 0.5, fontSize: "0.875rem" }}>
              We accept:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#2d2d2d",
                px: 2,
                py: 1,
                borderRadius: 2,
                border: "1px solid #3d3d3d",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: "#1a1a1a",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "#404040",
                  },
                }}
              >
                <CreditCard sx={{ fontSize: 16, color: "#b0b0b0" }} />
                <Typography variant="caption" sx={{ color: "#e0e0e0", fontWeight: "600", fontSize: "0.75rem" }}>
                  VISA
                </Typography>
              </Box>
              
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: "#1a1a1a",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "#404040",
                  },
                }}
              >
                <CreditCard sx={{ fontSize: 16, color: "#b0b0b0" }} />
                <Typography variant="caption" sx={{ color: "#e0e0e0", fontWeight: "600", fontSize: "0.75rem" }}>
                  MASTERCARD
                </Typography>
              </Box>
              
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: "#1a1a1a",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "#404040",
                  },
                }}
              >
                <AccountBalance sx={{ fontSize: 16, color: "#b0b0b0" }} />
                <Typography variant="caption" sx={{ color: "#e0e0e0", fontWeight: "600", fontSize: "0.75rem" }}>
                  PROMPTPAY
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
