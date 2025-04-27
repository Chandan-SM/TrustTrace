# AI Safety Incident Dashboard - Trust Trace

## Overview

A responsive web application for monitoring, reporting, and tracking AI safety incidents. This dashboard was built as part of a technical assignment for SPARKLEHOOD.

![AI Safety Incident Dashboard](https://res.cloudinary.com/dsktf7dac/image/upload/v1745769551/Screenshot_2025-04-27_at_9.28.20_PM_haodxv.png)

## Features

- **Incident Tracking**: View a list of reported AI safety incidents with their title, severity level, and date
- **Interactive Filtering**: Filter incidents by severity (Low, Medium, High, or All)
- **Advanced Search**: Search incidents by keyword across titles and descriptions
- **Date Range Filtering**: Filter incidents by specific date ranges
- **Custom Sorting**: Sort incidents by date (newest or oldest first)
- **Pagination**: Navigate through large sets of incident data with intuitive page controls
- **Data Export**: Export filtered incident data to CSV format for external analysis
- **Expandable Details**: Toggle visibility of full incident descriptions
- **Incident Reporting**: Submit new incidents through an interactive form with validation
- **Dark/Light Mode**: Toggle between dark and light themes for different viewing preferences
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Session Persistence**: Incident data persists within the browser session

## Technologies Used

- **Framework**: Next.js with React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: React Context API

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Main page component
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Dashboard.tsx     # Main dashboard component
│   ├── IncidentCard.tsx  # Individual incident display
│   ├── IncidentForm.tsx  # New incident submission form
│   ├── FilterControls.tsx # Filtering and sorting controls
│   ├── SearchBar.tsx     # Search functionality component
│   ├── DateRangeFilter.tsx # Date range filtering component
│   ├── Pagination.tsx    # Page navigation controls
│   ├── ExportButton.tsx  # Data export functionality
│   └── ThemeToggle.tsx   # Dark/light mode toggle
├── context/              # React context providers
│   ├── IncidentContext.tsx # Incident data management
│   └── ThemeContext.tsx  # Theme state management
└── data.ts               # Initial mock data
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chandan-SM/TrustTrace.git
   cd TrustTrace/trusttrace
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Implementation Details

### State Management

The application uses React Context API for state management:
- `IncidentContext` - Manages incident data, filtering, sorting, pagination, search, and date range filtering
- `ThemeContext` - Manages theme preferences (dark/light mode)

### Data Persistence

Incident data is stored in SessionStorage to persist across page refreshes but not across browser sessions. This meets the requirement for session-based persistence without needing a backend.

### Search Functionality

The search feature allows users to find specific incidents by keywords that match in either the title or description:
- Real-time filtering as users type
- Clear button to reset search terms
- Visual indicators when search is active

### Date Range Filtering

Users can filter incidents by specific date ranges:
- Select start and end dates through an intuitive date picker
- Clear date filters with a single click
- Combined filtering with severity and search terms

### Pagination

For improved performance and user experience with large datasets:
- Dynamic page number generation
- Previous/Next navigation buttons
- Visual indication of current page
- Configurable number of incidents per page

### Data Export

The export functionality allows users to:
- Export the current filtered set of incidents to CSV format
- Include all relevant incident data in the export
- Download files directly to the user's device

### Responsive Design

The dashboard is fully responsive, using Tailwind CSS for styling:
- Desktop: Multi-column layout with side-by-side controls
- Mobile: Single-column layout with stacked elements

### UI/UX Details

- Animated transitions for improved user experience
- Color-coded severity indicators (green for Low, yellow for Medium, red for High)
- Form validation with error messages
- Toast notifications for successful actions
- Accessible design with appropriate contrast ratios

## Design Decisions

- **Context API vs Redux**: Chose React Context for state management as the application scope didn't require the complexity of Redux
- **Framer Motion**: Added subtle animations to enhance the user experience without compromising performance
- **Session Storage**: Implemented session-based persistence to maintain state across page refreshes
- **Component Structure**: Divided the UI into modular components for better maintainability and reusability
- **Theming**: Implemented a comprehensive dark/light theme system that affects all UI elements consistently
- **Pagination Strategy**: Implemented client-side pagination to improve performance with large datasets
- **Date Filtering Implementation**: Used native date inputs with custom styling for better cross-browser compatibility
- **Export Implementation**: Used client-side CSV generation for direct downloads without server requirements