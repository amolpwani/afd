package com.ford.afd.service;

import com.ford.afd.model.ListDataItem;
import com.ford.afd.repository.ListDataItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ListDataItemService {
    @Autowired
    private ListDataItemRepository listDataItemRepository;

    public List<ListDataItem> allListDataItems() {
        return listDataItemRepository.findAll();
    }

    public ListDataItem findListDataItemById(long id) {
        return listDataItemRepository.findOne(id);
    }
    
    public List<ListDataItem> findListDataItemsByListId(long listId) {
        return listDataItemRepository.findByParentlistId(listId);
    }

    public ListDataItem saveListDataItem(ListDataItem listDataItem) { 
    	return listDataItemRepository.save(listDataItem); 
    }

    public void deleteListDataItem(ListDataItem listDataItems) {
        listDataItemRepository.delete(listDataItems);
    }
}