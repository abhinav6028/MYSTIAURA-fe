import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SidebarFilters: React.FC = () => {
  return (
    <aside className="w-full md:w-64 p-4 border-r border-gray-200">
      {/* Categories */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="font-semibold">Categories</Typography>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-2">
          {["Engagement Rings", "Rings", "Necklaces", "Bracelets", "Earrings"].map((cat) => (
            <FormControlLabel
              key={cat}
              control={<Checkbox size="small" />}
              label={cat}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Rings by Diamond */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="font-semibold">Rings by Diamond</Typography>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-2">
          {["Round", "Princess", "Emerald", "Pear", "Cushion", "Oval"].map((shape) => (
            <FormControlLabel
              key={shape}
              control={<Checkbox size="small" />}
              label={shape}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Price Range */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="font-semibold">Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider defaultValue={2000} max={2000} step={50} />
          <Typography variant="body2">Price: $0 - $2000</Typography>
        </AccordionDetails>
      </Accordion>

      {/* Size */}
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
      </Accordion>
    </aside>
  );
};

export default SidebarFilters;
