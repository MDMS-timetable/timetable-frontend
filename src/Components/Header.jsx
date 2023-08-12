import React from 'react';

const Header = () => {
  return (
    <div className='header'>
      <div></div>
      <div className='header-title'>
        <img src="https://em-content.zobj.net/source/microsoft-teams/363/school_1f3eb.png" alt="" />
        <span>만덕중학교</span>
      </div>
      <div className='login-container'>
        {/* <span className='login'>로그인</span> */}
        {/* <span className='register'>회원가입</span> */}
      </div>
    </div>
  );
};

export default Header;