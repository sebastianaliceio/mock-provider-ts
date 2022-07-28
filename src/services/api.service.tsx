export interface IProvider {
    name: string,
    companyName: string,
}

export interface IProducts {
    name: string,
    price: number,
    provider: IProvider
}

export interface IBudgets {
    product: IProducts[],
    totalPrice: number,
    client: IClients

}

export interface IClients {
    name: string,
    lastname: string,
}

const clients = [
    {
        name: 'Jorge',
        lastname: 'Morales'

    },
    {
        name: 'Pablo',
        lastname: 'Perez'

    }
]


const providers = [
    {
        name: 'pedro',
        companyName: 'securita'

    },
    {
        name: 'jose',
        companyName: 'toldos pro max'
    }
]

const products = [
    {
        name: 'Seguridad',
        price: 1200,
        provider: {
            name: 'pedro',
            companyName: 'securita'
        },
    },
    {
        name: 'Carpas',
        price: 1500,
        provider: {
            name: 'jose',
            companyName: 'toldos pro max'
        },
    },
    {
        name: 'Toldos',
        price: 6511,
        provider: {
            name: 'pedro',
            companyName: 'securita'
        },
    },
    {
        name: 'Atencion de barra',
        price: 500,
        provider:  {
            name: 'jose',
            companyName: 'toldos pro max'
        },
    },
]

const budgets: any = [
    // {
    //     product: [],
    //     totalPrice: +'',
    // }
]

export const createProduct = (name: string, price: number, provider: IProvider) => {
    products.push({
        name: name,
        price: price,
        provider: provider
    })
    return products
}

export const getProducts = () => {
    return products
}

export const deleteProduct = (index: number) => {
    products.slice(index, 1)
}

export const getProductByIndex = (index: number) => {
    return products[index]
}

export const createProvider = (name: string, companyName: string) => {
    providers.push({
        name: name,
        companyName: companyName
    })
    return providers
}

export const getProviders = () => {
    return providers
}

export const getProviderByIndex = (index: number) => {
    return providers[index]
}

export const createBudget = (product: IProducts[], totalPrice: number, client: IClients) => {
    budgets.push({
        product: product,
        totalPrice: totalPrice,
        client: client,
    })
}

export const getBudget = () => {
    return budgets
}

export const getClientByIndex = (index: number) => {
    return clients[index]
}

export const getClients = () => {
    return clients
}

export const createClient = (name: string, lastname: string) => {
    clients.push({
        name: name,
        lastname: lastname,
    })
    return clients
}