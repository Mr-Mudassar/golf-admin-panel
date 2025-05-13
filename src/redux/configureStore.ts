import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice"; // Corrected import
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer, // Use the reducer exported from userSlice
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the user slice
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Persistor for persisting the store
export const persistor = persistStore(store);

// TypeScript types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
