import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Form from '../components/form';
import BasicMenu from '../components/BasicMenu';
import Details from '../components/Details';
import Router from 'next/router';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if ( !localStorage.getItem('token') ) {
      Router.push('/');
    }
  }, [])
  
  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Form Tab" {...a11yProps(0)} />
          <Tab label="Profile Tab" {...a11yProps(1)} />
          <BasicMenu></BasicMenu>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <Form />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Details />
      </TabPanel>
    </Box>
    </>
  );
}