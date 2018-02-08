package com.ford.afd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ford.afd.model.FoundationDataColumn;
import com.ford.afd.repository.FoundationDataColumnRepository;

/**
 * 
 * Service class to perform add, remove, update,search operation in FoundationDataColumn table.
 */
@Service
public class FoundationDataColumnService {
    private static final String DUPLICATE_COLUMN = "duplicateColumn";
    
	@Autowired
    private FoundationDataColumnRepository foundationDataColumnRepository;

    public List<FoundationDataColumn> allFoundationDataColumn() {
        return foundationDataColumnRepository.findAll();
    }

    public FoundationDataColumn findFoundationDataColumnById(long id) {
        return foundationDataColumnRepository.findOne(id);
    }

    public FoundationDataColumn saveFoundationDataColumn(FoundationDataColumn foundationDataColumn) {
    	FoundationDataColumn creaOrUpFoundationDataColumn = null;
    	if (foundationDataColumn.getId() != 0) {
    		creaOrUpFoundationDataColumn = foundationDataColumnRepository.save(foundationDataColumn);
    	} else {
    		if (!foundationDataColumnRepository.existsByUiColumnName(foundationDataColumn.getUiColumnName())) {
    			creaOrUpFoundationDataColumn = foundationDataColumnRepository.save(foundationDataColumn);
    		} else {
    			foundationDataColumn.setUiColumnName(DUPLICATE_COLUMN);
    			creaOrUpFoundationDataColumn = foundationDataColumn;
    		}
    	}
        return creaOrUpFoundationDataColumn;
    }

    public void deleteFoundationDataColumn(FoundationDataColumn foundationData) {
        foundationDataColumnRepository.delete(foundationData);
    }
}
