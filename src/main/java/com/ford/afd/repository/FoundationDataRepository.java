package com.ford.afd.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ford.afd.model.FoundationData;

public interface FoundationDataRepository extends CrudRepository<FoundationData, Long> {
	List<FoundationData> findByRowId(long rowId);
	
	@Transactional
	void removeByRowId(long rowId);
}
