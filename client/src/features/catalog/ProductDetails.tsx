import {useEffect, useState} from "react";
import {Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {IProduct} from "../../app/models/IProduct";
import agent from "../../app/api/agent";

export default function ProductDetails(){
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        agent.Catalog.details(parseInt(id as string))
            .then(response => setProduct(response))
            .catch(error => console.log(error.response))
            .finally(()=> setLoading(false))
    }, [id])

    if (loading) return <Typography variant={'h3'}>Loading...</Typography>
    if (!product)return <Typography variant={'h3'}>No product Found</Typography>
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant={'h3'}>{product.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant={'h4'}>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
