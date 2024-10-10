package com.example.grievance.controller;

import com.example.grievance.Entity.Users;
import com.example.grievance.Payload.LoginRequest;
import com.example.grievance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;


    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        if (loginRequest.getUsername() == null || loginRequest.getPassword() == null) {
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("statusMessage", HttpStatus.BAD_REQUEST.getReasonPhrase());
            response.put("message", "Username and password are required");
            response.put("timestamp", LocalDateTime.now());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        }

        Users user = userService.getUserByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());

        if (user != null) {
            Map<String, Object> userData = new HashMap<>();
            response.put("status", HttpStatus.OK.value());
            response.put("statusMessage", HttpStatus.OK.getReasonPhrase());
            userData.put("id", user.getId());
            userData.put("username", user.getUsername());
            userData.put("email", user.getEmail());
            userData.put("phonenumber",user.getPhoneNumber());

            response.put("data", userData);
            response.put("timestamp", LocalDateTime.now());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("status", HttpStatus.UNAUTHORIZED.value());
            response.put("message", "Invalid username or password");
            response.put("timestamp", LocalDateTime.now());

            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}
