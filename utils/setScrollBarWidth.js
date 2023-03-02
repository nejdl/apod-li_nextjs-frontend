export const setScrollBarWidth = () => {

    let scrollbarWidth = 0;
    const siteBody = document.getElementsByClassName('siteBody')[0];
    const siteBodyHeight = siteBody.clientHeight;
    const siteBodyScrollHeight = siteBody.scrollHeight;
    const windowHeight = window.innerHeight;

    // check if scrollbar is visible on this page
    if (siteBodyScrollHeight < windowHeight){
        // set the scrollbar width
        document.documentElement.style.setProperty('--scrollbarWidth', scrollbarWidth + 'px');
        // console.log('no overflow ' + scrollbarWidth);
    } else {
        // Create the measurement node
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "scrollbar-measure";
        scrollDiv.style.overflowY = "scroll";
        document.body.appendChild(scrollDiv);
        // Get the scrollbar width
        scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        // Delete the DIV 
        document.body.removeChild(scrollDiv);
        // set the scrollbar width
        document.documentElement.style.setProperty('--scrollbarWidth', scrollbarWidth + 'px');
        // console.log('overflow ' + scrollbarWidth);
    }

    // set resize handler
    window.addEventListener('resize', setScrollBarWidth);

}