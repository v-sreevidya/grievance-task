package com.example.grievance.repository;

import com.example.grievance.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUsernameAndPassword(String username, String password);

    List<Users> findByRole(String role);
}
