package com.example.connect_adu.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.example.connect_adu.entities.Like;
import com.example.connect_adu.entities.Post;
import com.example.connect_adu.models.User;
import com.example.connect_adu.repository.LikeRepository;
import com.example.connect_adu.requests.LikeCreateRequest;




@Service
public class LikeService {

	
	private LikeRepository likeRepository;
	private UserService userService;
	private PostService postService;
	
	
	
	



	public LikeService(LikeRepository likeRepository, UserService userService, PostService postService) {
		this.likeRepository = likeRepository;
		this.userService = userService;
		this.postService = postService;
	}



	public List<Like> getAllLikesWithParam(Optional<Long> userId, Optional<Long> postId) {
	
		if(userId.isPresent() && postId.isPresent()) {
			return likeRepository.findByUserIdAndPostId(userId.get(),postId.get());
		} else if(userId.isPresent()) {
			return  likeRepository.findByUserId(userId.get());
		}else if(postId.isPresent()){
			return likeRepository.findByPostId(postId.get());
		}
		return likeRepository.findAll();
		
		
		
		
	}



	public Like createOneLike(LikeCreateRequest request) {
		// TODO Auto-generated method stub
		User user = userService.getOneUserById(request.getUserId());
		Post post = postService.getOnePostById(request.getPostId());
		if(user !=null && post !=null) {
			Like likeToSave = new Like();
			likeToSave.setUser(user);
			likeToSave.setPost(post);
			return  likeRepository.save(likeToSave);
		}else
			return null;
		
}


	public Like getLikeById(Long likeId) {
		// TODO Auto-generated method stub
		return likeRepository.findById(likeId).orElse(null);
	}



	public void deleteOneLikeById(Long likeId) {
		// TODO Auto-generated method stub
		likeRepository.deleteById(likeId);
		
	}
			
	
}
