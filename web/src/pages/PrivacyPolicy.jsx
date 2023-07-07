import React from 'react'
import { Link } from 'react-router-dom'

function PrivacyPolicy() {
  return (
    <section className="bg-white">
        <article className="prose lg:prose-xl py-8 px-4 mx-auto max-w-screen lg:py-16 lg:px-12">
            <h1 className="text-center">Privacy policy</h1>
            <p className="text-center text-lg text-gray-500 sm:px-16 xl:px-48">Last updated: 2023-07-07</p>
            
            <p>This Policy adopts the definitions found in the <Link to="/tos">Terms of Service</Link>.</p>
            <h2>Information we collect</h2>
            <p>
                The following information is collected, stored and processed by the Service when you create and have an active account,
                <ul>
                    <li>Name</li>
                    <li>Email</li>
                </ul>
                Besides the already above mentioned information the Service allows third party users that do not have an active account and that may not directly visit the Services website, 
                to send in information with the following characteristics,
                <ul>
                    <li>Arbitrary amount of text</li>
                    <li>Email</li>
                    <li>Image of a website</li>
                </ul>
            </p>

            <h2>Data request</h2>
            <p>
                You may at anytime request a copy of all data relevant to You and your account by contacting the Service Provider at the contact information supplied at the bottom of this document.<br/><br/>
                The Service Provider will without unnecessary delay provide you with this data in a human readable format.
            </p>

            <h2>Data storage and processing</h2>
            <p>
                All data handled by the Service is handled within EU/EES countries.<br /> <br />
                We may be required to access the information stored in order to operate the Service. We will not access information without proper reason.<br />
                No information collected will be sold, shared or made available to any third party.
            </p>

            <h2>Third party providers</h2>
            <p>
                We use the following providers to operate the Service,
                <ul>
                    <li>DigitalOcean - infrastructure and website hosting</li>
                </ul>
            </p>

            <h2>Changes to this policy</h2>
            <p>
                We reserve the right to modify the privacy policy ("Policy"). If we make material changes to this Policy, we will notify you via the Services and/or by email to the address associated with your account.
            </p>

            <h2>Contact information</h2>
            <p>
                For questions and help with the Service and/or the Policy outlined in this document you may contact us at help@EMAIL.ADDRESS
            </p>
        </article>
    </section>
  )
}

export default PrivacyPolicy