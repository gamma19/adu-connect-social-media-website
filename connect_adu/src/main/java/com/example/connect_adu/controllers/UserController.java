package com.example.connect_adu.controllers;


import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



import com.example.connect_adu.services.UserService;
import com.example.connect_adu.models.User;
import com.example.connect_adu.responses.UserResponse;



@RestController

@RequestMapping("/users")
public class UserController {
	
	private static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	
	private UserService userService ;
	
	
	
	public UserController(UserService userService) {
		this.userService=userService;
	}
	
	
	@GetMapping
	public List<UserResponse> getAllUsers(){
		return userService.getAllUsers().stream().map(u -> new UserResponse(u)).toList();
	}
	
	@PostMapping
	public User createUser(@RequestBody User newUser) {
		return userService.saveOneUser(newUser);
	}
	
	@GetMapping("/{userId}")
	public User getOneUser(@PathVariable Long userId){
		//custom exception
		return userService.getOneUserById(userId);
	}
		

	
	@PutMapping("/{userId}")
	public User updateOneUser(@PathVariable Long userId , @RequestBody User newUser){
		return userService.updateOneUser(userId,newUser);
		
	}
	
	@DeleteMapping("/{userId}")
	public void  deleteOneUser(@PathVariable Long userId){
	userService.deleteOneUser(userId);
			
	}
	
	
	
	@PutMapping("/updateUserName")
	public String updateUserName(@RequestBody User updatedUser) {
	    // Kullanıcı adının benzersiz olduğunu kontrol et
	    boolean usernameExists = userService.existsByUsername(updatedUser.getUsername());
	    if (usernameExists) {
	        return "Username already exists";
	    }

	    // Kullanıcı adı benzersizse güncelleme işlemini yap
	    User result = userService.updateUserName(updatedUser.getId(), updatedUser.getUsername());
	    if (result != null) {
	        return "User name updated successfully";
	    } else {
	        return "User not found";
	    }
	}
	
	
	public static String encryptPassword(String newPassword) {
	    return passwordEncoder.encode(newPassword);
	}

	@PutMapping("/updatePassword")
	public String updatePassword(@RequestBody Map<String, String> request) {
	    Long userId = Long.parseLong(request.get("userId"));
	    String newPassword =  request.get("newPassword");

	    User user = userService.getOneUserById(userId);
	    if (user != null) {
	        // Şifrele ve kullanıcı nesnesine ata
	        String encryptedPassword = encryptPassword(newPassword);
	        user.setPassword(encryptedPassword);
	        
	        // Kullanıcıyı güncelle ve veritabanına kaydet
	        userService.updateOneUser(userId, user);
	        
	        return "Password updated successfully";
	    } else {
	        return "User not found";
	    }
	}
	
	

}
