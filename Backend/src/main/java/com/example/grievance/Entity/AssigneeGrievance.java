import javax.persistence.*;  // JPA annotations
import java.io.Serializable; // For Serializable interface (if needed)
import java.util.Objects;    // For overriding equals and hashCode methods

@Entity
@Table(name = "assignee_grievances")
public class AssigneeGrievance implements Serializable {

    @Column(name = "ticket_number", nullable = false, unique = true)
    private String ticketNumber;

    @ManyToOne(fetch = FetchType.LAZY)  // FetchType.LAZY improves performance by delaying loading of the grievance entity
    @JoinColumn(name = "grievance_id", nullable = false)
    private Grievance grievance;

    @ManyToOne(fetch = FetchType.LAZY)  // Many grievances can be assigned to the same user
    @JoinColumn(name = "assignee_id", nullable = false)
    private User assignee;  // Change from assigneeId to a reference to the User entity

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private GrievanceStatus status;

    @Column(name = "resolution_feedback", length = 500)
    private String resolutionFeedback;

    @Enumerated(EnumType.STRING)
    @Column(name = "assignee_type", nullable = false)
    private AssigneeType assigneeType;  // New field for assignee type

    // Getters and Setters

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public Grievance getGrievance() {
        return grievance;
    }

    public void setGrievance(Grievance grievance) {
        this.grievance = grievance;
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    public GrievanceStatus getStatus() {
        return status;
    }

    public void setStatus(GrievanceStatus status) {
        this.status = status;
    }

    public String getResolutionFeedback() {
        return resolutionFeedback;
    }

    public void setResolutionFeedback(String resolutionFeedback) {
        this.resolutionFeedback = resolutionFeedback;
    }

    public AssigneeType getAssigneeType() {
        return assigneeType;
    }

    public void setAssigneeType(AssigneeType assigneeType) {
        this.assigneeType = assigneeType;
    }

    // Override equals and hashCode (optional but recommended for entities)

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AssigneeGrievance that = (AssigneeGrievance) o;
        return Objects.equals(ticketNumber, that.ticketNumber) &&
                Objects.equals(grievance, that.grievance) &&
                Objects.equals(assignee, that.assignee) &&
                status == that.status &&
                Objects.equals(resolutionFeedback, that.resolutionFeedback) &&
                assigneeType == that.assigneeType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(ticketNumber, grievance, assignee, status, resolutionFeedback, assigneeType);
    }
}
