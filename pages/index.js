import { useState } from 'react';
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
  const [postLayout, setPostLayout] = useState('list');

  const brandPalette = [
    { name: 'Navy Core', hex: '#102840' },
    { name: 'Royal Blue', hex: '#0A67C7' },
    { name: 'Sky Accent', hex: '#6EB4FF' },
    { name: 'Soft Surface', hex: '#E9F3FF' },
    { name: 'Background Tint', hex: '#F4F9FF' },
  ];

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

        <div className={homeStyles.paletteSection}>
          <h3 className={homeStyles.paletteTitle}>Brand color palette</h3>
          <ul className={homeStyles.paletteList}>
            {brandPalette.map((color) => (
              <li key={color.hex} className={homeStyles.paletteItem}>
                <span
                  className={homeStyles.paletteSwatch}
                  style={{ backgroundColor: color.hex }}
                  aria-hidden="true"
                />
                <div>
                  <strong>{color.name}</strong>
                  <span className={homeStyles.paletteHex}>{color.hex}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={homeStyles.blogSection}>
        <div className={homeStyles.blogHeader}>
          <div>
            <h2 className={homeStyles.blogTitle}>Artikel Terbaru</h2>
            <p className={homeStyles.blogSubTitle}>
              Tampilan lebih clean agar konten lebih mudah dibaca dan dinavigasi.
            </p>
          </div>

          <div className={homeStyles.layoutSwitcher} role="group" aria-label="Pilih tampilan artikel">
            <button
              type="button"
              className={`${homeStyles.layoutButton} ${
                postLayout === 'list' ? homeStyles.layoutButtonActive : ''
              }`}
              onClick={() => setPostLayout('list')}
            >
              List
            </button>
            <button
              type="button"
              className={`${homeStyles.layoutButton} ${
                postLayout === 'grid' ? homeStyles.layoutButtonActive : ''
              }`}
              onClick={() => setPostLayout('grid')}
            >
              Grid
            </button>
          </div>
        </div>

        <ul
          className={`${homeStyles.postList} ${
            postLayout === 'grid' ? homeStyles.postListGrid : ''
          }`}
        >
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
