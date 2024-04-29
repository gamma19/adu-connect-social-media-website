package com.example.connect_adu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.connect_adu.entities.Like;

public interface LikeRepository extends JpaRepository<Like,Long> {

	public List<Like> findByUserIdAndPostId(Long userId, Long postId);
	public List<Like> findByPostId(Long postId);
	public List<Like> findByUserId(Long likeId);
	
}
