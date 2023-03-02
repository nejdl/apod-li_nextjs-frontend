import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  libraryMenuItem,
  libraryMenuItemSlug,
  errorPageMenuItemSlug,
} from '../MenuItems';
import { transformSlugToMenuItem } from '../MenuItems';

import Header from '../Header/Header';

const NavigationBar = ({ menuOrder, isPublication, isErrorPage }) => {
  // dynamically set nav height to set padding-top of filter
  const navBarRef = useRef(null);

  useEffect(() => {
    setNavHeight();
  });

  const setNavHeight = () => {
    const navBar = navBarRef.current;
    const buffer = 1;
    const navBarHeight = navBar.offsetHeight + buffer;
    document.documentElement.style.setProperty(
      '--navBarHeight',
      navBarHeight + 'px'
    );
  };

  // spread pagesData passed through menuOrder into array
  const menuPageOrder = menuOrder.pageorder;
  let pagesData = [];
  for (let i = 0; i < menuPageOrder.length; i++) {
    const page = menuPageOrder[i].page;
    pagesData.push(page);
  }

  // get current path
  const router = useRouter();

  // get current url slug for setting the active menu item
  const currentMenuItemSlugArray = router.asPath.split('/');
  let currentMenuItemSlug = currentMenuItemSlugArray[1];
  // if on publication page set currentMenuItemSlug to library slug
  if (isPublication) {
    currentMenuItemSlug = libraryMenuItemSlug;
  } else if (isErrorPage) {
    currentMenuItemSlug = errorPageMenuItemSlug;
  }

  // get menu item name from slug
  // either from menuItems.js or from pagesData
  let currentMenuItem = transformSlugToMenuItem(currentMenuItemSlug);
  if (!currentMenuItem) {
    let pageData = pagesData.find((x) => x.slug === currentMenuItemSlug);
    if (pageData) {
      currentMenuItem = pageData.title;
    }
  }

  const handleMobileMenuClick = () => {
    const navBar = document.getElementsByClassName('navBar')[0];
    const mobileMenu_toggleArrow = document.getElementById(
      'mobileMenu_toggleArrow'
    );
    // const mobileMenuTitle = document.getElementById('mobileMenuTitle');
    const currentMenuItem = document.getElementById('currentMenuItem');

    navBar.classList.toggle('hidden');
    mobileMenu_toggleArrow.classList.toggle('open');
    // mobileMenuTitle.classList.toggle('open');
    currentMenuItem.classList.toggle('invisible');
  };

  return (
    <div className='navBarContainer sticky'>
      <div className='mobileMenu' onClick={handleMobileMenuClick}>
        <div id='currentMenuItem'>{currentMenuItem}</div>
        <div id='mobileMenuTitle'>Menu</div>
        <div
          id='mobileMenu_toggleArrow'
          className='accordion_toggleArrow'
        ></div>
      </div>
      <nav ref={navBarRef} className='navBar hidden'>
        <ul>
          {pagesData.map((pageData) => {
            if (pageData.slug === 'library') {
              return (
                <Link key={pageData.slug} href={'/' + libraryMenuItemSlug}>
                  <a>
                    <li
                      className={
                        currentMenuItemSlug === libraryMenuItemSlug
                          ? 'selected menuItems'
                          : 'menuItems'
                      }
                    >
                      {libraryMenuItem}
                    </li>
                  </a>
                </Link>
              );
            } else {
              return (
                <Link key={pageData.slug} href={'/' + pageData.slug}>
                  <a>
                    <li
                      className={
                        currentMenuItemSlug === pageData.slug
                          ? 'selected menuItems'
                          : 'menuItems'
                      }
                    >
                      {pageData.title}
                    </li>
                  </a>
                </Link>
              );
            }
          })}
        </ul>
      </nav>
      <Header />
    </div>
  );
};

export default NavigationBar;
