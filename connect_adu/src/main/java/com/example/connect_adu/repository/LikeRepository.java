package com.example.connect_adu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.connect_adu.entities.Like;
import com.example.connect_adu.entities.Post;
import com.example.connect_adu.models.User;

public interface LikeRepository extends JpaRepository<Like,Long> {

    public List<Like> findByUserIdAndPostId(Long userId, Long postId);
    public List<Like> findByPostId(Long postId);
    public List<Like> findByUserId(Long likeId);
    
    @Query("SELECT COUNT(l) FROM Like l WHERE l.post.id = :postId")
       Long countByPostId(Long postId);
    
     Like findByUserAndPost(User user, Post post);
    

    

    
    
    
}