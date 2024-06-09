package com.example.connect_adu.responses;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

import com.example.connect_adu.entities.Comment;



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

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public CommentResponse(Long id, String commentIcerik, Long postId, Long userId, Date createdAt) {
		super();
		this.Id = id;
		this.commentIcerik = commentIcerik;
		this.postId = postId;
		this.userId = userId;
		this.createdAt = createdAt;
	}

	Long Id;
	String commentIcerik;
	Long postId;
	Long userId;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "UTC")
	private Date createdAt;
	
	
	public CommentResponse(Comment comment) {
		
		this.Id = comment.getId();
		this.commentIcerik = comment.getCommentIcerik();
		if(comment.getUser() != null) {
			this.userId = comment.getUser().getId();
			this.postId = comment.getPost().getId();
		}
		this.createdAt= comment.getCreatedAt();
		
		
		
	}
	
	
	
	
	
}
