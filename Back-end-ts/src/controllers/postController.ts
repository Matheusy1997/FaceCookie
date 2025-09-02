import { Post } from "@prisma/client";
import { Request, Response } from "express";
import { UserJwtPayload } from "../@types/express";
import {
  findPostsUser,
  findPostsPublished,
  findPostsByTitle,
  create,
  deletePost,
  updatePost,
} from "../models/postModel";

export const getPosts = async (req: Request, res: Response) => {
  const user: UserJwtPayload = req.user as UserJwtPayload
  const title = req.query.title as string
  try {

    if(user) {
      const authorId = user.id
      const postsUser: Post[] = await findPostsUser(authorId)
      if(!postsUser){
        return res.status(404).json({message: `Post não encontrado!`})
      }
      return res.status(200).json(postsUser)
    }

    if(title) {
      const postTitle: Post[] = await findPostsByTitle(title)
      if(!postTitle) {
        return res.status(404).json({ message: `Post não encontrado`})
      }
      return res.status(200).json(postTitle)
    }

    const postPublished: Post[] = await findPostsPublished()
    if(!postPublished) {
      return res.status(404).json({ message: `Nenhum post encontrado`})
    }

  } catch (error) {
    console.error(`Erro em ${error}`)
    res.status(500).json({ error: "Falha ao buscar posts" });
  }
}

export const createPost = async (req: Request, res: Response) => {
  const { title, content, published } = req.body
  const user: UserJwtPayload = req.user as UserJwtPayload
  const authorId = user.id

  try {
    if(!user) {
      return res.status(401).json({ message: 'É necessário estar logado para criar um post!'})
    }
    const post: Post = await create(title, content, published, authorId)
    res.status(200).json(post)
  } catch (error) {
    console.error(`Erro em ${error}`)
    res.status(500).json({ error: "Falha ao criar o post" });
  }
}

export const deletePostByToken = async (req: Request, res: Response) => {
  const user: UserJwtPayload = req.user as UserJwtPayload
  const { id } = req.body
    if(id !== user.id) {
      return res.status(401).json({ message: `O Usuário não pode deletar esse post!`})
    }

  try {
    const post: Post = await deletePost(id)
    res.status(200).json({ message: 'post deletado com sucesso', post})
  } catch (error) {
    console.error(`Erro em ${error}`)
    res.status(500).json({ error: "Falha ao deletar o post" });
  }
}

export const updatePostByToken = async (req: Request, res: Response) => {
  const { id, title, content, published } = req.body
  const user: UserJwtPayload = req.user as UserJwtPayload
  const authorId = user.id

  try {
    const upPost: any = {
      id,
      title,
      content,
      published
    }
    const post: Post = await updatePost(id, authorId, upPost)
    res.status(200).json({ message: 'Post atualizado com sucesso!', post})
  } catch (error) {
    console.error(`Erro em ${error}`)
    res.status(500).json({ error: "Failed to delete post" });
  }
}
