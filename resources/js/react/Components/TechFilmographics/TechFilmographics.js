import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import SwipeableViews from 'react-swipeable-views';
import './TechFilmographics.scss';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TechUsageMap from '../TechUsageMap/TechUsageMap';
import TechUsageEmployees from '../TechUsageEmployees/TechUsageEmployees';
import TechUsageIndustry from '../TechUsageIndustry/TechUsageIndustry';
import TechUsageTechBudgets from '../TechUsageTechBudgets/TechUsageTechBudgets';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
};

const TabPanel = ({ children, value, index }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Box>{children}</Box>
    </Typography>
  )
};

const useStylesForContainer = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

const useStylesForAppBar = makeStyles(() => ({
  root: {
    backgroundColor: '#FFFFFF',
    boxShadow: 'none',
    marginBottom: '40px',
  },
}));

const useStylesForTabs = makeStyles(() => ({
  root: {
    borderBottom: '1px solid #8D8D8D'
  },
  indicator: {
    backgroundColor: '#16a6ba',
  },
}));

const useStylesForTab = makeStyles(() => ({
  root: {
    fontWeight: '600',
    fontSize: '1rem',
    color: '#6A6868',
    textTransform: 'none',
  },
  selected: {
    color: '#16a6ba',
  },
}));

const TechFilmographics = ({ technology }) => {
  const classesForContainer = useStylesForContainer();
  const classesForAppBar = useStylesForAppBar();
  const classesForTabs = useStylesForTabs();
  const classesForTab = useStylesForTab();
  const [content, setContent] = useState('');
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  const handleChangeIndex = index => setValue(index);

  return(
    <div className='techFilmographicsContainer'>
      <p>Firmographics of Companies using {technology.name} <i className="fas fa-info-circle" /></p>
      <div className={classesForContainer.root}>
        <AppBar position="static" classes={classesForAppBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            classes={classesForTabs}
          >
            <Tab classes={classesForTab} label="Locations" {...a11yProps(0)} />
            <Tab classes={classesForTab} label="# Employees" {...a11yProps(1)} />
            <Tab classes={classesForTab} label="Industry" {...a11yProps(2)} />
            <Tab classes={classesForTab} label="Tech Budgets" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <TechUsageMap setTooltipContent={setContent} locations={technology.locations} />
            <ReactTooltip>{content}</ReactTooltip>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TechUsageEmployees employees={technology.employees_range_companies_count} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TechUsageIndustry industry={technology.industry} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TechUsageTechBudgets />
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  )
}

export default TechFilmographics