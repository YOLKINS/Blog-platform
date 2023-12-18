import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Online, Offline } from 'react-online-status';

import { getUser } from '../redux/store/store';

import AppHeader from './header/AppHeader';
import AppMain from './main/AppMain';
import { NetworkLost } from './errors/errors';

const App = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.authorization.token);

  useLayoutEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);

  return (
    <div className="App">
      <Online>
        <AppHeader />
        <AppMain />
      </Online>
      <Offline>
        <NetworkLost />
      </Offline>
    </div>
  );
};

export default App;
