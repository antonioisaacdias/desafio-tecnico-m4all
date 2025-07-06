package com.media4all.backend.controller;

import com.media4all.backend.infraestructure.dto.SyncStatisticsResponse;
import com.media4all.backend.infraestructure.sync.SyncStatistics;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SyncController {

    private final SyncStatistics syncStatistics;

    @GetMapping("/api/v1/sync/statistics")
    public SyncStatisticsResponse getStatistics() {
        return new SyncStatisticsResponse(
                syncStatistics.getTotalSyncs(),
                syncStatistics.getSuccessCount(),
                syncStatistics.getFailureCount(),
                syncStatistics.getLastProcessed(),
                syncStatistics.getLastSyncAt()
        );
    }
}