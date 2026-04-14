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
  const quickValueProps = [
    {
      icon: "⚡",
      title: "Go-live super cepat",
      description: "Template siap pakai agar bisnis Anda bisa jalan dalam hitungan jam.",
    },
    {
      icon: "🎯",
      title: "Fokus hasil bisnis",
      description: "Setiap produk dirancang untuk menaikkan konversi, bukan sekadar tampil keren.",
    },
    {
      icon: "🛠️",
      title: "Mudah dikustom",
      description: "Struktur rapi sehingga tim Anda gampang menyesuaikan sesuai kebutuhan brand.",
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
        <h2 className={homeStyles.heroTitle}>
          Solusi produk digital untuk bantu bisnis Anda tumbuh
        </h2>
        <p className={homeStyles.heroDescription}>
          Produk digital siap pakai untuk membantu bisnis Anda tumbuh lebih
          cepat dan bermakna. Wujudkan ide, bangun brand, dan capai dengan cara
          yang lebih sederhana.
        </p>
        <div className={homeStyles.quickValueGrid} aria-label="Keunggulan utama produk">
          {quickValueProps.map((item) => (
            <article className={homeStyles.quickValueCard} key={item.title}>
              <span className={homeStyles.quickValueIcon} aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <h3 className={homeStyles.quickValueTitle}>{item.title}</h3>
                <p className={homeStyles.quickValueDescription}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={homeStyles.heroActions}>
          <a className={homeStyles.heroPrimaryCta} href="#product">
            Lihat katalog produk
          </a>
          <a className={homeStyles.heroSecondaryCta} href="#saas">
            Lihat layanan SaaS
          </a>
        </div>

        <div
          className={homeStyles.businessModelGuide}
          aria-label="Panduan memilih produk atau layanan SaaS"
        >
          <article className={homeStyles.businessModelCard}>
            <h3 className={homeStyles.cardTitle}>Produk digital (Sekali Beli)</h3>
            <p className={homeStyles.cardDescription}>
              Cocok untuk Anda yang ingin memiliki aset digital siap pakai, bisa
              digunakan kapan saja dengan sekali pembayaran. Praktis, hemat, dan
              tetap powerful untuk mendukung kebutuhan bisnis Anda.
            </p>
          </article>
          <article className={homeStyles.businessModelCard}>
            <h3 className={homeStyles.cardTitle}>Layanan SaaS (Berlangganan)</h3>
            <p className={homeStyles.cardDescription}>
              Cocok untuk Anda yang membutuhkan platform yang selalu aktif,
              terus dikembangkan, dan siap membantu operasional bisnis secara
              berkelanjutan. Lebih fleksibel, minim teknis, dan fokus pada
              pertumbuhan.
            </p>
          </article>
        </div>
      </section>

      <section id="product" className={homeStyles.sellSection}>
        <span className={homeStyles.badge}>Katalog Utama</span>
        <h2 className={homeStyles.sellTitle}>
          Katalog produk digital siap jual & siap pakai
        </h2>
        <p className={homeStyles.sellDescription}>
          Katalog produk digital siap jual dan siap pakai. Pilih solusi yang
          paling sesuai dengan kebutuhan bisnis Anda — dirancang untuk
          implementasi cepat, tampilan modern, dan mudah dikembangkan.
        </p>

        <div className={homeStyles.offerGrid}>
          {featuredProducts.map((product) => (
            <article key={product.id} className={homeStyles.offerCard}>
              <h3 className={homeStyles.cardTitle}>{product.name}</h3>
              <p className={homeStyles.cardDescription}>{product.description}</p>
            </article>
          ))}
        </div>

        <div className={homeStyles.ctaRow}>
          <Link className={homeStyles.sellCta} href="/tanya-harga">
            Tanya harga →
          </Link>
          <Link className={homeStyles.sellGhostCta} href="/demo">
            Lihat demo
          </Link>
          <Link className={homeStyles.sellGhostCta} href="/promo">
            Cek promo bulan ini
          </Link>
        </div>
      </section>

      <section id="saas" className={homeStyles.saasSection}>
        <span className={homeStyles.badge}>Layanan SaaS</span>
        <h2 className={homeStyles.saasTitle}>
          Perkenalan produk SaaS untuk kebutuhan bisnis
        </h2>
        <p className={homeStyles.saasDescription}>
          Platform SaaS yang dirancang untuk tumbuh bersama bisnis Anda. Diawali
          dari layanan undangan online, dengan visi menghadirkan berbagai solusi
          digital yang relevan di masa depan.
        </p>

        <div className={homeStyles.offerGrid}>
          {featuredSaasServices.map((service) => (
            <Link
              key={service.id}
              href={`/products/${service.id}`}
              className={`${homeStyles.saasCard} ${homeStyles.saasCardFeatured} ${homeStyles.saasCardLink}`}
            >
              <span className={homeStyles.saasSpotlight}>SaaS Unggulan</span>
              <div className={homeStyles.saasBadgeRow}></div>
              <h3 className={homeStyles.cardTitle}>{service.name}</h3>
              <p className={homeStyles.cardDescription}>{service.description}</p>
              <small className={homeStyles.cardMeta}>{service.billing}</small>
            </Link>
          ))}

          <article className={homeStyles.saasRoadmapCard}>
            <span className={homeStyles.saasFutureFlag}>
              {saasFutureFlagLabel}
            </span>
            <p className={homeStyles.cardDescription}>
              Saat ini kami fokus menyempurnakan layanan undangan online.
              Layanan SaaS lainnya sedang disiapkan untuk mendukung kebutuhan
              bisnis yang lebih luas.
            </p>
          </article>
        </div>
      </section>

      <section id="promo" className={homeStyles.promoSection}>
        <span className={homeStyles.badge}>Promo & Nilai</span>
        <h2 className={homeStyles.promoTitle}>
          Alasan pengunjung tertarik membeli
        </h2>
        <div className={homeStyles.promoGrid}>
          <article className={homeStyles.promoCard}>
            <h3 className={homeStyles.cardTitle}>Bonus penyiapan awal</h3>
            <p className={homeStyles.cardDescription}>
              Dapatkan panduan implementasi agar produk langsung bisa digunakan.
            </p>
          </article>
          <article className={homeStyles.promoCard}>
            <h3 className={homeStyles.cardTitle}>Desain responsif</h3>
            <p className={homeStyles.cardDescription}>
              Tampilan tetap optimal di mobile, tablet, maupun desktop.
            </p>
          </article>
          <article className={homeStyles.promoCard}>
            <h3 className={homeStyles.cardTitle}>Dukungan purna jual</h3>
            <p className={homeStyles.cardDescription}>
              Anda tetap mendapat bantuan setelah pembelian agar deploy lebih
              lancar.
            </p>
          </article>
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
