package com.example.connect_adu.responses;

import java.util.Set;

import com.example.connect_adu.models.Role;
import com.example.connect_adu.models.User;

import lombok.Data;

@Data
public class UserResponse {

	private Long id;
	private String username;
	private String email;
	private String password;
	private Set<Role> roles;

	public UserResponse(User user) {
		this.id = user.getId();
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.password = user.getPassword();
		this.roles = user.getRoles(); // Assuming getRoles() returns a List<String>
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}