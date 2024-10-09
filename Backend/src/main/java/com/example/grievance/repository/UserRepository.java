package com.example.grievance.repository;

import com.example.grievance.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<Users, UUID> {
    Users findByUsernameAndPassword(String username, String password);

    List<Users> findByRole(String role);
}
