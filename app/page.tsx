"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Button, Card, CardContent, CardMedia, Typography, Chip, IconButton } from "@mui/material";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { brands, collections, mostPopularCollections } from "@/lib/mockData";

export default function Home() {

  return (
    <div className="min-h-screen">
      {/* Main Section */}
      <section className="section-main flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-linear-to-br from-gray-50 to-gray-100">
        <div className="main-content max-w-xl mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <Button
            component={Link}
            href="/explore"
            variant="contained"
            size="large"
            endIcon={<ShoppingBag />}
            sx={{
              borderRadius: "50px",
              px: 6,
              py: 2,
              bgcolor: "black",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            Shop Now
          </Button>
        </div>
        <div className="main-image w-full md:w-1/2">
          <Image
            src="https://via.placeholder.com/600x800?text=Hero+Image"
            alt="Stylish couple wearing SHOPDEE clothes"
            width={600}
            height={800}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
      </section>

      {/* Brand Logos */}
      <section className="section-band bg-black py-6 md:py-8">
        <div className="band-container px-4 md:px-20">
          <div className="brand-logo flex justify-center items-center gap-4 md:gap-8 flex-wrap">
            {brands.map((brand) => (
              <Link href="#" key={brand.id}>
                <Image
                  src={brand.img_url}
                  alt={brand.name}
                  width={80}
                  height={40}
                  className="opacity-70 hover:opacity-100 transition-opacity w-20 h-10 md:w-[120px] md:h-[60px] object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="section-arrivals py-12 md:py-16 px-4 md:px-20">
        <div className="container-arrivals">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
            <h1 className="text-center title-arrivals text-2xl md:text-4xl font-bold">
              NEW ARRIVALS
            </h1>
          </div>

          {/* Products container */}
          <div className="products-wrapper px-2 py-4">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="products-swiper"
              style={{ padding: '10px 0' }}
            >
              {collections.map((collection) => (
                <SwiperSlide key={collection.id}>
                  <Card
                    className="group"
                    sx={{
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Link href={`/detail/${collection.id}`}>
                      <CardMedia
                        component="img"
                        image={collection.primary_image.image_url}
                        alt={collection.name}
                        sx={{
                          height: { xs: 300, sm: 350, md: 400 },
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                    <CardContent>
                      <div className="flex justify-between items-start mb-2">
                        <Typography variant="h6" component="div" fontWeight="bold">
                          {collection.name}
                        </Typography>
                        <IconButton size="small" color="error">
                          <Favorite fontSize="small" />
                        </IconButton>
                      </div>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Starting From
                      </Typography>
                      <div className="flex justify-between items-center">
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          ฿{collection.starting_price || "N/A"}
                        </Typography>
                        <IconButton size="small" color="primary">
                          <ShoppingCart fontSize="small" />
                        </IconButton>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* View All Button */}
          <div className="view-all-content text-center mt-12">
            <Button
              component={Link}
              href="/explore"
              variant="outlined"
              size="large"
              endIcon={<ArrowRight />}
              sx={{
                borderRadius: "50px",
                px: 6,
                py: 1.5,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              View All
            </Button>
          </div>
        </div>
      </section>

      {/* Best Seller Section */}
      <section className="section-best-seller py-12 md:py-16 px-4 md:px-20 bg-gray-50">
        <div className="container-best-seller">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
            <h1 className="text-center title-arrivals text-2xl md:text-4xl font-bold">
              BEST SELLER
            </h1>
          </div>

          {/* Products container */}
          <div className="products-wrapper px-2 py-4">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="products-swiper"
              style={{ padding: '10px 0' }}
            >
              {mostPopularCollections.map((popularCollection) => (
                <SwiperSlide key={popularCollection.id}>
                  <Card
                    className="group relative"
                    sx={{
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Chip
                      label="Best Seller"
                      color="success"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        zIndex: 1,
                      }}
                    />
                    <Link href={`/detail/${popularCollection.id}`}>
                      <CardMedia
                        component="img"
                        image={popularCollection.primary_image.image_url}
                        alt={popularCollection.name}
                        sx={{
                          height: { xs: 300, sm: 350, md: 400 },
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                    <CardContent>
                      <div className="flex justify-between items-start mb-2">
                        <Typography variant="h6" component="div" fontWeight="bold">
                          {popularCollection.name}
                        </Typography>
                        <IconButton size="small" color="error">
                          <Favorite fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <Typography variant="body1" color="success.main" fontWeight="medium">
                            Sales: {popularCollection.num_orders}
                          </Typography>
                        </div>
                        <IconButton size="small" color="primary">
                          <ShoppingCart fontSize="small" />
                        </IconButton>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Slide Show Section */}
      <section className="slide-show py-12 md:py-16 px-4 md:px-20">
        <div className="carousel-container">
          <Card sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}>
            <Link href="/explore" className="block relative">
              <CardMedia
                component="img"
                image="https://via.placeholder.com/1200x600?text=Slideshow+Banner"
                alt="Air Jordan 1"
                sx={{
                  height: { xs: 300, sm: 400, md: 500, lg: 600 },
                  objectFit: "cover"
                }}
              />
              <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white w-full px-4">
                <Typography
                  variant="h3"
                  component="h5"
                  fontWeight="bold"
                  sx={{
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
                  }}
                >
                  NIKE AIR JORDAN 1
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ShoppingBag />}
                  sx={{
                    borderRadius: "50px",
                    px: { xs: 4, md: 6 },
                    py: { xs: 1.5, md: 2 },
                    bgcolor: "white",
                    color: "black",
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    "&:hover": { bgcolor: "#f0f0f0" },
                  }}
                >
                  SHOP NOW
                </Button>
              </div>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
