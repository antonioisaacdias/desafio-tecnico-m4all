package com.media4all.backend.infraestructure.repository;

import com.media4all.backend.infraestructure.entitys.SyncStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SyncStatisticRepository extends JpaRepository<SyncStatistic, Long> {
    @Query("SELECT s FROM SyncStatistic s ORDER BY s.createdAt DESC LIMIT 1")
    Optional<SyncStatistic> findLatest();
    
    @Query("SELECT COUNT(s) FROM SyncStatistic s")
    long countTotalSyncs();
    
    @Query("SELECT COUNT(s) FROM SyncStatistic s WHERE s.successCount > 0")
    long countSuccessfulSyncs();
    
    @Query("SELECT COUNT(s) FROM SyncStatistic s WHERE s.failureCount > 0")
    long countFailedSyncs();
}