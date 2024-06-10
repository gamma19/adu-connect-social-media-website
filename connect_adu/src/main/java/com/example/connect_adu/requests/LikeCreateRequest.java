package com.example.connect_adu.requests;

import lombok.Data;

@Data
public class LikeCreateRequest {


	Long userId;
	Long postId;
	
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
