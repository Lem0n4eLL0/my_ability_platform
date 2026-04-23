package com.example.GigAnt.authentication.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "account_status")
public class AccountStatus {

  @Id
  @GeneratedValue
  @Column(columnDefinition = "UUID")
  private UUID id;

  @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
  @Builder.Default
  private Boolean isActive = true;

  @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
  @Builder.Default
  private Boolean isBlocked = false;

  @Column(columnDefinition = "TIMESTAMP")
  private LocalDateTime blockedAt;

  @Column(columnDefinition = "TEXT")
  private String blockedReason;

  public AccountStatus(boolean isActive, boolean isBlocked) {
    this.isActive = isActive;
    this.isBlocked = isBlocked;

  }


}