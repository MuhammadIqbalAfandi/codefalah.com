import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/marketing-pages.module.css';

const demoBenefits = [
  {
    title: 'Live walkthrough',
    description: 'Kami tampilkan alur produk dari setup sampai siap publish untuk bisnis Anda.',
  },
  {
    title: 'Use case bisnis',
    description: 'Demo menyesuaikan skenario real agar Anda langsung melihat potensi hasilnya.',
  },
  {
    title: 'Roadmap implementasi',
    description: 'Setelah demo, Anda mendapat gambaran langkah implementasi yang terstruktur.',
  },
];

export default function DemoPage() {
  return (
    <Layout>
      <Head>
        <title>Demo Produk | {siteTitle}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>

      <section className={styles.hero}>
        <span className={styles.badge}>Demo</span>
        <h1 className={styles.title}>Lihat demo produk sebelum memutuskan pembelian</h1>
        <p className={styles.description}>
          Jadwalkan sesi demo singkat agar tim Anda bisa mengevaluasi fitur, alur kerja, dan value
          produk secara langsung.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Yang Anda dapatkan saat demo</h2>
        <div className={styles.grid}>
          {demoBenefits.map((item, index) => (
            <article
              className={`${styles.card} animate__animated animate__fadeInUp`}
              style={{ animationDelay: `${index * 120}ms`, animationFillMode: 'both' }}
              key={item.title}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <Link className={styles.primaryCta} href="/tanya-harga">
            Booking demo
          </Link>
          <Link className={styles.secondaryCta} href="/promo">
            Cek promo aktif
          </Link>
        </div>
      </section>
    </Layout>
  );
}
