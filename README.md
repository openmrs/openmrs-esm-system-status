# OpenMRS System Status

Lightweight maintenance pages and system status dashboard for OpenMRS, built with **Vite, React, and Carbon Design System**.

This project provides two static-ready pages:
1.  **Maintenance Page**: A user-friendly "Under Maintenance" screen.
2.  **System Dashboard**: An admin-facing status board that polls backend services.

## Features
- **Multi-Page Application (MPA)**: Separate entry points for `/maintenance.html` and `/dashboard.html`.
- **Lightweight**: Minimal dependencies, optimized for speed.
- **O3 Design System**: Uses IBM Carbon components to match OpenMRS O3.
- **Demo Mode**: Built-in mock data generator for UI testing.
- **Docker Ready**: Multi-stage build serving static assets via Nginx.

## Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start Dev Server**:
    ```bash
    npm run dev
    ```
    - Access Maintenance Page: `http://localhost:5173/maintenance.html`
    - Access Dashboard: `http://localhost:5173/dashboard.html`

## Building

To build the project for production:

```bash
npm run build
```

This will generate a `dist` folder containing the optimized static assets and HTML files.

## Docker

### Build Image
```bash
docker build -t openmrs-system-status .
```

### Run Container (Standalone)
```bash
docker run -p 8080:80 openmrs-system-status
```

### Run with Docker Compose (Recommended)
To connect to a real OpenMRS backend, use Docker Compose:

```yaml
version: '3'
services:
  openmrs:
    image: openmrs/openmrs-core:nightly
    ports:
      - "8081:8080"
  
  system-status:
    build: .
    ports:
      - "80:80"
    depends_on:
      - openmrs
```
The Nginx config is pre-configured to proxy `/openmrs` requests to `http://openmrs:8080/openmrs`.

## Configuration

### Service Endpoints
The dashboard polls endpoints defined in `src/config/index.ts`. You can override these at runtime by injecting a `window.config` object before the script loads, or by modifying the source code.

Default endpoints:
- **Liveness Probe**: `/openmrs/health/alive`
- **Readiness Probe**: `/openmrs/health/started`

### Demo Mode
To toggle Demo Mode (simulates status updates):
1.  Enable via the "Demo Mode" toggle in the Dashboard UI.
2.  Or set via config:
    ```javascript
    window.config = {
      demoMode: true
    };
    ```

## Project Structure

```
/
├── public/                 # Static assets
├── src/
│   ├── components/         # Shared Carbon components
│   ├── config/             # Config & Endpoints
│   ├── pages/
│   │   ├── maintenance/    # Maintenance Page Logic
│   │   └── dashboard/      # Status Dashboard Logic
│   └── styles/             # Global CSS
├── vite.config.ts          # Vite MPA Config
├── Dockerfile              # Production Build
└── nginx.conf              # Nginx Config
```
