package com.example.connect_adu.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.connect_adu.entities.Profile;
import com.example.connect_adu.models.User;
import com.example.connect_adu.requests.BiographyUpdateRequest;
import com.example.connect_adu.requests.PhotographUpdateRequest;
import com.example.connect_adu.requests.ProfileCreateRequest;
import com.example.connect_adu.responses.ProfileResponse;
import com.example.connect_adu.services.ProfileService;
import com.example.connect_adu.services.UserService;



@RestController
@RequestMapping("/profiles")
public class ProfileController {

    private final ProfileService profileService;
    private final UserService userService;

    @Autowired
    public ProfileController(ProfileService profileService, UserService userService) {
        this.profileService = profileService;
        this.userService = userService;
    }

	/*
	 * @PostMapping("/create") public ResponseEntity<Profile>
	 * createProfile(@RequestBody ProfileCreateRequest newProfileRequest) { //
	 * Kullanıcıyı al User user =
	 * userService.getOneUserById(newProfileRequest.getUserId()); if (user == null)
	 * { // Eğer kullanıcı bulunamazsa, 404 NOT FOUND döndür return
	 * ResponseEntity.status(HttpStatus.NOT_FOUND).build(); }
	 * 
	 * // Profil oluştur Profile createdProfile =
	 * profileService.createOneProfile(newProfileRequest, user);
	 * 
	 * // Oluşturulan profil başarıyla döndürülür return
	 * ResponseEntity.ok(createdProfile); }
	 */
    
    @GetMapping
	public List<ProfileResponse> getProfile(@RequestParam Optional<Long> userId){
		return profileService.getAllProfiles(userId);
	}
    
    @PostMapping("/create")
    public Profile createProfile(@RequestBody ProfileCreateRequest newProfileRequest) {
        // Kullanıcıyı al
        User user = userService.getOneUserById(newProfileRequest.getUserId());
        if (user == null) {
            // Eğer kullanıcı bulunamazsa, null döndür
            return null;
        }
        
        // Profil oluştur
        Profile createdProfile = profileService.createOneProfile(newProfileRequest, user);
        
        // Oluşturulan profili döndür
        return createdProfile;
    }
    
    @PutMapping("/biography")
    public ResponseEntity<Profile> updateBiography(@RequestBody BiographyUpdateRequest biographyUpdateRequest) {
        try {
            Long userId = biographyUpdateRequest.getUserId();
            String newBiography = biographyUpdateRequest.getNewBiography();
            Profile updatedProfile = profileService.updateBiography(userId, newBiography);
            return ResponseEntity.ok(updatedProfile);
        } catch (AccessDeniedException e) {
            // Handle AccessDeniedException thrown by Spring Security
            return handleAccessDeniedException(e);
        } catch (RuntimeException e) {
            // Handle other runtime exceptions, e.g., NotFound exception
            return handleRuntimeException(e);
        }
    }


    private ResponseEntity<Profile> handleAccessDeniedException(AccessDeniedException e) {
        // Handle AccessDeniedException
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    private ResponseEntity<Profile> handleRuntimeException(RuntimeException e) {
        // Handle other runtime exceptions, e.g., NotFound exception
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    @PutMapping("/profile-picture")
    public ResponseEntity<Profile> updateProfilePicture(@RequestBody PhotographUpdateRequest photographUpdateRequest) {
        try {
            Long userId = photographUpdateRequest.getUserId();
            String newProfilePicture = photographUpdateRequest.getNewPhotography();
            Profile updatedProfile = profileService.updateProfilePicture(userId, newProfilePicture);
            return ResponseEntity.ok(updatedProfile);
        } catch (AccessDeniedException e) {
            // Handle AccessDeniedException thrown by Spring Security
            return handleAccessDeniedException(e);
        } catch (RuntimeException e) {
            // Handle other runtime exceptions, e.g., NotFound exception
            return handleRuntimeException(e);
        }
    }




    
    
}
