import { client } from "@/sanity/lib/client"
import Image from "next/image"
import Link from "next/link"

 export interface Blog {
  heading: string;
  description: string;
  slug: string;
  imageUrl: string;
}

export default async function Home(){
  let data:Blog[] = await client.fetch(`*[_type == "blog"]{
  heading,
    description,
    "slug":slug.current,
    "imageUrl":image->url
}`)

  return(
    <main className="h-screen flex justify-center items-center flex-col gap-20">
      <div className="text-yellow-700 text-bold text-5xl p-2 text-center ">
        BlogWeb
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
          data.map((blog,index) => {
         return(
          <Link key={index} href={`/blog/${blog.slug}`}>
          <div className="p-2 shadow-lg max-h-auto rounded-md max-w-[13rem] hover:scale-105 active:scale-100 transition-all cursor-pointer">
            <Image
              src={blog.imageUrl}
              alt="bottle"
              width={300}
              height={200}
            />
            <div className="p-2">
              <h1 className="text-xl font-bold">
                {blog.heading}
              </h1>
              <p className="text-sm line-clamp-2">
                {blog.description}
              </p>
            </div>
          </div>
          </Link>

         )
          })
        }
      </div>
    </main>
  )
}
