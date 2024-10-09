package com.example.grievance.controller;

import com.example.grievance.Entity.Users;
import com.example.grievance.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

   
    @PostMapping("/signup")
    public Users signUp(@RequestBody Users user) {
        System.out.println("Received User: " + user);
        return userService.saveUser(user);
    }

   
    @GetMapping
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }

  
    @GetMapping("/{id}")
    public Users getUserById(@PathVariable UUID id) {
        return userService.getUserById(id);
    }

    
    @PutMapping("/{id}")
    public Users updateUser(@PathVariable UUID id, @RequestBody Users user) {
        return userService.updateUser(id, user);
    }

    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
    }
}
