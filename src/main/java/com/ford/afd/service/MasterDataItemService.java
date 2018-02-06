package com.ford.afd.service;

import com.ford.afd.model.MasterDataItem;
import com.ford.afd.repository.MasterDataItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 
 * Service class to perform add, remove, update,search operation in MasterDataItem table.
 */
@Service
public class MasterDataItemService {
    @Autowired
    private MasterDataItemRepository masterDataItemRepository;

    public List<MasterDataItem> allMasterDataItems() {
        return masterDataItemRepository.findAll();
    }

    public MasterDataItem findMasterDataItemById(long id) {
        return masterDataItemRepository.findOne(id);
    }
    
    public List<MasterDataItem> findMasterDataItemByMasterDataId(long listId) {
        return masterDataItemRepository.findByParentMasterDataId(listId);
    }

    public MasterDataItem saveMasterDataItem(MasterDataItem masterDataItem) { 
    	return masterDataItemRepository.save(masterDataItem); 
    }

    public void deleteMasterDataItem(MasterDataItem masterDataItems) {
        masterDataItemRepository.delete(masterDataItems);
    }
}