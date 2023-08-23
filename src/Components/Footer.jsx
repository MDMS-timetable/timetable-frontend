import React from 'react';
import github from "../img/github-mark.svg";
import instagram from "../img/Instagram_logo.svg";
import anys from "../img/anys_logo.svg";

const Footer = () => {
    return (
        <div>
            <hr />
            <div>
                <div className='info'>
                    <div>Developer</div>
                    <div>안예성</div>
                    <div>Info</div>
                </div>

                <div className='link'>
                    <a href='https://www.instagram.com/an.ys_34/' target='_blank' rel='noreferrer'>
                        <img className='insta' src={instagram} alt='' rel="nofollow"></img>
                    </a>
                    <div className='line'></div>
                    <a href='https://github.com/anys34' target='_blank' rel='noreferrer'>
                        <img className='github' src={github} alt='' rel="nofollow"></img>
                    </a>
                </div>

                <div className='last-text'>
                    <div>@2023 MDMS-TimeTalbe from</div>
                    <div className='anys'>
                        <img src={anys} alt='' rel="nofollow"></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
