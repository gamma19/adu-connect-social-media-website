package com.example.connect_adu.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.example.connect_adu.models.User;

@Entity
@Table(name="pLike")
public class Like {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long Id;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="userId" ,nullable=false)
	@OnDelete(action= OnDeleteAction.CASCADE)
	@JsonIgnore
	User user;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="postId" ,nullable=false)
	@OnDelete(action= OnDeleteAction.CASCADE)
	@JsonIgnore
	Post post;
	
	

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


}