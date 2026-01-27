import React from 'react';
import Layout from '../../components/Layout';
import { InlineNotification } from '@carbon/react';

const MaintenanceApp: React.FC = () => {
    const params = new URLSearchParams(window.location.search);
    const customMessage = params.get('reason') || params.get('message');
    const subtitle = customMessage || "We are currently undergoing scheduled maintenance. Please check back soon.";

    return (
        <Layout>
            <div style={{ maxWidth: '800px', margin: '6rem auto' }}>
                <InlineNotification
                    kind="info"
                    title="Maintenance Mode"
                    subtitle={subtitle}
                    hideCloseButton
                    lowContrast
                />
            </div>
        </Layout>
    );
};

export default MaintenanceApp;
