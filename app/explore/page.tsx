import React from "react";
import { publicPosts } from "../actions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Explore from "@/components/Explorepage/Explore";

export default async function page() {
  const posts = (await publicPosts()) as any;

  return (
    <div>
      <Navbar />
      <Explore posts={posts} />
      <Footer />
    </div>
  );
}

// {posts.map((post: any) => (
//   <div key={post.id}>
//     <h2>{post.title}</h2>
//     <p>{post.content}</p>
//     <ul className="">
//       {post.media.map((media: any) => (
//         <li key={media.id}>
//           <img
//             style={{
//               width: "100px",
//               height: "100px",
//               objectFit: "cover",
//             }}
//             src={media.url}
//             alt={media.key}
//           />
//         </li>
//       ))}
//     </ul>
//   </div>
// ))}
