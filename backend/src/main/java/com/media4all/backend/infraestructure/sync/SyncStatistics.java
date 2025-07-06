package com.media4all.backend.infraestructure.sync;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class SyncStatistics {
    private long totalSyncs = 0;
    private long successCount = 0;
    private long failureCount = 0;
    private long lastProcessed = 0;
    private String lastSyncAt = null;
}