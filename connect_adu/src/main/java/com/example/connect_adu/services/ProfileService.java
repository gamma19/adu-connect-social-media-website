package com.example.connect_adu.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.connect_adu.requests.ProfileRequest;
import com.example.connect_adu.responses.ProfileResponse;
import com.example.connect_adu.entities.Profile;
import com.example.connect_adu.models.User;
import com.example.connect_adu.repository.ProfileRepository;
import com.example.connect_adu.repository.UserRepository;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public ProfileResponse createOrUpdateProfile(ProfileRequest profileRequest) {
        // Kullanıcıyı veritabanından al
        User user = userRepository.findById(profileRequest.getUserId()).orElse(null);
        if (user == null) {
            // Kullanıcı bulunamadı, hata fırlatılabilir veya uygun bir şekilde işlenebilir
            return null;
        }

        // Profili veritabanına kaydet
        Profile profile = new Profile();
        profile.setUser(user);
        profile.setBiography(profileRequest.getBiography());
        profile.setProfilePicture(profileRequest.getProfilePicture());
        Profile savedProfile = profileRepository.save(profile);

        // Oluşturulan veya güncellenen profil bilgilerini döndür
        return mapProfileToResponse(savedProfile);
    }

    public ProfileResponse getProfileByUserId(Long userId) {
        // Kullanıcıyı veritabanından al
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            // Kullanıcı bulunamadı, hata fırlatılabilir veya uygun bir şekilde işlenebilir
            return null;
        }

        // Kullanıcıya ait profili veritabanından al
        Profile profile = profileRepository.findByUser(user);
        if (profile == null) {
            // Profil bulunamadı, hata fırlatılabilir veya uygun bir şekilde işlenebilir
            return null;
        }

        // Profil bilgilerini döndür
        return mapProfileToResponse(profile);
    }

    private ProfileResponse mapProfileToResponse(Profile profile) {
        ProfileResponse response = new ProfileResponse();
        response.setId(profile.getId());
        response.setUserId(profile.getUser().getId());
        response.setBiography(profile.getBiography());
        response.setProfilePicture(profile.getProfilePicture());
        return response;
    }
}
