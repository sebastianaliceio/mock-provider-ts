import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProductsTable from './components/product-table';
import ProvidersTable from './components/providers-table';
import CreateBudgetForm from './components/create-budget-form';
import BudgetsTable from './components/budgets-table';
import Header from './components/header';
import ClientTable from './components/client-table';

export const App = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className="app">
      <Header />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <div className="app-body">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Generar presupuesto" value="1" />
                <Tab label="Tabla de proveedores" value="2" />
                <Tab label="Tabla de productos" value="3" />
                <Tab label="Tabla de presupuestos" value="4" />
                <Tab label="Tabla de clientes" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CreateBudgetForm render={setValue} />
            </TabPanel>
            <TabPanel value="2">
              <Box className="provider-table">
                <ProvidersTable />
              </Box>
            </TabPanel>
            <TabPanel value="3">
              <Box className='client-table'>
                <ProductsTable />
              </Box>
            </TabPanel>
            <TabPanel value="4">
              <Box className='budgets-table'>
                <BudgetsTable />
              </Box>
            </TabPanel>
            <TabPanel value="5">
              <Box className='clients-table'>
                <ClientTable />
              </Box>
            </TabPanel>
          </TabContext>
        </div>
      </Box>
    </Box>
  );
}

export default App;
