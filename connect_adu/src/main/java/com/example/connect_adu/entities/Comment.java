package com.example.connect_adu.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


import com.example.connect_adu.models.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name="comment")
@Data
public class Comment {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long Id;
	
	

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="userId",nullable=false)

	@OnDelete(action= OnDeleteAction.CASCADE)
	User user;
	
	
	
	
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="postId",nullable=false)

	@OnDelete(action= OnDeleteAction.CASCADE)
	Post post;
	
	
	

	@Lob
	@Column(columnDefinition = "TEXT")
	String commentIcerik;




	public Long getId() {
		return Id;
	}




	public void setId(Long id) {
		Id = id;
	}




	public User getUser() {
		return user;
	}




	public void setUser(User user) {
		this.user = user;
	}


	public Post getPost() {
		return post;
	}


	public void setPost(Post post) {
		this.post = post;
	}


	public String getCommentIcerik() {
		return commentIcerik;
	}


	public void setCommentIcerik(String commentIcerik) {
		this.commentIcerik = commentIcerik;
	}
	
	

}
