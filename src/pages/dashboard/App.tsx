import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableContainer,
} from '@carbon/react';
import Layout from '../../components/Layout';
import StatusBadge, { StatusType } from '../../components/StatusBadge';
import { loadConfig, AppConfig, ServiceEndpoint } from '../../config';

const checkStatus = async (url: string) => {
    try {
        const response = await fetch(url);

        if (response.status === 200) {
            return {
                status: 'up' as StatusType,
                code: 200
            };
        }

        return {
            status: 'degraded' as StatusType,
            code: response.status
        };
    } catch (error) {
        return {
            status: 'down' as StatusType,
            code: 'ERR'
        };
    }
};

const useServiceStatus = (endpoint: ServiceEndpoint) => {
    const { data, isLoading } = useSWR(endpoint.url, checkStatus, {
        refreshInterval: 30000,
        dedupingInterval: 5000
    });

    return {
        status: data?.status || (isLoading ? 'degraded' : 'down'),
        code: data?.code || '...',
        timestamp: new Date().toLocaleTimeString(),
    };
};

const ServiceRow: React.FC<{ endpoint: ServiceEndpoint }> = ({ endpoint }) => {
    const { status, code, timestamp } = useServiceStatus(endpoint);

    return (
        <TableRow>
            <TableCell>{endpoint.name}</TableCell>
            <TableCell><code>{endpoint.url}</code></TableCell>
            <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StatusBadge status={status as StatusType} />
                    <span style={{ fontSize: '12px', color: '#6f6f6f' }}>
                        ({code})
                    </span>
                </div>
            </TableCell>
            <TableCell>{timestamp}</TableCell>
        </TableRow>
    );
};

const DashboardApp: React.FC = () => {
    const [config, setConfig] = useState<AppConfig | null>(null);

    useEffect(() => {
        loadConfig().then(setConfig);
    }, []);

    const headers = [
        { key: 'name', header: 'Service Name' },
        { key: 'url', header: 'Endpoint' },
        { key: 'status', header: 'Status' },
        { key: 'lastChecked', header: 'Last Checked' },
    ];

    if (!config) {
        return <Layout><div>Loading Configuration...</div></Layout>;
    }

    return (
        <Layout>
            <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
                <DataTable rows={[]} headers={headers}>
                    {({ headers, getHeaderProps, getTableProps }) => (
                        <TableContainer
                            title="System Status Dashboard"
                            description="Real-time monitoring of OpenMRS Core health probes."
                        >
                            <Table {...getTableProps()}>
                                <TableHead>
                                    <TableRow>
                                        {headers.map((header) => (
                                            <TableHeader {...getHeaderProps({ header })} key={header.key}>
                                                {header.header}
                                            </TableHeader>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {config.services.map((endpoint) => (
                                        <ServiceRow key={endpoint.name} endpoint={endpoint} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DataTable>
            </div>
        </Layout>
    );
};

export default DashboardApp;