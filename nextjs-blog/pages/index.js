import DefaultLayout from '@layouts/default'
import Link from 'next/link'
import { getConfig, getAllPosts } from '@api'

export default function Blog(props) {
  return (
    <DefaultLayout title={props.title} description={props.description}>
      <p>List of Posts:</p>
      <ul>
        {props.posts.map((post, idx) => {
          return (
            <li key={idx}>
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const config = await getConfig();
  const allPosts = await getAllPosts();

  console.log(config);
  console.log(allPosts);

  return {
    props: {
      posts: allPosts,
      title: config.title,
      description: config.description
    }
  }
}