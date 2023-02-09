import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { FooterLayout } from './Footer.styled'

const Footer = () => {
  return (
    <FooterLayout className='text'>
        <div>2023, All rights reserved.</div>
        <div>Made with <i>{<FontAwesomeIcon icon={faHeart} />}</i> by MyNest team.</div>
    </FooterLayout>
  )
}

export default Footer