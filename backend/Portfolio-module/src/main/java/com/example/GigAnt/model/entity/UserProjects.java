package com.example.GigAnt.model.entity;

import com.example.GigAnt.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.UUID;

@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_project")
public class UserProjects extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "profile_id", nullable = false, foreignKey = @ForeignKey(name = "fk_user_project_profile"))
  private UserProfile profile;

  @Column(name = "title", nullable = false, length = 255)
  private String title;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @Column(name = "link", length = 100)
  private String link;

}