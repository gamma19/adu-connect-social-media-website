package com.example.connect_adu.requests;

public class PhotographUpdateRequest {
    
    private Long userId;
    private String newPhotography;

    // Getter ve setter'lar
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getNewPhotography() {
        return newPhotography;
    }

    public void setNewPhotography(String newPhotography) {
        this.newPhotography = newPhotography;
    }
}