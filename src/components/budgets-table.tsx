import { useEffect, useState } from 'react';
import { getBudget, IBudgets, IProducts, IProvider } from '../services/api.service';
import { Box } from '@mui/system';
import { Card } from '@mui/material';

const BudgetsTable = () => {
    const [providers, setProviders]: any = useState([])

    useEffect(() => {
        const providers = getBudget()
        setProviders(providers)
    }, [])

    const budgetsAux = providers.map((result: any) => { return result })

    return (
        <div className="client-table">
            <h2>Tabla de presupuestos</h2>
            {budgetsAux.map((res: IBudgets, index: number) => (
                <Card className="budget-table">
                    <Box>
                        <li className='list'><b>Precio del presupuesto:</b> {res.totalPrice}</li>
                        <br />
                        <h4>Cliente</h4>
                        <div className="list-container">
                            <li className='list'>Cliente {res.client.name}</li>
                            <li className='list'>Apellido: {res.client.lastname}</li>
                        </div>
                        <h4>Productos</h4>
                        {res.product.map((res: IProducts, index: number) => (
                            <Box key={index}>
                                <div className="list-container">
                                    <li className='list'>Nombre del producto: {res.name}</li>
                                    <li className='list'>Nombre del proveedor: {res.provider.name}</li>
                                </div>
                            </Box>
                        ))}
                    </Box>
                </Card>
            ))}
        </div>
    )
}

export default BudgetsTable