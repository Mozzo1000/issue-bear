import React from 'react'
import { Link } from 'react-router-dom'

function TermsOfService() {
  return (
    <section className="bg-white">
        <article className="prose lg:prose-xl py-8 px-4 mx-auto max-w-screen lg:py-16 lg:px-12">
            <h1 className="text-center">Terms of Service</h1>
            <p className="text-center text-lg text-gray-500 sm:px-16 xl:px-48">Last updated: 2023-07-07</p>
            
            <h2>Introduction</h2>
            <p>
                This document ("Terms") outlines the terms regarding your use of the products ("Services") provided at website WEBSITE_LINK by the Service Provider (described below). 
                If you do not agree with these Terms, do not register or use any of the Services.
                <br/><br/>
                By registering for an account or using our Services, you are agreeing to be bound by these Terms for the Services and are entering into a 
                legally binding contract with the Service Provider (also referred to as "we, "us" and "our").
            </p>

            <h2>Service Provider</h2>
            <p>
                Andreas Backström ("Service Provider") is the individual providing the Services at website WEBSITE_LINK.<br/>
                Contact information to the Service Provider can be found at the bottom of this document.
            </p>

            <h2>Privacy</h2>
            <p>
                In order to operate and provide the Services, we collect certain information about you.
                We use and protect that information as described in our <Link to="/privacy">Privacy Policy</Link>. You acknowledge your use of the Services is subject to our Privacy Policy and understand that it identifies how we collect, store, and use certain information.
            </p>
            
            <h2>Changes to these terms</h2>
            <p>
                We reserve the right to modify these Terms. If we make material changes to these Terms, we will notify you via the Services and/or by email to the address associated with your account.
                If you do not accept the changes, you must stop using and cancel your account. Your continued use of our Services after we publish or send a notice about our changes to these Terms means that you are consenting to the updated terms.
            </p>

            <h2>Service availability</h2>
            <p>
                The Service is provided on an “as is” and “as available” basis.
                We may change, suspend, or discontinue any of our Services without prior notice. 
                Your use of the Services may be terminated if you breach the Terms of this agreement.
            </p>

            <h2>Notices and messages</h2>
            <p>
                You agree that we will provide notices and messages to you within the Service and/or by email to the address associated with your account.
                These notices and messages may only contain information, questions or similar vital to your continued use of the Service. 
                The email address provided may not be used for marketing purposes without additional prior consent.
            </p>

            <h2>Contact information</h2>
            <p>
                For questions and help with the Service and/or the Terms outlined in this document you may contact us at help@EMAIL.ADDRESS
            </p>
        </article>
    </section>
  )
}

export default TermsOfService