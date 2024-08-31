import MeetupDashboard from "../components/meetup/meetupDashboard";
import {CompletedTaskProvider} from '../components/layout/CpmletedTaskContext';
import {MoveTasksProvider} from '../components/layout/MoveTaskContext';
import {MoveProjectsProvider} from '../components/layout/MoveProjectContext'

function Dashboard(){
    return (  
        <div id="dashboard">
            <MoveProjectsProvider >
                <MoveTasksProvider>
                    <CompletedTaskProvider>
                        <MeetupDashboard />
                    </CompletedTaskProvider>
                </MoveTasksProvider>
            </MoveProjectsProvider>
        </div>
    )
}

export default Dashboard