"use client"
import { useParams } from 'next/navigation'
import React from 'react'


const PostId = () => {
    const params = useParams()
  return (
    <div>{JSON.stringify(params)}</div>
  )
}

export default PostId