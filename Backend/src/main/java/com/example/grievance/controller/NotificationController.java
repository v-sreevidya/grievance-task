package com.example.grievance.controller;

import com.example.grievance.Entity.Notification;
import com.example.grievance.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    // Endpoint to get all notifications for a supervisor
    @GetMapping("/supervisor")
    public List<Notification> getNotificationsForSupervisor() {
        // You can add filters to get only specific notifications for the logged-in supervisor
        return notificationRepository.findAll();
    }
}

