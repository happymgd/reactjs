import React, { Component } from 'react';
import {  TopbarContainer } from '../../containers';
import {
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';
import { FormattedMessage } from 'react-intl';

import css from './PraticiensPage.css';

class PraticiensPage extends Component  {
	constructor(){
		super();
		this.state = {
			HideToolTip : true
		}

		this.handleChange = this.handleChange.bind(this);
		
	}
	handleChange(event){
		
		if (this.state.HideToolTip === true){
			this.setState({HideToolTip : false});
		}else
		{
			this.setState({HideToolTip : true});
		
}
 
}
//const PraticiensPage = () => {return (
	render (){
	
		return (
    <Page
     
      title="Nous rejoindre"
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
      
  <div className={css.root}>
      <div className={css.PraticienContent}>
       <br/> <h1 className={css.PraticienMainTitle}>
          <FormattedMessage id="PraticiensPage.PraticienMainTitle" />
        </h1>
        <h2 className={css.PraticienSubTitle}>
         <FormattedMessage id="PraticiensPage.PraticienSubTitle1" />  <br/> 
             
         <FormattedMessage id="PraticiensPage.PraticienSubTitle2" />  <br/> 
        </h2>
       
          <p className={css.pageContent}> 
              <NamedLink name="SignupPage">
<div  className={css.PraticienButton}  >
          <FormattedMessage id="PraticiensPage.browseButton" />

        </div>
        </NamedLink>
         </p>
      
        <br/>  <br/>
      </div>
    </div>



      
     
        
         <div className={css.contentWrapper}>
         

              <div className={css.pageContent}>
          
<div className={css.pagecolor}>
<br/><br/>
 <h1 className={css.pageTitle}>
      <FormattedMessage id="PraticiensPage.pageTitle" />    
         </h1>

 
         <p>
         <div id="tableau"> 
                <div className={css.pagetable}>
              <p className={css.blue}>
           <FormattedMessage id="PraticiensPage.TableTitle1" />      <br/>
              </p>
              <FormattedMessage id="PraticiensPage.TableSubTitle1" />  

             
               </div>
              <div className={css.pagetable}>
             <p className={css.blue}>
             <FormattedMessage id="PraticiensPage.TableTitle2" /> <br/>
              </p>
            
           <FormattedMessage id="PraticiensPage.TableSubTitle2" />  
            
               </div>
              <div className={css.pagetable}>
                <p className={css.blue}>
         <FormattedMessage id="PraticiensPage.TableTitle3" />   <br/>
              </p>
           
           <FormattedMessage id="PraticiensPage.TableSubTitle3" />  
             

             
              </div>
              <div className={css.pagetable}>
                 <p className={css.blue}>
        <FormattedMessage id="PraticiensPage.TableTitle4" />   <br/>
              </p>
            <FormattedMessage id="PraticiensPage.TableSubTitle41" />  
              <br/>
             
            <FormattedMessage id="PraticiensPage.TableSubTitle42" />   

             
              </div>
              </div>
  </p> 
             
            
             <p className={css.pageContent}>
              <NamedLink name="SignupPage">
<div  className={css.PraticienButton}  >
          <FormattedMessage id="PraticiensPage.browseButton" />

        </div>
        </NamedLink>
         </p>
         <br/><br/>
</div>
           <div className={css.pageContent}>
              <div className={css.pagefontsize}>
               <br/><br/>
              <FormattedMessage id="PraticiensPage.SubTitle21" />   <br/> <br/>
              
            <FormattedMessage id="PraticiensPage.SubTitle22" /> 
             
             </div>
              
             <p className={css.pageContent}>
              
 <br/>
      <a className={css.a_blue} href="tel:+33173203327" > <FormattedMessage id="PraticiensPage.Phone" />  
       </a>
       
       <br/><br/>
         </p>
              </div>

              </div>
            </div>
        
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};
}
export default PraticiensPage;