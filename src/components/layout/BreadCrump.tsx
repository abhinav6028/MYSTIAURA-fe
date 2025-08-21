import React, { useState } from "react";
import { Breadcrumbs, Link, Typography, Menu, MenuItem } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutContainer from "./LayoutContainer";

// Mapping for breadcrumb display
const breadcrumbNameMap: Record<string, string> = {
  "/": "Home",
  "/home": "Home",
  "/inventory": "Product List",
  "/product-details": "Product Details",
  "/my-cart": "My Cart",
  "/checkout": "Checkout",
  "/review": "Review Order",
  "/profile": "Profile",
};

// Dropdown options for Home
const homeDropdown: { label: string; path: string }[] = [
  { label: "Home", path: "/" },
  { label: "Product List", path: "/inventory" },
  { label: "My Cart", path: "/my-cart" },
  { label: "Checkout", path: "/checkout" },
  { label: "Review Order", path: "/review" },
  { label: "Profile", path: "/profile" },
];

const AppBreadcrumbs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Dropdown state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <LayoutContainer>
      <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{paddingY: "1rem"}}>
        {/* Home with dropdown */}
        <div
          onMouseEnter={handleOpenMenu}
          onMouseLeave={handleCloseMenu}
          style={{ display: "inline-block" }}
        >
          <Link
            underline="hover"
            color="inherit"
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Home sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            MenuListProps={{ onMouseLeave: handleCloseMenu }}
          >
            {homeDropdown.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  handleCloseMenu();
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </div>

        {/* Dynamic path segments (beyond Home) */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = breadcrumbNameMap[to] || value;

          return isLast ? (
            <Typography key={to} color="text.primary" sx={{ fontWeight: 600 }}>
              {label}
            </Typography>
          ) : (
            <Link
              key={to}
              underline="hover"
              color="inherit"
              onClick={() => navigate(to)}
              sx={{ cursor: "pointer" }}
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </LayoutContainer>
  );
};

export default AppBreadcrumbs;
