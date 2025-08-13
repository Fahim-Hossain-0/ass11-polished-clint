import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <>
        <header>
            <Navbar></Navbar>
        </header>
        <main>
            <section>
                <Outlet></Outlet>
            </section>
        </main>
        <Footer></Footer>
        </>
    );
};

export default MainLayout;