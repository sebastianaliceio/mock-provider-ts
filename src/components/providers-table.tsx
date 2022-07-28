import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { createProvider, getProviders, IProvider } from '../services/api.service';
import { Button, TextField } from '@mui/material';

export const ProvidersTable = () => {
    const [providers, setProviders]: any = useState([])

    const [provider, setProvider] = useState({
        name: '',
        companyName: '',
    })

    useEffect(() => {
        const providers = getProviders()
        setProviders(providers)
    }, [providers])

    const onProviderChange = (event: any) => {
        setProvider({
            ...provider,
            [event.target.name]: event.target.value
        })
    }

    const addProvider = () => {
        const providers = createProvider(provider.name, provider.companyName)
        setProviders(providers)
        setProvider({
            name: '',
            companyName: ''
        })
    }

    const providerAux = providers.map((result: any) => { return result })

    return (
        <div className="client-table">
            <h2>Tabla de proveedores</h2>
            <div className="add-provider">
                <form className="form-provider">
                    <TextField onChange={onProviderChange} name="name" label="Nombre proveedor"></TextField>
                    <TextField onChange={onProviderChange} name="companyName" label="Nombre empresa"></TextField>
                    <Button onClick={() => addProvider()}>Agregar proveedor</Button>
                </form>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Empresa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {providerAux.map((res: IProvider) => (
                            <TableRow
                                key={res.name}
                            >
                                <TableCell>{res.name}</TableCell>
                                <TableCell>{res.companyName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProvidersTable