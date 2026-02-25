export interface ServiceEndpoint {
    name: string;
    url: string;
}

export interface AppConfig {
    services: ServiceEndpoint[];
}

export const loadConfig = async (): Promise<AppConfig> => {
    try {
        const response = await fetch('./config.json');
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        console.error('Failed to load config.json', e);
    }

    return {
        services: [
            { name: 'Liveness Probe', url: '/openmrs/health/alive' },
            { name: 'Readiness Probe', url: '/openmrs/health/started' }
        ]
    };
};
