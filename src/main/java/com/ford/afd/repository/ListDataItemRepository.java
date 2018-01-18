package com.ford.afd.repository;

import com.ford.afd.model.ListDataItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ListDataItemRepository extends JpaRepository<ListDataItem, Long> {
	
	List<ListDataItem> findByParentlistId(long listId);
}
