import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { createClient, createProduct, getClients, getProducts, getProviderByIndex, getProviders, IClients, IProducts } from '../services/api.service';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

export const ClientTable = () => {

    const [products, setProducts]: any = useState([])
    const [providers, setProviders]: any = useState([])

    const [changeProvider, setChangeProvider] = useState('')

    const [product, setProduct] = useState({
        name: '',
        lastname: '',
    })

    useEffect(() => {
        const products = getClients()
        setProducts(products)
    }, [])

    const addProduct = () => {
        const newProduct: any = createClient(product.name, product.lastname)
        setProducts(newProduct)

        setProduct({
            name: '',
            lastname: '',
        })
    }

    const onClientChange = (event: any) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    }

    const productAux = products.map((result: any) => { return result })

    return (
        <div className="client-table">
            <h2>Tabla de clientes</h2>
            <div className="add-provider">
                <form className="form-provider">
                    <TextField onChange={onClientChange} name="name" label="Nombre"></TextField>
                    <TextField onChange={onClientChange} name="lastname" label="Apellido"></TextField>
                    <Button onClick={() => addProduct()}>Agregar cliente</Button>
                </form>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productAux.map((res: IClients) => (
                            <TableRow
                                key={res.name}
                            >
                                <TableCell>{res.name}</TableCell>
                                <TableCell>{res.lastname}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ClientTable