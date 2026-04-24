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
        <h1 className={styles.title}>Jadwalkan demo strategis untuk validasi use case tim Anda</h1>
        <p className={styles.description}>
          Bukan sekadar tur fitur. Sesi demo difokuskan pada alur bisnis Anda agar keputusan implementasi
          lebih cepat dan tepat.
        </p>
        <div className={styles.heroKpis}>
          <div>
            <strong>45 menit</strong>
            <span>Demo terstruktur</span>
          </div>
          <div>
            <strong>1:1</strong>
            <span>Dengan product specialist</span>
          </div>
          <div>
            <strong>Action plan</strong>
            <span>Pasca sesi demo</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.splitSection}>
          <div className={styles.demoFormCard}>
            <h2 className={styles.sectionTitle}>Ceritakan kebutuhan demo Anda</h2>
            <p className={styles.sectionDescription}>
              Isi form berikut agar sesi demo disesuaikan dengan konteks tim, target, dan proses bisnis Anda.
            </p>
            <form className={styles.form}>
              <div className={styles.formFields}>
                <div className={styles.field}>
                  <label htmlFor="picName">Nama PIC</label>
                  <input id="picName" name="picName" type="text" placeholder="Contoh: Andi Pratama" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="workEmail">Email kerja</label>
                  <input id="workEmail" name="workEmail" type="email" placeholder="nama@perusahaan.com" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="whatsapp">WhatsApp (opsional)</label>
                  <input id="whatsapp" name="whatsapp" type="tel" placeholder="Contoh: +62 812 3456 7890" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="company">Nama perusahaan (opsional)</label>
                  <input id="company" name="company" type="text" placeholder="Nama perusahaan Anda" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="role">Role/Jabatan (opsional)</label>
                  <input id="role" name="role" type="text" placeholder="Contoh: Product Manager" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="teamSize">Ukuran tim/jumlah user estimasi (opsional)</label>
                  <input id="teamSize" name="teamSize" type="text" placeholder="Contoh: 25 user aktif" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="demoProduct">Aplikasi yang akan didemo</label>
                  <select id="demoProduct" name="demoProduct" defaultValue="">
                    <option value="" disabled>
                      Pilih aplikasi
                    </option>
                    <option value="landing-page">Landing page kampanye</option>
                    <option value="boilerplate">Boilerplate situs web</option>
                    <option value="ui-kit">Paket komponen UI</option>
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

          <aside className={styles.infoPanel}>
            <h2 className={styles.sectionTitle}>Apa yang Anda dapatkan</h2>
            <ul className={styles.bulletList}>
              <li>Simulasi alur end-to-end sesuai kebutuhan bisnis.</li>
              <li>Pemetaan risiko implementasi dan kebutuhan integrasi.</li>
              <li>Rekomendasi paket fitur berdasarkan prioritas tim.</li>
            </ul>

            <h3 className={styles.infoSubTitle}>Alur sesi</h3>
            <ol className={styles.stepList}>
              <li>Discovery singkat kebutuhan tim Anda.</li>
              <li>Walkthrough produk dengan skenario nyata.</li>
              <li>Q&amp;A teknis dan non-teknis.</li>
              <li>Rangkuman langkah implementasi berikutnya.</li>
            </ol>
            <Link className={styles.secondaryCta} href="/#product">
              Lihat produk yang tersedia
            </Link>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.bannerSection}>
          <h2 className={styles.sectionTitle}>Perlu proses pengadaan lebih dulu?</h2>
          <p className={styles.sectionDescription}>
            Tim kami dapat menyiapkan dokumen kebutuhan, estimasi biaya, dan timeline agar proses internal Anda lebih
            cepat.
          </p>
          <Link className={styles.primaryCta} href="/tanya-harga">
            Minta proposal harga
          </Link>
        </div>
      </section>
    </Layout>
  );
}
