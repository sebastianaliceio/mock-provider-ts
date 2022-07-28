import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { createProduct, getProducts, getProviderByIndex, getProviders, IProducts } from '../services/api.service';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

export const ProductsTable = () => {

    const [products, setProducts]: any = useState([])
    const [providers, setProviders]: any = useState([])

    const [selectedProvider, setSelectedProvider] = useState({})

    const [saleProvider, setSaleProvider]: any = useState([])

    const [changeProvider, setChangeProvider] = useState('')

    const [product, setProduct] = useState({
        name: '',
        price: +'',
        provider: {},
    })

    useEffect(() => {
        const products = getProducts()
        setProducts(products)
        const providers = getProviders()
        setProviders(providers)
    }, [])

    const addProduct = () => {
        const newProduct: any = createProduct(product.name, +product.price, selectedProvider as any)
        setProducts(newProduct)
        setSelectedProvider({
            name: '',
            price: +'',
            provider: {},
        })
        setProduct({
            name: '',
            price: +'',
            provider: {},
        })
    }

    const onProviderChange = (event: SelectChangeEvent) => {
        const provider = getProviderByIndex(+event.target.value)
        setSelectedProvider(provider)
    }

    const onProductChange = (event: any) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    }

    const providerAux = providers.map((result: any) => { return result })
    const productAux = products.map((result: any) => { return result })

    return (
        <div className="client-table">
            <h2>Tabla de productos</h2>
            <div className="add-provider">
                <form className="form-provider">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Proveedor</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={changeProvider}
                            label="Proveedor"
                            onChange={onProviderChange}
                            name={'provider'}
                        >
                            {
                                providerAux.map((res: IProducts, index: number) => {
                                    return (
                                        <MenuItem value={index} key={index}>Proveedor: {res.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <TextField onChange={onProductChange} name="name" label="Nombre"></TextField>
                    <TextField onChange={onProductChange} name="price" label="Precio"></TextField>
                    <Button onClick={() => addProduct()}>Agregar producto</Button>
                </form>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Proveedor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productAux.map((res: IProducts) => (
                            <TableRow
                                key={res.name}
                            >
                                <TableCell>{res.name}</TableCell>
                                <TableCell>{res.price}</TableCell>
                                <TableCell>{res.provider.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductsTable