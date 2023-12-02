import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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

function App() {
  const [alert, setalert] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("hello world");
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

     
            <Switch>
              <Route exact path='/' component={() => <Landing showalert={showalert} />} />
              <Route exact path='/login' component={() => <Login showalert={showalert} />} />
              <Route exact path='/consumer/profile' component={() => <ConsumerProfile showalert={showalert} />} />
              <Route exact path='/crafter/profile' component={() => <CrafterProfile showalert={showalert} />} />
              <Route exact path='/add-item' component={() => <AddItems showalert={showalert} />} />
              <Route exact path='/inventory' component={() => <Inventory showalert={showalert} />} />
              <Route path='/item-details/' component={() => <ItemDetails showalert={showalert} />} />

            </Switch>

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
