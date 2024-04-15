import React from "react";
import Header from '../components/Header';
import Body from '../components/BodyAutenticacionAdministrador';
import Footer from "../components/Footer";

const AutenticacionAdmin: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default AutenticacionAdmin;
