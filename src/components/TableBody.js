import React from 'react'
import TableRow from './TableRow'


function TableBody({ participationData }) {


    return (
        <tbody className='text-xs '>
            {
                participationData?.length !== 0 ? participationData.map((participant, index) => {

                    return <TableRow key={participant["student_email"] || 1} participant={participant} />
                }) :

                    <tr className="border-b-slate-200 odd:bg-white even:bg-gray-50">
                        <td className='p-4'>No Data Found</td>
                    </tr>

            }
        </tbody >
    )
}

export default TableBody