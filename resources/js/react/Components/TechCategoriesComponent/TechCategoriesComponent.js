import React, { useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import './TechCategoriesComponent.scss';

import TechCategory from './TechCategory/TechCategory';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import { getCategories } from '../../redux/actions/categoriesActions';

const TechCategoriesComponent = ({ getCategories, categories }) => {
    const match = useRouteMatch();

    useEffect(() => {
        getCategories();
    }, []);

    return(
        <Switch>
            <Route exact path={match.path}>                
                <div className='techCategoriesComponentContainer'>
                    <p>Technology Categories</p>
                    <div>
                        {
                            categories.data.map(category => {
                                return(
                                    <div key={category.id}>
                                        <p>{category.name}</p>
                                        {
                                            category.subcategories.map(subcategory => {
                                                return(
                                                    <p key={subcategory.id}><Link to={`${match.url}/${subcategory.technology_sub_category_key}`}>{subcategory.name}</Link> <span>({subcategory.tech_count})</span></p>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }        
                    </div>
                    <LoadingIndicator state={categories.isLoading} />
                </div>
            </Route>
            <Route path={`${match.path}/:subcategory_key`} component={TechCategory} />
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCategories: () => dispatch(getCategories()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TechCategoriesComponent)