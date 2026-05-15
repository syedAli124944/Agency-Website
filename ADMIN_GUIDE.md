# 👑 Agency Owner's Content Management Guide

This guide explains how you can easily change, update, or add new information to your blog without needing to write code.

## 1. How to Edit Content (Supabase Dashboard)
Your content is stored in the `blog_posts` table. To change it:
1. Log in to [Supabase](https://supabase.com).
2. Go to **Table Editor** -> `blog_posts`.
3. Find the post you want to edit and click the **content** cell.
4. It uses a **Block Format** (JSON). You can add new paragraphs, headings, or images by following this simple structure:

### Available Block Types:
*   **Paragraph**: `{"type": "paragraph", "text": "Your text here..."}`
*   **Heading**: `{"type": "heading", "text": "Main Section Title"}`
*   **Sub-heading**: `{"type": "subheading", "text": "Subsection Title"}`
*   **List**: `{"type": "list", "items": ["Item 1", "Item 2"]}`
*   **Quote**: `{"type": "quote", "text": "Inspiring words here"}`
*   **Image**: `{"type": "image", "url": "/images/your-image.png", "caption": "Image Description"}`

---

## 2. 🔓 Unlocking the Database (SQL Editor)
If you find that your edits aren't saving (Row Level Security), run this command in the **SQL Editor** in Supabase to give yourself full control:

```sql
-- Disable RLS to allow easy editing from the dashboard
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- OR: Add a policy that allows anyone with the API key to update (for dev)
CREATE POLICY "Enable all access for all users" ON blog_posts
FOR ALL USING (true) WITH CHECK (true);
```

---

## 3. Adding New Images
1. Place your new images in the `/public/images/` folder of your project.
2. In the database, set the `url` of an image block to `/images/your-filename.png`.
3. The blog will automatically render them with premium glass-morphism effects and cinematic captions.

---

## 4. Why the Fallback exists?
Currently, I've added a **Frontend Fallback** in `BlogPostPage.jsx`. This was a safety measure to ensure your "2026" post looked perfect even while the database was being configured. Once you've successfully updated your database, you can remove the `FALLBACK_2026_CONTENT` section from the code to make it 100% dynamic!
