import { Post } from '@prisma/client'
import { prisma } from '../prisma/client'

const findPostsUser = async (authorId: number) => {
    const posts = await prisma.post.findMany({ where: { authorId: authorId}})
    return posts
} 

const findPostsPublished = async () => {
    const posts = await prisma.post.findMany({ where: { published: true}})
    return posts
}

const findPostsByTitle = async (title: string) => {
    const posts = await prisma.post.findMany({ where: { title } })
    return posts
}

const createPost = async (title: string, content: string, published: boolean, authorId: number) => {
    return prisma.post.create({
        data: {
            title,
            content,
            published,
            authorId
        }
    })
}

const deletePost = async (id:number) => {
    return prisma.post.delete({ where: { id }})
}

const updatePost = async (postId: number, authorId: number, post: Post) => {
    return prisma.post.update({
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