import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../redux/store/store';

import AppHeader from './header/AppHeader';
import AppMain from './main/AppMain';

const App = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.authorization.token);

  useLayoutEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);

  return (
    <div className="App">
      <AppHeader />
      <AppMain />
    </div>
  );
};

export default App;
