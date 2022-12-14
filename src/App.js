import {MainProvider, useMainContext, MainContext} from "./store/contexts"
import * as Layout from "./layout";
import Dashboard from "./layout/Dashboard";
import { useLocation, Navigate } from "react-router-dom";
import  TrayWidget  from "./components/TrayWidget";

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  MemoryRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <MainProvider>
      <HashRouter>
        <Routes>
              <Route path="/" element={
                  <Dashboard />
              } />

              <Route path="/widget" element={
                  <TrayWidget />
              } />
              
              <Route path="/login" element={
                <RequireLogout>
                  <Layout.Login/>
                </RequireLogout>
              }/>
              <Route path="/register" element={
                <RequireLogout>
                  <Layout.Register />
                </RequireLogout>
              }/>
              <Route path="*" element={ <Layout.NotFound />} />
        </Routes>
      </HashRouter>
    </MainProvider>
  );
}

function RequireLogout({children}) {
  let {state} = useMainContext();
  let location = useLocation();

  if (state.logged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}


function RequireAuth({ children }) {
  let {state} = useMainContext();
  let location = useLocation();

  if (!state.logged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
