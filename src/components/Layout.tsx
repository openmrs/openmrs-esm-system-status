import React from 'react';
import AppHeader from './Header';
import { Content } from '@carbon/react';
import '../styles/global.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <AppHeader />
            <Content>{children}</Content>
        </>
    );
};

export default Layout;
