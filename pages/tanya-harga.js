import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/marketing-pages.module.css';

export default function TanyaHargaPage() {
  return (
    <Layout>
      <Head>
        <title>Tanya Harga | {siteTitle}</title>
      </Head>

      <section className={styles.priceInquiryLayout}>
        <div className={styles.heroPanel}>
          <span className={styles.badge}>Tanya Harga</span>
          <h1 className={styles.title}>Diskusikan kebutuhan dan dapatkan estimasi harga terbaik</h1>
          <p className={styles.description}>
            Isi form singkat berikut untuk membantu kami memahami kebutuhan bisnis Anda. Tim kami bisa
            menghubungi melalui email atau WhatsApp sesuai preferensi Anda.
          </p>
          <ul className={styles.benefitList}>
            <li>Estimasi biaya awal dalam 1&ndash;2 hari kerja</li>
            <li>Rekomendasi paket sesuai target bisnis</li>
            <li>Opsi timeline pengerjaan yang realistis</li>
          </ul>
        </div>

        <section className={`${styles.section} ${styles.formPanel}`}>
          <h2 className={styles.sectionTitle}>Form konsultasi singkat</h2>
          <p className={styles.formHint}>Kolom WhatsApp bersifat opsional.</p>
          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name">Nama</label>
              <input id="name" name="name" type="text" placeholder="Nama Anda" />
            </div>
            <div className={styles.twoColumnFields}>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="email@domain.com" />
              </div>
              <div className={styles.field}>
                <label htmlFor="whatsapp">Nomor WhatsApp (Opsional)</label>
                <input id="whatsapp" name="whatsapp" type="tel" placeholder="08xxxxxxxxxx" />
              </div>
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
        </section>
      </section>
    </Layout>
  );
}
