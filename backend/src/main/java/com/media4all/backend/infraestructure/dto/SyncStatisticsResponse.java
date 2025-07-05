package com.media4all.backend.infraestructure.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SyncStatisticsResponse {
    private long totalSyncs;
    private long successCount;
    private long failureCount;
    private long lastProcessed;
    private String lastSyncAt;
}