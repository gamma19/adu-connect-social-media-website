package com.example.connect_adu.responses;

import com.example.connect_adu.entities.Like;

public class LikeResponse {
	

    private Long id;
    private Long postId;
    private Long userId;
    
	public LikeResponse(Long id, Long postId, Long userId) {
		super();
		this.id = id;
		this.postId = postId;
		this.userId = userId;
	}
	
	public LikeResponse(Like like) {
		super();
		this.id = like.getId();
		this.postId = like.getPost().getId();
		this.userId = like.getUser().getId();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
	
    
    

}
