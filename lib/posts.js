import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')
const postMetaMap = {
  'frontend-performance-budget': {
    category: 'Performance',
    tags: ['frontend', 'performance', 'budget'],
  },
  'nextjs-seo-checklist': {
    category: 'Marketing',
    tags: ['nextjs', 'seo', 'teknis'],
  },
  'ui-design-system-primer': {
    category: 'UI/UX',
    tags: ['design-system', 'komponen', 'konsistensi'],
  },
  'auth-session-patterns': {
    category: 'Security',
    tags: ['auth', 'session', 'keamanan'],
  },
  'api-versioning-strategy': {
    category: 'Backend',
    tags: ['api', 'versioning', 'arsitektur'],
  },
  'web-accessibility-audit': {
    category: 'UI/UX',
    tags: ['accessibility', 'audit', 'landing-page'],
  },
  'deploy-pipeline-basics': {
    category: 'DevOps',
    tags: ['ci-cd', 'deployment', 'workflow'],
  },
  'state-management-simple': {
    category: 'Frontend',
    tags: ['state', 'react', 'arsitektur'],
  },
  'form-validation-guide': {
    category: 'Frontend',
    tags: ['form', 'validasi', 'ux'],
  },
  'monitoring-web-vitals': {
    category: 'Performance',
    tags: ['web-vitals', 'monitoring', 'analytics'],
  },
  'pre-rendering': {
    category: 'Next.js',
    tags: ['ssg', 'ssr', 'rendering'],
  },
  'ssg-ssr': {
    category: 'Next.js',
    tags: ['ssg', 'ssr', 'rendering'],
  },
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    const fallbackMeta = postMetaMap[id] ?? {
      category: 'Umum',
      tags: ['artikel'],
    }

    return {
      id,
      category: matterResult.data.category ?? fallbackMeta.category,
      tags: matterResult.data.tags ?? fallbackMeta.tags,
      ...matterResult.data,
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  const fallbackMeta = postMetaMap[id] ?? {
    category: 'Umum',
    tags: ['artikel'],
  }

  // Combine the data with the id
  // Combine the data with the id and contentHtml
  return {
    id,
    category: matterResult.data.category ?? fallbackMeta.category,
    tags: matterResult.data.tags ?? fallbackMeta.tags,
    contentHtml,
    ...matterResult.data,
  }
}
