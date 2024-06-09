package com.example.connect_adu.requests;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileCreateRequest {
    
    private Long id;
    
    @Size(max = 255)
    private String biography;
    
    @Size(max = 255)
    private String profilePicture;
    
    private Long userId;
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getBiography() {
        return biography;
    }
    
    public void setBiography(String biography) {
        this.biography = biography;
    }
    
    public String getProfilePicture() {
        return profilePicture;
    }
    
    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
}