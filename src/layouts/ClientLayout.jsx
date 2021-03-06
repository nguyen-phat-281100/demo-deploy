import HeaderClient from '../components/Header/Client/HeaderClient'
import withLayout from '../hocs/withLayout'
import React from 'react';
import { Suspense } from 'react'
import FooterClient from 'components/Footer/FooterClient';
import Loader from 'components/Loader/Loader';
const { Fragment } = require("react")
function ClientLayout(props){
    // console.log(props)
    console.log(props.children.props.history);
    return (
        <Fragment>
            <HeaderClient history={props.children.props.history}/>
            
            <Suspense 
                fallback={<Loader />}>
                {props.children}
            </Suspense>
            <FooterClient />
        </Fragment>
    )
}

export default withLayout(ClientLayout)