import React, { useEffect, useState } from 'react'
import './css/Footer.css'
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaMoon, FaSun } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {
  FaRegSun,
  FaRegMoon,
} from 'react-icons/fa';
import logo from '../assets/logo.png';


export default function Footer() {
  const footerLinks = [
    {
      title: 'Mag Media',
      links: [
        { title: 'Terms of Service', path: '/terms' },
        { title: 'Terms of Service', path: '/terms' },
        { title: 'Terms of Service', path: '/terms' },
        { title: 'Terms of Service', path: '/terms' },
      ],
    },
    {
      title: 'Länkar',
      links: [
        { title: 'Terms of Service', path: '/terms' },
        { title: 'Terms of Service', path: '/terms' },
        { title: 'Terms of Service', path: '/terms' },
        { title: 'Terms of Service', path: '/terms' },
      ],
    },
    {
      title: 'Övrigt',
      links: [
        { title: 'Terms of Service', path: '/terms' },
        { title: 'Terms of Service', path: '/terms' },
        { title: 'Terms of Service', path: '/terms' },
        { title: 'Terms of Service', path: '/terms' },
      ],
    },
  ];

  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem('theme'));
    setTheme(storedTheme?.theme || false);
  }, []);

  function changeTheme() {
    const newTheme = !theme;
    document.documentElement.setAttribute('data-dark-mode', newTheme);
    localStorage.setItem('theme', JSON.stringify({ theme: newTheme }));
    setTheme(newTheme);
  }

  function Breadcrumbs() {
    const location = useLocation();
    let currentLink = '';
    const crumbs = location.pathname
      .split('/')
      .filter((crumb) => crumb !== '')
      .map((crumb) => {
        currentLink += `/${crumb}`;
        return (
          <div className='crumb' key={crumb}>
            <Link to={currentLink}>{crumb}</Link>
            <FaChevronRight />
          </div>
        );
      });
  
    return (
      <div className='breadcrumbs'>
        <div className='crumb'>
          <Link className='footer-home' to={'/'}>
            Mag Forum
          </Link>
          <FaChevronRight />
        </div>
        {crumbs}
      </div>
    );
  }

  return (
    <div className='footer'>
      <div className="footer-content">
        <Breadcrumbs />
        <hr />
        <div className="footer-box">
          {footerLinks.map((section) => (
              <div className='footer-links' key={section.title}>
                <h3>{section.title}</h3>
                {section.links.map((link) => (
                  <NavLink className='footer-navlink' to={link.path} key={link.title}>
                    {link.title}
                  </NavLink>
                ))}
              </div>
          ))}
        </div>
      </div>
      <div className="footer-info">
        <NavLink to={"/"} className="footer-logo">
          <img className="logo" src={logo} alt="" />
        </NavLink>
        <div className='footer-themes'>
        <div className='footer-switch'>
        <div className={theme ? "footer-theme" :"footer-theme activeFooterLink"} id='dark' onClick={changeTheme}><FaSun/> Ljust</div>
            <div className="footer-space"></div>
            <div className={theme ? "footer-theme activeFooterLink": "footer-theme"} id='light' onClick={changeTheme}><FaMoon />Mörkt</div>
        </div>
      </div>
      </div>
      <div className="footer-copyright">
        <hr/>
        <p>Copyright © 2023 Mag Media. Alla rättigheter förbehålls.</p>
      </div>
    </div>
  )
}
