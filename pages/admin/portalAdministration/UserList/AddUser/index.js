import React from 'react'
import { Container } from 'reactstrap'
import AddUser from '../../../../../components/admin/portalAdministration/UserList/addUser'
import Breadcrumb from '../../../../../components/Common/Breadcrumb'

const Dashboard = () => {
    return (
        <>
           <Breadcrumb title='Add User' titleText=' ' parent='Dashboard' />
            <Container fluid={true}>
                <div className="row">
                    <AddUser />
                    
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