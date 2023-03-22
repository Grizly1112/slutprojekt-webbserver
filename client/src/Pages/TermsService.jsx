import { useState } from 'react';
import './css/TermsService.css';

export default function TermsService(){
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
            text: 'Our intellectual property We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks"). Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world. The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only. Your use of our Services Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to: access the Services; and ■ download or print a copy of any portion of the Content to which you have properly gained access. solely for your personal, non-commercial use or internal business purpose. Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.' },
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
            text: "You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Services, you agree not to: Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us. ■ Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords. ■ Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein. ■ Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services. • Use any information obtained from the Services in order to harass, abuse, or harm another person. • Make improper use of our support services or submit false reports of abuse or misconduct. • Use the Services in a manner inconsistent with any applicable laws or regulations. ■ Engage in unauthorized framing of or linking to the Services. • Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services. • Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools. • Delete the copyright or other proprietary rights notice from any Content. Attempt to impersonate another user or person or use the username of another user. ■ Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (gifs), 1x1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as spyware or passive collection mechanisms or pcms). Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services. Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you. · Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services. ■ Copy or adapt the Services software, including but not limited to Flash, PHP, HTML, JavaScript, or other code. Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services. • Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software. • Use a buying agent or purchasing agent to make purchases on the Services. ■ Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses."
        },
        {
            id: 7,
            title: "6. USER GENERATED CONTRIBUTIONS",
            text: 'The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that: The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party. ■You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms. ■You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms. Your Contributions are not false, inaccurate, or misleading. Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation. Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us). Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone. ■ Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people. ■ Your Contributions do not violate any applicable law, regulation, or rule. Your Contributions do not violate the privacy or publicity rights of any third party. Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors. Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap. Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation. Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services. '
        },
        {
            id: 8,
            title: "7. CONTRIBUTION LICENSE",
            text: 'By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels. This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions. We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions. We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions. '
        },
        {
            id: 9,
            title: "8. SERVICES MANAGEMENT",
            text: 'We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.'
        },
        {
            id: 10,
            title: "9. PRIVACY POLICY",
            text: 'We care about data privacy and security. Please review our Privacy Policy: By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in then through your continued use of the Services, you are transferring your data to and you expressly consent to have your data transferred to and processed in. '
        },
        {
            id: 11,
            title: "10. TERM AND TERMINATION",
            text: 'These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION. If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress. '
        },
        {
            id: 12,
            title: "11. MODIFICATIONS AND INTERRUPTIONS",
            text: 'We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services. We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith. '
        },
        {
            id: 13,
            title: "12. DISPUTE RESOLUTION",
            text: 'You agree to irrevocably submit all disputes related to these Legal Terms or the legal relationship established by these Legal Terms to the jurisdiction of the courts. shall also maintain the right to bring proceedings as to the substance of the matter in the courts of the country where you reside or, if these Legal Terms are entered into in the course of your trade or profession, the state of your principal place of business.'
        },
        {
            id: 14,
            title: "13. CORRECTIONS",
            text: 'There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice. '
        },
        {
            id: 15,
            title: "14. DISCLAIMER",
            text: 'THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON- INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.'
        },
        {
            id: 16,
            title: "15. LIMITATIONS OF LIABILITY",
            text: 'IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. '
        },
        {
            id: 17,
            title: "16. INDEMNIFICATION",
            text: 'You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.'
        },
        {
            id: 18,
            title: "17. USER DATA",
            text: 'We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data. '
        },
        {
            id: 19,
            title: "18. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
            text: 'Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means. '
        },
        {
            id: 20,
            title: "19. MISCELLANEOUS",
            text: 'These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms. '
        },
        {
            id: 21,
            title: "20. CONTACT US",
            text: 'In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at: mag@forum.se'
        },
    ]

    const titleLinks = [
        {
            id: 1, 
            title: "Agreements", 
        },
        {
            id: 2,
            title: "1. OUR SERVICES",
        },
        {
            id: 3,
            title: "2. INTELLECTUAL PROPERTY RIGHTS",
        },
        {
            id: 4,
            title: "3. USER REPRESENTATIONS",
        },
        {
            id: 5,
            title: "4. USER REGISTRATION",
        },
        {
            id: 6,
            title: "5. PROHIBITED ACTIVITIES",
        },
        {
            id: 7,
            title: "6. USER GENERATED CONTRIBUTIONS",
        },
        {
            id: 8,
            title: "7. CONTRIBUTION LICENSE",
        },
        {
            id: 9,
            title: "8. SERVICES MANAGEMENT",
        },
        {
            id: 10,
            title: "9. PRIVACY POLICY",
        },
        {
            id: 11,
            title: "10. TERM AND TERMINATION",
        },
        {
            id: 12,
            title: "11. MODIFICATIONS AND INTERRUPTIONS",
        },
        {
            id: 13,
            title: "12. DISPUTE RESOLUTION",
        },
        {
            id: 14,
            title: "13. CORRECTIONS",
        },
        {
            id: 15,
            title: "14. DISCLAIMER",
        },
        {
            id: 16,
            title: "15. LIMITATIONS OF LIABILITY",
        },
        {
            id: 17,
            title: "16. INDEMNIFICATION",
        },
        {
            id: 18,
            title: "17. USER DATA",
        },
        {
            id: 19,
            title: "18. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
        },
        {
            id: 20,
            title: "19. MISCELLANEOUS",
        },
        {
            id: 21,
            title: "20. CONTACT US",
        },
    ]

    const Titles = (props) => {
        var idtest = props.id;
        return(
            <>
                <div className="scrollTitle" onClick={(idtest) =>{
                    window.scroll(0, 
                        findPosition(document.getElementById(idtest)));
                    function findPosition(obj) {
                        console.log(obj)
                        var currenttop = 0;
                        if (obj.offsetParent) {
                            do {
                                currenttop += obj.offsetTop;
                            } while ((obj = obj.offsetParent));
                            return [currenttop-100];
                        }
                    }
                }}>{props.title}</div>
            </>
        )
        
    }
    
    const TitlesText = (props) => {
        return(
            <>
                <div className="title" id={props.id}>{props.title}</div>
                <div className="textContent">{props.text}</div>  
            </>
        )
    } 

    return(
        <>
        <div className="scrollToS">
            {titleLinks.map((message, i) =>{
                return <Titles title={message.title}/>
            })}
        </div>
        <div className="termsofServiece">
            <div className="ToSContent">
                <h1 className='tilte-h1'>Terms of Services</h1>
                <h2 className='title-h2'>Last updated March 22, 2023</h2>
                {text.map((message, i) =>{
                    return <TitlesText title={message.title} text={message.text} id={message.id}/>
                })}
            </div>
        </div>
        </>
    )
}