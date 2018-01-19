package com.ford.afd.RepositoryTest;

import com.ford.afd.model.ListDataItem;
import com.ford.afd.repository.ListDataItemRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ListDataItemRepositoryTest {

    @Autowired
    private ListDataItemRepository listDataItemRepository;

    @After
    public void tearDown() {
        listDataItemRepository.deleteAll();
    }

    @Test
    public void directList() {
        // Arrange
        ListDataItem listDataItem1 = listDataItemRepository.save(new ListDataItem("BU1", "TestingBusiness", true , 1));
        ListDataItem listDataItem2 = listDataItemRepository.save(new ListDataItem("BU2", "TestingBusiness", false, 2));
        //Act
        List<ListDataItem> actualListDataItems = listDataItemRepository.findAll();
        //Assert
        assertThat(actualListDataItems).containsExactlyInAnyOrder(listDataItem1, listDataItem2);
    }

    @Test
    public void listDataItemsById() {
        // Arrange
        ListDataItem testListDataItem = listDataItemRepository.save(new ListDataItem("BU1", "TestingBusiness", true , 1));
        // Act
        ListDataItem actualListDataItem = listDataItemRepository.findOne(testListDataItem.getId());
        // Assert
        assertThat(actualListDataItem).isEqualToComparingFieldByField(testListDataItem);
    }

    @Test
    public void updateListDataItems() {
        // Arrange
        ListDataItem testListDataItem = listDataItemRepository.save(new ListDataItem("BU1", "TestingBusiness", true, 1 ));
        testListDataItem.setDescription("Updated Testing Business");
        //Act
        ListDataItem actualListDataItem = listDataItemRepository.save(testListDataItem);
        //Assert
        ListDataItem updatedListData = listDataItemRepository.findOne(testListDataItem.getId());
        assertThat(updatedListData.getDescription()).isEqualTo(actualListDataItem.getDescription());
    }

    @Test
    public void deleteListDataItemsById() {
        // Arrange
        ListDataItem testListDataItem = listDataItemRepository.save(new ListDataItem("BU1", "TestingBusiness", true, 1 ));
        //Act
        listDataItemRepository.delete(testListDataItem);
        //Assert
        assertThat(listDataItemRepository.findOne(testListDataItem.getId())).isNull();
    }
}