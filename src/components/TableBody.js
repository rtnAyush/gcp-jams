import React from 'react'
import TableRow from './TableRow'


function TableBody({ participationData }) {


    return (
        <tbody className='text-xs '>
            {
                participationData?.length > 0 ? participationData.map((participant, index) => {

                    return <TableRow key={participant["student_email"] || 1} participant={participant} />
                }) :
                    Array(10).fill(0).map((_, idx) =>
                        <tr key={idx} className="animate-pulse border border-b-slate-200 odd:bg-white even:bg-gray-50">
                            <td className="p-4">
                                <span className='block h-4 bg-slate-300 rounded' />
                            </td>
                            <td className="p-4">
                                <span className='block h-4 bg-slate-300 rounded' />
                            </td>
                            <td className="p-4">
                                <span className='block h-4 bg-slate-300 rounded' />
                            </td>
                            <td className="p-4">
                                <span className='block h-4 bg-slate-300 rounded' />
                            </td>
                            <td className="p-4">
                                <span className='block h-4 bg-slate-300 rounded' />
                            </td>
                            <td className="p-4">
                                <span className='block h-4 bg-slate-300 rounded' />
                            </td>
                            <td className="p-4">
                                <span className='block h-4 bg-slate-300 rounded' />
                            </td>
                        </tr>
                    )
            }
        </tbody >
    )
}

export default TableBody