import React from 'react';

import Container from '../Container';
import Logo from '../logo';
import Search from '../search';
import UserMenu from '../UserMenu';

const Navbar = ({ currentUser }) => {
    return (
        <div className='z-10 fixed bg-white shadow-sm w-full'>
            <div className='py-4 border-b'>
                <Container>
                    <div className='flex flex-row justify-between items-center gap-3 md:gap-0'>
                        <Logo/>
                        <Search/>
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;