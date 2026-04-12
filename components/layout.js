import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const siteTitle = 'CodeFalah';

export default function Layout({ children, home }) {
  const [theme, setTheme] = useState('light');

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
        <nav className={styles.navbar} aria-label="Main navigation">
          <Link href="/" className={styles.brand}>
            <Image
              priority
              src="/images/profile.png"
              height={40}
              width={40}
              alt="CodeFalah logo"
            />
            <span>CodeFalah</span>
          </Link>

          <div className={styles.navActions}>
            <Link href="/" className={styles.navLink}>
              Blog
            </Link>
            <Link href="/#mulai-jual" className={styles.navLink}>
              Jual Produk Web
            </Link>
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
      </header>
      <main>{children}</main>
      <footer className={styles.footer} aria-label="Site footer">
        <div className={styles.footerWatermark} aria-hidden="true">
          CODEFALAH
        </div>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Image
              src="/images/profile.png"
              height={36}
              width={36}
              alt="CodeFalah footer logo"
            />
            <span>CodeFalah</span>
          </div>
          <p className={styles.footerText}>
            Owner by Muhammad Iqbal Afandi, Desain by code
          </p>
        </div>
      </footer>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
