import React from 'react'
import { Footer as FooterFL } from 'flowbite-react';

function Footer() {
  return (
    <FooterFL container className="sticky top-[100vh]">
        <FooterFL.Copyright by="Andreas Backström" href="https://andreasbackstrom.se" year={2023}/>
        <FooterFL.LinkGroup>
            <FooterFL.Link href="/about">
                About
            </FooterFL.Link>
        </FooterFL.LinkGroup>

    </FooterFL>
  )
}

export default Footer