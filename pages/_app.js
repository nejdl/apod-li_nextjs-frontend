import { useEffect } from 'react';
import '../styles/styles.css'
// import { useRouter } from 'next/router'

const App = ({ Component, pageProps }) => {

  // const router = useRouter();

  // const pushCurrentRouteInfo = () => {
  //   // console.log('routeChangeStart');
  //   // console.log(window.scrollY);
  // }

  // const getCurrentRouteInfo = () => {
  //   // console.log('routeChangeComplete');
  //   // console.log(window.scrollY);
  // }

  // useEffect(() => {
  //   router.events.on('routeChangeStart', pushCurrentRouteInfo)
  //   router.events.on('routeChangeComplete', getCurrentRouteInfo)

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.on('routeChangeStart', pushCurrentRouteInfo)
  //     router.events.on('routeChangeComplete', getCurrentRouteInfo)
  //   }
  // }, [])


  // fix scrollbar-width problem in firefox / windows
  useEffect(() => {
    // create the measurement node
    var scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    scrollDiv.style.overflowY = "scroll";
    document.body.appendChild(scrollDiv);

    // get the scrollbar width
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.documentElement.style.setProperty('--scrollbarWidth', scrollbarWidth + 'px');

    // delete the DIV 
    document.body.removeChild(scrollDiv);
  }, [])

  return <Component {...pageProps} />
}

export default App;
