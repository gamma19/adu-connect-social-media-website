package com.example.connect_adu.requests;

import lombok.Data;

@Data
public class PostUpdateRequest {
	
	String title;
	String icerik;
	
	
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
	
}

