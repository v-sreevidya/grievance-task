@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String ticketNumber;

    private String message;
    private String recipient;  // supervisor email or ID
    private LocalDateTime sentAt;

    // Constructor
    public Notification(String message, String recipient) {
        this.message = message;
        this.recipient = recipient;
        this.sentAt = LocalDateTime.now();
    }

    
}

