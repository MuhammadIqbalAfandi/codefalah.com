import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/marketing-pages.module.css';

const demoBenefits = [
  {
    title: 'Tur langsung produk',
    description: 'Kami tampilkan alur produk dari penyiapan sampai siap terbit untuk bisnis Anda.',
  },
  {
    title: 'Skenario penggunaan bisnis',
    description: 'Demo menyesuaikan skenario nyata agar Anda langsung melihat potensi hasilnya.',
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
      </Head>

      <section className={styles.hero}>
        <span className={styles.badge}>Demo</span>
        <h1 className={styles.title}>Lihat demo produk sebelum memutuskan pembelian</h1>
        <p className={styles.description}>
          Jadwalkan sesi demo singkat agar tim Anda bisa mengevaluasi fitur, alur kerja, dan nilai
          produk secara langsung.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Yang Anda dapatkan saat demo</h2>
        <div className={styles.grid}>
          {demoBenefits.map((item) => (
            <article className={styles.card} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <Link className={styles.primaryCta} href="/tanya-harga">
            Jadwalkan demo
          </Link>
          <Link className={styles.secondaryCta} href="/promo">
            Cek promo aktif
          </Link>
        </div>
      </section>
    </Layout>
  );
}
