import { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import homeStyles from "../styles/blog-home.module.css";
import { getSortedPostsData } from "../lib/posts";
import {
  featuredProducts,
  featuredSaasServices,
  saasFutureFlagLabel,
} from "../lib/products";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [postLayout, setPostLayout] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const reviewCarouselRef = useRef(null);
  const postsPerPage = 4;
  const visibleCategoryLimit = 4;
  const availableCategories = [
    "Semua",
    ...new Set(allPostsData.map((post) => post.category || "Umum")),
  ];
  const visibleCategories = showAllCategories
    ? availableCategories
    : availableCategories.slice(0, visibleCategoryLimit);
  const hasHiddenCategories = availableCategories.length > visibleCategoryLimit;
  const filteredPosts =
    activeCategory === "Semua"
      ? allPostsData
      : allPostsData.filter(
          (post) => (post.category || "Umum") === activeCategory,
        );
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const firstDate = Number.isNaN(globalThis.Date.parse(a.date))
      ? 0
      : globalThis.Date.parse(a.date);
    const secondDate = Number.isNaN(globalThis.Date.parse(b.date))
      ? 0
      : globalThis.Date.parse(b.date);
    return sortOrder === "newest"
      ? secondDate - firstDate
      : firstDate - secondDate;
  });
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / postsPerPage),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPosts = sortedPosts.slice(
    (safeCurrentPage - 1) * postsPerPage,
    safeCurrentPage * postsPerPage,
  );
  const reviews = [
    {
      quote:
        "“Template landing page-nya langsung bisa dipakai dan menaikkan konversi kampanye kami di minggu pertama.”",
      name: "Rina, Pemilik UMKM",
    },
    {
      quote:
        "“Boilerplate Next.js sangat rapi, tim jadi hemat waktu penyiapan dan fokus ke fitur inti.”",
      name: "Bagus, Engineer Produk",
    },
    {
      quote:
        "“UI component pack-nya konsisten, mudah dikustom, dan bikin proses desain-dev jauh lebih cepat.”",
      name: "Nadia, Desainer UI",
    },
    {
      quote:
        "“Fitur SaaS undangan online-nya bikin proses sebar undangan jadi praktis dan tamu jauh lebih mudah RSVP.”",
      name: "Fajar, Penyelenggara Pernikahan",
    },
    {
      quote:
        "“Customer support responsif, migrasi data ke layanan baru berjalan mulus tanpa ganggu operasional.”",
      name: "Lia, Pimpinan Pemasaran",
    },
    {
      quote:
        "“Pakai layanan ini menghemat waktu tim kami karena update fitur rutin sudah dikelola dari sisi platform.”",
      name: "Doni, Pemilik Bisnis",
    },
  ];

  const updateActiveReview = () => {
    const carousel = reviewCarouselRef.current;
    if (!carousel) return;
    const cards = Array.from(carousel.querySelectorAll("article"));
    if (cards.length === 0) return;
    const currentIndex = cards.reduce(
      (closestIndex, card, index) =>
        Math.abs(card.offsetLeft - carousel.scrollLeft) <
        Math.abs(cards[closestIndex].offsetLeft - carousel.scrollLeft)
          ? index
          : closestIndex,
      0,
    );
    setActiveReviewIndex(currentIndex);
  };

  const goToReview = (index) => {
    const carousel = reviewCarouselRef.current;
    if (!carousel) return;
    const cards = Array.from(carousel.querySelectorAll("article"));
    if (cards.length === 0) return;
    const safeIndex = Math.max(0, Math.min(index, cards.length - 1));
    const targetCard = cards[safeIndex];
    carousel.scrollTo({
      left: targetCard.offsetLeft,
      behavior: "smooth",
    });
    setActiveReviewIndex(safeIndex);
  };

  const showPreviousReview = () => {
    goToReview(activeReviewIndex - 1);
  };

  const showNextReview = () => {
    goToReview(activeReviewIndex + 1);
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={homeStyles.hero}>
        <span className={homeStyles.badge}>Selamat Datang</span>
        <h1 className={homeStyles.heroTitle}>
          Platform produk digital untuk tim yang ingin scale lebih cepat
        </h1>
        <p className={homeStyles.heroDescription}>
          Kami membantu bisnis meluncurkan website, aset UI, dan layanan SaaS
          dengan alur yang jelas: mulai dari setup cepat, aktivasi pengguna,
          hingga optimasi konversi berkelanjutan.
        </p>

        <div className={homeStyles.heroActions}>
          <a className={homeStyles.heroPrimaryCta} href="#product">
            Mulai dengan produk utama
          </a>
          <a className={homeStyles.heroSecondaryCta} href="#saas">
            Jadwalkan demo SaaS
          </a>
        </div>

        <div className={homeStyles.heroStats}>
          <div className={homeStyles.heroStat}>
            <strong>50+</strong>
            <span>Bisnis aktif</span>
          </div>
          <div className={homeStyles.heroStat}>
            <strong>3x</strong>
            <span>Peluncuran lebih cepat</span>
          </div>
          <div className={homeStyles.heroStat}>
            <strong>24/7</strong>
            <span>Dukungan platform</span>
          </div>
        </div>
      </section>

      <section id="product" className={homeStyles.sellSection}>
        <span className={homeStyles.badge}>Produk Utama</span>
        <h2 className={homeStyles.sellTitle}>
          Mulai dari satu produk flagship, lalu scale dengan aset pendukung
        </h2>
        <p className={homeStyles.sellDescription}>
          Alih-alih banyak kartu dengan bobot setara, kami susun alur pembelian
          yang fokus: pilih produk inti untuk go-live cepat, lalu tambahkan
          toolkit sesuai fase pertumbuhan tim Anda.
        </p>

        <div className={homeStyles.productShowcase}>
          <article className={homeStyles.primaryProduct}>
            <span className={homeStyles.productLabel}>Recommended Start</span>
            <h3 className={homeStyles.primaryProductTitle}>
              {featuredProducts[0].name}
            </h3>
            <p className={homeStyles.cardDescription}>
              {featuredProducts[0].description}
            </p>
            <ul className={homeStyles.featureList}>
              <li>Struktur halaman siap konversi</li>
              <li>Setup cepat untuk campaign baru</li>
              <li>Mudah diintegrasikan ke stack existing</li>
            </ul>
            <Link className={homeStyles.sellCta} href="/demo">
              Lihat live demo flagship →
            </Link>
          </article>

          <div className={homeStyles.secondaryProducts}>
            <h3 className={homeStyles.secondaryTitle}>Toolkit pelengkap</h3>
            <div className={homeStyles.productList}>
              {featuredProducts.slice(1).map((product) => (
                <article key={product.id} className={homeStyles.offerCard}>
                  <h4 className={homeStyles.cardTitle}>{product.name}</h4>
                  <p className={homeStyles.cardDescription}>
                    {product.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className={homeStyles.ctaRow}>
          <Link className={homeStyles.sellCta} href="/tanya-harga">
            Konsultasi paket →
          </Link>
          <Link className={homeStyles.sellGhostCta} href="/demo">
            Bandingkan use case
          </Link>
        </div>
      </section>

      <section id="saas" className={homeStyles.saasSection}>
        <span className={homeStyles.badge}>Layanan SaaS</span>
        <h2 className={homeStyles.saasTitle}>
          Satu platform untuk operasional harian dan pertumbuhan bisnis
        </h2>
        <p className={homeStyles.saasDescription}>
          SaaS kami bukan sekadar fitur, tetapi sistem kerja. Anda dapat
          mengelola aktivitas inti, memonitor hasil, dan mengembangkan produk
          digital tanpa membangun ulang dari nol.
        </p>

        <div className={homeStyles.saasLayout}>
          {featuredSaasServices.map((service) => (
            <Link
              key={service.id}
              href={`/products/${service.id}`}
              className={`${homeStyles.saasCard} ${homeStyles.saasCardFeatured} ${homeStyles.saasCardLink}`}
            >
              <span className={homeStyles.saasSpotlight}>Produk SaaS Utama</span>
              <h3 className={homeStyles.cardTitle}>{service.name}</h3>
              <p className={homeStyles.cardDescription}>{service.description}</p>
              <ul className={homeStyles.featureList}>
                <li>Alur onboarding cepat untuk tim non-teknis</li>
                <li>Dashboard performa dan aktivitas real-time</li>
                <li>Model langganan fleksibel untuk scale bertahap</li>
              </ul>
              <small className={homeStyles.cardMeta}>{service.billing}</small>
              <span className={homeStyles.inlineCta}>Lihat detail produk →</span>
            </Link>
          ))}

          <aside className={homeStyles.saasRoadmapCard}>
            <span className={homeStyles.saasFutureFlag}>{saasFutureFlagLabel}</span>
            <h3 className={homeStyles.cardTitle}>Roadmap ekspansi platform</h3>
            <p className={homeStyles.cardDescription}>
              Setelah fondasi undangan online stabil, kami meluncurkan modul
              baru untuk automasi marketing, CRM ringan, dan insight performa
              lintas kanal.
            </p>
            <Link className={homeStyles.sellGhostCta} href="/tanya-harga">
              Join early access
            </Link>
          </aside>
        </div>
      </section>

      <section
        className={homeStyles.reviewSection}
        aria-labelledby="review-heading"
      >
        <span className={homeStyles.badge}>Ulasan Pengguna</span>
        <h2 id="review-heading" className={homeStyles.reviewTitle}>
          Apa kata pengguna setelah membeli produk kami
        </h2>
        <div
          ref={reviewCarouselRef}
          className={homeStyles.reviewCarousel}
          onScroll={updateActiveReview}
        >
          {reviews.map((review) => (
            <article className={homeStyles.reviewCard} key={review.name}>
              <p className={homeStyles.cardDescription}>{review.quote}</p>
              <strong className={homeStyles.cardSubtitle}>{review.name}</strong>
            </article>
          ))}
        </div>
        <div
          className={homeStyles.reviewIndicators}
          aria-label="Indikator carousel ulasan"
        >
          {reviews.map((review, index) => (
            <button
              type="button"
              key={review.name}
              className={`${homeStyles.reviewIndicator} ${
                activeReviewIndex === index
                  ? homeStyles.reviewIndicatorActive
                  : ""
              }`}
              aria-label={`Lihat ulasan ${index + 1}`}
              onClick={() => goToReview(index)}
            />
          ))}
        </div>
        <div className={homeStyles.reviewNav}>
          <button
            type="button"
            className={homeStyles.reviewNavButton}
            onClick={showPreviousReview}
            disabled={activeReviewIndex === 0}
          >
            ← Sebelumnya
          </button>
          <button
            type="button"
            className={homeStyles.reviewNavButton}
            onClick={showNextReview}
            disabled={activeReviewIndex === reviews.length - 1}
          >
            Berikutnya →
          </button>
        </div>
      </section>

      <section id="article" className={homeStyles.blogSection}>
        <div className={homeStyles.blogHeader}>
          <div>
            <h2 className={homeStyles.blogTitle}>Artikel Terbaru</h2>
            <p className={homeStyles.blogSubTitle}>
              Edukasi tambahan untuk pengunjung yang ingin belajar sebelum
              membeli.
            </p>
          </div>

          <div
            className={homeStyles.layoutSwitcher}
            role="group"
            aria-label="Pilih tampilan artikel"
          >
            <label htmlFor="article-sort" className={homeStyles.sortLabel}>
              Urutkan
            </label>
            <select
              id="article-sort"
              className={homeStyles.sortSelect}
              value={sortOrder}
              onChange={(event) => {
                setSortOrder(event.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
            <button
              type="button"
              className={`${homeStyles.layoutButton} ${
                postLayout === "list" ? homeStyles.layoutButtonActive : ""
              }`}
              onClick={() => setPostLayout("list")}
            >
              List
            </button>
            <button
              type="button"
              className={`${homeStyles.layoutButton} ${
                postLayout === "grid" ? homeStyles.layoutButtonActive : ""
              }`}
              onClick={() => setPostLayout("grid")}
            >
              Grid
            </button>
          </div>
        </div>

        <nav
          className={homeStyles.categoryBreadcrumb}
          aria-label="Filter kategori artikel"
        >
          {visibleCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${homeStyles.categoryCrumb} ${
                activeCategory === category
                  ? homeStyles.categoryCrumbActive
                  : ""
              }`}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              aria-current={activeCategory === category ? "page" : undefined}
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
              aria-label={
                showAllCategories
                  ? "Sembunyikan kategori tambahan"
                  : "Tampilkan kategori tambahan"
              }
            >
              {showAllCategories ? "˅" : ">"}
            </button>
          )}
        </nav>

        <ul
          className={`${homeStyles.postList} ${
            postLayout === "grid" ? homeStyles.postListGrid : ""
          }`}
        >
          {paginatedPosts.map(({ id, date, title, tags = [], category }) => (
            <li className={homeStyles.postCard} key={id}>
              <small className={homeStyles.cardMeta}>
                <Date dateString={date} />
              </small>
              <span className={homeStyles.postCategory}>
                {category || "Umum"}
              </span>
              <h3 className={homeStyles.cardTitle}>
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

        <div
          className={homeStyles.pagination}
          role="navigation"
          aria-label="Paginasi artikel"
        >
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
                    safeCurrentPage === page ? homeStyles.pageNumberActive : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                  aria-current={safeCurrentPage === page ? "page" : undefined}
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
