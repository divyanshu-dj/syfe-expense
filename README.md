# 💰 Goal-Based Savings Planner

A modern, responsive web application for tracking financial goals and building your savings habit. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Goal Management**: Create and track multiple financial goals with INR/USD support
- **Real-time Exchange Rates**: Live currency conversion using ExchangeRate-API
- **Progress Tracking**: Visual progress bars and completion percentages
- **Contribution History**: Add dated contributions and track saving patterns
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Your data persists across browser sessions
- **Dashboard Analytics**: Overview of total targets, savings, and progress

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or download this project**
   ```bash
   cd syfe-expense
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Architecture & Design Decisions

### Tech Stack
- **Framework**: Next.js 15
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first design
- **Icons**: Lucide React for consistent iconography
- **HTTP Client**: Axios for API requests

## 📱 User Experience

### Dashboard Flow
1. **Overview**: See total targets, savings, and progress at a glance
2. **Goal Management**: Add new goals with intuitive forms
3. **Contribution Tracking**: Easy-to-use modals for adding contributions
4. **Progress Visualization**: Clear progress bars and percentages

### Validation & Error Handling
- Form validation prevents invalid inputs
- API errors gracefully handled with fallbacks
- Loading states provide feedback during operations

## 🔄 API Integration

The app uses ExchangeRate-API for live currency conversion:
- **Endpoint**: `https://v6.exchangerate-api.com/v6/API_KEY/latest/USD`
- **Rate Limiting**: 1,500 requests/month on free tier
- **Fallback**: Hardcoded rates if API fails
- **Caching**: Exchange rates cached in localStorage

## 📊 Future Enhancements

Potential improvements for production:
- **Backend Integration**: User accounts and cloud storage
- **Advanced Analytics**: Spending patterns and goal insights
- **Multi-currency Support**: Additional currencies beyond INR/USD
- **Goal Categories**: Organize goals by type (emergency, vacation, etc.)
- **Notification System**: Reminders and milestone celebrations
- **Data Export**: CSV/PDF export functionality
- Setting up CI/CD pipeline

## 🐛 Known Limitations

- **Client-side only**: No user authentication or backend
- **Browser storage**: Data limited to single browser/device
- **API dependency**: Exchange rates require internet connection

---
