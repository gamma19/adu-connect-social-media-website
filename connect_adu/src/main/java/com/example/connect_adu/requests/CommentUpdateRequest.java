package com.example.connect_adu.requests;


import lombok.Data;

@Data
public class CommentUpdateRequest {

	
	String commentIcerik;

	public String getCommentIcerik() {
		return commentIcerik;
	}

	public void setCommentIcerik(String commentIcerik) {
		this.commentIcerik = commentIcerik;
	}
	
}
