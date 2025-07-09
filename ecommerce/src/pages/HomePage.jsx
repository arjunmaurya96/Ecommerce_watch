import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import Slider from '../pages/Home/slider'



const HomePage = () => {
  const { auth, setAuth } = useAuth();

  return (
    <>
      <Layout title={"All Product - Best Offers"}>
        {/* <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h1 className="text-center"> Filter By Category </h1>
            </div>
            <div className="col-md-9">
              <h1 className="text-center"> All Product </h1>
            </div>
          </div>
        </div> */}
        <Slider />


        {/* <CardHome /> */}
      </Layout>
    </>
  );
};

export default HomePage;
