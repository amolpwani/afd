package com.ford.afd.repository;

import com.ford.afd.model.MasterDataItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MasterDataItemRepository extends JpaRepository<MasterDataItem, Long> {
	
	/**
	 * Retrieves MasterDataDataItem for given masterDataId.
	 * @param masterDataId
	 * @return
	 */
	List<MasterDataItem> findByParentMasterDataId(long masterDataId);
}
