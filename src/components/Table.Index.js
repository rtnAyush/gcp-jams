import React, { useState, useEffect } from 'react'
import TableBody from './TableBody'


const TableIndex = () => {

  const [participationData, setParticipationdata] = useState([]);
  const [EligibleforSwags, setEligibleforSwags] = useState(0);

  useEffect(() => {
    getStudentData();
    // eslint-disable-next-line
  }, [])



  const getStudentData = async () => {
    try {
      // console.log(process.env.REACT_APP_BACKEND_URL);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/student-data/get-student-data`);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setParticipationdata(data?.foundData);
      calculateTotalEligibility(data?.foundData)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const calculateTotalEligibility = (data) => {
    let total = 0;
    data.forEach((ele) => {
      ele["total_completions_of_both_pathways"] === "Yes" && total++;
    })
    setEligibleforSwags(total)
  }

  const searchname = (name) => {
    const newArr = [];
    for (let i = 0; i < participationData?.length; i++) {
      let participant = participationData[i]["student_name"].toLowerCase();
      let match = participant.includes(name.toLowerCase());
      if (match) newArr.push(participationData[i]);

    }
    // console.log(newArr);
    setParticipationdata(newArr);
  }

  return (
    <div className='w-full relative px-3'>



      <div className="sec m-auto my-10 space-y-8 w-1/2 mob:w-full flex flex-col">
        <div className="message bg-yellow-100 text-yellow-700 p-5 rounded-lg shadow-lg shadow-yellow-300/30 text-center border border-yellow-300/30"><p className="text-center">-: Jokes :-</p>
          <p><span className="text-black">Someone :</span> How did you fall in poverty ? gamble or drugs ?</p>
          <p><span className="text-black">Me :</span> I left an Ec2 Instance on... !🥲</p>
        </div>

        <div className="info flex mob:flex-col mob:justify-center mob:items-center mob:space-y-10 mob:p-5 justify-evenly space-x-3 mob:space-x-0">
          <div className="eligibleforswag w-fit mob:w-full h-20 p-5 space-x-5 rounded-lg flex flex-row justify-evenly mob:justify-between items-center bg-green-50 shadow-lg shadow-green-300/30 border border-green-200">
            <p className="text-center mob:text-start text-sm text-green-400">No of Eligible <br /> Participants for swags</p>
            <p className="no text-2xl border-l-2 border-l-green-700 pl-3 text-green-800">{EligibleforSwags}</p>
          </div>
          <div className="eligibleforswag w-fit mob:w-full h-20 p-5 space-x-5 rounded-lg flex flex-row justify-evenly mob:justify-between items-center bg-blue-50 shadow-lg shadow-blue-300/30 border border-blue-200">
            <p className="text-center mob:text-start text-sm text-blue-400">Total No of <br />Participants</p>
            <p className="no text-2xl border-l-2 border-l-blue-700 pl-3 text-blue-800">{participationData?.length}</p>
          </div>
        </div>

        <div className="search m-auto mt-3 mob:py-3 py-2  space-x-5  flex justify-start items-center shadow-lg shadow-blue-400/30 bg-blue-50 w-full rounded-full">
          <div className="icon px-3 "><svg xmlns="http://www.w3.org/2000/svg" className='h-5' viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#3b82f6" /></svg></div>
          <div className="input w-full">
            <input
              onChange={(e) => {
                searchname(e.target.value)
              }}
              className='bg-transparent mob:text-lg text-base outline-none w-full' type="text" name="searchbar" id="searchbar" placeholder='Search Your Name Here' />
          </div>
        </div>
      </div>


      <table className='mx-auto table-fixed m-5  '>
        <thead className='shadow-md text-sm bg-blue-500 text-gray-200 sticky top-2 z-10'>
          <tr className='text-center '>
            <td className="rounded-ss-lg w-80 p-2 border-r-2 border-r-gray-300">Name</td>
            {/* <td className="p-2 border-r-2 border-r-gray-300">Email</td> */}
            <td className="p-2 border-r-2 border-r-gray-300">Redemption Status</td>
            <td className="mob:hidden p-2 px-10 border-r-2 border-r-gray-300">Institution</td>
            <td className="mob:rounded-se-lg p-2 border-r-2 border-r-gray-300 max-w-[150px]">Completions of both Pathways</td>
            <td className="mob:hidden p-2 border-r-2 border-r-gray-300 max-w-[150px]">No Courses Completed</td>
            <td className="mob:hidden p-2 border-r-2 border-r-gray-300 max-w-[150px]">No Skill Badges Completed</td>
            <td className="mob:hidden rounded-se-lg p-2 max-w-[150px]">GenAI Game Completed</td>
            {/* <td className="p-2 border-r-2 border-r-gray-300">Enroll Date & Time</td> */}
            {/* <td className="p-2 border-r-2 border-r-gray-300">Enroll. Status</td> */}
            {/* <td className='p-2 border-r-2 border-r-gray-300'>Profile URL</td> */}
          </tr>
        </thead>
        <TableBody
          participationData={participationData}
          setParticipationdata={setParticipationdata}
        />
      </table>

    </div>
  )
}

export default TableIndex