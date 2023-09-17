import React, { useEffect, useState } from 'react'
import TableRow from './TableRow'


function TableBody({ participationData, searchByName }) {

    const [maxCourseComp, setMaxCourseComp] = useState([]);

    useEffect(() => {
        if (!searchByName) {
            calculateRanking(participationData);
        }
        // eslint-disable-next-line
    }, [])

    const calculateRanking = (data) => {

        let countMap = {};
        let keys;
        data.forEach((ele) => {
            const count = ele['of_courses_completed'];
            countMap[count] = countMap[count] ? countMap[count] + 1 : 1;
            keys = Object.keys(countMap).map(Number);
            keys.sort((a, b) => b - a);
        })
        setMaxCourseComp(keys);
    }

    return (
        <tbody className='text-xs '>
            {
                participationData?.length !== 0 ? participationData.map((participant, index) => {

                    return <TableRow
                        maxCourseComp={maxCourseComp}
                        key={participant["student_email"] || 1}
                        participant={participant}
                    />
                }) :

                    <tr className="border-b-slate-200 odd:bg-white even:bg-gray-50">
                        <td className='p-4 whitespace-nowrap'>No Data Found</td>
                    </tr>

            }
        </tbody >
    )
}

export default TableBody