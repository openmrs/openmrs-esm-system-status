import React from 'react';
import {
    Header,
    HeaderName,
} from '@carbon/react';

const AppHeader: React.FC = () => {
    return (
        <Header aria-label="OpenMRS System Status">
            <HeaderName href="#" prefix="OpenMRS">
                System Status
            </HeaderName>
        </Header>
    );
};

export default AppHeader;
