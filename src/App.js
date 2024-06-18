
import './App.css';
import { Navbar } from './component/Navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from '../src/Theme/DarkTheme';
import { Home } from './component/Home/Home';
import RestaurantDetail from './component/Restaurant/RestaurantDetail';
import Cart from './component/Cart/Cart';
import Profile from './component/Profile/Profile';
import { CustomerRouter } from './Routers/CustomerRouter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './component/State/authentication/Action';

import { findCart } from './component/State/Cart/Action';
import { Routers } from './Routers/Routers'
import { getRestaurantByUserId } from './component/State/Restaurant/Action';


function App() {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  // console.log('jwt', jwt)
  const { auth } = useSelector(store => store)
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(auth.jwt || jwt))
      dispatch(findCart(jwt))
    }
  }, [auth.jwt])

  useEffect(() => {
    if (jwt) {
      dispatch(getRestaurantByUserId(auth.jwt || jwt))
    }
  }, [auth.jwt])

  // console.log('jwt', auth.jwt)
  return (
    <ThemeProvider theme={darkTheme}>

      <CssBaseline />
      <Navbar />
      {/* <Navbar /> */}
      {/* <Home /> */}
      {/* <RestaurantDetail /> */}
      {/* <Cart /> */}
      {/* <Profile /> */}
      {/* <CustomerRouter /> */}
      <Routers />
    </ThemeProvider >
  );
}

export default App;
