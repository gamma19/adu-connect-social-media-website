package com.example.connect_adu.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.connect_adu.models.User;

import com.example.connect_adu.repository.UserRepository;




@Service
public class UserService {

	
	UserRepository userRepository;
	
	
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	
	
	
	public UserService(UserRepository userRepository) {
		
		this.userRepository = userRepository;
	}




	public User saveOneUser(@RequestBody User newUser) {
		return userRepository.save(newUser);
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




	public void deleteOneUser(Long userId) {
		// TODO Auto-generated method stub
		userRepository.deleteById(userId);
	}




}
