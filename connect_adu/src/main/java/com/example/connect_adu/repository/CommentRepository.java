package com.example.connect_adu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.connect_adu.entities.Comment;



public interface CommentRepository   extends JpaRepository<Comment, Long>{

	public List<Comment> findByUserIdAndPostId(Long userId,Long postId);
	public List<Comment> findByUserId(Long userId);
	public List<Comment> findByPostId(Long postId);

	
}
