package com.example.connect_adu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.connect_adu.requests.ProfileRequest;
import com.example.connect_adu.responses.ProfileResponse;
import com.example.connect_adu.services.ProfileService;



@RestController
@RequestMapping("/profiles")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<ProfileResponse> createOrUpdateProfile(@RequestBody ProfileRequest profileRequest) {
        ProfileResponse response = profileService.createOrUpdateProfile(profileRequest);
        if (response == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ProfileResponse> getProfileByUserId(@PathVariable Long userId) {
        ProfileResponse response = profileService.getProfileByUserId(userId);
        if (response == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
