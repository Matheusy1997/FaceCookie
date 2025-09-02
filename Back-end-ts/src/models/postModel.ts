import { Post } from '@prisma/client'
import { prisma } from '../prisma/client'

export const findPostsUser = async (authorId: number) => {
    const posts: Post [] = await prisma.post.findMany({ where: { authorId: authorId}})
    return posts
} 

export const findPostsPublished = async () => {
    const posts: Post [] = await prisma.post.findMany({ where: { published: true}})
    return posts
}

export const findPostsByTitle = async (title: string) => {
    const posts: Post [] = await prisma.post.findMany({ where: { title } })
    return posts
}

export const create = async (title: string, content: string, published: boolean, authorId: number) => {
    return await prisma.post.create({
        data: {
            title,
            content,
            published,
            authorId
        }
    })
}

export const deletePost = async (id:number) => {
    return await prisma.post.delete({ where: { id }})
}

export const updatePost = async (postId: number, authorId: number, post:any) => {
    return await prisma.post.update({
        where: {
            id: postId,
            authorId: authorId
        },
        data: {
            title: post.title,
            content: post.content,
            published: post.published,
            updatedAt: new Date()
        }
    })
}