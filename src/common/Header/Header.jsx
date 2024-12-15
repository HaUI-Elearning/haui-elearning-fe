import './Header.scss';
import Logo from './Logo';
import '../../i18n';
import CategoryItem from './Category';
import SearchBar from './SearchBar';
import FavoriteIcon from './Favorite';
import CartIcon from './Cart';
import AuthButtons from './Auth';

const Header = () => {
    return (
        <nav className="navbar">
            <Logo />
            <CategoryItem />
            <SearchBar />
            <FavoriteIcon />
            <CartIcon />
            <AuthButtons />
        </nav>
    );
};

export default Header;