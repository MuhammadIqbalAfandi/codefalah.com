import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import homeStyles from '../styles/blog-home.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={homeStyles.hero}>
        <span className={homeStyles.badge}>Welcome to CodeFalah Blog</span>
        <h2 className={homeStyles.heroTitle}>Insights seputar web development modern</h2>
        <p className={homeStyles.heroDescription}>
          Saya membagikan catatan singkat, pengalaman implementasi, dan best
          practice seputar JavaScript/TypeScript, Next.js, dan pengembangan
          aplikasi web end-to-end.
        </p>
      </section>

      <section className={homeStyles.blogSection}>
        <div className={homeStyles.blogHeader}>
          <h2 className={homeStyles.blogTitle}>Artikel Terbaru</h2>
          <p className={homeStyles.blogSubTitle}>
            Tampilan lebih clean agar konten lebih mudah dibaca dan dinavigasi.
          </p>
        </div>

        <ul className={homeStyles.postList}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={homeStyles.postCard} key={id}>
              <small className={homeStyles.postDate}>
                <Date dateString={date} />
              </small>
              <h3 className={homeStyles.postTitle}>
                <Link href={`/posts/${id}`}>{title}</Link>
              </h3>
              <Link className={homeStyles.readMore} href={`/posts/${id}`}>
                Baca artikel →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
