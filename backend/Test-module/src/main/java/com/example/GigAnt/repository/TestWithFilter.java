package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.enums.Difficulty;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;  // ← Spring-овский!

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TestWithFilter implements TestFilterRepository {
    private final EntityManager em;

    @Override
    @Transactional(readOnly = true)
    public Page<Test> findByFilters(List<Difficulty> types, String title, Pageable pageable) {
        CriteriaBuilder cb = em.getCriteriaBuilder();

        CriteriaQuery<Test> cq = cb.createQuery(Test.class);
        Root<Test> root = cq.from(Test.class);

        List<Predicate> predicates = buildPredicates(cb, root, types, title);
        cq.where(cb.and(predicates.toArray(new Predicate[0])));
        applySorting(cb, root, cq, pageable.getSort());

        TypedQuery<Test> query = em.createQuery(cq);
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
        List<Test> content = query.getResultList();

        CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
        Root<Test> countRoot = countCq.from(Test.class);
        countCq.select(cb.count(countRoot));
        countCq.where(cb.and(buildPredicates(cb, countRoot, types, title)));
        Long total = em.createQuery(countCq).getSingleResult();

        return new PageImpl<>(content, pageable, total);
    }


    private List<Predicate> buildPredicates(CriteriaBuilder cb, Root<Test> root,
                                            List<Difficulty> types, String name) {
        List<Predicate> predicates = new ArrayList<>();

        if (types != null && !types.isEmpty()) {
            predicates.add(root.get("type").in(types));
        }
        if (name != null && !name.isBlank()) {
            predicates.add(cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }
        return predicates;
    }


    private void applySorting(CriteriaBuilder cb, Root<Test> root,
                              CriteriaQuery<?> cq, Sort sort) {
        if (!sort.isSorted()) return;


        List<jakarta.persistence.criteria.Order> orders = sort.stream()
                .map(order -> order.isAscending()
                        ? cb.asc(root.get(order.getProperty()))
                        : cb.desc(root.get(order.getProperty())))
                .toList();

        cq.orderBy(orders);
    }
}