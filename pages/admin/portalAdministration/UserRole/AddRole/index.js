import React from 'react'
import { Container } from 'reactstrap'
import AddRoleForm from '../../../../../components/admin/portalAdministration/UserRole/addRole'
import Breadcrumb from '../../../../../components/Common/Breadcrumb'

const AddRole = () => {
    return (
        <>
           <Breadcrumb title='Add Role' titleText=' ' parent='' />
            <Container fluid={true}>
                <div className="row">
                    <AddRoleForm />
                    
                </div>
            </Container>
        </>
    )
}

export default AddRole

{/* <Properies />
<SalaryChart />
<Status />
<ProjectTimeline /> 
<Properylist />
 <Management />
 <Soldout />*/}