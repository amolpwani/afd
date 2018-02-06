package com.ford.afd.repository;

import com.ford.afd.model.MasterData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MasterDataRepository extends JpaRepository<MasterData, Long> {
}
