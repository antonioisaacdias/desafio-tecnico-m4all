package com.media4all.backend.infraestructure.entitys;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "sync_statistics")
public class SyncStatistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long totalSyncs;
    private long successCount;
    private long failureCount;
    private long lastProcessed;
    private String lastSyncAt;
    private Instant createdAt;
}