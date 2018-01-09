package com.ford.afd.controller;

import com.ford.afd.model.ListDataItems;
import com.ford.afd.repository.ListDataItemsRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by dchiruma on 12/26/2017.
 */

@RestController
@RequestMapping("/listdataitems")
public class ListDataItemsController {
    @Autowired
    private ListDataItemsRepository listDataItemsRepository;

    @RequestMapping(value = "getItems",method = RequestMethod.GET)
    public List<ListDataItems> directList(){return listDataItemsRepository.findAll();}

    @RequestMapping(value = "getItems/{id}",method = RequestMethod.GET)
    public ListDataItems listDataItemsById(@PathVariable long id ){return listDataItemsRepository.findOne(id);}

    @RequestMapping(value = "getListId/{listId}",method = RequestMethod.GET)
    public List<ListDataItems> listDataItemsById(@PathVariable int listId ){
        List<ListDataItems> listDataItemss=listDataItemsRepository.findAll();
        System.out.println("listDataItemss  :"+listDataItemss);
        List<ListDataItems> listtemp=new ArrayList<>();
        for(ListDataItems listDataItems:listDataItemss){
            System.out.println("getListId  :"+listDataItems.getListId());
            if(listDataItems.getListId().equals(listId))
            {
                listtemp.add(listDataItems);
            }
        }
        System.out.println("listDataItemss  :"+listtemp);
      return listtemp;
    }

    @RequestMapping(value="getItems/{id}",method=RequestMethod.PUT)
    public ListDataItems updateListDataItems(@PathVariable long id, @RequestBody ListDataItems listData){
        ListDataItems existingListDataItems = listDataItemsRepository.findOne(id);
        BeanUtils.copyProperties(listData, existingListDataItems);
        return listDataItemsRepository.saveAndFlush(existingListDataItems);
    }

    @RequestMapping(value = "deleteListDataItemsById/{id}",method = RequestMethod.DELETE)
    public ListDataItems deleteListDataItemsById(@PathVariable long id ){
        ListDataItems listData = listDataItemsRepository.findOne(id);
        listDataItemsRepository.delete(id);
        return listData;
    }

    @RequestMapping(value="getItems",method=RequestMethod.POST)
    public ListDataItems createListDataItems(@RequestBody ListDataItems listData) {
     return listDataItemsRepository.saveAndFlush(listData);
    }

}
