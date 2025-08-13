import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const AuthLayout = () => {
    return (
        <>
         <header className='container mx-auto'>
            <Navbar></Navbar>
        </header>
        <main>
            <section className=''>
                <Outlet></Outlet>
            </section>
        </main>
        <Footer></Footer>
        </>
    );
};

export default AuthLayout;