import React, { Component } from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './FaqPage.css';

class FaqPage extends Component  {
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
//const FaqPage = () => {return (
	render (){
		const style =this.state.HideToolTip ? {display : 'none'} : {};
		return (
    <StaticPage
      className={css.root}
      title="Faq"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FaqPage',
        description: 'Description of this page',
        name: 'FAQ page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <h1 className={css.pageTitle}> </h1>
          <h1 className={css.pageTitle}>
          Vous avez des questions ? Nous sommes là pour y répondre !</h1>
          <h1 className={css.pageTitle}> </h1>
         <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              
            </div>

            <div className={css.contentMain}>
              <h2>
               Questions Générales 
              </h2>
              <h2>
              
              </h2>
              <div  onClick={this.handleChange} ><h3  className={css.subtitle}>Question 1</h3></div>
              <div style={style}>
              <p >
                Answer 1
              </p>
              </div>

               <div  ><h3  className={css.subtitle}>Question 2</h3></div>
              <div >
              <p >
                Answer 2
              </p>
              </div>

            </div>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};
}
export default FaqPage;