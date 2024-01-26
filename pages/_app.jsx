import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';

import en from '../i18n/en.json'
import ar from '../i18n/ar.json'
const messages = { en, ar };
function getDirection(locale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();

  return <IntlProvider locale={locale} messages={messages[locale]}>
    <Component {...pageProps} dir={getDirection(locale)} />
  </IntlProvider>
}
