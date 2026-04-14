import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  const tableOfContents = postData.tableOfContents || [];

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article className={utilStyles.postArticleShell}>
        <header className={utilStyles.postJumbotron}>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <h1 className={`${utilStyles.headingXl} ${utilStyles.darkText} ${utilStyles.postTitleCenter}`}>
            {postData.title}
          </h1>
          <div className={utilStyles.postCategoryRow}>
            <span className={utilStyles.postCategory}>{postData.category || 'Umum'}</span>
          </div>
          {(postData.tags || []).length > 0 && (
            <ul className={utilStyles.tagList} aria-label="Tag artikel">
              {postData.tags.map((tag) => (
                <li key={tag} className={utilStyles.tagItem}>
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className={utilStyles.postContentGrid}>
          <div className={utilStyles.postContentCenter}>
            <div
              className={utilStyles.darkText}
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
          </div>

          <aside className={utilStyles.postSidebar}>
            <section className={utilStyles.authorCard} aria-label="Profil penulis">
              <p className={utilStyles.sidebarEyebrow}>Penulis</p>
              <h2 className={utilStyles.sidebarTitle}>Ditulis oleh</h2>
              <div className={utilStyles.authorIdentity}>
                <img src="/images/profile.png" alt="" aria-hidden="true" className={utilStyles.authorAvatar} />
                <p className={utilStyles.authorName}>{postData.author?.name || 'CodeFalah Team'}</p>
              </div>
              <p className={utilStyles.sidebarBody}>{postData.author?.bio}</p>
            </section>

            <section className={utilStyles.tocCard} aria-label="Table of content">
              <p className={utilStyles.sidebarEyebrow}>Navigasi</p>
              <h2 className={utilStyles.sidebarTitle}>Daftar isi</h2>
              {tableOfContents.length > 0 ? (
                <ul className={utilStyles.tocList}>
                  {tableOfContents.map((item) => (
                    <li key={item.id} className={utilStyles[`tocItemLevel${item.level}`]}>
                      <a href={`#${item.id}`} className={utilStyles.tocLink}>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={utilStyles.sidebarBody}>Belum ada subjudul untuk ditampilkan.</p>
              )}
            </section>
          </aside>
        </div>
      </article>
    </Layout>
  );
}
