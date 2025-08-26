import React from "react";
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

const SidebarFilters: React.FC = () => {
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
          {[
            { name: "RINGS", count: 120 },
            { name: "EARRINGS", count: 240 },
            { name: "BRACELETS", count: 175 },
            { name: "PENDENTS", count: 120 },
            { name: "NECKLACES", count: 90 },
          ].map((cat) => (
            <FormControlLabel
              key={cat.name}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    color: PRIMARY_COLOUR,
                    '&.Mui-checked': {
                      color: PRIMARY_COLOUR,
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '&.Mui-focusVisible': {
                      outline: 'none',
                      boxShadow: 'none',
                    },
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
                    ({cat.count})
                  </span>
                </Box>
              }
              sx={{
                width: "100%",
                margin: 0,
                "& .MuiTypography-root": {
                  fontFamily: "Poppins, sans-serif",
                },
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
          />
          <Typography sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }} variant="body2">Price: $0 - $2000</Typography>
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
