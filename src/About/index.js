import React from 'react'
// Local imports
import aboutHFRImage from '../assets/images/about-hfr.svg'
import mapImage from '../assets/images/world-map.svg'
// this is the icon that will show up in the menu in DHIS2, we are only importing it so that it ends up being part of the built assets
/* eslint-disable no-unused-vars */
import dhis2Icon from '../assets/images/sl-app-launcher.png'

const About = () => {
  return (
    <div className='about'>
      <div className='intro-heading text-center'>
        <h1>About Sierra Leone HFR</h1>
      </div>
      <div className='abt-first-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7'>
              <p className='about-hfr-p'>
                Health Facility Registry (HFR) is an online tool to provide public access
                to a database of approved information about all health facilities in Sierra Leone.
                The Ministry of Health and Sanitation owns and maintains the data in the HFR database.
                The HFR is also the source of the Master Facility List, which is the official source of
                health facility information for the health care sector. Information about health facilities
                are collected using a data collection form and a Global Position System (GPS) receiver by health personnel.
                </p>
              <p>
                Information about health facilities are collected using a data collection form and a
                Global Position System (GPS) receiver by health personnel.
                </p>
            </div>
            <div className='col-md-5'>
              <img alt='About SLE HFR' src={aboutHFRImage} className='img-fluid pull-right' />
            </div>
          </div>
        </div>
      </div>
      <div className='map-display-pg'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 text-center'>
              <img alt='About SLE HFR - World Map' src={mapImage} className='img-fluid pull-left' />
            </div>
            <div className='col-md-6'>
              <p className='about-hfr-p'>
                    A separate online tool, the HFR Curation Tool, is used to enter and edit facility data in the HFR database.
                    All changes to the data are reviewed and have to be approved. Once data about a facility has been approved,
                    then facility information will be displayed in this public portal.
                    </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
