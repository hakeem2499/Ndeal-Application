import { writable } from 'svelte/store';
import { authFetch } from '../routes/(dealInsight)/auth';  // Import the authFetch helper function
import { successMessage } from '$lib/toast';
import { goto } from '$app/navigation';
import { API_URL } from './HomeStore';

export interface Comment {
    id: number;
    user: string;
    text: string;
    created_at: string;
}

export let PostType = writable<string>('Share Insight');

export interface Post {
    id: number;
    title: string;
    description: string;
    image?: string | null;
    upvotes: number;
    user: string;
    tags: string[];
    comments: Comment[];
}

// Store to manage posts in the frontend
export const PostStore = writable<Post[]>([]);
console.log("🚀 ~ PostStore:", PostStore)

// Fetch all posts and set to store
export async function fetchPosts() {
    try {
        const response = await authFetch(`${API_URL}posts/`);
        console.log("🚀 ~ fetchPosts ~ response:", response)
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data: Post[] = await response.json();
        console.log("🚀 ~ fetchPosts ~ data:", data)
        PostStore.set(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

// Fetch a single post by ID
export async function fetchPostById(postId: number): Promise<Post | null> {
    try {
        const response = await authFetch(`${API_URL}posts/${postId}/`);
        if (!response.ok) throw new Error('Failed to fetch post by ID');

        const post: Post = await response.json();
        return post;
    } catch (error) {
        console.error(`Error fetching post with ID ${postId}:`, error);
        return null;
    }
}

// Add a new post with optional image and tags
export async function addPost(postData: { title: string; description: string; image?: File | null; tags: string[] }) {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('description', postData.description);

    if (postData.image) {
        formData.append('image', postData.image);
    }

    // Append each tag as a separate form field
    postData.tags.forEach(tag => formData.append('tags', tag.trim()));

    // Debug FormData contents to ensure correct data
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    try {
        const response = await authFetch('http://localhost:8000/api/posts/', {
            method: 'POST',
            body: formData  // Don't manually set Content-Type
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error details:", errorData);
            throw new Error('Failed to add post');
        }

        const newPost: Post = await response.json();
        successMessage('Post created successfully!');
			goto('/dealInsight');
        PostStore.update(posts => [...posts, newPost]);
    } catch (error) {
        console.error("Error adding post:", error);
    }
}



// Upvote a post and update the store
export async function upvotePost(postId: number) {
    try {
        const response = await authFetch(`http://localhost:8000/api/posts/${postId}/upvote/`, {
            method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to upvote post');

        PostStore.update(posts =>
            posts.map(post =>
                post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
            )
        );
    } catch (error) {
        console.error("Error upvoting post:", error);
    }
}

// Add a comment to a specific post and update the store
export async function addComment(postId: number, commentText: string) {
    try {
        const response = await authFetch(`http://localhost:8000/api/posts/${postId}/comments/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: commentText })
        });
        if (!response.ok) throw new Error('Failed to add comment');

        const newComment: Comment = await response.json();
        PostStore.update(posts =>
            posts.map(post =>
                post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
            )
        );
    } catch (error) {
        console.error("Error adding comment:", error);
    }
}

// Remove a comment from a specific post
export async function deleteComment(postId: number, commentId: number) {
    try {
        const response = await authFetch(`http://localhost:8000/api/posts/${postId}/comments/${commentId}/`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete comment');

        PostStore.update(posts =>
            posts.map(post =>
                post.id === postId
                    ? { ...post, comments: post.comments.filter(comment => comment.id !== commentId) }
                    : post
            )
        );
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
}
