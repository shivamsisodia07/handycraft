import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Landing";
import AddItems from "./AddItems";
import Inventory from "./Inventory";
import Login from "./Login";
import Alert from "./Alert";
import NavBar from "./NavBar";
import Error from "./Error";
import ItemDetails from "./ItemDetails";
import Contact from "./Contact";
import Homepage from "./components/Homepage";
import Productpage from "./components/Productpage";
import styles from "./jsmaster";
import {
  Billing,
  Business,
  Clients,
  Footer,
  Navbar,
  Stats,
  Testimonials,
} from "./components";
import ConsumerProfile from "./ConsumerProfile";
import CrafterProfile from "./CrafterProfile";
import { useState } from "react";

function App() {
  const [alert, setalert] = useState(null);
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
        <BrowserRouter>


          <div className='bg-primary w-full overflow-hidden'>
            <Alert alert={alert} />
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar />
              </div>
            </div>


            <Switch>
              <Route exact path='/login' component={() => <Login showalert={showalert} />} />
              <Route exact path='/consumer/profile' component={() => <ConsumerProfile showalert={showalert} />} />
              <Route exact path='/crafter/profile' component={() => <CrafterProfile showalert={showalert} />} />
              <Route exact path='/add-item' component={() => <AddItems showalert={showalert} />} />
            </Switch>

            <div
              className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Footer />
              </div>
            </div>
          </div>

        </BrowserRouter>
      </div>
    </>
  );

}

export default App;
