import React from 'react'
import { Add, Remove, Delete } from "@mui/icons-material";
import {
    Box,
    Button,
    Paper,
    styled,
    IconButton,
    Badge,
    Typography,
    Divider,
    Stack,
} from "@mui/material";
import Header1 from '../components/header/Header1';
import Header2 from '../components/header/Header2';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, updateDoc, arrayRemove, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firbase/config';
import ReactLoading from "react-loading";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {},
}));


const Cart = () => {

    const [value, loading, error] = useCollection(query(collection(db, "cart"), orderBy("id")));

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

    let subtotal = 0;
    // @ts-ignore

    if(value) {
        return (
            <>
                <Header1 />
                <Header2 />
                <Box>
                    {value.docs.map((item) => {
                        subtotal += Number(item.data().price) * Number(item.data().quantity);
                        return (
                            <Paper key={item.id} dir="rtl" className="item-container">
                                <div className="img-title-parent">
                                    <img src={item.data().img} alt={item.data().title} />
                                    <p className="product-name">{item.productName}</p>
                                </div>
    
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <IconButton
                                        sx={{ color: "#1976d2", ml: "10px" }}
                                        onClick= { async () => {
                                        await updateDoc(doc(db, "cart" ,  `${item.data().id}`), {
                                            quantity: Number(`${item.data().quantity}`) + Number(1)
                                        });
                                    }}
                                    >
                                        <Add />
                                    </IconButton>
    
                                    <StyledBadge badgeContent={item.data().quantity} color="primary" />
    
                                    <IconButton
                                        sx={{ color: "#1976d2", mr: "10px" }}
                                        onClick= { async () => {
                                            await updateDoc(doc(db, "cart" ,  `${item.data().id}`), {
                                                quantity: Number(`${item.data().quantity}`) - Number(1)
                                            });
                                        }}
                                    >
                                        <Remove />
                                    </IconButton>
                                </div>
    
                                <div className="price">${Number(item.data().price) * Number(item.data().quantity)}</div>
    
                                <Button
                                    sx={{ display: { xs: "none", md: "inline-flex" } }}
                                    variant="text"
                                    color="error"
                                    onClick= { async () => {
                                        await deleteDoc(doc(db, "cart" ,  `${item.data().id}`));
                                    }}
                                >
                                    delete
                                </Button>
    
                                <IconButton
                                    sx={{
                                        color: "#ef5350",
                                        display: { xs: "inline-flex", md: "none" },
                                    }}
                                    onClick= { async () => {
                                        await deleteDoc(doc(db, "cart" ,  `${item.data().id}`));
                                    }}
                                >
                                    <Delete />
                                </IconButton>
                            </Paper>
                        );
                    })}
    
                    <Paper sx={{ width: "200px", mx: "auto", mt: "60px" }}>
                        <Typography align="center" p={2} variant="h6">
                            Cart Summary
                        </Typography>
    
                        <Divider />
    
                        <Stack
                            sx={{ justifyContent: "space-between", p: 1.2 }}
                            direction={"row"}
                        >
                            <Typography variant="body1">Subtotal</Typography>
                            <Typography variant="body1">${subtotal}</Typography>
                        </Stack>
    
                        <Divider />
    
                        <Button fullWidth color="primary" variant="contained">
                            CHECKOUT
                        </Button>
                    </Paper>
                </Box>
            </>
        )
    }
}

export default Cart