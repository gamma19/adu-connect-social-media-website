package com.example.connect_adu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.connect_adu.entities.Profile;
import com.example.connect_adu.models.User;


public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Profile findByUser(User user);
    
  
}
