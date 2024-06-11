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
		        // Kullanıcı ve post kombinasyonunun daha önce like edilip edilmediğini kontrol et
		        Like existingLike = likeRepository.findByUserAndPost(user, post);
		        if (existingLike != null) {
		            return null; // veya uygun bir hata fırlatabilirsiniz, örneğin yeni bir istisna fırlatmak
		        }

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



	public boolean deleteLike(Long userId, Long postId) {
    Optional<Like> likeOptional = likeRepository.findByUserIdAndPostId(userId, postId)
                                                .stream()
                                                .findFirst(); // Kombinasyonun sadece bir tane olacağını varsayıyoruz
    if (likeOptional.isPresent()) {
        likeRepository.deleteById(likeOptional.get().getId());
        return true;
    } else {
        // Örneğin özel bir istisna fırlatabilirsiniz
        throw new IllegalArgumentException("User " + userId + " has not liked post " + postId);
        // veya sadece false dönebilirsiniz
        // return false;
    }
}

			
	
}