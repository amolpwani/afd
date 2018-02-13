package com.ford.afd.repository;

import com.ford.afd.model.MasterData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MasterDataRepository extends JpaRepository<MasterData, Integer> {
	
	/**
	 * Checks if name already existing in MasterData table..
	 * @param name
	 * @return
	 */
	 boolean existsByName(String name);
}
