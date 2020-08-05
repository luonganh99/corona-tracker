import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import poster1 from '../assets/imgs/blue-1.png';
import poster2 from '../assets/imgs/blue-2.png';
import poster3 from '../assets/imgs/blue-3.png';
import poster from '../assets/imgs/hcmus_poster.jpg';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        marginTop: 20,
    },
}));

export default function Resources() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position='static' color='default'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='fullWidth'
                    aria-label='full width tabs example'
                >
                    <Tab label='Protect yourself and others from getting sick' {...a11yProps(0)} />
                    <Tab label='Health advice in Vietnam' {...a11yProps(1)} />
                    <Tab label='Symptoms' {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <div className='posters'>
                        <div className='poster'>
                            <img src={poster1} alt='logo' />
                        </div>
                        <div className='poster'>
                            <img src={poster2} alt='logo' />
                        </div>
                        <div className='poster'>
                            <img src={poster3} alt='logo' />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <div className='health-advice'>
                        <img src={poster} alt='poster' />
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <div className='video'>
                        <iframe
                            title='Symptoms'
                            width='1000'
                            height='480'
                            src='https://www.youtube.com/embed/U8r3oTVMtQ0'
                            frameborder='0'
                            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                            allowfullscreen
                        ></iframe>
                    </div>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}
