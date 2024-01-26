// Additional imports for Context API
import React, { createContext, useContext, useState, useEffect } from 'react';

// Localization context
const LocalizationContext = createContext();

// Custom hook for accessing the context
export const useLocalization = () => useContext(LocalizationContext);

// Localization provider component
const LocalizationProvider = ({ children }) => {
  const router = useRouter();
  const [locale, setLocale] = useState(router.locale);

  // Update locale state when router changes
  useEffect(() => {
    setLocale(router.locale);
  }, [router.locale]);

  // Context value
  const contextValue = {
    locale,
    setLocale,
    getDirection: (locale) => (locale === 'ar' ? 'rtl' : 'ltr'),
  };

  return (
    <LocalizationContext.Provider value={contextValue}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Original imports and message definitions
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const messages = { en, ar };

// Modified App component
export default function App({ Component, pageProps }) {
  return (
    <LocalizationProvider>
      <LocalizationContext.Consumer>
        {({ locale, getDirection }) => (
          <IntlProvider locale={locale} messages={messages[locale]}>
            <Component {...pageProps} dir={getDirection(locale)} />
          </IntlProvider>
        )}
      </LocalizationContext.Consumer>
    </LocalizationProvider>
  );
}
