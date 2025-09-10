import React from 'react'

export default function Blog({ blog }) {
  return (
    <div className="blog">
      <strong>{blog.title}</strong> by {blog.author}
    </div>
  )
}
