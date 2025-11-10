"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  TextField,
  Pagination,
  Drawer,
  IconButton,
  Chip,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Container,
  Divider,
  Badge,
  Stack,
} from "@mui/material";
import {
  FilterList,
  Search,
  Close,
  FavoriteBorder,
  Favorite,
  TuneOutlined,
} from "@mui/icons-material";
import { brands, categories, allCollections } from "@/lib/mockData";

export default function ExplorePage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const itemsPerPage = 15;

  // Filter collections based on selected filters
  let filteredCollections = allCollections.filter((collection) => {
    // Search query filter
    if (searchQuery && !collection.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(collection.category_id)) {
      return false;
    }

    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(collection.brand_id)) {
      return false;
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      const price = collection.min_price;
      const matchesPriceRange = selectedPriceRanges.some((range) => {
        if (range === "0-500") return price >= 0 && price <= 500;
        if (range === "501-1000") return price >= 501 && price <= 1000;
        if (range === "1001-5000") return price >= 1001 && price <= 5000;
        if (range === "5001-10000") return price >= 5001 && price <= 10000;
        if (range === "10001-20000") return price >= 10001 && price <= 20000;
        if (range === "20001-") return price >= 20001;
        return false;
      });
      if (!matchesPriceRange) return false;
    }

    return true;
  });

  // Sort collections
  const sortedCollections = [...filteredCollections].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.min_price - b.min_price;
      case "price-high":
        return b.min_price - a.min_price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  filteredCollections = sortedCollections;

  // Pagination
  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);
  const paginatedCollections = filteredCollections.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Filter brands by search
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setPage(1);
  };

  const handleBrandChange = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
    setPage(1);
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
    setPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setSearchQuery("");
    setPage(1);
  };

  const toggleFavorite = (collectionId: number) => {
    setFavorites((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const removeFilter = (type: string, value: number | string) => {
    if (type === "category") {
      setSelectedCategories((prev) => prev.filter((id) => id !== value));
    } else if (type === "brand") {
      setSelectedBrands((prev) => prev.filter((id) => id !== value));
    } else if (type === "price") {
      setSelectedPriceRanges((prev) => prev.filter((r) => r !== value));
    }
    setPage(1);
  };

  const activeFiltersCount =
    selectedCategories.length + selectedBrands.length + selectedPriceRanges.length;

  const priceRanges = [
    { label: "฿0 - ฿500", value: "0-500" },
    { label: "฿501 - ฿1,000", value: "501-1000" },
    { label: "฿1,001 - ฿5,000", value: "1001-5000" },
    { label: "฿5,001 - ฿10,000", value: "5001-10000" },
    { label: "฿10,001 - ฿20,000", value: "10001-20000" },
    { label: "฿20,001+", value: "20001-" },
  ];

  // Sidebar content component
  const FilterSidebar = () => (
    <Box
      sx={{
        position: "sticky",
        top: 20,
        height: "fit-content",
        maxHeight: "calc(100vh - 40px)",
        overflowY: "auto",
      }}
    >
      <Card
        sx={{
          border: "1px solid #e0e0e0",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Filter Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TuneOutlined sx={{ fontSize: 20 }} />
              <Typography variant="h6" fontWeight="bold">
                Filters
              </Typography>
              {activeFiltersCount > 0 && (
                <Chip
                  label={activeFiltersCount}
                  size="small"
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    height: 20,
                    fontSize: "0.7rem",
                  }}
                />
              )}
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={clearAllFilters}
              disabled={activeFiltersCount === 0}
              sx={{
                fontSize: "0.75rem",
                minWidth: "auto",
                textTransform: "none",
                px: 2,
                borderColor: activeFiltersCount > 0 ? "#d32f2f" : "#e0e0e0",
                color: activeFiltersCount > 0 ? "#d32f2f" : "text.disabled",
                "&:hover": {
                  borderColor: activeFiltersCount > 0 ? "#d32f2f" : "#e0e0e0",
                  bgcolor: activeFiltersCount > 0 ? "rgba(211, 47, 47, 0.08)" : "transparent",
                },
                "&.Mui-disabled": {
                  borderColor: "#e0e0e0",
                  color: "rgba(0, 0, 0, 0.26)",
                },
              }}
            >
              Reset
            </Button>
          </Box>

          {/* Categories */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2, fontSize: "0.95rem" }}>
              Categories
            </Typography>
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      size="small"
                      sx={{
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                    />
                  }
                  label={<Typography variant="body2">{category.name}</Typography>}
                  sx={{ mb: 0.5 }}
                />
              ))}
            </FormGroup>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Price Range */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2, fontSize: "0.95rem" }}>
              Price Range
            </Typography>
            <FormGroup>
              {priceRanges.map((range) => (
                <FormControlLabel
                  key={range.value}
                  control={
                    <Checkbox
                      checked={selectedPriceRanges.includes(range.value)}
                      onChange={() => handlePriceRangeChange(range.value)}
                      size="small"
                      sx={{
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                    />
                  }
                  label={<Typography variant="body2">{range.label}</Typography>}
                  sx={{ mb: 0.5 }}
                />
              ))}
            </FormGroup>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Brands */}
          <Box>
            <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2, fontSize: "0.95rem" }}>
              Brands
            </Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="Search brands..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ maxHeight: 250, overflowY: "auto", pr: 1 }}>
              <FormGroup>
                {filteredBrands.map((brand) => (
                  <FormControlLabel
                    key={brand.id}
                    control={
                      <Checkbox
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => handleBrandChange(brand.id)}
                        size="small"
                        sx={{
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label={<Typography variant="body2">{brand.name}</Typography>}
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </FormGroup>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
      {/* Top Header Bar - Sticky */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          bgcolor: "white",
          borderBottom: "1px solid #e0e0e0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ py: 2 }}>
            {/* Breadcrumb */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                  Home
                </Link>
                {" / "}
                <span style={{ color: "#1a1a1a", fontWeight: 500 }}>Explore</span>
              </Typography>
            </Box>

            {/* Title & Results Count */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h4" fontWeight="bold">
                All Products
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {filteredCollections.length} {filteredCollections.length === 1 ? "result" : "results"}
              </Typography>
            </Box>

            {/* Search & Filter Bar */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
              {/* Mobile Filter Toggle */}
              <Button
                variant="outlined"
                startIcon={<TuneOutlined />}
                onClick={() => setMobileFiltersOpen(true)}
                sx={{
                  display: { xs: "flex", md: "none" },
                  borderColor: "#e0e0e0",
                  color: "text.primary",
                  textTransform: "none",
                }}
              >
                Filters
                {activeFiltersCount > 0 && (
                  <Chip
                    label={activeFiltersCount}
                    size="small"
                    sx={{
                      ml: 1,
                      height: 20,
                      bgcolor: "black",
                      color: "white",
                    }}
                  />
                )}
              </Button>

              {/* Search Bar */}
              <TextField
                size="small"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchQuery("")}>
                          <Close fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  flex: { xs: 1, sm: "0 1 300px" },
                  bgcolor: "white",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                  },
                }}
              />

              {/* Sort Dropdown */}
              <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 200 } }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  displayEmpty
                  sx={{
                    bgcolor: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                  }}
                >
                  <MenuItem value="featured">Sort by: Featured</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="name-asc">Name: A to Z</MenuItem>
                  <MenuItem value="name-desc">Name: Z to A</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Active Filter Chips */}
            {activeFiltersCount > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                {selectedCategories.map((catId) => {
                  const category = categories.find((c) => c.id === catId);
                  return (
                    <Chip
                      key={`cat-${catId}`}
                      label={category?.name}
                      onDelete={() => removeFilter("category", catId)}
                      size="small"
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
                  );
                })}
                {selectedBrands.map((brandId) => {
                  const brand = brands.find((b) => b.id === brandId);
                  return (
                    <Chip
                      key={`brand-${brandId}`}
                      label={brand?.name}
                      onDelete={() => removeFilter("brand", brandId)}
                      size="small"
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
                  );
                })}
                {selectedPriceRanges.map((range) => {
                  const priceRange = priceRanges.find((r) => r.value === range);
                  return (
                    <Chip
                      key={`price-${range}`}
                      label={priceRange?.label}
                      onDelete={() => removeFilter("price", range)}
                      size="small"
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
                  );
                })}
                <Button
                  size="small"
                  onClick={clearAllFilters}
                  sx={{ textTransform: "none", color: "#d32f2f", minWidth: "auto" }}
                >
                  Clear all
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <FilterSidebar />
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ pb: 4 }}>
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
          {/* Desktop Sidebar */}
          <Box sx={{ display: { xs: "none", md: "block" }, width: { md: "280px" }, flexShrink: 0 }}>
            <FilterSidebar />
          </Box>

          {/* Products Section */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Search & Sort Bar */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {filteredCollections.length} {filteredCollections.length === 1 ? "product" : "products"} found
                </Typography>

                <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                  {/* Search Bar */}
                  <TextField
                    size="small"
                    placeholder="Search collections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search sx={{ fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        endAdornment: searchQuery && (
                          <InputAdornment position="end">
                            <IconButton size="small" onClick={() => setSearchQuery("")}>
                              <Close fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      minWidth: { xs: "100%", sm: 250 },
                      bgcolor: "white",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                      },
                    }}
                  />

                  {/* Sort Dropdown */}
                  <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 180 } }}>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      displayEmpty
                      sx={{ bgcolor: "white" }}
                    >
                      <MenuItem value="featured">Featured</MenuItem>
                      <MenuItem value="price-low">Price: Low to High</MenuItem>
                      <MenuItem value="price-high">Price: High to Low</MenuItem>
                      <MenuItem value="name-asc">Name: A to Z</MenuItem>
                      <MenuItem value="name-desc">Name: Z to A</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* Active Filter Chips */}
              {activeFiltersCount > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selectedCategories.map((catId) => {
                    const category = categories.find((c) => c.id === catId);
                    return (
                      <Chip
                        key={`cat-${catId}`}
                        label={category?.name}
                        onDelete={() => removeFilter("category", catId)}
                        size="small"
                        sx={{ bgcolor: "white" }}
                      />
                    );
                  })}
                  {selectedBrands.map((brandId) => {
                    const brand = brands.find((b) => b.id === brandId);
                    return (
                      <Chip
                        key={`brand-${brandId}`}
                        label={brand?.name}
                        onDelete={() => removeFilter("brand", brandId)}
                        size="small"
                        sx={{ bgcolor: "white" }}
                      />
                    );
                  })}
                  {selectedPriceRanges.map((range) => {
                    const priceRange = priceRanges.find((r) => r.value === range);
                    return (
                      <Chip
                        key={`price-${range}`}
                        label={priceRange?.label}
                        onDelete={() => removeFilter("price", range)}
                        size="small"
                        sx={{ bgcolor: "white" }}
                      />
                    );
                  })}
                </Box>
              )}
            </Box>

            {/* Products Grid */}
            {filteredCollections.length > 0 ? (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, 1fr)",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      lg: "repeat(3, 1fr)",
                    },
                    gap: 2.5,
                  }}
                >
                  {paginatedCollections.map((collection) => (
                    <Box key={collection.id}>
                      <Card
                        sx={{
                          height: "100%",
                          border: "1px solid #f0f0f0",
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          position: "relative",
                          "&:hover": {
                            transform: "translateY(-6px)",
                            boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                            borderColor: "#e0e0e0",
                          },
                        }}
                      >
                        <Link
                          href={`/detail/${collection.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {/* Favorite Button */}
                          <IconButton
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(collection.id);
                            }}
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              bgcolor: "white",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                              zIndex: 1,
                              "&:hover": {
                                bgcolor: "white",
                                transform: "scale(1.1)",
                              },
                            }}
                            size="small"
                          >
                            {favorites.includes(collection.id) ? (
                              <Favorite sx={{ color: "#e74c3c", fontSize: 20 }} />
                            ) : (
                              <FavoriteBorder sx={{ fontSize: 20 }} />
                            )}
                          </IconButton>

                          <CardMedia
                            component="img"
                            image={collection.primary_image.image_url}
                            alt={collection.name}
                            sx={{
                              height: { xs: 200, sm: 250, md: 280 },
                              objectFit: "cover",
                              bgcolor: "#f5f5f5",
                            }}
                          />
                          <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                            <Typography
                              variant="h6"
                              component="div"
                              fontWeight="600"
                              sx={{
                                fontSize: { xs: "0.875rem", md: "1rem" },
                                mb: 0.5,
                                color: "#1a1a1a",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {collection.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                fontSize: { xs: "0.7rem", md: "0.75rem" },
                                display: "block",
                                mb: 0.5,
                              }}
                            >
                              Starting From
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              sx={{
                                fontSize: { xs: "1rem", md: "1.125rem" },
                                color: "#667eea",
                              }}
                            >
                              ฿{collection.min_price.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Link>
                      </Card>
                    </Box>
                  ))}
                </Box>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(_, value) => setPage(value)}
                      color="primary"
                      size="large"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          "&.Mui-selected": {
                            bgcolor: "black",
                            "&:hover": {
                              bgcolor: "#333",
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: "center", py: 10 }}>
                <Search sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
                <Typography variant="h5" color="text.secondary" fontWeight="600" sx={{ mb: 1 }}>
                  No products found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Try adjusting your filters or search query
                </Typography>
                <Button
                  variant="contained"
                  onClick={clearAllFilters}
                  sx={{
                    bgcolor: "black",
                    "&:hover": {
                      bgcolor: "#333",
                    },
                  }}
                >
                  Clear All Filters
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
