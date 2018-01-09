package com.ford.afd.RepositoryTest;

import com.ford.afd.model.ListData;
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
public class ListDataRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private ListDataRepository listDataRepository;
    @Test
    public void directList() {

        ListData listData1 = new ListData();
        listData1.setName("JunitTesting");
        listData1.setActive(true);
        entityManager.persist(listData1);
        entityManager.flush();
        ListData listData2 = new ListData();
        listData2.setName("JunitTesting1");
        listData2.setActive(true);
        entityManager.persist(listData2);
        entityManager.flush();
        //given
        List<ListData> listDatas = listDataRepository.findAll();
        for(ListData listData:listDatas)
        {
            if(listData.getName().equals(listData1.getName()))
            {
                //then
                ListData listDatatemp=listDataRepository.findOne(listData.getId());
                assertThat(listDatatemp.getName()).isEqualTo(listData1.getName());
            }else if(listData.getName().equals(listData2.getName()))
            {
                //then
                ListData listDatatemp=listDataRepository.findOne(listData.getId());
                assertThat(listDatatemp.getName()).isEqualTo(listData2.getName());
            }
        }

    }

    @Test
    public void listDataById() {

        ListData listData1 = new ListData();
        listData1.setName("JunitTesting");
        listData1.setActive(true);
        entityManager.persist(listData1);
        entityManager.flush();
        List<ListData> listDatas = listDataRepository.findAll();
        for(ListData listData:listDatas)
        {
            if(listData.getName().equals(listData1.getName()))
            {
                //then
                ListData listDatatemp=listDataRepository.findOne(listData.getId());
                assertThat(listDatatemp.getName()).isEqualTo(listData1.getName());
            }
        }

    }
    @Test
    public void updateListData() {

        ListData listData1 = new ListData();
        listData1.setName("JunitTesting");
        listData1.setActive(true);
        entityManager.persist(listData1);
        entityManager.flush();

        List<ListData> listDatas = listDataRepository.findAll();
        for(ListData listData:listDatas)
        {
            if(listData.getName().equals(listData1.getName()))
            {
                //then
                ListData listDatatemp=listDataRepository.findOne(listData.getId());
                ListData listData2 = new ListData();
                listData2.setName("JunitTestingupadeted");
                listData2.setActive(true);
                BeanUtils.copyProperties(listData2, listDatas);
                assertThat(listDatatemp.getName()).isEqualTo(listData1.getName());
            }
        }

    }
    @Test
    public void deleteListDataById() {

        ListData listData1 = new ListData();
        listData1.setName("JunitTesting");
        listData1.setActive(true);
        entityManager.persist(listData1);
        entityManager.flush();
        List<ListData> listDatas = listDataRepository.findAll();
        for(ListData listData:listDatas)
        {
            if(listData.getName().equals(listData1.getName()))
            {
                //then
                ListData listDatatemp=listDataRepository.findOne(listData.getId());
                listDataRepository.delete(listData);
                assertThat(listDatatemp.getName()).isEqualTo(listData1.getName());
            }
        }

    }
    @Test
    public void createListData() {

        ListData listData1 = new ListData();
        listData1.setName("JunitTesting");
        listData1.setActive(true);
        entityManager.persist(listData1);
        entityManager.flush();
        List<ListData> listDatas = listDataRepository.findAll();
        for(ListData listData:listDatas)
        {
            if(listData.getName().equals(listData1.getName()))
            {
                //then
                ListData listDatatemp=listDataRepository.findOne(listData.getId());
                assertThat(listDatatemp.getName()).isEqualTo(listData1.getName());
            }
        }

    }

}
