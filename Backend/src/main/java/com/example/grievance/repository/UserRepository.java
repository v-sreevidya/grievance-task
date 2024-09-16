package com.example.grievance.repository;

import com.example.grievance.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUsernameAndPassword(String username, String password);
}
