import React from 'react';
import { Link } from 'react-router-dom';

//Components
import SeoungHyun from '../img/HyunIMG.png';
import AnysIMG from '../img/AnysIMG.png';
import JYHIMG from '../img/JYHIMG.png';

const Footer = () => {
    return (
        <div className='Footer_Container'>
            <div className='Footer_Header'>개발자 정보</div>
            <div className='Footer_Link'><Link to='/'>Back</Link></div>
            <div className='Footer_Items'>
                <div className='Footer_Item'>
                    <div className='Footer_IMG'>
                        <img src={SeoungHyun} alt='' />
                    </div>
                    <span>
                        <p>이승현(프론트, 디자인)</p>
                        GitHub : Jamkris
                        <br />
                        Insta : hyun_2u
                        <br />
                        Email : dltmdgus1412@gmail.com
                    </span>
                </div>
                <div className='Footer_Item'>
                    <div className='Footer_IMG'>
                        <img src={AnysIMG} alt='' />
                    </div>
                    <span>
                        <p>안예성(기획, 백엔드)</p>
                        GitHub : anys34
                        <br />
                        Insta : an.ys_34
                        <br />
                        Email : anyeseong34@gmail.com
                    </span>
                </div>
                <div className='Footer_Item'>
                    <div className='Footer_IMG'>
                        <img src={JYHIMG} alt='' />
                    </div>
                    <span>
                        <p>전영현(프론트, 디자인)</p>
                        GitHub : jyh071116
                        <br />
                        Insta : jyh071116
                        <br />
                        Email : jyh071116@gmail.com
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
