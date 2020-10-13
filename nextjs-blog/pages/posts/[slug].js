import PostLayout from '@layouts/post'
import { getPostBySlug, getAllPosts } from '@api'

export default (props) => {
  return <PostLayout title={props.title} content={props.content} />
}

export const getStaticProps = async (context) => {
  return {
    props: await getPostBySlug(context.params.slug)
  }
}

export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: false
  }
}