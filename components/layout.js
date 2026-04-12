import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const siteTitle = 'CodeFalah';

export default function Layout({ children, home }) {
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme ?? (preferredDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    setTheme(initialTheme);
  }, []);

  function handleThemeToggle() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  }

  function handleMobileMenuToggle() {
    setMobileMenuOpen((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Saya menjual produk saya sendiri untuk membantu bisnis Anda berkembang di web."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <nav
            className={styles.navbar}
            aria-label="Main navigation"
          >
            <Link href="/" className={styles.brand} aria-label="CodeFalah home">
              <img src="/favicon.ico" alt="" className={styles.brandLogo} aria-hidden="true" />
              <span className={styles.brandName}>CodeFalah</span>
            </Link>
            <button
              type="button"
              onClick={handleMobileMenuToggle}
              className={styles.mobileMenuToggle}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? '✕ Menu' : '☰ Menu'}
            </button>
            <div
              id="mobile-navigation-menu"
              className={`${styles.menuContent} ${mobileMenuOpen ? styles.menuOpen : ''}`.trim()}
            >
              <div className={styles.navActions}>
                <Link
                  href="/#product"
                  className={styles.navLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Katalog Produk
                </Link>
                <Link
                  href="/#promo"
                  className={styles.navLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Promo
                </Link>
                <Link href="/" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
                  Artikel
                </Link>
              </div>
              <button
                type="button"
                onClick={handleThemeToggle}
                className={styles.themeToggle}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
              </button>
            </div>
          </nav>
        </div>
      </header>
      <div className={styles.pageContent}>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/" className={styles.backToHomeLink}>
              <span aria-hidden="true">←</span>
              <span>Kembali ke halaman utama</span>
            </Link>
          </div>
        )}
      </div>
      <footer className={styles.footer} aria-label="Site footer">
        <div className={styles.footerWatermark} aria-hidden="true">
          CODEFALAH
        </div>
        <div className={styles.footerInner}>
          <div className={styles.footerContent}>
            <p className={styles.footerText}>
              Owner by Muhammad Iqbal Afandi, Desain by code
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
