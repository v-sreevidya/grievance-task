
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
