import React from 'react'
import { Container } from 'reactstrap'
import UserList from '../../../../components/admin/portalAdministration/UserList/userList'


const Dashboard = () => {
    return (
        <>
           
            <Container fluid={true}>
                <div className="row">
                    <UserList />
                    
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