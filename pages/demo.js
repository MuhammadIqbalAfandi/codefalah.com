import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/marketing-pages.module.css';

export default function DemoPage() {
  return (
    <Layout>
      <Head>
        <title>Demo Produk | {siteTitle}</title>
      </Head>

      <section className={styles.hero}>
        <span className={styles.badge}>Demo</span>
        <h1 className={styles.title}>Jadwalkan sesi demo untuk evaluasi produk bersama tim Anda</h1>
        <p className={styles.description}>
          Isi form berikut agar kami bisa menyiapkan walkthrough yang relevan dengan proses bisnis,
          peran user, dan target implementasi Anda.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.demoInfoCard}>
          <h2 className={styles.sectionTitle}>Form permintaan demo</h2>
          <p className={styles.demoHint}>
            Tim kami akan menghubungi Anda untuk mengatur sesi evaluasi produk, termasuk skenario
            use case dan alur operasional yang ingin diuji.
          </p>
        </div>

        <div className={styles.demoFormCard}>
          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="picName">Nama PIC</label>
              <input id="picName" name="picName" type="text" placeholder="Contoh: Andi Pratama" />
            </div>
            <div className={styles.field}>
              <label htmlFor="workEmail">Email kerja</label>
              <input id="workEmail" name="workEmail" type="email" placeholder="nama@perusahaan.com" />
            </div>
            <div className={styles.field}>
              <label htmlFor="whatsapp">WhatsApp</label>
              <input id="whatsapp" name="whatsapp" type="tel" placeholder="Contoh: +62 812 3456 7890" />
            </div>
            <div className={styles.field}>
              <label htmlFor="company">Nama perusahaan</label>
              <input id="company" name="company" type="text" placeholder="Nama perusahaan Anda" />
            </div>
            <div className={styles.field}>
              <label htmlFor="role">Role/Jabatan</label>
              <input id="role" name="role" type="text" placeholder="Contoh: Product Manager" />
            </div>
            <div className={styles.field}>
              <label htmlFor="teamSize">Ukuran tim/jumlah user estimasi</label>
              <input id="teamSize" name="teamSize" type="text" placeholder="Contoh: 25 user aktif" />
            </div>
            <div className={styles.field}>
              <label htmlFor="demoProduct">Aplikasi yang akan didemo</label>
              <select id="demoProduct" name="demoProduct" defaultValue="">
                <option value="" disabled>
                  Pilih aplikasi
                </option>
                <option value="crm">CRM & Sales Tracking</option>
                <option value="project-management">Project Management</option>
                <option value="hris">HRIS & Employee Management</option>
                <option value="service-desk">Service Desk / Ticketing</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="timeline">Target waktu implementasi</label>
              <select id="timeline" name="timeline" defaultValue="">
                <option value="" disabled>
                  Pilih target waktu
                </option>
                <option value="asap">Secepatnya (0-1 bulan)</option>
                <option value="short-term">Jangka pendek (1-3 bulan)</option>
                <option value="mid-term">Jangka menengah (3-6 bulan)</option>
                <option value="exploring">Masih tahap eksplorasi</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="demoNotes">Catatan kebutuhan demo</label>
              <textarea
                id="demoNotes"
                name="demoNotes"
                placeholder="Jelaskan alur yang ingin dilihat saat walkthrough, tantangan tim saat ini, atau integrasi yang ingin didiskusikan."
              />
            </div>

            <div className={styles.ctaRow}>
              <button type="submit" className={`${styles.primaryCta} ${styles.submitButton}`}>
                Jadwalkan Demo
              </button>
              <Link className={styles.secondaryCta} href="/tanya-harga">
                Butuh estimasi harga dulu?
              </Link>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
