import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import PropertyDetail from './pages/PropertyDetail/PropertyDetail'
import SearchResults from './pages/Search/SearchResults'
import Wishlist from './pages/Wishlist/Wishlist'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import BecomeHostProfile from './pages/BecomeHost/BecomeHostProfile'
import BecomeHostAddress from './pages/BecomeHost/BecomeHostAddress'
import BecomeHostType from './pages/BecomeHost/BecomeHostType'
import BecomeHostPlaceType from './pages/BecomeHost/BecomeHostPlaceType'
import BecomeHostLocation from './pages/BecomeHost/BecomeHostLocation'
import BecomeHostMapVisibility from './pages/BecomeHost/BecomeHostMapVisibility'
import BecomeHostDetails from './pages/BecomeHost/BecomeHostDetails'
import BecomeHostPhotos from './pages/BecomeHost/BecomeHostPhotos'
import BecomeHostTitleDesc from './pages/BecomeHost/BecomeHostTitleDesc'
import BecomeHostDescription from './pages/BecomeHost/BecomeHostDescription'
import BecomeHostBooking from './pages/BecomeHost/BecomeHostBooking'
import BecomeHostPrice from './pages/BecomeHost/BecomeHostPrice'
import BecomeHostDiscounts from './pages/BecomeHost/BecomeHostDiscounts'
import BecomeHostSafety from './pages/BecomeHost/BecomeHostSafety'
import BecomeHostFinalDetails from './pages/BecomeHost/BecomeHostFinalDetails'
import UserProfile from './pages/UserProfile/UserProfile'
import HostDashboard from './pages/HostDashboard/HostDashboard'

function App() {
  useEffect(() => {
    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <div className="app">
      <Routes>
        {/* Auth Routes without Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Host Onboarding Routes without standard Navbar/Footer */}
        <Route path="/become-a-host/profile" element={<BecomeHostProfile />} />
        <Route path="/become-a-host/address" element={<BecomeHostAddress />} />
        <Route path="/become-a-host/property-type" element={<BecomeHostType />} />
        <Route path="/become-a-host/place-type" element={<BecomeHostPlaceType />} />
        <Route path="/become-a-host/location" element={<BecomeHostLocation />} />
        <Route path="/become-a-host/map-visibility" element={<BecomeHostMapVisibility />} />
        <Route path="/become-a-host/details" element={<BecomeHostDetails />} />
        <Route path="/become-a-host/photos" element={<BecomeHostPhotos />} />
        <Route path="/become-a-host/title-desc" element={<BecomeHostTitleDesc />} />
        <Route path="/become-a-host/description" element={<BecomeHostDescription />} />
        <Route path="/become-a-host/booking" element={<BecomeHostBooking />} />
        <Route path="/become-a-host/price" element={<BecomeHostPrice />} />
        <Route path="/become-a-host/discounts" element={<BecomeHostDiscounts />} />
        <Route path="/become-a-host/safety" element={<BecomeHostSafety />} />
        <Route path="/become-a-host/final-details" element={<BecomeHostFinalDetails />} />
        
        {/* Main App Routes with Navbar/Footer */}
        <Route path="*" element={
          <>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/hosting" element={<HostDashboard />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
