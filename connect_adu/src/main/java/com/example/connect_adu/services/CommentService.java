package com.example.connect_adu.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;


import com.example.connect_adu.entities.Comment;
import com.example.connect_adu.entities.Post;
import com.example.connect_adu.models.User;
import com.example.connect_adu.repository.CommentRepository;
import com.example.connect_adu.requests.CommentCreateRequest;
import com.example.connect_adu.requests.CommentUpdateRequest;
import com.example.connect_adu.responses.CommentResponse;




@Service
public class CommentService {

    private CommentRepository commentRepository;
    private UserService userService;
    private PostService postService;

    public CommentService(CommentRepository commentRepository, UserService userService, PostService postService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public List<CommentResponse> getAllCommentsWithParam(Optional<Long> userId, Optional<Long> postId) {
        List<Comment> comments;

        if (userId.isPresent() && postId.isPresent()) {
            comments = commentRepository.findByUserIdAndPostId(userId.get(), postId.get());
        } else if (userId.isPresent()) {
            comments = commentRepository.findByUserId(userId.get());
        } else if (postId.isPresent()) {
            comments = commentRepository.findByPostId(postId.get());
        } else {
            comments = commentRepository.findAll();
        }

        return comments.stream().map(comment -> new CommentResponse(comment.getId(),
                comment.getCommentIcerik(), comment.getPost().getId(), comment.getUser().getId()))
                .collect(Collectors.toList());
    }

    public CommentResponse getOneCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        return (comment != null) ? new CommentResponse(comment.getId(),
                comment.getCommentIcerik(), comment.getPost().getId(), comment.getUser().getId()) : null;
    }

    public CommentResponse createOneComment(CommentCreateRequest request) {
        User user = userService.getOneUserById(request.getUserId());
        Post post = postService.getOnePostById(request.getPostId());

        if (user != null && post != null) {
            Comment commentToSave = new Comment();
            commentToSave.setCommentIcerik(request.getCommentIcerik());
            commentToSave.setPost(post);
            commentToSave.setUser(user);

            Comment savedComment = commentRepository.save(commentToSave);

            return new CommentResponse(savedComment.getId(),
                    savedComment.getCommentIcerik(), savedComment.getPost().getId(), savedComment.getUser().getId());
        } else {
            return null;
        }
    }

    public CommentResponse updateOneCommentById(Long commentId, CommentUpdateRequest request) {
        Optional<Comment> comment = commentRepository.findById(commentId);

        if (comment.isPresent()) {
            Comment commentToUpdate = comment.get();
            commentToUpdate.setCommentIcerik(request.getCommentIcerik());
            commentRepository.save(commentToUpdate);

            return new CommentResponse(commentToUpdate.getId(),
                    commentToUpdate.getCommentIcerik(), commentToUpdate.getPost().getId(), commentToUpdate.getUser().getId());
        } else {
            return null;
        }
    }

    public void deleteOneCommentById(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
