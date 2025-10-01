import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth, storage } from "../../../firebase/config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", desc: "" });
  const [newImage, setNewImage] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const snap = await getDoc(doc(db, "posts", id));
        if (snap.exists()) {
          const data = { id: snap.id, ...snap.data() };
          setPost(data);
          setForm({ title: data.title || "", desc: data.desc || "" });
        }
      } catch (e) {
        console.error("Error loading post", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const isAuthor = auth.currentUser && post && auth.currentUser.uid === post.authorId;

  const handleSave = async () => {
    if (!post) return;
    setSaving(true);
    try {
      let imageUrl = post.image || "";
      if (newImage) {
        const storageRef = ref(storage, `posts/${Date.now()}-${newImage.name}`);
        await uploadBytes(storageRef, newImage);
        imageUrl = await getDownloadURL(storageRef);
      }
      await updateDoc(doc(db, "posts", post.id), {
        title: form.title,
        desc: form.desc,
        image: imageUrl,
      });
      setPost((prev) => ({ ...prev, title: form.title, desc: form.desc, image: imageUrl }));
      setEditing(false);
      setNewImage(null);
    } catch (e) {
      console.error("Error saving post", e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteDoc(doc(db, "posts", post.id));
      navigate("/");
    } catch (e) {
      console.error("Error deleting post", e);
    }
  };

  if (loading) return <div className="p-6 text-center">⏳ Loading post...</div>;
  if (!post) return <div className="p-6 text-center">⚠️ Post not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full rounded mb-4" />
      )}
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.desc}</p>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
        <img
          src={post.authorAvatar || "/default-avatar.png"}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <span>{post.author || "Anonymous"}</span>
      </div>

      {isAuthor && (
        <div className="flex gap-2 mb-6">
          <button className="btn edit" onClick={() => setEditing(true)}>Edit</button>
          <button className="btn delete" onClick={handleDelete}>Delete</button>
        </div>
      )}

      {editing && (
        <div className="border rounded p-4 space-y-3">
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            rows={5}
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
          <label className="block">
            <span className="mr-2">Change image (optional):</span>
            <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files?.[0] || null)} />
          </label>
          <div className="flex gap-2">
            <button className="btn save" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button className="btn cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
