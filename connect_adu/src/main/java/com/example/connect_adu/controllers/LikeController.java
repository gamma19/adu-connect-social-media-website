package com.example.connect_adu.controllers;

import java.util.List;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.connect_adu.entities.Like;
import com.example.connect_adu.requests.LikeCreateRequest;
import com.example.connect_adu.responses.LikeCountResponse;
import com.example.connect_adu.responses.LikeResponse;
import com.example.connect_adu.services.LikeService;


@RestController
@RequestMapping("/likes")
public class LikeController {
	
	private LikeService likeService;

	public LikeController(LikeService likeService) {
		this.likeService = likeService;
	}
		
	@GetMapping
	public List<LikeResponse> getAllLikes(){
		return likeService.getAllLikes().stream().map(u -> new LikeResponse(u)).toList();
	}
	
	@PostMapping
	public Like createOneLike(@RequestBody LikeCreateRequest request) {
		return likeService.createOneLike(request);
	}
	
	
	
	
	@GetMapping("/{likeId}")
	public Like getOneLike(@PathVariable Long likeId) {
		return likeService.getLikeById(likeId);
	}
	
	
	@DeleteMapping("/{likeId}")
	public void deleteOneLike(@PathVariable Long likeId) {
		
		likeService.deleteOneLikeById(likeId);
	}
	
	
	@GetMapping("/posts/{postId}/count")
	public ResponseEntity<LikeCountResponse> getLikesCountByPostId(@PathVariable Long postId) {
	    Long likeCount = likeService.getLikesCountByPostId(postId);
	    LikeCountResponse response = new LikeCountResponse(likeCount);
	    return ResponseEntity.ok(response);
	}

	
	

}
