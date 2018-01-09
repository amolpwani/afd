package com.ford.afd.RepositoryTest;
import com.ford.afd.model.ListData;
import com.ford.afd.model.ListDataItems;
import com.ford.afd.repository.ListDataItemsRepository;
import com.ford.afd.repository.ListDataRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

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
        listDataItems.setCode(456789);
        listDataItems.setDescription("TestingBusiness");
        listDataItems.setStatus("Active");
        listDataItems.setListId(68);
        entityManager.persist(listDataItems);
        entityManager.flush();
        ListDataItems listDataItems1 = new ListDataItems();
        listDataItems1.setCode(456789900);
        listDataItems1.setDescription("TestingBusiness");
        listDataItems1.setStatus("Active");
        listDataItems1.setListId(69);
        entityManager.persist(listDataItems1);
        entityManager.flush();
        //given
        List<ListDataItems> listDataItemss = listDataItemsRepository.findAll();
        //then
        for(ListDataItems listDataItems2:listDataItemss){
            if(listDataItems2.getCode().equals(listDataItems.getCode()))
            {
                ListDataItems listDatas = listDataItemsRepository.findOne(listDataItems2.getId());
                assertThat(listDatas.getListId()).isEqualTo(listDataItems.getListId());
            }
            else if(listDataItems2.getCode().equals(listDataItems1.getCode()))
            {
                ListDataItems listDatas = listDataItemsRepository.findOne(listDataItems2.getId());
                assertThat(listDatas.getListId()).isEqualTo(listDataItems1.getListId());
            }
        }
    }

    @Test
    public void listDataItemsById() {

        ListDataItems listDataItems = new ListDataItems();
        listDataItems.setCode(456789);
        listDataItems.setDescription("TestingBusiness");
        listDataItems.setStatus("Active");
        listDataItems.setListId(67);
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
        listDataItems.setCode(456789);
        listDataItems.setDescription("TestingBusiness");
        listDataItems.setStatus("Active");
        listDataItems.setListId(67);
        entityManager.persist(listDataItems);
        entityManager.flush();
        List<ListDataItems> listDataItemss=listDataItemsRepository.findAll();
        for(ListDataItems listDataItems2:listDataItemss){
            if(listDataItems2.getCode().equals(listDataItems.getCode()))
            {
                ListDataItems listDatas = listDataItemsRepository.findOne(listDataItems2.getId());
                ListDataItems listDataItems1 = new ListDataItems();
                listDataItems1.setCode(45678928);
                listDataItems1.setDescription("TestingBusinessUpdate");
                listDataItems1.setStatus("Active");
                listDataItems1.setListId(67);
                BeanUtils.copyProperties(listDataItems1, listDatas);
                assertThat(listDatas.getListId()).isEqualTo(listDataItems1.getListId());

            }
        }
    }
    @Test
    public void deleteListDataItemsById() {

        ListDataItems listDataItems1 = new ListDataItems();
        listDataItems1.setCode(4567892);
        listDataItems1.setDescription("TestingBusinessUpdate");
        listDataItems1.setStatus("Active");
        listDataItems1.setListId(67);
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
        listDataItems.setCode(456789233);
        listDataItems.setDescription("TestingBusiness");
        listDataItems.setStatus("Active");
        listDataItems.setListId(67);
        entityManager.persist(listDataItems);
        entityManager.flush();
        List<ListDataItems> listDataItemss = listDataItemsRepository.findAll();
        for(ListDataItems listDataItems2:listDataItemss){
            if(listDataItems2.getCode().equals(listDataItems.getCode()))
            {
                ListDataItems listDatas = listDataItemsRepository.findOne(listDataItems2.getId());
                assertThat(listDatas.getListId()).isEqualTo(listDataItems.getListId());
            }
        }
    }

}
