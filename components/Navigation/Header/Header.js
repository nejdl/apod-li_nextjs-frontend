import Link from 'next/link'

const Header = () => {
    return (
        <Link href='/'>
            <div id='header' className='noselect'>
                <a>
                    Library of Artistic <br/>
                    Print on Demand
                </a>
            </div>
        </Link>
    )
}

export default Header;