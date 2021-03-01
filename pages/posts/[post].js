import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Post({ post, posts }) {
  const router = useRouter();

  // console.log(posts);

  if (posts === undefined || posts === null) {
    useEffect(() => {
      router.push("/login");
    });
    return <></>;
  }

  const { posts: newposts, name } = JSON.parse(posts);
  if (name === "JsonWebTokenError") {
    useEffect(() => {
      router.push("/login");
    });
    return <></>;
  }
  const thisPost = newposts?.find((x) => x.title === post);
  if (thisPost === undefined || thisPost === null) {
    useEffect(() => {
      router.push("/404");
    });
    return <></>;
  }
  return (
    <div>
      {thisPost ? (
        <>
          <h1>{thisPost.title}</h1>
          {thisPost.image_url && <img src={thisPost.image_url} />}
          <p>{thisPost.content}</p>
          <h4>by {thisPost.author}</h4>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const protocol = ctx.req.headers["x-forwarded-proto"] || "http";
  const baseUrl = ctx.req ? `${protocol}://${ctx.req.headers.host}` : "";

  const post = ctx.query.post;
  const posts = await fetch(baseUrl + "/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: ctx.req.cookies.token }),
  }).then((t) => t.json());
  return {
    props: {
      post: post,
      posts: JSON.stringify(posts),
    },
  };
}
