package com.example.grievance.controller;

import com.example.grievance.DTO.ResponseDTO;
import com.example.grievance.Entity.Users;
import com.example.grievance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody Users user) {
        System.out.println("Received User: " + user);
        Users savedUser = userService.saveUser(user);


        ResponseDTO responseUser = new ResponseDTO();
        responseUser.setId(savedUser.getId());
        responseUser.setName(savedUser.getName());
        responseUser.setEmail(savedUser.getEmail());
        responseUser.setPhoneNumber(savedUser.getPhoneNumber());
        responseUser.setAddress(savedUser.getAddress());
        responseUser.setUsername(savedUser.getUsername());
        responseUser.setRole(savedUser.getRole());
        responseUser.setDepartment(savedUser.getDepartment());

        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.CREATED.value());
        response.put("statusMessage", HttpStatus.CREATED.getReasonPhrase());
        response.put("data", responseUser); // Use the DTO here
        response.put("timestamp", LocalDateTime.now());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        List<Users> users = userService.getAllUsers();


        List<ResponseDTO> responseUsers = users.stream().map(user -> {
            ResponseDTO dto = new ResponseDTO();
            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setPhoneNumber(user.getPhoneNumber());
            dto.setAddress(user.getAddress());
            dto.setUsername(user.getUsername());
            dto.setRole(user.getRole());
            dto.setDepartment(user.getDepartment());
            return dto;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("statusMessage", HttpStatus.OK.getReasonPhrase());
        response.put("data", responseUsers);
        response.put("timestamp", LocalDateTime.now());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable UUID id) {
        Users user = userService.getUserById(id);
        Map<String, Object> response = new HashMap<>();

        if (user != null) {
            ResponseDTO responseUser = new ResponseDTO();
            responseUser.setId(user.getId());
            responseUser.setName(user.getName());
            responseUser.setEmail(user.getEmail());
            responseUser.setPhoneNumber(user.getPhoneNumber());
            responseUser.setAddress(user.getAddress());
            responseUser.setUsername(user.getUsername());
            responseUser.setRole(user.getRole());
            responseUser.setDepartment(user.getDepartment());

            response.put("status", HttpStatus.OK.value());
            response.put("statusMessage", HttpStatus.OK.getReasonPhrase());
            response.put("data", responseUser);
            response.put("timestamp", LocalDateTime.now());
            return ResponseEntity.ok(response);
        } else {
            response.put("status", HttpStatus.NOT_FOUND.value());
            response.put("statusMessage", HttpStatus.NOT_FOUND.getReasonPhrase());
            response.put("message", "User not found");
            response.put("timestamp", LocalDateTime.now());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable UUID id, @RequestBody Users user) {
        Users updatedUser = userService.updateUser(id, user);

        Map<String, Object> response = new HashMap<>();
        if (updatedUser != null) {
            ResponseDTO responseUser = new ResponseDTO();
            responseUser.setId(updatedUser.getId());
            responseUser.setName(updatedUser.getName());
            responseUser.setEmail(updatedUser.getEmail());
            responseUser.setPhoneNumber(updatedUser.getPhoneNumber());
            responseUser.setAddress(updatedUser.getAddress());
            responseUser.setUsername(updatedUser.getUsername());
            responseUser.setRole(updatedUser.getRole());
            responseUser.setDepartment(updatedUser.getDepartment());

            response.put("status", HttpStatus.OK.value());
            response.put("statusMessage", HttpStatus.OK.getReasonPhrase());
            response.put("data", responseUser);
            response.put("timestamp", LocalDateTime.now());
            return ResponseEntity.ok(response);
        } else {
            response.put("status", HttpStatus.NOT_FOUND.value());
            response.put("statusMessage", HttpStatus.NOT_FOUND.getReasonPhrase());
            response.put("message", "User not found");
            response.put("timestamp", LocalDateTime.now());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
    }
}
