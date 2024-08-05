import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Badge
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from '../../firbase/config';
import { doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {

  },
}));

const Main = ({ data }) => {
  const theme = useTheme();
  const allProducts = query(collection(db, "products"), orderBy("id"));
  const menProducts = query(
    collection(db, "products"),
    where("category", "==", "men")
  );
  const womenProducts = query(
    collection(db, "products"),
    where("category", "==", "women")
  );

  const [initialData, setinitialData] = useState(allProducts);
  const [value, loading, error] = useCollection(initialData);


  if (error) {
    return <div>Error</div>
  }

  if (loading) {
    return (
      <section className="loading">
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
      </section>
    )
  }

  if (value) {
    return (
      <Container sx={{ py: 9 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Box>
            <Typography variant="h6"> Products</Typography>
            <Typography fontWeight={300} variant="body1">
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>

          <Box>
            <Button
              onClick={() => {
                setinitialData(allProducts)

              }}>
              All Products
            </Button>
            <Button
              onClick={() => {
                setinitialData(menProducts)

              }}>
              Men Products
            </Button>
            <Button
              onClick={() => {
                setinitialData(womenProducts)

              }}>
              Women Products
            </Button>
          </Box>
        </Stack>

        <Stack
          direction={"row"}
          sx={{ flexWrap: "wrap", justifyContent: "center", mt: 2 }}
        >
          {value.docs.map((item) => {
            return (
              <Card
                className="card"
                key={item.data().id}
                sx={{
                  maxWidth: 277,
                  mb: 6,
                  mx: 2,
                }}
              >
                <CardMedia
                  className="image"
                  component="img"
                  height="277"
                  image={item.data().img}
                  alt="Paella dish"
                />
                <CardContent>
                  <CardActions
                    sx={{ justifyContent: "space-between" }}
                    disableSpacing
                  >
                    <Typography variant="h5" color="text.primary" sx={{ mb: 1 }}>
                      {item.data().title}
                    </Typography>
                    <Button variant="contained"
                      color="secondary" sx={{ mb: 1 }}>
                      {item.data().category}
                    </Button>
                  </CardActions>
                  <Typography variant="body2" color="text.secondary">
                    {item.data().description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between" }}
                  disableSpacing
                >
                  {data.docs.includes(item.data().id) ? (
                    <div
                      dir="rtl"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <IconButton
                        color="primary"
                        sx={{ ml: "10px" }}

                      >
                        <Add fontSize="small" />
                      </IconButton>

                      <StyledBadge
                        badgeContent={value.docs.length}
                        color="primary"
                      />

                      <IconButton
                        color="primary"
                        sx={{ mr: "10px" }}

                      >
                        <Remove fontSize="small" />
                      </IconButton>
                    </div>
                  ) : (
                    <Button
                      sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        await setDoc(doc(db, "cart", `${item.data().id}`), {
                          ...item.data(),
                          quantity: 1,

                        })
                      }}
                    >
                      Add to cart
                    </Button>
                  )}

                  <Typography
                    mr={1}
                    variant="body1"
                    color={theme.palette.error.light}
                  >
                    ${item.data().price}
                  </Typography>
                </CardActions>
              </Card>
            );
          })}
        </Stack>
      </Container>
    );
  }

};

export default Main;
