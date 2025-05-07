import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Banner from './components/Banner';
import Header from './components/Header';
import EmpanadasSection from './components/EmpanadasSection';
import Sucursales from './pages/Sucursales';
import Franquicias from './pages/Franquicias';
import QuienesSomos from './pages/QuienesSomos';
import Contacto from './pages/Contacto';
import AdminLogin from './pages/AdminLogin';
import AdminEmpanadas from './pages/AdminEmpanadas';
import AdminDashboard from './pages/AdminDashboard';
import OrderType from './pages/OrderType';
import Delivery from './pages/Delivery';
import Pickup from './pages/Pickup';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import AdminPedidos from './pages/AdminPedidos';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 140px;
  min-height: calc(100vh - 140px);
  
  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

const AdminContent = styled.main`
  min-height: 100vh;
  background-color: var(--color-background);
`;

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <GlobalStyles />
      <Routes>
        {/* Rutas Admin */}
        <Route path="/admin/*" element={
          <AdminContent>
            <Routes>
              <Route path="/" element={<Navigate to="/admin/login" replace />} />
              <Route path="login" element={<AdminLogin />} />
              <Route path="empanadas" element={<AdminEmpanadas />} />
              <Route path="dashboard" element={
                localStorage.getItem('adminToken') ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              } />
              <Route path="pedidos" element={<AdminPedidos />} />
            </Routes>
          </AdminContent>
        } />

        {/* Rutas de Pedidos */}
        <Route path="/order-type" element={<OrderType />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/pickup" element={<Pickup />} />

        {/* Rutas Públicas */}
        <Route path="/*" element={
          <AppContainer>
            <Banner />
            <MainContent>
              <Routes>
                <Route path="/" element={
                  <>
                    <Header />
                    <EmpanadasSection />
                  </>
                } />
                <Route path="/sucursales" element={<Sucursales />} />
                <Route path="/franquicias" element={<Franquicias />} />
                <Route path="/quienes-somos" element={<QuienesSomos />} />
                <Route path="/contacto" element={<Contacto />} />
              </Routes>
            </MainContent>
            <Footer />
            <WhatsAppButton />
          </AppContainer>
        } />
      </Routes>
    </Router>
  );
};

export default App;
