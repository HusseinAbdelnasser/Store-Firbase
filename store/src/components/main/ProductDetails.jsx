import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";

const ProductDetails = ({clickedProduct}) => {
  const [alignment, setAlignment] = useState("left")

  const handleAlignment = (event, newAlignment) => {
    if(newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }
  const [selectedImg, setSelectedImg] = useState(0)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ display: "flex", mt: {xs: 1} }}>
        <img width={300}  src={clickedProduct.attributes.productImg.data[selectedImg].attributes.url}  alt="" />
      </Box>

      <Box sx={{py: 2, textAlign: { xs: "center", sm: "left" }}}>
        <Typography variant="h5">{clickedProduct.attributes.productTitle}</Typography>
        <Typography
          my={0.4}
          fontSize={"22px"}
          color={"crimson"}
          variant="body1"
        >
          ${clickedProduct.attributes.productPrice}
        </Typography>
        <Typography 
          sx={{fontSize: {xs: "12px"}}}
          variant="body1" 
        >
          {clickedProduct.attributes.productDescription}
        </Typography>

        <Stack
          sx={{ justifyContent: { xs: "center", sm: "left" } }}
          direction={"row"}
          gap={1}
          my={2}
        >
          <ToggleButtonGroup
            value={selectedImg}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{
              ".Mui-selected": {
                border: "1px solid rgba(233,69,96,0.5) !important",
                color: "#e94560",
                backgroundColor: "initial",
                opacity: "1",
              }
            }}
          >
            {clickedProduct.attributes.productImg.data.map((item, index) => {
              return (
                <ToggleButton
                  value={index}
                  aria-label="left aligned"
                  key={item.id}
                  sx={{
                    width: "110px",
                    height: "110px",
                    mx: 1,
                    p: "0",
                    opacity: "0.5"
                  }}
                >
                  <img
                    onClick={() => setSelectedImg(index)}
                    style={{ borderRadius: 3 }}
                    height={"100%"}
                    width={"100%"}
                    src={item.attributes.url}
                    alt=""
                  />
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
          
        </Stack>

        <Button
          sx={{ textTransform: "capitalize", mb: { xs: 1, sm: 0 } }}
          variant="contained"
        >
          <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
