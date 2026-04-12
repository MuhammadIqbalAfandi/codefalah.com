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
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const postsPerPage = 4;
  const visibleCategoryLimit = 4;
  const availableCategories = ['Semua', ...new Set(allPostsData.map((post) => post.category || 'Umum'))];
  const visibleCategories = showAllCategories
    ? availableCategories
    : availableCategories.slice(0, visibleCategoryLimit);
  const hasHiddenCategories = availableCategories.length > visibleCategoryLimit;
  const filteredPosts =
    activeCategory === 'Semua'
      ? allPostsData
      : allPostsData.filter((post) => (post.category || 'Umum') === activeCategory);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safeCurrentPage - 1) * postsPerPage,
    safeCurrentPage * postsPerPage,
  );

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

      <section className={homeStyles.reviewSection} aria-labelledby="review-heading">
        <span className={homeStyles.badge}>Review Pengguna</span>
        <h2 id="review-heading" className={homeStyles.reviewTitle}>
          Apa kata pengguna setelah membeli produk kami
        </h2>
        <div className={homeStyles.reviewGrid}>
          <article className={homeStyles.reviewCard}>
            <p>
              “Template landing page-nya langsung bisa dipakai dan menaikkan conversion campaign
              kami minggu pertama.”
            </p>
            <strong>Rina, Owner UMKM</strong>
          </article>
          <article className={homeStyles.reviewCard}>
            <p>
              “Boilerplate Next.js sangat rapi, tim jadi hemat waktu setup dan fokus ke fitur
              inti.”
            </p>
            <strong>Bagus, Product Engineer</strong>
          </article>
          <article className={homeStyles.reviewCard}>
            <p>
              “UI component pack-nya konsisten, mudah dikustom, dan bikin proses desain-dev jauh
              lebih cepat.”
            </p>
            <strong>Nadia, UI Designer</strong>
          </article>
        </div>
      </section>

      <section id="article" className={homeStyles.blogSection}>
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

        <nav className={homeStyles.categoryBreadcrumb} aria-label="Filter kategori artikel">
          {visibleCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${homeStyles.categoryCrumb} ${
                activeCategory === category ? homeStyles.categoryCrumbActive : ''
              }`}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              aria-current={activeCategory === category ? 'page' : undefined}
            >
              {category}
            </button>
          ))}
          {hasHiddenCategories && (
            <button
              type="button"
              className={homeStyles.categoryExpand}
              onClick={() => setShowAllCategories((prev) => !prev)}
              aria-expanded={showAllCategories}
              aria-label={showAllCategories ? 'Sembunyikan kategori tambahan' : 'Tampilkan kategori tambahan'}
            >
              {showAllCategories ? '˅' : '>'}
            </button>
          )}
        </nav>

        <ul
          className={`${homeStyles.postList} ${
            postLayout === 'grid' ? homeStyles.postListGrid : ''
          }`}
        >
          {paginatedPosts.map(({ id, date, title, tags = [], category }) => (
            <li className={homeStyles.postCard} key={id}>
              <small className={homeStyles.postDate}>
                <Date dateString={date} />
              </small>
              <span className={homeStyles.postCategory}>{category || 'Umum'}</span>
              <h3 className={homeStyles.postTitle}>
                <Link href={`/posts/${id}`}>{title}</Link>
              </h3>
              {tags.length > 0 && (
                <ul className={homeStyles.tagList} aria-label="Tag artikel">
                  {tags.map((tag) => (
                    <li key={tag} className={homeStyles.tagItem}>
                      #{tag}
                    </li>
                  ))}
                </ul>
              )}
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
            disabled={safeCurrentPage === 1}
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
                    safeCurrentPage === page ? homeStyles.pageNumberActive : ''
                  }`}
                  onClick={() => setCurrentPage(page)}
                  aria-current={safeCurrentPage === page ? 'page' : undefined}
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
            disabled={safeCurrentPage === totalPages}
          >
            Berikutnya →
          </button>
        </div>
      </section>
    </Layout>
  );
}
