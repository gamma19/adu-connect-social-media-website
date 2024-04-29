package com.example.connect_adu.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;



import com.example.connect_adu.requests.CommentCreateRequest;

import com.example.connect_adu.requests.CommentUpdateRequest;

import com.example.connect_adu.responses.CommentResponse;

import com.example.connect_adu.services.CommentService;


@RestController
@RequestMapping("/comments")
public class CommentController {

    private CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<CommentResponse> getAllComments(@RequestParam Optional<Long> userId,
                                               @RequestParam Optional<Long> postId) {
        return commentService.getAllCommentsWithParam(userId, postId);
    }

    @PostMapping
    public CommentResponse createOneComment(@RequestBody CommentCreateRequest request) {
        return commentService.createOneComment(request);
    }

    @GetMapping("/{commentId}")
    public CommentResponse getOneComment(@PathVariable Long commentId) {
        return commentService.getOneCommentById(commentId);
    }

    @PutMapping("/{commentId}")
    public CommentResponse updateOneComment(@PathVariable Long commentId, @RequestBody CommentUpdateRequest request) {
        return commentService.updateOneCommentById(commentId, request);
    }

    @DeleteMapping("/{commentId}")
    public void deleteOneComment(@PathVariable Long commentId) {
        commentService.deleteOneCommentById(commentId);
    }
}
