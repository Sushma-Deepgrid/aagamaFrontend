import React from 'react'
import { Container } from 'reactstrap'
import UserRole from '../../../../components/admin/portalAdministration/UserRole/userRole'


const Dashboard = () => {
    return (
        <>
           
            <Container fluid={true}>
                <div className="row">
                    <UserRole />
                    
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