package com.example.connect_adu.responses;

import java.util.Date;

import com.example.connect_adu.entities.Post;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class PostResponse {

    Long id;
    String title;
    String icerik;
    Long userId;
    String userName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Europe/Istanbul")
    private Date createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Europe/Istanbul")
    private Date updatedAt;

    public PostResponse(Long id, String title, String icerik, Long userId, String userName, Date createdAt, Date updatedAt) {
        super();
        this.id = id;
        this.title = title;
        this.icerik = icerik;
        this.userId = userId;
        this.userName = userName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

 // Constructor that accepts a Post object
    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.icerik = post.getIcerik();
        
        // Retrieve user details from the User object associated with the post
        if (post.getUser() != null) {
            this.userId = post.getUser().getId();  // Accessing user's ID
            this.userName = post.getUser().getUsername();  // Accessing user's username
        }
        
        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getUpdatedAt();
    }

    
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIcerik() {
        return icerik;
    }

    public void setIcerik(String icerik) {
        this.icerik = icerik;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
