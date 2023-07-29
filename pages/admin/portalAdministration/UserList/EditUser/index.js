import React from 'react'
import { Container } from 'reactstrap'
import EditUserForm from '../../../../../components/admin/portalAdministration/UserList/editUser'
import Breadcrumb from '../../../../../components/Common/Breadcrumb'

const EditUser = () => {
    return (
        <>
           <Breadcrumb title='Edit User' titleText=' ' parent='' />
            <Container fluid={true}>
                <div className="row">
                    <EditUserForm />
                    
                </div>
            </Container>
        </>
    )
}

export default EditUser

{/* <Properies />
<SalaryChart />
<Status />
<ProjectTimeline /> 
<Properylist />
 <Management />
 <Soldout />*/}