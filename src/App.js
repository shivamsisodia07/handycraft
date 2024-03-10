import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/App.css";
import AddItems from "./components/Crafter/AddItems";
import Login from "./components/Login";
import Alert from "./components/Alert";
import styles from "./assets/js/jsmaster";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ConsumerProfile from "./components/Consumer/ConsumerProfile";
import CrafterProfile from "./components/Crafter/CrafterProfile";
import Inventory from "./components/Crafter/Inventory";
import { useState } from "react";
import ItemDetails from "./components/Crafter/ItemDetails";
import Landing from "./components/Landing";
import Preloader from "./components/Preloader/Preloader";
import { useEffect } from "react";
import ProductLarge from "./components/ProductLarge";
import CartProducts from "./components/CartProducts";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Register from "./components/Register";

function App() {
  const [alert, setalert] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, []);

  const showalert = (message, type) => {
    setalert({            // set alert is used to set state of alerts.
      message: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 3000)
  }

  return (
    <>

      <div className='App'>
        {loading ? (<Preloader />) : (<BrowserRouter>


          <div className='w-full overflow-hidden'>
            <Alert alert={alert} />
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar />
              </div>
            </div>


            <Routes>
              <Route path='/' element={<Landing showalert={showalert} />} />
              <Route path='/login' element={<Login showalert={showalert} />} />
              <Route path='/register' element={<Register showalert={showalert} />} />
              <Route path='/consumer/profile' element={<ConsumerProfile showalert={showalert} />} />
              <Route path='/crafter/profile' element={<CrafterProfile showalert={showalert} />} />
              <Route path='/add-item' element={<AddItems showalert={showalert} />} />
              <Route path="/cart" element={<Cart showalert={showalert} />} />
              <Route path='/inventory' element={<Inventory showalert={showalert} />} />
              <Route path='/item-details/:id' element={<ItemDetails showalert={showalert} />} />
              <Route path='/productlarge' element={<ProductLarge showalert={showalert} />} />
              <Route path='/cart' element={<Cart showalert={showalert} />} />

              <Route path="/myOrders" element={<Order showalert={showalert} />} />

            </Routes>

            <div
              className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Footer />
              </div>
            </div>
          </div>

        </BrowserRouter>)}

      </div>
    </>
  );

}

export default App;
