import React from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from '../../../components/Common/Breadcrumb'
import Assigness from '../../../components/dashboard/Assigness'
import Management from '../../../components/dashboard/Management'
import ProjectTimeline from '../../../components/dashboard/ProjectTimeline'
import Properies from '../../../components/dashboard/Properies'
import Properylist from '../../../components/dashboard/Properylist'
import SalaryChart from '../../../components/dashboard/SalaryChart'
import Soldout from '../../../components/dashboard/Soldout'
import Status from '../../../components/dashboard/Status'


const Dashboard = () => {
    return (
        <>
            <Breadcrumb title='Subscription Plan' titleText='' parent='Dashboard' />
            <Container fluid={true}>
                <div className="row">
                   <span>Subscription Plan</span>
                    <Assigness />
                    
                </div>
            </Container>
        </>
    )
}

export default Dashboard

{/* <Properies />
<SalaryChart />
<Status />
<ProjectTimeline /> 
<Properylist />
 <Management />
 <Soldout />*/}