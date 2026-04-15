import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/marketing-pages.module.css';

export default function TanyaHargaPage() {
  return (
    <Layout>
      <Head>
        <title>Tanya Harga | {siteTitle}</title>
      </Head>

      <section className={styles.hero}>
        <span className={styles.badge}>Tanya Harga</span>
        <h1 className={styles.title}>Dapatkan proposal harga yang relevan dengan fase bisnis Anda</h1>
        <p className={styles.description}>
          Kami bantu menyusun ruang lingkup, estimasi biaya, dan roadmap implementasi supaya pengambilan keputusan
          lebih cepat.
        </p>
        <div className={styles.heroKpis}>
          <div>
            <strong>24 jam</strong>
            <span>Respons awal</span>
          </div>
          <div>
            <strong>Custom</strong>
            <span>Skema paket sesuai use case</span>
          </div>
          <div>
            <strong>Jelas</strong>
            <span>Scope, timeline, dan deliverable</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.splitSection}>
          <div>
            <h2 className={styles.sectionTitle}>Isi brief kebutuhan Anda</h2>
            <p className={styles.sectionDescription}>
              Semakin jelas konteks bisnis Anda, semakin presisi estimasi dan rekomendasi paket yang kami berikan.
            </p>
            <form className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="name">Nama</label>
                <input id="name" name="name" type="text" placeholder="Nama Anda" />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="email@domain.com" />
              </div>
              <div className={styles.field}>
                <label htmlFor="whatsapp">WhatsApp (opsional)</label>
                <input id="whatsapp" name="whatsapp" type="tel" placeholder="08xxxxxxxxxx atau +62xxxxxxxxxx" />
              </div>
              <div className={styles.field}>
                <label htmlFor="service">Kebutuhan utama</label>
                <select id="service" name="service" defaultValue="">
                  <option value="" disabled>
                    Pilih kebutuhan
                  </option>
                  <option value="landing-page">Landing page kampanye</option>
                  <option value="boilerplate">Boilerplate situs web</option>
                  <option value="ui-kit">Paket komponen UI</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="brief">Brief singkat</label>
                <textarea id="brief" name="brief" placeholder="Ceritakan target, deadline, dan kebutuhan Anda" />
              </div>
              <button type="submit" className={`${styles.primaryCta} ${styles.submitButton}`}>
                Kirim permintaan
              </button>
            </form>
          </div>

          <aside className={styles.infoPanel}>
            <h2 className={styles.sectionTitle}>Yang kami kirimkan</h2>
            <ul className={styles.bulletList}>
              <li>Rekomendasi paket prioritas berdasarkan target bisnis.</li>
              <li>Estimasi biaya implementasi dan biaya berkelanjutan.</li>
              <li>Timeline delivery dan milestone utama.</li>
            </ul>
            <h3 className={styles.infoSubTitle}>Butuh validasi produk dulu?</h3>
            <p className={styles.sectionDescription}>
              Jika Anda masih membandingkan solusi, mulai dari sesi demo agar tim internal lebih yakin sebelum final
              approval.
            </p>
            <Link className={styles.secondaryCta} href="/demo">
              Jadwalkan demo terlebih dahulu
            </Link>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.bannerSection}>
          <h2 className={styles.sectionTitle}>Prioritaskan use case paling berdampak</h2>
          <p className={styles.sectionDescription}>
            Kami sarankan mulai dari implementasi inti untuk mempercepat ROI, lalu scale modul tambahan secara
            bertahap.
          </p>
          <Link className={styles.primaryCta} href="/#saas">
            Lihat roadmap layanan SaaS
          </Link>
        </div>
      </section>
    </Layout>
  );
}
