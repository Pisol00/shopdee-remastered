"use client";
import Link from "next/link";
import { Box, Container, Typography, Button, Card, CardContent, CardMedia, IconButton, Chip } from "@mui/material";
import { ArrowForward, LocalOffer, FavoriteBorder, Favorite, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { collections, categories, brands } from "@/lib/mockData";
import { useState } from "react";

export default function Home() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Custom navigation buttons
  const NavigationButton = ({ direction }: { direction: "prev" | "next" }) => (
    <IconButton
      className={`swiper-button-${direction}`}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [direction === "prev" ? "left" : "right"]: { xs: 8, md: 16 },
        zIndex: 10,
        width: { xs: 36, md: 44 },
        height: { xs: 36, md: 44 },
        bgcolor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          bgcolor: "#1a1a1a",
          transform: "translateY(-50%) scale(1.05)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
          "& svg": {
            color: "white",
          },
        },
        "&.swiper-button-disabled": {
          opacity: 0.3,
          cursor: "not-allowed",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.95)",
            transform: "translateY(-50%)",
            "& svg": {
              color: "#666",
            },
          },
        },
      }}
    >
      {direction === "prev" ? (
        <ChevronLeft sx={{ fontSize: { xs: 24, md: 28 }, color: "#2c2c2c" }} />
      ) : (
        <ChevronRight sx={{ fontSize: { xs: 24, md: 28 }, color: "#2c2c2c" }} />
      )}
    </IconButton>
  );

  // Hero banners data
  const heroBanners = [
    {
      id: 1,
      image: "/hero-homepage/hero-summer-collection.jpg",
      title: "Summer Collection",
      subtitle: "Discover the latest trends",
      buttonText: "Shop Now",
      link: "/explore",
    },
    {
      id: 2,
      image: "/hero-homepage/hero-new-arrivals.jpg",
      title: "New Arrivals",
      subtitle: "Fresh styles just for you",
      buttonText: "Explore",
      link: "/new-arrivals",
    },
    {
      id: 3,
      image: "/hero-homepage/hero-big-sale.jpg",
      title: "Big Sale",
      subtitle: "Up to 50% off on selected items",
      buttonText: "Shop Sale",
      link: "/sale",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
      {/* Hero Slider */}
      <Box sx={{ width: "100%", position: "relative" }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="hero-swiper"
          style={{ width: "100%" }}
        >
          {heroBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: "400px", md: "600px" },
                  bgcolor: "#f5f5f5",
                }}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: banner.image.includes('hero-summer-collection.jpg') 
                      ? 'center 25%' 
                      : banner.image.includes('hero-new-arrivals.jpg')
                      ? 'center 25%'
                      : banner.image.includes('hero-big-sale.jpg')
                      ? 'center 0%'
                      : 'center center',
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "white",
                    maxWidth: { xs: "90%", md: "800px" },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem" },
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.95,
                      textShadow: "0 8px 32px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
                      textTransform: "uppercase",
                    }}
                  >
                    {banner.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 5,
                      fontSize: { xs: "1rem", sm: "1.35rem", md: "1.6rem" },
                      fontWeight: 400,
                      letterSpacing: "0.05em",
                      lineHeight: 1.5,
                      textShadow: "0 4px 16px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)",
                      textTransform: "uppercase",
                    }}
                  >
                    {banner.subtitle}
                  </Typography>
                  <Button
                    component={Link}
                    href={banner.link}
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward sx={{ fontSize: 22 }} />}
                    sx={{
                      bgcolor: "#1a1a1a",
                      color: "white",
                      px: 5,
                      py: 2,
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: "50px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        bgcolor: "#2c2c2c",
                        transform: "translateY(-3px) scale(1.02)",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                    }}
                  >
                    {banner.buttonText}
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 2,
              fontSize: { xs: "2rem", md: "2.75rem" },
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            Shop by Category
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              color: "#666",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              fontWeight: 400,
            }}
          >
            Browse through our collection of categories
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(6, 1fr)",
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {categories.slice(0, 6).map((category) => (
            <Link
              href={`/category/${category.id}`}
              style={{ textDecoration: "none" }}
              key={category.id}
            >
              <Card
                sx={{
                  textAlign: "center",
                  border: "none",
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  bgcolor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    "& .category-icon": {
                      transform: "scale(1.2) rotate(5deg)",
                      color: "#1a1a1a",
                    },
                    "& .category-bg": {
                      bgcolor: "#f0f0f0",
                    },
                  },
                }}
              >
                <Box
                  className="category-bg"
                  sx={{
                    height: { xs: 130, md: 160 },
                    bgcolor: "#fafafa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Typography 
                    variant="h2" 
                    className="category-icon"
                    sx={{
                      color: "#d0d0d0",
                      fontSize: { xs: "3rem", md: "4rem" },
                      fontWeight: 700,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {category.name.charAt(0)}
                  </Typography>
                </Box>
                <CardContent sx={{ py: { xs: 2, md: 2.5 }, px: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ 
                      fontSize: { xs: "0.875rem", md: "0.95rem" },
                      fontWeight: 600,
                      color: "#2c2c2c",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Container>

      {/* Featured Products */}
      <Box sx={{ bgcolor: "#fafafa", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 6,
            }}
          >
            <Box>
              <Typography 
                variant="h3" 
                sx={{ 
                  mb: 1.5,
                  fontSize: { xs: "2rem", md: "2.75rem" },
                  fontWeight: 800,
                  color: "#1a1a1a",
                  letterSpacing: "-0.02em",
                }}
              >
                Featured Products
              </Typography>
              <Typography 
                variant="body1" 
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  fontWeight: 400,
                }}
              >
                Check out our newest additions
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/explore"
              variant="contained"
              endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
              sx={{
                display: { xs: "none", sm: "flex" },
                bgcolor: "#1a1a1a",
                color: "white",
                textTransform: "none",
                borderRadius: "50px",
                px: 4,
                py: 1.25,
                fontSize: "0.95rem",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor: "#2c2c2c",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              View All
            </Button>
          </Box>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="products-swiper"
            style={{ padding: "10px 0 40px 0" }}
          >
              {collections.slice(0, 8).map((collection) => (
                <SwiperSlide key={collection.id}>
                  <Card
                  sx={{
                    height: "100%",
                    border: "none",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    bgcolor: "white",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      transform: "translateY(-4px)",
                      "& .product-image": {
                        transform: "scale(1.08)",
                      },
                      "& .favorite-btn": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Link
                    href={`/detail/${collection.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {/* Favorite Button */}
                    <IconButton
                      className="favorite-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(collection.id);
                      }}
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        zIndex: 2,
                        width: 36,
                        height: 36,
                        opacity: { xs: 1, md: 0 },
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "white",
                          transform: "scale(1.15)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        },
                      }}
                      size="small"
                    >
                      {favorites.includes(collection.id) ? (
                        <Favorite sx={{ color: "#e74c3c", fontSize: 20 }} />
                      ) : (
                        <FavoriteBorder sx={{ fontSize: 20, color: "#333" }} />
                      )}
                    </IconButton>

                    <Box 
                      sx={{ 
                        overflow: "hidden", 
                        position: "relative",
                        bgcolor: "#fafafa",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={collection.primary_image.image_url}
                        alt={collection.name}
                        className="product-image"
                        sx={{
                          height: { xs: 220, sm: 260, md: 320 },
                          objectFit: "cover",
                          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                      <Typography
                        variant="body1"
                        component="div"
                        fontWeight="500"
                        sx={{
                          fontSize: { xs: "0.9rem", md: "1rem" },
                          mb: 1.5,
                          color: "#2c2c2c",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          minHeight: { xs: "2.6em", md: "3em" },
                          lineHeight: 1.5,
                          letterSpacing: "0.01em",
                        }}
                      >
                        {collection.name}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography
                          variant="h6"
                          fontWeight="700"
                          sx={{
                            fontSize: { xs: "1.25rem", md: "1.4rem" },
                            color: "#1a1a1a",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          ฿{collection.starting_price.toLocaleString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ 
                            fontSize: "0.8rem",
                            color: "text.secondary",
                            fontWeight: 500,
                          }}
                        >
                          起
                        </Typography>
                      </Box>
                    </CardContent>
                  </Link>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          <Box sx={{ textAlign: "center", mt: 5, display: { xs: "block", sm: "none" } }}>
            <Button
              component={Link}
              href="/explore"
              variant="contained"
              endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
              sx={{
                bgcolor: "#1a1a1a",
                color: "white",
                textTransform: "none",
                borderRadius: "50px",
                px: 5,
                py: 1.5,
                fontSize: "0.95rem",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                "&:hover": {
                  bgcolor: "#2c2c2c",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                },
              }}
            >
              View All Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Promotional Banner */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Card
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "black",
            color: "white",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 4, md: 8 },
              }}
            >
              <Chip
                icon={<LocalOffer sx={{ color: "white !important" }} />}
                label="Limited Time Offer"
                sx={{
                  bgcolor: "#e74c3c",
                  color: "white",
                  fontWeight: "bold",
                  mb: 3,
                  width: "fit-content",
                }}
              />
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
              >
                Special Discount
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, color: "#ffeb3b" }}>
                Up to 50% OFF
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: "#e0e0e0" }}>
                Don't miss out on our biggest sale of the season. Shop now and save big on
                selected items!
              </Typography>
              <Button
                component={Link}
                href="/sale"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: "white",
                  color: "black",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  borderRadius: "50px",
                  width: "fit-content",
                  "&:hover": {
                    bgcolor: "#f0f0f0",
                  },
                }}
              >
                Shop Sale Now
              </Button>
            </Box>
            <Box
              sx={{
                height: { xs: 300, md: "auto" },
                bgcolor: "#333",
              }}
            >
              <img
                src="https://via.placeholder.com/800x600?text=Sale+Banner"
                alt="Sale"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Card>
      </Container>

      {/* Brand Logos */}
      <Box sx={{ bgcolor: "#fafafa", py: { xs: 4, md: 6 } }}>
        <Container maxWidth="xl">
          <Typography
            variant="h5"
            fontWeight="600"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Our Partner Brands
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 3, md: 6 },
              flexWrap: "wrap",
            }}
          >
            {brands.map((brand) => (
              <Link href="#" key={brand.id} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    width: { xs: 80, md: 120 },
                    height: { xs: 40, md: 60 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.6,
                    transition: "opacity 0.2s",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <img
                    src={brand.img_url}
                    alt={brand.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
