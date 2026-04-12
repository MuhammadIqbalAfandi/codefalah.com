import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/marketing-pages.module.css';

const promoItems = [
  {
    title: 'Diskon Launching 20%',
    description: 'Promo terbatas untuk pembelian landing page template dan setup awal campaign.',
  },
  {
    title: 'Bundling Produk',
    description: 'Ambil 2 produk sekaligus untuk mendapatkan bonus audit performa website.',
  },
  {
    title: 'Konsultasi Gratis',
    description: 'Free sesi konsultasi 30 menit untuk bahas kebutuhan growth bisnis Anda.',
  },
];

export default function PromoPage() {
  return (
    <Layout>
      <Head>
        <title>Promo | {siteTitle}</title>
      </Head>

      <section className={styles.hero}>
        <span className={styles.badge}>Promo</span>
        <h1 className={styles.title}>Promo terbaik untuk mulai percepat pertumbuhan bisnis</h1>
        <p className={styles.description}>
          Pilih penawaran yang paling sesuai dengan kebutuhan Anda. Semua promo dirancang agar
          implementasi cepat dan hasilnya bisa langsung terasa.
        </p>
        <div className={styles.ctaRow}>
          <Link className={styles.primaryCta} href="/tanya-harga">
            Tanya harga sekarang
          </Link>
          <Link className={styles.secondaryCta} href="/demo">
            Lihat demo produk
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Promo aktif bulan ini</h2>
        <div className={styles.grid}>
          {promoItems.map((item) => (
            <article className={styles.card} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
