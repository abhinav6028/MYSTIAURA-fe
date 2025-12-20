import React, { useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PRIMARY_COLOUR } from "../../utils";
import { useCategories } from "../../services/api/category/category";
import { useDispatch } from "react-redux";
import { setCategoryFilter } from "../../store/slices/userSlice";
import { useParams } from "react-router-dom";
import useDebounce from "../../utilsComp/useDeounce";

const SidebarFilters: React.FC = () => {

  const [priceRange, setPriceRange] = React.useState(4000);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const { data: categories } = useCategories();
  const categoriesCollection = categories?.data?.categories || [];
  const {categoryname } = useParams();

  useEffect(() => {
    if (categoryname) {
      setSelectedCategories([categoryname]);
    }
  }, [categoryname]);

  const dispatch = useDispatch(); 
  dispatch(setCategoryFilter({
    category: selectedCategories,
    minPrice: 0,
    maxPrice: useDebounce(priceRange),
  }));

  return (
    <aside className="w-full md:w-80 p-4 bg-amber-6 ">
      {/* Categories */}
      <Accordion defaultExpanded
        sx={{ background: 'transparent', boxShadow: 'none', bgcolor: '', borderBottom: `1px solid ${PRIMARY_COLOUR}` }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Categories
          </Typography>
        </AccordionSummary>

        <AccordionDetails className="flex flex-col">
          {(categoriesCollection ?? []).map((cat: any) => (
            <FormControlLabel
              key={cat.name}
              control={
                <Checkbox
                  size="small"
                  checked={!!selectedCategories?.includes(cat.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories((prev) => [...prev, cat.name]);
                    } else {
                      setSelectedCategories((prev) => prev.filter((name) => name !== cat.name));
                    }
                  }}
                  sx={{
                    color: PRIMARY_COLOUR,
                    '&.Mui-checked': { color: PRIMARY_COLOUR },
                    '&:hover': { backgroundColor: 'transparent' },
                    '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
                  }}
                />
              }
              label={
                <Box
                  sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}
                  className="flex justify-between"
                >
                  <p>{cat.name}</p>
                  <span style={{ color: PRIMARY_COLOUR }} className="ml-2">
                    ({cat.productCount})
                  </span>
                </Box>
              }
              sx={{
                width: "100%",
                margin: 0,
                "& .MuiTypography-root": { fontFamily: "Poppins, sans-serif" },
              }}
            />
          ))}

        </AccordionDetails>
      </Accordion>

      {/* Price Range */}
      <Accordion sx={{ background: 'transparent', boxShadow: 'none', bgcolor: '', borderBottom: `1px solid ${PRIMARY_COLOUR}`, borderRadius: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            sx={{
              color: PRIMARY_COLOUR,
              '& .MuiSlider-thumb': {
                backgroundColor: PRIMARY_COLOUR,
              },
              '& .MuiSlider-track': {
                backgroundColor: PRIMARY_COLOUR,
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#e0e0e0',
              },
              '&:hover': {
                '& .MuiSlider-thumb': {
                  boxShadow: 'none',
                },
              },
            }}
            defaultValue={2000} max={2000} step={50}
            onChange={(_, value) => {
              setPriceRange(value);
            }}
          />
          <Typography sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }} variant="body2">Price: ₹0 - ₹{priceRange}</Typography>
        </AccordionDetails>
      </Accordion>




      {/* Size
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="font-semibold">Size</Typography>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-2">
          {[4, 4.5, 5, 6, 6.5, 7, 7.5, 8].map((size) => (
            <FormControlLabel
              key={size}
              control={<Checkbox size="small" />}
              label={size.toString()}
            />
          ))}
        </AccordionDetails>
      </Accordion> */}
    </aside>
  );
};

export default SidebarFilters;
