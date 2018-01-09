package com.ford.afd.controller;


import com.ford.afd.model.ListData;
import com.ford.afd.repository.ListDataRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by dchiruma on 12/26/2017.
 */

@RestController
@RequestMapping("/listdata")
public class ListDataController {
    @Autowired
    private ListDataRepository listDataRepository;

    @RequestMapping(value = "getList",method = RequestMethod.GET)
    public List<ListData> directList(){return listDataRepository.findAll();}

    @RequestMapping(value = "getList/{id}",method = RequestMethod.GET)
    public ListData listDataById(@PathVariable long id ){return listDataRepository.findOne(id);}

    @RequestMapping(value="getList/{id}",method=RequestMethod.PUT)
    public ListData updateListData(@PathVariable long id, @RequestBody ListData listData){
        ListData existingListData = listDataRepository.findOne(id);
        BeanUtils.copyProperties(listData, existingListData);
        return listDataRepository.saveAndFlush(existingListData);
    }

    @RequestMapping(value = "deleteListDataById/{id}",method = RequestMethod.DELETE)
    public ListData deleteListDataById(@PathVariable long id ){
        ListData listData = listDataRepository.findOne(id);
        listDataRepository.delete(id);
        return listData;
    }

    @RequestMapping(value="getList",method=RequestMethod.POST)
    public ListData createListData(@RequestBody ListData listData) {
     return listDataRepository.saveAndFlush(listData);
    }

}
