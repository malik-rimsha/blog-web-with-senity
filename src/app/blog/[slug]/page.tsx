import React from 'react'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import {  Blog  } from "@/app/page";
import { PortableText} from "next-sanity";


interface params {
  params: {
    slug: string 
  }
}

const BlogPost = async (params:params) => {
  const {slug } = params.params
    const data = await client.fetch(`*[_type == "blog" && slug.current == $slug]{
  heading,
    description,
    "slug":slug.current,
    "imageUrl":image->
}[0]`,{slug})
  return (
    <main className='max-w-7xl mx-auto p-4 flex-col gap-4 items-center'>
        
        <div>

            <Image src="data.imageUrl " alt="data.heading" height={600} width={600} />
        </div>
        <div>
            <h2>{data.heading}</h2>
            <PortableText value={data.description} />
        </div>

    </main>
  )
}

export default BlogPost