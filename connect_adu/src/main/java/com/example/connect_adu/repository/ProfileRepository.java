package com.example.connect_adu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.connect_adu.entities.Profile;
import com.example.connect_adu.models.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findByUserId(Long userId);
    Optional<Profile> findFirstByUserId(Long userId); // This method will return an Optional<Profile>
}