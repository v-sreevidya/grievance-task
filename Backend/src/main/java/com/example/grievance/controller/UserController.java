package com.example.grievance.controller;

import com.example.grievance.Entity.Users;
import com.example.grievance.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to create a new user
    @PostMapping("/signup")
    public Users signUp(@RequestBody Users user) {
        System.out.println("Received User: " + user);
        return userService.saveUser(user);
    }

    // Endpoint to get all users (assignees)
    @GetMapping
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint to get a specific user by ID
    @GetMapping("/{id}")
    public Users getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    // Endpoint to update user details
    @PutMapping("/{id}")
    public Users updateUser(@PathVariable Integer id, @RequestBody Users user) {
        return userService.updateUser(id, user);
    }

    // Endpoint to delete a user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }
}
