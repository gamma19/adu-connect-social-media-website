package com.example.connect_adu.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.connect_adu.entities.Profile;
import com.example.connect_adu.models.User;
import com.example.connect_adu.repository.ProfileRepository;
import com.example.connect_adu.requests.ProfileCreateRequest;
import com.example.connect_adu.responses.ProfileResponse;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    /**
     * Retrieves all profiles or profiles by user ID if provided.
     *
     * @param userId Optional user ID to filter profiles
     * @return List of ProfileResponse
     */
    public List<ProfileResponse> getAllProfiles(Optional<Long> userId) {
        List<Profile> profiles = userId.map(profileRepository::findByUserId)
                                       .orElseGet(profileRepository::findAll);

        return profiles.stream()
                       .map(ProfileResponse::new)
                       .collect(Collectors.toList());
    }

    /**
     * Creates a new profile for a given user.
     *
     * @param newProfileRequest Profile creation request
     * @param user User object
     * @return Created Profile
     * @throws IllegalArgumentException if user is null
     * @throws RuntimeException if profile already exists for the user
     */
    public Profile createOneProfile(ProfileCreateRequest newProfileRequest, User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null.");
        }

        profileRepository.findFirstByUserId(user.getId()).ifPresent(profile -> {
            throw new RuntimeException("Profile already exists for this user.");
        });

        Profile newProfile = new Profile();
        newProfile.setUser(user);
        newProfile.setBiography(newProfileRequest.getBiography());
        newProfile.setProfilePicture(newProfileRequest.getProfilePicture());

        return profileRepository.save(newProfile);
    }

    /**
     * Updates the biography of a profile for a given user ID.
     *
     * @param userId User ID
     * @param newBiography New biography text
     * @return Updated Profile
     * @throws RuntimeException if profile is not found
     */
    public Profile updateBiography(Long userId, String newBiography) {
        Profile profile = profileRepository.findFirstByUserId(userId)
                                           .orElseThrow(() -> new RuntimeException("Profile not found for the given user ID."));

        profile.setBiography(newBiography);
        return profileRepository.save(profile);
    }

    /**
     * Updates the profile picture of a profile for a given user ID.
     *
     * @param userId User ID
     * @param newProfilePicture New profile picture URL
     * @return Updated Profile
     * @throws RuntimeException if profile is not found
     */
    public Profile updateProfilePicture(Long userId, String newProfilePicture) {
        Profile profile = profileRepository.findFirstByUserId(userId)
                                           .orElseThrow(() -> new RuntimeException("Profile not found for the given user ID."));

        profile.setProfilePicture(newProfilePicture);
        return profileRepository.save(profile);
    }

    /**
     * Saves a profile.
     *
     * @param profile Profile to save
     * @return Saved Profile
     */
    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }
}
