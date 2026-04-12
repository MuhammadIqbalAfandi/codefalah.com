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
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={`${utilStyles.headingXl} ${utilStyles.darkText}`}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div className={utilStyles.postMetaRow}>
          <span className={utilStyles.postCategory}>{postData.category || 'Umum'}</span>
          {(postData.tags || []).length > 0 && (
            <ul className={utilStyles.tagList} aria-label="Tag artikel">
              {postData.tags.map((tag) => (
                <li key={tag} className={utilStyles.tagItem}>
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className={utilStyles.darkText}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}
