package com.example.connect_adu.requests;

import lombok.Data;

@Data
public class LikeCreateRequest {

	Long Id;
	Long userId;
	Long postId;
	public Long getId() {
		return Id;
	}
	public void setId(Long id) {
		Id = id;
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
	
}
