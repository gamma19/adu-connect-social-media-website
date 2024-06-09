package com.example.connect_adu.responses;

import com.example.connect_adu.entities.Profile; // Profile sınıfının doğru paketini import edin
import lombok.Data;

@Data
public class ProfileResponse {
    private Long id;
    private Long userId;
    private String biography;
    private String profilePicture;

    // Constructor that takes a Profile object
    public ProfileResponse(Profile profile) {
        this.id = profile.getId();
        this.userId = profile.getUser().getId();
        this.biography = profile.getBiography();
        this.profilePicture = profile.getProfilePicture();
    }

    // Getter and setter methods can still be present if needed
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
}
