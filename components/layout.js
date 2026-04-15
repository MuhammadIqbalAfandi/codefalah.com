import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { featuredProducts } from '../lib/products';

export const siteTitle = 'CodeFalah';

export default function Layout({ children, home }) {
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const productMenuRef = useRef(null);
  const dropdownCloseTimeoutRef = useRef(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme ?? (preferredDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (productMenuRef.current && !productMenuRef.current.contains(event.target)) {
        setProductMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => () => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
    }
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

  function handleProductMenuMouseEnter() {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 740px)').matches) {
      return;
    }
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
    }
    setProductMenuOpen(true);
  }

  function handleProductMenuMouseLeave() {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 740px)').matches) {
      return;
    }
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setProductMenuOpen(false);
    }, 180);
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
            aria-label="Navigasi utama"
          >
            <Link href="/" className={styles.brand} aria-label="Beranda CodeFalah">
              <img src="/favicon.ico" alt="" className={styles.brandLogo} aria-hidden="true" />
              <span className={styles.brandName}>CodeFalah</span>
            </Link>
            <button
              type="button"
              onClick={handleMobileMenuToggle}
              className={styles.mobileMenuToggle}
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              <span className={styles.mobileMenuToggleIcon} aria-hidden="true">
                {mobileMenuOpen ? '✕' : '☰'}
              </span>
              <span>{mobileMenuOpen ? 'Tutup' : 'Menu'}</span>
            </button>
            <div
              id="mobile-navigation-menu"
              className={`${styles.menuContent} ${mobileMenuOpen ? styles.menuOpen : ''}`.trim()}
            >
              <div className={styles.navActions}>
                <div
                  ref={productMenuRef}
                  className={styles.productMenu}
                  onMouseEnter={handleProductMenuMouseEnter}
                  onMouseLeave={handleProductMenuMouseLeave}
                >
                  <button
                    type="button"
                    className={`${styles.navLink} ${styles.productMenuToggle}`.trim()}
                    aria-expanded={productMenuOpen}
                    aria-haspopup="true"
                    aria-controls="product-dropdown-menu"
                    onClick={() => {
                      if (dropdownCloseTimeoutRef.current) {
                        clearTimeout(dropdownCloseTimeoutRef.current);
                      }
                      setProductMenuOpen((prev) => !prev);
                    }}
                  >
                    Katalog Produk
                    <span
                      className={`${styles.dropdownIndicator} ${productMenuOpen ? styles.dropdownIndicatorOpen : ''}`}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>
                  <div
                    id="product-dropdown-menu"
                    className={`${styles.productDropdown} ${productMenuOpen ? styles.productDropdownOpen : ''}`}
                  >
                    {featuredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href="/#product"
                        className={styles.productItem}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setProductMenuOpen(false);
                        }}
                      >
                        <img src={product.image} alt="" aria-hidden="true" className={styles.productItemImage} />
                        <div className={styles.productItemContent}>
                          <strong className={styles.productItemTitle}>{product.name}</strong>
                          <p className={styles.productItemDescription}>{product.description}</p>
                          <span className={styles.productItemArrow} aria-hidden="true">
                            →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/demo" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
                  Demo
                </Link>
                <Link href="/tanya-harga" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
                  Tanya Harga
                </Link>
                <Link href="/#article" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
                  Artikel
                </Link>
              </div>
              <button
                type="button"
                onClick={handleThemeToggle}
                className={styles.themeToggle}
                aria-label={`Ganti ke mode ${theme === 'dark' ? 'terang' : 'gelap'}`}
              >
                <span className={styles.themeToggleIcon} aria-hidden="true">
                  {theme === 'dark' ? (
                    <svg viewBox="0 0 24 24" className={styles.themeToggleSvg} focusable="false">
                      <circle cx="12" cy="12" r="4.5" />
                      <path d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className={styles.themeToggleSvg} focusable="false">
                      <path d="M19 15.2A7.2 7.2 0 0 1 8.8 5a8.5 8.5 0 1 0 10.2 10.2Z" />
                    </svg>
                  )}
                </span>
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
      <footer className={styles.footer} aria-label="Footer situs">
        <div className={styles.footerWatermark} aria-hidden="true">
          CODEFALAH
        </div>
        <div className={styles.footerInner}>
          <div className={styles.footerContent}>
            <section className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>Brand Identity</h3>
              <p className={styles.footerText}>
                CodeFalah adalah platform digital yang membantu siapa pun membuat, menggunakan, dan menjual produk
                digital dengan mudah.
              </p>
              <p className={styles.footerText}>
                Dari software SaaS hingga produk siap pakai, kami hadir untuk menyederhanakan teknologi agar lebih
                banyak orang bisa meraih falah — kesuksesan yang bermakna.
              </p>
            </section>

            <section className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>Produk &amp; Platform</h3>
              <nav aria-label="Produk dan platform">
                <ul className={styles.footerLinks}>
                  <li>
                    <Link href="/#product" className={styles.footerLink}>
                      SaaS Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/#product" className={styles.footerLink}>
                      Undangan Digital
                    </Link>
                  </li>
                  <li>
                    <Link href="/#product" className={styles.footerLink}>
                      Semua Produk
                    </Link>
                  </li>
                </ul>
              </nav>
            </section>

            <section className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>Eksplorasi</h3>
              <nav aria-label="Eksplorasi situs">
                <ul className={styles.footerLinks}>
                  <li>
                    <Link href="/#about" className={styles.footerLink}>
                      Tentang Kami
                    </Link>
                  </li>
                  <li>
                    <Link href="/#article" className={styles.footerLink}>
                      Artikel
                    </Link>
                  </li>
                  <li>
                    <Link href="/#testimonial" className={styles.footerLink}>
                      Testimoni
                    </Link>
                  </li>
                  <li>
                    <Link href="/#roadmap" className={styles.footerLink}>
                      Roadmap
                    </Link>
                  </li>
                  <li>
                    <Link href="/tanya-harga" className={styles.footerLink}>
                      Hubungi Kami
                    </Link>
                  </li>
                </ul>
              </nav>
            </section>

            <section className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>Legal &amp; Value</h3>
              <p className={styles.footerMeta}>© 2026 CodeFalah. All rights reserved.</p>
              <p className={styles.footerMeta}>Build with purpose. Grow with impact.</p>
            </section>
          </div>
        </div>
      </footer>
    </div>
  );
}
