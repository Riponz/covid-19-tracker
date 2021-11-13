import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoButton.css'

function InfoButtob({ title, cases, total }) {
    return (
        <div>
            <Card className='card'>
                <CardContent>
                    <Typography color="textSecondary" >
                        {title}
                    </Typography>
                    <h2>
                        {cases}
                    </h2>
                    <Typography >
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoButtob
