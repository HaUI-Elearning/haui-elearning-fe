import './Header.scss';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
    const { t } = useTranslation('header');

    return (
        <div className="navbar-search">
            <button className="search-button">
                <IconSearch stroke={2} />
            </button>
            <input type="text" placeholder={t('header1')} className="search-input" />
        </div>
    );
};

export default SearchBar;