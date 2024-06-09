package com.example.connect_adu.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.connect_adu.models.User;
import com.example.connect_adu.repository.ProfileRepository;
import com.example.connect_adu.repository.UserRepository;



@Service
public class UserService {
	
	@Autowired
	private ProfileRepository profileRepository;


	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
    private final ProfileService profileService;

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	
	
	
	 @Autowired
	 public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, ProfileService profileService) {
	       this.userRepository = userRepository;
	       this.passwordEncoder = passwordEncoder;
	       this.profileService = profileService;
	    }



	
		/*
		 * public User saveOneUser(@RequestBody User newUser) { // Yeni kullanıcı
		 * oluşturulurken şifreyi şifrele
		 * newUser.setPassword(passwordEncoder.encode(newUser.getPassword())); User
		 * savedUser = userRepository.save(newUser);
		 * 
		 * // Kullanıcı için profil oluştur Profile profile = new Profile();
		 * profile.setUser(savedUser); profileService.createProfile(profile);
		 * 
		 * return savedUser; }
		 */	
	 

	 
	 @Transactional
	 public User saveOneUser(User newUser) {
	     newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
	     User savedUser = userRepository.save(newUser);


	     return savedUser;
	 }

	public User getOneUserById(Long userId){
		//custom exception
		return userRepository.findById(userId).orElse(null);
	}



	public User updateOneUser(Long userId, User newUser) {
	    Optional<User> user = userRepository.findById(userId);
	    if (user.isPresent()) {
	        User foundUser = user.get();
	        foundUser.setEmail(newUser.getEmail());
	        foundUser.setUsername(newUser.getUsername());
	        foundUser.setPassword(newUser.getPassword());
			foundUser.setRoles(newUser.getRoles()); 
	        userRepository.save(foundUser);
	        return foundUser;
	    } else {
	        return null;
	    }
	}
	
//UserName'i guncellemek için ekledim
	 public User updateUserName(Long userId, String newUserName) {
	        Optional<User> user = userRepository.findById(userId);
	        if (user.isPresent()) {
	            User foundUser = user.get();
	            foundUser.setUsername(newUserName);
	            userRepository.save(foundUser);
	            return foundUser;
	        } else {
	            return null;
	        }
	 }



	public void deleteOneUser(Long userId) {
		// TODO Auto-generated method stub
		userRepository.deleteById(userId);
	}

	
	 public User findByUsername(String username) {
	        return userRepository.findByUsername(username)
	                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
	    }


	 public Boolean existsByUsername(String username) {
	        return userRepository.existsByUsername(username);
	    }
	 
	 
	 public User updatePassword(Long userId, String newPassword) {
	        Optional<User> optionalUser = userRepository.findById(userId);
	        if (optionalUser.isPresent()) {
	            User user = optionalUser.get();
	            // Yeni şifreyi şifrele
	            String encodedPassword = passwordEncoder.encode(newPassword);
	            //System.out.println(encodedPassword);
	            user.setPassword(encodedPassword);
	            return userRepository.save(user);
	        } else {
	        	//System.out.println("31");
	            throw new RuntimeException("User not found");
	           
	        }
	    }
	 
	
	 
}
