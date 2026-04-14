import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import homeStyles from "../styles/blog-home.module.css";
import { featuredProducts, featuredSaasServices } from "../lib/products";

const painPoints = [
  {
    icon: "⏱️",
    title: "Waktu habis untuk setup teknis",
    description:
      "Banyak bisnis kecil tertahan karena harus belajar coding dulu sebelum bisa mulai jualan.",
  },
  {
    icon: "📉",
    title: "Tampilan belum meyakinkan",
    description:
      "Desain yang kurang rapi membuat calon pelanggan ragu untuk klik, daftar, atau membeli.",
  },
  {
    icon: "🧩",
    title: "Tools terpisah dan membingungkan",
    description:
      "Proses promosi, operasional, dan branding jadi lambat karena platform tidak terintegrasi.",
  },
];

const valueProps = [
  {
    icon: "🚀",
    title: "Langsung jalan",
    description: "Gunakan produk digital siap pakai tanpa coding dan tanpa ribet setup.",
    bullets: ["Onboarding cepat", "Panduan implementasi jelas"],
  },
  {
    icon: "💎",
    title: "Desain premium modern",
    description:
      "Tampilan bersih dan profesional untuk meningkatkan kepercayaan sejak kunjungan pertama.",
    bullets: ["Mobile-first", "Fokus pada conversion flow"],
  },
  {
    icon: "🤝",
    title: "Bertumbuh bersama bisnis",
    description:
      "Dari produk sekali beli hingga SaaS berlangganan, semua dirancang agar mudah di-scale.",
    bullets: ["Model fleksibel", "Support berkelanjutan"],
  },
];

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={homeStyles.hero}>
        <div>
          <span className={homeStyles.badge}>CodeFalah</span>
          <h1 className={homeStyles.heroTitle}>
            Membuat brand digital yang langsung menghasilkan tanpa ribet teknis
          </h1>
          <p className={homeStyles.heroDescription}>
            Untuk UMKM, kreator, dan bisnis jasa yang ingin cepat launching
            produk digital atau SaaS dengan tampilan premium dan alur conversion
            yang jelas.
          </p>
          <p className={homeStyles.microCopy}>
            Teknologi sederhana yang membawa dampak nyata.
          </p>
          <div className={homeStyles.heroActions}>
            <Link className={homeStyles.heroPrimaryCta} href="/tanya-harga">
              Mulai Sekarang
            </Link>
            <Link className={homeStyles.heroSecondaryCta} href="/demo">
              Lihat Demo
            </Link>
          </div>
        </div>

        <aside className={homeStyles.mockupWrap} aria-label="Mockup produk undangan digital">
          <p className={homeStyles.mockupLabel}>Visual hint: Mockup Undangan Digital</p>
          <div className={homeStyles.phoneMockup}>
            <div className={homeStyles.phoneHeader}>Undangan Online</div>
            <img
              src="/images/profile.png"
              alt="Preview tampilan undangan digital CodeFalah"
              className={homeStyles.mockupImage}
            />
            <p className={homeStyles.mockupCaption}>
              RSVP lebih cepat, sebar undangan lebih praktis, tampilan tetap elegan.
            </p>
          </div>
        </aside>
      </section>

      <section className={homeStyles.section}>
        <span className={homeStyles.badge}>Problem</span>
        <h2 className={homeStyles.sectionTitle}>
          Kenapa banyak bisnis gagal convert walau sudah punya website?
        </h2>
        <div className={homeStyles.cardGrid}>
          {painPoints.map((item) => (
            <article key={item.title} className={homeStyles.infoCard}>
              <span className={homeStyles.cardIcon}>{item.icon}</span>
              <h3 className={homeStyles.cardTitle}>{item.title}</h3>
              <p className={homeStyles.cardDescription}>{item.description}</p>
              <Link href="/demo" className={homeStyles.inlineCta}>
                Coba alur demo
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={homeStyles.section}>
        <span className={homeStyles.badge}>Solution</span>
        <h2 className={homeStyles.sectionTitle}>
          CodeFalah hadir untuk mempermudah langkah dari ide ke penjualan
        </h2>
        <p className={homeStyles.sectionLead}>
          Kami tidak sekadar membuat tools. Kami membangun teknologi yang
          membantu bisnis Anda bergerak cepat, terlihat profesional, dan lebih
          mudah menghasilkan.
        </p>
        <div className={homeStyles.cardGrid}>
          {valueProps.map((item) => (
            <article key={item.title} className={homeStyles.infoCard}>
              <span className={homeStyles.cardIcon}>{item.icon}</span>
              <h3 className={homeStyles.cardTitle}>{item.title}</h3>
              <p className={homeStyles.cardDescription}>{item.description}</p>
              <ul className={homeStyles.bulletList}>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className={homeStyles.sectionActions}>
          <Link className={homeStyles.heroPrimaryCta} href="/tanya-harga">
            Gunakan Sekarang
          </Link>
          <Link className={homeStyles.heroSecondaryCta} href="/promo">
            Lihat Promo
          </Link>
        </div>
      </section>

      <section id="product" className={homeStyles.section}>
        <span className={homeStyles.badge}>Produk</span>
        <h2 className={homeStyles.sectionTitle}>Pilih model yang paling sesuai dengan target Anda</h2>

        <div className={homeStyles.productColumns}>
          <div>
            <h3 className={homeStyles.columnTitle}>Produk Digital (Sekali Beli)</h3>
            <p className={homeStyles.columnLead}>
              Ideal untuk Anda yang ingin langsung pakai aset digital siap jalan
              dan fokus ke hasil marketing.
            </p>
            <div className={homeStyles.cardGrid}>
              {featuredProducts.map((product) => (
                <article key={product.id} className={homeStyles.infoCard}>
                  <span className={homeStyles.cardIcon}>🛍️</span>
                  <h4 className={homeStyles.cardTitle}>{product.name}</h4>
                  <p className={homeStyles.cardDescription}>
                    {product.description} Cocok untuk launching cepat tanpa build dari nol.
                  </p>
                  <Link href="/tanya-harga" className={homeStyles.inlineCta}>
                    Mulai pakai
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div id="saas">
            <h3 className={homeStyles.columnTitle}>SaaS (Berlangganan)</h3>
            <p className={homeStyles.columnLead}>
              Cocok untuk operasional berkelanjutan dengan fitur yang terus
              dikembangkan.
            </p>
            <div className={homeStyles.cardGrid}>
              {featuredSaasServices.map((service) => (
                <article key={service.id} className={homeStyles.infoCard}>
                  <span className={homeStyles.cardIcon}>📨</span>
                  <h4 className={homeStyles.cardTitle}>{service.name}</h4>
                  <p className={homeStyles.cardDescription}>
                    Buat dan kirim undangan digital profesional dalam hitungan
                    menit, tanpa repot urus teknis hosting.
                  </p>
                  <ul className={homeStyles.bulletList}>
                    <li>{service.billing}</li>
                    <li>Siap dipakai untuk event personal & bisnis</li>
                  </ul>
                  <Link href="/demo" className={homeStyles.inlineCta}>
                    Coba sekarang
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={homeStyles.section}>
        <span className={homeStyles.badge}>Kenapa Pilih Kami</span>
        <h2 className={homeStyles.sectionTitle}>
          Dirancang untuk conversion, clarity, dan positioning brand yang kuat
        </h2>
        <div className={homeStyles.cardGrid}>
          <article className={homeStyles.infoCard}>
            <span className={homeStyles.cardIcon}>🎯</span>
            <h3 className={homeStyles.cardTitle}>Copy berbasis hasil</h3>
            <p className={homeStyles.cardDescription}>
              Pesan utama dibuat agar pengunjung paham nilai produk dalam 3 detik.
            </p>
          </article>
          <article className={homeStyles.infoCard}>
            <span className={homeStyles.cardIcon}>🧠</span>
            <h3 className={homeStyles.cardTitle}>Flow sederhana</h3>
            <p className={homeStyles.cardDescription}>
              Struktur halaman diarahkan dari problem ke solution lalu langsung ke CTA.
            </p>
          </article>
          <article className={homeStyles.infoCard}>
            <span className={homeStyles.cardIcon}>🌿</span>
            <h3 className={homeStyles.cardTitle}>Nilai Falah</h3>
            <p className={homeStyles.cardDescription}>
              Teknologi kami dibangun untuk membawa manfaat nyata, bukan sekadar fitur.
            </p>
          </article>
        </div>
        <div className={homeStyles.sectionActions}>
          <Link className={homeStyles.heroPrimaryCta} href="/tanya-harga">
            Mulai Hari Ini
          </Link>
          <Link className={homeStyles.heroSecondaryCta} href="/demo">
            Lihat Demo
          </Link>
        </div>
      </section>

      <section className={homeStyles.finalCta}>
        <h2 className={homeStyles.sectionTitle}>
          Siap ubah website Anda jadi mesin conversion yang lebih jelas dan premium?
        </h2>
        <p className={homeStyles.sectionLead}>
          Mulai dari produk digital sekali beli atau SaaS undangan digital. Pilih
          jalur yang paling pas, lalu percepat pertumbuhan brand Anda bersama
          CodeFalah.
        </p>
        <div className={homeStyles.heroActions}>
          <Link className={homeStyles.heroPrimaryCta} href="/tanya-harga">
            Mulai Sekarang
          </Link>
          <Link className={homeStyles.heroSecondaryCta} href="/demo">
            Lihat Demo
          </Link>
        </div>
      </section>

      <section id="article" className={homeStyles.articleAnchor} aria-label="Anchor artikel" />
    </Layout>
  );
}
