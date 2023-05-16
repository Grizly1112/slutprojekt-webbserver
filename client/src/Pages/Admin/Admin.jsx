import React from 'react'
import './css/Admin.css'
import {useRef} from 'react';

export default function Admin() {
    const EditTOS = () => {
        const text = [
            {
                id: 1, 
                title: "Agreements", 
                text: 'We operate the website Mag Forum, as well as any other related products and services that refer or link to these legal terms (the Legal Terms) (collectively, the "Services). You can contact us by email at or by mail to These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity you, and concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY. We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you by as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms. The Services are intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services. We recommend that you print a copy of these Legal Terms for your records.'
            },
            {
                id: 2,
                title: "1. OUR SERVICES",
                text: 'The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.'
            },
            {
                id: 3,
                title: "2. INTELLECTUAL PROPERTY RIGHTS",
                text: 'Our intellectual property We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks"). Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world. The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only. Your use of our Services Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to: access the Services; and download or print a copy of any portion of the Content to which you have properly gained access. solely for your personal, non-commercial use or internal business purpose. Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.' },
            {
                id: 4,
                title: "3. USER REPRESENTATIONS",
                text: 'By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not under the age of 13; (5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services; (6) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (7) you will not use the Services for any illegal or unauthorized purpose; and (8) your use of the Services will not violate any applicable law or regulation. If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof). '
            },
            {
                id: 5,
                title: "4. USER REGISTRATION",
                text: 'You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable. '
            },
            {
                id: 6,
                title: "5. PROHIBITED ACTIVITIES",
                text: "You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Services, you agree not to: Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us. Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords. Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein. Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services. • Use any information obtained from the Services in order to harass, abuse, or harm another person. • Make improper use of our support services or submit false reports of abuse or misconduct. • Use the Services in a manner inconsistent with any applicable laws or regulations. Engage in unauthorized framing of or linking to the Services. • Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services. • Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools. • Delete the copyright or other proprietary rights notice from any Content. Attempt to impersonate another user or person or use the username of another user. Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (gifs), 1x1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as spyware or passive collection mechanisms or pcms). Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services. Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you. · Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services. Copy or adapt the Services software, including but not limited to Flash, PHP, HTML, JavaScript, or other code. Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services. • Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software. • Use a buying agent or purchasing agent to make purchases on the Services. Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses."
            },
            {
                id: 7,
                title: "6. PRIVACY POLICY",
                text: 'We care about data privacy and security. Please review our Privacy Policy: By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in then through your continued use of the Services, you are transferring your data to and you expressly consent to have your data transferred to and processed in. '
            },
            {
                id: 8,
                title: "7. DISCLAIMER",
                text: 'THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON- INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.'
            },
            {
                id: 9,
                title: "8. USER DATA",
                text: 'We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data. '
            },
            {
                id: 10,
                title: "9. MISCELLANEOUS",
                text: 'These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms. '
            },
        ]

        

        
        function handleSubmit(e) {
            // Prevent the browser from reloading the page
            e.preventDefault();
        
            // Read the form data
            const form = e.target;
            const formData = new FormData(form);
        
            // Or you can work with it as a plain object:
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
          }

        return(
            <ul className='edit-tos'>
                {
                    text.map((section, i) => {
                        return(
                            <form method='post' onSubmit={handleSubmit}> 
                            <li className='tos-section' key={section.id}>
                                <p>Terms of Service sektion (id {section.id})</p>
                                <hr />
                                <div className='section-edit'>
                                    <div>
                                        <h2>
                                            Titel: 
                                        </h2>
                                        <textarea name="postTitle" className='section-edit-title' defaultValue={section.title}/>
                                        <p type="text" id={`section-text-${section.id}`}>
                                            {section.title}                                                                         
                                        </p>
                                    </div>
                                    <button>Ändra</button>

                                </div>
                                <hr/>
                                <div className='section-edit'>
                                    <textarea name="postContent" className='section-edit-input' defaultValue={section.text}/>
                                    <button>Ändra</button>
                                </div>  
                                <button type='submit'>Submit</button>                         
                            </li>
                            
                            </form>
                        )

                    }) 

                    
                }
            </ul>
        )


    }


  return (
    <div className='admin'>
        Admin
        <EditTOS />
    </div>
  )
}
