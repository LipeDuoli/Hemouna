/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.dao;

import com.hemouna.entidade.Bolsadesangue;
import com.hemouna.persistencia.HibernateUtil;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Fillipe
 */
public class BolsaDeSangueDao implements IDao {
    private Session session;
    private Transaction transaction;

    @Override
    public boolean salvar(Object obj) {
        try{
            this.session = HibernateUtil.getSessionFactory().openSession();
            this.transaction = session.beginTransaction();
            this.session.save(obj);
            this.transaction.commit();
            return true;
        } catch(HibernateException he) {
            transaction.rollback();
            return false;
        } finally {
            this.session.close();
        }
    }

    @Override
    public boolean alterar(Object obj) {
        try{
            this.session = HibernateUtil.getSessionFactory().openSession();
            this.transaction = session.beginTransaction();
            this.session.update(obj);
            this.transaction.commit();
            return true;
        } catch(HibernateException he) {
            transaction.rollback();
            return false;
        } finally {
            this.session.close();
        }
    }

    @Override
    public boolean excluir(Integer id) {
        try{
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            Bolsadesangue tb = (Bolsadesangue) session.get(new Bolsadesangue().getClass(), id);
            if(tb != null){
                session.delete(tb);
                transaction.commit();
                return true;
            }
            return false;
        } catch (HibernateException he){
            transaction.rollback();
            return false;
        } finally {
            session.close();
        }
    }

    @Override
    public Object getId(Integer id) {
        try{
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            return session.get(new Bolsadesangue().getClass(), id);
        } catch (HibernateException he){
            return null;
        } finally {
            session.close();
        }
    }

    @Override
    public List<Object> pesquisar(String argumento) {
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            Criteria criteria = this.session.createCriteria(new Bolsadesangue().getClass());
            criteria.add(Restrictions.like("argumento", argumento, MatchMode.EXACT));
            return criteria.list();
        } catch (HibernateException he) {
            return null;
        } finally {
            session.close();
        }
    }
    
}
