import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Landing";
import AddItems from "./AddItems";
import Inventory from "./Inventory";
import Login from "./Login";
import Profile from "./Profile";
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

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          {" "}
          {/* <NavBar /> */}{" "}
          <Switch>
            <div className='bg-primary w-full overflow-hidden'>
              <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                  <Navbar />
                </div>{" "}
              </div>{" "}
              <Route path='/contact/:userId' component={Contact} />{" "}
              <Route exact path='/' component={Landing} />{" "}
              <Route path='/login' component={Login} />{" "}
              <Route path='/homepage' component={Homepage} />{" "}
              <Route path='/productpage' component={Productpage} />{" "}
              <Route path='/profile' component={Profile} />{" "}
              <Route path='/add-item' component={AddItems} />{" "}
              <Route path='/inventory' component={Inventory} />{" "}
              <Route path='/item-details/:itemId' component={ItemDetails} />{" "}
              {/* <Route path="/myorders" component={myorders} /> */}{" "}
              {/* <Route path="/MYORDERSR" component={MYORDERS} /> */}{" "}
              <div
                className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                  {" "}
                  {/* <Stats />
                                  <Business />
                                  <Billing />
                                  <Testimonials />
                                  <Clients /> */}{" "}
                  <Footer />
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </Switch>{" "}
        </BrowserRouter>{" "}
      </div>
    );
  }
}

export default App;
