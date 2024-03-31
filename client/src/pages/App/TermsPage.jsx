import React from 'react'
import Header from '../../components/Layout/Header'
import Terms from '../../components/AppComponents/TermsAndPrivacy/Terms'
import DownloadApp from '../../components/DownloadApp/DownloadApp'
import Footer from '../../components/Layout/Footer'

const TermsPage = () => {
  return (
    <div>
        <Header/>
        <Terms />
        <DownloadApp />
        <Footer/>
    </div>
  )
}

export default TermsPage