package com.example.authentication.model.entity;

import com.example.authentication.enums.AccountRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "account")
public class Account {

  @Id
  @Column(columnDefinition = "UUID")
  private UUID id;

  @ToString.Include
  @Column(nullable = false, unique = true, length = 255)
  private String email;

  @Column(nullable = false, length = 255)
  private String password;

  @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
  private Boolean isVerified = false;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, columnDefinition = "account_role")
  private AccountRole role;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "account_status_id", nullable = false, foreignKey = @ForeignKey(name = "fk_account_status"))
  @ToString.Exclude
  private AccountStatus accountStatus;

  @CreationTimestamp
  @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT NOW()")
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT NOW()")
  private LocalDateTime updatedAt;

  @Version
  @Column(nullable = false, columnDefinition = "INTEGER DEFAULT 0")
  private Integer version;

  @PrePersist
  public void prePersist() {
    if (this.id == null) {
      this.id = UUID.randomUUID();
    }
    if (this.isVerified == null) {
      this.isVerified = false;
    }
  }
}