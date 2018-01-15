package com.ford.afd.RepositoryTest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.ford.afd.model.ListDataItems;
import com.ford.afd.repository.ListDataItemsRepository;

/**
 * Created by dudekula.abedin on 1/8/2018.
 */
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
public class ListDataItemsRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private ListDataItemsRepository listDataItemsRepository;
    @Test
    public void directList() {

        ListDataItems listDataItems = new ListDataItems();
        listDataItems.setCode("listItem1");
        listDataItems.setDescription("TestingBusiness");
        listDataItems.setActive(true);;
        listDataItems.setParentlistId(68);
        entityManager.persist(listDataItems);
        entityManager.flush();
        ListDataItems listDataItems1 = new ListDataItems();
        listDataItems1.setCode("");
        listDataItems1.setDescription("TestingBusiness");
        listDataItems1.setActive(true);;
        listDataItems1.setParentlistId(69);
        entityManager.persist(listDataItems1);
        entityManager.flush();
        //given
        List<ListDataItems> listDataItemss = listDataItemsRepository.findAll();
        //then
        for(ListDataItems listDataItems2:listDataItemss){
            if(listDataItems2.getCode().equals(listDataItems.getCode()))
            {
                ListDataItems listDatas = listDataItemsRepository.findOne(listDataItems2.getId());
                assertThat(listDatas.getParentlistId()).isEqualTo(listDataItems.getParentlistId());
            }
            else if(listDataItems2.getCode().equals(listDataItems1.getCode()))
            {
                ListDataItems listDatas = listDataItemsRepository.findOne(listDataItems2.getId());
                assertThat(listDatas.getParentlistId()).isEqualTo(listDataItems1.getParentlistId());
            }
        }
    }

    @Test
    public void listDataItemsById() {

        ListDataItems listDataItems = new ListDataItems();
        listDataItems.setCode("listItem1");
        listDataItems.setDescription("TestingBusiness");
        listDataItems.setActive(true);;
        listDataItems.setParentlistId(67);
        entityManager.persist(listDataItems);
        entityManager.flush();
        List<ListDataItems> listDataItemss = listDataItemsRepository.findAll();
        for(ListDataItems listDataItems2:listDataItemss){
            if(listDataItems2.getCode().equals(listDataItems.getCode()))
            {
                ListDataItems listDatas = listDataItemsRepository.findOne(listDataItems2.getId());
                assertThat(listDatas.getCode()).isEqualTo(listDataItems.getCode());
            }
        }

    }
    @Test
    public void updateListDataItems() {

        ListDataItems listDataItems = new ListDataItems();
        listDataItems.setCode("listItem1");
        listDataItems.setDescription("TestingBusiness");
        listDataItems.setActive(true);;
        listDataItems.setParentlistId(67);
        entityManager.persist(listDataItems);
        entityManager.flush();
        List<ListDataItems> listDataItemss=listDataItemsRepository.findAll();
        for(ListDataItems listDataItems2:listDataItemss){
            if(listDataItems2.getCode().equals(listDataItems.getCode()))
            {
                ListDataItems listDatas = listDataItemsRepository.findOne(listDataItems2.getId());
                ListDataItems listDataItems1 = new ListDataItems();
                listDataItems1.setCode("listItem1");
                listDataItems1.setDescription("TestingBusinessUpdate");
                listDataItems1.setActive(true);;
                listDataItems1.setParentlistId(67);
                BeanUtils.copyProperties(listDataItems1, listDatas);
                assertThat(listDatas.getParentlistId()).isEqualTo(listDataItems1.getParentlistId());

            }
        }
    }
    @Test
    public void deleteListDataItemsById() {

        ListDataItems listDataItems1 = new ListDataItems();
        listDataItems1.setCode("listItem1");
        listDataItems1.setDescription("TestingBusinessUpdate");
        listDataItems1.setActive(true);;
        listDataItems1.setParentlistId(67);
        entityManager.persist(listDataItems1);
        entityManager.flush();
        List<ListDataItems> listDataItemss = listDataItemsRepository.findAll();
        ListDataItems listData=listDataItemss.get(0);
        listDataItemsRepository.delete(listData);
        //then
        assertThat(listData.getCode()).isEqualTo(listData.getCode());

    }
    @Test
    public void createListDataItems() {

        ListDataItems listDataItems = new ListDataItems();
        listDataItems.setCode("listItem1");
        listDataItems.setDescription("TestingBusiness");
        listDataItems.setActive(true);;
        listDataItems.setParentlistId(67);
        entityManager.persist(listDataItems);
        entityManager.flush();
        List<ListDataItems> listDataItemss = listDataItemsRepository.findAll();
        for(ListDataItems listDataItems2:listDataItemss){
            if(listDataItems2.getCode().equals(listDataItems.getCode()))
            {
                ListDataItems listDatas = listDataItemsRepository.findOne(listDataItems2.getId());
                assertThat(listDatas.getParentlistId()).isEqualTo(listDataItems.getParentlistId());
            }
        }
    }

}
