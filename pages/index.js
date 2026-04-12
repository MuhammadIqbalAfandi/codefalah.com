import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import homeStyles from '../styles/blog-home.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [postLayout, setPostLayout] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const totalPages = Math.ceil(allPostsData.length / postsPerPage);
  const paginatedPosts = allPostsData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  const brandPalette = [
    { name: 'Navy Core', hex: '#102840' },
    { name: 'Royal Blue', hex: '#0A67C7' },
    { name: 'Sky Accent', hex: '#6EB4FF' },
    { name: 'Soft Surface', hex: '#E9F3FF' },
    { name: 'Background Tint', hex: '#F4F9FF' },
  ];

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={homeStyles.hero}>
        <span className={homeStyles.badge}>Welcome to Blog</span>
        <h2 className={homeStyles.heroTitle}>Solusi produk digital untuk bantu bisnis Anda tumbuh</h2>
        <p className={homeStyles.heroDescription}>
          Fokus utama website ini adalah membantu Anda menemukan produk digital
          yang siap pakai untuk promosi, pengembangan, dan optimasi website bisnis.
          Artikel tetap tersedia sebagai referensi tambahan.
        </p>

        <div className={homeStyles.heroActions}>
          <a className={homeStyles.heroPrimaryCta} href="#product">
            Lihat katalog produk
          </a>
          <a className={homeStyles.heroSecondaryCta} href="#promo">
            Lihat promo & bonus
          </a>
        </div>
      </section>

      <section id="product" className={homeStyles.sellSection}>
        <span className={homeStyles.badge}>Katalog Utama</span>
        <h2 className={homeStyles.sellTitle}>Katalog produk digital siap jual & siap pakai</h2>
        <p className={homeStyles.sellDescription}>
          Pilih produk yang paling sesuai untuk kebutuhan bisnis Anda. Semua
          produk dirancang agar implementasi cepat, tampilan modern, dan mudah dikembangkan.
        </p>

        <div className={homeStyles.offerGrid}>
          <article className={homeStyles.offerCard}>
            <h3>Template Landing Page</h3>
            <p>Template siap pakai untuk promosi bisnis dengan desain modern dan ringan.</p>
          </article>
          <article className={homeStyles.offerCard}>
            <h3>Boilerplate Next.js</h3>
            <p>Starter kit Next.js untuk mempercepat pembangunan website production-ready.</p>
          </article>
          <article className={homeStyles.offerCard}>
            <h3>UI Component Pack</h3>
            <p>Kumpulan komponen UI reusable untuk dashboard, landing page, dan toko online.</p>
          </article>
        </div>

        <div className={homeStyles.ctaRow}>
          <a className={homeStyles.sellCta} href="mailto:hello@codefalah.com">
            Tanya harga & demo →
          </a>
          <a className={homeStyles.sellGhostCta} href="#promo">
            Cek promo bulan ini
          </a>
        </div>
      </section>

      <section id="promo" className={homeStyles.promoSection}>
        <span className={homeStyles.badge}>Promo & Value</span>
        <h2 className={homeStyles.promoTitle}>Alasan pengunjung tertarik membeli</h2>
        <div className={homeStyles.promoGrid}>
          <article className={homeStyles.promoCard}>
            <h3>Bonus setup awal</h3>
            <p>Dapatkan panduan implementasi agar produk langsung bisa digunakan.</p>
          </article>
          <article className={homeStyles.promoCard}>
            <h3>Desain responsif</h3>
            <p>Tampilan tetap optimal di mobile, tablet, maupun desktop.</p>
          </article>
          <article className={homeStyles.promoCard}>
            <h3>Support after-sales</h3>
            <p>Anda tetap mendapat bantuan setelah pembelian agar deploy lebih lancar.</p>
          </article>
        </div>
      </section>

      <section className={homeStyles.brandSection}>
        <h3 className={homeStyles.brandTitle}>Brand color palette</h3>
        <ul className={homeStyles.paletteList}>
          {brandPalette.map((color) => (
            <li key={color.hex} className={homeStyles.paletteItem}>
              <span
                className={homeStyles.paletteSwatch}
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <div>
                <strong>{color.name}</strong>
                <span className={homeStyles.paletteHex}>{color.hex}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={homeStyles.blogSection}>
        <div className={homeStyles.blogHeader}>
          <div>
            <h2 className={homeStyles.blogTitle}>Artikel Terbaru</h2>
            <p className={homeStyles.blogSubTitle}>
              Edukasi tambahan untuk pengunjung yang ingin belajar sebelum membeli.
            </p>
          </div>

          <div className={homeStyles.layoutSwitcher} role="group" aria-label="Pilih tampilan artikel">
            <button
              type="button"
              className={`${homeStyles.layoutButton} ${
                postLayout === 'list' ? homeStyles.layoutButtonActive : ''
              }`}
              onClick={() => setPostLayout('list')}
            >
              List
            </button>
            <button
              type="button"
              className={`${homeStyles.layoutButton} ${
                postLayout === 'grid' ? homeStyles.layoutButtonActive : ''
              }`}
              onClick={() => setPostLayout('grid')}
            >
              Grid
            </button>
          </div>
        </div>

        <ul
          className={`${homeStyles.postList} ${
            postLayout === 'grid' ? homeStyles.postListGrid : ''
          }`}
        >
          {paginatedPosts.map(({ id, date, title }) => (
            <li className={homeStyles.postCard} key={id}>
              <small className={homeStyles.postDate}>
                <Date dateString={date} />
              </small>
              <h3 className={homeStyles.postTitle}>
                <Link href={`/posts/${id}`}>{title}</Link>
              </h3>
              <Link className={homeStyles.readMore} href={`/posts/${id}`}>
                Baca artikel →
              </Link>
            </li>
          ))}
        </ul>

        <div className={homeStyles.pagination} role="navigation" aria-label="Article pagination">
          <button
            type="button"
            className={homeStyles.paginationButton}
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
          >
            ← Sebelumnya
          </button>

          <div className={homeStyles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  type="button"
                  key={page}
                  className={`${homeStyles.pageNumber} ${
                    currentPage === page ? homeStyles.pageNumberActive : ''
                  }`}
                  onClick={() => setCurrentPage(page)}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={homeStyles.paginationButton}
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={currentPage === totalPages}
          >
            Berikutnya →
          </button>
        </div>
      </section>
    </Layout>
  );
}
