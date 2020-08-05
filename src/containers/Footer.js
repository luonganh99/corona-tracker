import React from 'react';
import GithubIcon from '../assets/imgs/github-icon.png';
import FavoriteIcon from '@material-ui/icons/FavoriteRounded';

function Footer() {
    return (
        <div className='footer'>
            <a href='#'>
                <img src={GithubIcon} alt='github' />
            </a>
            <p className='made-by'>
                Made by Luong Anh with <FavoriteIcon color='#f10707' />
            </p>
            <p>August, 2020</p>
        </div>
    );
}

export default Footer;
