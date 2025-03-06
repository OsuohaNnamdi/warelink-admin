import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/userReducer';



const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
