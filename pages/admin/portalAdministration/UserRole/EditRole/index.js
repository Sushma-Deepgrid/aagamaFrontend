import React from 'react'
import { Container } from 'reactstrap'
import EditRoleForm from '../../../../../components/admin/portalAdministration/UserRole/editRole'
import Breadcrumb from '../../../../../components/Common/Breadcrumb'

const EditRole = () => {
    return (
        <>
           <Breadcrumb title='Edit Role' titleText=' ' parent='' />
            <Container fluid={true}>
                <div className="row">
                    <EditRoleForm />
                    
                </div>
            </Container>
        </>
    )
}

export default EditRole

{/* <Properies />
<SalaryChart />
<Status />
<ProjectTimeline /> 
<Properylist />
 <Management />
 <Soldout />*/}