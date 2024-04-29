package com.example.connect_adu.services;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import com.example.connect_adu.entities.Post;
import com.example.connect_adu.models.User;
import com.example.connect_adu.repository.PostRepository;
import com.example.connect_adu.requests.PostCreateRequest;
import com.example.connect_adu.requests.PostUpdateRequest;
import com.example.connect_adu.responses.PostResponse;
import org.springframework.stereotype.Service;


@Service
public class PostService {
	
	private PostRepository postRepository;
	private UserService userService;

	public PostService(PostRepository postRepository, UserService userService) {
		
		this.postRepository = postRepository;
		this.userService = userService;
	}


	//JPA Repositorye metot ekledigim kisim

	public List<PostResponse> getAllPosts(Optional<Long> userId) {
	    List<Post> posts;
	    
	    if (userId.isPresent()) {
	        posts = postRepository.findByUserId(userId.get());
	    } else {
	        posts = postRepository.findAll();
	    }
	    
	    return posts.stream()
	                .map(PostResponse::new) // Mevcut PostResponse kurucu metodunu kullanarak PostResponse nesnelerini oluşturuyoruz
	                .collect(Collectors.toList());
	}


	public Post createOnePost(PostCreateRequest newPostRequest) {
		// TODO Auto-generated method stub
		
		User user = userService.getOneUserById(newPostRequest.getUserId());
		if(user==null) {
			return null;
		}
		Post toSave = new Post();
		toSave.setIcerik(newPostRequest.getIcerik());
		toSave.setTitle(newPostRequest.getTitle());
		toSave.setId(newPostRequest.getId());
		toSave.setUser(user);
		
		
		return postRepository.save(toSave);
	}

	
	public Post getOnePostById(Long postId) {
		// TODO Auto-generated method stub
		return postRepository.findById(postId).orElse(null);
	}


	public Post updateOnePostById(Long postId, PostUpdateRequest postUpdateRequest) {
		// TODO Auto-generated method stub
		Optional<Post> post = postRepository.findById(postId);
		if(post.isPresent()) {
			Post toUpdate = post.get();
			toUpdate.setIcerik(postUpdateRequest.getIcerik());
			toUpdate.setTitle(postUpdateRequest.getTitle());
		    postRepository.save(toUpdate);
		    return toUpdate;
		}
		return null;
	}



	public void deleteOnePostById(Long postId) {
		// TODO Auto-generated method stub
		postRepository.deleteById(postId);
	}

		
	
}