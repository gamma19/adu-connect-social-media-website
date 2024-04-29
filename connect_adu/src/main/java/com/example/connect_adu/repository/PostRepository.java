package com.example.connect_adu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.connect_adu.entities.Post;


public interface PostRepository extends JpaRepository<Post, Long>{

	List<Post> findByUserId(Long userId);

}
