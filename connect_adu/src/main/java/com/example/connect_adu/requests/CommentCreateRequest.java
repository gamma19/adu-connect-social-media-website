package com.example.connect_adu.requests;

import lombok.Data;

@Data
public class CommentCreateRequest {

	Long commentId;
	Long userId;
	Long postId;
	String commentIcerik;
	public Long getCommentId() {
		return commentId;
	}
	public void setCommentId(Long commentId) {
		this.commentId = commentId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getPostId() {
		return postId;
	}
	public void setPostId(Long postId) {
		this.postId = postId;
	}
	public String getCommentIcerik() {
		return commentIcerik;
	}
	public void setCommentIcerik(String commentIcerik) {
		this.commentIcerik = commentIcerik;
	}
	
	
}
