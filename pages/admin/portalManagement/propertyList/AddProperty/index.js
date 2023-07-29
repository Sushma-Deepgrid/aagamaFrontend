import React from 'react'
import { Container } from 'reactstrap'
import AddPropertyForm from '../../../../../components/admin/portalManagement/PropertyList/addProperty'
import Breadcrumb from '../../../../../components/Common/Breadcrumb'

const AddProperty = () => {
    return (
        <>
           <Breadcrumb title='Add Role' titleText=' ' parent='' />
            <Container fluid={true}>
                <div className="row">
                    <AddPropertyForm />
                    
                </div>
            </Container>
        </>
    )
}

export default AddProperty