"use client";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const TimeBlock = ({ timeBlock, index, onAttendanceUpdate, onEventStatusUpdate, isAdmin }) => {
  const [isTimeBlockOpen, setIsTimeBlockOpen] = useState(false);
  const [teams, setTeams] = useState([]); // State for team attendance
  const [status, setStatus] = useState("Not Started");
  const [updatedData, setUpdatedData] = useState([]);
  const [activeButton, setActiveButton] = useState(null); // Track which button is active
  const [isStarted, setIsStarted] = useState(false); // Flag to check if "Start" has been clicked
  const [isFinished, setIsFinished] = useState(false);
  const [isPastEventTime, setIsPastEventTime] = useState(false); // Flag to check if current time is past the event time
  // Helper function to format the time
  const formatTime = (dateString) => {
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Function to compare the current time with the event time
  const checkIfPastEventTime = () => {
    const currentTime = new Date();
    const eventEndTime = new Date(timeBlock.TimeEnd); // Use TimeEnd from timeBlock
    // Return true if current time is past the event end time
    return currentTime >= eventEndTime;
  };

  const getUniqueID = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/team-timeblocks/${id}/unique-id`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching unique id: ' + error)
    }
  }

  const getComment = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/team-timeblock/${id}/comment`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching unique id: ' + error)
    }
  }

  const getSchoolName = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/team-timeblocks-get-school-name/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching unique id: ' + error)
    }
  }

  useEffect(() => {
    // Check if the event time has passed
    const interval = setInterval(() => {
      setIsPastEventTime(checkIfPastEventTime());
    }, 1000); // Check every second

    // Fetch team time blocks
    const fetchTimeBlockStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/timeblock/${timeBlock.TimeBlock_ID}/status`);
        const data = await response.json();
        timeBlock.Status = data.status;
        if (timeBlock.Status === 0) {
          setIsStarted(false);
          setIsFinished(false);
        } else if (timeBlock.Status === 1) {
          setIsStarted(true);
          setIsFinished(false);
        } else {
          setIsFinished(true);
          setIsStarted(true);
        }
      } catch (error) {
        console.log('Error for getting TimeBlock status: ' + error);
      }
    };

    const fetchTeamTimeBlocks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/get-team-timeblocks-by-timeblock/${timeBlock.TimeBlock_ID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Loop through teams and fetch unique_id and school name for each team
        const teamsWithDetails = await Promise.all(data.map(async (team) => {
          const uniqueIDData = await getUniqueID(team.TeamTimeBlock_ID); // Fetch unique_id
          const schoolNameData = await getSchoolName(team.TeamTimeBlock_ID);
          const commentData = await getComment(team.TeamTimeBlock_ID);
          return {
            ...team,
            unique_id: uniqueIDData?.unique_id || null, // Add unique_id to each team object
            schoolName: schoolNameData?.schoolName || null, // Add school name to each team object
            comment: commentData?.comment || null
          };
        }));

        setTeams(teamsWithDetails); // Update state with teams that have unique IDs and school names
      } catch (error) {
        console.error('Error fetching team time blocks:', error);
      }
    };

    fetchTeamTimeBlocks(); // Call the fetch function
    fetchTimeBlockStatus();

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, [timeBlock.TimeBlock_ID, timeBlock.Status, teams]); // Dependency array includes TimeBlock_ID

  const handleButtonClick = async (button) => {
    setActiveButton(button);

    if (button === "start") {
      try {
        const response = await fetch(`http://localhost:3000/timeblock/${timeBlock.TimeBlock_ID}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 1 }),
        });
        if (response.ok) {
          console.log('Status updated successfully.');
        } else {
          console.error('Failed to update status.');
        }
        timeBlock.Status = 1;
      } catch (error) {
        console.error('Error updating status:', error);
      }
      setStatus("In Progress");
      setIsStarted(true); // Mark that the event has started
    } else if (button === "finish") {
      // Check if current time is before the event end time
      const currentTime = new Date();
      const eventEndTime = new Date(timeBlock.TimeEnd);

      if (currentTime < eventEndTime) {
        // If the current time is before the end time, show an alert and stop the function
        alert("You may not end the timeblock until after the event time has passed.");
        return;
      }

      // If current time is after event end time, ask for confirmation
      const userConfirmed = window.confirm("The event time has passed. Do you want to end the event?");

      if (userConfirmed) {
        try {
          const response = await fetch(`http://localhost:3000/timeblock/${timeBlock.TimeBlock_ID}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 2 }),
          });
          if (response.ok) {
            console.log('Status updated successfully.');
          } else {
            console.error('Failed to update status.');
          }
          timeBlock.Status = 2;
        } catch (error) {
          console.error('Error updating status:', error);
        }
        setStatus("Completed");
        setIsFinished(true);
      } else {
        // User canceled the confirmation, do nothing
        return;
      }
    }

    // Trigger the event status update
    onEventStatusUpdate();
  };
  const handleCommentChange = async (teamTimeBlockId, newComment) => {
    // Optionally, you can make an API call here to save the comment to the backend
    try {
      const hold = await fetch(`http://localhost:3000/team-timeblock/${teamTimeBlockId}/comment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: newComment }),
      });
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };
  const handleStatusChange = async (teamIndex, present) => {
    if (isStarted) {
      if (present === true) {
        try {
          const response = await fetch(`http://localhost:3000/teamtimeblock/${teamIndex}/attend`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ attend: false }),
          });
          if (response.ok) {
            const updatedTeams = teams.map((team, i) =>
              i === teamIndex ? { ...team, attend: false } : team
            );
            setTeams(updatedTeams); // Update state with the new attendance
            onAttendanceUpdate();
            console.log('Status updated successfully.');
          } else {
            console.error('Failed to update status.');
          }
        } catch (error) {

        }
        return;

      } else {
        try {
          const response = await fetch(`http://localhost:3000/teamtimeblock/${teamIndex}/attend`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ attend: true }),
          });
          if (response.ok) {
            const updatedTeams = teams.map((team, i) =>
              i === teamIndex ? { ...team, attend: true } : team
            );
            setTeams(updatedTeams); // Update state with the new attendance
            onAttendanceUpdate();
            console.log('Status updated successfully.');
          } else {
            console.error('Failed to update status.');
          }
        } catch (error) {
        }
        return;
      }
    }
  };

  return (
    <div className={`grid grid-cols-1 items-center pl-4 pl-4 pt-4 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-300`}>
      {/* Time Block Dropdown */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <button onClick={() => setIsTimeBlockOpen(!isTimeBlockOpen)}>
            {isTimeBlockOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <h3 className="ml-4">{`${formatTime(timeBlock.TimeBegin)} - ${formatTime(timeBlock.TimeEnd)}`}</h3>
        </div>

        <div
          id="event-status"
          className={`w-24 p-2 mr-4 border rounded text-center ${timeBlock.Status === 1
            ? 'bg-yellow-200'
            : timeBlock.Status === 2
              ? 'bg-green-200'
              : timeBlock.Status === 0
                ? 'bg-red-200'
                : 'bg-gray-200' // Default background color
            }`}
          style={{ width: "140px" }} // Adjust width as needed to match header
        >
          {timeBlock.Status === 0 && <h3 className="text-black">Not Started</h3>}
          {timeBlock.Status === 1 && <h3 className="text-black">In Progress</h3>}
          {timeBlock.Status === 2 && <h3 className="text-black">Completed</h3>}
        </div>
      </div>
      {isFinished && !isAdmin &&
        <div className="text-center font-bold">
          This event has completed. Attendance status cannot be changed.
        </div>
      }
      {isFinished && isAdmin &&
        <div className="text-center font-bold">
          This event has completed.
        </div>
      }

      {/* Dropdown content for Teams */}
      {isTimeBlockOpen && isStarted && !isFinished && (
        <div className="ml-6 mt-2 pb-2">
          {/* Team List Headers */}
          <div className="grid grid-cols-4 pl-2 pr-2 pt-2 pb-2 border-b border-gray-300 bg-white" style={{ gridTemplateColumns: "200fr 150fr 315fr 315fr" }}>
            <span>School Name</span>
            <span>Team ID</span>
            <span>Comments</span>
            <span>Attended</span>
          </div>
          <hr className="w-full border-t border-gray-300" />

          {/* Team List */}
          {teams.map((team, teamIndex) => (
            <div
              key={teamIndex}
              className={`${teamIndex % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-300`}
            >
              <div className="grid grid-cols-4 items-center pr-4 pt-4 pb-4 pl-2" style={{ gridTemplateColumns: "200fr 150fr 315fr 315fr" }}>
                <span>{team.schoolName}</span>
                <span className="ml-1">{team.unique_id}</span>

                {/* Comment Input */}
                <div className="ml-1">
                  <textarea
                    className="w-full border rounded"
                    value={team.comment || ''} // Optional chaining in case comment is undefined
                    onChange={(e) => handleCommentChange(team.TeamTimeBlock_ID, e.target.value)}
                  />
                </div>

                {/* Present/Absent Button */}
                <div className="ml-2 flex">
                  <div className="flex border border-black rounded-full overflow-hidden w-full">
                    <button
                      className={`flex-1 py-1 ${!team.Attend ? "text-black" : "bg-gray-200"} rounded-l-full`}
                      style={{
                        backgroundColor: !team.Attend ? "#FFB0B0" : "transparent",
                      }}
                      disabled={!isStarted}
                      onClick={() => handleStatusChange(team.TeamTimeBlock_ID, true)}
                    >
                      Absent
                    </button>

                    <div className="w-px h-full bg-black"></div>

                    <button
                      className={`flex-1 py-1 ${team.Attend ? "text-black" : "bg-gray-200"} rounded-r-full`}
                      style={{
                        backgroundColor: team.Attend ? "#B7E394" : "transparent",
                      }}
                      disabled={!isStarted}
                      onClick={() => handleStatusChange(team.TeamTimeBlock_ID, false)}
                    >
                      Present
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            {!isStarted && !isFinished && (
              <button
                className={`px-4 py-2 rounded-lg border border-black hover:bg-green-700 bg-green-700 text-white`}
                onClick={() => handleButtonClick("start")}
              >
                Start Event
              </button>
            )}

            {isStarted && !isFinished && (
              <button
                className={`px-4 py-2 rounded-lg border border-black hover:bg-green-700 bg-green-700 text-white`}
                onClick={() => handleButtonClick("finish")}
              >
                Finish Event
              </button>
            )}
          </div>
        </div>

      )}
      {isTimeBlockOpen && (!isStarted || isFinished) && (
        <div className="ml-6 mt-2 pb-2">
          {/* Team List Headers */}
          <div className="grid grid-cols-3 pl-2 pr-2 pt-2 pb-2 border-b border-gray-300 bg-white">
            <span>School Name</span>
            <span>Team ID</span>
            <span>Attended</span>
          </div>
          <hr className="w-full border-t border-gray-300" />

          {/* Team List */}
          {teams.map((team, teamIndex) => (
            <div
              key={teamIndex}
              className={`${teamIndex % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-300`}
            >
              <div className="grid grid-cols-3 items-center pr-4 pt-4 pb-4 pl-2">
                <span>{team.schoolName}</span>
                <span className="ml-2">{team.unique_id}</span>
                {isStarted && (!isFinished || isAdmin) &&
                  <div className="ml-2 flex">
                  <div className="flex border border-black rounded-full overflow-hidden w-full">
                    <button
                      className={`flex-1 py-1 ${!team.Attend ? "text-black" : "bg-gray-200"} rounded-l-full`}
                      style={{
                        backgroundColor: !team.Attend ? "#FFB0B0" : "transparent",
                      }}
                      disabled={!isStarted}
                      onClick={() => handleStatusChange(team.TeamTimeBlock_ID, true)}
                    >
                      Absent
                    </button>

                    <div className="w-px h-full bg-black"></div>

                    <button
                      className={`flex-1 py-1 ${team.Attend ? "text-black" : "bg-gray-200"} rounded-r-full`}
                      style={{
                        backgroundColor: team.Attend ? "#B7E394" : "transparent",
                      }}
                      disabled={!isStarted}
                      onClick={() => handleStatusChange(team.TeamTimeBlock_ID, false)}
                    >
                      Present
                    </button>
                  </div>
                </div>
                }
                {isFinished && !isAdmin && (
                  <div className="ml-2 flex items-center">
                    {!team.Attend ? (
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 bg-red-500 rounded ${!team.Attend ? "mr-2" : ""}`}
                          style={{
                            backgroundColor: "#FFB0B0",
                          }}
                        />
                        <div className="pl-4">Absent</div>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 bg-green-500 rounded-full ${team.Attend ? "mr-2" : ""}`}
                          style={{
                            backgroundColor: "#B7E394",
                          }}
                        />
                        <div className="pl-4">Present</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            {!isStarted && !isFinished && (
              <button
                className={`px-4 py-2 rounded-lg border border-black hover:bg-green-700 bg-green-700 text-white`}
                onClick={() => handleButtonClick("start")}
              >
                Start Event
              </button>
            )}

            {isStarted && !isFinished && (
              <button
                className={`px-4 py-2 rounded-lg border border-black hover:bg-green-700 bg-green-700 text-white`}
                onClick={() => handleButtonClick("finish")}
              >
                Finish Event
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeBlock;