{
  _id:
  classId:
  Monday:[
    {
      _id:
      lectureNo:
      subjectName:
      start Time:
      end Time:

    }
  ]
  tuesday:
  wednesday:
  thursday:
  friday:

}


const timeTable = {}

timeSlots = [12, 13, 14]
days = [monday , tuesday  , wednesday]

days.map(day=>(

  timeSlots.map(timeslot=>(
    <>
    {/* <input type="text" value={"PHYSICS"} onChange={()=> {
      timeTable[day] = [...timeTable[day] , {timeSlot.startTime , timeSlot.EndTime}]
    } }/> */}
    
    </>
  ))
))