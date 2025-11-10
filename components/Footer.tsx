"use client";
import Link from "next/link";
import { Box, Container, Grid, Typography, TextField, Button, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube, Email } from "@mui/icons-material";
import { ShoppingBag, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Store Locations", href: "/stores" },
      { label: "Our Blog", href: "/blog" },
    ],
    help: [
      { label: "Customer Service", href: "/customer-service" },
      { label: "Track Order", href: "/track-order" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Size Guide", href: "/size-guide" },
    ],
    shop: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Men's Fashion", href: "/men" },
      { label: "Women's Fashion", href: "/women" },
      { label: "Sale", href: "/sale" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
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
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <ShoppingBag className="w-8 h-8" />
                <Typography variant="h5" fontWeight="bold">
                  SHOPDEE
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 3, color: "#999" }}>
                Your ultimate destination for trendy and affordable fashion.
                Browse through our diverse range of meticulously crafted garments.
              </Typography>

              {/* Contact Info */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MapPin className="w-5 h-5" style={{ color: "#999" }} />
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    123 Fashion Street, Bangkok, Thailand
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone className="w-5 h-5" style={{ color: "#999" }} />
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    +66 2 123 4567
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Mail className="w-5 h-5" style={{ color: "#999" }} />
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    support@shopdee.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.company.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: "none", color: "#999" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      "&:hover": { color: "white", transition: "color 0.3s" },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Help Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Help
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.help.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: "none", color: "#999" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      "&:hover": { color: "white", transition: "color 0.3s" },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Shop Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Shop
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.shop.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: "none", color: "#999" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      "&:hover": { color: "white", transition: "color 0.3s" },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter Section */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#999" }}>
              Subscribe to get special offers and updates.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#666" },
                    "&.Mui-focused fieldset": { borderColor: "#888" },
                  },
                }}
              />
              <Button
                variant="contained"
                startIcon={<Email />}
                sx={{
                  bgcolor: "white",
                  color: "black",
                  "&:hover": { bgcolor: "#e0e0e0" },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#333" }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Copyright */}
          <Typography variant="body2" sx={{ color: "#999" }}>
            © 2025 SHOPDEE. All rights reserved.
          </Typography>

          {/* Social Links */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                component="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#999",
                  "&:hover": { color: "white", bgcolor: "#333" },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>

          {/* Legal Links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{ textDecoration: "none", color: "#999" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    "&:hover": { color: "white", transition: "color 0.3s" },
                  }}
                >
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
