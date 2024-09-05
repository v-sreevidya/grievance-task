package com.example.grievance.Service;

import com.example.grievance.Entity.Grievance;
import java.util.List;
import java.util.Optional;

public interface GrievanceService {
    Grievance createGrievance(Grievance grievance);
    List<Grievance> getAllGrievances();
    Optional<Grievance> getGrievanceByTicketNo(int ticket_no);
    Grievance updateGrievance(int ticket_no, Grievance grievanceDetails);
    void deleteGrievance(int ticket_no);
}
