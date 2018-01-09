package com.ford.afd.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class ListData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private boolean active;

    /*@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "listdata")
    private Set<ListDataItems> listDataItems = new HashSet<>();*/

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    /*public Set<ListDataItems> getListDataItems() {
        return listDataItems;
    }

    public void setListDataItems(Set<ListDataItems> listDataItems) {
        this.listDataItems = listDataItems;
    }*/
}

