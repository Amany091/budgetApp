import React from 'react'
import MainNavbar from '../MainNavbar'
import styles from './MainHeader.module.css'

const MainHeader = () => {
  return (
      <section className={`${styles.mainHeader} h-60 `} >
      <div className='navbar'>
      <MainNavbar/> 
          </div>
    </section>
  )
}

export default MainHeader
