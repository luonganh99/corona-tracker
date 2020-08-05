import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import HowToRegRoundedIcon from '../assets/imgs/how_to_reg.svg';
import VerifiedUserRoundedIcon from '../assets/imgs/verified_user.svg';
import DeathIcon from '../assets/imgs/death.svg';
import numeral from 'numeral';

import LineGraph from '../components/LineGraph';

import '../App.scss';

const caseTypeConfig = {
    cases: {
        color: '#CC1034',
        icon: HowToRegRoundedIcon,
    },
    recovered: {
        color: '#7dd71d',
        icon: VerifiedUserRoundedIcon,
    },
    deaths: {
        color: '#fb4443',
        icon: DeathIcon,
    },
};

function InfoBox({ title, newCases, totalCases, caseType, countryName, active, ...props }) {
    return (
        <Card
            className={`info-box ${active && 'info-box--selected'}`}
            style={{ color: caseTypeConfig[caseType].color }}
            onClick={props.onClick}
        >
            <CardContent>
                <div className='title-info-box'>
                    <Typography variant='h6' component='h2' color='textPrimary'>
                        {title}
                    </Typography>
                    <img src={caseTypeConfig[caseType].icon} alt='icon' />
                </div>
                <div className='detail-info-box'>
                    <Typography variant='h5' component='h3'>
                        {' '}
                        + {numeral(newCases).format('0.0a')}
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                        {numeral(totalCases).format('0.0a')} in total
                    </Typography>
                </div>
            </CardContent>
            <LineGraph countryName={countryName} caseType={caseType} />
        </Card>
    );
}

InfoBox.propTypes = {
    title: PropTypes.string.isRequired,
    newCases: PropTypes.number.isRequired,
    totalCases: PropTypes.number.isRequired,
};

export default InfoBox;
