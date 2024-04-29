package com.example.connect_adu.responses;

import com.example.connect_adu.entities.Post;

import lombok.Data;


@Data
public class PostResponse {

	
	public Long getId() {
		return Id;
	}
	public void setId(Long Id) {
		this.Id = Id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getIcerik() {
		return icerik;
	}
	public void setIcerik(String icerik) {
		this.icerik = icerik;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	Long Id;
	String title;
	String icerik;
	Long userId;
	String userName;
	
	
	
	public PostResponse(Post entity) {
		this.Id = entity.getId();
		this.title = entity.getTitle();
		this.icerik=entity.getIcerik();
		this.userId = entity.getUser().getId();
		this.userName = entity.getUser().getUsername();
	}

	
}