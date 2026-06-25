import React from 'react'
import Header2 from '../components/dusacomponent/Header2'
import Banner from '../components/dusacomponent/dusawelcomepage/WelcomePageBanner'
// import TrackingSearch from '../components/newlandingpage/TrackingSearch'
import BannerWithTracking from '../components/newlandingpage/PartnersMarquee'
// import HowItWorks from '../components/newlandingpage/HowItWorks'
// import PlanSubscription from '../components/newlandingpage/PlanSubscription'
import TrustedByShopper from '../components/newlandingpage/TrustedByShopper'
import SignUpWithBulq from '../components/newlandingpage/SignUpWithBulq'
import Footer from '../components/dusacomponent/Footer'
import Header from '../components/Header'
// import LandingBanner from '../components/landingbanner/LandingBanner'
import HomeHeader from '../components/newlandingpage/HomeHeader'
import FloatingActionMenu from '../components/newlandingpage/FloatingActionMenu'

const LandingPage = () => {
  return (
    <div className="w-full flex flex-col">
      {/* <Header /> */}
      {/* <HomeHeader /> */}

      {/* <Banner />
          <TrackingSearch /> */}
      <BannerWithTracking />
      {/* <LandingBanner /> */}
      {/* <HowItWorks />
      <PlanSubscription />
      <TrustedByShopper />
      <SignUpWithBulq /> */}

      {/* Floating Action Menu */}
                      <FloatingActionMenu />
      <Footer />
    </div>
  )
}

export default LandingPage