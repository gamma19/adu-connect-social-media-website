package com.example.connect_adu.requests;

import lombok.Data;

@Data
public class BiographyUpdateRequest {
    private Long userId;
    private String newBiography;

    // Getter ve setter'lar
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getNewBiography() {
        return newBiography;
    }

    public void setNewBiography(String newBiography) {
        this.newBiography = newBiography;
    }
}
