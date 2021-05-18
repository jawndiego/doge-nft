import Head from '../../components/head'
import GoHome from '../../components/go-home'
import find from 'lodash/find'
import Image from 'next/image'
// import { useNFT, useNFTMetadata } from "@zoralabs/nft-hooks"
import { NFTFullPage } from "@zoralabs/nft-components"

export const DarkTheme = {
  theme: {
    previewCard: {
      background:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), #696969",
    },
    titleFont: {
      color: "#fff",
      fontWeight: 400,
      fontSize: '14px',
    },
    bodyFont: {
      color: "#fff",
      fontWeight: 300,
      fontSize: '14px',
    },
    borderStyle: "0",
    lineSpacing: 28,
  },
  styles: {
    cardItemInfo: () => (css`
      background: red;
    `)
  }
};

const Doge = ({ post }) => {
  return (
    <section>
      <Head title={`${post.title}`} />
      <GoHome />
      <article className="doge-nft">
        <NFTFullPage
          id={post.nft_id}
          showFull={false}
        />
        <h1 className="title-pill">{post.title}</h1>
        <div className="image-container">
          <div className="doge-nft-image">
            <Image
              className="image-wrapper"
              src={post.image}
              alt={post.title}
              layout="fill"
            />
          </div>
        </div>
        <div className="doge-copy text-04" dangerouslySetInnerHTML={{ __html: post.description }}/>
      </article>
      <style jsx global>{`
        .doge-nft {
          width: calc(100vw - var(--sidebar));
          left: calc(var(--sidebar) + var(--space-md));
          padding-top: var(--space-lg);
          padding-bottom: var(--space-lg);
          z-index: 1200;
          position: relative;
          margin: 0 auto;
        }
        .doge-copy {
          width: 100%;
          max-width: 150rem;
          line-height: 1.2;
        }
        .doge-copy p {
          padding-bottom: var(--space-lg);
        }
        .image-container {
          width: 100%;
          position: relative;
          height: 50rem;
          margin-bottom: var(--space-lg);
        }
        .image-wrapper {
          border-radius: 2rem;
        }
        .doge-nft-image {
          width: 50rem;
          height: 100%;
          position: relative;
        }
        .doge-nft-image img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          position: absolute;
        }
      `}</style>
    </section>
  ) 
}

const API_URL = process.env.WORDPRESS_API_URL

export async function getStaticPaths() {
  const res = await fetch(API_URL)
  const posts = await res.json()

  const paths = posts.options.doge_list.map((post) => ({
    params: { id: post.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(API_URL)
  const data = await res.json()

  const post = find(data.options.doge_list, { slug: params.id })

  return {
    props: { post },
  }
}

export default Doge