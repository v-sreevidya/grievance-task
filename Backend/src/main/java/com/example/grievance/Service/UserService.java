package com.example.grievance.Service;

import com.example.grievance.Entity.Users;
import com.example.grievance.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<Users> getAllAssignees() {
        return userRepository.findAll();
    }

    @Transactional
    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    public List<Users> getAllUsers() {
        return List.of();
    }

    public Users getUserById(Integer id) {
        return null;
    }

    public Users updateUser(Integer id, Users user) {
        return null;
    }

    public void deleteUser(Integer id) {
    }

    public Users getUserByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
}
