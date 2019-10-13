import React, {Component} from 'react';
import classes from './BusinessList.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/businessBuilder';

import BusinessForm from '../../containers/Forms/BusinessForm/BusinessForm';
import BusinessTab from '../BusinessTab/BusinessTab';

// icons:
import listIcon from '../../images/icons/listIcon.png';
import addBusinessIcon from '../../images/icons/addBusinessIcon.png';

class BusinessList extends Component {

  state={
    isBusinessFormShown: false,
  }

  showBusinessForm = () => {
    this.setState({isBusinessFormShown: !this.state.isBusinessFormShown})
  }

  render(){

  let businessForm = null;

  if(this.state.isBusinessFormShown){
    businessForm = <BusinessForm addBusiness={this.props.addBusiness}/>;
  }   

  let businessTab = this.props.business.map(
    (el)=><BusinessTab 
            deleteBusiness = {this.props.deleteBusiness}
            switchBusinessTab={this.props.switchBusinessTab} 
            business={el}/>
    ) 

  return (
  	<div className={classes.businessListWrapper}>
  		<h1>Time Catcher</h1>
  		<p className={classes.businessListTitle}><img src={listIcon} className={classes.listIcon}/> Business List</p>
      {businessForm}
	    <div>
        {businessTab}
	    </div>	
      <button onClick={this.showBusinessForm} className={classes.createBusinessBtn}>
        <img src={addBusinessIcon} className={classes.addBusinessIcon}/>
  			<span>Create Business</span>
  		</button>
    </div>	
  );
}
}

  const mapStateToProps = state => {
    return {
      business: state.businessList.business,
    }
  }

  const mapDispatchToProps = dispatch => {
    return{
      addBusiness: (data) => dispatch(actions.addBusiness(data)),
      deleteBusiness: (id) => dispatch(actions.deleteBusiness(id)),
      switchBusinessTab: (id) => dispatch(actions.switchBusinessTab(id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);
