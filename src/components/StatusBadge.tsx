import React from 'react';
import { Tag } from '@carbon/react';

export type StatusType = 'up' | 'down' | 'degraded' | 'maintenance';

interface StatusBadgeProps {
    status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    let type: 'green' | 'red' | 'warm-gray' | 'blue' = 'green';
    let label = 'Unknown';

    switch (status) {
        case 'up':
            type = 'green';
            label = 'Operational';
            break;
        case 'down':
            type = 'red';
            label = 'Outage';
            break;
        case 'degraded':
            type = 'warm-gray';
            label = 'Degraded Performance';
            break;
        case 'maintenance':
            type = 'blue';
            label = 'Maintenance';
            break;
    }

    return <Tag type={type}>{label}</Tag>;
};

export default StatusBadge;
