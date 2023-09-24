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

        const sums = [];
        data.forEach((ele) => {
            const sum = ele['of_courses_completed'] + ele['of_skill_badges_completed'] + ele['of_gen_ai_game_completed'];
            if (!sums.includes(sum)) {
                sums.push(sum);
            }
        });

        sums.sort((a, b) => b - a);

        const top3Sums = sums.slice(0, 3);
        // console.log(top3Sums);
        setMaxCourseComp(top3Sums);
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