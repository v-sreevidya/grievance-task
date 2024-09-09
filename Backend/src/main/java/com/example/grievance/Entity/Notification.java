import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String ticketNumber;

    private String message;
    private String recipient;  // supervisor email or ID
    private LocalDateTime sentAt;

    // Default constructor (required by JPA)
    public Notification() {}

    // Constructor
    public Notification(String message, String recipient) {
        this.message = message;
        this.recipient = recipient;
        this.sentAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(Long ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    // toString method for logging and debugging
    @Override
    public String toString() {
        return "Notification{" +
                "ticketNumber=" + ticketNumber +
                ", message='" + message + '\'' +
                ", recipient='" + recipient + '\'' +
                ", sentAt=" + sentAt +
                '}';
    }
}


