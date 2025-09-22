import React from "react";
import "./Post.css"; // لو هتحط CSS في ملف منفصل

export default function Post() {
  return (
    <article className="post-card">
      <div className="post-image-wrap">
        <img
          className="post-image"
          src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
          alt="Post"
        />
      </div>

      <div className="post-content">
        <h3 className="post-title">عنوان البوست هنا</h3>
        <p className="post-desc">
          هذا وصف تجريبي للبوست. هنا تقدر تحط سطرين أو ثلاثة عشان توضح فكرة البوست
          بشكل مختصر. الهدف إن الوصف يعطي لمحة سريعة عن المحتوى.
        </p>

        <div className="post-meta">
          <div className="author">
            <img
              className="author-avatar"
              src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
              alt="Author"
            />
            <div className="author-info">
              <span className="author-name">اسم الكاتب</span>
              <span className="post-date">• 12 سبتمبر 2025</span>
            </div>
          </div>

          <div className="post-actions">
            <button className="btn btn-edit">Edit</button>
            <button className="btn btn-delete">Remove</button>
          </div>
        </div>
      </div>
    </article>
  );
}
