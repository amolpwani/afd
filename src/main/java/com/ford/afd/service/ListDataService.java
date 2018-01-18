package com.ford.afd.service;

import com.ford.afd.model.ListData;
import com.ford.afd.repository.ListDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListDataService {
    @Autowired
    private ListDataRepository listDataRepository;

    public List<ListData> allListData() {
        return listDataRepository.findAll();
    }

    public ListData findListDataById(long id) {
        return listDataRepository.findOne(id);
    }

    public ListData saveListData(ListData listData) {
        return listDataRepository.save(listData);
    }

    public void deleteListData(ListData listData) {
        listDataRepository.delete(listData);
    }
}
