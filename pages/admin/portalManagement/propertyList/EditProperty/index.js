import React from 'react'
import { Container } from 'reactstrap'
import EditPropertyForm from '../../../../../components/admin/portalManagement/PropertyList/editProperty'
import Breadcrumb from '../../../../../components/Common/Breadcrumb'

const EditProperty = () => {
    return (
        <>
           <Breadcrumb title='Add Role' titleText=' ' parent='' />
            <Container fluid={true}>
                <div className="row">
                    <EditPropertyForm />
                    
                </div>
            </Container>
        </>
    )
}

export default EditProperty