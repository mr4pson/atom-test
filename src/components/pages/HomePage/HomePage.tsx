import { memo } from 'react';
import Header from '../../modules/Header';

function HomePage(): JSX.Element {
    return (
        <div className="home-page">
            <div className="container">
                <Header/>
                Home page
            </div>
        </div>
    );
}

export default memo(HomePage);