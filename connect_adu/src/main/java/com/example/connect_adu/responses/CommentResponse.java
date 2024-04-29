package com.example.connect_adu.responses;


import lombok.Data;



@Data
public class CommentResponse {
	
	

	public Long getId() {
		return Id;
	}
	public void setId(Long id) {
		Id = id;
	}
	public String getCommentIcerik() {
		return commentIcerik;
	}
	public void setCommentIcerik(String commentIcerik) {
		this.commentIcerik = commentIcerik;
	}
	public Long getPostId() {
		return postId;
	}
	public void setPostId(Long postId) {
		this.postId = postId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	Long Id;
	String commentIcerik;
	Long postId;
	Long userId;
	public CommentResponse(Long id, String commentIcerik, Long postId, Long userId) {
		super();
		Id = id;
		this.commentIcerik = commentIcerik;
		this.postId = postId;
		this.userId = userId;
	}
	
	

}
