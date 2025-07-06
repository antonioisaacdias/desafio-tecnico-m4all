package com.media4all.backend.controller;

import com.media4all.backend.infraestructure.dto.SyncStatisticsResponse;
import com.media4all.backend.infraestructure.entitys.SyncStatistic;
import com.media4all.backend.infraestructure.repository.SyncStatisticRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class SyncController {

    private final SyncStatisticRepository syncStatisticRepository;

    @GetMapping("/api/v1/sync/statistics")
    public ResponseEntity<SyncStatisticsResponse> getStatistics() {
        Optional<SyncStatistic> latestStat = syncStatisticRepository.findLatest();
        
        SyncStatisticsResponse response;
        if (latestStat.isPresent()) {
            SyncStatistic stat = latestStat.get();
            response = new SyncStatisticsResponse(
                    stat.getTotalSyncs(),
                    stat.getSuccessCount(),
                    stat.getFailureCount(),
                    stat.getLastProcessed(),
                    stat.getLastSyncAt()
            );
        } else {
            // Se não há estatísticas no banco, retorna valores zerados
            response = new SyncStatisticsResponse(0L, 0L, 0L, 0L, null);
        }
        
        return ResponseEntity.ok()
                .header("Cache-Control", "no-cache, no-store, must-revalidate")
                .header("Pragma", "no-cache")
                .header("Expires", "0")
                .body(response);
    }
}