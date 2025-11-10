"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Grid,
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
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { brands, categories, allCollections } from "@/lib/mockData";

export default function ExplorePage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const itemsPerPage = 8;

  // Filter collections based on selected filters
  const filteredCollections = allCollections.filter((collection) => {
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
    setPage(1);
  };

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
    <Card
      sx={{
        height: "100%",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Filter Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Filters
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={clearAllFilters}
            sx={{
              borderRadius: "50px",
              borderColor: "black",
              color: "black",
              fontSize: "0.75rem",
              px: 2,
              "&:hover": {
                bgcolor: "black",
                color: "white",
                borderColor: "black"
              },
            }}
          >
            Clear All
          </Button>
        </Box>

        {/* Categories */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
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
                  />
                }
                label={<Typography variant="body2">{category.name}</Typography>}
                sx={{ mb: 0.5 }}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Price Range */}
        <Box sx={{ mb: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}>
          <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
            Price
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
                  />
                }
                label={<Typography variant="body2">{range.label}</Typography>}
                sx={{ mb: 0.5 }}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Brands */}
        <Box sx={{ pt: 2, borderTop: "1px solid #e0e0e0" }}>
          <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
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
  );

  return (
    <Box sx={{ minHeight: "80vh", bgcolor: "white", py: 4 }}>
      {/* Mobile Filter Button */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={() => setMobileFiltersOpen(true)}
          sx={{
            bgcolor: "black",
            color: "white",
            width: 56,
            height: 56,
            "&:hover": { bgcolor: "#333" },
          }}
        >
          <FilterList />
        </IconButton>
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

      <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, md: 4 }, overflow: "hidden" }}>
        <Grid container spacing={3}>
          {/* Desktop Sidebar */}
          <Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" } }}>
            <FilterSidebar />
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Products Grid */}
              <Grid container spacing={2.5}>
            {paginatedCollections.map((collection) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={collection.id}>
                <Link
                  href={`/detail/${collection.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      border: "1px solid #f0f0f0",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                        borderColor: "#e0e0e0",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={collection.primary_image.image_url}
                      alt={collection.name}
                      sx={{
                        height: { xs: 200, sm: 250, md: 280 },
                        objectFit: "cover",
                        bgcolor: "#f5f5f5"
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
                          whiteSpace: "nowrap"
                        }}
                      >
                        {collection.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" }, display: "block", mb: 0.5 }}
                      >
                        Starting From
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          fontSize: { xs: "1rem", md: "1.125rem" },
                          color: "#1976d2"
                        }}
                      >
                        ฿{collection.min_price.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                    size="large"
                  />
                </Box>
              )}

              {/* No Results */}
              {filteredCollections.length === 0 && (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="h5" color="text.secondary">
                    No products found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Try adjusting your filters
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
      </Grid>
      </Box>
    </Box>
  );
}
