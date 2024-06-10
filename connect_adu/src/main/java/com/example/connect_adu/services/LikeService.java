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

	 public Long getLikesCountByPostId(Long postId) {
	        return likeRepository.countByPostId(postId);
	    }


		public List<Like> getAllLikes() {
			return likeRepository.findAll();
		}



	 public Like createOneLike(LikeCreateRequest request) {
	        User user = userService.getOneUserById(request.getUserId());
	        Post post = postService.getOnePostById(request.getPostId());
	        if (user != null && post != null) {
	            Like likeToSave = new Like();
	            likeToSave.setUser(user);
	            likeToSave.setPost(post);
	            return likeRepository.save(likeToSave);
	        } else {
	            return null; // veya uygun bir hata fırlatabilirsiniz.
	        }
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
