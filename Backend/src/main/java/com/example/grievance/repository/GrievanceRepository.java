package com.example.grievance.repository;

import com.example.grievance.Entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance,Integer> {
}
