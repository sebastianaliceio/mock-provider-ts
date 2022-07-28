import { Button, Card, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { createBudget, getClientByIndex, getClients, getProductByIndex, getProducts, IClients, IProducts } from "../services/api.service"
import "../App.css"
import { Box } from "@mui/system"
import moment from "moment"

export const CreateBudgetForm = (props: any) => {

    const { render } = props

    const [selectedProduct, setSelectedProduct] = useState({
        name: '',
        price: +'',
        provider: {}
    })

    const [client, setClient]: any = useState({
        name: ' ',
        lastName: ' ',
    })

    const [selectedPrice, setSelectedPrice] = useState(0)

    const [totalPrice, setTotalPrice]: any = useState()

    const [changeProduct, setChangeProduct] = useState('')
    const [changeClient, setChangeClient] = useState('')

    const [saleProducts, setSaleProducts]: any = useState([])
    const [clients, setClients]: any = useState([])
    const [products, setProducts]: any = useState([])


    const [checked, setChecked] = useState(true)

    useEffect(() => {
        const clients = getClients()
        setClients(clients)
        const products = getProducts()
        setProducts(products)
    }, [])

    const onProductChange = (event: SelectChangeEvent) => {
        const product = getProductByIndex(+event.target.value)
        const productsSale = saleProducts
        productsSale.push(product)
        setSaleProducts(productsSale)
        const price = calculatedTotalPrice()
        setTotalPrice(+price)
    }

    const onClientChange = (event: SelectChangeEvent) => {
        const client = getClientByIndex(+event.target.value)
        setChangeClient(client.name)
        setClient(client)
    }

    const calculatedTotalPrice = () => {
        let price = 0
        for (let i = 0; i < saleProducts.length; i++) {
            const productPrice = saleProducts[i].price
            price = price + productPrice
        }
        return price
    }

    const addBudget = () => {
        setChecked(false)
    }

    const confirmBudget = () => {
        const products: any = saleProducts
        const budget = createBudget(products, totalPrice, client)
        const getProduct = getProducts()
        setProducts(getProduct)
        setSaleProducts([])
        setTotalPrice(0)
        setChecked(true)
        render('4')
    }

    const onChangePrice = (event: any) => {
        saleProducts[+event.target.name].price = +event.target.value
        const price = calculatedTotalPrice()
        setTotalPrice(+price)
    }

    return (
        <div className="create-budget-form">
            <Box hidden={!checked}>
                <form className="form">
                    <h3 className="product-title">Seleccione un cliente</h3>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={''}
                            label="Cliente"
                            onChange={onClientChange}
                            name={'client'}
                        >
                            {
                                clients.map((res: IClients, index: number) => {
                                    return (
                                        <MenuItem value={index} key={index}>Cliente: {res.name} / Apellido: {res.lastname}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </form>
                <form className="form">
                    <h3 className="product-title">Seleccione los productos</h3>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Producto</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={changeProduct}
                            label="Producto"
                            onChange={onProductChange}
                            name={'product'}
                        >
                            {
                                products.map((res: IProducts, index: number) => {
                                    return (
                                        <MenuItem value={index} key={index}>Producto: {res.name} / Proveedor: {res.provider.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </form>
                <div className="products-title">
                    <div className="title-placehoder">
                        <h4>Cliente seleccionado:</h4>
                        <div className="cantidad-products">
                            {client.name === ' ' ? 'Sin seleccionar' : client.name}
                        </div>
                        <div className="cantidad-products">
                            {client.lastname}
                        </div>
                    </div>
                    <div className="title-placehoder">
                        <h4>Productos seleccionados</h4>
                        <div className="cantidad-products">
                            {saleProducts.length}
                        </div>
                    </div>
                    {
                        saleProducts.map((res: IProducts, index: string) => {
                            return (
                                <Card className="products">
                                    <div className="product" key={index}>
                                        <div className="product-item">
                                            Producto: {res.name}
                                        </div>
                                        <div className="product-item">
                                            Empresa: {res.provider.companyName}</div>
                                        <div className="product-item">
                                            Proveedor: {res.provider.name}
                                        </div>
                                        <div className="product-item-price">
                                            <span className="product-price-item">
                                                <b>Precio:</b><TextField name={index} defaultValue={res.price} onChange={onChangePrice} disabled={false}></TextField>
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
                <div className="add-budget">
                    <Button disabled={saleProducts.length === 0 || client.name === ' '} onClick={() => { addBudget() }} variant={"outlined"}>Generar presupuesto</Button>
                </div>
            </Box>
            <Box hidden={checked}>
                <div className="bill">
                    {/* <div className="total-price">
                        <span className="total-price-number">
                            Precio total: {totalPrice}
                        </span>
                    </div> */}
                    <div className="budget-date">
                       <b>Cliente:</b> {client.name === ' ' ? 'Sin seleccionar' : client.name}
                    </div>
                    <br />
                    <div className="budget-date">
                        <b>Fecha del presupuesto:</b> {moment().format('DD/MM/yyyy')}
                    </div>
                    <br />
                    <div className="budget-date">
                       <h4>Items: </h4>
                    </div>
                    {
                        saleProducts.map((res: IProducts, index: number) => {
                            return (
                                <div className="product-bill" key={index}>
                                    <div className="product-item-bill">
                                        Producto: {res.name}
                                    </div>
                                    <div className="product-item-bill">
                                        Proveedor: {res.provider.name}
                                    </div>
                                    <div className="product-item-bill">
                                        Empresa: {res.provider.companyName}
                                    </div>
                                    <div className="product-item-bill">
                                        Precio: {res.price}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="total-price">
                    <span> Precio total:</span><TextField value={totalPrice} disabled={true}></TextField>
                </div>
                <div className="add-budget">
                    <FormControlLabel control={<Checkbox />} label="Enviar factura por mail" />
                    <FormControlLabel control={<Checkbox />} label="Enviar factura por whatsapp" />
                    <Button onClick={() => { confirmBudget() }} variant={"outlined"}>Crear presupuesto</Button>
                </div>
            </Box>
        </div>
    )
}

export default CreateBudgetForm