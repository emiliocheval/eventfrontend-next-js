"use client"

import React from 'react';
import LandingPage from './_components/landingpage';
import Footer from './_components/footer';

const HomePage = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D')` }}>
      <LandingPage/>
    </div>
      <Footer/>
    </>
  );
};

export default HomePage;
